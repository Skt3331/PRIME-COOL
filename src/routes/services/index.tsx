import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { servicesData } from "../../lib/services-data";
import { getCmsSettings } from "../../lib/api";
import {
  Search,
  Wrench,
  ShieldCheck,
  CheckCircle,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Zap,
  Phone,
  Calendar,
  Clock,
  Star,
  Layers,
  Thermometer,
  Gauge,
  Cpu,
  Building2,
  Factory,
  Home,
  CheckCircle2,
  HelpCircle,
  Award,
  MapPin,
} from "lucide-react";
import { Breadcrumbs } from "../../components/Breadcrumbs";

export const Route = createFileRoute("/services/")({
  validateSearch: (search: Record<string, unknown>) => ({
    cat: (search.cat as string) || "all",
  }),
  loader: async () => {
    const { settings } = await getCmsSettings();
    return { cms: settings };
  },
  head: ({ loaderData }) => {
    const seo = loaderData?.cms?.seo?.services;
    const pageTitle =
      seo?.title ||
      "Certified HVAC, AC Repair, Refrigeration & Industrial Cooling Services in Pune | Prime Cool";
    const pageDesc =
      seo?.description ||
      "Comprehensive HVAC, AC repair, VRF/VRV central air conditioning, commercial cold rooms, water chillers, and inverter PCB micro-soldering in Pune, PCMC, Chakan & Ranjangaon MIDC. 24/7 Emergency Dispatch.";

    return {
      meta: [
        { title: pageTitle },
        { name: "description", content: pageDesc },
        { property: "og:title", content: pageTitle },
        { property: "og:description", content: pageDesc },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://primecool.in/services" },
        {
          name: "keywords",
          content:
            "HVAC services Pune, AC repair Pune, Inverter AC PCB repair, commercial VRF maintenance, cold room repair Pune, industrial chiller maintenance Chakan, cooling tower overhaul Ranjangaon, AC gas charging price",
        },
      ],
      links: [{ rel: "canonical", href: "https://primecool.in/services" }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HVACBusiness",
            name: "Prime Cool HVAC, Refrigeration & Industrial Mechanical Solutions",
            url: "https://primecool.in/services",
            image: "https://primecool.in/logo.png",
            telephone: "+917507408461",
            priceRange: "₹₹",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Wagholi - Nagar Road Corridor",
              addressLocality: "Pune",
              addressRegion: "Maharashtra",
              postalCode: "412207",
              addressCountry: "IN",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 18.5793,
              longitude: 73.9827,
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ],
                opens: "00:00",
                closes: "23:59",
              },
            ],
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: 340,
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Prime Cool HVAC, Appliance & Industrial Mechanical Services Directory",
            url: "https://primecool.in/services",
            numberOfItems: 12,
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Split & Inverter AC Repair",
                url: "https://primecool.in/services/split-ac-repair",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "AC Gas Charging & 450 PSI Nitrogen Leak Testing",
                url: "https://primecool.in/services/ac-gas-charging",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Cassette AC Installation & Maintenance",
                url: "https://primecool.in/services/cassette-ac-repair",
              },
              {
                "@type": "ListItem",
                position: 4,
                name: "Commercial VRV / VRF Multi-Zone Central Systems",
                url: "https://primecool.in/services/vrf-systems",
              },
              {
                "@type": "ListItem",
                position: 5,
                name: "Commercial Cold Rooms & Walk-in Storage",
                url: "https://primecool.in/services/cold-rooms",
              },
              {
                "@type": "ListItem",
                position: 6,
                name: "Industrial Process Chillers (50 to 500 TR)",
                url: "https://primecool.in/services/chillers",
              },
              {
                "@type": "ListItem",
                position: 7,
                name: "Cooling Tower Overhauls & PVC Fills",
                url: "https://primecool.in/services/cooling-towers",
              },
              {
                "@type": "ListItem",
                position: 8,
                name: "Air Handling Units (AHU) & Fan Coil Units (FCU)",
                url: "https://primecool.in/services/ahu",
              },
              {
                "@type": "ListItem",
                position: 9,
                name: "Precision Air Conditioning (PAC) Server Room Cooling",
                url: "https://primecool.in/services/server-room-cooling",
              },
              {
                "@type": "ListItem",
                position: 10,
                name: "Commercial Deep Freezers & Display Counters",
                url: "https://primecool.in/services/deep-freezers",
              },
              {
                "@type": "ListItem",
                position: 11,
                name: "CNC Machine Spindle & Hydraulic Oil Chillers",
                url: "https://primecool.in/services/cnc-machine-cooling",
              },
              {
                "@type": "ListItem",
                position: 12,
                name: "Inverter AC IPM PCB Board Micro-soldering",
                url: "https://primecool.in/services/inverter-ac-repair",
              },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What cooling and mechanical services does Prime Cool provide?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Prime Cool provides comprehensive cooling solutions across residential, commercial, and industrial sectors: split & cassette AC repair, R-32/R-410A gas charging, VRV/VRF central HVAC systems, commercial cold rooms, industrial process water chillers (50-500 TR), cooling tower overhauls, and component-level inverter PCB board micro-soldering.",
                },
              },
              {
                "@type": "Question",
                name: "How fast can an engineer reach my site in Pune or MIDC industrial zones?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We provide doorstep technician arrival within 30 to 45 minutes across Pune residential and commercial zones (Wagholi, Kharadi, Hadapsar, Hinjewadi, Baner, Kothrud). For industrial MIDC zones (Chakan, Bhosari, Ranjangaon, Talegaon, Sanaswadi), our mobile mechanical units provide guaranteed 60 to 90 minute SLA breakdown dispatch.",
                },
              },
              {
                "@type": "Question",
                name: "Do you use genuine OEM spare parts with warranty?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Every component fitted by Prime Cool—including compressors, IPM power modules, fan motors, electronic expansion valves, and contactors—is 100% genuine OEM quality with an official 6 to 24 month manufacturer warranty plus Prime Cool labor guarantee.",
                },
              },
              {
                "@type": "Question",
                name: "Can burnt Inverter AC PCB boards be repaired instead of replaced?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes! Over 90% of inverter PCB failures are caused by burnt IPM IGBT modules, SMPS diodes, or optocoupler communication circuits. Our micro-soldering specialists repair boards at the component level, saving you up to 70% compared to purchasing a new PCB.",
                },
              },
              {
                "@type": "Question",
                name: "Do you offer Annual Maintenance Contracts (AMC) for commercial & industrial facilities?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. We offer Comprehensive and Non-Comprehensive AMCs for corporate offices, IT data centers, restaurants, hospitals, cold storages, and manufacturing plants with scheduled monthly audits, chemical descaling, and 24/7 priority emergency hotline support.",
                },
              },
            ],
          }),
        },
      ],
    };
  },
  component: ServicesDirectoryPage,
});

function ServicesDirectoryPage() {
  const { cms } = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const activeCategory = (search.cat as string) || "all";
  const phone = cms?.socials?.phone || "+917507408461";

  const handleCategoryChange = (catId: string) => {
    navigate({
      search: (prev: any) => ({ ...prev, cat: catId }),
      replace: true,
    });
  };

  const services = useMemo(() => Object.values(servicesData), []);

  // Filter based on search query and category tab
  const filteredServices = useMemo(() => {
    return services.filter((s) => {
      const matchesSearch =
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        activeCategory === "all"
          ? !s.slug.startsWith("pcb-")
          : activeCategory === "pcb"
            ? s.slug.startsWith("pcb-")
            : activeCategory === "residential"
              ? s.category === "residential" ||
                s.slug.includes("split") ||
                s.slug.includes("window") ||
                s.slug.includes("gas") ||
                s.slug.includes("fridge") ||
                s.slug.includes("washing")
              : activeCategory === "commercial"
                ? s.category === "commercial" ||
                  s.slug.includes("vrf") ||
                  s.slug.includes("cassette") ||
                  s.slug.includes("ductable") ||
                  s.slug.includes("server")
                : activeCategory === "refrigeration"
                  ? s.category === "refrigeration" ||
                    s.slug.includes("cold") ||
                    s.slug.includes("freezer") ||
                    s.slug.includes("chiller")
                  : activeCategory === "industrial"
                    ? s.category === "industrial" ||
                      s.slug.includes("chiller") ||
                      s.slug.includes("cooling-tower") ||
                      s.slug.includes("compressor") ||
                      s.slug.includes("process")
                    : s.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [services, searchQuery, activeCategory]);

  const categories = [
    { id: "all", label: "🌟 All Core Services", icon: Layers },
    { id: "residential", label: "❄️ Residential AC & Appliances", icon: Home },
    { id: "commercial", label: "🏢 Commercial HVAC & VRF", icon: Building2 },
    { id: "refrigeration", label: "🧊 Cold Chain & Freezers", icon: Thermometer },
    { id: "industrial", label: "🏭 Industrial Chillers & Plants", icon: Factory },
    { id: "pcb", label: "⚡ Inverter PCB Electronics (30)", icon: Cpu },
  ];

  // Key Pune / PCMC / MIDC Locations for Local Service Matrix
  const POPULAR_LOCATIONS = [
    { slug: "ranjangaon-midc", name: "Ranjangaon MIDC" },
    { slug: "chakan-midc", name: "Chakan MIDC" },
    { slug: "bhosari-midc", name: "Bhosari MIDC" },
    { slug: "wagholi", name: "Wagholi" },
    { slug: "kharadi", name: "Kharadi" },
    { slug: "hadapsar", name: "Hadapsar" },
    { slug: "hinjewadi", name: "Hinjewadi" },
    { slug: "baner", name: "Baner" },
    { slug: "wakad", name: "Wakad" },
    { slug: "pimple-saudagar", name: "Pimple Saudagar" },
    { slug: "kothrud", name: "Kothrud" },
    { slug: "viman-nagar", name: "Viman Nagar" },
    { slug: "shikrapur", name: "Shikrapur" },
    { slug: "sanaswadi", name: "Sanaswadi" },
    { slug: "shirur", name: "Shirur" },
  ];

  // Standardized Pricing Benchmark Table
  const PRICING_BENCHMARKS = [
    {
      category: "Split & Inverter AC Service",
      scope: "Indoor & Outdoor High-Pressure Jet Foam Wash + Current Test",
      rate: "₹599 - ₹899",
      warranty: "30 Days Clean Warranty",
    },
    {
      category: "AC Gas Charging (R-32 / R-410A)",
      scope: "450 PSI Nitrogen Leak Test + Deep Vacuum + Virgin Gas Top-up",
      rate: "₹2,200 - ₹3,200",
      warranty: "90 Days Leak Warranty",
    },
    {
      category: "Inverter PCB Micro-soldering",
      scope: "IPM IGBT Module Replacement + SMPS 15V Rail Repair + Bench Load Test",
      rate: "₹1,800 - ₹4,500",
      warranty: "6 Months Board Warranty",
    },
    {
      category: "Cassette AC Service & Repair",
      scope: "4-Way Blower Deep Clean + Condensate Lift Pump & Float Switch Service",
      rate: "₹950 - ₹1,800",
      warranty: "90 Days Service Warranty",
    },
    {
      category: "Commercial Cold Room Overhaul",
      scope: "Defrost Heater Glass Replacement + TXV Calibration + R-404A Top-up",
      rate: "₹3,500 - ₹14,500",
      warranty: "6 Months System Warranty",
    },
    {
      category: "Industrial Chiller Overhaul (50-500 TR)",
      scope: "Shell & Tube Descaling + Semi-Hermetic Screw Overhaul + POE Oil Renewal",
      rate: "Custom / AMC Quote",
      warranty: "1 Year SLA Warranty",
    },
  ];

  // 6-Stage Quality Protocol
  const QUALITY_STEPS = [
    {
      title: "Digital Telemetry Diagnostic",
      desc: "Connect digital manifold gauges, clamp meters, and thermal cameras to log operating pressures, delta-T, and electrical current draw.",
    },
    {
      title: "450 PSI Nitrogen Pressure Hold",
      desc: "Conduct high-pressure dry nitrogen decay tests to locate micro-fractures in copper return bends and flare joints before adding gas.",
    },
    {
      title: "Component-Level Repair",
      desc: "Micro-solder IPM power electronics, replace SKF bearings, align fan pulleys, and braze copper pipes with silver alloy rods.",
    },
    {
      title: "< 350 Micron Deep Vacuum",
      desc: "Use two-stage rotary vane vacuum pumps to eliminate non-condensable moisture, preventing compressor sludge and acid formation.",
    },
    {
      title: "Gram-Scale Precision Charging",
      desc: "Charge 100% virgin OEM refrigerants (R-32, R-410A, R-404A, R-134a) strictly by nameplate weight using digital scales.",
    },
    {
      title: "Thermal Certification & Signoff",
      desc: "Validate 10°C to 14°C delta-T temperature split across evaporator coils and provide computerized diagnostic service invoice.",
    },
  ];

  // SEO FAQs
  const FAQS = [
    {
      q: "What cooling and mechanical engineering services does Prime Cool offer?",
      a: "Prime Cool is a full-spectrum mechanical HVAC and refrigeration engineering contractor. We service residential split and inverter ACs, multi-zone commercial VRV/VRF climate systems, supermarket cold rooms, blast freezers, industrial process water chillers (50 to 500 TR), cooling tower overhauls, air handling units (AHU), and component-level inverter PCB board micro-soldering.",
    },
    {
      q: "How fast is your emergency technician dispatch in Pune and MIDC zones?",
      a: "We maintain dedicated mobile technical vans equipped with OEM spares, vacuum pumps, digital manifolds, and nitrogen cylinders. We provide a 30 to 45 minute doorstep arrival in Pune residential and commercial hubs (Wagholi, Kharadi, Hadapsar, Hinjewadi, Baner, Kothrud). In industrial MIDC areas (Chakan, Bhosari, Ranjangaon, Talegaon, Sanaswadi), we guarantee a 60 to 90 minute SLA dispatch.",
    },
    {
      q: "Do you supply genuine OEM spare parts with a manufacturer warranty?",
      a: "Yes. Every single component we supply—such as rotary inverter compressors, IPM outdoor mainboards, BLDC fan motors, electronic expansion valves (EEV), run capacitors, and contactors—is 100% genuine OEM certified and carries an official 6 to 24 month warranty backed by our workmanship guarantee.",
    },
    {
      q: "Can you repair burnt Inverter AC PCB boards instead of replacing them?",
      a: "Yes! Inverter mainboard replacement typically costs ₹7,000 to ₹14,000. Our specialized electronics engineers micro-solder damaged IPM IGBT modules, SMPS switching diodes, and optocoupler communication transceivers directly at component level, restoring your board for just ₹1,800 to ₹4,500 (saving up to 70%).",
    },
    {
      q: "What are the benefits of signing an Annual Maintenance Contract (AMC) with Prime Cool?",
      a: "Our Commercial and Industrial AMCs include scheduled monthly/quarterly chemical descaling, precision electrical health audits, laser fan alignment, refrigerant leak tests, and guaranteed zero-downtime priority emergency response with 24/7 hotline access.",
    },
    {
      q: "Which brands do you service and repair in Pune?",
      a: "We service all major international and domestic brands including Daikin, Voltas, Blue Star, LG, Hitachi, Carrier, Panasonic, Mitsubishi Electric, Mitsubishi Heavy, Samsung, Godrej, Whirlpool, IFB, Bosch, Danfoss, Copeland, and Bitzer.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-foreground selection:bg-sky-500/30 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),transparent_70%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-10 pb-20 z-10 space-y-16">
        {/* Breadcrumbs */}
        <Breadcrumbs />

        {/* 1. HERO BANNER */}
        <section className="text-center max-w-4xl mx-auto space-y-6 pt-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(14,165,233,0.25)] font-mono">
            <Sparkles className="w-4 h-4 text-sky-400" />
            ISO 9001:2015 Standards · Pune & Maharashtra
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Engineered HVAC, Refrigeration & <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
              Industrial Mechanical Services
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light max-w-3xl mx-auto">
            From precision residential inverter AC jet cleaning and 450 PSI nitrogen leak tests to 500 TR industrial screw chillers, cold storages, and 24/7 zero-downtime AMCs. Certified technicians led by Lead Engineer Saurav Kailas Temgire.
          </p>

          {/* Quick Action CTAs */}
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              to="/booking"
              search={{}}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold px-8 py-3.5 text-sm shadow-xl shadow-sky-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Calendar className="h-4 w-4" />
              <span>Book Online Service</span>
            </Link>
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-white font-semibold px-8 py-3.5 text-sm transition-all transform hover:-translate-y-0.5 cursor-pointer backdrop-blur-sm"
            >
              <Phone className="h-4 w-4 text-sky-400" />
              <span>24/7 Hotline: {phone}</span>
            </a>
          </div>

          {/* Key Metric Highlights Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-slate-800/80 text-left">
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 space-y-1">
              <span className="text-xs font-mono text-sky-400 block font-bold">4.9 / 5.0 RATING</span>
              <div className="text-xl sm:text-2xl font-bold text-white font-display">1,850+ Jobs</div>
              <p className="text-[11px] text-slate-400">Verified residential & industrial clients</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 space-y-1">
              <span className="text-xs font-mono text-sky-400 block font-bold">RAPID SLA</span>
              <div className="text-xl sm:text-2xl font-bold text-white font-display">&lt; 45 Mins</div>
              <p className="text-[11px] text-slate-400">Doorstep dispatch across Pune corridors</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 space-y-1">
              <span className="text-xs font-mono text-sky-400 block font-bold">GENUINE SPARES</span>
              <div className="text-xl sm:text-2xl font-bold text-white font-display">100% OEM</div>
              <p className="text-[11px] text-slate-400">6 to 24 Months manufacturer warranty</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 space-y-1">
              <span className="text-xs font-mono text-sky-400 block font-bold">MIDC COVERAGE</span>
              <div className="text-xl sm:text-2xl font-bold text-white font-display">24/7 On-Call</div>
              <p className="text-[11px] text-slate-400">Chakan, Bhosari & Ranjangaon belts</p>
            </div>
          </div>
        </section>

        {/* 2. SEARCH & DYNAMIC CATEGORY FILTER TABS */}
        <section className="space-y-6">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-500" />
            </div>
            <input
              type="text"
              placeholder="Search by service or fault (e.g. Inverter PCB, R-32 Gas Charging, Screw Chiller, Cold Room, VRF AMC)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 border-2 border-slate-800 rounded-2xl bg-slate-900/80 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all shadow-xl text-sm backdrop-blur-md"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                  activeCategory === cat.id
                    ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/30 scale-105 border border-sky-400"
                    : "bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* 3. SERVICES GRID */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white flex items-center gap-2">
              <Wrench className="h-5 w-5 text-sky-400" />
              <span>Available Engineering Services ({filteredServices.length})</span>
            </h2>
            <span className="text-xs font-mono text-slate-400 hidden sm:inline">
              Showing {filteredServices.length} active service portfolios
            </span>
          </div>

          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((s) => (
                <div
                  key={s.slug}
                  className="group relative flex flex-col justify-between p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-sky-500/50 transition-all duration-300 hover:-translate-y-1 backdrop-blur-md shadow-xl hover:shadow-sky-500/10"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-sky-400 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 font-mono">
                        {s.category}
                      </span>
                      <span className="text-xs text-emerald-400 font-mono font-bold">
                        {s.priceEstimate.split(" +")[0]}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors leading-snug">
                        {s.title}
                      </h3>
                      <p className="text-slate-400 text-xs mt-2 line-clamp-3 leading-relaxed">
                        {s.tagline || s.description}
                      </p>
                    </div>

                    <ul className="space-y-2 pt-2 border-t border-slate-800/60">
                      {s.features.slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="flex items-start text-xs text-slate-300">
                          <CheckCircle className="w-3.5 h-3.5 text-sky-400 mr-2 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6">
                    <Link
                      to="/services/$slug"
                      params={{ slug: s.slug }}
                      className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-slate-800 text-white font-medium hover:bg-gradient-to-r hover:from-sky-500 hover:to-blue-600 transition-all text-xs group/btn cursor-pointer shadow"
                    >
                      <span>Explore Technical Specs</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-900/30 rounded-3xl border border-dashed border-slate-800 p-8 space-y-4">
              <Wrench className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-lg font-semibold text-white">No exact services found</h3>
              <p className="text-slate-400 max-w-sm mx-auto text-xs leading-relaxed">
                We could not find services matching "{searchQuery}". Try searching for AC Gas Charging, Chiller, Cold Room, or PCB Repair.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  handleCategoryChange("all");
                }}
                className="px-6 py-2.5 rounded-full bg-sky-500 text-white text-xs font-bold cursor-pointer hover:bg-sky-400 transition"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </section>

        {/* 4. STANDARDIZED PRICING BENCHMARK TABLE */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                Standardized Labor & Service Rates (Pune & MIDC)
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                100% transparent pricing index for residential, commercial & industrial maintenance
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/50 shadow-xl backdrop-blur-md">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80 font-mono text-[11px] uppercase tracking-wider text-emerald-400">
                  <th className="p-4 sm:p-5 font-semibold">Service Domain</th>
                  <th className="p-4 sm:p-5 font-semibold">Standard Scope of Work</th>
                  <th className="p-4 sm:p-5 font-semibold">Starting Labor Rate (INR ₹)</th>
                  <th className="p-4 sm:p-5 font-semibold">Warranty Terms</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {PRICING_BENCHMARKS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 sm:p-5 font-medium text-white">{row.category}</td>
                    <td className="p-4 sm:p-5 text-slate-400">{row.scope}</td>
                    <td className="p-4 sm:p-5 font-bold text-emerald-400">{row.rate}</td>
                    <td className="p-4 sm:p-5 text-sky-300 font-medium">{row.warranty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 5. 6-STAGE QUALITY ASSURANCE & DIAGNOSTIC WORKFLOW */}
        <section className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-10 backdrop-blur-md">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400">
              <Gauge className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                6-Stage Standard Quality Operating Procedure (SOP)
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Rigorous mechanical & electronic testing protocols executed on every job
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {QUALITY_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-5 space-y-3 relative group hover:border-sky-500/40 transition-all shadow"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-display font-black text-sky-500/40 group-hover:text-sky-400 transition-colors">
                    0{idx + 1}
                  </span>
                  <span className="text-[10px] font-mono uppercase bg-slate-900 text-sky-400 border border-sky-500/20 px-2.5 py-0.5 rounded-full">
                    Stage {idx + 1}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white">{step.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-light">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. GEOGRAPHIC SERVICE COVERAGE MATRIX */}
        <section className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                Local Mobile Service Stations Across Pune & MIDC Corridors
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Explore specialized doorstep technician hubs with guaranteed emergency arrival
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {POPULAR_LOCATIONS.map((loc, idx) => (
              <Link
                key={idx}
                to="/services/$serviceSlug/$locationSlug"
                params={{ serviceSlug: "ac-repair", locationSlug: loc.slug }}
                className="p-3.5 rounded-xl border border-slate-800/80 bg-slate-950/60 hover:bg-slate-900 hover:border-sky-500/40 text-xs text-slate-300 hover:text-white transition-all flex items-center justify-between group cursor-pointer"
              >
                <span className="font-medium">{loc.name}</span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-sky-400 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </section>

        {/* 7. FREQUENTLY ASKED QUESTIONS (FAQS) */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400">
              <HelpCircle className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                Frequently Asked Questions (FAQs)
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Clear answers regarding our service SLAs, warranty, and technician dispatches
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden transition-all shadow"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-white hover:text-sky-300 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span
                      className={`text-sky-400 font-bold text-lg transition-transform duration-200 shrink-0 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/40">
                      <p className="pt-3">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 8. EMERGENCY CALLOUT & BOOKING BANNER */}
        <section className="rounded-3xl border border-sky-500/30 bg-gradient-to-br from-slate-900 via-sky-950/40 to-slate-900 p-8 sm:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.12),transparent_70%)] pointer-events-none" />
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest">
              24/7 Mobile Dispatch Across Pune & MIDC Corridors
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white">
              Need Immediate HVAC or Mechanical Repair?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              Speak directly with our Lead Systems Engineer for immediate doorstep technician allocation, commercial site audits, and zero-downtime industrial recovery.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 relative z-10 pt-2">
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold px-8 py-4 text-sm shadow-xl shadow-sky-500/30 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Phone className="h-4 w-4" />
              <span>Call Lead Engineer Now ({phone})</span>
            </a>
            <Link
              to="/booking"
              search={{}}
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 py-4 text-sm transition-all cursor-pointer"
            >
              <Calendar className="h-4 w-4 text-sky-400" />
              <span>Book Online Inspection</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
