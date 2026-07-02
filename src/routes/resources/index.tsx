import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { LOCATIONS, BRANDS, REFRIGERANTS, SERVICES, COMPARISONS, INDUSTRIAL_TOPICS, APPLIANCES } from "../../lib/sitemap-constants";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { getPublicBlogs } from "../../lib/api";
import {
  Calculator,
  BookOpen,
  Thermometer,
  FileText,
  Brain,
  MapPin,
  Search,
  ArrowRight,
  TrendingUp,
  Award,
  Settings,
  Wrench,
  Globe,
  Layers,
} from "lucide-react";

export const Route = createFileRoute("/resources/")({
  component: ResourcesDashboard,
});

function ResourcesDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    getPublicBlogs().then((data) => {
      if (data && data.blogs) {
        setBlogs(data.blogs);
      }
    });
  }, []);


  function formatName(slug: string) {
    return slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }

  const baseCategories = [
    {
      name: "Global Site Directory",
      icon: Globe,
      desc: "Quick access to all major sections, service pages, and industrial solutions.",
      items: [
        { name: "Home Page", path: "/", desc: "Main entry to Prime Cool" },
        { name: "All Case Studies", path: "/portfolio", desc: "View our project portfolio" },
        { name: "Book Service", path: "/booking", desc: "Schedule a repair or installation" },
        { name: "Emergency Dispatch", path: "/emergency", desc: "Code Red priority requests" },
        { name: "About Us", path: "/#about", desc: "Company history & mission" },
        { name: "Latest Blogs", path: "/blogs", desc: "HVAC insights and articles" },
        { name: "HVAC Glossary", path: "/glossary", desc: "A-Z dictionary of HVAC terms" },
        { name: "Admin Portal", path: "/admin", desc: "Internal site management" },
      ],
    },
    {
      name: "All Services",
      icon: Wrench,
      desc: "Comprehensive list of all our HVAC, refrigeration, and mechanical services.",
      items: SERVICES.map((s) => ({
        name: formatName(s),
        path: `/services/${s}`,
        desc: `Service details for ${formatName(s)}`,
      })),
    },
    {
      name: "Locations & Hubs",
      icon: MapPin,
      desc: "Find localized HVAC services in your city or industrial area.",
      items: LOCATIONS.map((l) => ({
        name: formatName(l),
        path: `/locations/${l}`,
        desc: `Services in ${formatName(l)}`,
      })),
    },
    {
      name: "Services by Location",
      icon: MapPin,
      desc: "Specific service offerings available in each local hub.",
      items: SERVICES.flatMap((s) =>
        LOCATIONS.map((l) => ({
          name: `${formatName(s)} in ${formatName(l)}`,
          path: `/services/${s}/${l}`,
          desc: `Local service for ${formatName(s)}`,
        }))
      ),
    },
    {
      name: "Brands Supported",
      icon: Award,
      desc: "OEM-specific resources, manuals, and service details.",
      items: BRANDS.map((b) => ({
        name: formatName(b),
        path: `/brands/${b}`,
        desc: `Support for ${formatName(b)}`,
      })),
    },
    {
      name: "Brand Appliances",
      icon: BookOpen,
      desc: "Specific appliance repair pages for each brand.",
      items: BRANDS.flatMap((b) =>
        APPLIANCES.map((a) => ({
          name: `${formatName(b)} ${a.toUpperCase()}`,
          path: `/brands/${b}/${a}`,
          desc: `Service for ${formatName(b)} ${a.toUpperCase()}`,
        }))
      ),
    },
    {
      name: "Brand Comparisons",
      icon: Layers,
      desc: "Head-to-head comparisons of major HVAC/R brands.",
      items: COMPARISONS.map((c) => ({
        name: formatName(c),
        path: `/brands/compare/${c}`,
        desc: "Compare specifications and costs",
      })),
    },
    {
      name: "Refrigerants Data",
      icon: Thermometer,
      desc: "Pressure and specifications for common refrigerants.",
      items: REFRIGERANTS.map((r) => ({
        name: r.toUpperCase(),
        path: `/refrigerants/${r}`,
        desc: `PT Chart for ${r.toUpperCase()}`,
      })),
    },
    {
      name: "Industrial Solutions",
      icon: Globe,
      desc: "Heavy mechanical and plant operations.",
      items: INDUSTRIAL_TOPICS.map((t) => ({
        name: formatName(t),
        path: `/industrial/${t}`,
        desc: `Details for ${formatName(t)}`,
      })),
    },
    {
      name: "Calculators",
      icon: Calculator,
      desc: "Interactive sizing and unit converters for refrigeration loop diagnostics.",
      items: [
        {
          name: "BTU Load",
          path: "/tools/btu-calculator",
          desc: "Room dimensions to BTU cooling load.",
        },
        {
          name: "AC Tonnage",
          path: "/tools/tonnage-calculator",
          desc: "Estimate AC tonnage from sq ft.",
        },
        {
          name: "Refrigerant PT",
          path: "/tools/pt-calculator",
          desc: "Pressure to saturation temp lookup.",
        },
        {
          name: "Superheat",
          path: "/tools/superheat-calculator",
          desc: "TXV and fixed-orifice diagnostic calculations.",
        },
        {
          name: "Subcooling",
          path: "/tools/subcooling-calculator",
          desc: "Condenser liquid subcooling checks.",
        },
        {
          name: "Airflow (CFM)",
          path: "/tools/cfm-calculator",
          desc: "CFM volume from tonnage and delta T.",
        },
        {
          name: "Duct Size",
          path: "/tools/duct-calculator",
          desc: "Equal friction method duct diameter.",
        },
        {
          name: "Pipe Sizing",
          path: "/tools/pipe-sizing",
          desc: "Liquid and suction copper line sizing.",
        },
        {
          name: "Cooling Load",
          path: "/tools/cooling-load",
          desc: "Structural heat gain calculations.",
        },
        {
          name: "Energy Consumption",
          path: "/tools/energy-calculator",
          desc: "Monthly electrical bills and carbon footprint.",
        },
        {
          name: "Vacuum Converter",
          path: "/tools/vacuum-convert",
          desc: "Microns to Torr, Pascal, and mbar.",
        },
        {
          name: "Psychrometric",
          path: "/tools/psychrometric",
          desc: "Dew point, wet bulb, and humidity ratio.",
        },
        {
          name: "COP & EER",
          path: "/tools/cop-eer",
          desc: "Coefficient of performance conversions.",
        },
        {
          name: "Compressor Capacity",
          path: "/tools/compressor-capacity",
          desc: "CC displacement to BTU cooling power.",
        },
        {
          name: "Refrigerant Charge",
          path: "/tools/charge-calculator",
          desc: "Additional refrigerant charge for extra lines.",
        },
        {
          name: "Temp Converter",
          path: "/tools/temp-convert",
          desc: "Convert Celsius, Fahrenheit, and Kelvin.",
        },
        {
          name: "Pressure-Temp Converter",
          path: "/tools/pressure-temp",
          desc: "Convert PSI, Bar, and kPa units.",
        },
        {
          name: "Cooling Tower Approach",
          path: "/tools/cooling-tower-approach",
          desc: "Calculate effectiveness and approach temp.",
        },
        {
          name: "SEER to EER & COP",
          path: "/tools/seer-eer-cop",
          desc: "Convert SEER rating and calculate running costs.",
        },
        {
          name: "Air Velocity",
          path: "/tools/air-velocity",
          desc: "Calculate air speed FPM from CFM and duct size.",
        },
        {
          name: "Monthly Power Bill",
          path: "/tools/electricity-cost",
          desc: "Estimate monthly running costs & CO₂ print.",
        },
        {
          name: "Voltage Drop Sizer",
          path: "/tools/voltage-drop",
          desc: "Calculate voltage drop over long electrical cable runs.",
        },
      ],
    },
    {
      name: "Troubleshooting Guides",
      icon: BookOpen,
      desc: "Step-by-step diagnostic articles to debug complex AC and chiller faults.",
      items: [
        {
          name: "AC Not Cooling",
          path: "/guides/ac-not-cooling",
          desc: "15 common causes for no cooling.",
        },
        {
          name: "Low Suction Pressure",
          path: "/guides/low-suction",
          desc: "Low side pressure drops diagnostics.",
        },
        {
          name: "High Head Pressure",
          path: "/guides/high-head",
          desc: "Condenser heat dissipation faults.",
        },
        {
          name: "Compressor Short Cycling",
          path: "/guides/short-cycling",
          desc: "Why compressors turn off rapidly.",
        },
        {
          name: "Evaporator Freezing",
          path: "/guides/coil-freezing",
          desc: "Preventing liquid washback and ice blocks.",
        },
        {
          name: "Walk-In Cooler Warm",
          path: "/guides/walk-in-warm",
          desc: "Troubleshooting warm commercial coolers.",
        },
        {
          name: "Refrigerant Leak",
          path: "/guides/leak-symptoms",
          desc: "Spotting bubbles and oil spots on piping.",
        },
        {
          name: "Check Superheat",
          path: "/guides/how-to-superheat",
          desc: "How to place sensors and gauge lines.",
        },
        {
          name: "Measure Subcooling",
          path: "/guides/how-to-subcooling",
          desc: "Step-by-step charging diagnostic guides.",
        },
        {
          name: "Refrigerator Error Codes",
          path: "/guides/refrigerator-error-codes",
          desc: "Diagnostic tables for Haier, Bosch, Godrej.",
        },
        {
          name: "AC Gas Charging Guide",
          path: "/guides/ac-gas-charging",
          desc: "Dynamic pressure targets for R32, R410A, R22.",
        },
        {
          name: "Carrier vs. Hitachi & Daikin ACs",
          path: "/guides/brand-comparisons",
          desc: "Which brand is better for summers?",
        },
        {
          name: "Haier/Bosch/Godrej Troubleshooting",
          path: "/guides/refrigerator-not-cooling",
          desc: "Fridges not cooling troubleshooting guide.",
        },
        {
          name: "CFM, Line Sizing & Tower Approach",
          path: "/guides/hvac-design-guide",
          desc: "HVAC piping and tower design parameters.",
        },
        {
          name: "R32/R404A/R407C Pressure Charts",
          path: "/guides/refrigerant-pressures-chart",
          desc: "Vacuum conversion, SEER/COP & pressures.",
        },
        {
          name: "AC Leaks & Gas Charging steps",
          path: "/guides/ac-leaks-gas-charging",
          desc: "Diagnosing water leaks & charging.",
        },
      ],
    },
    {
      name: "Refrigerant PT Charts",
      icon: Thermometer,
      desc: "Antoine formula pressure-temperature tables for active field servicing.",
      items: [
        {
          name: "R134a PT Sheet",
          path: "/refrigerants/r134a",
          desc: "Automotive and domestic fridge ref.",
        },
        {
          name: "R410A PT Sheet",
          path: "/refrigerants/r410a",
          desc: "Residential split air conditioner pressures.",
        },
        {
          name: "R32 PT Sheet",
          path: "/refrigerants/r32",
          desc: "Modern low-GWP mildly flammable R32.",
        },
        {
          name: "R404A PT Sheet",
          path: "/refrigerants/r404a",
          desc: "Low temperature commercial freezer rooms.",
        },
        {
          name: "R407C PT Sheet",
          path: "/refrigerants/r407c",
          desc: "R22 replacement systems diagnostics.",
        },
        {
          name: "R22 PT Reference",
          path: "/refrigerants/r22",
          desc: "HCFC-22 properties and pressures.",
        },
        {
          name: "R290 Hydrocarbon",
          path: "/refrigerants/r290",
          desc: "Flammable propane charging guidelines.",
        },
      ],
    },
    {
      name: "Formulas & References",
      icon: FileText,
      desc: "Core mechanical engineering calculations and formula cheat sheets.",
      items: [
        {
          name: "HVAC Formulas",
          path: "/formulas/hvac",
          desc: "CFM, sensible, latent, and total heat load.",
        },
        {
          name: "Refrigeration Formulas",
          path: "/formulas/refrigeration",
          desc: "Compression ratio, COP, and cycle loops.",
        },
      ],
    },
    {
      name: "Interactive Tools",
      icon: Brain,
      desc: "Diagnostics wizards, technician quizzes, and payback selectors.",
      items: [
        {
          name: "HVAC/R Quiz",
          path: "/interactive/quiz",
          desc: "10-question technical competency quiz.",
        },
        {
          name: "Troubleshooting Wizard",
          path: "/interactive/wizard",
          desc: "Interactive symptom diagnostic flow tree.",
        },
        {
          name: "Refrigerant Selector",
          path: "/interactive/selector",
          desc: "GWP and safety class refrigerant match.",
        },
        {
          name: "Cost Estimator",
          path: "/interactive/cost-estimator",
          desc: "Ac installation material and labor cost estimate.",
        },
        {
          name: "PM Checklist Gen",
          path: "/interactive/checklist",
          desc: "Custom preventative maintenance checklists.",
        },
        {
          name: "HVAC ROI Calculator",
          path: "/interactive/roi",
          desc: "Inverter energy upgrade payback periods.",
        },
      ],
    },
    {
      name: "OEM Brand Reference",
      icon: Settings,
      desc: "OEM error codes, common faults, and maintenance logs.",
      items: [
        { name: "Daikin Error Codes", path: "/brands/daikin", desc: "A6, U4, C9 diagnostic logs." },
        { name: "LG Error Codes", path: "/brands/lg", desc: "CH01, CH05, CH21 diagnostics." },
        {
          name: "Carrier Error Codes",
          path: "/brands/carrier",
          desc: "E1, F4, P0 diagnostic guide.",
        },
        {
          name: "Danfoss Diagnostics",
          path: "/brands/danfoss",
          desc: "KP1/KP5 pressure switches.",
        },
        {
          name: "Copeland Compressor Guide",
          path: "/brands/copeland",
          desc: "Scroll temperature checks.",
        },
        {
          name: "Bitzer semi-hermetic",
          path: "/brands/bitzer",
          desc: "Shaft seals and PTC sensors.",
        },
      ],
    },
    {
      name: "Local Service Hubs",
      icon: MapPin,
      desc: "Region-specific commercial refrigeration and AMC support centers.",
      items: [
        {
          name: "Pune Services",
          path: "/cities/pune",
          desc: "Wagholi, Ranjangaon, Chakan repairs.",
        },
        {
          name: "Mumbai Services",
          path: "/cities/mumbai",
          desc: "Thane, Bhiwandi, Taloja industrial cooling.",
        },
        {
          name: "Nashik Services",
          path: "/cities/nashik",
          desc: "Lasalgaon agri cold rooms and chillers.",
        },
        {
          name: "Wagholi Support",
          path: "/cities/wagholi",
          desc: "AC repair & refrigeration in Wagholi.",
        },
        {
          name: "Ranjangaon MIDC Hub",
          path: "/cities/ranjangaon-midc",
          desc: "Industrial screw chillers in Ranjangaon.",
        },
        {
          name: "Chakan MIDC Support",
          path: "/cities/chakan-midc",
          desc: "Process cooling & cooling towers in Chakan.",
        },
        {
          name: "Pimpri-Chinchwad Hub",
          path: "/cities/pimpri-chinchwad",
          desc: "Ductable AC & commercial systems in PCMC.",
        },
      ],
    },
  ];

  const blogItems = blogs.map((blog) => ({
    name: blog.title,
    path: `/blogs/${blog.slug}`,
    desc: blog.summary || "Read this article to learn more.",
  }));

  const categories = [
    ...baseCategories,
    {
      name: "Latest Blogs & Insights",
      icon: Layers,
      desc: "Industry news, SEO articles, and expert HVAC advice.",
      items:
        blogItems.length > 0
          ? blogItems
          : [{ name: "No blogs available", path: "#", desc: "Check back later" }],
    },
  ];

  // Flattened items for search filter
  const allItems = categories.flatMap((cat) =>
    cat.items.map((item) => ({ ...item, categoryName: cat.name })),
  );

  const filteredItems = allItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.categoryName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <ResourceLayout title="Home" category="Dashboard">
      <div className="space-y-8">
        {/* Banner Section */}
        <div className="space-y-4 pb-2 border-b border-border/40">
          <h1 className="text-3xl md:text-4xl font-bold font-display text-foreground leading-tight flex items-center gap-2">
            <span>Engineering &amp; Troubleshooting Resource Center</span>
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
            A comprehensive reference center for HVAC/R technicians, design engineers, and
            commercial managers. Size pipes, verify subcooling/superheat metrics, view
            pressure-temperature Antoine charts, and troubleshoot faults dynamically.
          </p>
        </div>

        {/* Quick Search */}
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search all pages, blogs, calculators, troubleshooting guides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border-2 border-border bg-card pl-12 pr-4 py-3.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-muted-foreground shadow-sm transition"
          />
        </div>

        {searchQuery ? (
          /* Search Results */
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-foreground">
              Search Results ({filteredItems.length})
            </h3>
            {filteredItems.length > 0 ? (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="p-4 rounded-2xl border border-border hover:border-primary/50 bg-card/20 hover:bg-card/40 transition block space-y-1"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] uppercase text-primary font-semibold font-mono">
                        {item.categoryName}
                      </span>
                    </div>
                    <h4 className="font-bold text-foreground text-sm">{item.name}</h4>
                    <p className="text-xs text-muted-foreground leading-snug">{item.desc}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">
                No resources matching your search query.
              </p>
            )}
          </div>
        ) : (
          /* Category Dashboards */
          <div className="grid md:grid-cols-2 gap-6">
            {categories.map((cat) => {
              const CatIcon = cat.icon;
              return (
                <div
                  key={cat.name}
                  className="border border-border/40 bg-card/10 rounded-2xl p-5 space-y-4 hover:border-primary/20 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 text-primary">
                      <CatIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold font-display text-foreground text-base">
                        {cat.name}
                      </h3>
                      <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                        {cat.desc}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {cat.items.slice(0, 6).map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="py-1.5 px-2.5 rounded-lg border border-transparent hover:border-border/60 hover:bg-card/30 text-muted-foreground hover:text-foreground transition flex items-center justify-between"
                      >
                        <span className="truncate">{item.name}</span>
                        <ArrowRight className="h-3 w-3 opacity-40 shrink-0" />
                      </Link>
                    ))}
                    {cat.items.length > 6 && (
                      <div className="col-span-2 pt-1 border-t border-border/20 text-center">
                        <span className="text-[10px] text-primary font-semibold">
                          + {cat.items.length - 6} more resources available in sidebar
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Portals Access Section */}
        <div className="border border-border/80 bg-slate-900/20 rounded-2xl p-6 space-y-4">
          <div className="space-y-1">
            <h3 className="font-display text-lg font-bold text-white">
              Dedicated Platform Portals
            </h3>
            <p className="text-xs text-muted-foreground">
              Access your customer account log or submit technician dispatch forms.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              to="/portal/customer"
              className="p-5 rounded-xl border border-border bg-slate-900/50 hover:bg-slate-900 transition flex items-center justify-between group cursor-pointer"
            >
              <div>
                <strong className="text-sm text-foreground block group-hover:text-primary transition">
                  Client / Customer Portal
                </strong>
                <span className="text-[11px] text-muted-foreground mt-0.5 block">
                  Online booking tracking, invoices, AMC status, and warranty log.
                </span>
              </div>
              <ArrowRight className="h-4 w-4 text-primary shrink-0 opacity-60 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
            </Link>
            <Link
              to="/portal/technician"
              className="p-5 rounded-xl border border-border bg-slate-900/50 hover:bg-slate-900 transition flex items-center justify-between group cursor-pointer"
            >
              <div>
                <strong className="text-sm text-foreground block group-hover:text-primary transition">
                  Technician Dispatch Portal
                </strong>
                <span className="text-[11px] text-muted-foreground mt-0.5 block">
                  Job checklists, digital signature capture, refrigerant log, on-site invoices.
                </span>
              </div>
              <ArrowRight className="h-4 w-4 text-primary shrink-0 opacity-60 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Downloadable Technical Resources (Phase 8) */}
        <div className="border border-border/80 bg-slate-900/20 rounded-2xl p-6 space-y-6">
          <div>
            <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <Wrench className="h-5 w-5 text-primary" />
              <span>Downloadable Technical Resources & checklists</span>
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Free engineering specs and field servicing templates for technicians.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-mono">
            {[
              {
                name: "Refrigerant PT Chart (Antoine)",
                size: "48 KB",
                format: "PDF",
                link: "Refrigerant PT Sheet",
              },
              {
                name: "Compressor Wiring Diagrams (ZR/CR)",
                size: "120 KB",
                format: "PDF",
                link: "Wiring Diagram",
              },
              {
                name: "Capacitor Selection Chart (1.0-5.0 TR)",
                size: "32 KB",
                format: "TXT",
                link: "Capacitor Chart",
              },
              {
                name: "Copper Pipe Sizing Tables",
                size: "85 KB",
                format: "PDF",
                link: "Pipe Sizing Sheet",
              },
              {
                name: "Standard Torque Specs (Flared copper joints)",
                size: "42 KB",
                format: "PDF",
                link: "Torque Specs",
              },
              {
                name: "Deep Vacuum Pull Guidelines (500 Microns)",
                size: "28 KB",
                format: "TXT",
                link: "Vacuum Guide",
              },
              {
                name: "Refrigerant Leak Test Procedure Checklist",
                size: "64 KB",
                format: "PDF",
                link: "Leak Test Log",
              },
              {
                name: "Electrical Troubleshooting Flowcharts",
                size: "155 KB",
                format: "PDF",
                link: "Flowcharts",
              },
              {
                name: "Compressor Preventive PM Checklist",
                size: "38 KB",
                format: "PDF",
                link: "PM Checklist",
              },
            ].map((res, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-border bg-slate-950/40 hover:border-primary/40 transition flex justify-between items-center group"
              >
                <div className="space-y-1 max-w-[70%]">
                  <span
                    className="text-[10px] text-primary block font-semibold truncate"
                    title={res.name}
                  >
                    {res.name}
                  </span>
                  <span className="text-[9px] text-muted-foreground block">
                    {res.size} · {res.format} Format
                  </span>
                </div>
                <button
                  onClick={() => toast.success(`Simulating download of resource file: ${res.name}`)}
                  className="px-2.5 py-1.5 rounded-lg border border-border/80 bg-slate-900 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition text-[10px]"
                >
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Card */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="border border-emerald-500/20 bg-emerald-500/5 p-5 rounded-2xl flex gap-4 items-start">
            <Award className="h-8 w-8 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Fast Field Tools
              </h4>
              <h3 className="text-sm font-bold text-foreground">
                Diagnostic Superheat &amp; Subcooling
              </h3>
              <p className="text-xs text-muted-foreground leading-normal">
                Technicians can calculate superheat or subcooling on location. Simply enter
                suction/liquid pressure and temperature measurements to get diagnostic assessments.
              </p>
              <div className="flex gap-3 pt-1">
                <Link
                  to="/tools/superheat-calculator"
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  Superheat &rarr;
                </Link>
                <Link
                  to="/tools/subcooling-calculator"
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  Subcooling &rarr;
                </Link>
              </div>
            </div>
          </div>

          <div className="border border-primary/20 bg-primary/5 p-5 rounded-2xl flex gap-4 items-start">
            <TrendingUp className="h-8 w-8 text-primary shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-primary uppercase tracking-wider">
                Energy &amp; Savings
              </h4>
              <h3 className="text-sm font-bold text-foreground">Calculate Savings ROI</h3>
              <p className="text-xs text-muted-foreground leading-normal">
                Compare modern 5-star inverter split systems or high-COP chillers with older
                systems. Calculate electrical payback periods instantly.
              </p>
              <Link
                to="/interactive/roi"
                className="text-xs font-semibold text-primary hover:underline pt-1 block"
              >
                Try ROI Calculator &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ResourceLayout>
  );
}
