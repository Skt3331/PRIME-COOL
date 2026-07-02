import { createFileRoute, Link } from "@tanstack/react-router";
import { getPublicBlogs, getCmsSettings } from "../lib/api";
import logo from "../assets/logo.webp";
import { ArrowLeft, Clock, Phone, BookOpen, Calendar, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/blogs")({
  loader: async () => {
    const [{ blogs }, { settings }] = await Promise.all([getPublicBlogs(), getCmsSettings()]);
    return { blogs, cms: settings };
  },
  head: ({ loaderData }) => {
    return {
      meta: [
        { title: "Blogs & Technical Guides — Prime Cool" },
        {
          name: "description",
          content: "Expert HVAC, refrigeration, and industrial mechanical blogs and guides.",
        },
        { property: "og:title", content: "Blogs & Technical Guides — Prime Cool" },
        {
          property: "og:description",
          content: "Expert HVAC, refrigeration, and industrial mechanical blogs and guides.",
        },
        { property: "og:type", content: "website" },
        { property: "og:image", content: logo },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Blogs & Technical Guides — Prime Cool" },
        {
          name: "twitter:description",
          content: "Expert HVAC, refrigeration, and industrial mechanical blogs and guides.",
        },
      ],
      links: [{ rel: "canonical", href: "/blogs" }],
    };
  },
  component: BlogsPage,
});

function BlogsPage() {
  const { blogs, cms } = Route.useLoaderData();
  const socials = cms?.socials || {};
  const phone = socials.phone || "+917507408461";

  return (
    <div className="min-h-screen text-foreground flex flex-col justify-between">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={logo} alt="Prime Cool logo" className="h-9 w-9" />
            <span className="font-display font-bold text-lg tracking-tight">
              Prime <span className="text-gradient">Cool</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition">
              Home
            </Link>
            <Link to="/portfolio" className="hover:text-foreground transition">
              Projects
            </Link>
            <Link
              to="/blogs"
              className="hover:text-foreground transition text-primary font-semibold"
            >
              Blogs
            </Link>
            <Link to="/booking" search={{}} className="hover:text-foreground transition">
              Book Service
            </Link>
          </nav>
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-2 rounded-full border border-border p-2 sm:px-3 sm:py-1.5 text-xs font-medium hover:bg-card transition"
              title="Call Support"
            >
              <Phone className="h-4 w-4 text-primary" />
              <span className="hidden sm:inline">{phone}</span>
            </a>
            <Link
              to="/"
              className="text-sm font-medium hover:text-primary transition flex items-center gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Link>
            <Link
              to="/booking"
              search={{}}
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 transition glow-ring"
            >
              <Clock className="h-4 w-4" />
              <span className="hidden sm:inline">Book Online</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-28 pb-20 px-6">
        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
              <span className="h-px w-6 bg-primary" />
              Resource Library
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight">
              Engineering blogs & <span className="text-gradient">technical guides.</span>
            </h1>
            <p className="mt-4 text-sm text-muted-foreground">
              Deep dives into refrigeration calibration, troubleshooting split AC units, and heavy
              industrial preventive maintenance.
            </p>
          </div>

          {/* Blogs Grid */}
          {blogs && blogs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((b: any) => (
                <Link
                  key={b.id}
                  to="/blogs/$slug"
                  params={{ slug: b.slug }}
                  className="group border border-border/60 hover:border-primary/40 surface-card rounded-2xl overflow-hidden flex flex-col justify-between hover:scale-[1.01] transition-all duration-300 bg-background/20"
                >
                  <div>
                    {b.image && (
                      <div className="aspect-video relative overflow-hidden bg-muted">
                        <img
                          src={b.image}
                          alt={b.title}
                          className="object-cover w-full h-full group-hover:scale-105 transition duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent pointer-events-none" />
                      </div>
                    )}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-mono">
                        <Calendar className="h-3 w-3 text-primary" />
                        <span>
                          {new Date(b.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <h3 className="font-display font-semibold text-lg leading-snug group-hover:text-primary transition line-clamp-2">
                        {b.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                        {b.summary}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-border/40 mt-4 flex items-center text-xs text-primary font-semibold group-hover:underline">
                    Read Article &rarr;
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border border-dashed border-border rounded-3xl bg-card/10 text-muted-foreground max-w-md mx-auto">
              <BookOpen className="h-10 w-10 mx-auto opacity-50 mb-3" />
              <h3 className="font-semibold text-sm">No articles published yet</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Check back later or view our resource calculators.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground bg-card/20">
        <div>© {new Date().getFullYear()} Prime Cool — Mechanical Climate Solutions</div>
      </footer>
    </div>
  );
}
