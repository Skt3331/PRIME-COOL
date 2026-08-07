import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Phone, Clock, Menu, X, AlertTriangle, Search, Zap, ChevronDown, Calculator, BookOpen, MapPin, Globe, Award, Settings, Thermometer } from "lucide-react";
import logo from "../assets/logo.webp";
import { SiteSearch } from "./SiteSearch";

export function Header({ cms }: { cms?: any }) {
  const socials = cms?.socials || {};
  const phone = socials.phone || "+917507408461";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-2xl bg-[#09090f]/85 border-b border-white/8 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          hash="top"
          className="flex items-center gap-2.5 group"
          onClick={closeMobileMenu}
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#00c8ff]/30 to-[#0066ff]/20 blur-lg group-hover:blur-xl transition-all" />
            <img
              src={cms?.theme?.logo || logo}
              alt="Prime Cool logo"
              className="relative h-9 w-9"
            />
          </div>
          <span className="font-display font-bold text-lg tracking-tight text-white">
            {cms?.theme?.siteName || "Prime Cool"}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 text-sm">
          {[
            { to: "/industrial/chiller-plant-operations", label: "Industrial", bold: true },
            { to: "/services", label: "Services" },
            { to: "/portfolio", label: "Case Studies" },
          ].map((item: any) => (
            <Link
              key={item.label}
              to={item.to}
              hash={item.hash}
              className={`relative px-3 py-1.5 rounded-lg text-sm transition-all duration-200 group ${
                item.bold
                  ? "text-white font-semibold"
                  : "text-slate-400 hover:text-white font-medium"
              }`}
            >
              <span className="relative z-10">{item.label}</span>
              <span className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/5 transition-all duration-200" />
            </Link>
          ))}
          
          {/* Resources Mega Menu */}
          <div className="relative group px-3 py-1.5">
            <button className="flex items-center gap-1 text-sm font-medium text-slate-400 group-hover:text-white transition-colors relative z-10 cursor-default">
              Resources <ChevronDown className="h-4 w-4 opacity-70 group-hover:rotate-180 transition-transform duration-300" />
            </button>
            <span className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/5 transition-all duration-200" />

            {/* Dropdown Panel */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none group-hover:pointer-events-auto z-50">
              <div className="w-[600px] bg-[#0a0a0f]/95 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl p-6 grid grid-cols-2 gap-6 relative overflow-hidden">
                {/* Decorative glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
                
                {/* Categories */}
                <div className="space-y-4">
                  <div>
                    <h4 className="flex items-center gap-2 text-white font-bold mb-3 border-b border-white/10 pb-2">
                      <Calculator className="h-4 w-4 text-primary" /> Engineering Tools
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li><Link to="/calculators" className="text-slate-400 hover:text-primary transition">All Calculators Hub</Link></li>
                      <li><Link to="/tools/tonnage-calculator" className="text-slate-400 hover:text-white transition">AC Tonnage Sizing</Link></li>
                      <li><Link to="/tools/pt-calculator" className="text-slate-400 hover:text-white transition">Refrigerant PT Chart</Link></li>
                      <li><Link to="/tools/superheat-calculator" className="text-slate-400 hover:text-white transition">Superheat Diagnostic</Link></li>
                      <li><Link to="/tools/cfm-calculator" className="text-slate-400 hover:text-white transition">Airflow (CFM) Tool</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="flex items-center gap-2 text-white font-bold mb-3 border-b border-white/10 pb-2">
                      <BookOpen className="h-4 w-4 text-primary" /> Guides & Troubleshooting
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li><Link to="/blogs" className="text-slate-400 hover:text-primary transition">Latest Tech Blogs</Link></li>
                      <li><Link to="/guides/ac-not-cooling" className="text-slate-400 hover:text-white transition">AC Not Cooling Guides</Link></li>
                      <li><Link to="/guides/refrigerator-error-codes" className="text-slate-400 hover:text-white transition">OEM Error Codes</Link></li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="flex items-center gap-2 text-white font-bold mb-3 border-b border-white/10 pb-2">
                      <Globe className="h-4 w-4 text-primary" /> Discovery Hubs
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li><Link to="/resources" className="font-bold text-white hover:text-primary transition flex items-center gap-1">Full Resources Dashboard &rarr;</Link></li>
                      <li><Link to="/glossary" className="text-slate-400 hover:text-white transition">HVAC/R Glossary (A-Z)</Link></li>
                    </ul>
                  </div>
                  
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10 mt-6">
                    <h4 className="text-white font-bold text-sm mb-1">Quick Portals</h4>
                    <p className="text-xs text-slate-400 mb-3">Access your dispatch logs or invoices.</p>
                    <div className="flex gap-2">
                      <Link to="/portal/customer" className="text-xs bg-primary/20 text-primary hover:bg-primary/30 px-3 py-1.5 rounded-lg transition text-center flex-1">Customer</Link>
                      <Link to="/portal/technician" className="text-xs bg-white/10 text-white hover:bg-white/20 px-3 py-1.5 rounded-lg transition text-center flex-1">Technician</Link>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          
          <Link
            to="/"
            hash="about"
            className="relative px-3 py-1.5 rounded-lg text-sm text-slate-400 hover:text-white font-medium transition-all duration-200 group"
          >
            <span className="relative z-10">About</span>
            <span className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/5 transition-all duration-200" />
          </Link>
          <Link
            to="/emergency"
            className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold text-red-400 hover:text-red-300 transition group"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            Code Red
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/8 rounded-lg transition"
            aria-label="Search"
          >
            <Search className="h-4.5 w-4.5" />
          </button>

          {/* Phone */}
          <a
            href={`tel:${phone.replace(/\s+/g, "")}`}
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-white/10 hover:border-white/20 hover:text-white transition"
            title="Call Support"
          >
            <Phone className="h-3.5 w-3.5 text-[#00c8ff]" />
            <span className="hidden sm:inline">{phone}</span>
          </a>

          {/* Book CTA */}
          <Link
            to="/booking"
            search={{}}
            className="hidden sm:inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-[#09090f] transition hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #00c8ff, #0066ff)",
              boxShadow: "0 4px 15px rgba(0,200,255,0.35)",
            }}
            onClick={closeMobileMenu}
          >
            <Clock className="h-4 w-4" />
            <span>Book Online</span>
          </Link>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 text-slate-400 hover:text-white hover:bg-white/8 rounded-lg transition"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 backdrop-blur-2xl bg-[#09090f]/95 border-b border-white/8 shadow-2xl p-6 flex flex-col gap-6 h-[calc(100vh-64px)] overflow-y-auto">
          <nav className="flex flex-col gap-1">
            {[
              {
                to: "/industrial/chiller-plant-operations",
                label: "Industrial Systems",
                bold: true,
              },
              { to: "/services", label: "Services" },
              { to: "/portfolio", label: "Case Studies" },
              { to: "/resources", label: "Resources Dashboard" },
              { to: "/calculators", label: "Calculators" },
              { to: "/blogs", label: "Blogs & Guides" },
              { to: "/", hash: "about", label: "About" },
            ].map((item: any) => (
              <Link
                key={item.label}
                to={item.to}
                hash={item.hash}
                onClick={closeMobileMenu}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base transition ${
                  item.bold
                    ? "font-bold text-white bg-white/5"
                    : "font-medium text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/emergency"
              onClick={closeMobileMenu}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-bold text-red-400 hover:bg-red-500/10 transition"
            >
              <AlertTriangle className="h-4 w-4" /> Code Red Dispatch
            </Link>
          </nav>

          <div className="mt-auto pt-6 border-t border-white/8 flex flex-col gap-3">
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 p-4 text-sm font-semibold text-slate-200 hover:bg-white/10 transition"
            >
              <Phone className="h-5 w-5 text-[#00c8ff]" />
              Call Now: {phone}
            </a>
            <Link
              to="/booking"
              search={{}}
              className="flex items-center justify-center gap-2 rounded-xl p-4 text-sm font-bold text-[#09090f] transition"
              style={{
                background: "linear-gradient(135deg, #00c8ff, #0066ff)",
                boxShadow: "0 4px 20px rgba(0,200,255,0.4)",
              }}
              onClick={closeMobileMenu}
            >
              <Zap className="h-5 w-5" />
              Book Online Service
            </Link>
          </div>
        </div>
      )}

      <SiteSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
