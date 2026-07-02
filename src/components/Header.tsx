import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Phone, Clock, Menu, X, AlertTriangle, Search, Zap } from "lucide-react";
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
        <Link to="/" hash="top" className="flex items-center gap-2.5 group" onClick={closeMobileMenu}>
          <div className="relative">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#00c8ff]/30 to-[#0066ff]/20 blur-lg group-hover:blur-xl transition-all" />
            <img src={logo} alt="Prime Cool logo" className="relative h-9 w-9" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight text-white">
            Prime <span className="text-gradient">Cool</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 text-sm">
          {[
            { to: "/industrial/chiller-plant-operations", label: "Industrial", bold: true },
            { to: "/", hash: "services", label: "Services" },
            { to: "/portfolio", label: "Case Studies" },
            { to: "/resources", label: "Resources" },
            { to: "/blogs", label: "Blogs" },
            { to: "/", hash: "about", label: "About" },
          ].map((item) => (
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
            style={{ background: "linear-gradient(135deg, #00c8ff, #0066ff)", boxShadow: "0 4px 15px rgba(0,200,255,0.35)" }}
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
              { to: "/industrial/chiller-plant-operations", label: "Industrial Systems", bold: true },
              { to: "/", hash: "services", label: "Services" },
              { to: "/portfolio", label: "Case Studies" },
              { to: "/resources", label: "Resources Hub" },
              { to: "/blogs", label: "Blogs" },
              { to: "/", hash: "about", label: "About" },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.to}
                hash={item.hash}
                onClick={closeMobileMenu}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base transition ${
                  item.bold ? "font-bold text-white bg-white/5" : "font-medium text-slate-300 hover:text-white hover:bg-white/5"
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
              style={{ background: "linear-gradient(135deg, #00c8ff, #0066ff)", boxShadow: "0 4px 20px rgba(0,200,255,0.4)" }}
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
