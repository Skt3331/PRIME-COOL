import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { brandsData, BrandDetail } from "../../lib/brands-data";
import { getCmsSettings, getLocations } from "../../lib/api";
import {
  ArrowLeft,
  Phone,
  Calendar,
  Wrench,
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  CheckCircle,
  MapPin,
  Clock,
  Star,
  Zap,
  Gauge,
  Thermometer,
  Layers,
  ArrowRight,
  Activity,
  Cpu,
  Flame,
  CheckCircle2,
  Building2,
  Tag,
  Search,
  Sparkles,
  Radio,
  Tv,
  Check,
  FileCheck,
} from "lucide-react";
import { useState, useMemo } from "react";
import { Breadcrumbs } from "../../components/Breadcrumbs";

// Locality Information Registry
const LOCALITY_REGISTRY: Record<
  string,
  {
    hub: string;
    isMidc: boolean;
    landmarks: string[];
    adjacent: string[];
    operatingConditions: string;
    powerCondition: string;
  }
> = {
  "ranjangaon-midc": {
    hub: "Ranjangaon Industrial & Electronics Corridor",
    isMidc: true,
    landmarks: ["Ranjangaon MIDC Phase 1-3", "Electronics Zone", "LG & Whirlpool Corridor", "Pune-Nagar Highway"],
    adjacent: ["Karegaon", "Sanaswadi", "Shikrapur", "Shirur", "Kondhapuri", "Wagholi"],
    operatingConditions: "Heavy industrial 24/7 continuous thermal loads, cleanroom HVAC standards, and high summer ambient heat reaching 43°C.",
    powerCondition: "Three-phase 415V industrial lines with heavy motor inductive switching transients.",
  },
  "chakan-midc": {
    hub: "Chakan Auto & Heavy Engineering Belt",
    isMidc: true,
    landmarks: ["Chakan Industrial Area Phase 1-4", "Auto Cluster", "Mercedes-Benz & VW Corridor", "Talegaon Link"],
    adjacent: ["Bhosari MIDC", "Talegaon", "Moshi", "Kuruli", "Mahalunge", "Alandi"],
    operatingConditions: "High ambient factory dust, machining coolant mist, and continuous compressor duty cycles.",
    powerCondition: "Industrial grid requiring active surge arrestors and phase monitors.",
  },
  "bhosari-midc": {
    hub: "Bhosari PCMC Manufacturing Spine",
    isMidc: true,
    landmarks: ["Bhosari MIDC", "Telco Circle", "Century Enka", "PCMC Industrial Corridor"],
    adjacent: ["Chakan MIDC", "Nigdi", "Akurdi", "Pimpri", "Moshi", "Dighi"],
    operatingConditions: "Machining heat loads, hydraulic oil circulation, and high thermal fluctuation.",
    powerCondition: "Heavy industrial grid with intermittent switching spikes.",
  },
  wagholi: {
    hub: "Pune East Residential & Tech Corridor",
    isMidc: false,
    landmarks: ["Wagheshwar Temple", "Bakori Road", "Lexicon School", "Ubale Nagar"],
    adjacent: ["Kharadi", "Viman Nagar", "Kesnand", "Lonikand", "Awhalwadi"],
    operatingConditions: "High TDS borewell water scaling (550+ ppm) and peak residential summer heat loads.",
    powerCondition: "Residential 230V single phase with evening peak voltage drops.",
  },
  kharadi: {
    hub: "Kharadi Premier IT & Commercial Megacity",
    isMidc: false,
    landmarks: ["EON IT Park", "World Trade Center", "Zensar Tech Park", "Riverfront Road"],
    adjacent: ["Viman Nagar", "Wagholi", "Hadapsar", "Kalyani Nagar", "Chandan Nagar"],
    operatingConditions: "High-density multi-tenant VRV/VRF systems and 24/7 server room precision cooling.",
    powerCondition: "Dedicated IT power corridor with commercial harmonic filters.",
  },
  hadapsar: {
    hub: "Magarpatta & SP Infocity Corporate Corridor",
    isMidc: false,
    landmarks: ["Magarpatta Cybercity", "SP Infocity", "Amanora Mall", "Noble Hospital"],
    adjacent: ["Kharadi", "Fatima Nagar", "Mundhwa", "Fursungi", "Sasane Nagar"],
    operatingConditions: "Centralized ducted split units, VRV multi-splits, and commercial refrigeration.",
    powerCondition: "Urban commercial grid with dual sub-metering.",
  },
  hinjewadi: {
    hub: "Hinjewadi Rajiv Gandhi IT Megapolis Phase 1-3",
    isMidc: false,
    landmarks: ["Rajiv Gandhi Infotech Park Phase 1-3", "Wipro Circle", "Megapolis"],
    adjacent: ["Wakad", "Baner", "Balewadi", "Marunji", "Punawale"],
    operatingConditions: "Multi-zone VRF systems, cleanroom server PAC cooling, and luxury residential ACs.",
    powerCondition: "Express corporate feeders with dual DG redundancy.",
  },
  baner: {
    hub: "Baner High Street & Commercial Zone",
    isMidc: false,
    landmarks: ["Balewadi High Street", "Pancard Club Road", "Cummins India Corridor"],
    adjacent: ["Aundh", "Balewadi", "Hinjewadi", "Bavdhan", "Pashan"],
    operatingConditions: "Commercial restaurant HVAC, kitchen exhaust balancing, and inverter multi-splits.",
    powerCondition: "Underground urban distribution network.",
  },
  wakad: {
    hub: "Wakad High-Rise Residential Hub",
    isMidc: false,
    landmarks: ["Dutt Mandir", "Bhumkar Chowk", "Kaspate Vasti"],
    adjacent: ["Hinjewadi", "Pimple Saudagar", "Baner", "Tathawade"],
    operatingConditions: "High-rise split AC condenser air recirculation and heavy summer cooling cycles.",
    powerCondition: "Single & three-phase domestic lines.",
  },
  "pimple-saudagar": {
    hub: "PCMC Premier Residential Belt",
    isMidc: false,
    landmarks: ["Govind Garden", "Linear Garden", "Shivar Chowk"],
    adjacent: ["Wakad", "Aundh", "Pimple Nilakh", "Rahatani"],
    operatingConditions: "Dual inverter split ACs and appliance descaling requirements.",
    powerCondition: "PCMC municipal power grid.",
  },
  kothrud: {
    hub: "Kothrud Central & Pune West Zone",
    isMidc: false,
    landmarks: ["Chandani Chowk", "MIT World Peace University", "Paud Road"],
    adjacent: ["Bavdhan", "Karve Nagar", "Warje", "Deccan"],
    operatingConditions: "Dense residential apartments and clinical healthcare climate control.",
    powerCondition: "Established urban distribution network.",
  },
  "viman-nagar": {
    hub: "Viman Nagar Airport Commercial Zone",
    isMidc: false,
    landmarks: ["Phoenix Marketcity", "Symbiosis Campus", "Airport Road"],
    adjacent: ["Kharadi", "Kalyani Nagar", "Yerawada", "Lohegaon"],
    operatingConditions: "Retail mall air handling, boutique hotel HVAC, and food court refrigeration.",
    powerCondition: "Commercial sub-station line.",
  },
  shikrapur: {
    hub: "Shikrapur Logistics & Manufacturing Hub",
    isMidc: true,
    landmarks: ["Chakan-Shikrapur State Highway", "Logistics Hub", "Pabal Phata"],
    adjacent: ["Sanaswadi", "Koregaon Bhima", "Chakan MIDC", "Shirur"],
    operatingConditions: "Warehouse high-cube ventilation and food storage refrigeration.",
    powerCondition: "Semi-urban industrial feeder.",
  },
  sanaswadi: {
    hub: "Sanaswadi Metallurgy & Manufacturing Belt",
    isMidc: true,
    landmarks: ["Sanaswadi Industrial Estate", "Steel Plants", "Pune-Nagar Highway"],
    adjacent: ["Shikrapur", "Koregaon Bhima", "Ranjangaon MIDC", "Lonikand"],
    operatingConditions: "High ambient factory heat, airborne particulate matter, and heavy machinery.",
    powerCondition: "Heavy 440V industrial substation lines.",
  },
  shirur: {
    hub: "Shirur Industrial & Agricultural Gateway",
    isMidc: true,
    landmarks: ["Shirur MIDC", "Ghod River Bridge", "Bypass Highway"],
    adjacent: ["Karegaon", "Ranjangaon MIDC", "Sanaswadi"],
    operatingConditions: "High summer temperatures up to 43°C and agricultural cold chain cooling.",
    powerCondition: "Regional grid requiring dedicated surge arrestors.",
  },
};

// Brand Pricing Data Registry
const BRAND_SPARES_PRICING: Record<
  string,
  { item: string; price: string; unit: string; warranty: string }[]
> = {
  daikin: [
    { item: "Daikin Genuine Inverter Outdoor Main PCB", price: "₹2,800 - ₹5,800", unit: "Per Board", warranty: "1 Year OEM Warranty" },
    { item: "Daikin Electronic Expansion Valve (EEV) Stepper Coil", price: "₹1,450 - ₹2,400", unit: "Per Coil", warranty: "1 Year OEM Warranty" },
    { item: "Daikin Swing Compressor Dual Rotary (1.5TR)", price: "₹7,500 - ₹12,500", unit: "Per Unit", warranty: "5 Years Warranty" },
    { item: "Daikin Blower DC Fan Motor (Indoor/Outdoor)", price: "₹1,850 - ₹3,200", unit: "Per Motor", warranty: "1 Year Warranty" },
    { item: "Daikin Thermistor Sensor Set (Room/Coil)", price: "₹650 - ₹1,150", unit: "Per Set", warranty: "6 Months Warranty" },
  ],
  voltas: [
    { item: "Voltas Inverter AC Outdoor Controller PCB", price: "₹2,400 - ₹4,800", unit: "Per Board", warranty: "1 Year OEM Warranty" },
    { item: "Voltas Rotary Compressor (1.5TR 100% Copper)", price: "₹6,800 - ₹10,500", unit: "Per Compressor", warranty: "5 Years Warranty" },
    { item: "Voltas Dual Run Capacitor (45+5 µF 440V)", price: "₹550 - ₹950", unit: "Per Capacitor", warranty: "1 Year Warranty" },
    { item: "Voltas Cross-Flow Blower Fan Wheel", price: "₹950 - ₹1,650", unit: "Per Unit", warranty: "1 Year Structural" },
    { item: "Voltas 4-Way Cassette Condensate Lift Pump", price: "₹1,450 - ₹2,800", unit: "Per Pump", warranty: "1 Year Warranty" },
  ],
  "blue-star": [
    { item: "Blue Star Precision Inverter PCB Mainboard", price: "₹2,600 - ₹5,200", unit: "Per Board", warranty: "1 Year OEM Warranty" },
    { item: "Blue Star Highly / GMCC Rotary Compressor", price: "₹6,900 - ₹11,200", unit: "Per Compressor", warranty: "5 Years Warranty" },
    { item: "Blue Star Commercial Deep Freezer Fan Motor", price: "₹1,250 - ₹2,400", unit: "Per Motor", warranty: "1 Year Warranty" },
    { item: "Blue Star DX Coil Copper Expansion Valve", price: "₹1,650 - ₹2,950", unit: "Per Valve", warranty: "1 Year Warranty" },
    { item: "Blue Star Digital Temperature Controller (Carel/Dixell)", price: "₹1,850 - ₹3,400", unit: "Per Controller", warranty: "1 Year Warranty" },
  ],
  lg: [
    { item: "LG Dual Inverter IPM Outdoor Mainboard", price: "₹2,800 - ₹5,500", unit: "Per Board", warranty: "1 Year OEM Warranty" },
    { item: "LG Dual Inverter Twin-Rotary Compressor", price: "₹7,800 - ₹13,500", unit: "Per Compressor", warranty: "10 Years Warranty" },
    { item: "LG BLDC Condenser Fan Motor (Waterproof)", price: "₹1,950 - ₹3,400", unit: "Per Motor", warranty: "1 Year OEM Warranty" },
    { item: "LG Smart Diagnosis Wi-Fi Controller Module", price: "₹1,250 - ₹2,100", unit: "Per Module", warranty: "1 Year Warranty" },
    { item: "LG Gold-Fin Anti-Corrosion Copper Coil U-Bend", price: "₹750 - ₹1,450", unit: "Per Section", warranty: "1 Year Warranty" },
  ],
  carrier: [
    { item: "Carrier Inverter AC Electronic Control Board", price: "₹2,700 - ₹5,400", unit: "Per Board", warranty: "1 Year OEM Warranty" },
    { item: "Carrier Heavy-Duty Rotary / Scroll Compressor", price: "₹7,200 - ₹12,800", unit: "Per Compressor", warranty: "5 Years Warranty" },
    { item: "Carrier Indoor Tangential Blower Motor", price: "₹1,750 - ₹2,950", unit: "Per Motor", warranty: "1 Year Warranty" },
    { item: "Carrier 4-Way Reversing Valve (Heat Pump)", price: "₹1,950 - ₹3,600", unit: "Per Valve", warranty: "1 Year Warranty" },
    { item: "Carrier Air Purifying High-Density Filter Set", price: "₹650 - ₹1,200", unit: "Per Set", warranty: "Genuine OEM" },
  ],
  hitachi: [
    { item: "Hitachi Tropical Inverter PCB Board (52°C Rated)", price: "₹3,200 - ₹6,500", unit: "Per Board", warranty: "1 Year OEM Warranty" },
    { item: "Hitachi Scroll / Twin Rotary Compressor", price: "₹8,200 - ₹14,500", unit: "Per Compressor", warranty: "5 Years Warranty" },
    { item: "Hitachi Stepper Motor Air Deflector Louvre", price: "₹850 - ₹1,550", unit: "Per Unit", warranty: "1 Year Warranty" },
    { item: "Hitachi Cascading System Temperature Sensor Array", price: "₹850 - ₹1,450", unit: "Per Array", warranty: "1 Year Warranty" },
    { item: "Hitachi SuperCool Multi-Row Condenser Fin Block", price: "₹3,200 - ₹6,800", unit: "Per Coil Block", warranty: "1 Year Warranty" },
  ],
  samsung: [
    { item: "Samsung WindFree Inverter Mainboard PCB", price: "₹2,600 - ₹5,200", unit: "Per Board", warranty: "1 Year OEM Warranty" },
    { item: "Samsung Digital Inverter 8-Pole Compressor", price: "₹7,400 - ₹12,600", unit: "Per Compressor", warranty: "10 Years Warranty" },
    { item: "Samsung DuraFin+ Anti-Corrosion Condenser Fan", price: "₹1,850 - ₹3,100", unit: "Per Motor", warranty: "1 Year Warranty" },
    { item: "Samsung Micro-Holes Front Panel Assembly", price: "₹1,650 - ₹2,800", unit: "Per Panel", warranty: "Genuine OEM" },
    { item: "Samsung Multi-Stage Tri-Care Antibacterial Filter", price: "₹750 - ₹1,350", unit: "Per Filter", warranty: "Genuine OEM" },
  ],
  panasonic: [
    { item: "Panasonic nanoe-X Inverter PCB Control Unit", price: "₹2,800 - ₹5,600", unit: "Per Board", warranty: "1 Year OEM Warranty" },
    { item: "Panasonic Twin-Rotary Inverter Compressor", price: "₹7,600 - ₹13,200", unit: "Per Compressor", warranty: "5 Years Warranty" },
    { item: "Panasonic Shield BLDC Outdoor Fan Motor", price: "₹1,950 - ₹3,300", unit: "Per Motor", warranty: "1 Year Warranty" },
    { item: "Panasonic nanoe-G Air Purification Generator Kit", price: "₹1,450 - ₹2,600", unit: "Per Kit", warranty: "1 Year Warranty" },
    { item: "Panasonic Blue Fin Anti-Rust Condenser Core", price: "₹2,900 - ₹5,800", unit: "Per Core", warranty: "1 Year Warranty" },
  ],
};

const DEFAULT_BRAND_SPARES = [
  { item: "OEM Inverter Controller PCB Mainboard", price: "₹2,500 - ₹5,200", unit: "Per Board", warranty: "1 Year OEM Warranty" },
  { item: "100% Copper Rotary / Inverter Compressor", price: "₹6,800 - ₹12,500", unit: "Per Compressor", warranty: "5 Years Warranty" },
  { item: "Outdoor BLDC Condenser Fan Motor", price: "₹1,650 - ₹3,100", unit: "Per Motor", warranty: "1 Year Warranty" },
  { item: "Dual Run Capacitor (45+5 µF 440V Heavy Duty)", price: "₹550 - ₹950", unit: "Per Capacitor", warranty: "1 Year OEM Warranty" },
  { item: "Digital Thermistor Sensor Harness & Relay", price: "₹650 - ₹1,250", unit: "Per Set", warranty: "6 Months Warranty" },
];

const APPLIANCE_MAPPING: Record<
  string,
  {
    title: string;
    category: string;
    desc: string;
    faults: string[];
    spares: string[];
    faqs: { q: string; a: string }[];
  }
> = {
  ac: {
    title: "Air Conditioner Servicing & Jet Cleaning",
    category: "Air Conditioning",
    desc: "Certified split, cassette, window, and inverter AC maintenance. High-pressure coil wash, PCB restoration, and weight-based gas charging.",
    faults: [
      "No cooling / low cooling symptoms",
      "Gas leak on copper joints or condenser bends",
      "Indoor unit water leakage from clogged drain tray",
      "PCB communication error or remote controller unresponsive",
    ],
    spares: ["OEM Run Capacitors", "Replacement PCBs", "Thermistor sensors", "Drain lift pumps"],
    faqs: [
      {
        q: "How often should my inverter AC be jet washed?",
        a: "For tropical conditions, a high-pressure jet cleaning is recommended twice a year (before summer and post-monsoon) to prevent dust blockages.",
      },
      {
        q: "Do you use genuine brand gas during recharging?",
        a: "Yes, we use certified R32, R410A, or R22 refrigerants filled strictly by pressure and digital scale weights.",
      },
    ],
  },
  fridge: {
    title: "Refrigerator Diagnostics & Compressor Repair",
    category: "Refrigeration",
    desc: "Double-door, side-by-side, and commercial refrigerator troubleshooting. Relays, PCB control cards, sensor calibrations, and gas charging.",
    faults: [
      "Compressor makes a starting click-out sound but doesn't run",
      "Freezer freezes food but the lower compartment remains warm",
      "Defrost timer failure causing evaporator ice buildup",
      "Excessive noise from fan motor or compressor brackets",
    ],
    spares: [
      "Starting Relays & Overload Protectors (OLP)",
      "Bimetal Defrost Thermostats",
      "Digital Inverter Control Boards",
      "Door Gaskets & Magnetic Seals",
    ],
    faqs: [
      {
        q: "Why is the fridge cooling in the freezer but warm below?",
        a: "This is usually caused by a blocked air damper, failed defrost heater, or faulty evaporator fan motor preventing cold air circulation.",
      },
      {
        q: "How much does a refrigerator compressor replacement cost?",
        a: "Pricing depends on tonnage and refrigerant type (R134a/R600a), starting from ₹2,499 including gas charging and vacuum testing.",
      },
    ],
  },
  "washing-machine": {
    title: "Washing Machine Mechanical & PCB Overhaul",
    category: "Laundry Appliances",
    desc: "Front-load and top-load washing machine repairs. Drum bearings, inlet valves, drain pumps, suspension shocks, and inverter drive boards.",
    faults: [
      "Excessive vibration or grinding noise during high-speed spin cycle",
      "Water not draining out (OE / E2 error codes)",
      "Drum not rotating despite motor hum",
      "Touch panel dead or displaying error codes (IE, PE, dE)",
    ],
    spares: [
      "OEM Drum Bearings & Oil Seals",
      "Drain Discharge Pumps",
      "Pressure Level Sensors",
      "Drive Belts & Suspension Rods",
    ],
    faqs: [
      {
        q: "Why is my washing machine making a loud noise during spinning?",
        a: "A loud roaring noise is typically caused by worn-out drum spider bearings or broken suspension dampener springs.",
      },
      {
        q: "Can you fix the control panel PCB if it is completely dead?",
        a: "Yes, we repair display boards and main power modules at the component level to save you spare part costs.",
      },
    ],
  },
  hvac: {
    title: "Centralized HVAC & VRF/VRV Maintenance",
    category: "Commercial Cooling",
    desc: "Commercial centralized VRF/VRV systems, ductable units, package plants, and chilled water loops. Preventative AMC audits and scroll/screw compressors.",
    faults: [
      "Communication loss along the daisy-chained communication line",
      "Electronic Expansion Valve (EEV) coils short-circuited",
      "High head discharge pressure during peak ambient temperatures",
      "Oil logging in the evaporator circuit causing low transfer",
    ],
    spares: [
      "EEV pulse motors",
      "Industrial contactors & relays",
      "Phase failure monitors",
      "Crankcase heaters",
    ],
    faqs: [
      {
        q: "What is included in commercial HVAC AMC maintenance?",
        a: "Our AMC covers quarterly descaling of condensers, indoor coil checks, filter replacement, electrical loop tightening, and suction/discharge pressure logs.",
      },
      {
        q: "Do you offer priority SLAs for corporate server rooms?",
        a: "Yes, we provide 24/7 emergency response contracts with a guaranteed 4-hour resolution SLA to protect server systems.",
      },
    ],
  },
};

export const Route = createFileRoute("/brands/$slug/$appliance")({
  loader: async ({ params }) => {
    const brandSlug = params.slug.toLowerCase();
    const secondSlug = params.appliance.toLowerCase();

    // 1. Resolve Brand
    let brand = brandsData[brandSlug];
    if (!brand) {
      const formattedBrand = params.slug
        .split("-")
        .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
      brand = {
        name: formattedBrand,
        slug: brandSlug,
        faults: [
          "Outdoor Inverter PCB communication failures",
          "Low refrigerant pressure due to copper coil flare micro-leaks",
          "Compressor starting capacitor degradation under peak summer load",
          "Condenser fin blockage and thermal high-pressure cutout",
        ],
        spares: [
          `Genuine ${formattedBrand} Inverter PCB Mainboards`,
          `OEM ${formattedBrand} Rotary & Scroll Compressors`,
          "BLDC Condenser Fan Motors & Bearings",
          "Electronic Expansion Valves (EEV) & Thermistors",
        ],
        maintenance: [
          "Connect digital telemetry service analyzer to log running frequency and amps",
          "Execute 450 PSI dry nitrogen pressure decay hold test on copper joints",
          "Deep vacuum dehydration under 350 microns using two-stage rotary pump",
          "Recharge 100% pure virgin refrigerant by gram-scale weight",
        ],
        warranty: "1 Year Comprehensive on PCB & Electricals, 5 to 10 Years on Inverter Compressor.",
        errorCodes: [
          { code: "E1 / F0", symptom: "Inverter IPM overcurrent / communication fail", fix: "Micro-solder IPM power module, verify DC bus rail, inspect signal wiring." },
          { code: "E4 / F3", symptom: "Compressor discharge high temperature (>115°C)", fix: "Check refrigerant subcooling, clean condenser coil, replace discharge thermistor." },
          { code: "E6 / CH05", symptom: "Indoor to outdoor transmission loop severed", fix: "Inspect optical couplers, test shielded cable continuity, reset PCB transceiver." },
          { code: "LP / HP", symptom: "High/Low pressure safety cutoff interlock", fix: "Perform nitrogen pressure hold, braze leak, refill virgin refrigerant by weight." },
        ],
      };
    }

    // Check if second slug is a known Appliance
    const appliance = APPLIANCE_MAPPING[secondSlug];
    const { settings } = await getCmsSettings();

    if (appliance) {
      return {
        mode: "appliance" as const,
        brand,
        appliance,
        applianceKey: secondSlug,
        cms: settings,
        location: null,
        locCtx: null,
        sparesPricing: [],
      };
    }

    // Otherwise, treat as Location Slug (Brand Authorized Service Center by Location)
    const locationsResp = await getLocations();
    let location = locationsResp.locations.find(
      (l: any) => l.slug === secondSlug,
    );

    if (!location) {
      const formattedLocName = secondSlug
        .split("-")
        .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
      const locCtx = LOCALITY_REGISTRY[secondSlug];

      location = {
        slug: secondSlug,
        name: formattedLocName,
        pincodes: ["411001"],
        type: locCtx?.isMidc ? "midc" : "locality",
        faqs: [],
        reviews: [],
        landmarks: locCtx?.landmarks || [formattedLocName + " Center"],
        nearbyBusinesses: locCtx?.adjacent || ["Pune", "PCMC"],
        mapEmbedUrl: "",
      };
    }

    const locCtx = LOCALITY_REGISTRY[secondSlug] || {
      hub: `${location.name} Service Belt`,
      isMidc: location.type === "midc",
      landmarks: location.landmarks || [location.name],
      adjacent: location.nearbyBusinesses || ["Pune", "PCMC"],
      operatingConditions: "High ambient summer temperatures and seasonal humidity fluctuations.",
      powerCondition: "Standard electrical distribution with potential voltage spikes.",
    };

    const sparesPricing = BRAND_SPARES_PRICING[brandSlug] || DEFAULT_BRAND_SPARES;

    return {
      mode: "location" as const,
      brand,
      appliance: null,
      applianceKey: null,
      cms: settings,
      location,
      locCtx,
      sparesPricing,
    };
  },
  head: ({ loaderData }) => {
    const brand = loaderData?.brand;
    if (!brand) return { meta: [] };

    if (loaderData.mode === "location" && loaderData.location) {
      const loc = loaderData.location;
      const pageTitle = `24x7 ${brand.name} Authorized Service Center in ${loc.name} | Certified Engineers | Prime Cool`;
      const pageDesc = `Fast, certified ${brand.name} AC repair, PCB micro-soldering, gas charging & appliance service in ${loc.name} (${loaderData.locCtx?.hub}). 100% Genuine OEM parts, 45-min doorstep dispatch, certified engineers. Call +91 7507408461.`;

      return {
        meta: [
          { title: pageTitle },
          { name: "description", content: pageDesc },
          { property: "og:title", content: pageTitle },
          { property: "og:description", content: pageDesc },
          { property: "og:type", content: "business.business" },
          { property: "og:locale", content: "en_IN" },
          {
            name: "keywords",
            content: `${brand.name} service center ${loc.name}, ${brand.name} AC repair ${loc.name}, ${brand.name} authorized service center ${loc.name}, ${brand.name} customer care number ${loc.name}, ${brand.name} inverter PCB repair ${loc.name}, Prime Cool Pune`,
          },
          { name: "geo.region", content: "IN-MH" },
          { name: "geo.placename", content: `${loc.name}, Pune, Maharashtra, India` },
          { name: "geo.position", content: "18.5793;73.9827" },
          { name: "ICBM", content: "18.5793, 73.9827" },
        ],
        links: [
          {
            rel: "canonical",
            href: `https://primecool.in/brands/${brand.slug}/${loc.slug}`,
          },
        ],
      };
    }

    const app = loaderData.appliance;
    const pageTitle = `${brand.name} ${app?.title || "Repair"} — Prime Cool`;
    const pageDesc = `Specialized ${brand.name} ${app?.category || "Appliance"} repair services in Pune. Genuine spare parts, certified diagnostics, and fast turnaround.`;

    return {
      meta: [
        { title: pageTitle },
        { name: "description", content: pageDesc },
        { property: "og:title", content: pageTitle },
        { property: "og:description", content: pageDesc },
      ],
      links: [
        {
          rel: "canonical",
          href: `https://primecool.in/brands/${brand.slug}/${loaderData.applianceKey}`,
        },
      ],
    };
  },
  component: BrandApplianceOrLocationPage,
});

function BrandApplianceOrLocationPage() {
  const data = Route.useLoaderData();

  if (data.mode === "location") {
    return <BrandLocationView data={data} />;
  }

  return <BrandApplianceView data={data} />;
}

// -------------------------------------------------------------
// VIEW 1: BRAND AUTHORIZED SERVICE CENTER IN LOCATION
// -------------------------------------------------------------
function BrandLocationView({ data }: { data: any }) {
  const { brand, location, locCtx, sparesPricing, cms } = data;
  const phone = cms?.socials?.phone || "+917507408461";

  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [searchCode, setSearchCode] = useState("");
  const [selectedApplianceTab, setSelectedApplianceTab] = useState<string>("split-ac");

  const filteredErrors = useMemo(() => {
    return (brand.errorCodes || []).filter(
      (err: any) =>
        err.code.toLowerCase().includes(searchCode.toLowerCase()) ||
        err.symptom.toLowerCase().includes(searchCode.toLowerCase()) ||
        err.fix.toLowerCase().includes(searchCode.toLowerCase()),
    );
  }, [brand.errorCodes, searchCode]);

  const APPLIANCE_TABS = [
    { id: "split-ac", label: "Split Inverter AC", badge: "Same-Day Fix", desc: `High-pressure jet chemical wash, R-32/R-410A gas leak brazing, and IPM board micro-soldering for all ${brand.name} residential split systems.` },
    { id: "cassette-ac", label: "4-Way Cassette AC", badge: "Commercial", desc: `Commercial ceiling cassette 4-way airflow balancing, condensate lift pump replacement, and louvre swing motor repairs in ${location.name}.` },
    { id: "vrv-vrf", label: "VRV / VRF Central HVAC", badge: "Multi-Zone", desc: `Comprehensive engineering diagnostics for ${brand.name} multi-zone VRV/VRF systems, branch selector boxes, and building automation BMS loops.` },
    { id: "refrigerator", label: "Inverter Refrigerator", badge: "Doorstep", desc: `Double door, side-by-side, and frost-free ${brand.name} refrigerator inverter compressor starting repairs, bimetal defrost switches, and gas charging.` },
    { id: "washing-machine", label: "Washing Machine", badge: "All Models", desc: `Front load & top load ${brand.name} washing machine drum bearing replacement, inverter Direct Drive motor boards, and drainage pump repairs.` },
  ];

  const TOP_BRANDS_NAV = [
    { slug: "daikin", name: "Daikin" },
    { slug: "voltas", name: "Voltas" },
    { slug: "blue-star", name: "Blue Star" },
    { slug: "lg", name: "LG Electronics" },
    { slug: "carrier", name: "Carrier" },
    { slug: "hitachi", name: "Hitachi" },
    { slug: "samsung", name: "Samsung" },
    { slug: "panasonic", name: "Panasonic" },
    { slug: "mitsubishi-electric", name: "Mitsubishi Electric" },
    { slug: "godrej", name: "Godrej" },
    { slug: "haier", name: "Haier" },
    { slug: "lloyd", name: "Lloyd" },
  ];

  const NEARBY_HUBS_NAV = [
    { slug: "ranjangaon-midc", name: "Ranjangaon MIDC" },
    { slug: "chakan-midc", name: "Chakan MIDC" },
    { slug: "bhosari-midc", name: "Bhosari MIDC" },
    { slug: "wagholi", name: "Wagholi" },
    { slug: "kharadi", name: "Kharadi" },
    { slug: "hadapsar", name: "Hadapsar" },
    { slug: "hinjewadi", name: "Hinjewadi" },
    { slug: "baner", name: "Baner" },
    { slug: "kothrud", name: "Kothrud" },
    { slug: "viman-nagar", name: "Viman Nagar" },
    { slug: "shikrapur", name: "Shikrapur" },
    { slug: "sanaswadi", name: "Sanaswadi" },
  ].filter((h) => h.slug !== location.slug);

  const FAQS = [
    {
      q: `Are you an authorized service partner for ${brand.name} in ${location.name}?`,
      a: `Yes! Prime Cool operates certified multi-brand HVAC and appliance service workshops with direct access to 100% genuine ${brand.name} OEM compressors, PCB boards, fan motors, and sensors. All service procedures adhere strictly to ${brand.name} factory engineering specifications.`,
    },
    {
      q: `How fast can a certified ${brand.name} technician arrive at my location in ${location.name}?`,
      a: `We guarantee a 30 to 45 minute doorstep arrival in ${location.name} and surrounding areas (${(locCtx?.adjacent || []).slice(0, 3).join(", ")}). For industrial facilities in ${location.name}, our emergency response team operates on a 60-90 minute breakdown SLA.`,
    },
    {
      q: `Can you repair my ${brand.name} Inverter AC PCB board without replacing it?`,
      a: `Yes! Over 90% of ${brand.name} inverter PCB failures are caused by burnt IPM IGBT modules, SMPS diodes, or optocoupler communication loops. Our micro-soldering specialists repair boards at the component level, saving you up to 70% compared to purchasing a brand-new mainboard.`,
    },
    {
      q: `Do you provide a warranty on ${brand.name} spare parts and repairs in ${location.name}?`,
      a: `Every genuine ${brand.name} spare part installed carries an official 6 to 24 month manufacturer warranty. In addition, Prime Cool provides a 90-day comprehensive service and leak-free labor guarantee.`,
    },
    {
      q: `What is the starting inspection charge for ${brand.name} appliances in ${location.name}?`,
      a: `Our doorstep inspection fee starts from just ₹299 to ₹499 in ${location.name}, which covers complete electrical health testing, digital manifold pressure logging, and diagnostic fault code readout.`,
    },
    {
      q: `Do you supply genuine ${brand.name} refrigerant gas for recharging?`,
      a: `Yes. We strictly use 100% virgin, sealed cylinders of R-32, R-410A, and R-134a refrigerants filled by digital electronic scale weight after pulling a deep two-stage vacuum under 350 microns.`,
    },
  ];

  const schemaGraph = [
    {
      "@context": "https://schema.org",
      "@type": ["HVACBusiness", "LocalBusiness"],
      name: `Prime Cool ${brand.name} Authorized Service Center - ${location.name}`,
      image: cms?.theme?.logo || "https://primecool.in/logo.png",
      telephone: phone,
      priceRange: "₹₹",
      address: {
        "@type": "PostalAddress",
        addressLocality: location.name,
        addressRegion: "Maharashtra",
        postalCode: location.pincodes?.[0] || "411001",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 18.5793,
        longitude: 73.9827,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "00:00",
          closes: "23:59",
        },
      ],
      areaServed: [
        { "@type": "Place", name: location.name },
        ...(locCtx?.adjacent || []).map((n: string) => ({ "@type": "Place", name: n })),
      ],
      description: `Certified ${brand.name} air conditioning, refrigeration, and appliance service center in ${location.name}. Genuine OEM spare parts, 45-min doorstep arrival, and certified engineers.`,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: 184,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `${brand.name} Repair & Maintenance in ${location.name}`,
      provider: {
        "@type": "LocalBusiness",
        name: "Prime Cool",
        telephone: phone,
        image: cms?.theme?.logo || "https://primecool.in/logo.png",
      },
      areaServed: {
        "@type": "Place",
        name: location.name,
      },
      description: `Certified ${brand.name} HVAC, refrigerator, washing machine, and commercial cooling repair in ${location.name}.`,
      offers: {
        "@type": "Offer",
        price: "499",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://primecool.in/" },
        { "@type": "ListItem", position: 2, name: "Brands", item: "https://primecool.in/brands" },
        { "@type": "ListItem", position: 3, name: brand.name, item: `https://primecool.in/brands/${brand.slug}` },
        { "@type": "ListItem", position: 4, name: `${brand.name} Service Center in ${location.name}`, item: `https://primecool.in/brands/${brand.slug}/${location.slug}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.a,
        },
      })),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-foreground selection:bg-sky-500/30 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      {/* Ambient background glows */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),transparent_70%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none" />

      {/* Main Container */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-8 pb-20 z-10 space-y-16">
        <Breadcrumbs />

        {/* 1. HERO SECTION */}
        <section className="grid lg:grid-cols-12 gap-8 items-center pt-2">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 text-xs font-semibold text-sky-400 font-mono uppercase tracking-wider shadow-[0_0_15px_rgba(14,165,233,0.2)]">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Certified {brand.name} Service Center · {location.name}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-mono font-medium text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Active Field Vans in {locCtx?.landmarks?.[0] || location.name}</span>
              </div>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white tracking-tight">
              {brand.name} AC & Appliance <br />
              <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                Authorized Service Center
              </span>{" "}
              in {location.name}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
              Official doorstep repair, inverter PCB micro-soldering, 450 PSI nitrogen leak testing, and 100% genuine OEM spare parts for all{" "}
              <strong className="text-white font-medium">{brand.name}</strong> split ACs, inverters, cassettes, VRV/VRF systems, refrigerators, and washing machines across {location.name}.
            </p>

            {/* Quick CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/booking"
                search={{}}
                className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold px-8 py-4 text-sm shadow-xl shadow-sky-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Calendar className="h-4 w-4" />
                <span>Book {brand.name} Repair Online</span>
              </Link>
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-2.5 rounded-full border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-white font-semibold px-8 py-4 text-sm transition-all transform hover:-translate-y-0.5 cursor-pointer backdrop-blur-sm shadow-md"
              >
                <Phone className="h-4 w-4 text-sky-400" />
                <span>24/7 Hotline: {phone}</span>
              </a>
            </div>

            {/* SLA Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-sky-400 shrink-0" />
                <span>{locCtx?.isMidc ? "90-Min Industrial SLA" : "45-Min Doorstep Arrival"}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-sky-400 shrink-0" />
                <span>100% Genuine {brand.name} Spares</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <Star className="h-4 w-4 text-amber-400 fill-amber-400 shrink-0" />
                <span>4.9/5 Rating (180+ Reviews)</span>
              </div>
            </div>
          </div>

          {/* Brand Technical Profile Card */}
          <div className="lg:col-span-5 rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 space-y-6 shadow-2xl shadow-slate-950/80">
            <div className="space-y-2 border-b border-slate-800/80 pb-5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-sky-400 uppercase font-bold tracking-widest">
                  Official Service Standards
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-mono">
                  <CheckCircle2 className="h-3 w-3" /> Certified Workshop
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                {brand.name} Genuine Spares
              </div>
              <p className="text-xs text-slate-400">{brand.warranty}</p>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-semibold text-slate-200 block uppercase tracking-wider font-mono">
                Factory Diagnostic Protocols in {location.name}:
              </span>
              <ul className="space-y-2.5 text-xs text-slate-300">
                {(brand.maintenance || []).slice(0, 4).map((m: string, idx: number) => (
                  <li key={idx} className="flex gap-2.5 items-start">
                    <CheckCircle className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-slate-950/70 p-4 border border-slate-800/60 flex items-center justify-between text-xs">
              <span className="text-slate-400">Lead Systems Engineer:</span>
              <span className="text-sky-300 font-medium font-mono">Saurav Kailas Temgire</span>
            </div>
          </div>
        </section>

        {/* 2. INTERACTIVE APPLIANCE SELECTOR TABS */}
        <section className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-10 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white flex items-center gap-2">
                <Wrench className="h-5 w-5 text-sky-400" />
                <span>Supported {brand.name} Appliances & Systems in {location.name}</span>
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Select your equipment model to view specialized failure mode diagnostics
              </p>
            </div>
          </div>

          {/* Tab buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
            {APPLIANCE_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedApplianceTab(tab.id)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  selectedApplianceTab === tab.id
                    ? "bg-gradient-to-br from-sky-500/20 to-blue-600/10 border-sky-500 text-white shadow-lg shadow-sky-500/15 scale-[1.02]"
                    : "bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                }`}
              >
                <span className="text-[10px] font-mono uppercase bg-slate-900/80 text-sky-400 px-2 py-0.5 rounded border border-sky-500/20 block w-max mb-2">
                  {tab.badge}
                </span>
                <span className="font-bold text-xs sm:text-sm block text-white">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Active Tab Description Card */}
          <div className="rounded-2xl bg-slate-950/70 border border-slate-800/80 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>
                  {APPLIANCE_TABS.find((t) => t.id === selectedApplianceTab)?.label} Service Scope in {location.name}
                </span>
              </h3>
              <Link
                to="/booking"
                search={{}}
                className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer"
              >
                <span>Book This Service</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              {APPLIANCE_TABS.find((t) => t.id === selectedApplianceTab)?.desc}
            </p>
          </div>
        </section>

        {/* 3. LOCAL CONTEXT */}
        <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-10 backdrop-blur-md space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                {brand.name} Operational Climate Context in {location.name}
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Real-world thermal loads, ambient heat dissipation, and electrical grid behavior
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-300 leading-relaxed pt-2">
            <div className="space-y-3 rounded-2xl bg-slate-950/60 p-5 border border-slate-800/60">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <Flame className="h-4 w-4 text-amber-400" />
                <span>Ambient Climate & Heat Dissipation:</span>
              </h3>
              <p>{locCtx?.operatingConditions}</p>
              <div className="text-xs text-slate-400 pt-2 border-t border-slate-800/60">
                <span className="text-slate-300 font-medium block">Technician Protocol:</span>
                We calibrate {brand.name} compressor superheat and subcooling to prevent thermal high-head cutouts during peak summer operations.
              </div>
            </div>

            <div className="space-y-3 rounded-2xl bg-slate-950/60 p-5 border border-slate-800/60">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <Zap className="h-4 w-4 text-sky-400" />
                <span>Power Line Spikes & Voltage Surge Clamping:</span>
              </h3>
              <p>{locCtx?.powerCondition}</p>
              <div className="text-xs text-slate-400 pt-2 border-t border-slate-800/60">
                <span className="text-slate-300 font-medium block">Technician Protocol:</span>
                We install industrial-grade MOV varistors on {brand.name} inverter PCB logic rails to protect delicate microcontrollers from inductive switching surges.
              </div>
            </div>
          </div>
        </section>

        {/* 4. GENUINE OEM SPARE PARTS PRICING TABLE */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Tag className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                Genuine {brand.name} Spare Parts & Labor Pricing (INR ₹)
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Official OEM spare parts catalog with transparent rates and manufacturer warranty in {location.name}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900/50 shadow-xl backdrop-blur-md">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80 font-mono text-[11px] uppercase tracking-wider text-emerald-400">
                  <th className="p-4 sm:p-5 font-semibold">Genuine {brand.name} Component</th>
                  <th className="p-4 sm:p-5 font-semibold">Price Range (₹)</th>
                  <th className="p-4 sm:p-5 font-semibold">Billing Unit</th>
                  <th className="p-4 sm:p-5 font-semibold">Warranty Terms</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {sparesPricing.map((item: any, idx: number) => (
                  <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 sm:p-5 font-medium text-white">{item.item}</td>
                    <td className="p-4 sm:p-5 font-bold text-emerald-400">{item.price}</td>
                    <td className="p-4 sm:p-5 text-slate-400 font-mono text-xs">{item.unit}</td>
                    <td className="p-4 sm:p-5 text-sky-300 font-medium">{item.warranty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 5. BRAND ERROR CODES */}
        {brand.errorCodes && brand.errorCodes.length > 0 && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                    {brand.name} Error Code Diagnostic Matrix
                  </h2>
                  <p className="text-xs text-slate-400 font-mono">
                    Search official {brand.name} fault codes, root causes, and certified technician solutions
                  </p>
                </div>
              </div>

              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  placeholder={`Search ${brand.name} error code (e.g. U4, E1, CH05)...`}
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-inner"
                />
              </div>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900/50 shadow-xl backdrop-blur-md">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/80 font-mono text-[11px] uppercase tracking-wider text-amber-400">
                    <th className="p-4 sm:p-5 font-semibold w-32">Error Code</th>
                    <th className="p-4 sm:p-5 font-semibold">Fault Symptom</th>
                    <th className="p-4 sm:p-5 font-semibold">Certified Engineering Remedy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredErrors.map((err: any, idx: number) => (
                    <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-4 sm:p-5 font-mono font-bold text-amber-400">{err.code}</td>
                      <td className="p-4 sm:p-5 font-medium text-white">{err.symptom}</td>
                      <td className="p-4 sm:p-5 text-sky-300 bg-sky-500/5 font-medium">{err.fix}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* 6. 6-STAGE BRAND SOP */}
        <section className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-10 backdrop-blur-md">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400">
              <Wrench className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                6-Stage Certified {brand.name} Standard Operating Procedure (SOP)
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Factory Standard Operating Procedure executed on every {brand.name} job
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {[
              { title: `${brand.name} Diagnostic Telemetry`, desc: `Connect ${brand.name} Service Checker or smart diagnosis scanner to read live compressor frequency, inverter current, and sensor logs.` },
              { title: "450 PSI Nitrogen Leak Hold", desc: `Pressurize copper evaporator and condenser loops with dry nitrogen to 450 PSI to detect microscopic cracks before refrigerant top-up.` },
              { title: "IPM PCB Micro-soldering", desc: `Micro-solder damaged IGBT power modules, replace 15V gate drivers, and bench-test inverter controller under simulated load.` },
              { title: "< 350 Micron Deep Dehydration", desc: `Evacuate circuit using a dual-stage rotary vacuum pump to under 350 microns, eliminating moisture that degrades POE synthetic oil.` },
              { title: "Gram-Scale Virgin Refrigerant Charge", desc: `Recharge 100% pure virgin OEM refrigerant (R-32 / R-410A / R-404A) strictly by nameplate weight using digital scales.` },
              { title: "Delta-T & Fluke Thermal Certification", desc: `Measure 10°C to 14°C delta-T temperature differential across supply/return air louvers and generate computerized health certificate.` },
            ].map((step, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-5 space-y-3 relative group hover:border-sky-500/40 transition-all shadow"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-display font-black text-sky-500/40 group-hover:text-sky-400 transition-colors">
                    0{idx + 1}
                  </span>
                  <span className="text-[10px] font-mono uppercase bg-slate-900 text-sky-400 border border-sky-500/20 px-2.5 py-0.5 rounded-full">
                    Stage {idx + 1}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white">{step.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-light">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. FAQS */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400">
              <HelpCircle className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                Frequently Asked Questions ({brand.name} in {location.name})
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Verified answers regarding {brand.name} repair SLAs, spare parts warranty, and technicians
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden transition-all shadow"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-white hover:text-sky-300 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span
                      className={`text-sky-400 font-bold text-lg transition-transform duration-200 shrink-0 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/40">
                      <p className="pt-3">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 8. CROSS-LINKING GRID */}
        <section className="space-y-12">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8">
            <h3 className="text-lg font-bold font-display text-white mb-2 flex items-center gap-2">
              <Building2 className="h-4 w-4 text-sky-400" />
              <span>Other Brand Service Centers in {location.name}</span>
            </h3>
            <p className="text-xs text-slate-400 mb-6 font-mono">
              Explore authorized technician support for all leading HVAC and appliance manufacturers in {location.name}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {TOP_BRANDS_NAV.map((b, idx) => (
                <Link
                  key={idx}
                  to="/brands/$slug/$appliance"
                  params={{ slug: b.slug, appliance: location.slug }}
                  className={`p-3.5 rounded-xl border text-xs font-medium transition-all ${
                    b.slug === brand.slug
                      ? "bg-sky-500/20 border-sky-500 text-sky-300 font-bold"
                      : "bg-slate-950/60 border-slate-800/80 text-slate-300 hover:text-white hover:border-slate-700 hover:bg-slate-900"
                  }`}
                >
                  {b.name} Center in {location.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8">
            <h3 className="text-lg font-bold font-display text-white mb-2 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-sky-400" />
              <span>{brand.name} Service Centers Across Pune & PCMC</span>
            </h3>
            <p className="text-xs text-slate-400 mb-6 font-mono">
              Certified {brand.name} mobile technical units stationed across all key localities
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {NEARBY_HUBS_NAV.map((h, idx) => (
                <Link
                  key={idx}
                  to="/brands/$slug/$appliance"
                  params={{ slug: brand.slug, appliance: h.slug }}
                  className="p-3.5 rounded-xl border border-slate-800/80 bg-slate-950/60 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-700 hover:bg-slate-900 transition-all flex items-center justify-between"
                >
                  <span>{brand.name} in {h.name}</span>
                  <ArrowRight className="h-3 w-3 text-slate-500 shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 9. EMERGENCY CALLOUT */}
        <section className="rounded-3xl border border-sky-500/30 bg-gradient-to-br from-slate-900 via-sky-950/40 to-slate-900 p-8 sm:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.12),transparent_70%)] pointer-events-none" />
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest">
              Emergency {brand.name} Breakdown Dispatch · {location.name}
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white">
              Need Immediate {brand.name} Repair in {location.name}?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              Our mobile technical vans carry pre-staged OEM {brand.name} compressors, capacitors, fan motors, and refrigerant cylinders for same-day recovery.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 relative z-10 pt-2">
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold px-8 py-4 text-sm shadow-xl shadow-sky-500/30 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Phone className="h-4 w-4" />
              <span>Call Lead Engineer Now ({phone})</span>
            </a>
            <Link
              to="/booking"
              search={{}}
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 py-4 text-sm transition-all cursor-pointer"
            >
              <Calendar className="h-4 w-4 text-sky-400" />
              <span>Schedule Inspection Slot</span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

// -------------------------------------------------------------
// VIEW 2: BRAND APPLIANCE SPECIALIZED VIEW (ac, fridge, etc.)
// -------------------------------------------------------------
function BrandApplianceView({ data }: { data: any }) {
  const { brand, appliance, applianceKey, cms } = data;
  const phone = cms?.socials?.phone || "+917507408461";
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${brand.name} ${appliance.title}`,
    provider: {
      "@type": "LocalBusiness",
      name: "Prime Cool",
      telephone: phone,
      image: cms?.theme?.logo || "https://primecool.in/logo.png",
    },
    description: appliance.desc,
    areaServed: {
      "@type": "City",
      name: "Pune",
    },
  };

  return (
    <div className="min-h-screen bg-slate-950 text-foreground selection:bg-sky-500/30 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),transparent_70%)] pointer-events-none" />

      <main className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-10 pb-20 space-y-12 z-10">
        <Breadcrumbs />

        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono font-semibold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{brand.name} Specialized Technical Division</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white">
            {brand.name} {appliance.title}
          </h1>
          <p className="text-slate-300 text-base leading-relaxed font-light">{appliance.desc}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4 backdrop-blur-md">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-400" />
              <span>Common {brand.name} Breakdown Symptoms</span>
            </h2>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
              {appliance.faults.map((f: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-amber-400 font-bold">›</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4 backdrop-blur-md">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
              <span>Genuine OEM {brand.name} Spare Parts</span>
            </h2>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
              {appliance.spares.map((s: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-sky-400" />
            <span>Frequently Asked Questions</span>
          </h2>
          <div className="space-y-3">
            {appliance.faqs.map((f: any, idx: number) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex justify-between items-center text-xs sm:text-sm font-semibold text-white hover:text-sky-300 cursor-pointer"
                  >
                    <span>{f.q}</span>
                    <span className="text-sky-400 font-bold text-lg">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 border-t border-slate-800/40 pt-3 leading-relaxed">
                      {f.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-3xl border border-sky-500/30 bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 p-8 sm:p-12 text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">Need Rapid {brand.name} Appliance Service?</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto font-light">
            Book our certified technician for 45-minute doorstep dispatch across Pune & PCMC.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              to="/booking"
              search={{}}
              className="px-8 py-3.5 rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shadow-lg shadow-sky-500/25 transition cursor-pointer"
            >
              Book Service Online
            </Link>
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="px-8 py-3.5 rounded-full border border-slate-700 bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition cursor-pointer"
            >
              Call {phone}
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
