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
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/cities/$slug")({
  loader: async ({ params }) => {
    const locationsResp = await getLocations();
    let location = locationsResp.locations.find((l: any) => l.slug === params.slug.toLowerCase());
    
    // Dynamic Fallback Generator
    if (!location) {
      const formattedName = params.slug
        .split("-")
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
      
      location = {
        slug: params.slug.toLowerCase(),
        name: formattedName,
        pincodes: ["411001", "411002", "411014"],
        type: "city",
        faqs: [],
        reviews: [],
        landmarks: [],
        nearbyBusinesses: [],
        mapEmbedUrl: ""
      };
    }
    const { settings } = await getCmsSettings();
    return { location, cms: settings };
  },
  head: ({ loaderData }) => {
    const location = loaderData?.location;
    if (!location) return { meta: [] };
    const pageTitle = location.seoTitle || `Refrigeration & AC Services in ${location.name} — Prime Cool`;
    const pageDesc = location.seoDesc || `24x7 HVAC, commercial refrigeration, cold storage and chiller repair in ${location.name}. Serving pincodes: ${location.pincodes.join(", ")}.`;
    
    const meta: any[] = [
      { title: pageTitle },
      { name: "description", content: pageDesc },
      { property: "og:title", content: pageTitle },
      { property: "og:description", content: pageDesc },
      { property: "og:type", content: "website" },
    ];
    
    if (location.seoKeywords) {
      meta.push({ name: "keywords", content: location.seoKeywords });
    }

    return {
      meta,
      links: [{ rel: "canonical", href: `https://primecool.in/cities/${location.slug}` }],
    };
  },
  component: LocationDetailsPage,
});

function LocationDetailsPage() {
  const { location, cms } = Route.useLoaderData();
  const socials = cms?.socials || {};
  const phone = socials.phone || "+917507408461";
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const schemaList: any[] = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": `Prime Cool HVAC & Refrigeration - ${location.name}`,
      "image": cms?.theme?.logo || "https://primecool.in/logo.png",
      "telephone": phone,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": location.name,
        "addressRegion": "Maharashtra",
        "addressCountry": "IN"
      },
      "description": `24x7 HVAC contractors, commercial cold storage, process chillers and domestic AC repair in ${location.name}.`
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://primecool.in/" },
        { "@type": "ListItem", "position": 2, "name": "Cities", "item": "https://primecool.in/cities" },
        { "@type": "ListItem", "position": 3, "name": location.name, "item": `https://primecool.in/cities/${location.slug}` }
      ]
    }
  ];

  if (location.faqs && location.faqs.length > 0) {
    schemaList.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": location.faqs.map((faq: any) => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      }))
    });
  }

  return (
    <div className="min-h-screen text-foreground flex flex-col justify-between bg-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaList) }} />
      {/* Background gradients */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,color-mix(in_oklab,var(--primary)_8%,transparent),transparent_60%)] pointer-events-none" />

      {/* Main Container */}
      <main className="flex-1 pb-20 px-6 max-w-7xl mx-auto w-full relative z-10">
        {/* Breadcrumb */}
        <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary transition">
            Home
          </Link>{" "}
          / <span className="text-primary">{location.type}</span> /{" "}
          <span className="text-foreground font-semibold">{location.name}</span>
        </div>

        {/* Hero Segment */}
        <div className="grid lg:grid-cols-12 gap-8 items-start mb-12">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-xs font-semibold text-primary font-mono uppercase">
              <MapPin className="h-3.5 w-3.5" />
              <span>Local Service Coverage Area</span>
            </div>

            <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight text-white">
              HVAC, Chiller & Cold Storage Repairs in{" "}
              <span className="text-gradient">{location.name}</span>
            </h1>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Prime Cool Solutions delivers engineering-grade diagnostics, quick-response repairs,
              preventative AMC audits, and cooling overhauls for commercial sites, industrial
              factories, and apartments in {location.name} and surrounding sectors.
            </p>

            {/* Pincode & Landmark Badges */}
            <div className="grid sm:grid-cols-2 gap-4 border-y border-border/40 py-6">
              <div className="space-y-2">
                <span className="text-xs font-mono text-primary uppercase tracking-wider block">
                  Pincodes Serviced
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {location.pincodes.map((pin: string) => (
                    <span
                      key={pin}
                      className="px-2.5 py-1 rounded-lg border border-border/60 bg-slate-900/60 text-xs text-foreground font-mono"
                    >
                      {pin}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-xs font-mono text-primary uppercase tracking-wider block">
                  Key Landmarks Covered
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {location.landmarks.map((l: string) => (
                    <span
                      key={l}
                      className="px-2.5 py-1 rounded-lg border border-border/60 bg-slate-900/60 text-[10px] text-foreground font-mono"
                    >
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Serviced Businesses if any */}
            {location.nearbyBusinesses.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
                  Active Client Footprint / Industrial Hubs
                </h3>
                <div className="flex flex-wrap gap-2">
                  {location.nearbyBusinesses.map((b: string) => (
                    <span
                      key={b}
                      className="text-xs border border-cyan-400/20 bg-cyan-400/5 text-cyan-400 px-3 py-1 rounded-full font-medium"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Map & Immediate Action Card */}
          <div className="lg:col-span-5 sticky top-24 space-y-6">
            {location.mapEmbedUrl ? (
              <div className="aspect-video w-full rounded-2xl border border-border overflow-hidden bg-slate-900 relative shadow-xl">
                <iframe
                  src={location.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${location.name} Service Map`}
                />
              </div>
            ) : (
              <div className="aspect-video w-full rounded-2xl border border-border flex items-center justify-center bg-slate-900/50 text-muted-foreground text-xs">
                Map coverage is managed dynamically by central dispatch.
              </div>
            )}

            {/* Quick Dispatch Box */}
            <div className="border border-border bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 shadow-xl space-y-6">
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  SLA Active in {location.name}
                </span>
                <h3 className="font-display font-bold text-lg text-white mt-1">
                  Request Emergency Dispatch
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Get on-call technician support immediately.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="px-4 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-xs hover:opacity-95 transition inline-flex items-center justify-center gap-1.5 shadow-lg shadow-primary/20 cursor-pointer"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call {phone}</span>
                </a>
                <Link
                  to="/booking"
                  search={{}}
                  className="px-4 py-3 rounded-xl border border-border bg-slate-950/40 text-foreground font-semibold text-xs hover:bg-slate-900 transition inline-flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Book Online</span>
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-border/40 pt-4 text-xs">
                <div className="flex gap-2">
                  <Clock className="h-4 w-4 text-primary shrink-0" />
                  <div>
                    <strong className="text-foreground block">Response SLA</strong>
                    <span>{location.type === "midc" ? "Under 4 Hours" : "Under 60 Mins"}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
                  <div>
                    <strong className="text-foreground block">Warranty</strong>
                    <span>100% Genuine Spares</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Local Reviews */}
        {location.reviews.length > 0 && (
          <div className="space-y-6 mb-12 border-t border-border/40 pt-10">
            <h2 className="text-2xl font-bold font-display text-white">
              Local Customer Reviews in {location.name}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {location.reviews.map((rev: any, idx: number) => (
                <div
                  key={idx}
                  className="border border-border/40 bg-slate-900/30 p-6 rounded-2xl space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <strong className="text-foreground text-sm block">{rev.author}</strong>
                      <span className="text-[10px] font-mono text-muted-foreground uppercase">
                        {rev.role || "Verified Client"}
                      </span>
                    </div>
                    <div className="flex gap-0.5 text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed italic">
                    "{rev.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Local FAQs */}
        {location.faqs.length > 0 && (
          <div className="space-y-6 border-t border-border/40 pt-10">
            <h2 className="text-2xl font-bold font-display text-white flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              <span>Location FAQs</span>
            </h2>
            <div className="space-y-3">
              {location.faqs.map((faq: { q: string; a: string }, idx: number) => (
                <div
                  key={idx}
                  className="border border-border/60 bg-slate-900/30 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full px-5 py-4 text-left font-bold text-sm text-foreground flex justify-between items-center hover:bg-slate-900/40 transition"
                  >
                    <span>{faq.q}</span>
                    <span className="text-primary font-mono text-lg">
                      {activeFaq === idx ? "−" : "+"}
                    </span>
                  </button>
                  {activeFaq === idx && (
                    <div className="px-5 pb-4 text-xs text-muted-foreground leading-relaxed border-t border-border/20 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
