import { createFileRoute, Link } from "@tanstack/react-router";
import { locationsData } from "../../lib/locations-data";
import { servicesData } from "../../lib/services-data";
import logo from "../../assets/logo.webp";
import { getCmsSettings } from "../../lib/api";
import {
  ArrowLeft,
  Phone,
  Calendar,
  MapPin,
  ShieldCheck,
  Clock,
  CheckCircle,
  Star,
  AlertTriangle,
  HelpCircle,
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
};

const getFallbackService = (
  slug: string,
): {
  title: string;
  tagline: string;
  description: string;
  priceEstimate: string;
  features: string[];
  process: string[];
  faqs: { q: string; a: string }[];
} => {
  const key = slug.toLowerCase();

  if (key.includes("shifting")) {
    return {
      title: "AC Shifting & Relocation",
      tagline: "Safe pump-down, transport, and re-installation of split & cassette AC units.",
      description:
        "Our professional AC shifting service ensures that your refrigerant is locked securely inside the condenser (pump-down procedure) before unmounting, preventing gas loss. We provide damage-free transport and precise re-installation with proper insulation.",
      priceEstimate: "Starts from ₹1,499 + copper piping",
      features: [
        "Refrigerant pump-down gas locking",
        "Bracket dismounting & vibration pad removal",
        "Piping insulation wraps",
        "Commissioning and airflow Delta-T diagnostics after mounting",
      ],
      process: [
        "Lock refrigerant using manifold gauges",
        "Dismount indoor and outdoor frames",
        "Transport and check brackets at new site",
        "Brazing/flaring, vacuuming, and commissioning",
      ],
      faqs: [
        {
          q: "Is gas lost during AC shifting?",
          a: "No, our technicians lock the refrigerant gas inside the compressor using specialized service valves before disconnecting lines.",
        },
      ],
    };
  }

  if (key.includes("installation")) {
    return {
      title: "AC Installation & Bracket Mounting",
      tagline: "Precision indoor-outdoor alignment, vibration insulation, and commissioning.",
      description:
        "Get professional split, window, or cassette AC installation. We prioritize perfect leveling to prevent water drips, high-grade copper piping flare connections, and deep vacuum holds before release.",
      priceEstimate: "Starts from ₹1,199 + copper lines",
      features: [
        "Nitrogen leak tests on piping flares",
        "Vibration pad base installs for noise drop",
        "Accurate slope leveling for drain lines",
        "Electrical cable amp compliance checks",
      ],
      process: [
        "Measure and drill wall plates with proper drainage slope",
        "Mount indoor evaporator unit and install outdoor brackets",
        "Brazing copper lines and wiring connections",
        "Deep evacuation and refrigerant valve release",
      ],
      faqs: [
        {
          q: "Do you supply the mounting brackets?",
          a: "Yes, we stock heavy-gauge powder-coated outdoor wall brackets that prevent rust and withstand outdoor vibrations.",
        },
      ],
    };
  }

  if (key.includes("uninstallation")) {
    return {
      title: "AC Uninstallation & Dismounting",
      tagline: "Professional gas locking and clean dismounting of split & window units.",
      description:
        "Our uninstallation services lock your refrigerant inside the outdoor unit, cap the copper lines to prevent moisture ingress, and safely remove indoor and outdoor frames.",
      priceEstimate: "Starts from ₹699",
      features: [
        "Manifold gauge gas lock",
        "Copper line capping to prevent dust/moisture",
        "Electrical harness isolation",
        "Clean bracket dismounting",
      ],
      process: [
        "Run compressor to pump down gas",
        "Close high & low service valves",
        "Disconnect copper lines and wiring",
        "Dismount frames and brackets",
      ],
      faqs: [
        {
          q: "Why should lines be capped after removal?",
          a: "Capping lines prevents ambient moisture and dust from entering the condenser coils, preventing compressor sludge.",
        },
      ],
    };
  }

  if (key.includes("charging") || key.includes("leak")) {
    return {
      title: "AC Gas Leak Repair & Recharging",
      tagline:
        "Pressure leak detection, copper brazing, deep evacuation, and weight-based charging.",
      description:
        "We resolve low pressure codes by conducting pressure holds (nitrogen checks), soap bubble scans, brazing leak spots, replacing filters, and charging refrigerant (R32, R410A) to target weights.",
      priceEstimate: "Starts from ₹2,500 inclusive of gas",
      features: [
        "High-pressure Nitrogen leak checking",
        "Oxygen-Acetylene brazing on leak spots",
        "Vacuum micron checks to prevent moisture",
        "Precision electronic scale weight-based charging",
      ],
      process: [
        "Recover residual gas and pressurize with Nitrogen",
        "Pinpoint leak points and braze joints",
        "Conduct vacuum drop tests",
        "Charge refrigerant strictly by nameplate weight",
      ],
      faqs: [
        {
          q: "Why is a vacuum necessary before gas charging?",
          a: "A deep vacuum removes air and moisture. Moisture reacts with compressor oil to form corrosive acid, damaging windings.",
        },
      ],
    };
  }

  if (key.includes("chiller")) {
    return {
      title: "Industrial Chiller Service & Overhauls",
      tagline: "Scroll/Screw compressor diagnostic, condenser descaling, and PLC calibration.",
      description:
        "We specialize in industrial water-cooled and air-cooled process chillers. Our services include descaling shell-and-tube exchangers, checking oil levels, calibrating flow switches, and PLC diagnostics.",
      priceEstimate: "Custom AMC / Quote-Based",
      features: [
        "Shell-and-tube condenser chemical descaling",
        "Compressor winding megger checks",
        "Flow switch safety control loops",
        "Superheat optimization at expansion valves",
      ],
      process: [
        "Log suction, discharge, and oil pressures",
        "Audit inlet/outlet water temperature difference",
        "Check control contactor pitting and tightening",
        "Verify oil heater and compressor rotation",
      ],
      faqs: [
        {
          q: "What causes low water flow tripouts?",
          a: "Low flow trips are typically caused by air locks, clogged Y-strainers, scaling inside tube arrays, or flow switch failures.",
        },
      ],
    };
  }

  if (
    key.includes("cold") ||
    key.includes("freezer") ||
    key.includes("chiller") ||
    key.includes("storage")
  ) {
    return {
      title: "Cold Room & Walk-in Storage Service",
      tagline: "PUF panel alignment, bimetal defrost diagnostics, and hermetic condensing units.",
      description:
        "We install and repair cold storages, blast freezers, and walk-in chillers. Our engineers calibrate digital controllers, test bimetal thermostat runs, fix door seal air leaks, and charge low-temperature gases (R404A).",
      priceEstimate: "Starts from ₹1,800 + Spares",
      features: [
        "Evaporator defrost heater diagnostics",
        "PUF thermal panel seal inspection",
        "Low-temp scroll compressor overhauls",
        "R404A refrigerant leak charging",
      ],
      process: [
        "Check room temperature logs against setpoint",
        "Test evaporator defrost heater current draw",
        "Inspect condenser fan motors and coils",
        "Verify pressure control settings (high/low bounds)",
      ],
      faqs: [
        {
          q: "Why is ice forming on my cold storage ceiling?",
          a: "Ceiling ice indicates high humidity from door gasket leaks, warm air entry, or a faulty bimetal defrost cycle heater.",
        },
      ],
    };
  }

  if (key.includes("hvac") || key.includes("ahu") || key.includes("fcu")) {
    return {
      title: "Commercial HVAC, AHU & FCU Maintenance",
      tagline: "Airflow balancing, fan motor bearing replacements, and filter drop diagnostics.",
      description:
        "Keep office and factory ventilation clean. We wash secondary filters, replace worn-out blower bearings, align fan belts, inspect control dampers, and descale cooling coil arrays.",
      priceEstimate: "AMC / Quote-Based",
      features: [
        "Blower fan belt tensioning and replacement",
        "Secondary filter wet washing and disinfection",
        "Evaporator coil fin descaling",
        "Modulating damper actuator checks",
      ],
      process: [
        "Inspect filters and log static pressure drops",
        "Wash cooling coils and clean drainage lines",
        "Lubricate blower shaft bearings",
        "Check electric heater contactor current",
      ],
      faqs: [
        {
          q: "How often should commercial AHU filters be washed?",
          a: "In standard offices, filters should be washed monthly and replaced every 6 to 12 months depending on ambient particulate levels.",
        },
      ],
    };
  }

  return {
    title: "AC Repair & Servicing",
    tagline: "Certified split, window, inverter, and cassette AC maintenance.",
    description:
      "Get prompt AC repair services. We diagnose starting capacitor failures, faulty PCBs, clogged condensate drains, low pressures, and outdoor fan burnout, restoring optimal comfort cooling.",
    priceEstimate: "Starts from ₹599 + Spares",
    features: [
      "Evaporator coil high-pressure jet wash",
      "Compressor capacitor start tests",
      "Refrigerant leak pinpointing",
      "PCB repair at components level",
    ],
    process: [
      "Disconnect power and check lines",
      "Diagnose starting capacitor current",
      "Clean filter and tray, wash coils",
      "Measure suction pressure and delta-T",
    ],
    faqs: [
      {
        q: "Do you offer warranties on repaired parts?",
        a: "Yes, all spare parts supplied and fitted by our technicians carry a 90-day replacement warranty.",
      },
    ],
  };
};

export const Route = createFileRoute("/services/$serviceSlug/$locationSlug")({
  loader: async ({ params }) => {
    const location = locationsData[params.locationSlug.toLowerCase()];
    if (!location) {
      throw new Error(`Location "${params.locationSlug}" not found`);
    }

    const serviceKey = params.serviceSlug.toLowerCase();
    const service = servicesData[serviceKey] || getFallbackService(serviceKey);

    const { settings } = await getCmsSettings();
    return { location, service, serviceKey, cms: settings };
  },
  head: ({ loaderData }) => {
    const location = loaderData?.location;
    const service = loaderData?.service;
    if (!location || !service) return { meta: [] };
    const pageTitle = `Best ${service.title} in ${location.name} | Prime Cool`;
    const pageDesc = `Get professional ${service.title} in ${location.name}. Verified local reviews, transparent flat-rate pricing, and 45-min emergency response.`;
    return {
      meta: [
        { title: pageTitle },
        { name: "description", content: pageDesc },
        { property: "og:title", content: pageTitle },
        { property: "og:description", content: pageDesc },
      ],
      links: [{ rel: "canonical", href: `/services/${loaderData.serviceKey}/${location.slug}` }],
    };
  },
  component: LocationServiceDetailsPage,
});

function LocationServiceDetailsPage() {
  const { location, service, serviceKey, cms } = Route.useLoaderData();
  const socials = cms?.socials || {};
  const phone = socials.phone || "+917507408461";

  const nearby = NEARBY_AREAS[location.slug] || [];

  return (
    <div className="min-h-screen text-foreground flex flex-col justify-between bg-slate-950">
      {/* Background gradients */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,color-mix(in_oklab,var(--primary)_8%,transparent),transparent_60%)] pointer-events-none" />

      {/* Main Container */}
      <main className="flex-1 pt-24 pb-20 px-6 max-w-7xl mx-auto w-full relative z-10">
        {/* Breadcrumb */}
        <Breadcrumbs />

        {/* Hero Segment */}
        <div className="grid lg:grid-cols-12 gap-8 items-center mb-12">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary font-mono uppercase">
              <MapPin className="h-3.5 w-3.5" />
              <span>Targeted Local Servicing Area</span>
            </div>

            <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight text-white">
              Professional {service.title} <br />
              in <span className="text-gradient">{location.name}</span>
            </h1>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
              {service.tagline} {service.description} We are stationed directly near{" "}
              {location.landmarks[0] || "main central spots"} to serve both residential apartments
              and commercial industrial plants.
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
                <span>Call Lead Engineer</span>
              </a>
            </div>

            {/* SLA Badging */}
            <div className="flex items-center gap-6 pt-4 text-xs font-mono text-muted-foreground border-t border-border/40 max-w-lg">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>
                  {location.type === "midc" ? "4-Hour Industrial SLA" : "45-Min Local SLA"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>100% Genuine Spares</span>
              </div>
            </div>
          </div>

          {/* Pricing indicators card */}
          <div className="lg:col-span-5 border border-border/80 bg-slate-900/40 p-6 rounded-2xl space-y-6 shadow-xl backdrop-blur-md">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-primary uppercase font-bold tracking-wider">
                Pricing Indicator
              </span>
              <div className="text-2xl font-display font-bold text-white">
                {service.priceEstimate}
              </div>
              <p className="text-xs text-muted-foreground">
                Pricing index represents baseline labor diagnostics. Material charges extra.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-semibold text-foreground block">
                Technical Features Included:
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

        {/* Process Checklist & Geographic Details */}
        <div className="grid md:grid-cols-2 gap-8 items-start mb-12">
          {/* Engineering Process */}
          <div className="border border-border/60 bg-slate-900/20 p-6 rounded-2xl space-y-4">
            <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>Diagnostic & Service Process</span>
            </h3>
            <ol className="space-y-3 text-xs text-muted-foreground list-decimal pl-4">
              {service.process.map((step, idx) => (
                <li key={idx} className="leading-relaxed">
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Geography card */}
          <div className="border border-border/60 bg-slate-900/20 p-6 rounded-2xl space-y-4">
            <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span>Coverage & Landmark Parameters</span>
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Our engineering crews are located near {location.name} to serve all resident sectors
              and adjacent industrial nodes:
            </p>
            <div className="space-y-2.5 text-xs">
              <div>
                <span className="text-muted-foreground font-semibold uppercase font-mono block">
                  Primary Landmarks
                </span>
                <p className="text-foreground font-medium">{location.landmarks.join(" · ")}</p>
              </div>
              {nearby.length > 0 && (
                <div>
                  <span className="text-muted-foreground font-semibold uppercase font-mono block">
                    Nearby Target Environs
                  </span>
                  <p className="text-foreground font-medium">{nearby.join(" · ")}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Reviews */}
        {location.reviews.length > 0 && (
          <div className="border border-border/80 bg-slate-900/40 p-6 rounded-2xl mb-12 shadow-xl">
            <h3 className="font-display font-bold text-lg text-white mb-6">
              Customer Reviews in {location.name}
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {location.reviews.map((rev, idx) => (
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
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {service.faqs.map((faq, idx) => (
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
