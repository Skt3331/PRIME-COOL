import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { getPublicProjects, getCmsSettings, getPublicBlogs, getPublicServices } from "../lib/api";
import heroImage from "@/assets/hero.webp";
import logo from "@/assets/logo.webp";
import projectFreezer from "@/assets/project_freezer.webp";
import projectCoolingTower from "@/assets/project_cooling_tower.webp";
import projectAcRollout from "@/assets/project_ac_rollout.webp";
import serviceAc from "@/assets/service_ac.webp";
import serviceFridge from "@/assets/service_fridge.webp";
import serviceWasher from "@/assets/service_washer.webp";
import serviceHeavyMech from "@/assets/service_heavy_mech.webp";
import serviceElectrical from "@/assets/service_electrical.webp";
import serviceOverhauls from "@/assets/service_overhauls.webp";
import serviceAmc from "@/assets/service_amc.webp";
import { WhatsAppWidget } from "../components/WhatsAppWidget";
import {
  Snowflake,
  Wind,
  Wrench,
  Cog,
  Factory,
  Refrigerator,
  WashingMachine,
  Gauge,
  Zap,
  ShieldCheck,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  CircuitBoard,
  ThermometerSnowflake,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
  Mail,
  Star,
  Award,
  Calendar,
} from "lucide-react";
const IconMap: Record<string, any> = {
  Snowflake,
  Wind,
  Wrench,
  Cog,
  Factory,
  Refrigerator,
  WashingMachine,
  Gauge,
  Zap,
  ShieldCheck,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  CircuitBoard,
  ThermometerSnowflake,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
  Mail,
  Star,
  Award,
};

function getDynamicIcon(iconName: string) {
  return IconMap[iconName] || Wrench;
}

export const Route = createFileRoute("/")({
  loader: async () => {
    try {
      const [projectsResp, settingsResp, blogsResp, servicesResp] = await Promise.all([
        getPublicProjects().catch(() => ({ projects: [] })),
        getCmsSettings().catch(() => ({ settings: {} })),
        getPublicBlogs().catch(() => ({ blogs: [] })),
        getPublicServices().catch(() => ({ services: [] })),
      ]);
      return {
        projects: projectsResp?.projects || [],
        cms: settingsResp?.settings || {},
        blogs: blogsResp?.blogs || [],
        services: servicesResp?.services || [],
      };
    } catch (e) {
      console.error("Home loader exception:", e);
      return { projects: [], cms: {}, blogs: [], services: [] };
    }
  },
  head: ({ loaderData }) => {
    const seo = loaderData?.cms?.seo?.home;
    const title = seo?.title || "Prime Cool | Industrial Cooling & Commercial HVAC Engineering Pune";
    const description =
      seo?.description ||
      "Prime Cool delivers 24x7 emergency HVAC repair, chiller plant overhauls, commercial VRF installations, split AC jet cleaning, and cold storage maintenance across Wagholi, Pune, Chakan, and Ranjangaon MIDC.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:image", content: "https://primecool.in/logo.png" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: "https://primecool.in" }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Prime Cool",
            url: "https://primecool.in",
            logo: "https://primecool.in/logo.png",
            image: "https://primecool.in/logo.png",
            sameAs: ["https://primecool.in/"],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HVACBusiness",
            name: "Prime Cool Engineering",
            url: "https://primecool.in",
            logo: "https://primecool.in/logo.png",
            image: "https://primecool.in/logo.png",
            telephone: "+917507408461",
            address: {
              "@type": "PostalAddress",
              streetAddress: "A-12, Green City, Wagholi-Bhavadi Road",
              addressLocality: "Wagholi, Pune",
              addressRegion: "Maharashtra",
              postalCode: "412207",
              addressCountry: "IN",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 18.5793,
              longitude: 73.9814,
            },
            areaServed: ["Pune", "PCMC", "Wagholi", "Ranjangaon MIDC", "Chakan MIDC", "Kharadi", "Hadapsar"],
            openingHoursSpecification: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              opens: "00:00",
              closes: "23:59",
            },
            priceRange: "₹₹",
            sameAs: ["https://primecool.in/"],
          }),
        },
      ],
    };
  },
  component: Index,
});

const domesticServices = [
  {
    icon: ThermometerSnowflake,
    title: "Split & Inverter AC Jet Servicing",
    desc: "High-pressure chemical jet wash, compressor PCB diagnostics, start capacitor replacement, and precision installation for all split AC brands.",
    image: serviceAc,
  },
  {
    icon: Wind,
    title: "Commercial Cassette & VRF Systems",
    desc: "Centralized HVAC maintenance, cassette AC descaling, VRV Refnet joint inspection, and server room precision cooling for offices & clinics.",
    image: serviceOverhauls,
  },
  {
    icon: Gauge,
    title: "AC Gas Recharging & Leak Detection",
    desc: "Nitrogen pressure leak testing, vacuum evacuation, and 100% genuine R-32, R-410A, and R-22 gas recharging with digital manifold verification.",
    image: serviceElectrical,
  },
];

const industrialServices = [
  {
    icon: Factory,
    title: "Heavy Mechanical Maintenance",
    desc: "Routine & emergency servicing for plant machinery, large ventilation networks and cooling towers.",
    image: serviceHeavyMech,
  },
  {
    icon: CircuitBoard,
    title: "Component & Electrical Precision",
    desc: "Capacitors, complex wiring, industrial valves and pressure gauges — installed, calibrated, and verified.",
    image: serviceElectrical,
  },
  {
    icon: Cog,
    title: "Equipment Overhauls",
    desc: "High-capacity overhauls and diagnostics designed to minimise downtime and protect factory throughput.",
    image: serviceOverhauls,
  },
  {
    icon: ShieldCheck,
    title: "Preventative AMCs",
    desc: "Tailored Annual Maintenance Contracts that prevent failures and extend the life of demanding equipment.",
    image: serviceAmc,
  },
];

const stats = [
  { value: "24/7", label: "Rapid Response" },
  { value: "2", label: "Industrial Hubs Served" },
  { value: "100%", label: "Engineered Reliability" },
  { value: "AMC", label: "Zero-Downtime Plans" },
];

const regions = [
  "Wagholi",
  "Lonikand",
  "Kesnand",
  "Koregaon Bhima",
  "Shikrapur",
  "Karegaon MIDC",
  "Ranjangaon MIDC",
  "Shirur",
];

function Index() {
  const { projects, cms, blogs, services } = Route.useLoaderData();

  return (
    <div className="min-h-screen text-foreground">
      <main>
        <Hero hero={cms.hero} />
        <Stats cms={cms} />
        <Services services={services} />
        <Industrial services={services} />
        <ServiceProcess />
        <Portfolio projects={projects} />
        <ResourceHub />
        <BlogsPreview blogs={blogs} />
        <Catalog amcTiers={cms.amcTiers} />
        <Testimonials />
        <About />
        <Certifications />
        <Coverage cms={cms} />
        <Faq faqs={cms.faqs} />
        <Contact cms={cms} />
      </main>
      {cms?.whatsapp && <WhatsAppWidget whatsapp={cms.whatsapp} />}
    </div>
  );
}

function ResourceHub() {
  return (
    <section
      id="resources-promo"
      className="py-24 border-t border-border bg-card/10 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,color-mix(in_oklab,var(--primary)_6%,transparent),transparent_50%)] pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <SectionHeader
              tag="Engineering Tools"
              title="HVAC/R Calculators & Formulas"
              subtitle="Empowering technicians and plant managers with interactive sizing utilities, refrigerant Antoine pressure-temperature charts, and diagnosis checklists."
            />
            <div className="pt-2">
              <Link
                to="/calculators"
                className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:opacity-90 transition glow-ring"
              >
                Open Calculators <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            <div className="surface-card rounded-2xl p-5 space-y-3 border border-border/60 hover:border-primary/40 transition">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-primary">
                <Gauge className="h-4.5 w-4.5" />
              </div>
              <h3 className="font-display font-semibold text-foreground text-sm">
                Superheat &amp; Subcooling Tools
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Calculate operational subcooling and superheat instantly to check system charging
                levels.
              </p>
              <div className="flex gap-2">
                <Link
                  to="/tools/superheat-calculator"
                  className="text-xs text-primary font-semibold hover:underline"
                >
                  Superheat &rarr;
                </Link>
                <span className="text-border text-muted-foreground/30">|</span>
                <Link
                  to="/tools/subcooling-calculator"
                  className="text-xs text-primary font-semibold hover:underline"
                >
                  Subcooling &rarr;
                </Link>
              </div>
            </div>

            <div className="surface-card rounded-2xl p-5 space-y-3 border border-border/60 hover:border-primary/40 transition">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-primary">
                <Zap className="h-4.5 w-4.5" />
              </div>
              <h3 className="font-display font-semibold text-foreground text-sm">
                Calculators &amp; Converters
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Calculate BTU heat load sizing, AC tonnage requirements, vacuum conversions, and CFM
                airflow.
              </p>
              <div className="flex gap-2">
                <Link
                  to="/tools/btu-calculator"
                  className="text-xs text-primary font-semibold hover:underline"
                >
                  BTU Sizer &rarr;
                </Link>
                <span className="text-border text-muted-foreground/30">|</span>
                <Link
                  to="/tools/tonnage-calculator"
                  className="text-xs text-primary font-semibold hover:underline"
                >
                  Tonnage &rarr;
                </Link>
              </div>
            </div>

            <div className="surface-card rounded-2xl p-5 space-y-3 border border-border/60 hover:border-primary/40 transition">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-primary">
                <Wrench className="h-4.5 w-4.5" />
              </div>
              <h3 className="font-display font-semibold text-foreground text-sm">
                Troubleshooting Wizard
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Use our step-by-step diagnostic tree wizard to trace compressor, coil, and suction
                pressure faults.
              </p>
              <Link
                to="/interactive/wizard"
                className="text-xs text-primary font-semibold hover:underline block"
              >
                Diagnose Faults &rarr;
              </Link>
            </div>

            <div className="surface-card rounded-2xl p-5 space-y-3 border border-border/60 hover:border-primary/40 transition">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-primary">
                <ThermometerSnowflake className="h-4.5 w-4.5" />
              </div>
              <h3 className="font-display font-semibold text-foreground text-sm">
                Refrigerant PT Charts
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Dedicated Antoine saturation reference tables for R134a, R410A, R32, R404A, and
                R407C.
              </p>
              <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs">
                <Link to="/refrigerants/r410a" className="text-primary hover:underline">
                  R410A
                </Link>
                <Link to="/refrigerants/r32" className="text-primary hover:underline">
                  R32
                </Link>
                <Link to="/refrigerants/r134a" className="text-primary hover:underline">
                  R134a
                </Link>
                <Link to="/refrigerants/r404a" className="text-primary hover:underline">
                  R404A
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Hero({ hero }: { hero: any }) {
  return (
    <section
      id="top"
      className="relative pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-16 md:pb-24 overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none"
        style={{
          backgroundImage: `url(${hero?.backgroundImage || heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center right",
          maskImage: "linear-gradient(to left, black 0%, black 40%, transparent 90%)",
          WebkitMaskImage: "linear-gradient(to left, black 0%, black 40%, transparent 90%)",
        }}
      />

      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl animate-spin-slow"
          style={{
            background: "radial-gradient(circle, #00c8ff 0%, #0066ff 50%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full opacity-15 blur-3xl"
          style={{
            background: "radial-gradient(circle, #0066ff 0%, #8b5cf6 60%, transparent 80%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className="animate-fade-up">
          {/* Location pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-1.5 text-xs text-slate-300 mb-4 sm:mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00c8ff] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00c8ff]" />
            </span>
            Pune · Wagholi–Shirur corridor · Karegaon · Ranjangaon
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] text-white">
            {hero.title1}
            <br />
            <span className="text-shimmer">{hero.title2}</span>
          </h1>

          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-400 max-w-lg leading-relaxed">{hero.subtitle}</p>

          <div className="mt-6 sm:mt-8 flex flex-wrap gap-4">
            <Link to={hero.cta1Link} className="btn-primary">
              {hero.cta1Text} <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={hero.cta2Link} className="btn-secondary">
              <Phone className="h-4 w-4 text-[#00ffcc]" /> {hero.cta2Text}
            </a>
          </div>

          {/* Google Reviews rating badge */}
          <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-3.5">
            <div className="flex text-amber-400 gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <div>
              <span className="font-bold text-white text-sm block">4.9 / 5 Stars</span>
              <span className="text-xs text-slate-400">Based on 450+ Google Reviews</span>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-6 text-xs text-slate-500">
            {[
              { icon: Clock, label: "Rapid Response" },
              { icon: ShieldCheck, label: "AMC Backed" },
              { icon: Zap, label: "Industrial Grade" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <Icon className="h-3.5 w-3.5 text-[#00c8ff]" /> {label}
              </div>
            ))}
          </div>
        </div>

        <div className="relative hidden lg:block animate-slide-right">
          {/* Main image card */}
          <div
            className="relative rounded-3xl overflow-hidden border border-white/10"
            style={{ boxShadow: "0 0 60px rgba(0,200,255,0.25), 0 30px 80px rgba(0,0,0,0.6)" }}
          >
            <img
              src={heroImage}
              alt="Futuristic HVAC and industrial cooling visualization"
              className="w-full aspect-square object-cover"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#09090f]/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-2xl border border-white/10 bg-[#09090f]/70 backdrop-blur-xl p-4">
              <div>
                <div className="text-xs text-slate-400">Live Service</div>
                <div className="font-display font-semibold text-white">
                  Cooling Tower · Ranjangaon
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-400">Status</div>
                <div className="text-sm font-bold text-[#00c8ff]">● Optimal</div>
              </div>
            </div>
          </div>

          {/* Floating badges */}
          <div className="absolute -top-5 -left-5 animate-float">
            <div
              className="rounded-2xl border border-white/10 bg-[#111118]/90 backdrop-blur-xl px-4 py-3 flex items-center gap-3"
              style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.5)" }}
            >
              <div
                className="h-9 w-9 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #00c8ff20, #0066ff20)",
                  border: "1px solid rgba(0,200,255,0.3)",
                }}
              >
                <Snowflake className="h-4.5 w-4.5 text-[#00c8ff]" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-white">-3°C</div>
                <div className="text-slate-400">Refrigerant Optimal</div>
              </div>
            </div>
          </div>
          <div
            className="absolute -bottom-5 -right-5 animate-float"
            style={{ animationDelay: "1.5s" }}
          >
            <div
              className="rounded-2xl border border-white/10 bg-[#111118]/90 backdrop-blur-xl px-4 py-3 flex items-center gap-3"
              style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.5)" }}
            >
              <div
                className="h-9 w-9 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #0066ff20, #8b5cf620)",
                  border: "1px solid rgba(0,102,255,0.3)",
                }}
              >
                <Gauge className="h-4.5 w-4.5 text-[#0066ff]" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-white">5.2 bar</div>
                <div className="text-slate-400">Pressure Verified</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats({ cms }: { cms?: any }) {
  const displayStats =
    cms?.stats && cms.stats.length > 0
      ? cms.stats
      : [
          { value: "24/7", label: "Rapid Response" },
          { value: "2", label: "Industrial Hubs Served" },
          { value: "100%", label: "Engineered Reliability" },
          { value: "AMC", label: "Zero-Downtime Plans" },
        ];
  return (
    <section className="py-12 border-y border-border bg-black relative z-20">
      <div className="absolute inset-0 noise-overlay opacity-50 pointer-events-none" />
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {displayStats.map((s: any, i: number) => (
            <div
              key={s.label}
              className="bento-card p-6 flex flex-col items-center justify-center text-center animate-fade-up group"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="font-display text-3xl md:text-5xl font-bold text-white group-hover:text-shimmer transition-colors">
                {s.value}
              </div>
              <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#00ffcc] mt-3">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services({ services }: { services?: any[] }) {
  const displayServices =
    services && services.length > 0
      ? services
          .filter((s: any) => s.category === "domestic")
          .map((s) => ({
            ...s,
            icon: getDynamicIcon(s.icon),
          }))
      : domesticServices;

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(0,200,255,0.05),transparent_50%)] pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader
          tag="Domestic & Commercial"
          title="Climate & appliance solutions, sharper than service-as-usual."
          subtitle="Trained technicians, genuine parts, and verifiable diagnostics for every home and storefront."
        />
        <div className="mt-14 grid md:grid-cols-3 gap-7">
          {displayServices.map((s: any) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Industrial({ services }: { services?: any[] }) {
  const displayServices =
    services && services.length > 0
      ? services
          .filter((s: any) => s.category === "industrial")
          .map((s) => ({
            ...s,
            icon: getDynamicIcon(s.icon),
          }))
      : industrialServices;

  return (
    <section
      id="industrial"
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0c0c14 0%, #09090f 100%)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(0,102,255,0.12) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader
          tag="Heavy Industrial"
          title="Factory-grade mechanical engineering, on-call."
          subtitle="Karegaon and Ranjangaon manufacturing zones rely on us to keep production lines running."
        />
        <div className="mt-14 grid md:grid-cols-2 gap-7">
          {displayServices.map((s: any) => (
            <ServiceCard key={s.title} {...s} large />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  icon: Icon,
  title,
  desc,
  image,
  large,
}: {
  icon: typeof Wrench;
  title: string;
  desc: string;
  image: string;
  large?: boolean;
}) {
  return (
    <Link
      to="/booking"
      search={{ service: title }}
      className="surface-card group relative overflow-hidden flex flex-col h-full rounded-3xl border border-white/10 hover:border-[#00c8ff]/50 hover:shadow-[0_0_30px_rgba(0,200,255,0.15)] transition-all duration-300 backdrop-blur-md"
    >
      {/* Service Card Thumbnail */}
      <div className="aspect-video relative overflow-hidden border-b border-white/10">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full group-hover:scale-105 transition duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090f] via-black/30 to-transparent pointer-events-none" />
        
        {/* Badges overlay */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#00c8ff]/20 border border-[#00c8ff]/40 text-[#00c8ff] backdrop-blur-md shadow-sm">
            24x7 Response
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/60 border border-white/15 text-slate-300 backdrop-blur-md">
            OEM Spares
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div
        className={`p-6 ${large ? "md:p-8" : ""} flex-1 flex flex-col justify-between relative overflow-hidden`}
      >
        <div className="relative">
          <div
            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl mb-4 group-hover:scale-110 transition-transform"
            style={{
              background: "linear-gradient(135deg, rgba(0,200,255,0.15), rgba(0,102,255,0.15))",
              border: "1px solid rgba(0,200,255,0.3)",
            }}
          >
            <Icon className="h-6 w-6 text-[#00c8ff]" />
          </div>
          <h3 className="font-display text-xl font-bold mb-2 text-white group-hover:text-[#00c8ff] transition-colors">
            {title}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
        </div>
        <div className="mt-6 pt-4 border-t border-white/8 flex items-center justify-between text-xs font-bold text-[#00c8ff] group-hover:text-[#00ffcc] transition-colors">
          <span>Book {title}</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

function SectionHeader({
  tag,
  title,
  subtitle,
  light,
}: {
  tag: string;
  title: string;
  subtitle: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-2xl">
      <div
        className={`inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] mb-5 ${light ? "text-[#0066ff]" : "text-[#00c8ff]"}`}
      >
        <span className={`h-px w-10 ${light ? "bg-[#0066ff]" : "bg-[#00c8ff]"}`} />
        {tag}
        <span className={`h-px w-10 ${light ? "bg-[#0066ff]/40" : "bg-[#00c8ff]/40"}`} />
      </div>
      <h2
        className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] ${light ? "text-[#0f172a]" : "text-white"}`}
      >
        {title}
      </h2>
      <p
        className={`mt-5 text-base leading-relaxed ${light ? "text-slate-500" : "text-slate-400"}`}
      >
        {subtitle}
      </p>
    </div>
  );
}

const coverageDetails: Record<
  string,
  {
    status: string;
    eta: string;
    services: string[];
    type: string;
    load: number;
  }
> = {
  Wagholi: {
    status: "Active Route (High Priority)",
    eta: "Under 38 minutes",
    services: ["AC Servicing", "Washing Machines", "Display Chillers"],
    type: "Mixed Route",
    load: 88,
  },
  Lonikand: {
    status: "Active Route",
    eta: "Under 45 minutes",
    services: ["Domestic AC", "Refrigeration", "Electrical Panels"],
    type: "Domestic Route",
    load: 74,
  },
  Kesnand: {
    status: "Active Route",
    eta: "Under 50 minutes",
    services: ["AC Install & Repair", "Washing Machines"],
    type: "Domestic Route",
    load: 60,
  },
  "Koregaon Bhima": {
    status: "Active Corridor (MIDC Adjacent)",
    eta: "Under 55 minutes",
    services: ["Commercial Refrigeration", "Domestic Appliance", "Heavy Mechanical"],
    type: "Mixed Route",
    load: 81,
  },
  Shikrapur: {
    status: "Active Route (Hub Centre)",
    eta: "Under 40 minutes",
    services: ["Chillers", "Washing Machines", "Industrial AMCs"],
    type: "Mixed Route",
    load: 85,
  },
  "Karegaon MIDC": {
    status: "Embedded Engineering SLA",
    eta: "Under 4 hours (Contract SLA)",
    services: ["Heavy Machinery", "Cooling Towers", "AMCs"],
    type: "Heavy Industrial",
    load: 92,
  },
  "Ranjangaon MIDC": {
    status: "Embedded Engineering SLA",
    eta: "Under 4 hours (Contract SLA)",
    services: ["Heavy Machinery", "Cooling Towers", "Chillers"],
    type: "Heavy Industrial",
    load: 90,
  },
  Shirur: {
    status: "Active Corridor Terminal",
    eta: "Under 60 minutes",
    services: ["Appliance Diagnostics", "AC Troubleshooting", "Commercial AMC"],
    type: "Mixed Route",
    load: 70,
  },
};

function Coverage({ cms }: { cms?: any }) {
  const displayRegions: string[] = cms?.regions && cms.regions.length > 0 ? cms.regions : regions;
  const [selectedRegion, setSelectedRegion] = useState(displayRegions[0] || "Wagholi");
  const details = coverageDetails[selectedRegion] || coverageDetails["Wagholi"];

  return (
    <section
      id="coverage"
      className="py-24 border-t border-border bg-slate-950/20 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,color-mix(in_oklab,var(--electric)_5%,transparent),transparent_50%)] pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Interactive Selector */}
        <div className="lg:col-span-6 space-y-6">
          <SectionHeader
            tag="Service Footprint"
            title="Interactive Route Sizer & SLA Coverage Calculator."
            subtitle="Select a dynamic region along our main Wagholi–Shirur corridor to see dispatch telemetry, response times, and available parts."
          />

          <div className="relative max-w-sm">
            <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-2">
              Select Site Location
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="block w-full rounded-xl border border-border bg-slate-900/90 px-4 py-3 text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition cursor-pointer"
            >
              {displayRegions.map((r) => (
                <option key={r} value={r} className="bg-slate-900 text-foreground">
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Location Telemetry Card */}
          <div className="surface-card rounded-2xl p-6 border border-border/80 relative overflow-hidden shadow-xl backdrop-blur-sm">
            <div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-bl from-primary/10 to-transparent pointer-events-none rounded-tr-2xl" />

            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-primary">
                  {details.type}
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mt-1">
                  {selectedRegion}
                </h3>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-xs text-emerald-400 font-mono">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                SLA ONLINE
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border/40 pt-4">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 text-primary shrink-0" />
                  Response SLA
                </div>
                <div className="mt-1 font-display font-semibold text-gradient text-sm">
                  {details.eta}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                  Route Status
                </div>
                <div className="mt-1 text-xs text-foreground font-medium truncate">
                  {details.status}
                </div>
              </div>
            </div>

            {/* Load Capacity Gauge */}
            <div className="mt-6">
              <div className="flex justify-between text-xs font-mono text-muted-foreground mb-1.5">
                <span>Route Capacity Density</span>
                <span className="text-primary font-bold">{details.load}% Optimal Load</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-electric transition-all duration-700 rounded-full"
                  style={{ width: `${details.load}%` }}
                />
              </div>
            </div>

            {/* Available Spares List */}
            <div className="mt-6 pt-4 border-t border-border/40">
              <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-2">
                Active Spares Stocked
              </div>
              <div className="flex flex-wrap gap-1.5">
                {details.services.map((svc) => (
                  <span
                    key={svc}
                    className="rounded-md border border-border/60 bg-slate-900/60 px-2.5 py-1 text-xs text-foreground"
                  >
                    {svc}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Dispatch Hub */}
        <div className="lg:col-span-6 space-y-6">
          <div className="surface-card rounded-3xl p-8 relative overflow-hidden border border-border/60 shadow-2xl bg-slate-900/50 backdrop-blur-sm">
            <div className="absolute top-4 right-4 animate-pulse">
              <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 border border-red-500/20 px-2.5 py-0.5 text-[10px] font-mono text-red-400">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                LIVE COMMAND
              </span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                <Wind className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold">Technician Dispatch Console</h3>
                <p className="text-xs text-muted-foreground">Global routing system monitor</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-950/40 p-4 rounded-xl border border-border/40">
                <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  Active Field Units
                </div>
                <div className="text-xl font-bold mt-1 text-foreground flex items-baseline gap-1">
                  3 Deployed{" "}
                  <span className="text-xs font-normal text-muted-foreground font-mono">
                    / Standby
                  </span>
                </div>
              </div>

              <div className="bg-slate-950/40 p-4 rounded-xl border border-border/40">
                <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  Lead Dispatcher
                </div>
                <div className="text-xl font-bold mt-1 text-foreground">
                  S. K. Temgire{" "}
                  <span className="text-xs text-primary font-mono font-normal block mt-0.5">
                    Proprietor &amp; Lead
                  </span>
                </div>
              </div>

              <div className="bg-slate-950/40 p-4 rounded-xl border border-border/40">
                <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  Average Arrival SLA
                </div>
                <div className="text-xl font-bold mt-1 text-gradient">
                  42.8 min{" "}
                  <span className="text-xs text-muted-foreground font-mono font-normal">
                    Global
                  </span>
                </div>
              </div>

              <div className="bg-slate-950/40 p-4 rounded-xl border border-border/40">
                <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  Workmanship SLA
                </div>
                <div className="text-xl font-bold mt-1 text-foreground">
                  100% Genuine{" "}
                  <span className="text-xs text-primary font-mono font-normal block mt-0.5">
                    OEM parts warranty
                  </span>
                </div>
              </div>
            </div>

            {/* Simulated Live Dispatch Terminal Logs */}
            <div className="bg-slate-950/80 rounded-2xl border border-primary/10 p-5 font-mono text-[11px] text-sky-400 space-y-2.5">
              <div className="flex items-center justify-between text-foreground font-semibold border-b border-border/60 pb-2">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <span>Real-time Dispatch Log</span>
                </div>
                <span className="text-[9px] text-muted-foreground font-mono">TELEMETRY_ON</span>
              </div>
              <div className="space-y-1.5 text-muted-foreground font-mono leading-relaxed max-h-[120px] overflow-y-auto">
                <div>
                  [10:14:02] <span className="text-primary font-semibold">SYS_DISPATCH:</span>{" "}
                  Connection active on Wagholi corridor.
                </div>
                <div>
                  [10:16:45] <span className="text-purple-400 font-semibold">UNIT_01:</span>{" "}
                  Compressor diagnostic active at Wagholi.
                </div>
                <div>
                  [10:19:12] <span className="text-emerald-400 font-semibold">UNIT_02:</span>{" "}
                  Routine preventative AMC check complete at Karegaon.
                </div>
                <div>
                  [10:20:00] <span className="text-sky-400 font-semibold">UNIT_03:</span> Standby
                  monitoring active on Shikrapur bypass route.
                </div>
                <div>
                  [10:22:15] <span className="text-amber-400 font-semibold">SYS_DISPATCH:</span>{" "}
                  Global GPS mapping coordinates handshake complete.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact({ cms }: { cms: any }) {
  const socials = cms?.socials || {};
  const phone = socials.phone || "+917507408461";
  const email = socials.email || "support@primecool.in";

  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div
          className="relative overflow-hidden rounded-3xl border border-border p-10 md:p-14"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div className="grid md:grid-cols-2 gap-10 items-center relative">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight">
                Need service <span className="text-gradient">today?</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                Get in touch directly. Domestic, commercial, or industrial — we'll dispatch the
                right technician along the Wagholi–Shirur route.
              </p>
              <div className="mt-8 space-y-3">
                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-3 rounded-2xl surface-card p-4 hover:border-primary/40 transition"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-xs text-muted-foreground">Call Support</div>
                    <div className="font-display font-semibold">{phone}</div>
                  </div>
                </a>

                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-3 rounded-2xl surface-card p-4 hover:border-primary/40 transition"
                  >
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                      <Mail className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-xs text-muted-foreground">Email Support</div>
                      <div className="font-display font-semibold">{email}</div>
                    </div>
                  </a>
                )}
              </div>
            </div>

            <div className="surface-card rounded-2xl p-6">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                Proprietor
              </div>
              <div className="font-display text-2xl font-bold mt-1">Saurav Kailas Temgire</div>

              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <Info icon={MapPin} label="Region" value="Pune, Maharashtra" />
                <Info icon={Clock} label="Hours" value="Rapid 24/7" />
                <Info icon={Factory} label="Hubs" value="Karegaon · Ranjangaon" />
                <Info icon={Wrench} label="Specialty" value="HVAC · Industrial" />
              </div>

              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground px-5 py-3 text-sm font-semibold hover:opacity-90 transition"
              >
                Request a Visit <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Info({ icon: Icon, label, value }: { icon: typeof Wrench; label: string; value: string }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <div className="mt-0.5 font-medium">{value}</div>
    </div>
  );
}

/* ------------------------------ Catalog ------------------------------ */

const catalogGroups = [
  {
    icon: WashingMachine,
    title: "Domestic Appliance Components",
    items: [
      "Rotary & reciprocating AC compressors",
      "Digital & capillary thermostats",
      "Washing machine motors & gearboxes",
      "PCB control boards & inverter modules",
      "Fan motors, blowers & evaporator coils",
    ],
    brands: ["Voltas", "LG", "Samsung", "Daikin", "Bosch", "Whirlpool", "IFB", "Hitachi"],
  },
  {
    icon: Factory,
    title: "Heavy Industrial Parts",
    items: [
      "Cooling tower fills, drift eliminators & nozzles",
      "Industrial-grade run & start capacitors",
      "Calibrated pressure & vacuum gauges",
      "Heavy-duty ball, gate & butterfly valves",
      "Commercial refrigerants — R-32, R-410A, R-134a, R-407C",
    ],
    brands: ["Danfoss", "Emerson", "Carrier", "Honeywell", "Bitzer", "Copeland", "Schneider"],
  },
];

const amcTiers = [
  {
    name: "Basic Home Care",
    audience: "Apartments & residences",
    price: "Starter",
    icon: Snowflake,
    points: [
      "2 scheduled AC / appliance visits per year",
      "Jet cleaning + gas pressure check",
      "Priority booking on the Wagholi–Shirur route",
      "10% off genuine spare parts",
    ],
  },
  {
    name: "Commercial Routine",
    audience: "Shops, clinics, offices",
    price: "Most chosen",
    icon: ShieldCheck,
    points: [
      "Quarterly preventative servicing",
      "Display chiller & deep-freezer temperature audit",
      "Sub-24h response window",
      "Logged diagnostics report after every visit",
    ],
    featured: true,
  },
  {
    name: "Industrial Zero-Downtime",
    audience: "MIDC plants & factories",
    price: "Enterprise",
    icon: Factory,
    points: [
      "Monthly on-site engineer rounds",
      "Cooling tower, valve & gauge calibration",
      "Emergency dispatch SLA — under 4 hours",
      "Spare capacitors & refrigerant pre-staged on site",
    ],
  },
];

function Catalog({ amcTiers }: { amcTiers?: any[] }) {
  const displayTiers =
    amcTiers && amcTiers.length > 0
      ? amcTiers.map((t) => ({
          ...t,
          icon: getDynamicIcon(t.icon),
        }))
      : [
          {
            name: "Basic Home Care",
            audience: "Apartments & residences",
            price: "Starter",
            icon: Snowflake,
            points: [
              "2 scheduled AC / appliance visits per year",
              "Jet cleaning + gas pressure check",
              "Priority booking on the Wagholi–Shirur route",
              "10% off genuine spare parts",
            ],
          },
          {
            name: "Commercial Routine",
            audience: "Shops, clinics, offices",
            price: "Most chosen",
            icon: ShieldCheck,
            points: [
              "Quarterly preventative servicing",
              "Display chiller & deep-freezer temperature audit",
              "Sub-24h response window",
              "Logged diagnostics report after every visit",
            ],
            featured: true,
          },
          {
            name: "Industrial Zero-Downtime",
            audience: "MIDC plants & factories",
            price: "Enterprise",
            icon: Factory,
            points: [
              "Monthly on-site engineer rounds",
              "Cooling tower, valve & gauge calibration",
              "Emergency dispatch SLA — under 4 hours",
              "Spare capacitors & refrigerant pre-staged on site",
            ],
          },
        ];

  return (
    <section id="catalog" className="py-24 border-t border-border">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          tag="Catalog & AMC Tiers"
          title="Parts we stock. Brands we trust. Contracts we honour."
          subtitle="A transparent view of the components our engineers carry and the maintenance plans built around them."
        />

        <div className="mt-12 grid lg:grid-cols-2 gap-6">
          {catalogGroups.map((g) => (
            <div key={g.title} className="surface-card rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-5">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary">
                  <g.icon className="h-5 w-5" />
                </span>
                <h3 className="font-display text-xl font-semibold">{g.title}</h3>
              </div>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                {g.items.map((i) => (
                  <li key={i} className="flex gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    {i}
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-5 border-t border-border">
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                  Brands serviced
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {g.brands.map((b) => (
                    <span
                      key={b}
                      className="rounded-md border border-border bg-background/40 px-2.5 py-1 text-xs"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <h3 className="font-display text-2xl md:text-3xl font-bold">
              Annual Maintenance Contracts
            </h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Three tiers, engineered for the scale you operate at — from a single split AC to a
              full MIDC production line.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {displayTiers.map((t: any) => (
              <div
                key={t.name}
                className={`surface-card rounded-2xl p-7 relative ${
                  t.featured ? "border-primary/50 glow-ring" : ""
                }`}
              >
                {t.featured && (
                  <span className="absolute -top-3 left-7 inline-flex items-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-2.5 py-1">
                    {t.price}
                  </span>
                )}
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-primary">
                    <t.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="font-display font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.audience}</div>
                  </div>
                </div>
                <ul className="space-y-2.5 text-sm">
                  {t.points.map((p: any) => (
                    <li key={p} className="flex gap-2.5 text-muted-foreground">
                      <ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background/40 px-4 py-2.5 text-sm font-semibold hover:bg-primary hover:text-primary-foreground hover:border-primary transition"
                >
                  Enquire <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Portfolio ------------------------------ */

const defaultProjects = [
  {
    location: "Wagholi · Commercial",
    title: "Emergency Deep Freezer Revival",
    image: projectFreezer,
    summary:
      "A retail grocer's 1,200L commercial deep freezer failed at 11:42 PM. Our on-call engineer arrived within 38 minutes, diagnosed a failed start capacitor and refrigerant leak, sealed the line, recharged R-404A and restored sub-zero hold before opening hours.",
    metrics: [
      { value: "38 min", label: "On-site response" },
      { value: "₹1.8L", label: "Stock loss prevented" },
      { value: "0", label: "Hours of trading lost" },
    ],
  },
  {
    location: "Karegaon MIDC · Industrial",
    title: "Cooling Tower Complete Overhaul",
    image: projectCoolingTower,
    summary:
      "Replaced degraded PVC fills, drift eliminators and corroded distribution nozzles on a 350 TR induced-draft cooling tower. Realigned the gearbox, balanced the fan blades and calibrated the make-up water valves — restoring designed approach temperature.",
    metrics: [
      { value: "+22%", label: "Thermal efficiency" },
      { value: "−18%", label: "Power draw" },
      { value: "3 days", label: "Total turnaround" },
    ],
  },
  {
    location: "Shikrapur · Corporate",
    title: "14-Unit AC Rollout + AMC",
    image: projectAcRollout,
    summary:
      "Designed and installed 14 inverter split ACs across two corporate floors with custom copper runs and concealed drain lines. Onboarded the client to our Commercial Routine AMC with quarterly servicing and a logged diagnostics dashboard.",
    metrics: [
      { value: "14", label: "Units commissioned" },
      { value: "4 yr", label: "AMC contracted" },
      { value: "100%", label: "Genuine OEM parts" },
    ],
  },
];

const getProjectImage = (p: any, index: number) => {
  if (p.image) return p.image;
  if (
    p.title?.toLowerCase().includes("freezer") ||
    p.title?.toLowerCase().includes("refrigeration")
  ) {
    return projectFreezer;
  }
  if (p.title?.toLowerCase().includes("tower") || p.title?.toLowerCase().includes("chiller")) {
    return projectCoolingTower;
  }
  if (p.title?.toLowerCase().includes("ac") || p.title?.toLowerCase().includes("split")) {
    return projectAcRollout;
  }
  const fallbacks = [projectFreezer, projectCoolingTower, projectAcRollout];
  return fallbacks[index % 3];
};

function Portfolio({ projects }: { projects: any[] }) {
  const displayProjects = projects && projects.length > 0 ? projects.slice(0, 3) : defaultProjects;
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  return (
    <section id="portfolio" className="py-24 relative">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          tag="Project Portfolio"
          title="Field-tested. Metrics, not marketing."
          subtitle="Selected case studies from along the Wagholi–Shirur corridor and MIDC manufacturing hubs."
        />
        <div className="mt-12 grid lg:grid-cols-3 gap-6">
          {displayProjects.map((p, idx) => {
            const img = getProjectImage(p, idx);
            // Re-map index image to project object for the modal
            const projectWithImg = { ...p, image: img };
            return (
              <article
                key={p.title}
                onClick={() => setSelectedProject(projectWithImg)}
                className="surface-card rounded-2xl overflow-hidden hover:border-primary/40 transition flex flex-col group cursor-pointer hover:scale-[1.01] duration-300"
              >
                <div className="aspect-video relative overflow-hidden bg-muted">
                  <img
                    src={img}
                    alt={p.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-4 left-4 inline-flex items-center rounded-full bg-primary/20 border border-primary/30 backdrop-blur-md px-2.5 py-0.5 text-[10px] text-primary font-semibold font-mono uppercase">
                    {p.location.split("·")[1]?.trim() || "PROJECT"}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block">
                      {p.location.split("·")[0]?.trim()}
                    </span>
                    <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition">
                      {p.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                      {p.summary}
                    </p>
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-2 pt-4 border-t border-border/40 text-center">
                    {p.metrics?.map((m: any) => (
                      <div key={m.label}>
                        <div className="font-display text-sm font-bold text-gradient">
                          {m.value}
                        </div>
                        <div
                          className="text-[9px] uppercase tracking-wider text-muted-foreground mt-0.5 truncate"
                          title={m.label}
                        >
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <div className="mt-12 flex justify-center">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3 text-sm font-semibold hover:bg-card transition"
          >
            <span>View All Projects</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Case Study Detail Modal Overlay */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-border/80 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 space-y-6 relative shadow-2xl animate-in fade-in zoom-in duration-200 text-left">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-white p-1 rounded-full border border-border bg-slate-950/40 transition h-8 w-8 flex items-center justify-center text-lg font-bold"
              aria-label="Close dialog"
            >
              ×
            </button>

            {selectedProject.image && (
              <div className="aspect-video w-full rounded-xl overflow-hidden border border-border/40 bg-slate-950">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/20 border border-primary/30 px-3 py-1 text-xs text-primary font-semibold font-mono uppercase">
                <MapPin className="h-3.5 w-3.5" />
                <span>{selectedProject.location}</span>
              </span>
              {selectedProject.category && (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-800 border border-border px-3 py-1 text-xs text-muted-foreground font-semibold font-mono uppercase">
                  <span>{selectedProject.category}</span>
                </span>
              )}
            </div>

            <h3 className="font-display text-xl md:text-2xl font-bold text-white leading-tight">
              {selectedProject.title}
            </h3>

            <div className="space-y-4">
              <p className="text-xs md:text-sm text-foreground leading-relaxed font-semibold">
                {selectedProject.summary}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {selectedProject.description ||
                  "This project represents one of our custom field operations along the Pune industrial corridors. Prime Cool handles full diagnostics, sourcing of original components, and certification. Contact us for custom mechanical setups."}
              </p>
            </div>

            {selectedProject.metrics && selectedProject.metrics.length > 0 && (
              <div className="pt-4 border-t border-border/40">
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block mb-3">
                  Key Performance Metrics
                </span>
                <div className="grid grid-cols-3 gap-4 text-center">
                  {selectedProject.metrics.map((m: any) => (
                    <div
                      key={m.label}
                      className="bg-slate-950/40 p-3 rounded-xl border border-border/20"
                    >
                      <div className="font-display text-sm md:text-base font-bold text-gradient">
                        {m.value}
                      </div>
                      <div
                        className="text-[8px] md:text-[9px] uppercase tracking-wider text-muted-foreground mt-0.5 truncate"
                        title={m.label}
                      >
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-border/40 flex justify-end gap-3">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2.5 text-xs font-semibold rounded-full border border-border hover:bg-slate-800 transition"
              >
                Close Details
              </button>
              <Link
                to="/booking"
                search={{}}
                onClick={() => setSelectedProject(null)}
                className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-xs font-semibold hover:opacity-90 transition glow-ring cursor-pointer"
              >
                <Calendar className="h-4 w-4" />
                <span>Inquire About This Service</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ------------------------------ Testimonials ------------------------------ */

const testimonials = [
  {
    quote:
      "Our 350 TR chiller compressor failed mid-shift at the Ranjangaon manufacturing plant. Saurav and the Prime Cool engineering team were on site in under 45 minutes with replacement capacitors and diagnostic gear. Restored full production cooling before morning shift.",
    name: "Mahesh Patil",
    role: "Plant Manager, Auto-Component Assembly · Ranjangaon MIDC",
    rating: 5,
    badge: "Verified Factory AMC",
    date: "14 Feb 2026",
  },
  {
    quote:
      "Saurav's team installed three 2.0-Ton inverter split ACs in our Wagholi duplex with custom concealed copper piping and zero mess. Cleanest technical installation I've seen in Pune.",
    name: "Aarti Deshpande",
    role: "Homeowner · Green City, Wagholi",
    rating: 5,
    badge: "Verified Google Review",
    date: "02 Feb 2026",
  },
  {
    quote:
      "The cooling tower overhaul came in exactly on budget and a day ahead of schedule. Approach temperature dropped back to 2.8°C spec, saving us nearly 18% on monthly power draw.",
    name: "Sandeep Kulkarni",
    role: "Maintenance Head, Industrial Plastics · Karegaon MIDC",
    rating: 5,
    badge: "Verified Industrial Client",
    date: "28 Jan 2026",
  },
  {
    quote:
      "We signed the Commercial Routine AMC for our diagnostic clinic's VRF system. Quarterly visits are strictly logged, technicians arrive on time, and our MRI cooling loop hasn't tripped once.",
    name: "Dr. Neha Joshi",
    role: "Director, LifeCare Diagnostic Center · Shikrapur",
    rating: 5,
    badge: "Verified Commercial Client",
    date: "19 Jan 2026",
  },
  {
    quote:
      "Our cold room storage held over ₹12 Lakhs of frozen pharma inventory when the evaporator fan motor burned out at 11:30 PM. Prime Cool Code Red emergency service replaced the motor and restored sub-zero hold in under 2 hours!",
    name: "Rajesh Shinde",
    role: "Logistics Manager, Pharma Cold Chain · Chakan MIDC",
    rating: 5,
    badge: "Code Red Emergency Client",
    date: "10 Jan 2026",
  },
  {
    quote:
      "Prompt AC gas charging with genuine R-32 refrigerant for our office floor in Kharadi. They performed nitrogen pressure leak testing before refilling. Transparent pricing and high integrity.",
    name: "Pooja Malhotra",
    role: "Operations Lead, IT Solutions · Kharadi EON Park",
    rating: 5,
    badge: "Verified Google Review",
    date: "04 Jan 2026",
  },
];

const trustSignals = [
  { icon: ShieldCheck, label: "100% Genuine OEM Parts" },
  { icon: Gauge, label: "Verified Diagnostics Reports" },
  { icon: Zap, label: "Certified Electrical Safety" },
  { icon: Clock, label: "Logged Service Timelines" },
];

function Testimonials() {
  return (
    <section className="py-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,102,255,0.05),transparent_50%)] pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader
          tag="Verified Client Reviews"
          title="What homeowners & plant managers say."
          subtitle="Real reviews from verified domestic, commercial, and industrial clients across Pune & MIDC industrial belts."
        />

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              className="surface-card rounded-3xl p-7 relative overflow-hidden border border-white/10 hover:border-[#00c8ff]/40 hover:shadow-[0_0_30px_rgba(0,200,255,0.15)] transition-all duration-300 flex flex-col justify-between"
            >
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{
                  background:
                    i % 2 === 0
                      ? "linear-gradient(90deg, #00c8ff, #0066ff)"
                      : "linear-gradient(90deg, #0066ff, #8b5cf6)",
                }}
              />

              <div>
                {/* Header: Rating & Verified Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(t.rating)].map((_, idx) => (
                      <Star key={idx} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#00c8ff]/10 border border-[#00c8ff]/30 text-[#00c8ff]">
                    {t.badge}
                  </span>
                </div>

                <blockquote className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                  “{t.quote}”
                </blockquote>
              </div>

              <figcaption className="mt-6 pt-4 border-t border-white/8 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white text-sm">{t.name}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{t.role}</div>
                </div>
                <div className="text-[10px] text-slate-500 font-mono">{t.date}</div>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Trust signals */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {trustSignals.map((s) => (
            <div
              key={s.label}
              className="surface-card rounded-xl p-4 flex items-center gap-3 border border-border/50"
            >
              <div className="h-9 w-9 rounded-lg flex items-center justify-center shrink-0 bg-primary/10 border border-primary/20">
                <s.icon className="h-4.5 w-4.5 text-primary" />
              </div>
              <span className="text-sm font-semibold text-white">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ About ------------------------------ */

function About() {
  return (
    <section
      id="about"
      className="py-24"
      style={{ background: "linear-gradient(180deg, #09090f 0%, #0c0c14 100%)" }}
    >
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-5 gap-12 items-center">
        <div className="lg:col-span-3">
          <SectionHeader
            tag="About Prime Cool"
            title="Founded on mechanical precision. Run by engineers who answer the phone."
            subtitle="Prime Cool was built to close the gap between fly-by-night appliance repair and slow corporate service contracts."
          />
          <div className="mt-8 space-y-4 text-slate-400 leading-relaxed">
            <p>
              Led by proprietor{" "}
              <span className="text-white font-semibold">Saurav Kailas Temgire</span>, the team
              operates a dedicated rapid-response route through Wagholi, Lonikand, Shikrapur and
              Shirur, with embedded engineers serving the Karegaon and Ranjangaon manufacturing
              zones.
            </p>
            <p>
              From a single split AC in a Wagholi flat to a 350 TR cooling tower inside an MIDC
              plant, every job is approached the same way — verified diagnostics, genuine parts,
              logged outcomes. No improvisation. No shortcuts.
            </p>
          </div>
        </div>

        <div
          className="lg:col-span-2 rounded-3xl p-8 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #111118, #161622)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          }}
        >
          {/* Gradient corner */}
          <div
            className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-30 pointer-events-none"
            style={{ background: "radial-gradient(circle, #00c8ff, transparent 70%)" }}
          />
          <div className="flex items-center gap-4">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl font-display font-bold text-lg text-white"
              style={{
                background: "linear-gradient(135deg, #00c8ff, #0066ff)",
                boxShadow: "0 4px 15px rgba(0,200,255,0.4)",
              }}
            >
              SKT
            </div>
            <div>
              <div className="font-display text-lg font-bold text-white">Saurav Kailas Temgire</div>
              <div className="text-xs text-slate-400">Proprietor & Lead Engineer</div>
            </div>
          </div>
          <div className="mt-6 space-y-3 text-sm">
            {[
              "Hands-on experience across HVAC, refrigeration & heavy mechanical systems",
              "Direct accountability — calls answered by the proprietor, not a call centre",
              "Field team trained on OEM service protocols",
            ].map((p) => (
              <div key={p} className="flex gap-3 text-slate-400">
                <div
                  className="h-5 w-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{
                    background: "rgba(0,200,255,0.15)",
                    border: "1px solid rgba(0,200,255,0.3)",
                  }}
                >
                  <ShieldCheck className="h-3 w-3 text-[#00c8ff]" />
                </div>
                <span>{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ FAQ ------------------------------ */

function Faq({ faqs }: { faqs: any[] }) {
  return (
    <section className="py-24 bg-card/10 border-t border-border">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeader
          tag="FAQ"
          title="Frequently asked questions."
          subtitle="Straight answers about response times, AMCs, coverage and warranties."
        />
        <div className="mt-12 space-y-3">
          {faqs.map((f) => (
            <details
              key={f.id || f.q}
              className="group rounded-2xl overflow-hidden surface-card border border-border/60"
            >
              <summary className="flex items-center justify-between cursor-pointer list-none font-display font-semibold p-5 text-foreground hover:text-primary transition-colors">
                <span className="pr-4">{f.q}</span>
                <span className="ml-4 inline-flex h-8 w-8 items-center justify-center rounded-full shrink-0 group-open:rotate-45 transition-transform bg-primary/10 border border-primary/20 text-primary">
                  +
                </span>
              </summary>
              <p className="px-5 pb-5 text-sm text-slate-400 leading-relaxed border-t border-border/40">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogsPreview({ blogs }: { blogs: any[] }) {
  const displayBlogs = blogs ? blogs.slice(0, 3) : [];
  if (displayBlogs.length === 0) return null;

  return (
    <section
      id="blogs-preview"
      className="py-24 border-t border-border bg-slate-950/10 relative overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <SectionHeader
            tag="Resource & Industry Knowledge"
            title="Read our latest engineering articles & maintenance logs."
            subtitle="Straight from our technicians along the Wagholi–Shirur route and MIDC zones."
          />
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3 text-sm font-semibold hover:bg-card transition"
          >
            <span>View All Articles</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {displayBlogs.map((blog) => (
            <Link
              key={blog.id}
              to="/blogs/$slug"
              params={{ slug: blog.slug }}
              className="group surface-card rounded-2xl overflow-hidden hover:border-primary/40 transition flex flex-col h-full bg-background/25"
            >
              {blog.image && (
                <div className="aspect-video relative overflow-hidden bg-muted">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent pointer-events-none" />
                </div>
              )}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold text-primary font-mono">
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <h3 className="font-display text-base font-bold text-foreground group-hover:text-primary transition line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                    {blog.summary}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-border/40 flex items-center text-xs text-primary font-semibold group-hover:underline">
                  Read Article &rarr;
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ SERVICE PROCESS ------------------------------ */

function ServiceProcess() {
  const steps = [
    {
      id: "01",
      title: "Request Lodged",
      desc: "Register your AC or cold room service online or dial our helpline to start ticket.",
    },
    {
      id: "02",
      title: "Tech Dispatched",
      desc: "A fully equipped technician travels to your location, tracked in real-time.",
    },
    {
      id: "03",
      title: "Precision Diagnostics",
      desc: "Manifold pressure checks, line thermistor analysis, electrical load mapping.",
    },
    {
      id: "04",
      title: "Digital Sign-off",
      desc: "Work completion verified, signed on the tech portal, and receipt downloaded.",
    },
  ];

  return (
    <section id="service-process" className="py-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,102,255,0.05),transparent_50%)] pointer-events-none" />
      <div className="mx-auto max-w-7xl px-6 relative">
        <SectionHeader
          tag="Work Ethic"
          title="Our Structured Service Process"
          subtitle="Precision mechanical diagnostics backed by logged outcomes, with no shortcuts."
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line */}
          <div
            className="absolute top-[28px] left-[60px] right-[60px] h-[2px] hidden lg:block"
            style={{ background: "linear-gradient(90deg, #00c8ff40, #0066ff40, #00c8ff40)" }}
          />

          {steps.map((st, i) => (
            <div
              key={st.id}
              className="surface-card relative rounded-2xl p-6 flex flex-col justify-between h-full group transition-all duration-300 hover:-translate-y-2 border border-border/50"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex justify-between items-center mb-5">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl font-mono font-bold text-sm text-white relative z-10"
                  style={{
                    background: "linear-gradient(135deg, #00c8ff, #0066ff)",
                    boxShadow: "0 4px 12px rgba(0,200,255,0.4)",
                  }}
                >
                  {st.id}
                </div>
                <span className="text-[10px] text-slate-400 uppercase font-mono tracking-widest">
                  Step {st.id}
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="font-display font-bold text-white group-hover:text-primary transition">
                  {st.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">{st.desc}</p>
              </div>
              {/* Bottom accent */}
              <div
                className="mt-5 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full"
                style={{ background: "linear-gradient(90deg, #00c8ff, #0066ff)" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ CERTIFICATIONS ------------------------------ */

function Certifications() {
  const certs = [
    {
      title: "ITI Certified HVAC/R Engineers",
      desc: "Our technicians hold professional certifications in Industrial Refrigeration and Air Conditioning systems.",
    },
    {
      title: "MSME Registered Mechanical Firm",
      desc: "Prime Cool is a registered Micro-enterprise, ensuring compliant tax invoices and commercial contracts.",
    },
    {
      title: "Eco Safe Gas Recovery Compliant",
      desc: "We follow local environmental guidelines, capturing ozone-depleting HCFCs rather than venting.",
    },
    {
      title: "Zero-Downtime Industrial SLA",
      desc: "Specially audited to execute factory support logs under stringent industrial timelines.",
    },
  ];

  const gradients = [
    "linear-gradient(135deg, #00c8ff, #0066ff)",
    "linear-gradient(135deg, #0066ff, #8b5cf6)",
    "linear-gradient(135deg, #8b5cf6, #00c8ff)",
    "linear-gradient(135deg, #00c8ff, #0066ff)",
  ];

  return (
    <section
      id="certifications"
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0c0c14 0%, #09090f 100%)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(0,200,255,0.06) 0%, transparent 70%)",
        }}
      />
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          tag="Trust & Standards"
          title="Our Professional Certifications"
          subtitle="Certified mechanical expertise to keep commercial factories and residential coolers running safely."
        />

        <div className="mt-14 grid sm:grid-cols-2 gap-6">
          {certs.map((c, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl flex gap-5 items-start group transition-all duration-300 hover:-translate-y-1"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              }}
            >
              <div
                className="h-11 w-11 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: gradients[idx], boxShadow: "0 4px 15px rgba(0,200,255,0.3)" }}
              >
                <Award className="h-5 w-5 text-white" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display font-bold text-white">{c.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
