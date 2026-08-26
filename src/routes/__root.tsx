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
    <div className="flex min-h-[70vh] items-center justify-center bg-[#09090f] text-white px-4 py-16">
      <div className="max-w-xl text-center space-y-6">
        <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-[#00c8ff]/10 border border-[#00c8ff]/30 text-[#00c8ff] text-4xl font-extrabold shadow-[0_0_25px_rgba(0,200,255,0.2)]">
          404
        </div>
        <h1 className="text-3xl font-display font-bold text-white tracking-tight">
          Page Not Found
        </h1>
        <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
          The requested page or diagnostic resource could not be found or has been relocated to our updated service directory.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-bold text-[#09090f] transition shadow-lg hover:scale-105"
            style={{ background: "linear-gradient(135deg, #00c8ff, #0066ff)" }}
          >
            Return to Home
          </Link>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-xs font-bold text-slate-200 hover:bg-white/10 hover:text-white transition"
          >
            Browse Services Directory
          </Link>
          <Link
            to="/locations"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-xs font-bold text-slate-200 hover:bg-white/10 hover:text-white transition"
          >
            Service Locations
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
    try {
      const resp = await getCmsSettings();
      return { cms: resp?.settings || {} };
    } catch (e) {
      console.error("Failed to load CMS settings in root loader:", e);
      return { cms: {} };
    }
  },
  head: ({ loaderData }) => {
    const faviconUrl = (loaderData as any)?.cms?.theme?.favicon || "https://primecool.in/logo.png";
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
        { property: "og:image", content: "https://primecool.in/logo.png" },
        { property: "og:image:width", content: "512" },
        { property: "og:image:height", content: "512" },
        { property: "og:image:type", content: "image/png" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: "https://primecool.in/logo.png" },
      ],
      links: [
        { rel: "icon", type: "image/x-icon", href: "https://primecool.in/favicon.ico" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "https://primecool.in/favicon.png" },
        { rel: "icon", type: "image/png", sizes: "192x192", href: "https://primecool.in/logo.png" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "https://primecool.in/apple-touch-icon.png" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
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
            "@graph": [
              {
                "@type": "Organization",
                "@id": "https://primecool.in/#organization",
                name: "Prime Cool",
                url: "https://primecool.in",
                logo: {
                  "@type": "ImageObject",
                  "@id": "https://primecool.in/#logo",
                  url: cms?.theme?.logo || "https://primecool.in/logo.png",
                  contentUrl: cms?.theme?.logo || "https://primecool.in/logo.png",
                  caption: "Prime Cool Mechanical & Climate Solutions Logo",
                  width: 512,
                  height: 512
                },
                image: cms?.theme?.logo || "https://primecool.in/logo.png",
                telephone: cms?.socials?.phone || "+917507408461",
                sameAs: [
                  cms?.socials?.facebook,
                  cms?.socials?.instagram,
                  cms?.socials?.linkedin,
                  cms?.socials?.youtube,
                  cms?.socials?.twitter,
                ].filter(Boolean),
              },
              {
                "@type": "LocalBusiness",
                "@id": "https://primecool.in/#localbusiness",
                name: "Prime Cool",
                url: "https://primecool.in",
                logo: cms?.theme?.logo || "https://primecool.in/logo.png",
                image: cms?.theme?.logo || "https://primecool.in/logo.png",
                telephone: cms?.socials?.phone || "+917507408461",
                description: "Rapid-response HVAC, air conditioning repair, refrigeration, and industrial cooling solutions in Pune.",
                priceRange: "$$",
                areaServed: [
                  "Wagholi",
                  "Shirur",
                  "Hadapsar",
                  "Kharadi",
                  "Chakan MIDC",
                  "Ranjangaon MIDC",
                  "Karegaon",
                  "Shikrapur",
                  "Lonikand",
                  "Koregaon Bhima",
                  "Pune",
                  "Maharashtra",
                ],
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
              }
            ]
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
