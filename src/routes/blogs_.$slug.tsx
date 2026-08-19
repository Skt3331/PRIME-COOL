import { createFileRoute, Link } from "@tanstack/react-router";
import { getPublicBlogs, getCmsSettings } from "../lib/api";
import logo from "../assets/logo.webp";
import { ArrowLeft, Clock, Phone, Calendar, Calculator, ArrowRight } from "lucide-react";
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
    const meta: any[] = [
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
    ];
    
    if ((blog as any).seoKeywords) {
      meta.push({ name: "keywords", content: (blog as any).seoKeywords });
    }

    return {
      meta,
      links: [{ rel: "canonical", href: `https://primecool.in/blogs/${blog.slug}` }],
    };
  },
  component: BlogDetailsPage,
});

function BlogDetailsPage() {
  const { blog, cms } = Route.useLoaderData();
  const socials = cms?.socials || {};
  const phone = socials.phone || "+917507408461";

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "image": blog.image ? [`https://primecool.in${blog.image}`] : [],
    "datePublished": blog.createdAt,
    "dateModified": blog.updatedAt || blog.createdAt,
    "author": {
      "@type": "Person",
      "name": blog.author || "Prime Cool"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Prime Cool HVAC & Refrigeration",
      "logo": {
        "@type": "ImageObject",
        "url": cms?.theme?.logo || "https://primecool.in/logo.png"
      }
    },
    "description": blog.summary
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between relative overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,102,255,0.05),transparent_50%)] pointer-events-none" />
      {/* Main Content */}
      <main className="flex-1 pt-24 pb-20 px-6 max-w-7xl mx-auto w-full relative z-10">
        <article className="mx-auto max-w-3xl animate-fade-up">
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
            <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight text-white">
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
          <div className="mt-16 p-8 rounded-3xl surface-card border border-border/80 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,200,255,0.08),transparent_60%)] pointer-events-none" />
            <h3 className="font-display text-2xl font-bold text-white relative z-10">
              Need professional technical assistance?
            </h3>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto mt-3 relative z-10">
              Our technicians service industrial, commercial, and residential cooling systems along
              the Wagholi–Shirur route daily.
            </p>
            <div className="pt-6 flex flex-wrap justify-center gap-4 relative z-10">
              <Link to="/booking" className="btn-primary animate-pulse-ring">
                <Clock className="h-4 w-4" /> Book a Visit
              </Link>
              <a href={`tel:${phone.replace(/\s+/g, "")}`} className="btn-secondary">
                <Phone className="h-4 w-4" /> Call Saurav Temgire
              </a>
            </div>
          </div>

          {/* Interactive Calculators Link */}
          <div className="mt-8 p-6 rounded-3xl bg-secondary/30 border border-secondary/50 text-center relative overflow-hidden group flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-left">
              <h3 className="font-display text-xl font-bold text-white flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" /> Try Our HVAC Calculators
              </h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-md">
                Estimate your AC electricity bill or find out the perfect AC tonnage for your room using our free interactive calculators.
              </p>
            </div>
            <Link to="/resources" className="btn-secondary whitespace-nowrap shrink-0">
              Open Calculators <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}
