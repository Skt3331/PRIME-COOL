import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { brandsData } from "../../lib/brands-data";
import { getCmsSettings } from "../../lib/api";
import logo from "../../assets/logo.webp";
import {
  ArrowLeft,
  Phone,
  Calendar,
  Wrench,
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";

const APPLIANCE_MAPPING: Record<
  string,
  {
    title: string;
    category: string;
    desc: string;
    faults: string[];
    spares: string[];
    faqs: { q: string; a: string }[];
  }
> = {
  ac: {
    title: "Air Conditioner Servicing & Jet Cleaning",
    category: "Air Conditioning",
    desc: "Certified split, cassette, window, and inverter AC maintenance. High-pressure coil wash, PCB restoration, and weight-based gas charging.",
    faults: [
      "No cooling / low cooling symptoms",
      "Gas leak on copper joints or condenser bends",
      "Indoor unit water leakage from clogged drain tray",
      "PCB communication error or remote controller unresponsive",
    ],
    spares: ["OEM Run Capacitors", "Replacement PCBs", "Thermistor sensors", "Drain lift pumps"],
    faqs: [
      {
        q: "How often should my inverter AC be jet washed?",
        a: "For tropical conditions, a high-pressure jet cleaning is recommended twice a year (before summer and post-monsoon) to prevent dust blockages.",
      },
      {
        q: "Do you use genuine brand gas during recharging?",
        a: "Yes, we use certified R32, R410A, or R22 refrigerants filled strictly by pressure and digital scale weights.",
      },
    ],
  },
  fridge: {
    title: "Refrigerator Diagnostics & Compressor Repair",
    category: "Refrigeration",
    desc: "Double-door, side-by-side, and commercial refrigerator troubleshooting. Relays, PCB control cards, sensor calibrations, and gas charging.",
    faults: [
      "Compressor makes a starting click-out sound but doesn't run",
      "Freezer freezes food but the lower compartment remains warm",
      "Defrost timer failure causing evaporator ice buildup",
      "Excessive noise from fan motor or compressor brackets",
    ],
    spares: [
      "Starting Relays & Overload Protectors (OLP)",
      "Bimetal Defrost Thermostats",
      "Digital Inverter Control Boards",
      "Door Gaskets & Magnetic Seals",
    ],
    faqs: [
      {
        q: "Why is the fridge cooling in the freezer but warm below?",
        a: "This is usually caused by a blocked air damper, failed defrost heater, or faulty evaporator fan motor preventing cold air circulation.",
      },
      {
        q: "How much does a refrigerator compressor replacement cost?",
        a: "Pricing depends on tonnage and refrigerant type (R134a/R600a), starting from ₹2,499 including gas charging and vacuum testing.",
      },
    ],
  },
  "washing-machine": {
    title: "Washing Machine Mechanical & PCB Overhaul",
    category: "Laundry Appliances",
    desc: "Front-load and top-load washing machine repairs. Drum bearings, inlet valves, drain pumps, suspension shocks, and inverter drive boards.",
    faults: [
      "Excessive vibration or grinding noise during high-speed spin cycle",
      "Water not draining out (OE / E2 error codes)",
      "Drum not rotating despite motor hum",
      "Touch panel dead or displaying error codes (IE, PE, dE)",
    ],
    spares: [
      "OEM Drum Bearings & Oil Seals",
      "Drain Discharge Pumps",
      "Pressure Level Sensors",
      "Soleneoid inlet valves",
      "Door locks",
      "Suspension rods",
      "Main drive belts",
    ],
    faqs: [
      {
        q: "Why is my washing machine shaking violently during spin?",
        a: "This is typically caused by worn-out drum suspension shock absorbers, unbalanced load distributions, or damaged drum bearings.",
      },
      {
        q: "Can you fix the control panel PCB if it is completely dead?",
        a: "Yes, we repair display boards and main power modules at the component level to save you spare part costs.",
      },
    ],
  },
  hvac: {
    title: "Centralized HVAC & VRF/VRV Maintenance",
    category: "Commercial Cooling",
    desc: "Commercial centralized VRF/VRV systems, ductable units, package plants, and chilled water loops. Preventative AMC audits and scroll/screw compressors.",
    faults: [
      "Communication loss along the daisy-chained communication line",
      "Electronic Expansion Valve (EEV) coils short-circuited",
      "High head discharge pressure during peak ambient temperatures",
      "Oil logging in the evaporator circuit causing low transfer",
    ],
    spares: [
      "EEV pulse motors",
      "Industrial contactors & relays",
      "Phase failure monitors",
      "Crankcase heaters",
    ],
    faqs: [
      {
        q: "What is included in commercial HVAC AMC maintenance?",
        a: "Our AMC covers quarterly descaling of condensers, indoor coil checks, filter replacement, electrical loop tightening, and suction/discharge pressure logs.",
      },
      {
        q: "Do you offer priority SLAs for corporate server rooms?",
        a: "Yes, we provide 24/7 emergency response contracts with a guaranteed 4-hour resolution SLA to protect server systems.",
      },
    ],
  },
};

export const Route = createFileRoute("/brands/$slug/$appliance")({
  loader: async ({ params }) => {
    let brand = brandsData[params.slug.toLowerCase()];
    const applianceKey = params.appliance.toLowerCase();
    const appliance = APPLIANCE_MAPPING[applianceKey];

    if (!brand) {
      const formattedBrand = params.slug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
      brand = {
        name: formattedBrand,
        slug: params.slug.toLowerCase(),
        faults: ["Cooling issues", "Gas leaks", "Compressor failures"],
        spares: ["Capacitors", "PCBs", "Sensors"],
        maintenance: ["Filter cleaning", "Coil washing"],
        warranty: "90 Days on parts",
        errorCodes: [],
      };
    }
    if (!appliance) {
      throw notFound();
    }

    const { settings } = await getCmsSettings();
    return { brand, appliance, applianceKey, cms: settings };
  },
  head: ({ loaderData }) => {
    const brand = loaderData?.brand;
    const appliance = loaderData?.appliance;
    if (!brand || !appliance) return { meta: [] };
    const pageTitle = `Authorized ${brand.name} ${appliance.category} Service | Prime Cool`;
    const pageDesc = `Get certified ${brand.name} ${appliance.category} diagnostics and repair. We use genuine ${brand.name} spare parts and offer transparent flat-rate pricing.`;
    return {
      meta: [
        { title: pageTitle },
        { name: "description", content: pageDesc },
        { property: "og:title", content: pageTitle },
        { property: "og:description", content: pageDesc },
      ],
      links: [
        {
          rel: "canonical",
          href: `https://primecool.in/brands/${brand.slug}/${loaderData.applianceKey}`,
        },
      ],
    };
  },
  component: BrandAppliancePage,
});

function BrandAppliancePage() {
  const { brand, appliance, applianceKey, cms } = Route.useLoaderData();
  const socials = cms?.socials || {};
  const phone = socials.phone || "+917507408461";

  return (
    <div className="min-h-screen text-foreground flex flex-col justify-between bg-slate-950">
      {/* Background gradients */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,color-mix(in_oklab,var(--electric)_8%,transparent),transparent_60%)] pointer-events-none" />

      {/* Main Container */}
      <main className="flex-1 pt-6 md:pt-8 pb-20 px-6 max-w-7xl mx-auto w-full relative z-10">
        {/* Breadcrumb */}
        <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary transition">
            Home
          </Link>{" "}
          /{" "}
          <Link to="/resources" className="hover:text-primary transition">
            Resources
          </Link>{" "}
          /{" "}
          <Link
            to="/brands/$slug"
            params={{ slug: brand.slug }}
            className="hover:text-primary transition"
          >
            {brand.name} Support
          </Link>{" "}
          / <span className="text-foreground font-semibold">{appliance.category}</span>
        </div>

        {/* Hero Segment */}
        <div className="grid lg:grid-cols-12 gap-8 items-center mb-12">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary font-mono uppercase">
              <Wrench className="h-3.5 w-3.5" />
              <span>OEM Specific Diagnostics</span>
            </div>

            <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight text-white">
              {brand.name} <span className="text-gradient">{appliance.category}</span> <br />
              Repair & Servicing
            </h1>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
              {appliance.desc} We provide specialized repair and maintenance procedures for all
              models of {brand.name} systems, using certified technicians and genuine factory parts.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/booking"
                search={{}}
                className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:opacity-90 transition glow-ring cursor-pointer"
              >
                <Calendar className="h-4 w-4" />
                <span>Schedule {brand.name} Repair</span>
              </Link>
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-slate-900/60 px-6 py-3 text-sm font-semibold hover:bg-card transition cursor-pointer"
              >
                <Phone className="h-4 w-4 text-primary" />
                <span>Call Lead Engineer</span>
              </a>
            </div>
          </div>

          {/* Key details card */}
          <div className="lg:col-span-5 border border-border/85 bg-slate-900/40 p-6 rounded-2xl space-y-5 shadow-xl backdrop-blur-md">
            <div>
              <span className="text-[10px] font-mono text-primary uppercase font-bold tracking-wider">
                Quality Assurance
              </span>
              <h3 className="text-base font-bold text-white mt-1">Warranty Information</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mt-2">{brand.warranty}</p>
            </div>
            <div className="border-t border-border/40 pt-4 space-y-2">
              <span className="text-xs font-semibold text-foreground block">SLA Commitment:</span>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li className="flex gap-2 items-center">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>45-Minute Rapid Response Dispatch</span>
                </li>
                <li className="flex gap-2 items-center">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Certified Field Mechanical Engineers</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Faults & Spares Grid */}
        <div className="grid md:grid-cols-2 gap-8 items-start mb-12">
          {/* Brand Specific Common Faults */}
          <div className="border border-border/60 bg-slate-900/20 p-6 rounded-2xl space-y-4">
            <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <span>
                Common {brand.name} {appliance.category} Faults
              </span>
            </h3>
            <ul className="space-y-3">
              {[...brand.faults, ...appliance.faults].slice(0, 5).map((f: string, idx: number) => (
                <li key={idx} className="flex gap-2.5 text-xs text-muted-foreground items-start">
                  <span className="text-primary font-mono mt-0.5">•</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Brand Specific Spares */}
          <div className="border border-border/60 bg-slate-900/20 p-6 rounded-2xl space-y-4">
            <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <span>Stocked OEM Spare Parts</span>
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We stock certified spare parts for {brand.name} {appliance.category} systems to
              guarantee rapid repairs:
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {[...brand.spares, ...appliance.spares].map((s: string, idx: number) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg border border-border bg-slate-900 text-xs text-foreground font-mono"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic FAQ block */}
        <div className="border border-border/60 bg-slate-900/20 p-6 rounded-2xl">
          <h3 className="font-display font-bold text-lg text-white mb-6">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {appliance.faqs.map((faq, idx) => (
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

      {/* Footer */}
      <footer className="border-t border-border/80 py-8 text-center text-xs text-muted-foreground bg-slate-950/80 z-10 relative">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>© {new Date().getFullYear()} Prime Cool — OEM Certified Diagnostics</div>
          <div className="flex gap-4">
            <Link to="/" className="hover:text-primary transition">
              Home
            </Link>
            <Link to="/resources" className="hover:text-primary transition">
              Resources
            </Link>
            <Link to="/booking" className="hover:text-primary transition">
              Book Repair
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
