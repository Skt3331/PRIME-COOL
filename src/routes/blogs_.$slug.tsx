import { createFileRoute, Link } from "@tanstack/react-router";
import { getPublicBlogs, getCmsSettings } from "../lib/api";
import logo from "../assets/logo.webp";
import { ArrowLeft, Clock, Phone, Calendar } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const Route = createFileRoute("/blogs_/$slug")({
  loader: async ({ params }) => {
    const [{ blogs }, { settings }] = await Promise.all([getPublicBlogs(), getCmsSettings()]);
    const blog = blogs.find((b: any) => b.slug === params.slug);
    if (!blog) {
      throw new Error("Blog article not found");
    }
    return { blog, cms: settings };
  },
  head: ({ loaderData }) => {
    const blog = loaderData?.blog;
    if (!blog) return { meta: [] };
    const pageTitle = (blog as any).seoTitle || `${blog.title} — Prime Cool`;
    const pageDesc = (blog as any).seoDesc || blog.summary;
    return {
      meta: [
        { title: pageTitle },
        { name: "description", content: pageDesc },
        { property: "og:title", content: pageTitle },
        { property: "og:description", content: pageDesc },
        { property: "og:image", content: blog.image || "" },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: pageTitle },
        { name: "twitter:description", content: pageDesc },
        { name: "twitter:image", content: blog.image || "" },
      ],
      links: [{ rel: "canonical", href: `/blogs/${blog.slug}` }],
    };
  },
  component: BlogDetailsPage,
});

function BlogDetailsPage() {
  const { blog, cms } = Route.useLoaderData();
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
              to="/blogs"
              className="text-sm font-medium hover:text-primary transition flex items-center gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Articles</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-28 pb-20 px-6">
        <article className="mx-auto max-w-3xl">
          {/* Article Header */}
          <div className="space-y-4 mb-8">
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground font-mono">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-primary" />
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              {(blog as any).category && (
                <span className="uppercase text-[9px] font-bold tracking-wider text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-2 py-0.5 rounded-full">
                  {(blog as any).category}
                </span>
              )}
              {(blog as any).author && (
                <span className="text-muted-foreground/70">by {(blog as any).author}</span>
              )}
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight">
              {blog.title}
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed italic border-l-2 border-primary/50 pl-4 bg-primary/5 py-2 rounded-r-lg">
              {blog.summary}
            </p>
          </div>

          {/* Featured Image */}
          {blog.image && (
            <div className="aspect-video relative overflow-hidden rounded-2xl border border-border/60 bg-muted mb-10 shadow-lg">
              <img src={blog.image} alt={blog.title} className="object-cover w-full h-full" />
            </div>
          )}

          {/* Article Markdown Content */}
          <div className="prose prose-invert max-w-none text-muted-foreground space-y-6 leading-relaxed text-sm md:text-base">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{blog.content}</ReactMarkdown>
          </div>

          {/* Call to action */}
          <div className="mt-16 p-8 rounded-2xl border border-border/80 bg-card/20 space-y-4 text-center">
            <h3 className="font-display text-xl font-bold">
              Need professional technical assistance?
            </h3>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              Our technicians service industrial, commercial, and residential cooling systems along
              the Wagholi–Shirur route daily.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:opacity-90 transition glow-ring animate-pulse-ring"
              >
                <Clock className="h-4 w-4" /> Book a Visit
              </Link>
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3 text-sm font-semibold hover:bg-card transition"
              >
                <Phone className="h-4 w-4 text-primary" /> Call Saurav Temgire
              </a>
            </div>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground bg-card/20">
        <div>© {new Date().getFullYear()} Prime Cool — Mechanical Climate Solutions</div>
      </footer>
    </div>
  );
}
