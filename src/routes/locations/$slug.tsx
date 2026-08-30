import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getLocations, getCmsSettings } from "../../lib/api";
import {
  ArrowLeft,
  Phone,
  Calendar,
  MapPin,
  HelpCircle,
  ShieldCheck,
  Clock,
  CheckCircle,
  Star,
  Info,
  Building2,
  ArrowRight,
  Wrench,
  Sparkles,
  Award,
} from "lucide-react";
import { useState } from "react";
import { Breadcrumbs } from "../../components/Breadcrumbs";

const NEARBY_AREAS: Record<string, string[]> = {
  wagholi: [
    "Kesnand",
    "Lohegaon",
    "Kharadi",
    "Viman Nagar",
    "Lonikand",
    "Bakori",
    "Awhalwadi",
    "Ubale Nagar",
  ],
  hadapsar: [
    "Magarpatta",
    "Amanora",
    "Mundhwa",
    "Fursungi",
    "Sasane Nagar",
    "Handewadi",
    "Fatima Nagar",
    "Ramtekdi",
  ],
  kharadi: [
    "EON IT Park",
    "World Trade Center",
    "Rakshak Nagar",
    "Chandan Nagar",
    "Wagholi",
    "Viman Nagar",
    "Mundhwa",
  ],
  "chakan-midc": ["Talegaon", "Moshi", "Bhosari", "Pimpri", "Alandi", "Rajgurunagar", "Kuruli"],
  "ranjangaon-midc": [
    "Manufacturing Plants",
    "Pharmaceutical HVAC",
    "Food Processing Refrigeration",
    "Warehouse Cooling",
    "Industrial Cold Storage",
    "Process Chillers",
    "Factory AMC",
  ],
  lonikand: ["Wagholi", "Bakori", "Phulgaon", "Awhalwadi"],
  "koregaon-bhima": ["Sanaswadi", "Shikrapur", "Kondhapuri"],
  shikrapur: ["Chakan MIDC", "Koregaon Bhima", "Sanaswadi"],
  karegaon: ["Ranjangaon MIDC", "Shirur", "Sarola"],
  shirur: ["Karegaon", "Ranjangaon MIDC", "Nagar Road Corridor"],
  "pimpri-chinchwad": ["Bhosari", "Nigdi", "Akurdi", "Wakad", "Ravet"],
};

const SERVICE_GROUPS = [
  {
    title: "Residential Services",
    items: [
      { slug: "ac-repair", name: "AC Repair" },
      { slug: "ac-installation", name: "AC Installation" },
      { slug: "ac-uninstallation", name: "AC Uninstallation" },
      { slug: "ac-shifting", name: "AC Shifting" },
      { slug: "ac-gas-charging", name: "AC Gas Charging" },
      { slug: "ac-gas-leak-repair", name: "AC Gas Leak Repair" },
      { slug: "split-ac-repair", name: "Split AC Repair" },
      { slug: "window-ac-repair", name: "Window AC Repair" },
      { slug: "inverter-ac-repair", name: "Inverter AC Repair" },
      { slug: "cassette-ac-repair", name: "Cassette AC Repair" },
      { slug: "tower-ac-repair", name: "Tower AC Repair" },
      { slug: "ductable-ac", name: "Ductable AC Repair" },
      { slug: "vrv-systems", name: "VRV AC Repair" },
      { slug: "vrf-systems", name: "VRF AC Repair" },
    ],
  },
  {
    title: "Commercial HVAC",
    items: [
      { slug: "commercial-ac-installation", name: "Commercial AC Installation" },
      { slug: "office-hvac-solutions", name: "Office HVAC Solutions" },
      { slug: "warehouse-hvac", name: "Warehouse HVAC" },
      { slug: "factory-hvac", name: "Factory HVAC" },
      { slug: "hospital-hvac", name: "Hospital HVAC" },
      { slug: "school-hvac", name: "School HVAC" },
      { slug: "hotel-hvac", name: "Hotel HVAC" },
      { slug: "restaurant-hvac", name: "Restaurant HVAC" },
      { slug: "industrial-cooling", name: "Industrial Cooling" },
    ],
  },
  {
    title: "Refrigeration",
    items: [
      { slug: "cold-rooms", name: "Cold Room Installation" },
      { slug: "cold-room-repair", name: "Cold Room Repair" },
      { slug: "cold-storage-maintenance", name: "Cold Storage Maintenance" },
      { slug: "walk-in-freezers", name: "Walk-in Freezer" },
      { slug: "walk-in-chillers", name: "Walk-in Chiller" },
      { slug: "blast-freezers", name: "Blast Freezer" },
      { slug: "deep-freezers", name: "Deep Freezer Repair" },
      { slug: "bottle-coolers", name: "Bottle Cooler Repair" },
      { slug: "display-counters", name: "Display Counter Repair" },
      { slug: "water-coolers", name: "Water Cooler Repair" },
      { slug: "ice-machines", name: "Ice Machine Repair" },
    ],
  },
  {
    title: "Industrial & PCB Repair",
    items: [
      { slug: "chillers", name: "Industrial Chillers" },
      { slug: "industrial-compressors", name: "Compressor Maintenance" },
      { slug: "cooling-towers", name: "Cooling Towers" },
      { slug: "process-cooling", name: "Process Cooling" },
      { slug: "pcb-split-ac-inverter-board-repair", name: "Split Inverter AC PCB" },
      { slug: "pcb-daikin-inverter-ac-repair", name: "Daikin Inverter PCB" },
      { slug: "pcb-voltas-inverter-ac-repair", name: "Voltas Inverter PCB" },
      { slug: "pcb-lg-dual-inverter-ac-repair", name: "LG Dual Inverter PCB" },
    ],
  },
];

const LOCAL_BRANDS = [
  { slug: "daikin", name: "Daikin" },
  { slug: "voltas", name: "Voltas" },
  { slug: "blue-star", name: "Blue Star" },
  { slug: "lg", name: "LG Electronics" },
  { slug: "carrier", name: "Carrier" },
  { slug: "hitachi", name: "Hitachi" },
  { slug: "samsung", name: "Samsung" },
  { slug: "panasonic", name: "Panasonic" },
  { slug: "godrej", name: "Godrej" },
  { slug: "whirlpool", name: "Whirlpool" },
  { slug: "mitsubishi-electric", name: "Mitsubishi Electric" },
  { slug: "o-general", name: "O General" },
];

export const Route = createFileRoute("/locations/$slug")({
  loader: async ({ params }) => {
    const locationsResp = await getLocations();
    let location = locationsResp.locations.find((l: any) => l.slug === params.slug.toLowerCase());

    // Dynamic Fallback Generator
    if (!location) {
      const formattedName = params.slug
        .split("-")
        .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

      location = {
        slug: params.slug.toLowerCase(),
        name: formattedName,
        pincodes: ["411001"],
        type: "locality",
        faqs: [],
        reviews: [],
        landmarks: [],
        nearbyBusinesses: [],
        mapEmbedUrl: "",
      };
    }
    const geo = NEARBY_AREAS[params.slug.toLowerCase()]
      ? { lat: 18.5793, lng: 73.9827 }
      : { lat: 18.5204, lng: 73.8567 };
    const { settings } = await getCmsSettings();
    return { location, cms: settings, geo };
  },
  head: ({ loaderData }) => {
    const location = loaderData?.location;
    if (!location) return { meta: [] };
    const pageTitle =
      location.seoTitle || `24x7 HVAC, AC Repair, PCB & Chiller Services in ${location.name} | Prime Cool`;
    const pageDesc =
      location.seoDesc ||
      `Top-rated 24x7 HVAC contractors, commercial cold storage, chiller plant maintenance and split AC repair in ${location.name}. Fast technician dispatch in under 45-min. Genuine spares & warranty.`;

    const lat = loaderData?.geo?.lat || 18.5793;
    const lng = loaderData?.geo?.lng || 73.9827;

    const meta: any[] = [
      { title: pageTitle },
      { name: "description", content: pageDesc },
      { property: "og:title", content: pageTitle },
      { property: "og:description", content: pageDesc },
      { property: "og:type", content: "business.business" },
      { property: "og:locale", content: "en_IN" },
      { name: "geo.region", content: "IN-MH" },
      { name: "geo.placename", content: `${location.name}, Pune, Maharashtra, India` },
      { name: "geo.position", content: `${lat};${lng}` },
      { name: "ICBM", content: `${lat}, ${lng}` },
      {
        name: "keywords",
        content: `AC repair ${location.name}, HVAC contractor ${location.name}, AC service center ${location.name}, chiller repair ${location.name}, cold room ${location.name}, Prime Cool Pune`,
      },
    ];

    return {
      meta,
      links: [{ rel: "canonical", href: `https://primecool.in/locations/${location.slug}` }],
    };
  },
  component: LocationHubPage,
});

function LocationHubPage() {
  const { location, cms, geo } = Route.useLoaderData();
  const socials = cms?.socials || {};
  const phone = socials.phone || "+917507408461";

  const nearby = NEARBY_AREAS[location.slug] || location.nearbyBusinesses || [];

  const defaultFaqs = [
    {
      q: `How quickly can a technician reach my doorstep in ${location.name}?`,
      a: `Our mobile technical vans are stationed in ${location.name} to ensure an average doorstep arrival time under 30 to 45 minutes for residential calls and under 60-90 minutes for industrial breakdowns.`,
    },
    {
      q: `Do you provide 100% genuine spare parts for ACs and appliances in ${location.name}?`,
      a: `Yes, we only install brand-certified OEM components (Daikin, Voltas, LG, Blue Star, Carrier, Hitachi, Samsung, Panasonic) with official warranties from 6 months up to 5 years on compressors.`,
    },
    {
      q: `Do you service commercial VRV/VRF systems and industrial chillers in ${location.name}?`,
      a: `Yes, Prime Cool is an engineering specialist in multi-zone VRF systems, chiller descaling, cooling towers, and factory process cooling with 24/7 AMC support across ${location.name}.`,
    },
    {
      q: `What is the inspection fee for AC repair in ${location.name}?`,
      a: `Our doorstep inspection fee starts from ₹299 to ₹499 in ${location.name}, which covers complete electrical health testing, digital manifold pressure checks, and error code readouts.`,
    },
  ];

  const activeFaqs = location.faqs && location.faqs.length > 0 ? location.faqs : defaultFaqs;

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["HVACBusiness", "LocalBusiness"],
        name: `Prime Cool HVAC & Appliance Services - ${location.name}`,
        image: cms?.theme?.logo || "https://primecool.in/logo.png",
        telephone: phone,
        priceRange: "₹₹",
        address: {
          "@type": "PostalAddress",
          addressLocality: location.name,
          addressRegion: "Maharashtra",
          postalCode: location.pincodes?.[0] || "411001",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: geo?.lat || 18.5793,
          longitude: geo?.lng || 73.9827,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            opens: "00:00",
            closes: "23:59",
          },
        ],
        areaServed: [
          { "@type": "Place", name: location.name },
          ...nearby.map((n: string) => ({ "@type": "Place", name: n })),
        ],
        description: `24x7 HVAC, AC repair, chiller overhauls, VRF systems, and commercial cold storage maintenance in ${location.name}.`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://primecool.in/" },
          { "@type": "ListItem", position: 2, name: "Locations", item: "https://primecool.in/locations" },
          { "@type": "ListItem", position: 3, name: location.name, item: `https://primecool.in/locations/${location.slug}` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: activeFaqs.map((f: any) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.a,
          },
        })),
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
      <main className="flex-1 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10 pt-6 space-y-12">
        <Breadcrumbs />

        {/* Hero Section */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-xs font-semibold text-sky-400 font-mono uppercase">
                <MapPin className="h-3.5 w-3.5" />
                <span>Local HVAC Hub: {location.name}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-xs font-semibold text-emerald-400 font-mono">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Technicians Active in {location.name}</span>
              </div>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl font-extrabold leading-tight text-white">
              HVAC, AC Repair & Refrigeration in{" "}
              <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                {location.name}
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
              Prime Cool is your single-source contractor for domestic split & inverter AC servicing, industrial process chillers, cooling towers, commercial cold rooms, and PCB electronics repair in {location.name} (Pincodes: {location.pincodes.join(", ")}).
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/booking"
                search={{}}
                className="inline-flex items-center gap-2 rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-7 py-3 text-xs shadow-lg shadow-sky-500/25 transition cursor-pointer"
              >
                <Calendar className="h-4 w-4" />
                <span>Book Service Online</span>
              </Link>
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-7 py-3 text-xs transition cursor-pointer"
              >
                <Phone className="h-4 w-4 text-sky-400" />
                <span>Call {phone}</span>
              </a>
            </div>

            {/* Why Choose Section */}
            <div className="border-t border-slate-800 pt-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4">
                Why Choose Prime Cool in {location.name}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-300">
                <div className="flex gap-2 items-center">
                  <CheckCircle className="h-4 w-4 text-sky-400" /> <span>Certified Engineers</span>
                </div>
                <div className="flex gap-2 items-center">
                  <CheckCircle className="h-4 w-4 text-sky-400" /> <span>100% Genuine Spares</span>
                </div>
                <div className="flex gap-2 items-center">
                  <CheckCircle className="h-4 w-4 text-sky-400" /> <span>Industrial Expertise</span>
                </div>
                <div className="flex gap-2 items-center">
                  <CheckCircle className="h-4 w-4 text-sky-400" /> <span>30-45 Min Response</span>
                </div>
                <div className="flex gap-2 items-center">
                  <CheckCircle className="h-4 w-4 text-sky-400" /> <span>24x7 Emergency SLA</span>
                </div>
                <div className="flex gap-2 items-center">
                  <CheckCircle className="h-4 w-4 text-sky-400" /> <span>Warranty on Spares</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map & Landmark Stats Card */}
          <div className="lg:col-span-5 border border-slate-800 bg-slate-900/50 p-6 sm:p-7 rounded-3xl space-y-6 shadow-xl backdrop-blur-md">
            {location.mapEmbedUrl ? (
              <div className="border border-slate-800 rounded-2xl overflow-hidden shadow-lg h-[200px] bg-slate-950">
                <iframe
                  title={`Google Map for ${location.name}`}
                  src={location.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ) : (
              <div className="border border-slate-800 rounded-2xl bg-slate-950 flex flex-col items-center justify-center p-6 text-center text-xs text-slate-400">
                <MapPin className="h-8 w-8 text-sky-400/40 mb-2" />
                <span>Geographic service boundaries for {location.name}</span>
              </div>
            )}

            <div className="space-y-3 text-xs border-t border-slate-800 pt-4">
              {location.landmarks && location.landmarks.length > 0 && (
                <div>
                  <span className="font-mono text-slate-400 uppercase font-bold block mb-1">
                    Local Landmarks & Nodes
                  </span>
                  <p className="text-slate-200 leading-relaxed">{location.landmarks.join(" · ")}</p>
                </div>
              )}
              {nearby.length > 0 && (
                <div>
                  <span className="font-mono text-slate-400 uppercase font-bold block mb-1">
                    Nearby Micro-Target Service Areas
                  </span>
                  <p className="text-slate-200 leading-relaxed">{nearby.join(" · ")}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 🏬 BRAND AUTHORIZED SERVICE CENTERS IN THIS LOCALITY */}
        <section className="rounded-3xl border border-sky-500/30 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950 p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold font-display text-white">
                  🏬 Brand Authorized Service Centers in {location.name}
                </h2>
                <p className="text-xs text-slate-400 font-mono">
                  Certified brand technical centers with OEM spares, error code diagnostics, and local technicians
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {LOCAL_BRANDS.map((b) => (
              <Link
                key={b.slug}
                to="/brands/$slug/$appliance"
                params={{ slug: b.slug, appliance: location.slug }}
                className="p-3.5 rounded-2xl border border-slate-800/80 bg-slate-950/70 hover:border-sky-500/50 hover:bg-slate-900 transition-all group flex items-center justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-white group-hover:text-sky-300 block">
                    {b.name} Service Center
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">in {location.name}</span>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-sky-400 transition shrink-0" />
              </Link>
            ))}
          </div>
        </section>

        {/* Localized Targeted Service Catalog (AC, Fridge, HVAC Links) */}
        <div className="border border-slate-800 bg-slate-900/40 p-6 sm:p-8 rounded-3xl space-y-8 backdrop-blur-md">
          <div className="max-w-xl">
            <h2 className="font-display font-bold text-xl sm:text-2xl text-white">
              Targeted Local Engineering Solutions in {location.name}
            </h2>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed font-mono">
              Select a specialized category to view dedicated pricing indexes, repair scopes, and warranty terms.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {SERVICE_GROUPS.map((grp) => (
              <div key={grp.title} className="space-y-3.5">
                <h3 className="text-xs font-bold text-sky-400 font-mono border-b border-slate-800 pb-2 uppercase tracking-wider">
                  {grp.title}
                </h3>
                <ul className="space-y-2">
                  {grp.items.map((svc) => (
                    <li key={svc.slug}>
                      <Link
                        to="/services/$serviceSlug/$locationSlug"
                        params={{ serviceSlug: svc.slug, locationSlug: location.slug }}
                        className="text-xs text-slate-400 hover:text-sky-400 hover:underline transition-colors block py-0.5"
                      >
                        {svc.name} in {location.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="border border-slate-800 bg-slate-900/40 p-6 sm:p-8 rounded-3xl space-y-4 backdrop-blur-md">
          <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-4">
            Frequently Asked Questions ({location.name} Hub)
          </h3>
          <div className="space-y-3">
            {activeFaqs.map((faq: any, idx: number) => (
              <details
                key={idx}
                className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 group cursor-pointer"
              >
                <summary className="font-semibold text-xs sm:text-sm text-white flex justify-between items-center list-none select-none">
                  <span>{faq.q}</span>
                  <span className="text-sky-400 font-bold text-sm transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed pt-2 border-t border-slate-800/60 font-light">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
