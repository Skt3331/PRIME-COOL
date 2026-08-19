import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { getCmsSettings } from "../../lib/api";
import {
  Flame,
  Search,
  CheckCircle,
  Phone,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  Activity,
  Gauge,
} from "lucide-react";

export const Route = createFileRoute("/refrigerants/")({
  loader: async () => {
    const { settings } = await getCmsSettings();
    return { cms: settings };
  },
  head: ({ loaderData }) => {
    const seo = loaderData?.cms?.seo?.refrigerants;
    const pageTitle = seo?.title || "Refrigerant PT Pressure Charts & Technical Hub | R410A, R32, R134a | Prime Cool";
    const pageDesc =
      seo?.description ||
      "Technical thermodynamic pressure-temperature PT data, glide properties, charging procedures, and leak diagnostics for R-410A, R-32, R-134a, R-404A, R-407C, R-22, and R-290.";

    return {
      meta: [
        { title: pageTitle },
        { name: "description", content: pageDesc },
        { property: "og:title", content: pageTitle },
        { property: "og:description", content: pageDesc },
        { property: "og:type", content: "website" },
      ],
      links: [{ rel: "canonical", href: "https://primecool.in/refrigerants" }],
    };
  },
  component: RefrigerantsDirectoryPage,
});

const REFRIGERANTS_LIST = [
  {
    slug: "r410a",
    name: "R-410A (Puron / Near-Azeotropic Blend)",
    type: "HFC Synthetic Blend",
    suctionPSI: "115 - 130 PSI",
    dischargePSI: "325 - 400 PSI",
    gwp: "2088",
    safety: "A1 Non-Toxic / Non-Flammable",
    desc: "High-pressure near-azeotropic HFC blend (50% R-32 / 50% R-125) widely used in modern inverter split ACs.",
    badgeColor: "bg-pink-500/10 border-pink-500/30 text-pink-400",
  },
  {
    slug: "r32",
    name: "R-32 (Difluoromethane)",
    type: "Single-Component HFC",
    suctionPSI: "120 - 135 PSI",
    dischargePSI: "330 - 410 PSI",
    gwp: "675",
    safety: "A2L Mildly Flammable",
    desc: "Next-gen zero-ODP single component refrigerant with 67% lower GWP than R-410A and higher energy efficiency.",
    badgeColor: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
  },
  {
    slug: "r134a",
    name: "R-134a (Tetrafluoroethane)",
    type: "Pure HFC",
    suctionPSI: "15 - 22 PSI (Ref) / 30 - 35 PSI (Chiller)",
    dischargePSI: "135 - 170 PSI",
    gwp: "1430",
    safety: "A1 Non-Toxic / Non-Flammable",
    desc: "Standard medium-pressure refrigerant for domestic refrigerators, automotive AC, and centrifugal water chillers.",
    badgeColor: "bg-blue-500/10 border-blue-500/30 text-blue-400",
  },
  {
    slug: "r404a",
    name: "R-404A (Low-Temp Blend)",
    type: "HFC Near-Azeotrope",
    suctionPSI: "28 - 35 PSI (Commercial Freezers)",
    dischargePSI: "275 - 320 PSI",
    gwp: "3922",
    safety: "A1 Non-Toxic / Non-Flammable",
    desc: "Heavy-duty low and medium-temperature commercial refrigeration blend for supermarket freezers and walk-in coolers.",
    badgeColor: "bg-purple-500/10 border-purple-500/30 text-purple-400",
  },
  {
    slug: "r407c",
    name: "R-407C (Zeotropic Replacement)",
    type: "HFC Zeotropic Blend",
    suctionPSI: "65 - 75 PSI",
    dischargePSI: "230 - 275 PSI",
    gwp: "1774",
    safety: "A1 Non-Toxic / Non-Flammable",
    desc: "Zeotropic HFC blend (R-32/R-125/R-134a) designed as a drop-in retrofit for legacy R-22 commercial rooftop units.",
    badgeColor: "bg-amber-500/10 border-amber-500/30 text-amber-400",
  },
  {
    slug: "r22",
    name: "R-22 (Freon HCFC)",
    type: "HCFC (Legacy Standard)",
    suctionPSI: "60 - 70 PSI",
    dischargePSI: "210 - 260 PSI",
    gwp: "1810",
    safety: "A1 Non-Toxic / Non-Flammable",
    desc: "Legacy HCFC refrigerant used in older split ACs. Being phased out globally due to ozone depletion potential (ODP).",
    badgeColor: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
  },
];

function RefrigerantsDirectoryPage() {
  const { cms } = Route.useLoaderData();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRefrigerants = REFRIGERANTS_LIST.filter(
    (r) =>
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.desc.toLowerCase().includes(searchQuery.toLowerCase()),
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
            <Gauge className="w-3.5 h-3.5" />
            Thermodynamic Field Engineering
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Refrigerant PT Data & <span className="text-shimmer">Technical Hub.</span>
          </h1>
          <p className="text-base text-slate-400 leading-relaxed">
            Pressure-Temperature (PT) charts, suction operating bounds, safety classifications, and charging diagnostics for field HVAC technicians and plant engineers.
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
              placeholder="Search refrigerant (e.g. R410A, R32, R134a, R404A, Suction PSI)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-12 pr-4 py-3.5 border-2 border-border rounded-2xl bg-card text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Refrigerants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRefrigerants.map((ref) => (
            <div
              key={ref.slug}
              className="group relative flex flex-col justify-between p-6 rounded-3xl bg-card/60 border border-white/10 hover:border-[#00c8ff]/40 hover:shadow-[0_0_30px_rgba(0,200,255,0.15)] transition-all duration-300 backdrop-blur-md overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${ref.badgeColor}`}>
                    {ref.type}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-[#00c8ff] transition-colors">
                  {ref.name}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed mb-5">
                  {ref.desc}
                </p>

                <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-black/40 border border-white/5 mb-6 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Suction PSI Range</span>
                    <span className="font-bold text-emerald-400 block mt-0.5">{ref.suctionPSI}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Discharge PSI Range</span>
                    <span className="font-bold text-[#00c8ff] block mt-0.5">{ref.dischargePSI}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/8 flex items-center justify-between">
                <Link
                  to="/refrigerants/$slug"
                  params={{ slug: ref.slug }}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#00c8ff] hover:text-[#00ffcc] transition-colors"
                >
                  View Full {ref.name} PT Chart &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Launch PT Tool Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-[#0a0a14] to-[#09090f] border border-white/10 text-center max-w-4xl mx-auto shadow-2xl">
          <h2 className="font-display text-2xl font-bold text-white mb-2">Need Live Interactive Pressure-Temperature Calculations?</h2>
          <p className="text-sm text-slate-400 mb-6 max-w-xl mx-auto">
            Use our field-ready PT chart tool to dynamically look up bubble/dew saturation points for R-410A, R-32, R-134a, R-404A, and R-22.
          </p>
          <Link
            to="/tools/pt-calculator"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#00c8ff] hover:bg-[#00ffcc] text-[#09090f] font-bold transition-all text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,200,255,0.4)]"
          >
            Launch Interactive PT Calculator &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
