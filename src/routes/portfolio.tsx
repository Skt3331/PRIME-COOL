import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { getPublicProjects, getCmsSettings } from "../lib/api";
import logo from "@/assets/logo.png";
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
} from "lucide-react";

export const Route = createFileRoute("/portfolio")({
  loader: async () => {
    const [{ projects }, { settings }] = await Promise.all([
      getPublicProjects(),
      getCmsSettings(),
    ]);
    return { projects, cms: settings };
  },
  head: ({ loaderData }) => {
    const seo = loaderData?.cms?.seo?.portfolio;
    if (!seo) return { meta: [] };
    return {
      meta: [
        { title: seo.title },
        { name: "description", content: seo.description },
        { property: "og:title", content: seo.ogTitle },
        { property: "og:description", content: seo.ogDescription },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: seo.title },
        { name: "twitter:description", content: seo.description },
      ],
      links: [{ rel: "canonical", href: "/portfolio" }],
    };
  },
  component: PortfolioPage,
});

function PortfolioPage() {
  const { projects, cms } = Route.useLoaderData() as { projects: any[]; cms: any };
  const [filter, setFilter] = useState<"all" | "domestic" | "commercial" | "industrial">("all");
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
            <Link to="/" className="hover:text-foreground transition">Home</Link>
            <Link to="/portfolio" className="hover:text-foreground transition text-primary font-semibold">Projects</Link>
            <Link to="/blogs" className="hover:text-foreground transition">Blogs</Link>
            <Link to="/booking" search={{}} className="hover:text-foreground transition">Book Service</Link>
          </nav>
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-2 rounded-full border border-border p-2 sm:px-3 sm:py-1.5 text-xs font-medium hover:bg-card transition"
              title="Call Support"
            >
              <PhoneIcon className="h-4 w-4 text-primary" />
              <span className="hidden sm:inline">{phone}</span>
            </a>
            <Link to="/" className="text-sm font-medium hover:text-primary transition flex items-center gap-1">
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
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
              <span className="h-px w-6 bg-primary" />
              Proven Records
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight">
              Our case studies & <span className="text-gradient">previous works.</span>
            </h1>
            <p className="mt-4 text-sm text-muted-foreground">
              Review real engineering metrics and outcomes. From domestic AC installations to factory-scale cooling towers, we deliver zero-downtime maintenance.
            </p>
          </div>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {[
              { id: "all", name: "All Projects" },
              { id: "domestic", name: "Domestic Solutions" },
              { id: "commercial", name: "Commercial Systems" },
              { id: "industrial", name: "Heavy Industrial" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl border transition ${
                  filter === tab.id
                    ? "border-primary bg-primary/10 text-primary ring-1 ring-primary"
                    : "border-border bg-card/30 text-muted-foreground hover:border-primary/30 hover:text-foreground"
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
                  className="group surface-card rounded-2xl p-7 border border-border flex flex-col justify-between hover:border-primary/40 hover:scale-[1.01] transition-all duration-300 relative overflow-hidden"
                >
                  {/* Subtle float animation applied differently to staggered indexes */}
                  <div className={idx % 2 === 0 ? "animate-float" : ""} style={{ animationDelay: `${idx * 0.5}s` }}>
                    {/* Image space if uploaded */}
                    {p.image && (
                      <div className="relative aspect-video rounded-xl overflow-hidden mb-5 border border-border/40 bg-background/50">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-primary">
                        {p.location}
                      </span>
                      <span className={`text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border ${getCategoryColor(p.category)}`}>
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
                No case studies recorded under the "{filter}" category yet. New projects added in the Admin Panel sync here automatically.
              </p>
            </div>
          )}

          {/* Book Now Section */}
          <div className="mt-16 bg-gradient-to-r from-card to-background border border-border rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />
            
            <div className="relative max-w-2xl mx-auto space-y-6">
              <h2 className="font-display text-3xl font-bold leading-tight">
                Need similar engineering <span className="text-gradient">excellence?</span>
              </h2>
              <p className="text-sm text-muted-foreground">
                Get rapid, AMC-backed support along the Wagholi–Shirur route. Book a technician online or check time slots directly.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                <Link
                  to="/booking"
                  search={{}}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:opacity-90 transition glow-ring"
                >
                  Book Online Now <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card/40 px-6 py-3 text-sm font-semibold hover:bg-card transition"
                >
                  <PhoneIcon className="h-4 w-4 text-primary" /> Call Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground bg-card/20 space-y-4">
        <div className="flex justify-center gap-4 text-muted-foreground">
          {socials.facebook && (
            <a href={socials.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">
              <Facebook className="h-4.5 w-4.5" />
            </a>
          )}
          {socials.instagram && (
            <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">
              <Instagram className="h-4.5 w-4.5" />
            </a>
          )}
          {socials.linkedin && (
            <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">
              <Linkedin className="h-4.5 w-4.5" />
            </a>
          )}
          {socials.youtube && (
            <a href={socials.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">
              <Youtube className="h-4.5 w-4.5" />
            </a>
          )}
          {socials.twitter && (
            <a href={socials.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">
              <Twitter className="h-4.5 w-4.5" />
            </a>
          )}
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Prime Cool logo" className="h-5 w-5" />
            <span>© {new Date().getFullYear()} Prime Cool — Proprietor Saurav Temgire</span>
          </div>
          {socials.email && (
            <a href={`mailto:${socials.email}`} className="hover:text-primary transition underline">
              {socials.email}
            </a>
          )}
          <div className="text-[10px] text-muted-foreground/60">Wagholi · Lonikand · Koregaon Bhima · Shikrapur · Karegaon · Ranjangaon · Shirur</div>
        </div>
      </footer>
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
