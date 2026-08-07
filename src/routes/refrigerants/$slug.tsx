import { createFileRoute, Link } from "@tanstack/react-router";
import { refrigerantsData } from "../../lib/refrigerants-data";
import logo from "../../assets/logo.webp";
import { getCmsSettings } from "../../lib/api";
import {
  ArrowLeft,
  Phone,
  Calendar,
  Thermometer,
  Zap,
  Flame,
  Scale,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/refrigerants/$slug")({
  loader: async ({ params }) => {
    let refrigerant = refrigerantsData[params.slug.toLowerCase()];
    if (!refrigerant) {
      const formattedRefrigerant = params.slug.toUpperCase();
      refrigerant = {
        slug: params.slug.toLowerCase(),
        name: formattedRefrigerant,
        formula: "Custom Refrigerant",
        safetyClass: "A1",
        gwp: 2000,
        odp: 0,
        compatibleOil: "POE",
        applications: ["Air Conditioning", "Refrigeration"],
        charging: ["Charge by weight"],
        leakDetection: ["Electronic sniffer", "Soap bubbles"],
        recovery: ["Use certified recovery unit"],
        retrofit: "Consult OEM documentation",
        antoine: { A: 4.0, B: 900, C: 250 }
      };
    }
    const { settings } = await getCmsSettings();
    return { refrigerant, cms: settings };
  },
  head: ({ loaderData }) => {
    const ref = loaderData?.refrigerant;
    if (!ref) return { meta: [] };
    const pageTitle = `${ref.name} Pressure-Temperature Chart & Safety Reference`;
    const pageDesc = `${ref.name} thermodynamic properties, safety group ${ref.safetyClass}, compatible oil ${ref.compatibleOil}, GWP, and vacuum recovery procedures.`;
    return {
      meta: [
        { title: pageTitle },
        { name: "description", content: pageDesc },
        { property: "og:title", content: pageTitle },
        { property: "og:description", content: pageDesc },
        { property: "og:type", content: "website" },
      ],
      links: [{ rel: "canonical", href: `https://primecool.in/refrigerants/${ref.slug}` }],
    };
  },
  component: RefrigerantDetailsPage,
});

function RefrigerantDetailsPage() {
  const { refrigerant, cms } = Route.useLoaderData();
  const socials = cms?.socials || {};
  const phone = socials.phone || "+917507408461";

  // State for interactive PT slider
  const [temp, setTemp] = useState(25); // default 25°C

  // Compute saturation pressure using Antoine equation: P (bar) = 10^(A - B / (T + C))
  const computePressure = (t: number) => {
    const { A, B, C } = refrigerant.antoine;
    const logP = A - B / (t + C);
    const pBar = Math.pow(10, logP);
    const pPsi = pBar * 14.5038;
    return {
      bar: pBar.toFixed(2),
      psi: pPsi.toFixed(1),
    };
  };

  const currentPressure = computePressure(temp);

  // Generate a small static lookup table for common temperatures
  const quickTemps = [-30, -15, 0, 15, 30, 45];

  return (
    <div className="min-h-screen text-foreground flex flex-col justify-between bg-slate-950">
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
        {/* Breadcrumb */}
        <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary transition">
            Home
          </Link>{" "}
          /{" "}
          <Link to="/resources" className="hover:text-primary transition">
            Resources
          </Link>{" "}
          / <span className="text-foreground font-semibold">{refrigerant.name} Reference</span>
        </div>

        {/* Hero Segment */}
        <div className="mb-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-xs font-semibold text-primary font-mono uppercase">
            <Thermometer className="h-3.5 w-3.5" />
            <span>Thermodynamic Gas Center</span>
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight text-white">
            {refrigerant.name} Datasheet
          </h1>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-3xl">
            View pressure-temperature formulas, safety classifications, environmental impact
            coefficients (GWP/ODP), oil compatibility, leak checking, and retrofit instructions.
          </p>
        </div>

        {/* Core Attributes Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="border border-border/60 bg-slate-900/20 p-5 rounded-2xl space-y-1">
            <span className="text-[10px] font-mono text-muted-foreground uppercase">Formula</span>
            <div className="font-display text-xl font-bold text-white">{refrigerant.formula}</div>
          </div>
          <div className="border border-border/60 bg-slate-900/20 p-5 rounded-2xl space-y-1">
            <span className="text-[10px] font-mono text-muted-foreground uppercase">
              Safety Class
            </span>
            <div
              className="font-display text-sm font-bold text-primary truncate"
              title={refrigerant.safetyClass}
            >
              {refrigerant.safetyClass}
            </div>
          </div>
          <div className="border border-border/60 bg-slate-900/20 p-5 rounded-2xl space-y-1">
            <span className="text-[10px] font-mono text-muted-foreground uppercase">
              Global Warming (GWP)
            </span>
            <div className="font-display text-xl font-bold text-gradient">{refrigerant.gwp}</div>
          </div>
          <div className="border border-border/60 bg-slate-900/20 p-5 rounded-2xl space-y-1">
            <span className="text-[10px] font-mono text-muted-foreground uppercase">
              Ozone Impact (ODP)
            </span>
            <div
              className={`font-display text-xl font-bold ${refrigerant.odp > 0 ? "text-amber-400" : "text-emerald-400"}`}
            >
              {refrigerant.odp}
            </div>
          </div>
        </div>

        {/* Interactive PT Calculator & lookup table */}
        <div className="grid lg:grid-cols-12 gap-8 items-start mb-12">
          {/* PT Calculator */}
          <div className="lg:col-span-6 border border-border/80 bg-slate-900/40 p-6 rounded-2xl space-y-6 shadow-xl backdrop-blur-md">
            <div>
              <h3 className="font-display font-bold text-lg text-white">
                Interactive Saturation pressure calculator
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Enter a custom system temperature to dynamically compute the refrigerant's
                bubble/dew pressure point using the Antoine equation model.
              </p>
            </div>

            {/* Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-muted-foreground">Saturated Temperature:</span>
                <span className="text-primary font-bold text-sm">{temp}°C</span>
              </div>
              <input
                type="range"
                min={-40}
                max={60}
                step={1}
                value={temp}
                onChange={(e) => setTemp(parseFloat(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
                <span>−40°C</span>
                <span>0°C</span>
                <span>20°C</span>
                <span>40°C</span>
                <span>60°C</span>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-2 gap-4 border-t border-border/40 pt-4">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-border/60 text-center">
                <span className="text-[10px] font-mono text-muted-foreground uppercase block">
                  Saturation Vapor Pressure
                </span>
                <div className="text-2xl font-display font-bold text-primary mt-1">
                  {currentPressure.bar} Bar
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/60 border border-border/60 text-center">
                <span className="text-[10px] font-mono text-muted-foreground uppercase block">
                  Saturation Vapor Pressure
                </span>
                <div className="text-2xl font-display font-bold text-gradient mt-1">
                  {currentPressure.psi} PSI
                </div>
              </div>
            </div>
          </div>

          {/* Quick lookup table */}
          <div className="lg:col-span-6 border border-border/80 bg-slate-900/40 p-6 rounded-2xl space-y-4 shadow-xl backdrop-blur-md">
            <h3 className="font-display font-bold text-lg text-white">
              Pressure-Temperature Reference Sheet
            </h3>
            <div className="border border-border/40 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs bg-slate-950/20">
                <thead>
                  <tr className="bg-slate-900 border-b border-border/60 text-muted-foreground font-mono uppercase">
                    <th className="p-3">Temperature (°C)</th>
                    <th className="p-3">Pressure (Bar)</th>
                    <th className="p-3">Pressure (PSI)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40 font-mono text-xs">
                  {quickTemps.map((t) => {
                    const press = computePressure(t);
                    return (
                      <tr key={t} className="hover:bg-slate-900/20 transition">
                        <td className="p-3 text-foreground">{t}°C</td>
                        <td className="p-3 text-primary">{press.bar} bar</td>
                        <td className="p-3 text-muted-foreground">{press.psi} psi</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Technical procedures */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Lubricants & Charging */}
          <div className="border border-border/60 bg-slate-900/20 p-6 rounded-2xl space-y-4">
            <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <span>Compatible Lubricants & Charging</span>
            </h3>
            <div className="space-y-1.5 text-xs">
              <span className="text-muted-foreground font-semibold uppercase font-mono block">
                Compatible Oils
              </span>
              <p className="text-foreground font-medium pb-2 border-b border-border/20">
                {refrigerant.compatibleOil}
              </p>
            </div>
            <div className="space-y-2 text-xs">
              <span className="text-muted-foreground font-semibold uppercase font-mono block">
                Charging Procedures
              </span>
              <ul className="space-y-2">
                {refrigerant.charging.map((step: string, idx: number) => (
                  <li key={idx} className="flex gap-2 text-muted-foreground">
                    <span className="text-primary font-mono">•</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Leak Detection & Recovery */}
          <div className="border border-border/60 bg-slate-900/20 p-6 rounded-2xl space-y-4">
            <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <span>Leak Checking & Eco Recovery</span>
            </h3>
            <div className="space-y-2 text-xs border-b border-border/20 pb-4">
              <span className="text-muted-foreground font-semibold uppercase font-mono block">
                Leak Detection Methods
              </span>
              <ul className="space-y-1.5">
                {refrigerant.leakDetection.map((l: string, idx: number) => (
                  <li key={idx} className="flex gap-2 text-muted-foreground">
                    <span className="text-primary font-mono">•</span>
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-2 text-xs">
              <span className="text-muted-foreground font-semibold uppercase font-mono block">
                Recovery & Recycling
              </span>
              <ul className="space-y-1.5">
                {refrigerant.recovery.map((r: string, idx: number) => (
                  <li key={idx} className="flex gap-2 text-muted-foreground">
                    <span className="text-primary font-mono">•</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Retrofitting advice */}
        <div className="mt-8 border border-primary/20 bg-primary/5 rounded-2xl p-6 flex gap-4 items-start text-xs text-muted-foreground">
          <ShieldCheck className="h-6 w-6 text-primary shrink-0" />
          <div className="space-y-1">
            <strong className="text-foreground block text-sm">
              Retrofitting & Gas Substitution Advice
            </strong>
            <p>{refrigerant.retrofit}</p>
          </div>
        </div>
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
