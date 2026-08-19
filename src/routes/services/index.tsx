import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { servicesData } from "../../lib/services-data";
import { getCmsSettings } from "../../lib/api";
import {
  Search,
  Wrench,
  ShieldCheck,
  CheckCircle,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/services/")({
  validateSearch: (search: Record<string, unknown>) => ({
    cat: (search.cat as string) || "all",
  }),
  loader: async () => {
    const { settings } = await getCmsSettings();
    return { cms: settings };
  },
  head: ({ loaderData }) => {
    const seo = loaderData?.cms?.seo?.services;
    const pageTitle = seo?.title || "Professional HVAC, AC Repair & Refrigeration Services | Prime Cool";
    const pageDesc =
      seo?.description ||
      "Comprehensive cooling services across Maharashtra. We offer split AC repair, VRF/VRV central HVAC, water chillers, cold rooms, and commercial refrigeration maintenance.";

    return {
      meta: [
        { title: pageTitle },
        { name: "description", content: pageDesc },
        { property: "og:title", content: pageTitle },
        { property: "og:description", content: pageDesc },
        { property: "og:type", content: "website" },
      ],
      links: [{ rel: "canonical", href: "https://primecool.in/services" }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Prime Cool HVAC Services Directory",
            url: "https://primecool.in/services",
            numberOfItems: 7,
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Split & Inverter AC Repair", url: "https://primecool.in/services/split-ac-repair" },
              { "@type": "ListItem", position: 2, name: "Cassette AC Maintenance", url: "https://primecool.in/services/cassette-ac-repair" },
              { "@type": "ListItem", position: 3, name: "AC Gas Recharging & Leak Testing", url: "https://primecool.in/services/ac-gas-charging" },
              { "@type": "ListItem", position: 4, name: "VRF / VRV Central HVAC Systems", url: "https://primecool.in/services/vrf-systems" },
              { "@type": "ListItem", position: 5, name: "Walk-in Cold Rooms & Blast Freezers", url: "https://primecool.in/services/cold-rooms" },
              { "@type": "ListItem", position: 6, name: "Commercial Refrigerator Overhaul", url: "https://primecool.in/services/fridge-repair" },
              { "@type": "ListItem", position: 7, name: "Industrial Washing & Laundry Plant", url: "https://primecool.in/services/washing-machine" },
            ],
          }),
        },
      ],
    };
  },
  component: ServicesDirectoryPage,
});

function ServicesDirectoryPage() {
  const { cms } = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const activeCategory = (search.cat as string) || "all";

  const handleCategoryChange = (catId: string) => {
    navigate({
      search: (prev: any) => ({ ...prev, cat: catId }),
      replace: true,
    });
  };

  const services = Object.values(servicesData);

  // Filter based on search query and category tab
  const filteredServices = services.filter((s) => {
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === "all"
        ? !s.slug.startsWith("pcb-")
        : activeCategory === "pcb"
        ? s.slug.startsWith("pcb-")
        : s.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: "all", label: "All Services" },
    { id: "residential", label: "Residential AC" },
    { id: "commercial", label: "Commercial HVAC" },
    { id: "pcb", label: "⚡ Inverter PCB Repair (50)" },
    { id: "refrigeration", label: "Refrigeration" },
    { id: "industrial", label: "Industrial Plants" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,200,255,0.08),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 noise-overlay opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00c8ff]/10 border border-[#00c8ff]/20 text-[#00c8ff] text-xs font-bold uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(0,200,255,0.2)]">
            <Sparkles className="w-3.5 h-3.5" />
            Precision Mechanical & HVAC Solutions
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Services & <span className="text-shimmer">Engineering Hub.</span>
          </h1>
          <p className="text-base text-slate-400 leading-relaxed">
            From residential split AC tuning to heavy industrial refrigeration plants, we provide certified HVAC diagnostics, rapid installations, and zero-downtime preventative maintenance.
          </p>
        </div>

        {/* Controls: Search & Category Filter Pills */}
        <div className="mb-12 space-y-6">
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search services (e.g. Inverter AC, VRF, Chiller, Cold Room)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-12 pr-4 py-3.5 border-2 border-border rounded-2xl bg-card text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-[#00c8ff] text-[#09090f] shadow-[0_4px_20px_rgba(0,200,255,0.4)] scale-105"
                    : "bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((s) => (
              <div
                key={s.slug}
                className="cv-auto gpu-accelerated group relative flex flex-col justify-between p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm shadow-md"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                      {s.category}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {s.priceEstimate.split(" +")[0]}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-6 line-clamp-3">
                    {s.tagline}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {s.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-start text-xs text-slate-300">
                        <CheckCircle className="w-3.5 h-3.5 text-cyan-400 mr-2 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-4 rounded-xl bg-slate-800 text-white font-medium hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 transition-all text-sm group/btn"
                >
                  View Service Details
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-900/20 rounded-2xl border border-dashed border-slate-800">
            <Wrench className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white">No services found</h3>
            <p className="text-slate-400 mt-1 max-w-xs mx-auto text-sm">
              We couldn't find any services matching your search or selected category.
            </p>
          </div>
        )}

        {/* Call to Action Banner */}
        <div className="mt-20 relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 overflow-hidden text-center max-w-4xl mx-auto">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
            Need Custom HVAC or Plant Engineering?
          </h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            Get in touch with our lead diagnostic engineer for dedicated contract plans, audits, and custom cooling requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/booking"
              className="px-8 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold transition-all"
            >
              Book Service Online
            </Link>
            <a
              href={`tel:${cms?.socials?.phone || "+917507408461"}`}
              className="px-8 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all border border-slate-700"
            >
              Call Specialist
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
