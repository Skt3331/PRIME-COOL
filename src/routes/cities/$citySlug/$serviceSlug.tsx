import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { servicesData } from "../../../lib/services-data";
import logo from "../../../assets/logo.webp";
import { getCmsSettings, getLocations } from "../../../lib/api";
import {
  ArrowLeft,
  Phone,
  Calendar,
  MapPin,
  ShieldCheck,
  CheckCircle,
  Wrench,
  Clock,
  Star,
} from "lucide-react";

export const Route = createFileRoute("/cities/$citySlug/$serviceSlug")({
  loader: async ({ params }) => {
    const locationsResp = await getLocations();
    const city = locationsResp.locations.find((l: any) => l.slug === params.citySlug.toLowerCase());
    const service = servicesData[params.serviceSlug.toLowerCase()];
    if (!city || !service) {
      throw notFound();
    }
    const { settings } = await getCmsSettings();
    return { city, service, cms: settings, allLocations: locationsResp.locations };
  },
  head: ({ loaderData }) => {
    const city = loaderData?.city;
    const service = loaderData?.service;
    if (!city || !service) return { meta: [] };
    const pageTitle = `24x7 ${service.title} in ${city.name} | Certified Technicians | Prime Cool`;
    const pageDesc = `Looking for top-rated ${service.title} near you in ${city.name}? Prime Cool provides certified experts, genuine spares, and 24x7 emergency response in ${city.name} (${city.pincodes.slice(0, 3).join(", ")}). Book now for fast service!`;
    return {
      meta: [
        { title: pageTitle },
        { name: "description", content: pageDesc },
        { property: "og:title", content: pageTitle },
        { property: "og:description", content: pageDesc },
        { property: "og:type", content: "website" },
      ],
      links: [{ rel: "canonical", href: `https://primecool.in/cities/${city.slug}/${service.slug}` }],
    };
  },
  component: LocationServicePage,
});

function LocationServicePage() {
  const { city, service, cms } = Route.useLoaderData();
  const socials = cms?.socials || {};
  const phone = socials.phone || "+917507408461";

  const schemaList: any[] = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": `${service.title} in ${city.name}`,
      "provider": {
        "@type": "LocalBusiness",
        "name": "Prime Cool HVAC & Refrigeration",
        "telephone": phone,
        "image": cms?.theme?.logo || "https://primecool.in/logo.png",
      },
      "areaServed": {
        "@type": "Place",
        "name": city.name
      },
      "description": service.description,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://primecool.in/" },
        { "@type": "ListItem", "position": 2, "name": "Cities", "item": "https://primecool.in/cities" },
        { "@type": "ListItem", "position": 3, "name": city.name, "item": `https://primecool.in/cities/${city.slug}` },
        { "@type": "ListItem", "position": 4, "name": service.title, "item": `https://primecool.in/cities/${city.slug}/${service.slug}` }
      ]
    }
  ];

  return (
    <div className="min-h-screen text-foreground flex flex-col justify-between bg-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaList) }} />
      {/* Background gradients */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,color-mix(in_oklab,var(--primary)_8%,transparent),transparent_60%)] pointer-events-none" />

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-950/60 border-b border-border/80">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={logo} alt="Prime Cool logo" className="h-9 w-9" />
            <span className="font-display font-bold text-lg tracking-tight">
              Prime <span className="text-gradient">Cool</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition">
              Home
            </Link>
            <Link to="/portfolio" className="hover:text-foreground transition">
              Projects
            </Link>
            <Link to="/resources" className="hover:text-foreground transition">
              Resource Hub
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-2 rounded-full border border-border p-2 sm:px-3 sm:py-1.5 text-xs font-medium hover:bg-card transition bg-slate-900/60"
            >
              <Phone className="h-4 w-4 text-primary" />
              <span className="hidden sm:inline">{phone}</span>
            </a>
            <Link
              to="/resources"
              className="text-sm font-medium hover:text-primary transition flex items-center gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 pt-24 pb-20 px-6 max-w-7xl mx-auto w-full relative z-10">
        {/* Breadcrumbs */}
        <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary transition">
            Home
          </Link>{" "}
          /{" "}
          <Link to="/resources" className="hover:text-primary transition">
            Resources
          </Link>{" "}
          /{" "}
          <Link to="/cities/$slug" params={{ slug: city.slug }} className="hover:text-primary transition">
            {city.name}
          </Link>{" "}
          / <span className="text-foreground font-semibold">{service.title}</span>
        </div>

        {/* Hero Banner Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-center mb-12">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary font-mono uppercase">
              <MapPin className="h-3.5 w-3.5" />
              <span>Local Service Hub — {city.name}</span>
            </div>

            <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight text-white">
              Best {service.title} <br />
              in <span className="text-gradient">{city.name}</span>
            </h1>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
              Prime Cool is the leading HVAC/R and appliance mechanical engineering service provider
              in {city.name}. We offer certified diagnostic checks, genuine parts replacements, and
              transparent flat-rate billing. Our technicians are on standby for emergency repairs
              near {city.landmarks[0] || "your area"}.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
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

            {/* SLA Badging */}
            <div className="flex items-center gap-6 pt-4 text-xs font-mono text-muted-foreground border-t border-border/40 max-w-lg">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>{city.type === "midc" ? "4-Hour Industrial SLA" : "45-Min Local SLA"}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>100% Genuine Spares</span>
              </div>
            </div>
          </div>

          {/* Pricing & Features Card */}
          <div className="lg:col-span-5 border border-border/80 bg-slate-900/40 p-6 rounded-2xl space-y-6 shadow-xl backdrop-blur-md">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-primary uppercase font-bold tracking-wider">
                Pricing Indicator
              </span>
              <div className="text-2xl font-display font-bold text-white">
                {service.priceEstimate}
              </div>
              <p className="text-xs text-muted-foreground">
                Estimate excludes local spare parts and specialized refrigerant charging weights.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-semibold text-foreground block">
                Key Service Features:
              </span>
              <ul className="space-y-2 text-xs text-muted-foreground">
                {service.features.map((f, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Localized Details & Landmarks Map Row */}
        <div className="grid md:grid-cols-2 gap-8 items-start mb-12">
          {/* Geographical & Landmark specifications */}
          <div className="border border-border/60 bg-slate-900/20 p-6 rounded-2xl space-y-5">
            <h3 className="font-display font-bold text-lg text-white">
              Geographic Coverage details
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Our service coverage is optimized for search engines and local logistics routes. Our
              field technicians are based in the immediate vicinity of {city.name}, ensuring rapid
              travel times to both residential flats and industrial factories.
            </p>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <span className="text-muted-foreground font-semibold uppercase font-mono block">
                  Pincodes Serviced
                </span>
                <p className="text-foreground font-medium font-mono">{city.pincodes.join(", ")}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground font-semibold uppercase font-mono block">
                  Primary Landmarks
                </span>
                <p className="text-foreground font-medium">{city.landmarks.join(" · ")}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground font-semibold uppercase font-mono block">
                  Commercial Hubs & Co-ops
                </span>
                <p className="text-foreground font-medium">{city.nearbyBusinesses.join(" · ")}</p>
              </div>
            </div>
          </div>

          {/* Interactive Map Embed */}
          {city.mapEmbedUrl && (
            <div className="border border-border/60 rounded-2xl overflow-hidden shadow-lg h-[260px] bg-slate-950">
              <iframe
                title={`Google Map showing coverage in ${city.name}`}
                src={city.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          )}
        </div>

        {/* Local Testimonials */}
        {city.reviews.length > 0 && (
          <div className="border border-border/80 bg-slate-900/40 p-6 rounded-2xl mb-12 shadow-xl">
            <h3 className="font-display font-bold text-lg text-white mb-6">
              Customer Reviews in {city.name}
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {city.reviews.map((rev: any, idx: number) => (
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

        {/* Combined FAQs */}
        <div className="border border-border/60 bg-slate-900/20 p-6 rounded-2xl">
          <h3 className="font-display font-bold text-lg text-white mb-6">
            Frequently asked questions
          </h3>
          <div className="space-y-4">
            {/* Merge Location and Service FAQs */}
            {[...city.faqs, ...service.faqs].map((faq, idx) => (
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

        {/* SEO Spider Web: Internal Links */}
        <div className="mt-20 pt-16 border-t border-border/50">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-display font-semibold mb-6">Nearby Service Areas</h3>
              <div className="flex flex-wrap gap-3">
                {Route.useLoaderData().allLocations.map((loc: any) => (
                  <Link
                    key={loc.slug}
                    to="/cities/$citySlug/$serviceSlug"
                    params={{ citySlug: loc.slug, serviceSlug: service.slug }}
                    className="text-xs bg-card/20 border border-border/60 hover:bg-primary/20 hover:border-primary/50 text-muted-foreground hover:text-primary transition-all px-4 py-2 rounded-full"
                  >
                    {service.title} in {loc.name}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-display font-semibold mb-6">Other Services in {city.name}</h3>
              <div className="flex flex-wrap gap-3">
                {Object.values(servicesData).map((s: any) => (
                  <Link
                    key={s.slug}
                    to="/cities/$citySlug/$serviceSlug"
                    params={{ citySlug: city.slug, serviceSlug: s.slug }}
                    className="text-xs bg-card/20 border border-border/60 hover:bg-primary/20 hover:border-primary/50 text-muted-foreground hover:text-primary transition-all px-4 py-2 rounded-full"
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-border/80 py-8 text-center text-xs text-muted-foreground bg-slate-950/80 z-10 relative">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>© {new Date().getFullYear()} Prime Cool — Localized Mechanical Solutions</div>
          <div className="flex gap-4">
            <Link to="/" className="hover:text-primary transition">
              Home
            </Link>
            <Link to="/resources" className="hover:text-primary transition">
              Resources
            </Link>
            <Link to="/booking" className="hover:text-primary transition">
              Book Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
