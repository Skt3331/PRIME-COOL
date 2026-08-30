import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getLocations, getCmsSettings } from "../../lib/api";
import logo from "../../assets/logo.webp";
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
    title: "Industrial Cooling",
    items: [
      { slug: "cnc-machine-cooling", name: "CNC Machine Cooling" },
      { slug: "chillers", name: "Industrial Chillers" },
      { slug: "industrial-compressors", name: "Compressor Maintenance" },
      { slug: "cooling-towers", name: "Cooling Towers" },
      { slug: "process-cooling", name: "Process Cooling" },
      { slug: "air-compressors", name: "Air Compressors" },
      { slug: "ahu", name: "AHU" },
      { slug: "fcu", name: "FCU" },
    ],
  },
];

export const Route = createFileRoute("/locations/$slug")({
  loader: async ({ params }) => {
    const locationsResp = await getLocations();
    let location = locationsResp.locations.find((l: any) => l.slug === params.slug.toLowerCase());

    // Dynamic Fallback Generator
    if (!location) {
      const formattedName = params.slug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
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
      location.seoTitle || `Best HVAC, AC Repair & Refrigeration in ${location.name} | Prime Cool`;
    const pageDesc =
      location.seoDesc ||
      `Top-rated 24x7 HVAC contractors, commercial cold storage, chiller plant maintenance and split AC repair in ${location.name}. Fast technician dispatch in under 45-min.`;

    const lat = loaderData?.geo?.lat || 18.5793;
    const lng = loaderData?.geo?.lng || 73.9827;

    const meta: any[] = [
      { title: pageTitle },
      { name: "description", content: pageDesc },
      { property: "og:title", content: pageTitle },
      { property: "og:description", content: pageDesc },
      { property: "og:type", content: "business.business" },
      { name: "geo.region", content: "IN-MH" },
      { name: "geo.placename", content: `${location.name}, Pune, Maharashtra, India` },
      { name: "geo.position", content: `${lat};${lng}` },
      { name: "ICBM", content: `${lat}, ${lng}` },
    ];

    if (location.seoKeywords) {
      meta.push({ name: "keywords", content: location.seoKeywords });
    }

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

  // Nearby areas
  const nearby = NEARBY_AREAS[location.slug] || [];

  const schemaList: any[] = [
    {
      "@context": "https://schema.org",
      "@type": ["HVACBusiness", "LocalBusiness"],
      name: `Prime Cool Mechanical & HVAC Solutions - ${location.name}`,
      image: cms?.theme?.logo || "https://primecool.in/logo.png",
      telephone: phone,
      priceRange: "₹₹",
      address: {
        "@type": "PostalAddress",
        streetAddress: `${location.name} Main Corridor`,
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
        {
          "@type": "Place",
          name: location.name,
        },
        ...nearby.map((n: string) => ({ "@type": "Place", name: n })),
      ],
      description: `24x7 emergency HVAC contractors, commercial cold storage, process chillers and domestic AC repair in ${location.name}.`,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue:
          location.reviews && location.reviews.length > 0
            ? (
                location.reviews.reduce((acc: number, r: any) => acc + r.rating, 0) /
                location.reviews.length
              ).toFixed(1)
            : "4.9",
        reviewCount:
          location.reviews && location.reviews.length > 0 ? location.reviews.length : 142,
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `HVAC Services in ${location.name}`,
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: `Split & Inverter AC Jet Servicing in ${location.name}`,
              description: "High-pressure deep foam jet pump cleaning with antibacterial spray",
            },
            price: "599",
            priceCurrency: "INR",
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: `AC Gas Leak Repair & Recharging in ${location.name}`,
              description:
                "Nitrogen pressure testing, leak repair, vacuuming, and pure OEM refrigerant refill",
            },
            price: "1499",
            priceCurrency: "INR",
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: `Commercial Chiller & Cold Room AMC in ${location.name}`,
              description:
                "Industrial preventive maintenance, compressor diagnostics, and 24/7 SLA",
            },
            price: "4999",
            priceCurrency: "INR",
          },
        ],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://primecool.in/" },
        {
          "@type": "ListItem",
          position: 2,
          name: "Locations",
          item: "https://primecool.in/locations",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: location.name,
          item: `https://primecool.in/locations/${location.slug}`,
        },
      ],
    },
  ];

  if (location.faqs && location.faqs.length > 0) {
    schemaList.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: location.faqs.map((faq: any) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
    });
  }

  return (
    <div className="min-h-screen text-foreground flex flex-col justify-between bg-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaList) }}
      />
      {/* Background gradients */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,color-mix(in_oklab,var(--primary)_8%,transparent),transparent_60%)] pointer-events-none" />

      {/* Main Container */}
      <main className="flex-1 pt-6 md:pt-8 pb-20 px-6 max-w-7xl mx-auto w-full relative z-10">
        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* Hero Segment */}
        <div className="grid lg:grid-cols-12 gap-8 items-start mb-12">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-xs font-semibold text-primary font-mono uppercase">
              <MapPin className="h-3.5 w-3.5" />
              <span>Geographical Location Hub</span>
            </div>

            <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight text-white">
              HVAC & Refrigeration Services in{" "}
              <span className="text-gradient">{location.name}</span>
            </h1>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Prime Cool is your single source contractor for domestic air conditioning, industrial
              process chillers, cooling towers, and commercial cold rooms in {location.name}{" "}
              (Pincodes: {location.pincodes.join(", ")}).
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/booking"
                search={{}}
                className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:opacity-90 transition glow-ring cursor-pointer"
              >
                <Calendar className="h-4 w-4" />
                <span>Book Service Online</span>
              </Link>
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-slate-900/60 px-6 py-3 text-sm font-semibold hover:bg-card transition cursor-pointer"
              >
                <Phone className="h-4 w-4 text-primary" />
                <span>Call {phone}</span>
              </a>
            </div>

            {/* Why Choose Section (Horizontal Badges) */}
            <div className="border-t border-border/40 pt-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
                Why Choose Prime Cool
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-muted-foreground">
                <div className="flex gap-2 items-center">
                  <CheckCircle className="h-4 w-4 text-primary" />{" "}
                  <span>Experienced Engineers</span>
                </div>
                <div className="flex gap-2 items-center">
                  <CheckCircle className="h-4 w-4 text-primary" /> <span>Genuine Spare Parts</span>
                </div>
                <div className="flex gap-2 items-center">
                  <CheckCircle className="h-4 w-4 text-primary" /> <span>Industrial Experts</span>
                </div>
                <div className="flex gap-2 items-center">
                  <CheckCircle className="h-4 w-4 text-primary" />{" "}
                  <span>Quick Response (45-Min)</span>
                </div>
                <div className="flex gap-2 items-center">
                  <CheckCircle className="h-4 w-4 text-primary" />{" "}
                  <span>24x7 Priority Support</span>
                </div>
                <div className="flex gap-2 items-center">
                  <CheckCircle className="h-4 w-4 text-primary" />{" "}
                  <span>Warranty & AMC Backup</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map & Landmark Stats Card */}
          <div className="lg:col-span-5 border border-border/80 bg-slate-900/40 p-6 rounded-2xl space-y-6 shadow-xl backdrop-blur-md">
            {location.mapEmbedUrl ? (
              <div className="border border-border/60 rounded-xl overflow-hidden shadow-lg h-[200px] bg-slate-950">
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
              <div className="border border-border/60 rounded-xl bg-slate-950 flex flex-col items-center justify-center p-6 text-center text-xs text-muted-foreground">
                <MapPin className="h-8 w-8 text-primary/40 mb-2" />
                <span>Geographic map bounds for {location.name}</span>
              </div>
            )}

            <div className="space-y-3 text-xs border-t border-border/40 pt-4">
              <div>
                <span className="font-mono text-muted-foreground uppercase font-bold block mb-1">
                  Local Landmarks
                </span>
                <p className="text-foreground leading-relaxed">{location.landmarks.join(" · ")}</p>
              </div>
              {nearby.length > 0 && (
                <div>
                  <span className="font-mono text-muted-foreground uppercase font-bold block mb-1">
                    Nearby Micro-Target Areas
                  </span>
                  <p className="text-foreground leading-relaxed">{nearby.join(" · ")}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Localized Targeted Service Catalog (AC, Fridge, HVAC Links) */}
        <div className="border border-border/60 bg-slate-900/20 p-6 md:p-8 rounded-3xl mb-12 space-y-8">
          <div className="max-w-xl">
            <h2 className="font-display font-bold text-xl md:text-2xl text-white">
              Targeted Local Solutions
            </h2>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              Select a specialized HVAC/R category below to view dedicated pricing indexes, repair
              scopes, and warranty terms for {location.name} area.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {SERVICE_GROUPS.map((grp) => (
              <div key={grp.title} className="space-y-3.5">
                <h3 className="text-xs font-bold text-primary font-mono border-b border-border/40 pb-2 uppercase tracking-wider">
                  {grp.title}
                </h3>
                <ul className="space-y-2">
                  {grp.items.map((svc) => (
                    <li key={svc.slug}>
                      <Link
                        to="/services/$serviceSlug/$locationSlug"
                        params={{ serviceSlug: svc.slug, locationSlug: location.slug }}
                        className="text-xs text-muted-foreground hover:text-primary hover:underline transition-colors block py-0.5"
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

        {/* Local Reviews Grid */}
        {location.reviews.length > 0 && (
          <div className="border border-border/80 bg-slate-900/40 p-6 rounded-2xl mb-12 shadow-xl">
            <h3 className="font-display font-bold text-lg text-white mb-6">
              Customer Reviews in {location.name}
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {location.reviews.map((rev: any, idx: number) => (
                <div
                  key={idx}
                  className="border border-border/40 bg-slate-950/20 p-5 rounded-xl space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <strong className="text-sm text-foreground block">{rev.author}</strong>
                      <span className="text-[10px] text-muted-foreground font-mono">
                        {rev.role || "Verified Client"}
                      </span>
                    </div>
                    <div className="flex text-amber-400 gap-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground italic leading-relaxed">
                    "{rev.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQs */}
        <div className="border border-border/60 bg-slate-900/20 p-6 rounded-2xl">
          <h3 className="font-display font-bold text-lg text-white mb-6">
            FAQs for {location.name} Hub
          </h3>
          <div className="space-y-4">
            {location.faqs.map((faq: any, idx: number) => (
              <details
                key={idx}
                className="bg-slate-950/40 p-4 rounded-xl border border-border/40 group cursor-pointer"
              >
                <summary className="font-semibold text-xs text-foreground flex justify-between items-center list-none select-none">
                  <span>{faq.q}</span>
                  <span className="text-primary font-bold text-sm transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-xs text-muted-foreground leading-relaxed pt-2 border-t border-border/20">
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
