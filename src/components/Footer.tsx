import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Youtube, Twitter } from "lucide-react";
import logo from "../assets/logo.webp";

export function Footer({ cms }: { cms?: any }) {
  const socials = cms?.socials || {};
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-16 bg-card/10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand & Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <img src={cms?.theme?.logo || logo} alt="Prime Cool logo" className="h-8 w-8" loading="lazy" />
              <span className="font-display font-bold text-xl tracking-tight text-foreground">
                Prime Cool
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Precision engineering, zero-downtime maintenance, and rapid service across the Pune,
              Wagholi–Shirur Corridor, Karegaon, and Ranjangaon industrial zones.
            </p>
            <div className="flex items-center gap-4">
              {socials.facebook && (
                <a
                  href={socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-card hover:bg-primary/10 hover:text-primary rounded-full transition-colors border border-border"
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
                  className="p-2 bg-card hover:bg-primary/10 hover:text-primary rounded-full transition-colors border border-border"
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
                  className="p-2 bg-card hover:bg-primary/10 hover:text-primary rounded-full transition-colors border border-border"
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
                  className="p-2 bg-card hover:bg-primary/10 hover:text-primary rounded-full transition-colors border border-border"
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
                  className="p-2 bg-card hover:bg-primary/10 hover:text-primary rounded-full transition-colors border border-border"
                  title="Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-foreground">Company</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link to="/" hash="about" className="hover:text-primary transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-primary transition">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="hover:text-primary transition">
                  Latest Blogs
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-primary transition">
                  Admin Portal
                </Link>
              </li>
              <li>
                {socials.email && (
                  <a href={`mailto:${socials.email}`} className="hover:text-primary transition">
                    Contact Support
                  </a>
                )}
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-bold text-foreground">Services</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/industrial/$topic"
                  params={{ topic: "chiller-plant-operations" }}
                  className="hover:text-primary transition"
                >
                  Industrial Cooling
                </Link>
              </li>
              <li>
                <Link to="/" hash="services" className="hover:text-primary transition">
                  Commercial HVAC
                </Link>
              </li>
              <li>
                <Link to="/booking" className="hover:text-primary transition">
                  Book Online Service
                </Link>
              </li>
              <li>
                <Link
                  to="/emergency"
                  className="text-red-500 font-semibold hover:text-red-400 transition"
                >
                  Code Red Emergency
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-bold text-foreground">Knowledge Base</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link to="/resources" className="hover:text-primary transition">
                  Resource Hub
                </Link>
              </li>
              <li>
                <Link to="/glossary" className="hover:text-primary transition">
                  HVAC Glossary
                </Link>
              </li>
              <li>
                <Link to="/tools/pt-calculator" className="hover:text-primary transition">
                  PT Calculator
                </Link>
              </li>
              <li>
                <Link to="/tools/btu-calculator" className="hover:text-primary transition">
                  BTU Calculator
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {currentYear} Prime Cool. All rights reserved.</p>
          <p>Engineered by Saurav Kailas Temgire</p>
        </div>
      </div>
    </footer>
  );
}
