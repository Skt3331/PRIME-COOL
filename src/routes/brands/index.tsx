import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { getCmsSettings } from "../../lib/api";
import {
  Award,
  Search,
  CheckCircle,
  Phone,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
  Layers,
} from "lucide-react";

export const Route = createFileRoute("/brands/")({
  loader: async () => {
    const { settings } = await getCmsSettings();
    return { cms: settings };
  },
  head: ({ loaderData }) => {
    const seo = loaderData?.cms?.seo?.brands;
    const pageTitle =
      seo?.title ||
      "Supported AC & Refrigeration Brands | Daikin, Voltas, Blue Star, LG | Prime Cool";
    const pageDesc =
      seo?.description ||
      "Certified multi-brand AC repair and servicing for Daikin, Voltas, Blue Star, LG, Hitachi, Carrier, Panasonic, Godrej, Whirlpool, O General, and Copeland across Pune.";

    return {
      meta: [
        { title: pageTitle },
        { name: "description", content: pageDesc },
        { property: "og:title", content: pageTitle },
        { property: "og:description", content: pageDesc },
        { property: "og:type", content: "website" },
      ],
      links: [{ rel: "canonical", href: "https://primecool.in/brands" }],
    };
  },
  component: BrandsDirectoryPage,
});

const BRANDS_LIST = [
  {
    slug: "daikin",
    name: "Daikin",
    category: "Residential & Commercial VRV",
    desc: "Japanese climate engineering specialists in Streamer Discharge, VRV 5, and Inverter Split ACs.",
    popularModels: ["FTKM Inverter Split", "VRV V / VRV IV System", "Cassette AC", "Chillers"],
    badgeColor: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
  },
  {
    slug: "voltas",
    name: "Voltas",
    category: "Tata Enterprise — All Seasons",
    desc: "India's highest market-share brand for heavy-duty tropicalized split, window, and commercial ACs.",
    popularModels: [
      "Maha Adjustable Inverter",
      "Voltas Vertis",
      "Cassette AC",
      "Commercial Cold Chain",
    ],
    badgeColor: "bg-blue-500/10 border-blue-500/30 text-blue-400",
  },
  {
    slug: "blue-star",
    name: "Blue Star",
    category: "Commercial & Deep Refrigeration",
    desc: "Premier commercial air conditioning and cold storage equipment manufacturers in India.",
    popularModels: ["Variable Refrigerant Flow", "Deep Freezers", "Water Chillers", "Precision AC"],
    badgeColor: "bg-purple-500/10 border-purple-500/30 text-purple-400",
  },
  {
    slug: "lg",
    name: "LG Electronics",
    category: "Dual Inverter Technology",
    desc: "Korean innovations featuring Dual Inverter compressors, AI Convertible 6-in-1 cooling, and ThinQ IoT.",
    popularModels: [
      "Dual Inverter Split",
      "Multi V VRF",
      "Artcool Inverter",
      "Commercial Refrigeration",
    ],
    badgeColor: "bg-rose-500/10 border-rose-500/30 text-rose-400",
  },
  {
    slug: "hitachi",
    name: "Hitachi",
    category: "Tropical Inverter & VRF",
    desc: "Japanese cooling tech featuring Expandable Inverter ACs, FrostWash technology, and Set-Free VRF.",
    popularModels: ["Kashikoi Inverter", "Yoshi Split AC", "Set-Free VRF System", "Ductable AC"],
    badgeColor: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
  },
  {
    slug: "carrier",
    name: "Carrier",
    category: "Commercial HVAC Pioneer",
    desc: "Global HVAC leaders in centrifugal chillers, air handling units, package systems, and split ACs.",
    popularModels: [
      "Indus Inverter",
      "AquaSnap Chiller",
      "30XW Screw Chiller",
      "Transicold Transport",
    ],
    badgeColor: "bg-amber-500/10 border-amber-500/30 text-amber-400",
  },
  {
    slug: "panasonic",
    name: "Panasonic",
    category: "nanoe-X Air Purification",
    desc: "Advanced Japanese inverter cooling with nanoe-X air purification and Miraie IoT smart controls.",
    popularModels: ["HU Inverter AC", "nanoe-G Inverter", "Commercial VRF", "Cassette Units"],
    badgeColor: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
  },
  {
    slug: "godrej",
    name: "Godrej",
    category: "Eco-Friendly R290 Cooling",
    desc: "Green inverter AC pioneers utilizing eco-friendly R290 refrigerant technology.",
    popularModels: ["Eon Greenify", "Heavy Duty Inverter", "Deep Freezers", "Beverage Coolers"],
    badgeColor: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
  },
  {
    slug: "o-general",
    name: "O General (Fujitsu General)",
    category: "Heavy Duty Tropical Cooling",
    desc: "Premium Japanese heavy-duty cooling engineered for extreme 55°C ambient temperatures.",
    popularModels: [
      "ASGG Tropical Inverter",
      "Augg Ductable",
      "VRF Tropical",
      "Commercial Cassette",
    ],
    badgeColor: "bg-blue-500/10 border-blue-500/30 text-blue-400",
  },
  {
    slug: "mitsubishi-electric",
    name: "Mitsubishi Electric",
    category: "CITY MULTI VRF Systems",
    desc: "High-COP Japanese VRF and precision air conditioning systems for high-tech data centers.",
    popularModels: ["MSZ Inverter", "CITY MULTI VRF", "Lossnay Ventilation", "Precision AC"],
    badgeColor: "bg-rose-500/10 border-rose-500/30 text-rose-400",
  },
];

const BRAND_COMPARISONS = [
  {
    slug: "daikin-vs-hitachi",
    title: "Daikin vs Hitachi",
    desc: "Compare Japanese inverter efficiency, compressor warranties, and VRF capabilities.",
  },
  {
    slug: "carrier-vs-blue-star",
    title: "Carrier vs Blue Star",
    desc: "Compare commercial chiller overhauls, ductable units, and package plants.",
  },
  {
    slug: "lg-vs-samsung",
    title: "LG vs Samsung",
    desc: "Compare Dual Inverter vs WindFree cooling technology and smart app diagnostics.",
  },
];

function BrandsDirectoryPage() {
  const { cms } = Route.useLoaderData();
  const phone = cms?.socials?.phone || "+917507408461";
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBrands = BRANDS_LIST.filter(
    (b) =>
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.popularModels.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase())),
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
            <Award className="w-3.5 h-3.5" />
            Certified Multi-Brand OEM Specialist
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Supported Brands & <span className="text-shimmer">OEM Directory.</span>
          </h1>
          <p className="text-base text-slate-400 leading-relaxed">
            We service, repair, and maintain all major Japanese, Indian, Korean, and American AC
            brands using 100% genuine manufacturer spare parts and certified field diagnostic
            procedures.
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
              placeholder="Search brand (e.g. Daikin, Voltas, Blue Star, LG, Inverter)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-12 pr-4 py-3.5 border-2 border-border rounded-2xl bg-card text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Brands Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBrands.map((brand) => (
            <div
              key={brand.slug}
              className="cv-auto gpu-accelerated group relative flex flex-col justify-between p-6 rounded-3xl bg-card/60 border border-white/10 hover:border-[#00c8ff]/40 hover:shadow-[0_0_30px_rgba(0,200,255,0.15)] transition-all duration-300 backdrop-blur-md overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${brand.badgeColor}`}
                  >
                    {brand.category}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-[#00c8ff] transition-colors flex items-center gap-2">
                  {brand.name}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed mb-5">{brand.desc}</p>

                <div className="space-y-2 mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                    Popular Models & Systems:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {brand.popularModels.map((m, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 border border-white/8 text-slate-300"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/8 flex items-center justify-between">
                <Link
                  to="/brands/$slug"
                  params={{ slug: brand.slug }}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#00c8ff] hover:text-[#00ffcc] transition-colors"
                >
                  View {brand.name} Repair Services &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Brand Comparisons Section */}
        <div className="p-8 rounded-3xl bg-card/40 border border-white/10 backdrop-blur-md space-y-6">
          <h2 className="font-display text-2xl font-bold text-white flex items-center gap-2">
            <Layers className="h-5 w-5 text-[#00c8ff]" /> Technical Brand Comparisons
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {BRAND_COMPARISONS.map((comp) => (
              <Link
                key={comp.slug}
                to="/brands/compare/$comparisonSlug"
                params={{ comparisonSlug: comp.slug }}
                className="p-5 rounded-2xl bg-white/5 border border-white/8 hover:border-[#00c8ff]/40 hover:bg-white/10 transition-all group"
              >
                <h3 className="font-bold text-base text-white group-hover:text-[#00c8ff] transition-colors mb-1">
                  {comp.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">{comp.desc}</p>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#00c8ff] mt-4 block">
                  Read Comparison &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
