import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Search, X, MapPin, Wrench, BookOpen, FileText, Factory, Zap } from "lucide-react";
import { getPublicBlogs } from "../lib/api";

export function SiteSearch({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    if (isOpen) {
      getPublicBlogs().then((data) => {
        if (data && data.blogs) {
          setBlogs(data.blogs);
        }
      });
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setSearchQuery("");
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const hardcodedLinks = [
    // Locations
    { name: "Pune Services", path: "/cities/pune", type: "Location", icon: MapPin },
    { name: "Wagholi Support", path: "/cities/wagholi", type: "Location", icon: MapPin },
    { name: "Mumbai Services", path: "/cities/mumbai", type: "Location", icon: MapPin },
    { name: "Nashik Services", path: "/cities/nashik", type: "Location", icon: MapPin },
    // Services
    { name: "AC Repair & Service", path: "/services/ac-repair", type: "Service", icon: Wrench },
    { name: "AC Installation", path: "/services/ac-installation", type: "Service", icon: Wrench },
    { name: "VRV/VRF Systems", path: "/services/vrf-systems", type: "Service", icon: Factory },
    { name: "Cold Rooms", path: "/services/cold-rooms", type: "Service", icon: Factory },
    // Industrial
    {
      name: "Industrial Chiller Plant",
      path: "/industrial/chiller-plant-operations",
      type: "Industrial",
      icon: Factory,
    },
    {
      name: "Industrial Air Dryers",
      path: "/industrial/industrial-air-dryers",
      type: "Industrial",
      icon: Factory,
    },
    {
      name: "Large Scale Ducting",
      path: "/industrial/large-scale-ducting",
      type: "Industrial",
      icon: Factory,
    },
    // Tools
    { name: "BTU Load Calculator", path: "/tools/btu-calculator", type: "Tool", icon: FileText },
    {
      name: "Superheat Calculator",
      path: "/tools/superheat-calculator",
      type: "Tool",
      icon: FileText,
    },
    {
      name: "Subcooling Calculator",
      path: "/tools/subcooling-calculator",
      type: "Tool",
      icon: FileText,
    },
    { name: "ROI Calculator", path: "/interactive/roi", type: "Tool", icon: Zap },
    // Resources & Brands
    {
      name: "Refrigeration Pressure-Temp (R32)",
      path: "/refrigerants/r32",
      type: "Resource",
      icon: BookOpen,
    },
    { name: "Daikin Error Codes", path: "/brands/daikin", type: "Brand", icon: BookOpen },
    { name: "LG Error Codes", path: "/brands/lg", type: "Brand", icon: BookOpen },
  ];

  const blogLinks = blogs.map((b) => ({
    name: b.title,
    path: `/blogs/${b.slug}`,
    type: "Blog",
    icon: BookOpen,
  }));

  const allLinks = [...hardcodedLinks, ...blogLinks];

  const filteredLinks = allLinks.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 bg-background/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-card border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center border-b border-border p-4 relative">
          <Search className="h-5 w-5 text-muted-foreground absolute left-6" />
          <input
            autoFocus
            type="text"
            placeholder="Search blogs, tools, locations, services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent pl-10 pr-10 py-2 outline-none text-foreground text-lg placeholder:text-muted-foreground/50"
          />
          <button
            onClick={onClose}
            className="absolute right-4 p-2 rounded-full hover:bg-muted text-muted-foreground transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {searchQuery && filteredLinks.length > 0 ? (
            <div className="p-2">
              <div className="text-xs font-semibold text-muted-foreground mb-3 px-2">
                RESULTS ({filteredLinks.length})
              </div>
              {filteredLinks.slice(0, 20).map((link, idx) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={idx}
                    to={link.path}
                    onClick={onClose}
                    className="flex items-center gap-3 px-3 py-3 hover:bg-muted rounded-lg group transition"
                  >
                    <div className="p-2 bg-background border border-border rounded-md text-primary group-hover:bg-primary group-hover:text-primary-foreground transition">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{link.name}</div>
                      <div className="text-[10px] text-muted-foreground uppercase">{link.type}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : searchQuery ? (
            <div className="p-8 text-center text-muted-foreground text-sm">
              No results found for "{searchQuery}"
            </div>
          ) : (
            <div className="p-8 text-center text-muted-foreground text-sm flex flex-col items-center gap-3">
              <div className="p-4 rounded-full bg-muted/50 text-muted-foreground">
                <Search className="h-8 w-8" />
              </div>
              <p>Type to search all pages, resources, and blogs...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
