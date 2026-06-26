import { Link, useRouterState } from "@tanstack/react-router";
import logo from "../../assets/logo.png";
import {
  Calculator,
  BookOpen,
  Thermometer,
  FileText,
  Search,
  Phone,
  Clock,
  ArrowLeft,
  ChevronRight,
  Brain,
  HelpCircle,
  MapPin,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCmsSettings } from "../../lib/api";
import { Facebook, Instagram, Linkedin, Youtube, Twitter } from "lucide-react";

export function ResourceLayout({
  title,
  category,
  children,
}: {
  title: string;
  category: string;
  children: React.ReactNode;
}) {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data } = useQuery({
    queryKey: ["cmsSettings"],
    queryFn: () => getCmsSettings(),
  });
  const cms = data?.settings;
  const socials = cms?.socials || {};
  const phone = socials.phone || "+917507408461";

  const categories = [
    {
      name: "Calculators",
      icon: Calculator,
      items: [
        { name: "BTU Load", path: "/tools/btu-calculator" },
        { name: "AC Tonnage", path: "/tools/tonnage-calculator" },
        { name: "Refrigerant PT", path: "/tools/pt-calculator" },
        { name: "Superheat", path: "/tools/superheat-calculator" },
        { name: "Subcooling", path: "/tools/subcooling-calculator" },
        { name: "Airflow (CFM)", path: "/tools/cfm-calculator" },
        { name: "Duct Size", path: "/tools/duct-calculator" },
        { name: "Pipe Sizing", path: "/tools/pipe-sizing" },
        { name: "Cooling Load", path: "/tools/cooling-load" },
        { name: "Energy Consumption", path: "/tools/energy-calculator" },
        { name: "Vacuum Converter", path: "/tools/vacuum-convert" },
        { name: "Psychrometric", path: "/tools/psychrometric" },
        { name: "COP & EER", path: "/tools/cop-eer" },
        { name: "Compressor Capacity", path: "/tools/compressor-capacity" },
        { name: "Refrigerant Charge", path: "/tools/charge-calculator" },
        { name: "Temp Converter", path: "/tools/temp-convert" },
        { name: "Pressure-Temp Converter", path: "/tools/pressure-temp" },
      ],
    },
    {
      name: "Troubleshooting",
      icon: BookOpen,
      items: [
        { name: "AC Not Cooling", path: "/guides/ac-not-cooling" },
        { name: "Low Suction Pressure", path: "/guides/low-suction" },
        { name: "High Head Pressure", path: "/guides/high-head" },
        { name: "Compressor Short Cycling", path: "/guides/short-cycling" },
        { name: "Evaporator Freezing", path: "/guides/coil-freezing" },
        { name: "Walk-In Cooler Warm", path: "/guides/walk-in-warm" },
        { name: "Refrigerant Leak", path: "/guides/leak-symptoms" },
        { name: "Check Superheat", path: "/guides/how-to-superheat" },
        { name: "Measure Subcooling", path: "/guides/how-to-subcooling" },
      ],
    },
    {
      name: "Refrigerants",
      icon: Thermometer,
      items: [
        { name: "R134a PT Sheet", path: "/refrigerants/r134a" },
        { name: "R410A PT Sheet", path: "/refrigerants/r410a" },
        { name: "R32 PT Sheet", path: "/refrigerants/r32" },
        { name: "R404A PT Sheet", path: "/refrigerants/r404a" },
        { name: "R407C PT Sheet", path: "/refrigerants/r407c" },
      ],
    },
    {
      name: "Formulas & Reference",
      icon: FileText,
      items: [
        { name: "HVAC Formulas", path: "/formulas/hvac" },
        { name: "Refrigeration Formulas", path: "/formulas/refrigeration" },
      ],
    },
    {
      name: "Interactive Tools",
      icon: Brain,
      items: [
        { name: "HVAC/R Quiz", path: "/interactive/quiz" },
        { name: "Troubleshooting Wizard", path: "/interactive/wizard" },
        { name: "Refrigerant Selector", path: "/interactive/selector" },
        { name: "Cost Estimator", path: "/interactive/cost-estimator" },
        { name: "PM Checklist Gen", path: "/interactive/checklist" },
        { name: "HVAC ROI Calculator", path: "/interactive/roi" },
      ],
    },
    {
      name: "Local Service Hubs",
      icon: MapPin,
      items: [
        { name: "Pune Services", path: "/cities/pune" },
        { name: "Mumbai Services", path: "/cities/mumbai" },
        { name: "Nashik Services", path: "/cities/nashik" },
      ],
    },
  ];

  const handleScrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    handleScrollToTop();
  }, [pathname]);

  return (
    <div className="min-h-screen text-foreground flex flex-col justify-between">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={logo} alt="Prime Cool logo" className="h-9 w-9" />
            <span className="font-display font-bold text-lg tracking-tight">
              Prime <span className="text-gradient">Cool</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-2 rounded-full border border-border p-2 sm:px-3 sm:py-1.5 text-xs font-medium hover:bg-card transition"
              title="Call Support"
            >
              <Phone className="h-4 w-4 text-primary" />
              <span className="hidden sm:inline">{phone}</span>
            </a>
            <Link
              to="/resources"
              className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium hover:text-primary transition"
            >
              <HelpCircle className="h-4 w-4" />
              <span>Resources Home</span>
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium hover:text-primary transition"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg border border-border hover:bg-card/40 text-muted-foreground"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 pt-24 pb-16 px-6">
        <div className="mx-auto max-w-7xl grid md:grid-cols-12 gap-8 items-start">
          {/* Sidebar Left Navigation - Hidden on mobile, sticky on desktop */}
          <aside
            className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-border bg-card/85 backdrop-blur-xl p-6 flex flex-col justify-between transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-auto md:w-auto md:border-r-0 md:bg-transparent md:p-0 md:col-span-3 ${
              mobileMenuOpen ? "translate-x-0 top-16" : "max-md:-translate-x-full"
            }`}
          >
            <div className="space-y-6 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 custom-scrollbar">
              <Link
                to="/resources"
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold transition ${
                  pathname === "/resources"
                    ? "border border-primary/30 bg-primary/10 text-primary"
                    : "border border-transparent text-muted-foreground hover:text-foreground hover:bg-card/40"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <HelpCircle className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>

              <Link
                to="/glossary"
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold transition ${
                  pathname === "/glossary"
                    ? "border border-primary/30 bg-primary/10 text-primary"
                    : "border border-transparent text-muted-foreground hover:text-foreground hover:bg-card/40"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <BookOpen className="h-4 w-4" />
                <span>Glossary (A-Z)</span>
              </Link>

              {categories.map((cat) => (
                <div key={cat.name} className="space-y-1.5">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold px-3 mb-1">
                    <cat.icon className="h-3.5 w-3.5 text-primary" />
                    <span>{cat.name}</span>
                  </div>
                  <div className="space-y-0.5">
                    {cat.items.map((item) => {
                      const isActive = pathname === item.path;
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition ${
                            isActive
                              ? "bg-primary/10 text-primary font-semibold border-l-2 border-primary"
                              : "text-muted-foreground hover:text-foreground hover:bg-card/20"
                          }`}
                        >
                          <span>{item.name}</span>
                          <ChevronRight className="h-3 w-3 opacity-40 shrink-0" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* Main Layout Area */}
          <main className="md:col-span-9 space-y-6">
            {/* Breadcrumb Header */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
              <Link to="/resources" className="hover:text-foreground transition">Resources</Link>
              <ChevronRight className="h-3.5 w-3.5 opacity-60" />
              <span className="text-primary font-semibold">{category}</span>
              <ChevronRight className="h-3.5 w-3.5 opacity-60" />
              <span className="text-foreground max-w-[200px] truncate">{title}</span>
            </div>

            {/* Inner Content Area */}
            <div className="surface-card rounded-3xl border border-border p-6 md:p-8 relative overflow-hidden">
              {/* Futuristic grid overlay background */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,color-mix(in_oklab,var(--primary)_8%,transparent),transparent_40%)] pointer-events-none" />
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground bg-card/20 z-10 space-y-4">
        <div className="flex justify-center gap-4 text-muted-foreground">
          {socials.facebook && (
            <a href={socials.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">
              <Facebook className="h-4.5 w-4.5" />
            </a>
          )}
          {socials.instagram && (
            <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">
              <Instagram className="h-4.5 w-4.5" />
            </a>
          )}
          {socials.linkedin && (
            <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">
              <Linkedin className="h-4.5 w-4.5" />
            </a>
          )}
          {socials.youtube && (
            <a href={socials.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">
              <Youtube className="h-4.5 w-4.5" />
            </a>
          )}
          {socials.twitter && (
            <a href={socials.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">
              <Twitter className="h-4.5 w-4.5" />
            </a>
          )}
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Prime Cool logo" className="h-5 w-5" />
            <span>© {new Date().getFullYear()} Prime Cool — Mechanical climate Solutions</span>
          </div>
          {socials.email && (
            <a href={`mailto:${socials.email}`} className="hover:text-primary transition underline">
              {socials.email}
            </a>
          )}
          <div className="text-[10px] text-muted-foreground/60">Wagholi · Lonikand · Koregaon Bhima · Shikrapur · Karegaon · Ranjangaon · Shirur</div>
        </div>
      </footer>
    </div>
  );
}
