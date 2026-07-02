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
    const service = servicesData[params.slug];
    if (!service) {
      throw new Error(`Service "${params.slug}" not found`);
    }
    const { settings } = await getCmsSettings();
    return { service, cms: settings };
  },
  head: ({ loaderData }) => {
    const service = loaderData?.service;
    if (!service) return { meta: [] };
    const pageTitle = `${service.title} — Prime Cool India`;
    const pageDesc = service.tagline;
    return {
      meta: [
        { title: pageTitle },
        { name: "description", content: pageDesc },
        { property: "og:title", content: pageTitle },
        { property: "og:description", content: pageDesc },
        { property: "og:type", content: "website" },
      ],
      links: [{ rel: "canonical", href: `/services/${service.slug}` }],
    };
  },
  component: ServiceDetailsPage,
});

function ServiceDetailsPage() {
  const { service, cms } = Route.useLoaderData();
  const socials = cms?.socials || {};
  const phone = socials.phone || "+917507408461";
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen text-foreground flex flex-col justify-between bg-slate-950">
      {/* Background radial gradients */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,color-mix(in_oklab,var(--primary)_8%,transparent),transparent_60%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_bottom_left,color-mix(in_oklab,var(--electric)_5%,transparent),transparent_50%)] pointer-events-none" />

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
            <Link to="/blogs" className="hover:text-foreground transition">
              Blogs
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
              to="/"
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

      {/* Footer */}
      <footer className="border-t border-border/80 py-8 text-center text-xs text-muted-foreground bg-slate-950/80 z-10 relative">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>© {new Date().getFullYear()} Prime Cool — Mechanical Climate Solutions</div>
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
