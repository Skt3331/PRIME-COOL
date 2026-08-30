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
  MapPin,
  Building2,
  Wrench,
  Clock,
  CheckCircle2,
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
      "Brand Authorized Service Centers & OEM Directory | Daikin, Voltas, LG, Blue Star | Prime Cool";
    const pageDesc =
      seo?.description ||
      "Find certified Brand Authorized Service Centers for Daikin, Voltas, Blue Star, LG, Hitachi, Carrier, Panasonic, Godrej, Whirlpool, and Samsung across Pune, PCMC & MIDCs.";

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
    slug: "samsung",
    name: "Samsung",
    category: "WindFree & Digital Inverter",
    desc: "8-Pole Digital Inverter compressor innovation with WindFree micro-holes draft-free cooling.",
    popularModels: ["WindFree Inverter", "DVM S VRF", "Triple Protector Plus", "Side-by-Side Fridge"],
    badgeColor: "bg-blue-500/10 border-blue-500/30 text-blue-400",
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
  {
    slug: "whirlpool",
    name: "Whirlpool",
    category: "6th Sense Intellicool",
    desc: "Smart 6th Sense temperature control and 3D Cool technology with turbo defrost algorithms.",
    popularModels: ["3D Cool Inverter", "Magicool Pro", "Protton Refrigerator", "BloomWash"],
    badgeColor: "bg-amber-500/10 border-amber-500/30 text-amber-400",
  },
];

const TOP_SERVICE_CENTER_HUBS = [
  { slug: "ranjangaon-midc", name: "Ranjangaon MIDC", tag: "Industrial Belt" },
  { slug: "chakan-midc", name: "Chakan MIDC", tag: "Auto Cluster" },
  { slug: "bhosari-midc", name: "Bhosari MIDC", tag: "PCMC Spine" },
  { slug: "wagholi", name: "Wagholi", tag: "East Pune" },
  { slug: "kharadi", name: "Kharadi", tag: "IT Megacity" },
  { slug: "hadapsar", name: "Hadapsar", tag: "Magarpatta" },
  { slug: "hinjewadi", name: "Hinjewadi", tag: "Tech Park" },
  { slug: "baner", name: "Baner", tag: "Commercial" },
  { slug: "kothrud", name: "Kothrud", tag: "Central Pune" },
  { slug: "viman-nagar", name: "Viman Nagar", tag: "Airport Zone" },
  { slug: "shikrapur", name: "Shikrapur", tag: "Logistics Hub" },
  { slug: "sanaswadi", name: "Sanaswadi", tag: "MIDC Industrial" },
  { slug: "shirur", name: "Shirur", tag: "MIDC Gateway" },
  { slug: "wakad", name: "Wakad", tag: "High-Rise Hub" },
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
  const [selectedBrandForHub, setSelectedBrandForHub] = useState("daikin");

  const filteredBrands = BRANDS_LIST.filter(
    (b) =>
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.popularModels.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  const currentBrandObj = BRANDS_LIST.find((b) => b.slug === selectedBrandForHub) || BRANDS_LIST[0];

  return (
    <div className="min-h-screen bg-slate-950 text-foreground selection:bg-sky-500/30 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.12),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.08),transparent_50%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 z-10 space-y-16">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/25 text-sky-400 text-xs font-mono font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(14,165,233,0.2)]">
            <Award className="w-3.5 h-3.5" />
            <span>Brand Authorized Service Center & OEM Directory</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Supported Brands & <br />
            <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
              Authorized Service Centers
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
            Locate certified Brand Authorized Service Centers for Daikin, Voltas, Blue Star, LG, Hitachi, Carrier, Panasonic, and Samsung. 100% genuine OEM spare parts, 45-minute doorstep dispatch, and factory-trained engineers.
          </p>
        </div>

        {/* 🏬 INTERACTIVE SERVICE CENTER LOCATOR HUB */}
        <section className="rounded-3xl border border-sky-500/30 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950 p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold font-display text-white flex items-center gap-2">
                  <span>🏬 Find Brand Authorized Service Centers by Locality</span>
                </h2>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Select a manufacturer brand to view its certified service centers across Pune & MIDCs
                </p>
              </div>
            </div>

            {/* Brand Switcher Pill */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
              {BRANDS_LIST.slice(0, 6).map((b) => (
                <button
                  key={b.slug}
                  onClick={() => setSelectedBrandForHub(b.slug)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedBrandForHub === b.slug
                      ? "bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/25 scale-105"
                      : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  {b.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                <span>{currentBrandObj.name} Authorized Service Centers in Pune & MIDCs:</span>
              </span>
              <Link
                to="/brands/$slug"
                params={{ slug: currentBrandObj.slug }}
                className="text-xs text-slate-400 hover:text-sky-400 flex items-center gap-1 transition"
              >
                <span>View {currentBrandObj.name} Spares & Errors</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {TOP_SERVICE_CENTER_HUBS.map((hub) => (
                <Link
                  key={hub.slug}
                  to="/brands/$slug/$appliance"
                  params={{ slug: currentBrandObj.slug, appliance: hub.slug }}
                  className="p-3.5 rounded-2xl border border-slate-800/80 bg-slate-950/70 hover:border-sky-500/50 hover:bg-slate-900/80 transition-all group flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-sky-400 uppercase bg-slate-900 px-2 py-0.5 rounded border border-sky-500/20">
                      {hub.tag}
                    </span>
                    <ArrowRight className="h-3 w-3 text-slate-600 group-hover:text-sky-400 transition" />
                  </div>
                  <span className="text-xs font-bold text-white group-hover:text-sky-300 transition">
                    {currentBrandObj.name} Center · {hub.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Search Control */}
        <div className="max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
            <input
              type="text"
              placeholder="Search brand (e.g. Daikin, Voltas, Blue Star, LG, Inverter)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-12 pr-4 py-3.5 border border-slate-800 rounded-2xl bg-slate-900/80 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all shadow-inner text-sm"
            />
          </div>
        </div>

        {/* Brands Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBrands.map((brand) => (
            <div
              key={brand.slug}
              className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-slate-900/50 border border-slate-800/80 hover:border-sky-500/40 hover:shadow-[0_0_30px_rgba(14,165,233,0.15)] transition-all duration-300 backdrop-blur-md overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${brand.badgeColor}`}
                  >
                    {brand.category}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> OEM Spares
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-sky-400 transition-colors flex items-center gap-2">
                  {brand.name}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed mb-5 font-light">{brand.desc}</p>

                <div className="space-y-2 mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono block">
                    Popular Models & Systems:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {brand.popularModels.map((m, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-950/70 border border-slate-800 text-slate-300"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
                <Link
                  to="/brands/$slug/$appliance"
                  params={{ slug: brand.slug, appliance: "ranjangaon-midc" }}
                  className="inline-flex items-center justify-between p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-xs font-bold text-sky-400 hover:bg-sky-500/20 transition cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5" />
                    <span>🏬 {brand.name} Authorized Service Centers</span>
                  </span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>

                <Link
                  to="/brands/$slug"
                  params={{ slug: brand.slug }}
                  className="inline-flex items-center justify-between text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors px-1"
                >
                  <span>Diagnostic Errors & Spares Guide</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Brand Comparisons Section */}
        <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800 backdrop-blur-md space-y-6">
          <h2 className="font-display text-2xl font-bold text-white flex items-center gap-2">
            <Layers className="h-5 w-5 text-sky-400" /> Technical Brand Comparisons
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {BRAND_COMPARISONS.map((comp) => (
              <Link
                key={comp.slug}
                to="/brands/compare/$comparisonSlug"
                params={{ comparisonSlug: comp.slug }}
                className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-sky-500/40 hover:bg-slate-900 transition-all group"
              >
                <h3 className="font-bold text-base text-white group-hover:text-sky-400 transition-colors mb-1">
                  {comp.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-light">{comp.desc}</p>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sky-400 mt-4 block">
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
