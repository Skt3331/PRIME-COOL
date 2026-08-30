import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { getPublicProjects, getCmsSettings } from "../lib/api";
import logo from "../assets/logo.webp";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Clock,
  Wrench,
  Snowflake,
  ShieldCheck,
  Zap,
  Activity,
  Layers,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
  Calendar,
} from "lucide-react";

export const Route = createFileRoute("/portfolio")({
  loader: async () => {
    try {
      const [projectsResp, settingsResp] = await Promise.all([
        getPublicProjects().catch(() => ({ projects: [] })),
        getCmsSettings().catch(() => ({ settings: {} })),
      ]);
      return { projects: projectsResp?.projects || [], cms: settingsResp?.settings || {} };
    } catch (e) {
      console.error("Failed to load portfolio projects:", e);
      return { projects: [], cms: {} };
    }
  },
  head: ({ loaderData }) => {
    const seo = loaderData?.cms?.seo?.portfolio;
    const title = seo?.title || "HVAC & Cold Storage Project Portfolio | Verified Case Studies | Prime Cool Pune";
    const description =
      seo?.description ||
      "Verified HVAC project portfolio: VRF multi-zone installations, factory chiller plant overhauls, pharmaceutical cold storage commissioning, and split AC bulk rollouts across Pune, Ranjangaon MIDC, Chakan MIDC, and PCMC industrial zones.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "keywords", content: "HVAC project portfolio Pune, VRF installation case study, industrial chiller overhaul, cold storage installation, AC installation MIDC, HVAC contractor portfolio" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:image", content: "https://primecool.in/logo.png" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "geo.region", content: "IN-MH" },
        { name: "geo.placename", content: "Pune, Maharashtra, India" },
      ],
      links: [{ rel: "canonical", href: "https://primecool.in/portfolio" }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Prime Cool HVAC Project Portfolio",
            url: "https://primecool.in/portfolio",
            description,
            publisher: {
              "@type": "Organization",
              name: "Prime Cool",
              url: "https://primecool.in",
            },
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://primecool.in" },
                { "@type": "ListItem", position: 2, name: "Portfolio", item: "https://primecool.in/portfolio" },
              ],
            },
          }),
        },
      ],
    };
  },
  component: PortfolioPage,
});

function PortfolioPage() {
  const { projects, cms } = Route.useLoaderData() as { projects: any[]; cms: any };
  const [filter, setFilter] = useState<"all" | "domestic" | "commercial" | "industrial">("all");
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const socials = cms?.socials || {};
  const phone = socials.phone || "+917507408461";

  const filteredProjects = projects.filter((p: any) => {
    if (filter === "all") return true;
    return p.category === filter;
  });

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "industrial":
        return "text-[#a3e635] bg-[#a3e635]/10 border-[#a3e635]/20"; // lime-like
      case "commercial":
        return "text-cyan-400 bg-cyan-400/10 border-cyan-400/20";
      default:
        return "text-blue-400 bg-blue-400/10 border-blue-400/20";
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,102,255,0.05),transparent_50%)] pointer-events-none" />
      {/* Navigation Header */}
      {/* Header removed, now in __root.tsx */}

      {/* Main Content */}
      <main className="flex-1 pt-28 pb-20 px-6 relative z-10">
        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-up">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
              <span className="h-px w-6 bg-primary" />
              Engineering Portfolio
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight">
              Industrial Case Studies & <span className="text-shimmer">Previous Works.</span>
            </h1>
            <p className="mt-4 text-sm text-muted-foreground delay-100 animate-fade-up">
              Review real engineering metrics and outcomes. From domestic AC installations to
              factory-scale cooling towers, we deliver zero-downtime maintenance.
            </p>
          </div>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10 animate-fade-up delay-200">
            {[
              { id: "all", name: "All Projects" },
              { id: "domestic", name: "Domestic Solutions" },
              { id: "commercial", name: "Commercial Systems" },
              { id: "industrial", name: "Heavy Industrial" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-5 py-2.5 text-xs font-semibold rounded-full border transition duration-300 ${
                  filter === tab.id
                    ? "border-primary/50 bg-primary/20 text-white shadow-glow"
                    : "glass-panel text-muted-foreground hover:border-primary/30 hover:text-white bg-black/40"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((p: any, idx: number) => (
                <article
                  key={p.id}
                  onClick={() => setSelectedProject(p)}
                  className="group bento-card p-7 flex flex-col justify-between hover:scale-[1.02] transition-all duration-300 relative overflow-hidden cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Subtle float animation applied differently to staggered indexes */}
                  <div
                    className={`relative z-10 ${idx % 2 === 0 ? "animate-float" : ""}`}
                    style={{ animationDelay: `${idx * 0.5}s` }}
                  >
                    {/* Image space if uploaded */}
                    {p.image && (
                      <div className="relative aspect-video rounded-xl overflow-hidden mb-5 border border-border bg-black/50">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-primary">
                        {p.location}
                      </span>
                      <span
                        className={`text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border ${getCategoryColor(p.category)}`}
                      >
                        {p.category}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold mt-3 leading-snug group-hover:text-primary transition duration-300">
                      {p.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                      {p.summary}
                    </p>
                  </div>

                  <div className="mt-8 pt-5 border-t border-border/50">
                    <div className="grid grid-cols-3 gap-3">
                      {p.metrics?.map((m: any) => (
                        <div key={m.label}>
                          <div className="font-display text-lg font-bold text-gradient">
                            {m.value}
                          </div>
                          <div className="text-[9px] uppercase tracking-wider text-muted-foreground/80 mt-0.5 leading-none">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 surface-card rounded-2xl border border-border max-w-md mx-auto">
              <Layers className="h-10 w-10 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="font-display text-lg font-bold">No projects found</h3>
              <p className="text-sm text-muted-foreground mt-2 px-6">
                No case studies recorded under the "{filter}" category yet. New projects added in
                the Admin Panel sync here automatically.
              </p>
            </div>
          )}

          {/* Book Now Section */}
          <div className="mt-16 surface-card border border-border/60 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,102,255,0.1),transparent_70%)]" />
            <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-primary/20 blur-3xl group-hover:bg-primary/30 transition duration-700" />
            <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-accent/20 blur-3xl group-hover:bg-accent/30 transition duration-700" />

            <div className="relative max-w-2xl mx-auto space-y-6 z-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight">
                Need similar engineering <span className="text-shimmer">excellence?</span>
              </h2>
              <p className="text-sm text-muted-foreground">
                Get rapid, AMC-backed support along the Wagholi–Shirur route. Book a technician
                online or check time slots directly.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
                <Link to="/booking" search={{}} className="btn-primary">
                  Book Online Now <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={`tel:${phone.replace(/\s+/g, "")}`} className="btn-secondary">
                  <PhoneIcon className="h-4 w-4" /> Call Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Case Study Detail Modal Overlay */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-border/80 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 space-y-6 relative shadow-2xl animate-in fade-in zoom-in duration-200 text-left">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-white p-1 rounded-full border border-border bg-slate-950/40 transition h-8 w-8 flex items-center justify-center text-lg font-bold"
              aria-label="Close dialog"
            >
              ×
            </button>

            {selectedProject.image && (
              <div className="aspect-video w-full rounded-xl overflow-hidden border border-border/40 bg-slate-950">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/20 border border-primary/30 px-3 py-1 text-xs text-primary font-semibold font-mono uppercase">
                <MapPin className="h-3.5 w-3.5" />
                <span>{selectedProject.location}</span>
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-800 border border-border px-3 py-1 text-xs text-muted-foreground font-semibold font-mono uppercase">
                <span>{selectedProject.category}</span>
              </span>
            </div>

            <h3 className="font-display text-xl md:text-2xl font-bold text-white leading-tight">
              {selectedProject.title}
            </h3>

            <div className="space-y-4">
              <p className="text-xs md:text-sm text-foreground leading-relaxed font-semibold">
                {selectedProject.summary}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {selectedProject.description ||
                  "This project represents one of our custom field operations along the Pune industrial corridors. Prime Cool handles full diagnostics, sourcing of original components, and certification. Contact us for custom mechanical setups."}
              </p>
            </div>

            {selectedProject.metrics && selectedProject.metrics.length > 0 && (
              <div className="pt-4 border-t border-border/40">
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block mb-3">
                  Key Performance Metrics
                </span>
                <div className="grid grid-cols-3 gap-4 text-center">
                  {selectedProject.metrics.map((m: any) => (
                    <div
                      key={m.label}
                      className="bg-slate-950/40 p-3 rounded-xl border border-border/20"
                    >
                      <div className="font-display text-sm md:text-base font-bold text-gradient">
                        {m.value}
                      </div>
                      <div
                        className="text-[8px] md:text-[9px] uppercase tracking-wider text-muted-foreground mt-0.5 truncate"
                        title={m.label}
                      >
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-border/40 flex justify-end gap-3">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2.5 text-xs font-semibold rounded-full border border-border hover:bg-slate-800 transition"
              >
                Close Details
              </button>
              <Link
                to="/booking"
                search={{}}
                onClick={() => setSelectedProject(null)}
                className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-xs font-semibold hover:opacity-90 transition glow-ring cursor-pointer"
              >
                <Calendar className="h-4 w-4" />
                <span>Inquire About This Service</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      {/* Footer removed, now in __root.tsx */}
    </div>
  );
}

// Inline fallback for the lucide icons used dynamically
const PhoneIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
