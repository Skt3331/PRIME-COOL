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
    const seo = loaderData?.cms?.seo?.blogs;
    if (!seo) return { meta: [] };
    return {
      meta: [
        { title: seo.title },
        { name: "description", content: seo.description },
        { property: "og:title", content: seo.ogTitle },
        { property: "og:description", content: seo.ogDescription },
        { property: "og:type", content: "website" },
        { property: "og:image", content: loaderData?.cms?.theme?.logo || logo },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: seo.ogTitle },
        { name: "twitter:description", content: seo.ogDescription },
      ],
      links: [{ rel: "canonical", href: "https://primecool.in/blogs" }],
    };
  },
  component: BlogsPage,
});

import { useState } from "react";

function BlogsPage() {
  const { blogs, cms } = Route.useLoaderData();
  const socials = cms?.socials || {};
  const phone = socials.phone || "+917507408461";

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 25;

  const totalPages = Math.ceil((blogs?.length || 0) / ITEMS_PER_PAGE);
  const paginatedBlogs = blogs?.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE) || [];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,102,255,0.05),transparent_50%)] pointer-events-none" />
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
            <Link to="/booking" search={{}} className="btn-primary py-2 px-4">
              <Clock className="h-4 w-4" />
              <span className="hidden sm:inline">Book Online</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-28 pb-20 px-6 relative z-10">
        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-up">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
              <span className="h-px w-6 bg-primary" />
              Resource Library
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight">
              Engineering blogs & <span className="text-shimmer">technical guides.</span>
            </h1>
            <p className="mt-4 text-sm text-muted-foreground delay-100 animate-fade-up">
              Deep dives into refrigeration calibration, troubleshooting split AC units, and heavy
              industrial preventive maintenance.
            </p>
          </div>

          {/* Blogs Grid */}
          {paginatedBlogs.length > 0 ? (
            <div className="space-y-12">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedBlogs.map((b: any, idx: number) => (
                <Link
                  key={b.id}
                  to="/blogs/$slug"
                  params={{ slug: b.slug }}
                  className="group surface-card border-border/60 hover:border-primary/40 rounded-2xl overflow-hidden flex flex-col justify-between hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div>
                      {b.image && (
                        <div className="aspect-video relative overflow-hidden bg-muted">
                          <img
                            src={b.image}
                            alt={b.title}
                            className="object-cover w-full h-full group-hover:scale-110 transition duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent pointer-events-none" />
                        </div>
                      )}
                      <div className="p-6 space-y-3 relative z-20">
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
                        <h3 className="font-display font-semibold text-lg leading-snug group-hover:text-primary transition line-clamp-2 text-white">
                          {b.title}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                          {b.summary}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-0 border-t border-border/40 mt-4 flex items-center text-xs text-primary font-semibold group-hover:underline relative z-20">
                      Read Article &rarr;
                    </div>
                  </div>
                </Link>
              ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-12">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-full border border-border bg-card/50 text-sm font-medium hover:bg-card hover:text-primary transition disabled:opacity-50 disabled:pointer-events-none"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-muted-foreground font-mono">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-full border border-border bg-card/50 text-sm font-medium hover:bg-card hover:text-primary transition disabled:opacity-50 disabled:pointer-events-none"
                  >
                    Next
                  </button>
                </div>
              )}
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
