import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import logo from "../assets/logo.webp";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { trackVisit, getCmsSettings } from "../lib/api";
import { Toaster } from "sonner";
import { AiDiagnosticsWidget } from "../components/AiDiagnosticsWidget";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  loader: async () => {
    const { settings } = await getCmsSettings();
    return { cms: settings };
  },
  head: ({ loaderData }) => {
    const faviconUrl = (loaderData as any)?.cms?.theme?.favicon || logo;
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "google-site-verification", content: "804_rTKMffV7SOqPQIoeFjuvO3lgthIdcQTQpAUtMxQ" },
        { title: "Prime Cool — HVAC, Appliance & Industrial Mechanical Solutions in Pune" },
        {
          name: "description",
          content:
            "Prime Cool delivers rapid-response HVAC, refrigeration, appliance repair, and heavy industrial mechanical services across Pune, Wagholi–Shirur, Karegaon and Ranjangaon.",
        },
        { name: "author", content: "Prime Cool" },
        { property: "og:title", content: "Prime Cool — Engineered Climate & Mechanical Solutions" },
        {
          property: "og:description",
          content:
            "From split ACs to factory cooling towers — precision engineering, zero-downtime maintenance, and rapid service along the Wagholi–Shirur corridor.",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [
        { rel: "icon", type: "image/png", href: faviconUrl },
        { rel: "stylesheet", href: appCss },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap",
        },
      ],
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { cms } = Route.useLoaderData();
  const { location } = useRouterState();
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    // Increment visit counter once per browser session
    if (typeof window !== "undefined" && !sessionStorage.getItem("prime_cool_visit_tracked")) {
      trackVisit()
        .then(() => {
          sessionStorage.setItem("prime_cool_visit_tracked", "true");
        })
        .catch((err) => {
          console.error("Failed to track visit:", err);
        });
    }
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        // small timeout to ensure target elements are fully rendered/positioned
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [location.hash, location.pathname]);

  // Page View tracking for GA4
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "page_view", {
        page_path: location.pathname + location.search + location.hash,
        page_title: document.title,
      });
    }
  }, [location.pathname, location.search, location.hash]);

  return (
    <QueryClientProvider client={queryClient}>
      {cms?.theme && (
        <style
          dangerouslySetInnerHTML={{
            __html: `
          :root {
            --primary: ${cms.theme.primary} !important;
            --electric: ${cms.theme.electric} !important;
            --background: ${cms.theme.background} !important;
          }
        `,
          }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Prime Cool",
            image: cms?.theme?.logo || "https://primecool.in/assets/logo.webp",
            "@id": "https://primecool.in/#localbusiness",
            url: "https://primecool.in",
            telephone: cms?.socials?.phone || "+917507408461",
            email: cms?.socials?.email || "support@primecool.in",
            priceRange: "$$",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Wagholi-Shirur Corridor",
              addressLocality: "Pune",
              addressRegion: "Maharashtra",
              postalCode: "412207",
              addressCountry: "IN",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 18.5793,
              longitude: 73.985,
            },
            openingHoursSpecification: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ],
              opens: "00:00",
              closes: "23:59",
            },
            sameAs: [
              cms?.socials?.facebook,
              cms?.socials?.instagram,
              cms?.socials?.linkedin,
              cms?.socials?.youtube,
              cms?.socials?.twitter,
            ].filter(Boolean),
          }),
        }}
      />
      {/* Global Header */}
      {!isAdminRoute && <Header cms={cms} />}

      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <div className={!isAdminRoute ? "pt-16" : ""}>
        <Outlet />
      </div>

      {/* Global Footer */}
      {!isAdminRoute && <Footer cms={cms} />}

      {/* Google Analytics 4 Script (Deferred) */}
      <DeferredGTM />
      <AiDiagnosticsWidget />
      <Toaster position="top-right" theme="dark" closeButton richColors />
    </QueryClientProvider>
  );
}

function DeferredGTM() {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoad(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!load) return null;

  return (
    <>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-PC12345678" />
      <script
        dangerouslySetInnerHTML={{
          __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-PC12345678', { send_page_view: false });
      `,
        }}
      />
    </>
  );
}
