import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Phone, Clock, Menu, X, AlertTriangle, Search, Zap, ChevronDown, Calculator, BookOpen, MapPin, Globe, Award, Settings, Thermometer, Wrench, Briefcase, FileText, ShieldAlert, Sparkles } from "lucide-react";
import logo from "../assets/logo.webp";
import { SiteSearch } from "./SiteSearch";

export function Header({ cms }: { cms?: any }) {
  const socials = cms?.socials || {};
  const phone = socials.phone || "+917507408461";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMobileAccordion, setOpenMobileAccordion] = useState<string | null>(null);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleMobileToggle = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsMobileMenuOpen((prev) => !prev);
  };

  const toggleMobileAccordion = (section: string) => {
    setOpenMobileAccordion(openMobileAccordion === section ? null : section);
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[#09090f]/95 backdrop-blur-2xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-2"
            : "bg-[#09090f]/80 backdrop-blur-xl border-b border-white/5 py-3"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* Logo Brand Badge */}
          <Link to="/" className="flex items-center gap-3 group relative z-50" onClick={closeMobileMenu}>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#00c8ff]/40 to-[#0066ff]/30 blur-sm group-hover:blur-md transition-all duration-300" />
              <img
                src={cms?.theme?.logo || logo}
                alt="Prime Cool logo"
                className="relative h-10 w-10 object-contain rounded-full border border-white/20 p-1 group-hover:scale-105 transition-transform duration-300"
                loading="eager"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg tracking-tight text-white group-hover:text-[#00c8ff] transition-colors leading-none">
                {cms?.theme?.siteName || "Prime Cool"}
              </span>
              <span className="text-[10px] font-semibold tracking-widest text-[#00c8ff] uppercase mt-0.5 opacity-90 flex items-center gap-1">
                <Sparkles className="h-2.5 w-2.5 text-[#00c8ff] animate-pulse" /> HVAC & Refrigeration
              </span>
            </div>
          </Link>

          {/* Desktop Navigation with Modern Icons */}
          <nav className="hidden xl:flex items-center gap-1.5 text-xs font-semibold">
            {/* Services Mega Menu */}
            <div className="relative group px-1">
              <Link
                to="/services"
                className="flex items-center gap-1.5 px-3 py-2 rounded-full text-slate-300 group-hover:text-white group-hover:bg-white/10 transition-all duration-200"
              >
                <Wrench className="h-3.5 w-3.5 text-[#00c8ff]" />
                Services <ChevronDown className="h-3.5 w-3.5 opacity-70 group-hover:rotate-180 transition-transform duration-300" />
              </Link>

              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none group-hover:pointer-events-auto z-50">
                <div className="w-[560px] bg-[#0a0a0f]/98 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl p-5 grid grid-cols-2 gap-6 relative overflow-hidden">
                  <div className="space-y-3">
                    <Link to="/services" search={{ cat: "residential" }} className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider border-b border-white/10 pb-2 hover:text-[#00c8ff] transition">
                      <Thermometer className="h-3.5 w-3.5 text-[#00c8ff]" /> 🏡 Residential Services &rarr;
                    </Link>
                    <ul className="space-y-2 text-xs">
                      <li><Link to="/services/split-ac-repair" className="text-slate-400 hover:text-white font-semibold text-[#00c8ff] transition">Split & Inverter AC Jet Servicing</Link></li>
                      <li><Link to="/services/window-ac-repair" className="text-slate-400 hover:text-white transition">Window AC Servicing & Chemical Wash</Link></li>
                      <li><Link to="/services/ac-gas-charging" className="text-slate-400 hover:text-white transition">AC Gas Charging & Leak Detection</Link></li>
                      <li><Link to="/services/fridge-repair" className="text-slate-400 hover:text-white transition">Domestic Refrigerator Maintenance</Link></li>
                      <li><Link to="/services/washing-machine" className="text-slate-400 hover:text-white transition">Washing Machine Drum & Motor Repair</Link></li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <Link to="/services" search={{ cat: "commercial" }} className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider border-b border-white/10 pb-2 hover:text-[#0066ff] transition">
                      <Settings className="h-3.5 w-3.5 text-[#0066ff]" /> 🏢 Commercial & Industrial &rarr;
                    </Link>
                    <ul className="space-y-2 text-xs">
                      <li><Link to="/services/cassette-ac-repair" className="text-slate-400 hover:text-white font-semibold text-[#0066ff] transition">Cassette & Ductable Central AC</Link></li>
                      <li><Link to="/services/vrf-systems" className="text-slate-400 hover:text-white font-semibold text-[#0066ff] transition">VRF / VRV Multi-Zone AMC</Link></li>
                      <li><Link to="/services/server-room-cooling" className="text-slate-400 hover:text-white transition">Server Room Precision Cooling</Link></li>
                      <li><Link to="/services/cold-rooms" className="text-slate-400 hover:text-white transition">Walk-in Cold Rooms & Blast Freezers</Link></li>
                      <li><Link to="/services/chillers" className="text-slate-400 hover:text-white transition">Process Water Chillers & Plant AMC</Link></li>
                      <li><Link to="/services" className="font-bold text-[#00c8ff] hover:underline transition mt-1 inline-block">Browse All Services Directory &rarr;</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Separate PCB Electronics Link */}
            <Link
              to="/services"
              search={{ cat: "pcb" }}
              className="px-3 py-2 rounded-full text-[#00c8ff] hover:text-white hover:bg-[#00c8ff]/15 transition-all duration-200 flex items-center gap-1.5 border border-[#00c8ff]/30 bg-[#00c8ff]/5 shadow-[0_0_10px_rgba(0,200,255,0.15)]"
            >
              <Zap className="h-3.5 w-3.5 text-[#00c8ff]" /> PCB Electronics
            </Link>

            {/* Locations Mega Menu */}
            <div className="relative group px-1">
              <Link
                to="/locations"
                className="flex items-center gap-1.5 px-3 py-2 rounded-full text-slate-300 group-hover:text-white group-hover:bg-white/10 transition-all duration-200"
              >
                <MapPin className="h-3.5 w-3.5 text-[#00c8ff]" />
                Locations <ChevronDown className="h-3.5 w-3.5 opacity-70 group-hover:rotate-180 transition-transform duration-300" />
              </Link>

              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none group-hover:pointer-events-auto z-50">
                <div className="w-[520px] bg-[#0a0a0f]/98 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl p-5 grid grid-cols-2 gap-5 relative overflow-hidden">
                  <div className="space-y-3">
                    <Link to="/locations" className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider border-b border-white/10 pb-2 hover:text-[#00c8ff] transition">
                      <MapPin className="h-3.5 w-3.5 text-[#00c8ff]" /> Regional Locations Directory &rarr;
                    </Link>
                    <ul className="space-y-2 text-xs">
                      <li><Link to="/locations/wagholi" className="text-slate-400 hover:text-white transition">Wagholi (Hub & HQ)</Link></li>
                      <li><Link to="/locations/hadapsar" className="text-slate-400 hover:text-white transition">Hadapsar & Magarpatta</Link></li>
                      <li><Link to="/locations/kharadi" className="text-slate-400 hover:text-white transition">Kharadi EON IT Park</Link></li>
                      <li><Link to="/locations/lonikand" className="text-slate-400 hover:text-white transition">Lonikand & Bakori</Link></li>
                      <li><Link to="/locations/koregaon-bhima" className="text-slate-400 hover:text-white transition">Koregaon Bhima</Link></li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <Link to="/cities" className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider border-b border-white/10 pb-2 hover:text-[#0066ff] transition">
                      <Globe className="h-3.5 w-3.5 text-[#0066ff]" /> Industrial Zones & Districts &rarr;
                    </Link>
                    <ul className="space-y-2 text-xs">
                      <li><Link to="/locations/ranjangaon-midc" className="text-slate-400 hover:text-white transition">Ranjangaon MIDC Plant Hub</Link></li>
                      <li><Link to="/locations/chakan-midc" className="text-slate-400 hover:text-white transition">Chakan MIDC Auto Corridor</Link></li>
                      <li><Link to="/locations/shirur" className="text-slate-400 hover:text-white transition">Shirur & Karegaon</Link></li>
                      <li><Link to="/cities/pune" className="text-slate-400 hover:text-white transition">Pune District</Link></li>
                      <li><Link to="/cities/mumbai" className="text-slate-400 hover:text-white transition">Mumbai & Thane</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Brands Mega Menu */}
            <div className="relative group px-1">
              <Link
                to="/brands"
                className="flex items-center gap-1.5 px-3 py-2 rounded-full text-slate-300 group-hover:text-white group-hover:bg-white/10 transition-all duration-200"
              >
                <Award className="h-3.5 w-3.5 text-amber-400" />
                Brands <ChevronDown className="h-3.5 w-3.5 opacity-70 group-hover:rotate-180 transition-transform duration-300" />
              </Link>

              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none group-hover:pointer-events-auto z-50">
                <div className="w-[500px] bg-[#0a0a0f]/98 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl p-5 grid grid-cols-2 gap-5 relative overflow-hidden">
                  <div className="space-y-3">
                    <Link to="/brands" className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider border-b border-white/10 pb-2 hover:text-[#00c8ff] transition">
                      <Award className="h-3.5 w-3.5 text-[#00c8ff]" /> OEM Brands Directory &rarr;
                    </Link>
                    <ul className="space-y-2 text-xs">
                      <li><Link to="/brands/daikin" className="text-slate-400 hover:text-white transition">Daikin Air Conditioning</Link></li>
                      <li><Link to="/brands/voltas" className="text-slate-400 hover:text-white transition">Voltas Systems</Link></li>
                      <li><Link to="/brands/blue-star" className="text-slate-400 hover:text-white transition">Blue Star Commercial</Link></li>
                      <li><Link to="/brands/lg" className="text-slate-400 hover:text-white transition">LG Electronics</Link></li>
                      <li><Link to="/brands/hitachi" className="text-slate-400 hover:text-white transition">Hitachi Cooling</Link></li>
                      <li><Link to="/brands/carrier" className="text-slate-400 hover:text-white transition">Carrier HVAC</Link></li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <Link to="/brands" className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider border-b border-white/10 pb-2 hover:text-[#0066ff] transition">
                      <Zap className="h-3.5 w-3.5 text-[#0066ff]" /> OEM Comparisons &rarr;
                    </Link>
                    <ul className="space-y-2 text-xs">
                      <li><Link to="/brands/compare/daikin-vs-hitachi" className="text-slate-400 hover:text-white transition">Daikin vs Hitachi Comparison</Link></li>
                      <li><Link to="/brands/compare/carrier-vs-blue-star" className="text-slate-400 hover:text-white transition">Carrier vs Blue Star</Link></li>
                      <li><Link to="/brands/compare/lg-vs-samsung" className="text-slate-400 hover:text-white transition">LG vs Samsung</Link></li>
                      <li><Link to="/guides/brand-comparisons" className="font-bold text-[#00c8ff] hover:underline transition mt-2 inline-block">All Brand Comparisons &rarr;</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Tools & Engineering Mega Menu */}
            <div className="relative group px-1">
              <Link
                to="/calculators"
                className="flex items-center gap-1.5 px-3 py-2 rounded-full text-slate-300 group-hover:text-white group-hover:bg-white/10 transition-all duration-200"
              >
                <Calculator className="h-3.5 w-3.5 text-emerald-400" />
                Calculators <ChevronDown className="h-3.5 w-3.5 opacity-70 group-hover:rotate-180 transition-transform duration-300" />
              </Link>

              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none group-hover:pointer-events-auto z-50">
                <div className="w-[560px] bg-[#0a0a0f]/98 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl p-5 grid grid-cols-2 gap-5 relative overflow-hidden">
                  <div className="space-y-3">
                    <Link to="/calculators" className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider border-b border-white/10 pb-2 hover:text-[#00c8ff] transition">
                      <Calculator className="h-3.5 w-3.5 text-[#00c8ff]" /> Interactive Calculators &rarr;
                    </Link>
                    <ul className="space-y-2 text-xs">
                      <li><Link to="/calculators" className="font-bold text-[#00c8ff] hover:underline transition">Calculators Main Dashboard</Link></li>
                      <li><Link to="/tools/tonnage-calculator" className="text-slate-400 hover:text-white transition">AC Tonnage Calculator</Link></li>
                      <li><Link to="/tools/pt-calculator" className="text-slate-400 hover:text-white transition">Refrigerant PT Pressure-Temp Chart</Link></li>
                      <li><Link to="/tools/superheat-calculator" className="text-slate-400 hover:text-white transition">Superheat Diagnostic Calculator</Link></li>
                      <li><Link to="/tools/subcooling-calculator" className="text-slate-400 hover:text-white transition">Subcooling Diagnostic Tool</Link></li>
                      <li><Link to="/tools/electricity-cost" className="text-slate-400 hover:text-white transition">Monthly Electricity Cost Estimator</Link></li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <Link to="/resources" className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider border-b border-white/10 pb-2 hover:text-[#0066ff] transition">
                      <BookOpen className="h-3.5 w-3.5 text-[#0066ff]" /> Tech Guides & Formulas &rarr;
                    </Link>
                    <ul className="space-y-2 text-xs">
                      <li><Link to="/resources" className="text-slate-400 hover:text-white transition">Full Resources Hub</Link></li>
                      <li><Link to="/guides" className="text-slate-400 hover:text-white transition">Troubleshooting Guides Hub</Link></li>
                      <li><Link to="/formulas" className="text-slate-400 hover:text-white transition">Engineering Formulas Library</Link></li>
                      <li><Link to="/refrigerants" className="text-slate-400 hover:text-white transition">Refrigerants PT Technical Hub</Link></li>
                      <li><Link to="/glossary" className="text-slate-400 hover:text-white transition">HVAC/R Glossary (A-Z)</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <Link
              to="/portfolio"
              className="flex items-center gap-1.5 px-3 py-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <Briefcase className="h-3.5 w-3.5 text-purple-400" /> Case Studies
            </Link>

            <Link
              to="/blogs"
              className="flex items-center gap-1.5 px-3 py-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <FileText className="h-3.5 w-3.5 text-rose-400" /> Blogs
            </Link>

            <Link
              to="/emergency"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-red-400 hover:text-white bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 transition-all duration-300 ml-1 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
            >
              <ShieldAlert className="h-3.5 w-3.5 text-red-500 animate-pulse" /> Code Red 24/7
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 relative z-50 shrink-0">
            {/* Search Button */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-full border border-white/10 transition-all duration-200 flex items-center gap-2 group cursor-pointer"
              aria-label="Search site"
            >
              <Search className="h-4 w-4 text-slate-300 group-hover:text-[#00c8ff] transition-colors" />
              <span className="hidden md:inline text-xs font-medium text-slate-400">Search</span>
            </button>

            {/* Phone Button */}
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold text-slate-200 hover:bg-white/15 hover:border-white/30 hover:text-white transition-all duration-200"
              title="Call Support"
            >
              <Phone className="h-3.5 w-3.5 text-[#00c8ff]" />
              <span className="hidden sm:inline">{phone}</span>
            </a>

            {/* Book CTA */}
            <Link
              to="/booking"
              search={{}}
              className="hidden sm:inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-extrabold uppercase tracking-wider text-[#09090f] transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_4px_20px_rgba(0,200,255,0.4)]"
              style={{
                background: "linear-gradient(135deg, #00c8ff, #0066ff)",
              }}
              onClick={closeMobileMenu}
            >
              <Clock className="h-3.5 w-3.5" />
              <span>Book Online</span>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              className="xl:hidden flex items-center justify-center p-2.5 min-w-[44px] min-h-[44px] text-white bg-white/10 hover:bg-white/20 active:scale-95 rounded-full border border-white/20 transition-all shadow-md touch-manipulation cursor-pointer relative z-50"
              onClick={handleMobileToggle}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5 text-[#00c8ff]" /> : <Menu className="h-5 w-5 text-white" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="xl:hidden fixed inset-x-0 top-16 h-[calc(100dvh-4rem)] bg-[#09090f] backdrop-blur-3xl border-t border-white/10 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto z-50 touch-auto animate-slide-down-drawer">
          <nav className="flex flex-col gap-3.5 text-sm pb-8">
            {/* Residential Services Button */}
            <Link
              to="/services"
              search={{ cat: "residential" }}
              onClick={closeMobileMenu}
              className="flex items-center justify-between p-4 border border-[#00c8ff]/30 rounded-2xl bg-[#00c8ff]/10 font-bold text-white hover:bg-[#00c8ff]/20 transition"
            >
              <span className="flex items-center gap-2.5"><Thermometer className="h-4.5 w-4.5 text-[#00c8ff]" /> 🏡 Residential AC & Appliance</span>
              <span className="text-xs text-[#00c8ff] font-bold">&rarr;</span>
            </Link>

            {/* Commercial HVAC Button */}
            <Link
              to="/services"
              search={{ cat: "commercial" }}
              onClick={closeMobileMenu}
              className="flex items-center justify-between p-4 border border-[#0066ff]/30 rounded-2xl bg-[#0066ff]/10 font-bold text-white hover:bg-[#0066ff]/20 transition"
            >
              <span className="flex items-center gap-2.5"><Settings className="h-4.5 w-4.5 text-[#0066ff]" /> 🏢 Commercial HVAC & Industrial</span>
              <span className="text-xs text-[#0066ff] font-bold">&rarr;</span>
            </Link>

            {/* PCB Repair Services Button */}
            <Link
              to="/services"
              search={{ cat: "pcb" }}
              onClick={closeMobileMenu}
              className="flex items-center justify-between p-4 border border-amber-500/30 rounded-2xl bg-amber-500/10 font-bold text-amber-400 hover:bg-amber-500/20 transition"
            >
              <span className="flex items-center gap-2.5"><Zap className="h-4.5 w-4.5 text-amber-400" /> ⚡ 50 Inverter PCB Repair Services</span>
              <span className="text-xs text-amber-400 font-bold">&rarr;</span>
            </Link>

            {/* Locations Accordion */}
            <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/5 shadow-inner">
              <button
                type="button"
                onClick={() => toggleMobileAccordion("locations")}
                className="w-full flex items-center justify-between p-4 font-bold text-white text-left active:bg-white/10 transition cursor-pointer"
              >
                <span className="flex items-center gap-2.5"><MapPin className="h-4.5 w-4.5 text-[#00c8ff]" /> Locations & Hubs</span>
                <ChevronDown className={`h-4.5 w-4.5 text-slate-400 transition-transform duration-200 ${openMobileAccordion === "locations" ? "rotate-180 text-[#00c8ff]" : ""}`} />
              </button>
              {openMobileAccordion === "locations" && (
                <div className="p-3.5 border-t border-white/10 bg-black/60 flex flex-col gap-2.5 text-xs text-slate-300 animate-fade-in">
                  <Link to="/locations" onClick={closeMobileMenu} className="font-bold text-[#00c8ff] hover:underline flex items-center justify-between py-1"><span>All Regional Locations</span><span>&rarr;</span></Link>
                  <Link to="/locations/wagholi" onClick={closeMobileMenu} className="hover:text-white py-1">Wagholi (Main HQ)</Link>
                  <Link to="/locations/hadapsar" onClick={closeMobileMenu} className="hover:text-white py-1">Hadapsar & Magarpatta</Link>
                  <Link to="/locations/kharadi" onClick={closeMobileMenu} className="hover:text-white py-1">Kharadi IT Corridor</Link>
                  <Link to="/locations/chakan-midc" onClick={closeMobileMenu} className="hover:text-white py-1">Chakan MIDC Industrial</Link>
                  <Link to="/locations/ranjangaon-midc" onClick={closeMobileMenu} className="hover:text-white py-1">Ranjangaon MIDC Hub</Link>
                  <Link to="/cities/pune" onClick={closeMobileMenu} className="hover:text-white py-1">Pune District</Link>
                </div>
              )}
            </div>

            {/* Brands Accordion */}
            <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/5 shadow-inner">
              <button
                type="button"
                onClick={() => toggleMobileAccordion("brands")}
                className="w-full flex items-center justify-between p-4 font-bold text-white text-left active:bg-white/10 transition cursor-pointer"
              >
                <span className="flex items-center gap-2.5"><Award className="h-4.5 w-4.5 text-[#00c8ff]" /> Brands & OEM</span>
                <ChevronDown className={`h-4.5 w-4.5 text-slate-400 transition-transform duration-200 ${openMobileAccordion === "brands" ? "rotate-180 text-[#00c8ff]" : ""}`} />
              </button>
              {openMobileAccordion === "brands" && (
                <div className="p-3.5 border-t border-white/10 bg-black/60 flex flex-col gap-2.5 text-xs text-slate-300 animate-fade-in">
                  <Link to="/brands" onClick={closeMobileMenu} className="font-bold text-[#00c8ff] hover:underline flex items-center justify-between py-1"><span>OEM Brands Hub</span><span>&rarr;</span></Link>
                  <Link to="/brands/daikin" onClick={closeMobileMenu} className="hover:text-white py-1">Daikin Service</Link>
                  <Link to="/brands/voltas" onClick={closeMobileMenu} className="hover:text-white py-1">Voltas Systems</Link>
                  <Link to="/brands/blue-star" onClick={closeMobileMenu} className="hover:text-white py-1">Blue Star Commercial</Link>
                  <Link to="/brands/lg" onClick={closeMobileMenu} className="hover:text-white py-1">LG Electronics</Link>
                  <Link to="/brands/hitachi" onClick={closeMobileMenu} className="hover:text-white py-1">Hitachi Cooling</Link>
                  <Link to="/brands/carrier" onClick={closeMobileMenu} className="hover:text-white py-1">Carrier Commercial</Link>
                </div>
              )}
            </div>

            {/* Tools Accordion */}
            <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/5 shadow-inner">
              <button
                type="button"
                onClick={() => toggleMobileAccordion("tools")}
                className="w-full flex items-center justify-between p-4 font-bold text-white text-left active:bg-white/10 transition cursor-pointer"
              >
                <span className="flex items-center gap-2.5"><Calculator className="h-4.5 w-4.5 text-[#00c8ff]" /> Engineering Tools</span>
                <ChevronDown className={`h-4.5 w-4.5 text-slate-400 transition-transform duration-200 ${openMobileAccordion === "tools" ? "rotate-180 text-[#00c8ff]" : ""}`} />
              </button>
              {openMobileAccordion === "tools" && (
                <div className="p-3.5 border-t border-white/10 bg-black/60 flex flex-col gap-2.5 text-xs text-slate-300 animate-fade-in">
                  <Link to="/calculators" onClick={closeMobileMenu} className="font-bold text-[#00c8ff] hover:underline flex items-center justify-between py-1"><span>Calculators Main Dashboard</span><span>&rarr;</span></Link>
                  <Link to="/tools/tonnage-calculator" onClick={closeMobileMenu} className="hover:text-white py-1">AC Tonnage Calculator</Link>
                  <Link to="/tools/pt-calculator" onClick={closeMobileMenu} className="hover:text-white py-1">Refrigerant PT Chart</Link>
                  <Link to="/tools/superheat-calculator" onClick={closeMobileMenu} className="hover:text-white py-1">Superheat Diagnostic</Link>
                  <Link to="/tools/subcooling-calculator" onClick={closeMobileMenu} className="hover:text-white py-1">Subcooling Diagnostic</Link>
                  <Link to="/tools/electricity-cost" onClick={closeMobileMenu} className="hover:text-white py-1">Electricity Cost Estimator</Link>
                </div>
              )}
            </div>

            {/* General Direct Links */}
            <Link to="/portfolio" onClick={closeMobileMenu} className="px-4 py-3 rounded-2xl font-bold text-slate-200 hover:text-white hover:bg-white/5 transition border border-white/5">Case Studies & Projects</Link>
            <Link to="/resources" onClick={closeMobileMenu} className="px-4 py-3 rounded-2xl font-bold text-slate-200 hover:text-white hover:bg-white/5 transition border border-white/5">Resources Dashboard</Link>
            <Link to="/blogs" onClick={closeMobileMenu} className="px-4 py-3 rounded-2xl font-bold text-slate-200 hover:text-white hover:bg-white/5 transition border border-white/5">Blogs & Tech Articles</Link>

            <Link
              to="/emergency"
              onClick={closeMobileMenu}
              className="flex items-center gap-2.5 px-4 py-3.5 rounded-2xl font-bold text-red-400 bg-red-500/10 hover:bg-red-500/20 transition border border-red-500/30 mt-1 shadow-md"
            >
              <AlertTriangle className="h-4.5 w-4.5 text-red-400 animate-pulse" /> Code Red Emergency Dispatch
            </Link>
          </nav>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 p-3.5 text-xs font-bold text-white hover:bg-white/20 transition"
            >
              <Phone className="h-4 w-4 text-[#00c8ff]" />
              Call Specialist: {phone}
            </a>
            <Link
              to="/booking"
              search={{}}
              className="flex items-center justify-center gap-2 rounded-2xl p-3.5 text-xs font-bold text-[#09090f] transition"
              style={{
                background: "linear-gradient(135deg, #00c8ff, #0066ff)",
                boxShadow: "0 4px 20px rgba(0,200,255,0.4)",
              }}
              onClick={closeMobileMenu}
            >
              <Clock className="h-4 w-4" />
              Book Online Service
            </Link>
          </div>
        </div>
      )}

      <SiteSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
