import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { getCmsSettings } from "../../lib/api";
import {
  Factory,
  Search,
  CheckCircle,
  Phone,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  Settings,
  Flame,
  Activity,
} from "lucide-react";

export const Route = createFileRoute("/industrial/")({
  loader: async () => {
    const { settings } = await getCmsSettings();
    return { cms: settings };
  },
  head: ({ loaderData }) => {
    const seo = loaderData?.cms?.seo?.industrial;
    const pageTitle = seo?.title || "Heavy Industrial HVAC & Chiller Plant Engineering | Prime Cool Pune";
    const pageDesc =
      seo?.description ||
      "Industrial chiller plant maintenance, CNC cooling, cold storage overhauls, cooling tower water treatment, and factory HVAC contract plans across Pune and Maharashtra MIDC belts.";

    return {
      meta: [
        { title: pageTitle },
        { name: "description", content: pageDesc },
        { property: "og:title", content: pageTitle },
        { property: "og:description", content: pageDesc },
        { property: "og:type", content: "website" },
      ],
      links: [{ rel: "canonical", href: "https://primecool.in/industrial" }],
    };
  },
  component: IndustrialDirectoryPage,
});

const INDUSTRIAL_TOPICS = [
  {
    slug: "chiller-plant-operations",
    title: "Chiller Plant Operations & Overhauls",
    category: "Chillers & Compressors",
    desc: "Centrifugal, screw, and reciprocating water chiller overhaul, oil analysis, condenser descaling, and PLC integration.",
    features: ["Screw & Centrifugal Chiller Overhaul", "Oil Analysis & Filter Changeout", "Condenser & Evaporator Tube Descaling", "PLC & BMS Integration"],
    badgeColor: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
  },
  {
    slug: "cooling-tower-maintenance",
    title: "Cooling Tower Water Treatment & AMC",
    category: "Water Treatment & Drift",
    desc: "Counterflow and crossflow induced-draft cooling tower drift eliminator replacement, nozzle cleaning, and water treatment.",
    features: ["Drift Eliminator Replacement", "Water Chemical Treatment", "Fan Motor Bearing Servicing", "Approach Temperature Tuning"],
    badgeColor: "bg-blue-500/10 border-blue-500/30 text-blue-400",
  },
  {
    slug: "cold-storage-engineering",
    title: "Industrial Cold Rooms & Blast Freezers",
    category: "Cold Chain & Refrigeration",
    desc: "Walk-in chillers, cold storage rooms, pharmaceutical cleanroom HVAC, and -40°C blast freezer refrigeration plants.",
    features: ["PUF Panel Installation & Leak Repair", "Defrost Heater & Expansion Valves", "Pharma Cleanroom Humidity Control", "-40°C Blast Freezer Servicing"],
    badgeColor: "bg-purple-500/10 border-purple-500/30 text-purple-400",
  },
  {
    slug: "cnc-machine-cooling",
    title: "CNC Machine & Hydraulic Oil Cooling",
    category: "Precision Engineering",
    desc: "Precision oil chillers, CNC spindle cooling units, and panel air conditioning for high-tolerance automotive manufacturing.",
    features: ["CNC Spindle Oil Chiller Repair", "Control Panel Air Conditioner Servicing", "Coolant Heat Exchanger Flushing", "Thermal Overload Protection"],
    badgeColor: "bg-amber-500/10 border-amber-500/30 text-amber-400",
  },
];

function IndustrialDirectoryPage() {
  const { cms } = Route.useLoaderData();
  const phone = cms?.socials?.phone || "+917507408461";
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTopics = INDUSTRIAL_TOPICS.filter(
    (t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.desc.toLowerCase().includes(searchQuery.toLowerCase()),
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
            <Factory className="w-3.5 h-3.5" />
            Heavy Industrial Mechanical Division
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Industrial Systems & <span className="text-shimmer">Plant AMC Hub.</span>
          </h1>
          <p className="text-base text-slate-400 leading-relaxed">
            Zero-downtime mechanical maintenance contracts, chiller plant overhauls, process cooling, and industrial cold storage solutions across Ranjangaon, Chakan, Bhosari, and Talegaon MIDC.
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
              placeholder="Search industrial plant topic (e.g. Chiller, Cooling Tower, CNC, Cold Storage)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-12 pr-4 py-3.5 border-2 border-border rounded-2xl bg-card text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Industrial Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTopics.map((topic) => (
            <div
              key={topic.slug}
              className="group relative flex flex-col justify-between p-7 rounded-3xl bg-card/60 border border-white/10 hover:border-[#00c8ff]/40 hover:shadow-[0_0_30px_rgba(0,200,255,0.15)] transition-all duration-300 backdrop-blur-md overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${topic.badgeColor}`}>
                    {topic.category}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-[#00c8ff] transition-colors">
                  {topic.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {topic.desc}
                </p>

                <div className="space-y-2 mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Key Engineering Deliverables:</span>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {topic.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start text-xs text-slate-300">
                        <CheckCircle className="w-3.5 h-3.5 text-[#00c8ff] mr-2 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/8 flex items-center justify-between">
                <Link
                  to="/industrial/$topic"
                  params={{ topic: topic.slug }}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#00c8ff] hover:text-[#00ffcc] transition-colors"
                >
                  View Technical Guide & AMC Audit Details &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
