import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { getCmsSettings } from "../../lib/api";
import {
  Calculator,
  Search,
  CheckCircle,
  Phone,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  Activity,
  Layers,
} from "lucide-react";

export const Route = createFileRoute("/formulas/")({
  loader: async () => {
    const { settings } = await getCmsSettings();
    return { cms: settings };
  },
  head: ({ loaderData }) => {
    const seo = loaderData?.cms?.seo?.formulas;
    const pageTitle =
      seo?.title || "HVAC & Refrigeration Engineering Formulas Reference | Prime Cool";
    const pageDesc =
      seo?.description ||
      "Comprehensive thermodynamic formulas reference for sensible heat, latent heat, enthalpy, CFM airflow calculations, COP to EER conversions, superheat, and subcooling.";

    return {
      meta: [
        { title: pageTitle },
        { name: "description", content: pageDesc },
        { property: "og:title", content: pageTitle },
        { property: "og:description", content: pageDesc },
        { property: "og:type", content: "website" },
      ],
      links: [{ rel: "canonical", href: "https://primecool.in/formulas" }],
    };
  },
  component: FormulasDirectoryPage,
});

const FORMULA_CATEGORIES = [
  {
    slug: "hvac",
    title: "HVAC Engineering & Airflow Formulas",
    category: "HVAC & Air Dynamics",
    desc: "Sensible heat (Q_s = 1.08 × CFM × ΔT), Latent heat (Q_l = 4840 × CFM × ΔW), Total heat (Q_t = 4.5 × CFM × Δh), and duct velocity formulas.",
    badgeColor: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
  },
  {
    slug: "refrigeration",
    title: "Refrigeration & Thermodynamic Formulas",
    category: "Refrigeration Cycle",
    desc: "Superheat (T_suction - T_sat), Subcooling (T_sat - T_liquid), Compression ratio, COP to EER conversion (EER = 3.412 × COP), and enthalpy formulas.",
    badgeColor: "bg-blue-500/10 border-blue-500/30 text-blue-400",
  },
];

function FormulasDirectoryPage() {
  const { cms } = Route.useLoaderData();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = FORMULA_CATEGORIES.filter(
    (f) =>
      f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.desc.toLowerCase().includes(searchQuery.toLowerCase()),
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
            <Calculator className="w-3.5 h-3.5" />
            Engineering Reference Library
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Engineering <span className="text-shimmer">Formulas Library.</span>
          </h1>
          <p className="text-base text-slate-400 leading-relaxed">
            Essential thermodynamic formulas, heat transfer equations, airflow relations, pressure
            conversions, and efficiency metrics for HVAC/R field engineers.
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
              placeholder="Search formula (e.g. Sensible Heat, CFM, Superheat, COP, Enthalpy)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-12 pr-4 py-3.5 border-2 border-border rounded-2xl bg-card text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Formulas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCategories.map((cat) => (
            <div
              key={cat.slug}
              className="group relative flex flex-col justify-between p-7 rounded-3xl bg-card/60 border border-white/10 hover:border-[#00c8ff]/40 hover:shadow-[0_0_30px_rgba(0,200,255,0.15)] transition-all duration-300 backdrop-blur-md overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${cat.badgeColor}`}
                  >
                    {cat.category}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-[#00c8ff] transition-colors">
                  {cat.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed mb-6 font-mono">{cat.desc}</p>
              </div>

              <div className="pt-4 border-t border-white/8 flex items-center justify-between">
                <Link
                  to={`/formulas/${cat.slug}` as any}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#00c8ff] hover:text-[#00ffcc] transition-colors"
                >
                  View Full Formula Sheet & Derivations &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
