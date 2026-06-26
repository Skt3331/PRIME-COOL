import { Link } from "@tanstack/react-router";
import { Phone, CheckCircle, MapPin, ShieldCheck, Clock, Award } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getCmsSettings } from "../../lib/api";

interface CityViewProps {
  cityName: string;
  districts: string[];
  services: { title: string; desc: string }[];
}

function CityServiceLayout({ cityName, districts, services }: CityViewProps) {
  const { data } = useQuery({
    queryKey: ["cmsSettings"],
    queryFn: () => getCmsSettings(),
  });
  const cms = data?.settings;
  const phone = cms?.socials?.phone || "+917507408461";

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-xs font-semibold text-primary">
          <MapPin className="h-3.5 w-3.5" />
          <span>Local Service Hub — {cityName}</span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold font-display text-foreground leading-tight">
          Refrigeration Services & Cold Storage Solutions in <span className="text-gradient">{cityName}</span>
        </h1>
        
        <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
          Prime Cool Solutions delivers rapid-response mechanical repairs, ductable AC installations, heavy commercial chillers, and warehouse-scale cold room storage systems across the {cityName} metropolitan region.
        </p>
      </div>

      {/* Call To Action Block */}
      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="text-base font-bold text-foreground">Need Urgent Cooling Repairs in {cityName}?</h3>
          <p className="text-xs text-muted-foreground">Get in touch with Saurav Temgire for immediate technician dispatch.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={`tel:${phone.replace(/\s+/g, "")}`}
            className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/95 transition inline-flex items-center gap-1.5 shadow-lg shadow-primary/25"
          >
            <Phone className="h-4 w-4" />
            <span>Call {phone}</span>
          </a>
          <Link
            to="/booking"
            className="px-5 py-2.5 rounded-xl border border-border hover:bg-card/40 text-xs font-semibold text-foreground transition"
          >
            Book Online
          </Link>
        </div>
      </div>

      {/* Grid of services */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold font-display text-foreground">Specialized HVAC/R Solutions Offered</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          {services.map((srv, idx) => (
            <div key={idx} className="bg-card/25 border border-border/60 p-5 rounded-2xl space-y-2 hover:border-primary/40 transition">
              <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                <span>{srv.title}</span>
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed pl-6">{srv.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Service Coverage Area */}
      <div className="bg-card/10 border border-border/40 p-5 rounded-2xl space-y-3">
        <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">Service Coverage Districts</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          We ensure direct, fully-equipped technician travel to key commercial and industrial hubs:
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {districts.map((d, idx) => (
            <span key={idx} className="bg-background border border-border/60 px-2.5 py-1 rounded-lg text-[10px] text-foreground font-mono">
              {d}
            </span>
          ))}
        </div>
      </div>

      {/* Why Choose Prime Cool Solutions */}
      <div className="grid sm:grid-cols-3 gap-4 pt-4">
        <div className="flex gap-2.5 items-start text-xs text-muted-foreground">
          <Clock className="h-5 w-5 text-primary shrink-0" />
          <div>
            <strong className="text-foreground">2-Hour Emergency Response</strong>
            <p className="mt-0.5">Rapid dispatch for cold rooms and chiller breakdowns to protect stock.</p>
          </div>
        </div>
        <div className="flex gap-2.5 items-start text-xs text-muted-foreground">
          <ShieldCheck className="h-5 w-5 text-primary shrink-0" />
          <div>
            <strong className="text-foreground">OEM Genuine Spare Parts</strong>
            <p className="mt-0.5">We utilize only original manufacturer components for repairs.</p>
          </div>
        </div>
        <div className="flex gap-2.5 items-start text-xs text-muted-foreground">
          <Award className="h-5 w-5 text-primary shrink-0" />
          <div>
            <strong className="text-foreground">Certified HVAC/R Engineers</strong>
            <p className="mt-0.5">Experienced crew trained on Ammonia, CO2, and modern high-pressure safety systems.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 1. Pune View
export function PuneServicesView() {
  const districts = [
    "Wagholi",
    "Lonikand",
    "Koregaon Bhima",
    "Shikrapur",
    "Karegaon",
    "Ranjangaon MIDC",
    "Shirur",
    "Hadapsar",
    "Kharadi",
    "Chakan MIDC",
  ];

  const services = [
    {
      title: "MIDC Industrial Chiller Overhauling",
      desc: "Comprehensive compressor replacements, heat exchanger cleaning, condenser pump maintenance, and water-glycol chemistry testing for manufacturing plants in Ranjangaon and Chakan.",
    },
    {
      title: "Commercial Cold Storage Installation",
      desc: "Custom assembly of PUF panels, walk-in coolers, freezer room walk-ins, and high-efficiency hermetic condensing units for agricultural distribution centers.",
    },
    {
      title: "Wagholi-Shirur Express Maintenance",
      desc: "Emergency HVAC breakdowns, gas leak location via electronic detector, evaporator coil unfreezing, and commercial split installations.",
    },
    {
      title: "Preventive Maintenance AMC Contracts",
      desc: "Yearly contracts ensuring monthly checklist inspections, coil jet cleaning, filter updates, and electrical safety diagnostics for showrooms and warehouses.",
    },
  ];

  return <CityServiceLayout cityName="Pune" districts={districts} services={services} />;
}

// 2. Mumbai View
export function MumbaiServicesView() {
  const districts = [
    "Thane",
    "Navi Mumbai",
    "Panvel",
    "Bandra-Kurla Complex (BKC)",
    "Andheri East",
    "Taloja MIDC",
    "Bhiwandi Warehousing Hub",
  ];

  const services = [
    {
      title: "Bhiwandi Cold Storage & Warehousing Maintenance",
      desc: "Heavy-duty low-temperature freezer maintenance, cold curtain installations, and rapid defrost timer diagnostics for logistics facilities.",
    },
    {
      title: "BKC Corporate HVAC Chiller Services",
      desc: "Building Management System (BMS) integration, chiller water loop pump overhauling, energy-saving COP improvements, and duct cleaning.",
    },
    {
      title: "Taloja MIDC Industrial Cooling Solutions",
      desc: "Process water cooling, chemical storage refrigeration loops, ammonia coil pressure testing, and heavy semi-hermetic compressor rebuilds.",
    },
    {
      title: "Coastal Condenser Corrosion Treatment",
      desc: "Specialized anti-corrosion chemical coating (epoxy fins protection) to survive Mumbai's high-salinity air environment.",
    },
  ];

  return <CityServiceLayout cityName="Mumbai" districts={districts} services={services} />;
}

// 3. Nashik View
export function NashikServicesView() {
  const districts = [
    "Satpur MIDC",
    "Ambad MIDC",
    "Sinnar MIDC",
    "Panchavati",
    "Ozar",
    "Deolali",
    "Lasalgaon Onion/Grape Cold Storages",
  ];

  const services = [
    {
      title: "Lasalgaon Agri-Refrigeration & Fruit Ripening Rooms",
      desc: "Precision humidity controls and cold storage units designed for grape, onion, and pomegranate preservation.",
    },
    {
      title: "Satpur & Sinnar Process Water Chillers",
      desc: "Factory mold cooling, laser cutting machine cooling loops, electrical panel cooler repairs, and preventative oil changes.",
    },
    {
      title: "Commercial Refrigerant Conversion",
      desc: "Phasing out R22 systems in favor of eco-friendly, energy-efficient replacements like R407C or R448A.",
    },
    {
      title: "Multi-Compressor Rack Controls",
      desc: "Programming PLC controls and variable speed drives (VFD) for refrigeration compressor racks to reduce electricity consumption.",
    },
  ];

  return <CityServiceLayout cityName="Nashik" districts={districts} services={services} />;
}
