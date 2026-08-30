import { Link, useRouterState } from "@tanstack/react-router";
import {
  LOCATIONS,
  BRANDS,
  REFRIGERANTS,
  SERVICES,
  COMPARISONS,
  INDUSTRIAL_TOPICS,
  APPLIANCES,
} from "../../lib/sitemap-constants";
import logo from "../../assets/logo.webp";
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

  function formatName(slug: string) {
    return slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }

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
        { name: "Cooling Tower Approach", path: "/tools/cooling-tower-approach" },
        { name: "SEER to EER & COP", path: "/tools/seer-eer-cop" },
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
        { name: "Refrigerator Error Codes", path: "/guides/refrigerator-error-codes" },
        { name: "AC Gas Charging Guide", path: "/guides/ac-gas-charging" },
      ],
    },
    {
      name: "All Services",
      icon: BookOpen,
      items: SERVICES.map((s) => ({ name: formatName(s), path: `/services/${s}` })),
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
      name: "Locations & Hubs",
      icon: MapPin,
      items: LOCATIONS.map((l) => ({ name: formatName(l), path: `/locations/${l}` })),
    },
    {
      name: "Services by Location",
      icon: MapPin,
      items: SERVICES.flatMap((s) =>
        LOCATIONS.map((l) => ({
          name: `${formatName(s)} in ${formatName(l)}`,
          path: `/services/${s}/${l}`,
        })),
      ),
    },
    {
      name: "Brands Supported",
      icon: MapPin,
      items: BRANDS.map((b) => ({ name: formatName(b), path: `/brands/${b}` })),
    },
    {
      name: "Brand Appliances",
      icon: BookOpen,
      items: BRANDS.flatMap((b) =>
        APPLIANCES.map((a) => ({
          name: `${formatName(b)} ${a.toUpperCase()}`,
          path: `/brands/${b}/${a}`,
        })),
      ),
    },
    {
      name: "Brand Comparisons",
      icon: BookOpen,
      items: COMPARISONS.map((c) => ({ name: formatName(c), path: `/brands/compare/${c}` })),
    },
    {
      name: "Refrigerants Data",
      icon: Thermometer,
      items: REFRIGERANTS.map((r) => ({ name: r.toUpperCase(), path: `/refrigerants/${r}` })),
    },
    {
      name: "Industrial Solutions",
      icon: FileText,
      items: INDUSTRIAL_TOPICS.map((t) => ({ name: formatName(t), path: `/industrial/${t}` })),
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
    <div className="min-h-screen text-foreground flex flex-col justify-between relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,200,255,0.05),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 noise-overlay opacity-30 pointer-events-none" />

      {/* Main Container */}
      <div className="flex-1 pt-6 md:pt-8 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl 2xl:max-w-[1536px] grid md:grid-cols-12 gap-8 items-start">
          {/* Mobile Category Trigger */}
          <div className="md:hidden col-span-12 flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-[#00c8ff]" /> Technical Resources Directory
            </span>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="px-3 py-1.5 rounded-xl bg-[#00c8ff]/10 border border-[#00c8ff]/30 text-xs font-bold text-[#00c8ff] hover:bg-[#00c8ff]/20 transition flex items-center gap-1.5"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              <span>{mobileMenuOpen ? "Close Menu" : "Browse Categories"}</span>
            </button>
          </div>

          {/* Sidebar Left Navigation */}
          <aside
            className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-white/10 bg-[#09090f]/98 backdrop-blur-2xl p-6 flex flex-col justify-between transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-auto md:w-auto md:border-r-0 md:bg-transparent md:p-0 md:col-span-3 ${
              mobileMenuOpen ? "translate-x-0 top-16" : "max-md:-translate-x-full"
            }`}
          >
            <div className="space-y-6 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 custom-scrollbar">
              <Link
                to="/resources"
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold transition ${
                  pathname === "/resources"
                    ? "bg-white/10 text-[#00c8ff] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] border border-[#00c8ff]/20"
                    : "border border-transparent text-slate-400 hover:text-white hover:bg-white/5"
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
                    ? "bg-white/10 text-[#00c8ff] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] border border-[#00c8ff]/20"
                    : "border border-transparent text-slate-400 hover:text-white hover:bg-white/5"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <BookOpen className="h-4 w-4" />
                <span>Glossary (A-Z)</span>
              </Link>

              {categories.map((cat) => (
                <div key={cat.name} className="space-y-1.5">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-slate-500 font-bold px-3 mb-2">
                    <cat.icon className="h-3.5 w-3.5 text-[#0066ff]" />
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
                          className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs transition ${
                            isActive
                              ? "bg-gradient-to-r from-[#00c8ff]/10 to-transparent text-[#00c8ff] font-bold border-l-2 border-[#00c8ff]"
                              : "text-slate-400 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          <span>{item.name}</span>
                          <ChevronRight
                            className={`h-3 w-3 shrink-0 transition ${isActive ? "text-[#00c8ff] opacity-100 translate-x-1" : "opacity-0"}`}
                          />
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
              <Link to="/resources" className="hover:text-foreground transition">
                Resources
              </Link>
              <ChevronRight className="h-3.5 w-3.5 opacity-60" />
              <span className="text-primary font-semibold">{category}</span>
              <ChevronRight className="h-3.5 w-3.5 opacity-60" />
              <span className="text-foreground max-w-[200px] truncate">{title}</span>
            </div>

            {/* Inner Content Area */}
            <div
              className="rounded-3xl border border-white/10 p-6 md:p-8 relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
              }}
            >
              {/* Futuristic grid overlay background */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at top right, rgba(0,200,255,0.1) 0%, transparent 40%)",
                }}
              />
              <div className="relative z-10">{children}</div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
