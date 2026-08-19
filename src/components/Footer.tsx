import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Youtube, Twitter, Snowflake } from "lucide-react";
import logo from "../assets/logo.webp";

export function Footer({ cms }: { cms?: any }) {
  const socials = cms?.socials || {};
  const currentYear = new Date().getFullYear();
  const logoSrc = (cms?.theme?.logo && typeof cms.theme.logo === "string" && cms.theme.logo.trim() !== "") ? cms.theme.logo : logo;

  return (
    <footer className="border-t border-white/10 py-16 bg-[#06060c] text-slate-300">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-16">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="relative flex items-center justify-center h-9 w-9 min-w-[36px] min-h-[36px] rounded-xl bg-gradient-to-br from-[#00c8ff]/20 to-[#0066ff]/20 border border-[#00c8ff]/40 shadow-[0_0_10px_rgba(0,200,255,0.3)] shrink-0 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                <img
                  src={logoSrc}
                  alt="Prime Cool"
                  className="h-full w-full object-cover relative z-10"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.opacity = "0";
                  }}
                />
                <Snowflake className="h-4.5 w-4.5 text-[#00c8ff] absolute inset-0 m-auto z-0 group-hover:rotate-45 transition-transform duration-500" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white group-hover:text-[#00c8ff] transition-colors">
                {cms?.theme?.siteName || "Prime Cool"}
              </span>
            </Link>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Engineered climate and refrigeration solutions. Precision split AC repairs, VRF/VRV central systems, heavy industrial process chillers, cold rooms, and emergency dispatch across Pune, Wagholi, Hadapsar, Kharadi, Chakan, and Ranjangaon MIDC.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {socials.facebook && (
                <a
                  href={socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 hover:bg-[#00c8ff]/20 hover:text-[#00c8ff] rounded-full transition-colors border border-white/10"
                  title="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              )}
              {socials.instagram && (
                <a
                  href={socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 hover:bg-[#00c8ff]/20 hover:text-[#00c8ff] rounded-full transition-colors border border-white/10"
                  title="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              )}
              {socials.linkedin && (
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 hover:bg-[#00c8ff]/20 hover:text-[#00c8ff] rounded-full transition-colors border border-white/10"
                  title="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              )}
              {socials.youtube && (
                <a
                  href={socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 hover:bg-[#00c8ff]/20 hover:text-[#00c8ff] rounded-full transition-colors border border-white/10"
                  title="YouTube"
                >
                  <Youtube className="h-4 w-4" />
                </a>
              )}
              {socials.twitter && (
                <a
                  href={socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 hover:bg-[#00c8ff]/20 hover:text-[#00c8ff] rounded-full transition-colors border border-white/10"
                  title="Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Services Column */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider border-b border-white/10 pb-2">Services</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/services" className="font-bold text-white hover:text-[#00c8ff] transition">All Services Directory</Link></li>
              <li><Link to="/services" search={{ cat: "pcb" }} className="font-semibold text-[#00c8ff] hover:underline transition">⚡ 50 Inverter PCB Services</Link></li>
              <li><Link to="/services/split-ac-repair" className="hover:text-white transition">Split AC Repair</Link></li>
              <li><Link to="/services/ac-gas-charging" className="hover:text-white transition">AC Gas Leak & Recharging</Link></li>
              <li><Link to="/services/cassette-ac-repair" className="hover:text-white transition">Cassette AC Maintenance</Link></li>
              <li><Link to="/services/vrf-systems" className="hover:text-white transition">VRF / VRV Systems</Link></li>
              <li><Link to="/services/cold-rooms" className="hover:text-white transition">Cold Storage & Rooms</Link></li>
              <li><Link to="/booking" className="hover:text-white transition">Book Online Service</Link></li>
            </ul>
          </div>

          {/* Location Corridors Column */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider border-b border-white/10 pb-2">Locations</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/locations" className="font-bold text-white hover:text-[#00c8ff] transition">All Locations Directory</Link></li>
              <li><Link to="/cities" className="hover:text-white transition">Cities & Districts</Link></li>
              <li><Link to="/locations/wagholi" className="hover:text-white transition">Wagholi (Main HQ)</Link></li>
              <li><Link to="/locations/hadapsar" className="hover:text-white transition">Hadapsar & Magarpatta</Link></li>
              <li><Link to="/locations/kharadi" className="hover:text-white transition">Kharadi IT Corridor</Link></li>
              <li><Link to="/locations/chakan-midc" className="hover:text-white transition">Chakan MIDC Industrial</Link></li>
              <li><Link to="/locations/ranjangaon-midc" className="hover:text-white transition">Ranjangaon MIDC Hub</Link></li>
              <li><Link to="/cities/pune" className="hover:text-white transition">Pune Metropolitan</Link></li>
            </ul>
          </div>

          {/* Brands Column */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider border-b border-white/10 pb-2">Brands & OEM</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/brands" className="font-bold text-white hover:text-[#00c8ff] transition">All OEM Brands</Link></li>
              <li><Link to="/brands/daikin" className="hover:text-white transition">Daikin Service</Link></li>
              <li><Link to="/brands/voltas" className="hover:text-white transition">Voltas Air Conditioners</Link></li>
              <li><Link to="/brands/blue-star" className="hover:text-white transition">Blue Star Systems</Link></li>
              <li><Link to="/brands/lg" className="hover:text-white transition">LG Electronics</Link></li>
              <li><Link to="/brands/hitachi" className="hover:text-white transition">Hitachi Cooling</Link></li>
              <li><Link to="/brands/carrier" className="hover:text-white transition">Carrier Commercial</Link></li>
              <li><Link to="/guides/brand-comparisons" className="hover:text-white transition">OEM Comparison Guides</Link></li>
            </ul>
          </div>

          {/* Tools & Resources Column */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider border-b border-white/10 pb-2">Tools & Resources</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/resources" className="font-bold text-white hover:text-[#00c8ff] transition">Resources Dashboard</Link></li>
              <li><Link to="/calculators" className="hover:text-white transition">Calculators Hub</Link></li>
              <li><Link to="/guides" className="hover:text-white transition">Troubleshooting Guides</Link></li>
              <li><Link to="/formulas" className="hover:text-white transition">Engineering Formulas</Link></li>
              <li><Link to="/refrigerants" className="hover:text-white transition">Refrigerants PT Hub</Link></li>
              <li><Link to="/industrial" className="hover:text-white transition">Heavy Industrial Hub</Link></li>
              <li><Link to="/glossary" className="hover:text-white transition">HVAC/R Glossary (A-Z)</Link></li>
              <li><Link to="/portal/customer" className="hover:text-white transition">Customer Portal</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {currentYear} {cms?.theme?.siteName || "Prime Cool"}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/emergency" className="text-red-400 font-bold hover:text-red-300 transition">Code Red Dispatch</Link>
            <span>Engineered by Saurav Kailas Temgire</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
