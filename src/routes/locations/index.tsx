import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { getCmsSettings } from "../../lib/api";
import {
  MapPin,
  Search,
  Clock,
  CheckCircle,
  Phone,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Building2,
  Factory,
  Globe,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/locations/")({
  loader: async () => {
    const { settings } = await getCmsSettings();
    return { cms: settings };
  },
  head: ({ loaderData }) => {
    const seo = loaderData?.cms?.seo?.locations;
    const pageTitle =
      seo?.title || "HVAC, AC Repair & Industrial Service Locations | Prime Cool Pune";
    const pageDesc =
      seo?.description ||
      "Explore Prime Cool service hubs across Wagholi, Hadapsar, Kharadi, Chakan MIDC, Ranjangaon MIDC, Shirur, Pune, and Maharashtra. 24/7 priority technician dispatch.";

    return {
      meta: [
        { title: pageTitle },
        { name: "description", content: pageDesc },
        { property: "og:title", content: pageTitle },
        { property: "og:description", content: pageDesc },
        { property: "og:type", content: "website" },
      ],
      links: [{ rel: "canonical", href: "https://primecool.in/locations" }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Prime Cool Regional HVAC Service Hubs",
            url: "https://primecool.in/locations",
            numberOfItems: 6,
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Wagholi HQ & Service Hub",
                url: "https://primecool.in/locations/wagholi",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Hadapsar & Magarpatta IT City",
                url: "https://primecool.in/locations/hadapsar",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Kharadi EON Free Zone Corridor",
                url: "https://primecool.in/locations/kharadi",
              },
              {
                "@type": "ListItem",
                position: 4,
                name: "Chakan Industrial Zone (MIDC)",
                url: "https://primecool.in/locations/chakan-midc",
              },
              {
                "@type": "ListItem",
                position: 5,
                name: "Ranjangaon MIDC Industrial Hub",
                url: "https://primecool.in/locations/ranjangaon-midc",
              },
              {
                "@type": "ListItem",
                position: 6,
                name: "Shirur Industrial Zone & City",
                url: "https://primecool.in/locations/shirur",
              },
            ],
          }),
        },
      ],
    };
  },
  component: LocationsDirectoryPage,
});

const LOCATION_HUBS = [
  {
    slug: "wagholi",
    name: "Wagholi (Main HQ & Central Hub)",
    region: "pune-east",
    type: "HQ & Rapid Response Hub",
    dispatchTime: "15 - 30 Mins",
    techsOnStandby: "12 Certified Technicians",
    address: "Wagholi-Shirur Highway, Pune, MH 412207",
    popularServices: ["Split AC Repair", "Inverter AC Servicing", "Gas Charging", "Cassette AC"],
    badgeColor: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
  },
  {
    slug: "hadapsar",
    name: "Hadapsar & Magarpatta City",
    region: "pune-east",
    type: "Commercial & Residential IT Hub",
    dispatchTime: "20 - 35 Mins",
    techsOnStandby: "8 Technicians",
    address: "Solapur Road Corridor, Hadapsar, Pune",
    popularServices: ["Ductable AC", "Cassette AC", "VRF Systems", "Commercial AMC"],
    badgeColor: "bg-blue-500/10 border-blue-500/30 text-blue-400",
  },
  {
    slug: "kharadi",
    name: "Kharadi & EON IT Park",
    region: "pune-east",
    type: "IT Park & High-Rise Corridor",
    dispatchTime: "20 - 30 Mins",
    techsOnStandby: "8 Technicians",
    address: "EON Free Zone Road, Kharadi, Pune",
    popularServices: ["Server Room Cooling", "Precision AC", "VRV AMC", "Commercial AC Repair"],
    badgeColor: "bg-purple-500/10 border-purple-500/30 text-purple-400",
  },
  {
    slug: "viman-nagar",
    name: "Viman Nagar & Airport Road",
    region: "pune-east",
    type: "Commercial & Airport Hub",
    dispatchTime: "20 - 30 Mins",
    techsOnStandby: "6 Technicians",
    address: "Airport Road, Viman Nagar, Pune",
    popularServices: ["Split AC Repair", "Ductable AC", "Cassette AC", "AMC Maintenance"],
    badgeColor: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
  },
  {
    slug: "kalyani-nagar",
    name: "Kalyani Nagar & Koregaon Park",
    region: "pune-east",
    type: "Premium Residential & Commercial",
    dispatchTime: "20 - 30 Mins",
    techsOnStandby: "5 Technicians",
    address: "East Avenue, Kalyani Nagar, Pune",
    popularServices: ["Inverter AC Tuning", "Gas Recharging", "Wine Chiller Repair", "VRF AC"],
    badgeColor: "bg-purple-500/10 border-purple-500/30 text-purple-400",
  },
  {
    slug: "ranjangaon-midc",
    name: "Ranjangaon MIDC Industrial Hub",
    region: "midc",
    type: "Heavy Manufacturing & Cold Chain",
    dispatchTime: "30 - 45 Mins",
    techsOnStandby: "6 Industrial Engineers",
    address: "Five Star MIDC Zone, Ranjangaon, Pune",
    popularServices: ["Chiller Overhaul", "Cold Room Storage", "Cooling Towers", "Industrial AMC"],
    badgeColor: "bg-amber-500/10 border-amber-500/30 text-amber-400",
  },
  {
    slug: "chakan-midc",
    name: "Chakan MIDC Auto Corridor",
    region: "midc",
    type: "Automotive & Heavy Engineering",
    dispatchTime: "30 - 45 Mins",
    techsOnStandby: "7 Industrial Engineers",
    address: "Chakan Industrial Area Phase 1-4, Pune",
    popularServices: [
      "CNC Machine Chillers",
      "Process Cooling",
      "Air Compressors",
      "HVAC Plant AMC",
    ],
    badgeColor: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
  },
  {
    slug: "bhosari-midc",
    name: "Bhosari MIDC Industrial Estate",
    region: "midc",
    type: "Precision Tooling & Manufacturing",
    dispatchTime: "25 - 40 Mins",
    techsOnStandby: "6 Technicians",
    address: "Telco Road, Bhosari MIDC, PCMC",
    popularServices: ["Panel Air Conditioners", "Process Chillers", "Precision AC", "Plant AMC"],
    badgeColor: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
  },
  {
    slug: "talegaon-midc",
    name: "Talegaon MIDC & Floriculture Park",
    region: "midc",
    type: "Pharma, Agri & Industrial Belt",
    dispatchTime: "35 - 50 Mins",
    techsOnStandby: "5 Technicians",
    address: "Old Mumbai-Pune Highway, Talegaon MIDC",
    popularServices: ["Cold Storage Plants", "Warehouse Chilling", "HVAC Air Handling", "Freezers"],
    badgeColor: "bg-amber-500/10 border-amber-500/30 text-amber-400",
  },
  {
    slug: "lonikand",
    name: "Lonikand & Bakori Corridor",
    region: "pune-east",
    type: "Residential & Warehouse Zone",
    dispatchTime: "15 - 25 Mins",
    techsOnStandby: "5 Technicians",
    address: "Ahmednagar Highway, Lonikand, Pune",
    popularServices: [
      "Residential AC Tune-Up",
      "Refrigerator Repair",
      "Washing Machine",
      "Gas Leak",
    ],
    badgeColor: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
  },
  {
    slug: "koregaon-bhima",
    name: "Koregaon Bhima & Sanaswadi",
    region: "midc",
    type: "Steel & Fabrication Industrial Belt",
    dispatchTime: "25 - 40 Mins",
    techsOnStandby: "4 Technicians",
    address: "State Highway 27, Koregaon Bhima, MH",
    popularServices: ["Factory Ventilation", "Panel Cooling", "Industrial AC", "Freezer Plants"],
    badgeColor: "bg-amber-500/10 border-amber-500/30 text-amber-400",
  },
  {
    slug: "shikrapur",
    name: "Shikrapur & Karegaon",
    region: "midc",
    type: "Commercial Logistics Hub",
    dispatchTime: "25 - 40 Mins",
    techsOnStandby: "5 Technicians",
    address: "Pabal Road Junction, Shikrapur, MH",
    popularServices: [
      "Cold Storage Freezers",
      "Display Cabinets",
      "Packaged Units",
      "Water Coolers",
    ],
    badgeColor: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
  },
  {
    slug: "shirur",
    name: "Shirur City & Rural District",
    region: "midc",
    type: "District Extension Hub",
    dispatchTime: "35 - 50 Mins",
    techsOnStandby: "4 Technicians",
    address: "Pune-Ahmednagar Highway, Shirur, MH",
    popularServices: ["Commercial HVAC", "Split AC Installation", "Dairy Refrigeration", "AMC"],
    badgeColor: "bg-blue-500/10 border-blue-500/30 text-blue-400",
  },
  {
    slug: "hinjewadi",
    name: "Hinjewadi Rajiv Gandhi IT Park",
    region: "pune-city",
    type: "IT Mega Park Phase 1 - 3",
    dispatchTime: "25 - 40 Mins",
    techsOnStandby: "8 Technicians",
    address: "Phase 1 Main Road, Hinjewadi, Pune",
    popularServices: ["Server Room HVAC", "Precision Chiller", "Ductable AC", "Corporate AMC"],
    badgeColor: "bg-purple-500/10 border-purple-500/30 text-purple-400",
  },
  {
    slug: "baner",
    name: "Baner & Balewadi High Street",
    region: "pune-city",
    type: "Commercial & Residential West Hub",
    dispatchTime: "25 - 35 Mins",
    techsOnStandby: "6 Technicians",
    address: "Baner Road, Pune West",
    popularServices: ["Cassette AC", "Inverter AC Tuning", "VRF HVAC", "Restaurant Chillers"],
    badgeColor: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
  },
  {
    slug: "pimpri-chinchwad",
    name: "Pimpri-Chinchwad (PCMC)",
    region: "pune-city",
    type: "Industrial & Urban Township",
    dispatchTime: "30 - 45 Mins",
    techsOnStandby: "6 Technicians",
    address: "Old Mumbai-Pune Highway, PCMC",
    popularServices: ["VRF HVAC", "Ducted Split AC", "Commercial Cold Rooms", "CNC Cooling"],
    badgeColor: "bg-purple-500/10 border-purple-500/30 text-purple-400",
  },
  {
    slug: "pune-district",
    name: "Pune City & Metropolitan Region",
    region: "pune-city",
    type: "Metro Metropolitan Coverage",
    dispatchTime: "20 - 45 Mins",
    techsOnStandby: "25+ Mobile Units",
    address: "Greater Pune Metro Region",
    popularServices: ["All AC Brands", "Emergency Breakdown", "HVAC Consulting", "Annual AMC"],
    badgeColor: "bg-[#00c8ff]/10 border-[#00c8ff]/30 text-[#00c8ff]",
  },
  {
    slug: "mumbai-district",
    name: "Mumbai & Thane Industrial Belt",
    region: "districts",
    type: "Regional Industrial Partner Hub",
    dispatchTime: "Scheduled / Priority",
    techsOnStandby: "Regional Field Team",
    address: "MMRDA Region & Thane Belapur MIDC",
    popularServices: ["Large Cold Chain", "Chiller Overhauls", "Pharma Refrigeration", "Audit"],
    badgeColor: "bg-[#0066ff]/10 border-[#0066ff]/30 text-[#0066ff]",
  },
  {
    slug: "ahmednagar-district",
    name: "Ahmednagar & Supa MIDC",
    region: "districts",
    type: "District Industrial Extension",
    dispatchTime: "Scheduled / 60 Mins",
    techsOnStandby: "District Team",
    address: "Pune-Ahmednagar Highway, Supa MIDC",
    popularServices: ["Factory HVAC", "Cold Storage", "Process Cooling", "Commercial Repair"],
    badgeColor: "bg-amber-500/10 border-amber-500/30 text-amber-400",
  },
];

function LocationsDirectoryPage() {
  const { cms } = Route.useLoaderData();
  const phone = cms?.socials?.phone || "+917507408461";
  const [searchQuery, setSearchQuery] = useState("");
  const [activeRegion, setActiveRegion] = useState<
    "all" | "pune-east" | "midc" | "pune-city" | "districts"
  >("all");

  const filteredLocations = LOCATION_HUBS.filter((loc) => {
    const matchesSearch =
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.popularServices.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesRegion = activeRegion === "all" || loc.region === activeRegion;
    return matchesSearch && matchesRegion;
  });

  const regionTabs = [
    { id: "all", label: "All Hubs (12)" },
    { id: "pune-east", label: "Pune East Corridor" },
    { id: "midc", label: "Industrial MIDC Zones" },
    { id: "pune-city", label: "Pune City & PCMC" },
    { id: "districts", label: "Regional Districts" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 relative overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,200,255,0.08),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 noise-overlay opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 z-10 space-y-12">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00c8ff]/10 border border-[#00c8ff]/20 text-[#00c8ff] text-xs font-bold uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(0,200,255,0.2)]">
            <MapPin className="w-3.5 h-3.5" />
            24/7 Rapid Response Network
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Service Locations & <span className="text-shimmer">Regional Hubs.</span>
          </h1>
          <p className="text-base text-slate-400 leading-relaxed">
            Prime Cool operates dedicated mobile technician units along the Wagholi–Shirur
            industrial corridor, Pune Metro, and MIDC manufacturing zones. Rapid on-site dispatch
            under 30 to 45 minutes.
          </p>
        </div>

        {/* Controls: Search Bar & Region Tabs */}
        <div className="space-y-6">
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search location (e.g. Wagholi, Kharadi, Chakan MIDC, Chillers)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-12 pr-4 py-3.5 border-2 border-border rounded-2xl bg-card text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
            />
          </div>

          {/* Region Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {regionTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveRegion(tab.id as any)}
                className={`px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
                  activeRegion === tab.id
                    ? "bg-[#00c8ff] text-[#09090f] shadow-[0_4px_20px_rgba(0,200,255,0.4)] scale-105"
                    : "bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Locations Bento Grid */}
        {filteredLocations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLocations.map((loc) => (
              <div
                key={loc.slug}
                className="cv-auto gpu-accelerated group relative flex flex-col justify-between p-6 rounded-3xl bg-card/60 border border-white/10 hover:border-[#00c8ff]/40 hover:shadow-[0_0_30px_rgba(0,200,255,0.15)] transition-all duration-300 backdrop-blur-md overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="h-5 w-5 text-[#00c8ff] -translate-x-2 group-hover:translate-x-0 transition-transform" />
                </div>

                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${loc.badgeColor}`}
                    >
                      {loc.type}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-[#00c8ff] transition-colors">
                    {loc.name}
                  </h3>

                  <p className="text-xs text-slate-400 mb-4 flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-[#00c8ff] shrink-0" />
                    <span>{loc.address}</span>
                  </p>

                  <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-black/40 border border-white/5 mb-4 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">
                        Dispatch SLA
                      </span>
                      <span className="font-bold text-white flex items-center gap-1 mt-0.5">
                        <Clock className="h-3.5 w-3.5 text-emerald-400" /> {loc.dispatchTime}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">
                        Field Engineers
                      </span>
                      <span className="font-bold text-[#00c8ff] mt-0.5 block">
                        {loc.techsOnStandby}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5 mb-6">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                      Top Local Services:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {loc.popularServices.map((srv, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/8 text-slate-300"
                        >
                          {srv}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/8 flex items-center justify-between gap-2">
                  <Link
                    to="/locations/$slug"
                    params={{ slug: loc.slug }}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#00c8ff] hover:text-[#00ffcc] transition-colors"
                  >
                    View Hub & Local Rates &rarr;
                  </Link>
                  <a
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-[#00c8ff] hover:text-[#09090f] transition-all text-slate-300"
                    title={`Call ${loc.name} Dispatch`}
                  >
                    <Phone className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-card/40 rounded-3xl border border-dashed border-white/10 max-w-lg mx-auto">
            <Building2 className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white">No locations found</h3>
            <p className="text-slate-400 mt-1 text-xs max-w-xs mx-auto">
              We couldn't find any hub matching your search query. We serve all areas across Pune
              district!
            </p>
          </div>
        )}

        {/* Emergency Corridor Banner */}
        <div className="relative p-8 md:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-[#0a0a14] to-[#09090f] border border-white/10 overflow-hidden text-center max-w-4xl mx-auto shadow-2xl">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-[#00c8ff]/10 rounded-full blur-3xl pointer-events-none" />
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
            Active Emergency Coverage on Wagholi–Shirur Highway
          </h2>
          <p className="text-sm text-slate-400 mb-8 max-w-2xl mx-auto">
            Our mobile emergency vans are equipped with recovery units, vacuum pumps, and OEM spare
            parts for 45-minute emergency breakdown response.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/emergency"
              className="px-8 py-3.5 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-bold transition-all text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(220,38,38,0.4)]"
            >
              Code Red Emergency Dispatch
            </Link>
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="px-8 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold transition-all border border-white/10 text-xs uppercase tracking-wider"
            >
              Call Central Dispatch: {phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
