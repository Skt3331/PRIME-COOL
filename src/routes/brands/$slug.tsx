import { createFileRoute, Link } from "@tanstack/react-router";
import { brandsData } from "../../lib/brands-data";
import { getCmsSettings } from "../../lib/api";
import {
  ArrowLeft,
  Phone,
  Calendar,
  Search,
  Wrench,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Building2,
  MapPin,
  Clock,
  ArrowRight,
  Star,
  CheckCircle2,
  Cpu,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/brands/$slug")({
  loader: async ({ params }) => {
    let brand = brandsData[params.slug];
    if (!brand) {
      const formattedBrand = params.slug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
      brand = {
        name: formattedBrand,
        slug: params.slug.toLowerCase(),
        faults: ["Cooling issues", "Gas leaks", "Compressor failures"],
        spares: ["Capacitors", "PCBs", "Sensors"],
        maintenance: ["Filter cleaning", "Coil washing"],
        warranty: "90 Days on parts",
        errorCodes: [],
      };
    }
    const { settings } = await getCmsSettings();
    return { brand, cms: settings };
  },
  head: ({ loaderData }) => {
    const brand = loaderData?.brand;
    if (!brand) return { meta: [] };
    const pageTitle = `${brand.name} Authorized Service Center, Error Codes & Spare Parts | Prime Cool`;
    const pageDesc = `Official ${brand.name} Authorized Service Center network across Pune, PCMC & MIDCs. Genuine spare parts, searchable fault error codes, and 45-min doorstep dispatch.`;
    return {
      meta: [
        { title: pageTitle },
        { name: "description", content: pageDesc },
        { property: "og:title", content: pageTitle },
        { property: "og:description", content: pageDesc },
        { property: "og:type", content: "website" },
      ],
      links: [{ rel: "canonical", href: `https://primecool.in/brands/${brand.slug}` }],
    };
  },
  component: BrandDetailsPage,
});

const SERVICE_HUBS = [
  { slug: "ranjangaon-midc", name: "Ranjangaon MIDC", tag: "Industrial Belt", sla: "60-Min SLA" },
  { slug: "chakan-midc", name: "Chakan MIDC", tag: "Auto Cluster", sla: "60-Min SLA" },
  { slug: "bhosari-midc", name: "Bhosari MIDC", tag: "PCMC Spine", sla: "45-Min SLA" },
  { slug: "wagholi", name: "Wagholi", tag: "East Pune", sla: "30-Min SLA" },
  { slug: "kharadi", name: "Kharadi", tag: "EON IT Park", sla: "30-Min SLA" },
  { slug: "hadapsar", name: "Hadapsar", tag: "Magarpatta", sla: "35-Min SLA" },
  { slug: "hinjewadi", name: "Hinjewadi", tag: "IT Phase 1-3", sla: "35-Min SLA" },
  { slug: "baner", name: "Baner", tag: "High Street", sla: "30-Min SLA" },
  { slug: "kothrud", name: "Kothrud", tag: "Central Pune", sla: "30-Min SLA" },
  { slug: "viman-nagar", name: "Viman Nagar", tag: "Airport Zone", sla: "30-Min SLA" },
  { slug: "pimple-saudagar", name: "Pimple Saudagar", tag: "PCMC Hub", sla: "30-Min SLA" },
  { slug: "wakad", name: "Wakad", tag: "High-Rise Hub", sla: "30-Min SLA" },
  { slug: "shikrapur", name: "Shikrapur", tag: "Logistics Belt", sla: "45-Min SLA" },
  { slug: "sanaswadi", name: "Sanaswadi", tag: "MIDC Industrial", sla: "45-Min SLA" },
  { slug: "shirur", name: "Shirur", tag: "MIDC Gateway", sla: "60-Min SLA" },
];

function BrandDetailsPage() {
  const { brand, cms } = Route.useLoaderData();
  const socials = cms?.socials || {};
  const phone = socials.phone || "+917507408461";

  const [activeTab, setActiveTab] = useState<
    "centers" | "diagnostics" | "errors" | "maintenance"
  >("centers");
  const [searchQuery, setSearchQuery] = useState("");
  const [hubSearch, setHubSearch] = useState("");

  const filteredErrors = brand.errorCodes.filter(
    (err: any) =>
      err.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      err.symptom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      err.fix.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredHubs = SERVICE_HUBS.filter(
    (h) =>
      h.name.toLowerCase().includes(hubSearch.toLowerCase()) ||
      h.tag.toLowerCase().includes(hubSearch.toLowerCase()),
  );

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `https://primecool.in/brands/${brand.slug}#article`,
        headline: `${brand.name} HVAC Error Codes, Diagnostics & Genuine Spares`,
        description: `Comprehensive troubleshooting manual, searchable fault error codes, and OEM spare parts reference for ${brand.name} air conditioners and refrigeration units.`,
        author: {
          "@type": "Organization",
          name: "Prime Cool",
        },
        publisher: {
          "@type": "Organization",
          name: "Prime Cool",
          logo: {
            "@type": "ImageObject",
            url: "https://primecool.in/logo.png",
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://primecool.in/brands/${brand.slug}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://primecool.in/" },
          { "@type": "ListItem", position: 2, name: "Brands", item: "https://primecool.in/brands" },
          {
            "@type": "ListItem",
            position: 3,
            name: brand.name,
            item: `https://primecool.in/brands/${brand.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen text-foreground flex flex-col justify-between bg-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      {/* Background gradients */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.12),transparent_60%)] pointer-events-none" />

      {/* Main Container */}
      <main className="flex-1 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10 pt-6">
        {/* Breadcrumb */}
        <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-6 flex items-center gap-2">
          <Link to="/" className="hover:text-sky-400 transition">
            Home
          </Link>{" "}
          /{" "}
          <Link to="/brands" className="hover:text-sky-400 transition">
            Brands
          </Link>{" "}
          / <span className="text-white font-semibold">{brand.name} Service & Support</span>
        </div>

        {/* Hero Segment */}
        <div className="mb-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-xs font-semibold text-sky-400 font-mono uppercase">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Certified {brand.name} OEM Partner</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-xs font-semibold text-emerald-400 font-mono">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>45-Min Doorstep Dispatch Across Pune & MIDCs</span>
            </div>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-extrabold leading-tight text-white">
            {brand.name}{" "}
            <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
              Authorized Service Centers & Support
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl font-light">
            Locate your nearest {brand.name} Authorized Service Center, browse common mechanical faults, search diagnostic error code matrices, and order 100% genuine OEM spare parts for all {brand.name} split ACs, cassettes, VRV/VRF systems, and refrigeration units.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={`https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi Prime Cool, I need ${brand.name} Service Center assistance in Pune.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-[#25D366] hover:from-emerald-500 hover:to-emerald-400 text-white font-bold px-6 py-2.5 text-xs shadow-lg shadow-emerald-500/25 transition cursor-pointer"
            >
              <MessageSquare className="h-4 w-4" />
              <span>WhatsApp {brand.name} Desk</span>
            </a>
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-2.5 text-xs transition cursor-pointer"
            >
              <Phone className="h-4 w-4 text-sky-400" />
              <span>Call Hotline ({phone})</span>
            </a>
            <button
              onClick={() => setActiveTab("centers")}
              className="inline-flex items-center gap-2 rounded-full bg-sky-500/15 border border-sky-500/30 hover:bg-sky-500/25 text-sky-300 font-bold px-6 py-2.5 text-xs transition cursor-pointer"
            >
              <Building2 className="h-4 w-4" />
              <span>Find Centers Near Me</span>
            </button>
          </div>
        </div>

        {/* 🏬 SERVICE CENTER CONTACT & HELPDESK BANNER */}
        <div className="rounded-3xl border border-sky-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-7 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                <CheckCircle2 className="h-3 w-3" /> Certified {brand.name} Service Network
              </span>
              <span className="text-[11px] font-mono text-slate-400">45-Min Doorstep Dispatch</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Official {brand.name} Customer Support & Engineer Dispatch
            </h2>
            <p className="text-xs text-slate-300 font-light max-w-2xl">
              Hub Location: Wagholi-Shirur Industrial Corridor, Nagar Road, Pune · 24x7 Emergency Breakdown & 8:00 AM – 9:00 PM Service Desk
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <a
              href={`https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi Prime Cool, I need ${brand.name} technician dispatch.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold px-5 py-3 text-xs shadow-md shadow-emerald-500/20 transition"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>1-Click WhatsApp</span>
            </a>
            <Link
              to="/booking"
              search={{}}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-5 py-3 text-xs transition"
            >
              <Calendar className="h-3.5 w-3.5 text-sky-400" />
              <span>Schedule Slot</span>
            </Link>
          </div>
        </div>

        {/* Tabs navigation */}
        <div className="flex border-b border-slate-800 gap-2 mb-8 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab("centers")}
            className={`px-5 py-3 text-xs sm:text-sm font-bold whitespace-nowrap rounded-t-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "centers"
                ? "bg-slate-900 border-x border-t border-slate-700 text-sky-400 shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"
            }`}
          >
            <Building2 className="h-4 w-4 text-sky-400" />
            <span>🏬 Authorized Service Centers ({SERVICE_HUBS.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("diagnostics")}
            className={`px-5 py-3 text-xs sm:text-sm font-bold whitespace-nowrap rounded-t-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "diagnostics"
                ? "bg-slate-900 border-x border-t border-slate-700 text-sky-400 shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"
            }`}
          >
            <Wrench className="h-4 w-4" />
            <span>Faults & Genuine Spares</span>
          </button>
          <button
            onClick={() => setActiveTab("errors")}
            className={`px-5 py-3 text-xs sm:text-sm font-bold whitespace-nowrap rounded-t-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "errors"
                ? "bg-slate-900 border-x border-t border-slate-700 text-sky-400 shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"
            }`}
          >
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <span>Error Code Table ({brand.errorCodes.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("maintenance")}
            className={`px-5 py-3 text-xs sm:text-sm font-bold whitespace-nowrap rounded-t-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "maintenance"
                ? "bg-slate-900 border-x border-t border-slate-700 text-sky-400 shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"
            }`}
          >
            <FileText className="h-4 w-4 text-emerald-400" />
            <span>SOP & Warranty</span>
          </button>
        </div>

        {/* Tab contents */}
        <div className="min-h-[350px]">
          {/* TAB 1: AUTHORIZED SERVICE CENTERS */}
          {activeTab === "centers" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-sky-400" />
                    <span>{brand.name} Authorized Service Centers Across Pune & MIDCs</span>
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Select your locality to open dedicated {brand.name} error code diagnostics, spares catalog, and dispatch status
                  </p>
                </div>

                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Filter locality (e.g. Ranjangaon, Chakan)..."
                    value={hubSearch}
                    onChange={(e) => setHubSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredHubs.map((hub) => (
                  <Link
                    key={hub.slug}
                    to="/brands/$slug/$appliance"
                    params={{ slug: brand.slug, appliance: hub.slug }}
                    className="p-5 rounded-2xl border border-slate-800/80 bg-slate-900/50 hover:border-sky-500/50 hover:bg-slate-900 transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono uppercase bg-slate-950 text-sky-400 border border-sky-500/20 px-2 py-0.5 rounded">
                          {hub.tag}
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {hub.sla}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white group-hover:text-sky-300 transition mb-1">
                        {brand.name} Service Center in {hub.name}
                      </h4>
                      <p className="text-xs text-slate-400 font-light">
                        Doorstep AC repair, PCB micro-soldering, and OEM spares in {hub.name}.
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-semibold text-sky-400 group-hover:text-sky-300">
                      <span>Open Service Center Page</span>
                      <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: DIAGNOSTICS & SPARES */}
          {activeTab === "diagnostics" && (
            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* Common Faults */}
              <div className="border border-slate-800 bg-slate-900/50 p-6 sm:p-8 rounded-3xl space-y-4 backdrop-blur-md">
                <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  <span>Common Mechanical & Inverter Faults</span>
                </h3>
                <ul className="space-y-3">
                  {brand.faults.map((f: string, idx: number) => (
                    <li key={idx} className="flex gap-2.5 text-xs sm:text-sm text-slate-300 items-start">
                      <span className="text-sky-400 font-mono mt-0.5">•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Spare Parts Stocked */}
              <div className="border border-slate-800 bg-slate-900/50 p-6 sm:p-8 rounded-3xl space-y-4 backdrop-blur-md">
                <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-400" />
                  <span>100% Genuine {brand.name} OEM Spares</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  We maintain factory-certified inventory to ensure zero-downtime repairs and complete warranty compliance.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {brand.spares.map((s: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 font-mono flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                      <span>{s}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ERROR CODES */}
          {activeTab === "errors" && (
            <div className="space-y-6">
              {/* Search Bar */}
              <div className="relative max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search error codes (e.g. A6, U4, E1, CH05)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-800 bg-slate-900/90 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-inner"
                />
              </div>

              {/* Error list */}
              {filteredErrors.length > 0 ? (
                <div className="border border-slate-800 rounded-3xl overflow-hidden shadow-xl overflow-x-auto bg-slate-900/50 backdrop-blur-md">
                  <table className="w-full border-collapse text-left text-xs sm:text-sm text-slate-300">
                    <thead>
                      <tr className="bg-slate-900/90 border-b border-slate-800 text-amber-400 font-mono uppercase tracking-wider text-[11px]">
                        <th className="p-4 sm:p-5 w-32">Error Code</th>
                        <th className="p-4 sm:p-5 w-72">Observed Symptom</th>
                        <th className="p-4 sm:p-5">Certified Action / Fix</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {filteredErrors.map((err: any, idx: number) => (
                        <tr key={idx} className="hover:bg-slate-800/30 transition">
                          <td className="p-4 sm:p-5 font-mono font-bold text-amber-400">{err.code}</td>
                          <td className="p-4 sm:p-5 text-white font-medium">{err.symptom}</td>
                          <td className="p-4 sm:p-5 text-sky-300 bg-sky-500/5 leading-relaxed font-medium">{err.fix}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="border border-dashed border-slate-800 p-12 text-center text-xs text-slate-400 rounded-3xl">
                  No error codes match your search query. Try searching another code.
                </div>
              )}
            </div>
          )}

          {/* TAB 4: MAINTENANCE & WARRANTY */}
          {activeTab === "maintenance" && (
            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* Maintenance checklist */}
              <div className="border border-slate-800 bg-slate-900/50 p-6 sm:p-8 rounded-3xl space-y-4 backdrop-blur-md">
                <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-sky-400" />
                  <span>Factory Preventative Maintenance Checklist</span>
                </h3>
                <ul className="space-y-3">
                  {brand.maintenance.map((m: string, idx: number) => (
                    <li key={idx} className="flex gap-2.5 text-xs sm:text-sm text-slate-300 items-start">
                      <span className="text-emerald-400 font-mono mt-0.5">✓</span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Warranty Card */}
              <div className="border border-slate-800 bg-slate-900/50 p-6 sm:p-8 rounded-3xl space-y-4 backdrop-blur-md">
                <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                  <FileText className="h-5 w-5 text-sky-400" />
                  <span>OEM Warranty Guidance</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">{brand.warranty}</p>
                <div className="bg-sky-500/10 border border-sky-500/20 p-4 rounded-2xl text-xs text-slate-300 space-y-2">
                  <strong className="text-white block font-medium">Pro-Tip for Maximum System Lifespan:</strong>
                  <span>
                    Always maintain regular bi-annual maintenance records. Clean coils and balanced refrigerant charges protect inverter compressors from premature burnout.
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Immediate CTA */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl border border-sky-500/30 bg-gradient-to-br from-slate-900 via-sky-950/40 to-slate-900 text-center space-y-4 max-w-3xl mx-auto shadow-2xl">
          <h3 className="font-display text-2xl font-bold text-white">
            Need Immediate {brand.name} Servicing or Repair?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto font-light">
            Our certified mobile field technicians carry pre-staged OEM {brand.name} spare parts and diagnostic analyzers across all Pune & PCMC hubs.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              to="/booking"
              search={{}}
              className="inline-flex items-center gap-2 rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-7 py-3 text-xs shadow-lg shadow-sky-500/25 transition cursor-pointer"
            >
              <Calendar className="h-4 w-4" /> Book Technician Visit
            </Link>
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-7 py-3 text-xs transition cursor-pointer"
            >
              <Phone className="h-4 w-4 text-sky-400" /> Call {phone}
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
