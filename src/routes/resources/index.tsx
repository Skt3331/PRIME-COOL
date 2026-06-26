import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
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
  Award
} from "lucide-react";

export const Route = createFileRoute("/resources/")({
  component: ResourcesDashboard,
});

function ResourcesDashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      name: "Calculators",
      icon: Calculator,
      desc: "Interactive sizing and unit converters for refrigeration loop diagnostics.",
      items: [
        { name: "BTU Load", path: "/tools/btu-calculator", desc: "Room dimensions to BTU cooling load." },
        { name: "AC Tonnage", path: "/tools/tonnage-calculator", desc: "Estimate AC tonnage from sq ft." },
        { name: "Refrigerant PT", path: "/tools/pt-calculator", desc: "Pressure to saturation temp lookup." },
        { name: "Superheat", path: "/tools/superheat-calculator", desc: "TXV and fixed-orifice diagnostic calculations." },
        { name: "Subcooling", path: "/tools/subcooling-calculator", desc: "Condenser liquid subcooling checks." },
        { name: "Airflow (CFM)", path: "/tools/cfm-calculator", desc: "CFM volume from tonnage and delta T." },
        { name: "Duct Size", path: "/tools/duct-calculator", desc: "Equal friction method duct diameter." },
        { name: "Pipe Sizing", path: "/tools/pipe-sizing", desc: "Liquid and suction copper line sizing." },
        { name: "Cooling Load", path: "/tools/cooling-load", desc: "Structural heat gain calculations." },
        { name: "Energy Consumption", path: "/tools/energy-calculator", desc: "Monthly electrical bills and carbon footprint." },
        { name: "Vacuum Converter", path: "/tools/vacuum-convert", desc: "Microns to Torr, Pascal, and mbar." },
        { name: "Psychrometric", path: "/tools/psychrometric", desc: "Dew point, wet bulb, and humidity ratio." },
        { name: "COP & EER", path: "/tools/cop-eer", desc: "Coefficient of performance conversions." },
        { name: "Compressor Capacity", path: "/tools/compressor-capacity", desc: "CC displacement to BTU cooling power." },
        { name: "Refrigerant Charge", path: "/tools/charge-calculator", desc: "Additional refrigerant charge for extra lines." },
        { name: "Temp Converter", path: "/tools/temp-convert", desc: "Convert Celsius, Fahrenheit, and Kelvin." },
        { name: "Pressure-Temp Converter", path: "/tools/pressure-temp", desc: "Convert PSI, Bar, and kPa units." },
      ],
    },
    {
      name: "Troubleshooting Guides",
      icon: BookOpen,
      desc: "Step-by-step diagnostic articles to debug complex AC and chiller faults.",
      items: [
        { name: "AC Not Cooling", path: "/guides/ac-not-cooling", desc: "15 common causes for no cooling." },
        { name: "Low Suction Pressure", path: "/guides/low-suction", desc: "Low side pressure drops diagnostics." },
        { name: "High Head Pressure", path: "/guides/high-head", desc: "Condenser heat dissipation faults." },
        { name: "Compressor Short Cycling", path: "/guides/short-cycling", desc: "Why compressors turn off rapidly." },
        { name: "Evaporator Freezing", path: "/guides/coil-freezing", desc: "Preventing liquid washback and ice blocks." },
        { name: "Walk-In Cooler Warm", path: "/guides/walk-in-warm", desc: "Troubleshooting warm commercial coolers." },
        { name: "Refrigerant Leak", path: "/guides/leak-symptoms", desc: "Spotting bubbles and oil spots on piping." },
        { name: "Check Superheat", path: "/guides/how-to-superheat", desc: "How to place sensors and gauge lines." },
        { name: "Measure Subcooling", path: "/guides/how-to-subcooling", desc: "Step-by-step charging diagnostic guides." },
      ],
    },
    {
      name: "Refrigerant PT Charts",
      icon: Thermometer,
      desc: "Antoine formula pressure-temperature tables for active field servicing.",
      items: [
        { name: "R134a PT Sheet", path: "/refrigerants/r134a", desc: "Automotive and domestic fridge ref." },
        { name: "R410A PT Sheet", path: "/refrigerants/r410a", desc: "Residential split air conditioner pressures." },
        { name: "R32 PT Sheet", path: "/refrigerants/r32", desc: "Modern low-GWP mildly flammable R32." },
        { name: "R404A PT Sheet", path: "/refrigerants/r404a", desc: "Low temperature commercial freezer rooms." },
        { name: "R407C PT Sheet", path: "/refrigerants/r407c", desc: "R22 replacement systems diagnostics." },
      ],
    },
    {
      name: "Formulas & References",
      icon: FileText,
      desc: "Core mechanical engineering calculations and formula cheat sheets.",
      items: [
        { name: "HVAC Formulas", path: "/formulas/hvac", desc: "CFM, sensible, latent, and total heat load." },
        { name: "Refrigeration Formulas", path: "/formulas/refrigeration", desc: "Compression ratio, COP, and cycle loops." },
      ],
    },
    {
      name: "Interactive Tools",
      icon: Brain,
      desc: "Diagnostics wizards, technician quizzes, and payback selectors.",
      items: [
        { name: "HVAC/R Quiz", path: "/interactive/quiz", desc: "10-question technical competency quiz." },
        { name: "Troubleshooting Wizard", path: "/interactive/wizard", desc: "Interactive symptom diagnostic flow tree." },
        { name: "Refrigerant Selector", path: "/interactive/selector", desc: "GWP and safety class refrigerant match." },
        { name: "Cost Estimator", path: "/interactive/cost-estimator", desc: "Ac installation material and labor cost estimate." },
        { name: "PM Checklist Gen", path: "/interactive/checklist", desc: "Custom preventative maintenance checklists." },
        { name: "HVAC ROI Calculator", path: "/interactive/roi", desc: "Inverter energy upgrade payback periods." },
      ],
    },
    {
      name: "Local Service Hubs",
      icon: MapPin,
      desc: "Region-specific commercial refrigeration and AMC support centers.",
      items: [
        { name: "Pune Services", path: "/cities/pune", desc: "Wagholi, Ranjangaon, Chakan repairs." },
        { name: "Mumbai Services", path: "/cities/mumbai", desc: "Thane, Bhiwandi, Taloja industrial cooling." },
        { name: "Nashik Services", path: "/cities/nashik", desc: "Lasalgaon agri cold rooms and chillers." },
      ],
    },
  ];

  // Flattened items for search filter
  const allItems = categories.flatMap((cat) =>
    cat.items.map((item) => ({ ...item, categoryName: cat.name }))
  );

  const filteredItems = allItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
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
            A comprehensive reference center for HVAC/R technicians, design engineers, and commercial managers. Size pipes, verify subcooling/superheat metrics, view pressure-temperature Antoine charts, and troubleshoot faults dynamically.
          </p>
        </div>

        {/* Quick Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search calculators, troubleshooting guides, PT charts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-border bg-background/50 pl-10 pr-4 py-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary placeholder-muted-foreground"
          />
        </div>

        {searchQuery ? (
          /* Search Results */
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-foreground">Search Results ({filteredItems.length})</h3>
            {filteredItems.length > 0 ? (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="p-4 rounded-2xl border border-border hover:border-primary/50 bg-card/20 hover:bg-card/40 transition block space-y-1"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] uppercase text-primary font-semibold font-mono">{item.categoryName}</span>
                    </div>
                    <h4 className="font-bold text-foreground text-sm">{item.name}</h4>
                    <p className="text-xs text-muted-foreground leading-snug">{item.desc}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">No resources matching your search query.</p>
            )}
          </div>
        ) : (
          /* Category Dashboards */
          <div className="grid md:grid-cols-2 gap-6">
            {categories.map((cat) => {
              const CatIcon = cat.icon;
              return (
                <div key={cat.name} className="border border-border/40 bg-card/10 rounded-2xl p-5 space-y-4 hover:border-primary/20 transition">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 text-primary">
                      <CatIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold font-display text-foreground text-base">{cat.name}</h3>
                      <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">{cat.desc}</p>
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

        {/* Featured Card */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="border border-emerald-500/20 bg-emerald-500/5 p-5 rounded-2xl flex gap-4 items-start">
            <Award className="h-8 w-8 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Fast Field Tools</h4>
              <h3 className="text-sm font-bold text-foreground">Diagnostic Superheat &amp; Subcooling</h3>
              <p className="text-xs text-muted-foreground leading-normal">Technicians can calculate superheat or subcooling on location. Simply enter suction/liquid pressure and temperature measurements to get diagnostic assessments.</p>
              <div className="flex gap-3 pt-1">
                <Link to="/tools/superheat-calculator" className="text-xs font-semibold text-primary hover:underline">Superheat &rarr;</Link>
                <Link to="/tools/subcooling-calculator" className="text-xs font-semibold text-primary hover:underline">Subcooling &rarr;</Link>
              </div>
            </div>
          </div>

          <div className="border border-primary/20 bg-primary/5 p-5 rounded-2xl flex gap-4 items-start">
            <TrendingUp className="h-8 w-8 text-primary shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Energy &amp; Savings</h4>
              <h3 className="text-sm font-bold text-foreground">Calculate Savings ROI</h3>
              <p className="text-xs text-muted-foreground leading-normal">Compare modern 5-star inverter split systems or high-COP chillers with older systems. Calculate electrical payback periods instantly.</p>
              <Link to="/interactive/roi" className="text-xs font-semibold text-primary hover:underline pt-1 block">Try ROI Calculator &rarr;</Link>
            </div>
          </div>
        </div>
      </div>
    </ResourceLayout>
  );
}
