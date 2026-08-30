import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { getCmsSettings } from "../../lib/api";
import {
  Globe,
  Search,
  MapPin,
  Clock,
  CheckCircle,
  Phone,
  ArrowRight,
  Sparkles,
  Building2,
  ShieldCheck,
} from "lucide-react";

export const Route = createFileRoute("/cities/")({
  loader: async () => {
    const { settings } = await getCmsSettings();
    return { cms: settings };
  },
  head: ({ loaderData }) => {
    const seo = loaderData?.cms?.seo?.cities;
    const pageTitle =
      seo?.title || "Cities & Districts Served | Pune, PCMC, Mumbai, Thane, Nashik | Prime Cool";
    const pageDesc =
      seo?.description ||
      "Certified HVAC, AC repair, cold room, and chiller maintenance services across Pune Metropolitan Area, PCMC, Mumbai, Thane, Nashik, and Ahmednagar.";

    return {
      meta: [
        { title: pageTitle },
        { name: "description", content: pageDesc },
        { property: "og:title", content: pageTitle },
        { property: "og:description", content: pageDesc },
        { property: "og:type", content: "website" },
      ],
      links: [{ rel: "canonical", href: "https://primecool.in/cities" }],
    };
  },
  component: CitiesDirectoryPage,
});

const CITIES_LIST = [
  {
    slug: "pune",
    name: "Pune City & Metropolitan Region",
    state: "Maharashtra",
    hubType: "Central Operations HQ",
    coverage: "Wagholi, Kharadi, Hadapsar, Viman Nagar, Baner, Hinjewadi, Kothrud, Swargate",
    dispatchSLA: "15 - 30 Mins",
    units: "25+ Mobile Response Units",
    badgeColor: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
  },
  {
    slug: "mumbai",
    name: "Mumbai & MMRDA Region",
    state: "Maharashtra",
    hubType: "Regional Industrial Corridor",
    coverage: "Thane Belapur MIDC, Navi Mumbai, Andheri Industrial, Kurla Commercial",
    dispatchSLA: "Priority Scheduled",
    units: "12 Industrial Teams",
    badgeColor: "bg-blue-500/10 border-blue-500/30 text-blue-400",
  },
  {
    slug: "nashik",
    name: "Nashik & Ambad MIDC",
    state: "Maharashtra",
    hubType: "District Extension Hub",
    coverage: "Ambad MIDC, Satpur Industrial Estate, Sinnar Pharma Belt",
    dispatchSLA: "Scheduled / 60 Mins",
    units: "6 District Teams",
    badgeColor: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
  },
];

function CitiesDirectoryPage() {
  const { cms } = Route.useLoaderData();
  const phone = cms?.socials?.phone || "+917507408461";
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCities = CITIES_LIST.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.coverage.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.hubType.toLowerCase().includes(searchQuery.toLowerCase()),
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
            <Globe className="w-3.5 h-3.5" />
            Regional Coverage Directory
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Cities & <span className="text-shimmer">Districts Directory.</span>
          </h1>
          <p className="text-base text-slate-400 leading-relaxed">
            Prime Cool services metropolitan cities, industrial MIDC zones, and regional districts
            across Maharashtra with certified HVAC diagnostic engineers and emergency response
            dispatch.
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
              placeholder="Search city (e.g. Pune, Mumbai, Nashik, PCMC)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-12 pr-4 py-3.5 border-2 border-border rounded-2xl bg-card text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredCities.map((city) => (
            <div
              key={city.slug}
              className="group relative flex flex-col justify-between p-6 rounded-3xl bg-card/60 border border-white/10 hover:border-[#00c8ff]/40 hover:shadow-[0_0_30px_rgba(0,200,255,0.15)] transition-all duration-300 backdrop-blur-md overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${city.badgeColor}`}
                  >
                    {city.hubType}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-[#00c8ff] transition-colors flex items-center gap-2">
                  {city.name}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed mb-5">
                  <strong className="text-slate-300">Corridors Served:</strong> {city.coverage}
                </p>

                <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-black/40 border border-white/5 mb-6 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">
                      Response SLA
                    </span>
                    <span className="font-bold text-white flex items-center gap-1 mt-0.5">
                      <Clock className="h-3.5 w-3.5 text-emerald-400" /> {city.dispatchSLA}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">
                      Deployments
                    </span>
                    <span className="font-bold text-[#00c8ff] mt-0.5 block">{city.units}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/8 flex items-center justify-between">
                <Link
                  to="/cities/$slug"
                  params={{ slug: city.slug }}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#00c8ff] hover:text-[#00ffcc] transition-colors"
                >
                  View {city.name} Services &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
