import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { getCmsSettings } from "../../lib/api";
import {
  BookOpen,
  Search,
  CheckCircle,
  Phone,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  HelpCircle,
  AlertTriangle,
} from "lucide-react";

export const Route = createFileRoute("/guides/")({
  loader: async () => {
    const { settings } = await getCmsSettings();
    return { cms: settings };
  },
  head: ({ loaderData }) => {
    const seo = loaderData?.cms?.seo?.guides;
    const pageTitle = seo?.title || "Field Troubleshooting Guides & Error Codes | Prime Cool Pune";
    const pageDesc =
      seo?.description ||
      "Step-by-step HVAC diagnostic guides, superheat/subcooling measurement, low suction pressure troubleshooting, evaporator coil freezing solutions, and OEM refrigerator error codes.";

    return {
      meta: [
        { title: pageTitle },
        { name: "description", content: pageDesc },
        { property: "og:title", content: pageTitle },
        { property: "og:description", content: pageDesc },
        { property: "og:type", content: "website" },
      ],
      links: [{ rel: "canonical", href: "https://primecool.in/guides" }],
    };
  },
  component: GuidesDirectoryPage,
});

const GUIDES_LIST = [
  {
    slug: "ac-not-cooling",
    title: "AC Not Cooling — Diagnostics & Quick Fixes",
    category: "Air Conditioning",
    desc: "Systematic 6-step diagnostic checklist for air conditioners blowing warm air or running continuously without cooling.",
    badgeColor: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
  },
  {
    slug: "refrigerator-error-codes",
    title: "OEM Refrigerator & Freezer Error Codes",
    category: "Error Codes & Diagnostics",
    desc: "Complete error code lookup table for LG, Samsung, Whirlpool, Godrej, and Haier inverter refrigerators.",
    badgeColor: "bg-purple-500/10 border-purple-500/30 text-purple-400",
  },
  {
    slug: "low-suction",
    title: "Low Suction Pressure — Root Causes & Solutions",
    category: "Refrigeration Pressure",
    desc: "How to identify undercharge, clogged filter driers, restricted TXVs, or dirty evaporator airflow causing low suction pressure.",
    badgeColor: "bg-blue-500/10 border-blue-500/30 text-blue-400",
  },
  {
    slug: "high-head",
    title: "High Head Pressure — Troubleshooting Guide",
    category: "Refrigeration Pressure",
    desc: "Diagnosing non-condensable gases, overcharge, dirty condenser coils, or failed condenser fans causing high head pressure trips.",
    badgeColor: "bg-amber-500/10 border-amber-500/30 text-amber-400",
  },
  {
    slug: "coil-freezing",
    title: "Evaporator Coil Freezing & Ice Formation",
    category: "Airflow & Moisture",
    desc: "Why indoor AC coils freeze into ice blocks: airflow restriction, clogged air filters, low refrigerant charge, or blower motor failure.",
    badgeColor: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
  },
  {
    slug: "how-to-superheat",
    title: "How to Measure & Calculate Target Superheat",
    category: "Field Calculations",
    desc: "Step-by-step superheat formula guide for fixed orifice capillary tube and TXV systems using manifold gauges.",
    badgeColor: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
  },
  {
    slug: "how-to-subcooling",
    title: "How to Measure & Calculate Subcooling",
    category: "Field Calculations",
    desc: "Verifying liquid line subcooling to ensure solid liquid column at TXV inlet and correct refrigerant charge level.",
    badgeColor: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
  },
  {
    slug: "short-cycling",
    title: "Compressor Short Cycling Remedies",
    category: "Electrical & Control",
    desc: "Fixing frequent compressor start-stop cycles caused by high/low pressure cutouts, oversized tonnage, or bad thermostats.",
    badgeColor: "bg-rose-500/10 border-rose-500/30 text-rose-400",
  },
];

function GuidesDirectoryPage() {
  const { cms } = Route.useLoaderData();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGuides = GUIDES_LIST.filter(
    (g) =>
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.desc.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,200,255,0.08),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 noise-overlay opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 z-10 space-y-12">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00c8ff]/10 border border-[#00c8ff]/20 text-[#00c8ff] text-xs font-bold uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(0,200,255,0.2)]">
            <BookOpen className="w-3.5 h-3.5" />
            Field Diagnostics & Troubleshooting
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Troubleshooting <span className="text-shimmer">Guides Hub.</span>
          </h1>
          <p className="text-base text-slate-400 leading-relaxed">
            Practical HVAC/R field troubleshooting procedures, pressure anomaly diagnostics, OEM
            error code tables, and superheat calculation walkthroughs.
          </p>
        </div>

        {/* Search Control */}
        <div className="max-w-xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search guide (e.g. AC Not Cooling, Error Codes, Low Suction, Superheat)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-12 pr-4 py-3.5 border-2 border-border rounded-2xl bg-card text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <div
              key={guide.slug}
              className="group relative flex flex-col justify-between p-6 rounded-3xl bg-card/60 border border-white/10 hover:border-[#00c8ff]/40 hover:shadow-[0_0_30px_rgba(0,200,255,0.15)] transition-all duration-300 backdrop-blur-md overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${guide.badgeColor}`}
                  >
                    {guide.category}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-[#00c8ff] transition-colors">
                  {guide.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed mb-6">{guide.desc}</p>
              </div>

              <div className="pt-4 border-t border-white/8 flex items-center justify-between">
                <Link
                  to={`/guides/${guide.slug}` as any}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#00c8ff] hover:text-[#00ffcc] transition-colors"
                >
                  Read Diagnostic Guide &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
