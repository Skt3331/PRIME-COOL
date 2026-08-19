import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { servicesData } from "../../lib/services-data";
import { getCmsSettings } from "../../lib/api";
import logo from "../../assets/logo.webp";
import {
  ArrowLeft,
  Phone,
  Calendar,
  CheckCircle2,
  DollarSign,
  HelpCircle,
  Settings,
  Award,
  ArrowRight,
  ShieldCheck,
  Thermometer,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/services/$slug")({
  loader: async ({ params }) => {
    let service = servicesData[params.slug];
    if (!service) {
      const formattedTitle = params.slug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
      service = {
        title: formattedTitle,
        slug: params.slug.toLowerCase(),
        tagline: `Professional ${formattedTitle} services by Prime Cool in Pune & Maharashtra.`,
        category: "HVAC & Mechanical Services",
        overview: `Prime Cool provides expert ${formattedTitle} for residential, commercial, and industrial facilities. Our certified engineers deliver rapid-response servicing with genuine spare parts and zero-downtime maintenance.`,
        features: [
          "Rapid On-Site Response under 60 minutes",
          "100% OEM Spare Parts Guarantee",
          "Certified HVAC & Refrigeration Technicians",
          "Transparent Standardized Pricing",
        ],
        faqs: [
          {
            q: `How quickly can you dispatch a technician for ${formattedTitle}?`,
            a: `We provide rapid emergency dispatch within 45 to 60 minutes across Pune, Wagholi, Hadapsar, Kharadi, Chakan, and Ranjangaon MIDC.`,
          },
        ],
        seoTitle: `${formattedTitle} Services in Pune — Prime Cool`,
        seoDesc: `Expert ${formattedTitle} by Prime Cool. Rapid response, genuine spare parts, and certified technician dispatch across Pune.`,
      };
    }
    const { settings } = await getCmsSettings();
    return { service, cms: settings };
  },
  head: ({ loaderData }) => {
    const service = loaderData?.service;
    if (!service) return { meta: [] };
    const pageTitle = service.seoTitle || `${service.title} — Prime Cool India`;
    const pageDesc = service.seoDesc || service.tagline;
    
    const meta: any[] = [
      { title: pageTitle },
      { name: "description", content: pageDesc },
      { property: "og:title", content: pageTitle },
      { property: "og:description", content: pageDesc },
      { property: "og:type", content: "website" },
    ];
    
    if (service.seoKeywords) {
      meta.push({ name: "keywords", content: service.seoKeywords });
    }

    return {
      meta,
      links: [{ rel: "canonical", href: `https://primecool.in/services/${service.slug}` }],
    };
  },
  component: ServiceDetailsPage,
});

function ServiceDetailsPage() {
  const { service, cms } = Route.useLoaderData();
  const socials = cms?.socials || {};
  const phone = socials.phone || "+917507408461";
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqSchema = service.faqs?.length
    ? {
        "@type": "FAQPage",
        mainEntity: service.faqs.map((f: any) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.a,
          },
        })),
      }
    : null;

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://primecool.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: "https://primecool.in/services",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: `https://primecool.in/services/${service.slug}`,
      },
    ],
  };

  const serviceSchema = {
    "@type": "Service",
    name: service.title,
    serviceType: service.category || "HVAC Maintenance",
    provider: {
      "@type": "LocalBusiness",
      name: "Prime Cool",
      url: "https://primecool.in",
      telephone: phone,
      logo: "https://primecool.in/logo.png",
    },
    areaServed: ["Wagholi", "Shirur", "Hadapsar", "Kharadi", "Chakan MIDC", "Ranjangaon MIDC", "Pune"],
    description: service.seoDesc || service.tagline,
  };

  return (
    <div className="min-h-screen text-foreground flex flex-col justify-between bg-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [breadcrumbSchema, serviceSchema, faqSchema].filter(Boolean),
          }),
        }}
      />
      {/* Background radial gradients */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,color-mix(in_oklab,var(--primary)_8%,transparent),transparent_60%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_bottom_left,color-mix(in_oklab,var(--electric)_5%,transparent),transparent_50%)] pointer-events-none" />

      {/* Main Container */}
      <main className="flex-1 pb-20 px-6 max-w-7xl mx-auto w-full relative z-10">
        {/* Breadcrumb */}
        <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-6 flex items-center gap-2">
          <Link to="/" className="hover:text-primary transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-primary">{service.category}</span>
          <span>/</span>
          <span className="text-foreground font-semibold truncate max-w-xs">{service.title}</span>
        </div>

        {/* Hero Area */}
        <div className="grid lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left Column: Heading & Description */}
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-xs font-semibold text-primary uppercase tracking-wider font-mono">
              <Thermometer className="h-3.5 w-3.5" />
              <span>{service.category} HVAC/R solutions</span>
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight text-white">
              {service.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">{service.description}</p>

            {/* Custom Features Grid */}
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {service.features.map((feat: string, idx: number) => (
                <div
                  key={idx}
                  className="flex gap-3 items-start border border-border/40 p-4 rounded-xl bg-slate-900/40 backdrop-blur-sm hover:border-primary/30 transition"
                >
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-sm text-foreground">{feat}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Sticky Pricing & Action Panel */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="border border-border bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 shadow-xl space-y-6">
              <div>
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block">
                  Estimated Cost
                </span>
                <div className="text-3xl font-display font-bold text-gradient mt-1">
                  {service.priceEstimate}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  *Standard pricing applies for diagnostic audits. Exact spare parts quoted on site.
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-border/40">
                <Link
                  to="/booking"
                  search={{}}
                  className="w-full justify-center px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-95 transition inline-flex items-center gap-2 shadow-lg shadow-primary/20 cursor-pointer"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Book Online Service</span>
                </Link>
                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="w-full justify-center px-6 py-3 rounded-xl border border-border bg-slate-950/40 text-foreground font-semibold text-sm hover:bg-slate-900 transition inline-flex items-center gap-2 cursor-pointer"
                >
                  <Phone className="h-4 w-4 text-primary" />
                  <span>Call {phone}</span>
                </a>
              </div>

              <div className="rounded-xl bg-primary/5 border border-primary/20 p-4 flex gap-3 items-start text-xs text-muted-foreground">
                <ShieldCheck className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <strong className="text-foreground block">Guaranteed Workmanship</strong>
                  All spare parts are genuine OEM components backed by warranty logs.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Process Timeline */}
        <div className="border border-border/60 bg-slate-900/20 backdrop-blur-sm rounded-2xl p-8 mb-12 space-y-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold font-display text-white">
              Our Service & Commissioning Process
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              We follow a strict mechanical diagnosis standard to ensure zero failures.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 relative">
            {service.process.map((step: string, idx: number) => (
              <div key={idx} className="relative space-y-3 border-l-2 border-primary/40 pl-4 py-1">
                <div className="absolute left-[-7px] top-1.5 h-3.5 w-3.5 rounded-full bg-slate-950 border-2 border-primary" />
                <span className="text-[10px] font-mono text-primary uppercase tracking-widest block">
                  Phase 0{idx + 1}
                </span>
                <p className="text-sm text-foreground font-medium leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Service FAQs */}
        {service.faqs.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold font-display text-white flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              <span>Service FAQs</span>
            </h2>
            <div className="space-y-3">
              {service.faqs.map((faq: { q: string; a: string }, idx: number) => (
                <div
                  key={idx}
                  className="border border-border/60 bg-slate-900/30 rounded-xl overflow-hidden transition"
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
