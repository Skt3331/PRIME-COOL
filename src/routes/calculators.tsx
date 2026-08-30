import { createFileRoute, Link } from "@tanstack/react-router";
import { getCmsSettings } from "../lib/api";
import {
  ThermometerSnowflake,
  Wind,
  Gauge,
  Zap,
  Droplets,
  Ruler,
  BatteryCharging,
  ArrowRight,
  Fan,
  Activity,
  Calculator,
  Flame,
  ArrowUpRight,
} from "lucide-react";

export const Route = createFileRoute("/calculators")({
  loader: async () => {
    try {
      const resp = await getCmsSettings().catch(() => ({ settings: {} }));
      return { cms: resp?.settings || {} };
    } catch (e) {
      console.error("Failed to load CMS settings for calculators:", e);
      return { cms: {} };
    }
  },
  head: ({ loaderData }) => {
    const seo = loaderData?.cms?.seo?.calculators;
    const title = seo?.title || "22+ Free HVAC & AC Engineering Calculators | BTU, Tonnage, Superheat | Prime Cool Pune";
    const description =
      seo?.description ||
      "Free online HVAC engineering tools: AC tonnage calculator, BTU heat load, R-32/R-410A refrigerant PT charts, superheat, subcooling, electricity cost estimator, and pipe sizing — built for Pune conditions.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "keywords", content: "AC tonnage calculator, BTU calculator Pune, HVAC calculator India, superheat calculator, subcooling calculator, refrigerant pressure temperature chart, R410A PT chart, R32 PT chart" },
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
      links: [{ rel: "canonical", href: "https://primecool.in/calculators" }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Prime Cool HVAC Engineering Calculator Suite",
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Web Browser",
            url: "https://primecool.in/calculators",
            description,
            offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
            author: {
              "@type": "Organization",
              name: "Prime Cool",
              url: "https://primecool.in",
            },
          }),
        },
      ],
    };
  },
  component: CalculatorsPage,
});

const POPULAR_TOOLS = [
  {
    title: "BTU Heat Load",
    desc: "Calculate room heat load for accurate AC sizing",
    to: "/tools/btu-calculator",
    icon: Flame,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
  },
  {
    title: "AC Tonnage",
    desc: "Convert area directly to required cooling tonnage",
    to: "/tools/tonnage-calculator",
    icon: ThermometerSnowflake,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    border: "border-cyan-400/20",
  },
  {
    title: "Superheat",
    desc: "Check target vs actual superheat for TXV systems",
    to: "/tools/superheat-calculator",
    icon: Gauge,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20",
  },
  {
    title: "Subcooling",
    desc: "Measure liquid line subcooling for charge verification",
    to: "/tools/subcooling-calculator",
    icon: Droplets,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
];

const CATEGORIES = [
  {
    title: "Load & Sizing",
    icon: Ruler,
    tools: [
      { title: "Cooling Load", desc: "Advanced sensible/latent load", to: "/tools/cooling-load" },
      { title: "Duct Sizing", desc: "Friction rate & duct dims", to: "/tools/duct-calculator" },
      { title: "Pipe Sizing", desc: "Refrigerant line sizing", to: "/tools/pipe-sizing" },
    ],
  },
  {
    title: "Refrigeration",
    icon: Activity,
    tools: [
      { title: "PT Chart Tool", desc: "Saturation pressure-temp", to: "/tools/pt-calculator" },
      {
        title: "Charge Calculator",
        desc: "Line set charge addition",
        to: "/tools/charge-calculator",
      },
      {
        title: "Compressor Cap.",
        desc: "Volume & compression ratio",
        to: "/tools/compressor-capacity",
      },
      { title: "Vacuum Convert", desc: "Microns to inHg / Torr", to: "/tools/vacuum-convert" },
    ],
  },
  {
    title: "Airflow & Environment",
    icon: Fan,
    tools: [
      { title: "CFM Calculator", desc: "Airflow volume measurement", to: "/tools/cfm-calculator" },
      { title: "Air Velocity", desc: "FPM in duct cross-sections", to: "/tools/air-velocity" },
      { title: "Psychrometric", desc: "Wet bulb & relative humidity", to: "/tools/psychrometric" },
      {
        title: "Cooling Tower",
        desc: "Approach & range efficiency",
        to: "/tools/cooling-tower-approach",
      },
    ],
  },
  {
    title: "Electrical & Efficiency",
    icon: Zap,
    tools: [
      { title: "Electricity Cost", desc: "Running cost estimation", to: "/tools/electricity-cost" },
      { title: "Voltage Drop", desc: "Wire length voltage loss", to: "/tools/voltage-drop" },
      { title: "SEER / EER / COP", desc: "Efficiency metric converter", to: "/tools/seer-eer-cop" },
      { title: "Energy Convert", desc: "kW to BTU/hr to Tons", to: "/tools/energy-calculator" },
    ],
  },
];

function CalculatorsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,200,255,0.05),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 noise-overlay opacity-30 pointer-events-none" />

      {/* Hero Section */}
      <section
        className="relative pt-32 pb-20 overflow-hidden z-10"
        style={{ background: "transparent" }}
      >
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="max-w-2xl animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-bold tracking-widest uppercase text-[#00ffcc] mb-6 shadow-[0_0_15px_rgba(0,255,204,0.2)]">
              <Calculator className="h-3.5 w-3.5" /> Engineer's Toolkit
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] text-white mb-6">
              Engineering <span className="text-shimmer">Calculators.</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-xl delay-100 animate-fade-up">
              Instant diagnostic tools, sizing algorithms, and thermodynamic conversions designed
              for HVAC/R field engineers.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Tools Section */}
      <section className="relative py-12 border-t border-white/5 bg-black/40 z-10 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-8 flex items-center gap-2">
            <Activity className="h-4 w-4 text-[#00c8ff]" /> Most Used Utilities
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {POPULAR_TOOLS.map((tool, i) => (
              <Link
                key={tool.title}
                to={tool.to}
                className={`bento-card group p-6 animate-fade-up`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className={`h-5 w-5 ${tool.color}`} />
                </div>
                <div
                  className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-black/60 border border-white/10 shadow-[0_0_15px_rgba(0,255,204,0.15)] group-hover:scale-110 transition-transform`}
                >
                  <tool.icon className={`h-6 w-6 ${tool.color}`} />
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  {tool.title}
                </h3>
                <p className="text-sm text-slate-400">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categorized Grid */}
      <section className="relative py-20 bg-background z-10 border-t border-border">
        <div className="mx-auto max-w-7xl px-6 space-y-20">
          {CATEGORIES.map((category) => (
            <div key={category.title} className="relative">
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#00c8ff]/10 border border-[#00c8ff]/20 text-[#00c8ff] shadow-[0_0_15px_rgba(0,200,255,0.2)]">
                  <category.icon className="h-5 w-5" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
                  {category.title}
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {category.tools.map((tool) => (
                  <Link
                    key={tool.title}
                    to={tool.to}
                    className="group bento-card p-5 hover:-translate-y-1"
                  >
                    <div>
                      <h3 className="font-bold text-white group-hover:text-primary mb-1 transition-colors">
                        {tool.title}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                        {tool.desc}
                      </p>
                    </div>
                    <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#00c8ff] group-hover:text-[#00ffcc] transition-colors">
                        Launch Tool
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
