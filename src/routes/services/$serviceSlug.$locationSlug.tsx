import { createFileRoute, Link } from "@tanstack/react-router";
import { servicesData, ServiceDetail } from "../../lib/services-data";
import { getCmsSettings, getLocations } from "../../lib/api";
import {
  ArrowLeft,
  Phone,
  Calendar,
  MapPin,
  ShieldCheck,
  Clock,
  CheckCircle,
  Star,
  AlertTriangle,
  HelpCircle,
  Zap,
  Wrench,
  Gauge,
  Thermometer,
  Layers,
  ArrowRight,
  Activity,
  Cpu,
  Flame,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import { Breadcrumbs } from "../../components/Breadcrumbs";

// Comprehensive Area & Adjacent Hubs Registry
const LOCALITY_CONTEXT: Record<
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
    operatingConditions: "Heavy industrial 24/7 continuous thermal loads, electronic assembly cleanroom standards, and chemical ambient resistance.",
    powerCondition: "Three-phase 415V utility supply with heavy inductive motor switching surges.",
  },
  "chakan-midc": {
    hub: "Chakan Automobile & Heavy Engineering Belt",
    isMidc: true,
    landmarks: ["Chakan Industrial Area Phase 1-4", "Auto Cluster", "Mercedes-Benz & VW Corridor", "Talegaon Link"],
    adjacent: ["Bhosari MIDC", "Talegaon", "Moshi", "Kuruli", "Mahalunge", "Alandi", "Rajgurunagar"],
    operatingConditions: "High ambient metal dust, CNC tool coolant mist, and heavy factory compressor duty.",
    powerCondition: "Industrial grid with high harmonic distortion requiring active power factor management.",
  },
  "bhosari-midc": {
    hub: "Bhosari PCMC Manufacturing Spine",
    isMidc: true,
    landmarks: ["Bhosari MIDC", "Telco Circle", "Century Enka", "PCMC Industrial Corridor"],
    adjacent: ["Chakan MIDC", "Nigdi", "Akurdi", "Pimpri", "Moshi", "Dighi"],
    operatingConditions: "Continuous machining heat loads, heavy hydraulic oil circulation, and high thermal fluctuation.",
    powerCondition: "High-voltage industrial substation lines with intermittent switching transients.",
  },
  "talawade-midc": {
    hub: "Talawade IT Park & PCMC Industrial Area",
    isMidc: true,
    landmarks: ["Talawade Software Park", "MIDC Phase 1", "Dehu-Alandi Road"],
    adjacent: ["Nigdi", "Chikhali", "Moshi", "Bhosari"],
    operatingConditions: "Data center precision cooling (PAC) and industrial fabrication thermal dissipation.",
    powerCondition: "Dual-source grid with automated UPS and DG synchronized failovers.",
  },
  sanaswadi: {
    hub: "Sanaswadi MIDC & Metallurgy Corridor",
    isMidc: true,
    landmarks: ["Sanaswadi Industrial Estate", "Steel Plants", "Pune-Nagar Highway"],
    adjacent: ["Shikrapur", "Koregaon Bhima", "Ranjangaon MIDC", "Lonikand"],
    operatingConditions: "Severe high-temperature foundry environments, airborne dust, and corrosive vapors.",
    powerCondition: "Heavy industrial loads requiring robust 440V surge clamping.",
  },
  shikrapur: {
    hub: "Shikrapur Logistics & Manufacturing Hub",
    isMidc: true,
    landmarks: ["Chakan-Shikrapur State Highway", "Logistics Hub", "Pabal Phata"],
    adjacent: ["Sanaswadi", "Koregaon Bhima", "Chakan MIDC", "Shirur"],
    operatingConditions: "Warehouse high-cube ventilation and food processing cold room storage.",
    powerCondition: "Semi-urban industrial grid with seasonal voltage fluctuations.",
  },
  karegaon: {
    hub: "Karegaon Industrial & Cold Chain Belt",
    isMidc: true,
    landmarks: ["Karegaon MIDC", "Nagar Highway", "Sarola Road"],
    adjacent: ["Ranjangaon MIDC", "Shirur", "Shikrapur"],
    operatingConditions: "High-capacity cold chain storage, freezing tunnels, and heavy industrial machinery.",
    powerCondition: "High load industrial feeders with power factor penalty zones.",
  },
  shirur: {
    hub: "Shirur MIDC & East Pune Gateway",
    isMidc: true,
    landmarks: ["Shirur MIDC", "Ghod River Bridge", "Bypass Highway"],
    adjacent: ["Karegaon", "Ranjangaon MIDC", "Sanaswadi"],
    operatingConditions: "High summer ambient temperatures reaching 43°C and agricultural processing storage.",
    powerCondition: "Regional grid requiring dedicated surge arrestors and phase monitors.",
  },
  wagholi: {
    hub: "Pune East Residential & Highway Corridor",
    isMidc: false,
    landmarks: ["Wagheshwar Temple", "Bakori Road", "Lexicon School", "Ubale Nagar"],
    adjacent: ["Kharadi", "Viman Nagar", "Kesnand", "Lonikand", "Awhalwadi"],
    operatingConditions: "Hard borewell water (TDS 550+ ppm) and high summer ambient residential heat.",
    powerCondition: "Residential 230V single phase with evening peak voltage drops.",
  },
  kharadi: {
    hub: "Kharadi Flagship IT & Commercial Megacity",
    isMidc: false,
    landmarks: ["EON IT Park", "World Trade Center", "Zensar Tech Park", "Riverfront Road"],
    adjacent: ["Viman Nagar", "Wagholi", "Hadapsar", "Kalyani Nagar", "Chandan Nagar"],
    operatingConditions: "High-density multi-tenant VRV/VRF systems and 24/7 server room PAC units.",
    powerCondition: "Dedicated IT sub-grid with high harmonic filtering.",
  },
  hadapsar: {
    hub: "Magarpatta & SP Infocity Corporate Corridor",
    isMidc: false,
    landmarks: ["Magarpatta Cybercity", "SP Infocity", "Amanora Mall", "Noble Hospital"],
    adjacent: ["Kharadi", "Fatima Nagar", "Mundhwa", "Fursungi", "Sasane Nagar"],
    operatingConditions: "Centralized chiller loops, ducted split systems, and commercial kitchen HVAC.",
    powerCondition: "Urban commercial grid with smart sub-metering.",
  },
  hinjewadi: {
    hub: "Hinjewadi Rajiv Gandhi IT Megapolis Phase 1-3",
    isMidc: false,
    landmarks: ["Rajiv Gandhi Infotech Park Phase 1-3", "Wipro Circle", "Megapolis"],
    adjacent: ["Wakad", "Baner", "Balewadi", "Marunji", "Punawale"],
    operatingConditions: "High-tonnage commercial chillers, cleanroom data centers, and multi-zone VRF.",
    powerCondition: "Express corporate feeders with dual DG redundancy.",
  },
  baner: {
    hub: "Baner Commercial High Street & IT Annex",
    isMidc: false,
    landmarks: ["Balewadi High Street", "Pancard Club Road", "Cummins India Corridor"],
    adjacent: ["Aundh", "Balewadi", "Hinjewadi", "Bavdhan", "Pashan"],
    operatingConditions: "Restaurant kitchen exhaust balancing and luxury apartment inverter ACs.",
    powerCondition: "Urban underground cabling with steady voltage.",
  },
  wakad: {
    hub: "Wakad High-Density Residential & Tech Zone",
    isMidc: false,
    landmarks: ["Dutt Mandir", "Bhumkar Chowk", "Kaspate Vasti"],
    adjacent: ["Hinjewadi", "Pimple Saudagar", "Baner", "Tathawade"],
    operatingConditions: "High-rise split AC condenser air recirculation and high seasonal usage.",
    powerCondition: "Single/three phase domestic lines with summer current peaks.",
  },
  "pimple-saudagar": {
    hub: "PCMC Premier Residential Corridor",
    isMidc: false,
    landmarks: ["Govind Garden", "Linear Garden", "Shivar Chowk"],
    adjacent: ["Wakad", "Aundh", "Pimple Nilakh", "Rahatani"],
    operatingConditions: "High TDS washing machine scaling and multi-split inverter residential systems.",
    powerCondition: "PCMC municipal power grid.",
  },
  kothrud: {
    hub: "Kothrud Central & Pune West Zone",
    isMidc: false,
    landmarks: ["Chandani Chowk", "MIT World Peace University", "Paud Road"],
    adjacent: ["Bavdhan", "Karve Nagar", "Warje", "Deccan"],
    operatingConditions: "Dense residential apartments, clinical laboratories, and heritage commercial units.",
    powerCondition: "Established urban distribution network.",
  },
  "viman-nagar": {
    hub: "Viman Nagar Airport & Commercial Corridor",
    isMidc: false,
    landmarks: ["Phoenix Marketcity", "Symbiosis Campus", "Airport Road"],
    adjacent: ["Kharadi", "Kalyani Nagar", "Yerawada", "Lohegaon"],
    operatingConditions: "Commercial retail air handling, food court refrigeration, and boutique hotel HVAC.",
    powerCondition: "Commercial sub-station line.",
  },
};

// Complete Service Category Mapping & Dynamic Generator
export const getComprehensiveServiceData = (
  serviceSlug: string,
  locationName: string,
  isMidc: boolean,
): {
  title: string;
  categoryName: string;
  tagline: string;
  description: string;
  priceEstimate: string;
  specs: { metric: string; standard: string; highEfficiency: string }[];
  faults: { code: string; symptom: string; cause: string; remedy: string }[];
  prices: { item: string; price: string; unit: string; warranty: string }[];
  features: string[];
  process: string[];
  faqs: { q: string; a: string }[];
} => {
  const key = serviceSlug.toLowerCase();

  // 1. GAS CHARGING & LEAK REPAIR
  if (key.includes("gas") || key.includes("charging") || key.includes("leak")) {
    return {
      title: key.includes("leak") ? "AC Gas Leak Detection & Precision Brazing" : "AC Gas Charging & Refrigerant Recharge",
      categoryName: "Refrigerant Management & Pressure Diagnostics",
      tagline: `450 PSI dry nitrogen pressure decay testing, copper brazing, and electronic weight-based R-32/R-410A charging in ${locationName}.`,
      description: `Operating air conditioners in ${locationName} under high summer ambient peaks frequently stresses copper flare joints and U-bends. Our certified engineers use oxygen-acetylene brazing, 450 PSI dry nitrogen leak hold tests, and two-stage rotary vacuuming (<500 microns) before charging virgin OEM refrigerants.`,
      priceEstimate: "Starts from ₹2,200 (Inclusive of Gas & Leak Test)",
      specs: [
        { metric: "Refrigerant Options", standard: "R-32 / R-410A / R-22", highEfficiency: "Low-GWP Virgin R-32 (100% Purity)" },
        { metric: "Nitrogen Test Pressure", standard: "350 - 400 PSI", highEfficiency: "450 - 500 PSI Extended 2-Hour Hold" },
        { metric: "Evacuation Vacuum Level", standard: "1000 Microns", highEfficiency: "< 350 Microns (Deep Two-Stage)" },
        { metric: "Charging Methodology", standard: "Manifold Pressure Estimate", highEfficiency: "Digital Micro-Scale Gram Precision" },
      ],
      faults: [
        { code: "F3 / E4", symptom: "Compressor Discharge Overheat (>115°C)", cause: "Low refrigerant gas volume or pinched expansion valve", remedy: "Perform nitrogen pressure hold, braze flare joint, recharge by weight" },
        { code: "E2 / CL", symptom: "Indoor Evaporator Ice Formation", cause: "Low suction pressure (<90 PSI) starving evaporator coils", remedy: "Clear capillary block, leak test condenser return bends, refill gas" },
        { code: "LP Trip", symptom: "Low Pressure Interlock Switch Cutout", cause: "Complete loss of refrigerant through hairline pipe crack", remedy: "Recover residual oil, silver solder crack, 90-day leak-free guarantee" },
      ],
      prices: [
        { item: "R-32 Virgin Gas Charging (Up to 1.5 Ton)", price: "₹2,200 - ₹2,800", unit: "Per Machine", warranty: "90 Days Leak Warranty" },
        { item: "R-410A Eco Inverter Gas Charging", price: "₹2,500 - ₹3,200", unit: "Per Machine", warranty: "90 Days Leak Warranty" },
        { item: "Nitrogen Pressure Decay Leak Test (450 PSI)", price: "₹650 - ₹950", unit: "Per Circuit", warranty: "Comprehensive Audit" },
        { item: "Copper U-Bend / Flare Joint Oxygen-Acetylene Brazing", price: "₹450 - ₹850", unit: "Per Joint", warranty: "1 Year Structural" },
      ],
      features: [
        "High-pressure Dry Nitrogen Decay Test up to 500 PSI",
        "Oxygen-Acetylene Silver Brazing on cracked copper coils",
        "Two-Stage Rotary Vacuuming below 350 microns",
        "Electronic Gram-Scale Precision Refrigerant Charging",
        "Delta-T Thermal Imaging Validation before signoff",
      ],
      process: [
        "Connect digital manifold gauges to log standing and running suction/discharge pressures",
        "Recover remaining contaminated gas into recovery cylinder and pressurize circuit with dry Nitrogen to 450 PSI",
        "Perform ultrasonic leak detection and soap-bubble scanning across all flare nuts and service valves",
        "Brazing damaged copper return bends using high-grade silver brazing alloy",
        "Hook up two-stage rotary vane vacuum pump and pull deep vacuum under 350 microns",
        "Weigh exact nameplate refrigerant charge using digital scales and log 8°C-12°C delta-T drop",
      ],
      faqs: [
        {
          q: `Why is an extended nitrogen test required for AC gas charging in ${locationName}?`,
          a: `Ambient vibrations and thermal expansion in ${locationName} cause micro-cracks at copper flare joints. A 450 PSI nitrogen test proves structural integrity before expensive refrigerant is added.`,
        },
        {
          q: `How long does an AC gas recharge take in ${locationName}?`,
          a: `A complete professional gas recharge—including leak detection, brazing, 30-minute vacuuming, and weight charging—takes approximately 60 to 90 minutes.`,
        },
        {
          q: `Do you provide a warranty on AC gas filling in ${locationName}?`,
          a: `Yes! Every complete gas charging service in ${locationName} includes our 90-day unconditional leak-free warranty.`,
        },
      ],
    };
  }

  // 2. CHILLERS & PROCESS COOLING
  if (key.includes("chiller") || key.includes("process-cooling") || key.includes("cnc")) {
    return {
      title: key.includes("cnc") ? "CNC Spindle & Hydraulic Oil Chiller Servicing" : "Industrial Process Chiller Maintenance & Overhauls",
      categoryName: "Industrial Heavy Engineering & Heat Transfer",
      tagline: `Screw, scroll & centrifugal process chillers (50 to 500 TR) overhaul, tube descaling, and IKW/TR optimization in ${locationName}.`,
      description: `Manufacturing and processing plants across ${locationName} require continuous, uninterrupted process water chilling. Our industrial mechanical engineers service semi-hermetic twin-screw compressors, descale shell-and-tube evaporators, optimize slide valve modulation, and analyze POE lubricant dielectric breakdown.`,
      priceEstimate: "Custom Industrial Quote / AMC Contracts Available",
      specs: [
        { metric: "Chiller Capacity Range", standard: "10 TR to 75 TR (Packaged Scroll)", highEfficiency: "50 TR to 500 TR (Semi-Hermetic Screw / Centrifugal)" },
        { metric: "Specific Power Draw", standard: "0.88 - 0.95 IKW / TR", highEfficiency: "0.56 - 0.65 IKW / TR (VFD Optimized)" },
        { metric: "Evaporator Approach Delta", standard: "3.5°C - 5.0°C", highEfficiency: "1.2°C - 2.0°C (After Ultrasonic Descaling)" },
        { metric: "Vibration RMS Velocity", standard: "< 4.5 mm/s", highEfficiency: "< 1.8 mm/s (Laser Precision Aligned)" },
      ],
      faults: [
        { code: "High Head Trip", symptom: "Condenser Pressure > 390 PSI", cause: "Severe scaling inside water tubes or cooling tower fan trip", remedy: "Chemical descaling of shell-and-tube bundle & water flow balancing" },
        { code: "Low Oil Diff", symptom: "Oil Pressure Differential < 35 PSI", cause: "Clogged oil filter element, foaming lubricant, or slide valve leak", remedy: "Replace OEM oil separator filter, renew synthetic POE oil charge" },
        { code: "Freeze-Stat Trip", symptom: "Evaporator Exit Water < 3.5°C", cause: "Low chilled water flow rate or faulty flow switch paddle", remedy: "Clean inline Y-strainer, calibrate electronic flow sensor, balance loop" },
      ],
      prices: [
        { item: "Shell & Tube Condenser / Evaporator Chemical Descaling", price: "₹6,500 - ₹18,500", unit: "Per Chiller Barrel", warranty: "Guaranteed Delta-T Gain" },
        { item: "Semi-Hermetic Screw Compressor Major Rebuild", price: "₹35,000 - ₹95,000", unit: "Per Compressor", warranty: "1 Year SLA Warranty" },
        { item: "Industrial Synthetic POE / Mineral Oil Renewal + Filter", price: "₹8,500 - ₹18,000", unit: "Per Circuit", warranty: "Spectrographic Certified" },
        { item: "PLC Microprocessor Controller Tuning & Sensor Calibration", price: "₹4,500 - ₹9,500", unit: "Per Panel", warranty: "6 Months Service" },
      ],
      features: [
        "Semi-Hermetic Screw & Scroll Compressor Mechanical Rebuilds",
        "Shell-and-Tube / Plate Heat Exchanger (PHE) Ultrasonic Descaling",
        "Compressor Synthetic Oil Acidity (TAN) & Spectrographic Testing",
        "Vibration FFT Spectrum Analysis on Compressor Bearings",
        "24/7 Emergency Industrial Breakdown Dispatch SLA (<90 Mins in MIDC)",
      ],
      process: [
        "Audit existing operating parameters: log suction, discharge, oil differential, and approach temperatures",
        "Perform non-destructive eddy current testing on evaporator tube walls to detect pitting",
        "Circulate food-grade scale inhibitor descaling solvent through fouled condenser tubes",
        "Replace synthetic oil charge, install new OEM filter driers, and megger test motor insulation (>50 MΩ)",
        "Calibrate electronic expansion valve (EEV) stepper motors and safety flow switches",
        "Commission unit under 100% factory load and document IKW/TR efficiency curve",
      ],
      faqs: [
        {
          q: `What is Prime Cool's industrial emergency response time in ${locationName}?`,
          a: `For contracted plants in ${locationName}, we guarantee an on-site mechanical engineering team within 60 to 90 minutes, 24/7.`,
        },
        {
          q: `How does regular tube descaling save electricity in ${locationName} plants?`,
          a: `Every 1 mm of scale buildup on condenser tubes increases chiller power consumption by up to 11%. Descaling restores nominal heat transfer, directly reducing monthly power bills.`,
        },
      ],
    };
  }

  // 3. COLD ROOMS, FREEZERS & REFRIGERATION
  if (
    key.includes("cold") ||
    key.includes("freezer") ||
    key.includes("blast") ||
    key.includes("display") ||
    key.includes("bottle") ||
    key.includes("water-cooler") ||
    key.includes("ice")
  ) {
    return {
      title: key.includes("blast")
        ? "Blast Freezer (-35°C to -40°C) Overhaul & Service"
        : key.includes("cold")
        ? "Commercial Cold Room & Cold Storage Maintenance"
        : key.includes("deep")
        ? "Commercial Deep Freezer & Chest Cooler Repair"
        : "Commercial Refrigeration Equipment Servicing",
      categoryName: "Commercial Cold Chain & Sub-Zero Refrigeration",
      tagline: `PUF insulation validation, bimetal defrost cycle calibration, and sub-zero R-404A/R-448A charging in ${locationName}.`,
      description: `Protecting perishable inventory, pharmaceuticals, and dairy products across ${locationName} requires precision temperature holding. We install and repair cold rooms, walk-in chillers, blast freezers, and supermarket display counters with emergency breakdown guarantees.`,
      priceEstimate: "Starts from ₹1,800 + Genuine Spares",
      specs: [
        { metric: "Operating Temperature Range", standard: "+2°C to +8°C (Chiller / Vaccine)", highEfficiency: "-18°C to -40°C (Deep / Blast Freezing)" },
        { metric: "Insulation Panel Thickness", standard: "60mm - 80mm PUF (40 kg/m³)", highEfficiency: "120mm - 150mm High-Density Cam-Lock PUF" },
        { metric: "Defrost System", standard: "Manual / Air Defrost", highEfficiency: "Hot Gas Bypass + Microprocessor Electric Heaters" },
        { metric: "Refrigerant Type", standard: "R-134a / R-404A", highEfficiency: "Low-GWP R-448A / R-452A / Natural R-290" },
      ],
      faults: [
        { code: "dF / Er-FS", symptom: "Defrost Failure & Heavy Coil Ice Dam", cause: "Failed glass tube defrost heater, bimetal thermostat, or timer", remedy: "Replace high-wattage defrost element and safety thermal fuse" },
        { code: "High Box Temp", symptom: "Cold Room Temperature Climbing Above Setpoint", cause: "Worn magnetic door gasket air leak or low R-404A charge", remedy: "Renew perimeter silicone gasket seal, vacuum and recharge gas" },
        { code: "Oil Foaming", symptom: "Compressor Sight Glass Frothing on Start", cause: "Liquid refrigerant floodback or defective crankcase heater", remedy: "Calibrate TXV superheat to 6K, replace 70W crankcase heater band" },
      ],
      prices: [
        { item: "Cold Room Evaporator Defrost Heater Array Replacement", price: "₹2,800 - ₹5,800", unit: "Per Evaporator", warranty: "6 Months Warranty" },
        { item: "Low-Temp Semi-Hermetic Condensing Unit Overhaul", price: "₹12,500 - ₹28,000", unit: "Per System", warranty: "1 Year Warranty" },
        { item: "R-404A / R-448A Refrigerant Full Recharge + Vacuum", price: "₹3,500 - ₹7,500", unit: "Per Charge", warranty: "90 Days Leak Warranty" },
        { item: "Cold Room Door Heavy Duty Hinge, Latch & Heater Gasket", price: "₹2,200 - ₹4,800", unit: "Per Door", warranty: "1 Year Structural" },
      ],
      features: [
        "Low-Temperature Condensing Units & Scroll Compressor Diagnostics",
        "PUF Wall and Ceiling Cam-Lock Panel Thermal Imaging Audits",
        "Microprocessor Digital Controller (Dixell / Carel) Programming",
        "Hot Gas and Electric Defrost Cycle Safety Testing",
        "24/7 Stock Preservation Rapid Response in " + locationName,
      ],
      process: [
        "Audit cold room temperature log against setpoint and inspect evaporator for ice damming",
        "Verify crankcase heater operation, oil level in sight glass, and suction superheat (target 6-8K)",
        "Test electric defrost heater current draw and bimetal thermal cutoff continuity",
        "Inspect door perimeter heater cables to eliminate ice formation and vacuum sealing locks",
        "Conduct nitrogen leak check on flared joints, replace liquid line filter drier, and recharge refrigerant",
        "Validate pull-down curve and configure high-temperature audible SMS alert dialers",
      ],
      faqs: [
        {
          q: `How quickly can you resolve a cold room cooling breakdown in ${locationName}?`,
          a: `We treat cold storage failures as high-priority emergencies to prevent stock spoilage. Our service vans arrive in ${locationName} within 45 to 60 minutes.`,
        },
        {
          q: `Do you supply genuine OEM compressors for cold rooms in ${locationName}?`,
          a: `Yes, we supply genuine Copeland, Danfoss, Bitzer, and Tecumseh condensing units with manufacturer warranty.`,
        },
      ],
    };
  }

  // 4. VRV/VRF & COMMERCIAL HVAC
  if (key.includes("vrv") || key.includes("vrf") || key.includes("commercial-ac") || key.includes("office") || key.includes("warehouse") || key.includes("hospital") || key.includes("hotel") || key.includes("restaurant") || key.includes("factory")) {
    return {
      title: key.includes("vrv") || key.includes("vrf")
        ? "Commercial VRV / VRF Multi-Zone System Maintenance"
        : "Commercial HVAC, Central Air & Facility Climate Solutions",
      categoryName: "Commercial Climate Engineering & Multi-Zone Systems",
      tagline: `Central BMS integration, branch selector box diagnostics, and inverter multi-split AMCs in ${locationName}.`,
      description: `Corporate offices, commercial complexes, hospitals, and hotels in ${locationName} require high part-load efficiency (IPLV) and zoned comfort. Prime Cool provides complete engineering design, installation, quarterly descaling, and 24/7 emergency repair for multi-zone VRV/VRF and ducted package systems.`,
      priceEstimate: "Starts from ₹1,800 / Indoor Unit (Comprehensive AMCs Available)",
      specs: [
        { metric: "System Configuration", standard: "2-Pipe Heat Pump (Cooling Only)", highEfficiency: "3-Pipe Heat Recovery (Simultaneous Cool & Heat)" },
        { metric: "Part-Load IPLV Efficiency", standard: "3.80 - 4.20 COP", highEfficiency: "5.40 - 6.80 COP (Inverter Driven)" },
        { metric: "Piping Lift Height", standard: "Up to 40 Meters", highEfficiency: "Up to 110 Meters (1000m Total Run)" },
        { metric: "BMS Automation Interface", standard: "Standalone Wall Controller", highEfficiency: "Modbus / BACnet Central PC Software" },
      ],
      faults: [
        { code: "E6 / CH05", symptom: "Communication Lost Between Outdoor & Multi-Indoor Units", cause: "Daisy-chain shielded transmission wire cut or optical coupler burn", remedy: "Isolate faulty indoor PCB, replace PC817 transceiver, restore loop" },
        { code: "U4 / L5", symptom: "Outdoor Inverter Compressor IPM Over-Current Trip", cause: "Shorted IGBT power module, seized rotor, or power fluctuation", remedy: "Micro-solder IPM IC on outdoor board, verify 15V gate drive rails" },
        { code: "A3 / E3", symptom: "Cassette / Concealed Indoor Drain Pan Overflow", cause: "Blocked condensate lift pump or slime build-up in drain pipe", remedy: "Replace 1.2m lift pump, chemically flush drain lines with anti-mold" },
      ],
      prices: [
        { item: "VRV / VRF Quarterly Preventive AMC (Indoor + Outdoor)", price: "₹1,800 - ₹3,500", unit: "Per Indoor Unit / Year", warranty: "Comprehensive Cover" },
        { item: "Outdoor Multi-Inverter PCB Mainboard Component Repair", price: "₹4,500 - ₹9,500", unit: "Per Mainboard", warranty: "6 Months Warranty" },
        { item: "Branch Selector (BS) Box Solenoid Valve Replacement", price: "₹3,800 - ₹7,200", unit: "Per Box", warranty: "1 Year Warranty" },
        { item: "4-Way Cassette High-Pressure Jet Wash & Pan Sterilization", price: "₹950 - ₹1,450", unit: "Per Cassette", warranty: "Clean Air Guarantee" },
      ],
      features: [
        "Simultaneous Cooling & Heating Multi-Zone VRV / VRF Specialists",
        "Branch Selector (BS) Box Solenoid & EEV Electronic Calibration",
        "Central Building Management System (BMS) Telemetry Logging",
        "Ultrasonic Chemical Descaling of Condenser Fins",
        "Corporate Zero-Downtime Service Level Agreements (SLAs)",
      ],
      process: [
        "Connect manufacturer diagnostic tool (Daikin Checker / LG LGMV) to analyze live inverter parameters",
        "Inspect all indoor electronic expansion valves (EEV) for smooth pulse stepping and subcooling",
        "Perform chemical foam jet washing on outdoor condenser coils to lower compressor head pressure",
        "Test indoor unit condensate lift pumps and clean antimicrobial drain pans",
        "Measure line voltage balance across all three phases (must stay within 2% asymmetry)",
        "Issue computerized diagnostic health report to facility management team",
      ],
      faqs: [
        {
          q: `Do you provide annual maintenance contracts (AMC) for VRV/VRF systems in ${locationName}?`,
          a: `Yes! We offer customized Comprehensive and Non-Comprehensive AMCs with scheduled monthly audits and guaranteed 2-hour breakdown support in ${locationName}.`,
        },
        {
          q: `Which VRF brands do you service in ${locationName}?`,
          a: `We service Daikin VRV, Mitsubishi Electric City Multi, LG Multi V, Voltas, Blue Star, Toshiba, and Carrier systems.`,
        },
      ],
    };
  }

  // 5. AHU, FCU, COOLING TOWERS & AIR COMPRESSORS
  if (key.includes("ahu") || key.includes("fcu") || key.includes("cooling-tower") || key.includes("air-compressor") || key.includes("compressor") || key.includes("industrial-cooling")) {
    return {
      title: key.includes("cooling-tower")
        ? "Industrial Cooling Tower Overhaul & PVC Fill Replacement"
        : key.includes("ahu")
        ? "Air Handling Unit (AHU) Overhaul & Filter Balancing"
        : key.includes("fcu")
        ? "Fan Coil Unit (FCU) Servicing & Valve Actuators"
        : "Industrial Compressed Air Dryer & Mechanical Cooling",
      categoryName: "Industrial Ventilation & Heat Rejection Systems",
      tagline: `Laser fan shaft alignment, PVC honeycomb replacement, and airflow CFM balancing in ${locationName}.`,
      description: `Heavy manufacturing, cleanrooms, and commercial buildings in ${locationName} depend on clean airflow and high-rate heat rejection. Our certified engineering crews service induced-draft cooling towers, replace fluted PVC fills, overhaul AHU centrifugal blower bearings, and service desiccant/refrigerated air dryers.`,
      priceEstimate: "Custom Site Quote / Industrial Service Contracts",
      specs: [
        { metric: "Heat Rejection / Airflow", standard: "1,000 - 15,000 CFM (AHU/FCU)", highEfficiency: "50 - 1,500 TR Cooling Towers / 50,000+ CFM" },
        { metric: "Filtration Standards", standard: "EU-4 Synthetic Pre-Filters", highEfficiency: "EU-9 Fine Filters + EU-13 HEPA (99.97% @ 0.3µm)" },
        { metric: "Fan Drive Mechanism", standard: "V-Belt Pulley Drive", highEfficiency: "Direct-Drive PM Motor / Dynamic Laser Balanced" },
        { metric: "Fills Material", standard: "Standard Grade PVC", highEfficiency: "Virgin Flame-Retardant Thermoformed Honeycomb PVC" },
      ],
      faults: [
        { code: "High Tower Approach", symptom: "Water Exit Temp Higher Than Ambient Wet Bulb + 4°C", cause: "Algae scale on PVC fills or clogged sprinkler distribution nozzles", remedy: "High-pressure basin wash, repack fluted PVC blocks, descale nozzles" },
        { code: "Blower Vibration", symptom: "AHU Casing Rattling (>5.0 mm/s RMS)", cause: "Worn pillow block ball bearings or belt misalignment", remedy: "Laser align drive pulleys, install SKF bearings, dynamically balance fan" },
        { code: "Low Static Pressure", symptom: "Low Airflow CFM in Duct Diffusers", cause: "Choked secondary filter bank or loose modulating damper", remedy: "Wash pre-filters, replace secondary bag filters, tune damper actuator" },
      ],
      prices: [
        { item: "Industrial Cooling Tower Complete PVC Fill Repacking", price: "₹18,000 - ₹48,000", unit: "Per Cell", warranty: "2 Years Material" },
        { item: "AHU Heavy Centrifugal Fan Blower Bearing Overhaul (SKF)", price: "₹4,500 - ₹11,500", unit: "Per Blower", warranty: "1 Year Mechanical" },
        { item: "Refrigerated Compressed Air Dryer Gas Charge & Overhaul", price: "₹5,500 - ₹14,500", unit: "Per Dryer", warranty: "6 Months Service" },
        { item: "FCU 3-Speed Motor Rewinding & 2-Way Modulating Valve Swap", price: "₹2,200 - ₹4,800", unit: "Per FCU", warranty: "6 Months Warranty" },
      ],
      features: [
        "Induced-Draft & Forced-Draft Cooling Tower Complete Mechanical Overhauls",
        "AHU / FCU Blower Dynamic Laser Alignment and Balancing",
        "Refrigerated & Desiccant Industrial Air Dryer Dewpoint Tuning (+3°C / -40°C)",
        "Cleanroom HEPA Filter Installation & PAO Aerosol Integrity Testing",
        "24/7 Industrial Breakdown Coverage in " + locationName,
      ],
      process: [
        "Measure fan shaft vibration velocity (mm/s RMS) and log cooling tower inlet/outlet water temperatures",
        "Drain tower basin, scrub silt/algae buildup, and inspect PVC honeycombs for calcification",
        "Replace degraded PVC fill blocks with virgin fluted modules and laser align gearbox drive shafts",
        "Wash AHU cooling coils with low-corrosion coil brightener and replace saturated secondary filters",
        "Inspect 2-way and 3-way motorized modulating control valves for proper PID stroke actuation",
        "Measure total duct static pressure (mm W.G.) and certify CFM airflow before commissioning",
      ],
      faqs: [
        {
          q: `Why does cooling tower approach temperature increase in ${locationName}?`,
          a: `Industrial dust and hard water in ${locationName} cause scale deposits and biological slime on PVC fills, preventing evaporation. Repacking fills restores factory approach temperatures.`,
        },
        {
          q: `Do you provide AHU filtration validation for pharma/cleanrooms in ${locationName}?`,
          a: `Yes, we conduct particle count audits, differential pressure validations, and HEPA filter integrity tests according to ISO 14644 standards.`,
        },
      ],
    };
  }

  // 6. DEFAULT RESIDENTIAL SPLIT / CASSETTE / INVERTER AC REPAIR
  return {
    title: key.includes("cassette")
      ? "Cassette AC Installation & Repair"
      : key.includes("inverter")
      ? "Inverter Split AC Electronics & Mechanical Repair"
      : key.includes("window")
      ? "Window AC Service & Deep Cleaning"
      : key.includes("shifting")
      ? "AC Shifting, Safe Gas Locking & Relocation"
      : key.includes("installation")
      ? "Split & Cassette AC Installation with Core Cutting"
      : key.includes("uninstallation")
      ? "AC Uninstallation & Gas Pump-Down"
      : key.includes("tower")
      ? "Tower AC Repair & Maintenance"
      : key.includes("ductable")
      ? "Ductable AC Repair & Air Balancing"
      : "AC Repair, Jet Servicing & Maintenance",
    categoryName: "Residential & Commercial Split AC Systems",
    tagline: `Fast doorstep AC repair, deep jet pump cleaning, PCB micro-soldering, and genuine OEM spare parts in ${locationName}.`,
    description: `Experiencing low cooling, water dripping, burning smell, or power tripping from your air conditioner in ${locationName}? Prime Cool provides certified doorstep technicians equipped with jet wash kits, digital manifolds, and genuine spare parts to restore ice-cold cooling in under 45 minutes.`,
    priceEstimate: "Starts from ₹599 (Transparent Labor Pricing)",
    specs: [
      { metric: "Supported Tonnage", standard: "1.0 Ton / 1.5 Ton / 2.0 Ton", highEfficiency: "3.0 Ton to 5.0 Ton (Cassette & Tower)" },
      { metric: "Cooling Efficiency Rating", standard: "3-Star Fixed / Inverter", highEfficiency: "5-Star Dual Inverter (ISEER > 5.2)" },
      { metric: "Condenser Fin Quality", standard: "Standard Copper Coils", highEfficiency: "100% Copper with Hydrophobic Blue Fin" },
      { metric: "PCB Power Protection", standard: "External Stabilizer", highEfficiency: "Built-in 440V Clamping MOV Surge Arrestor" },
    ],
    faults: [
      { code: "Water Dripping", symptom: "Water leaking from indoor unit casing", cause: "Clogged condensate drain tray or slime in drain pipe", remedy: "High-pressure drain line flush & anti-mold pan cleaning" },
      { code: "E1 / FO", symptom: "Inverter compressor not starting / tripping", cause: "Burnt outdoor IPM power module or shorted compressor winding", remedy: "Micro-solder IPM IC on outdoor board or replace capacitor" },
      { code: "No Cooling / Air Warm", symptom: "Blower blowing room temperature air", cause: "Low refrigerant gas pressure or choked condenser fins", remedy: "Nitrogen leak test, gas recharge, chemical jet wash" },
    ],
    prices: [
      { item: "Indoor & Outdoor High-Pressure Jet Pump Foam Wash", price: "₹599 - ₹899", unit: "Per Unit", warranty: "30 Days Clean Warranty" },
      { item: "Inverter AC IPM Outdoor PCB Board Component Repair", price: "₹1,800 - ₹3,800", unit: "Per Board", warranty: "6 Months Warranty" },
      { item: "Compressor Dual Run Capacitor (45+5 µF) Replacement", price: "₹650 - ₹1,200", unit: "Per Capacitor", warranty: "1 Year OEM Warranty" },
      { item: "Split AC Complete Professional Installation + Bracket", price: "₹1,199 - ₹1,699", unit: "Per Unit", warranty: "100% Level Guaranteed" },
    ],
    features: [
      "High-Pressure Jet Pump Foam Cleaning for Indoor & Outdoor Coils",
      "Inverter PCB Board Micro-soldering at Component Level",
      "Digital Multimeter Capacitor & Compressor Winding Diagnostics",
      "100% Pure Virgin Refrigerant Gas Charging (R-32 / R-410A)",
      "45-Minute Emergency Doorstep Technician Dispatch in " + locationName,
    ],
    process: [
      "Check remote control settings, airflow temperature, and measure electrical supply voltage",
      "Inspect indoor evaporator coils and clean high-density dust filters",
      "Mount protective waterproof jacket on indoor unit and deep wash coils with high-pressure jet pump",
      "Wash outdoor condenser heat exchanger fins to remove caked traffic dirt and dust",
      "Connect digital manifold gauges to verify suction operating pressure and compressor current (Amps)",
      "Log 10°C - 14°C delta-T temperature differential across supply and return louvers before handover",
    ],
    faqs: [
      {
        q: `How quickly can a technician reach my home in ${locationName}?`,
        a: `We maintain mobile service units stationed across ${locationName} to guarantee doorstep arrival in 30 to 45 minutes.`,
      },
      {
        q: `Do you repair inverter AC PCB boards in ${locationName}?`,
        a: `Yes! Our electronics specialists perform component-level micro-soldering on all inverter PCB brands, saving you up to 70% compared to buying a new mainboard.`,
      },
      {
        q: `What is included in an AC jet service in ${locationName}?`,
        a: `Our jet service includes complete high-pressure water washing of indoor cooling coils, outdoor condenser fins, drain pipe declogging, blower fan cleaning, and electrical current checks.`,
      },
    ],
  };
};

export const getFallbackService = (slug: string) => {
  const data = getComprehensiveServiceData(slug, "Pune", false);
  return {
    title: data.title,
    tagline: data.tagline,
    description: data.description,
    priceEstimate: data.priceEstimate,
    features: data.features,
    process: data.process,
    faqs: data.faqs,
  };
};

export const Route = createFileRoute("/services/$serviceSlug/$locationSlug")({
  loader: async ({ params }) => {
    const locationsResp = await getLocations();
    let location = locationsResp.locations.find(
      (l: any) => l.slug === params.locationSlug.toLowerCase(),
    );

    // Dynamic Location Resolver
    if (!location) {
      const formattedName = params.locationSlug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

      const locCtx = LOCALITY_CONTEXT[params.locationSlug.toLowerCase()];

      location = {
        slug: params.locationSlug.toLowerCase(),
        name: formattedName,
        pincodes: ["411001"],
        type: locCtx?.isMidc ? "midc" : "locality",
        faqs: [],
        reviews: [],
        landmarks: locCtx?.landmarks || [formattedName + " Central"],
        nearbyBusinesses: locCtx?.adjacent || [],
        mapEmbedUrl: "",
      };
    }

    const serviceKey = params.serviceSlug.toLowerCase();
    const locKey = params.locationSlug.toLowerCase();
    const locCtx = LOCALITY_CONTEXT[locKey] || {
      hub: `${location.name} Area Corridor`,
      isMidc: location.type === "midc",
      landmarks: location.landmarks || [location.name],
      adjacent: location.nearbyBusinesses || ["Pune", "PCMC"],
      operatingConditions: "High ambient summer temperatures and seasonal humidity fluctuations.",
      powerCondition: "Standard electrical distribution with potential voltage spikes.",
    };

    // Build comprehensive technical data
    const serviceInfo = getComprehensiveServiceData(serviceKey, location.name, locCtx.isMidc);

    const { settings } = await getCmsSettings();
    return {
      location,
      serviceKey,
      locKey,
      locCtx,
      serviceInfo,
      cms: settings,
      allLocations: locationsResp.locations,
    };
  },
  head: ({ loaderData }) => {
    const location = loaderData?.location;
    const serviceInfo = loaderData?.serviceInfo;
    if (!location || !serviceInfo) return { meta: [] };

    const pageTitle = `24x7 ${serviceInfo.title} in ${location.name} | Certified Engineers | Prime Cool`;
    const pageDesc = `Fast, certified ${serviceInfo.title} in ${location.name} (${loaderData.locCtx.hub}). 100% genuine OEM spares, transparent pricing, and rapid doorstep dispatch in ${location.name}, Pune. Call +91 7507408461.`;

    return {
      meta: [
        { title: pageTitle },
        { name: "description", content: pageDesc },
        { property: "og:title", content: pageTitle },
        { property: "og:description", content: pageDesc },
        { property: "og:type", content: "business.business" },
        { property: "og:locale", content: "en_IN" },
        { name: "keywords", content: `${serviceInfo.title} ${location.name}, ${loaderData.serviceKey} ${location.name}, HVAC repair ${location.name}, emergency AC service ${location.name}, Prime Cool Pune` },
        { name: "geo.region", content: "IN-MH" },
        { name: "geo.placename", content: `${location.name}, Pune, Maharashtra, India` },
        { name: "geo.position", content: "18.5793;73.9827" },
        { name: "ICBM", content: "18.5793, 73.9827" },
      ],
      links: [
        {
          rel: "canonical",
          href: `https://primecool.in/services/${loaderData.serviceKey}/${location.slug}`,
        },
      ],
    };
  },
  component: LocationServiceDetailsPage,
});

function LocationServiceDetailsPage() {
  const { location, serviceKey, locKey, locCtx, serviceInfo, cms, allLocations } = Route.useLoaderData();
  const socials = cms?.socials || {};
  const phone = socials.phone || "+917507408461";

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // High-Value Core Services for Cross-Linking Grid
  const CORE_SERVICES_NAV = [
    { slug: "ac-repair", name: "AC Repair & Servicing" },
    { slug: "ac-gas-charging", name: "AC Gas Charging (R-32/R-410A)" },
    { slug: "split-ac-repair", name: "Split AC Repair & Jet Wash" },
    { slug: "inverter-ac-repair", name: "Inverter AC PCB Board Repair" },
    { slug: "cassette-ac-repair", name: "Cassette AC Installation & Service" },
    { slug: "vrf-systems", name: "VRV / VRF Multi-Zone System AMC" },
    { slug: "cold-rooms", name: "Commercial Cold Room Installation" },
    { slug: "chillers", name: "Industrial Process Chiller Maintenance" },
    { slug: "cooling-towers", name: "Cooling Tower Overhaul & PVC Fills" },
    { slug: "ahu", name: "Air Handling Unit (AHU) Overhaul" },
    { slug: "deep-freezers", name: "Commercial Deep Freezer Servicing" },
    { slug: "cnc-machine-cooling", name: "CNC Spindle & Hydraulic Oil Chiller" },
  ];

  // Core Nearby Locations for Cross-Linking Grid
  const NEARBY_LOCATIONS_NAV = [
    { slug: "ranjangaon-midc", name: "Ranjangaon MIDC" },
    { slug: "chakan-midc", name: "Chakan MIDC" },
    { slug: "bhosari-midc", name: "Bhosari MIDC" },
    { slug: "wagholi", name: "Wagholi" },
    { slug: "kharadi", name: "Kharadi" },
    { slug: "hadapsar", name: "Hadapsar" },
    { slug: "hinjewadi", name: "Hinjewadi" },
    { slug: "baner", name: "Baner" },
    { slug: "kothrud", name: "Kothrud" },
    { slug: "shikrapur", name: "Shikrapur" },
    { slug: "sanaswadi", name: "Sanaswadi" },
    { slug: "shirur", name: "Shirur" },
  ].filter((l) => l.slug !== locKey);

  // Structured JSON-LD Schema
  const schemaList: any[] = [
    {
      "@context": "https://schema.org",
      "@type": ["HVACBusiness", "LocalBusiness"],
      name: `Prime Cool ${serviceInfo.title} - ${location.name}`,
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
        {
          "@type": "Place",
          name: location.name,
        },
        ...locCtx.adjacent.map((n: string) => ({ "@type": "Place", name: n })),
      ],
      description: serviceInfo.description,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: 238,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `${serviceInfo.title} in ${location.name}`,
      provider: {
        "@type": "LocalBusiness",
        name: "Prime Cool HVAC, Appliance & Industrial Mechanical Solutions",
        telephone: phone,
        image: cms?.theme?.logo || "https://primecool.in/logo.png",
      },
      areaServed: {
        "@type": "Place",
        name: location.name,
      },
      description: serviceInfo.description,
      offers: {
        "@type": "Offer",
        price: "599",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://primecool.in/" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://primecool.in/services" },
        { "@type": "ListItem", position: 3, name: serviceInfo.title, item: `https://primecool.in/services/${serviceKey}` },
        { "@type": "ListItem", position: 4, name: `${serviceInfo.title} in ${location.name}`, item: `https://primecool.in/services/${serviceKey}/${location.slug}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: serviceInfo.faqs.map((faq: any) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
    },
  ];

  return (
    <div className="min-h-screen text-foreground flex flex-col justify-between bg-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaList) }}
      />
      {/* Background ambient lighting */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))] pointer-events-none" />

      {/* Main Content Container */}
      <main className="flex-1 pt-6 md:pt-8 pb-20 px-4 sm:px-6 max-w-7xl mx-auto w-full relative z-10">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs />

        {/* 1. HERO SECTION */}
        <section className="grid lg:grid-cols-12 gap-8 items-center mb-16 pt-4">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 text-xs font-semibold text-sky-400 font-mono uppercase tracking-wider">
              <MapPin className="h-3.5 w-3.5" />
              <span>{locCtx.hub}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-white tracking-tight">
              {serviceInfo.title} <br />
              in <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">{location.name}</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-light">
              {serviceInfo.tagline} {serviceInfo.description} Stationed directly across{" "}
              <strong className="text-white font-medium">{locCtx.landmarks[0] || location.name}</strong> for rapid mobile engineering dispatch.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/booking"
                search={{}}
                className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold px-7 py-3.5 text-sm shadow-lg shadow-sky-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Calendar className="h-4 w-4" />
                <span>Book Service Online</span>
              </Link>
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-2.5 rounded-full border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-white font-semibold px-7 py-3.5 text-sm transition-all transform hover:-translate-y-0.5 cursor-pointer backdrop-blur-sm"
              >
                <Phone className="h-4 w-4 text-sky-400" />
                <span>24/7 Hotline: {phone}</span>
              </a>
            </div>

            {/* SLA Badging */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-sky-400 shrink-0" />
                <span>{locCtx.isMidc ? "90-Min Industrial SLA" : "45-Min Doorstep Arrival"}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-sky-400 shrink-0" />
                <span>100% Genuine OEM Spares</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <Star className="h-4 w-4 text-amber-400 fill-amber-400 shrink-0" />
                <span>4.9/5 Rating (230+ Reviews)</span>
              </div>
            </div>
          </div>

          {/* Pricing & Features Spotlight Card */}
          <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 space-y-6 shadow-2xl shadow-slate-950/80">
            <div className="space-y-1.5 border-b border-slate-800/80 pb-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-sky-400 uppercase font-bold tracking-widest">
                  Standard Pricing Index
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-mono">
                  <CheckCircle2 className="h-3 w-3" /> Transparent Rates
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                {serviceInfo.priceEstimate}
              </div>
              <p className="text-xs text-slate-400">
                Official standard rate in {location.name}. Includes initial visit, electrical check & testing.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-semibold text-slate-200 block uppercase tracking-wider font-mono">
                Included Technical Protocols:
              </span>
              <ul className="space-y-2.5 text-xs text-slate-300">
                {serviceInfo.features.map((f, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start">
                    <CheckCircle className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl bg-slate-950/60 p-4 border border-slate-800/60 flex items-center justify-between text-xs">
              <span className="text-slate-400">Lead Systems Engineer:</span>
              <span className="text-white font-medium">Saurav Kailas Temgire</span>
            </div>
          </div>
        </section>

        {/* 2. LOCAL OPERATIONAL CONTEXT & CLIMATE ENGINEERING */}
        <section className="mb-16 rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400">
              <Activity className="h-5 w-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
              Engineering Operating Context in {location.name}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <div className="space-y-3">
              <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                <Flame className="h-4 w-4 text-amber-400" />
                <span>Thermal & Environmental Factors:</span>
              </h3>
              <p>{locCtx.operatingConditions}</p>
              <div className="rounded-lg bg-slate-950/60 p-3 border border-slate-800/60 text-xs">
                <span className="text-slate-400 font-mono block">Primary Service Landmarks:</span>
                <span className="text-sky-300 font-medium">{locCtx.landmarks.join(" · ")}</span>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                <Zap className="h-4 w-4 text-sky-400" />
                <span>Power & Voltage Characteristics:</span>
              </h3>
              <p>{locCtx.powerCondition}</p>
              <div className="rounded-lg bg-slate-950/60 p-3 border border-slate-800/60 text-xs">
                <span className="text-slate-400 font-mono block">Adjacent Delivery Corridors:</span>
                <span className="text-sky-300 font-medium">{locCtx.adjacent.join(" · ")}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. ENGINEERING SPECIFICATION MATRIX TABLE */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400">
              <Gauge className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                Technical Specification & Sizing Matrix
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Comparative benchmarks for standard vs high-efficiency tiers in {location.name}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/50 shadow-xl backdrop-blur-md">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80 font-mono text-[11px] uppercase tracking-wider text-sky-400">
                  <th className="p-4 sm:p-5 font-semibold">Engineering Metric</th>
                  <th className="p-4 sm:p-5 font-semibold">Standard Commercial Grade</th>
                  <th className="p-4 sm:p-5 font-semibold text-emerald-400">Prime Cool High-Efficiency Tier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {serviceInfo.specs.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 sm:p-5 font-medium text-white">{row.metric}</td>
                    <td className="p-4 sm:p-5 text-slate-400">{row.standard}</td>
                    <td className="p-4 sm:p-5 text-emerald-300 font-medium bg-emerald-500/5">{row.highEfficiency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. COMMON FAULT SYMPTOMS & DIAGNOSTIC MATRIX TABLE */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                Diagnostic Fault Codes & Solutions in {location.name}
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Common failure symptoms, root causes, and certified repair actions
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/50 shadow-xl backdrop-blur-md">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80 font-mono text-[11px] uppercase tracking-wider text-amber-400">
                  <th className="p-4 font-semibold w-28">Error / Code</th>
                  <th className="p-4 font-semibold">Symptom Observed</th>
                  <th className="p-4 font-semibold">Technical Root Cause</th>
                  <th className="p-4 font-semibold">Certified Engineering Remedy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {serviceInfo.faults.map((f, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 font-mono font-bold text-amber-400">{f.code}</td>
                    <td className="p-4 font-medium text-white">{f.symptom}</td>
                    <td className="p-4 text-slate-400">{f.cause}</td>
                    <td className="p-4 text-sky-300 bg-sky-500/5 font-medium">{f.remedy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 5. TRANSPARENT PRICING & SPARE PARTS TABLE */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                Genuine OEM Spare Parts & Labor Pricing (INR ₹)
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Official price breakdown for {location.name} with warranty coverage
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/50 shadow-xl backdrop-blur-md">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80 font-mono text-[11px] uppercase tracking-wider text-emerald-400">
                  <th className="p-4 sm:p-5 font-semibold">Component / Service Item</th>
                  <th className="p-4 sm:p-5 font-semibold">Price Range (₹)</th>
                  <th className="p-4 sm:p-5 font-semibold">Billing Unit</th>
                  <th className="p-4 sm:p-5 font-semibold">Warranty Terms</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {serviceInfo.prices.map((p, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 sm:p-5 font-medium text-white">{p.item}</td>
                    <td className="p-4 sm:p-5 font-bold text-emerald-400">{p.price}</td>
                    <td className="p-4 sm:p-5 text-slate-400 font-mono text-xs">{p.unit}</td>
                    <td className="p-4 sm:p-5 text-sky-300 font-medium">{p.warranty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 6. 6-STAGE STANDARD OPERATING PROCEDURE (SOP) */}
        <section className="mb-16 rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400">
              <Wrench className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                Step-by-Step Diagnostic & Engineering Process Flow
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Standard Operating Procedure (SOP) executed by certified Prime Cool engineers
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceInfo.process.map((step, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-5 space-y-3 relative group hover:border-sky-500/40 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-display font-black text-sky-500/40 group-hover:text-sky-400 transition-colors">
                    0{idx + 1}
                  </span>
                  <span className="text-[10px] font-mono uppercase bg-slate-900 text-slate-400 px-2 py-0.5 rounded">
                    Stage {idx + 1}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. FREQUENTLY ASKED QUESTIONS (FAQS) */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400">
              <HelpCircle className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                Frequently Asked Questions in {location.name}
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Everything you need to know about {serviceInfo.title}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {serviceInfo.faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-800 bg-slate-900/50 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-white hover:text-sky-300 transition-colors cursor-pointer"
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
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/40">
                      <p className="pt-3">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 8. CROSS-LINKING & RELATED LOCAL SERVICES GRID */}
        <section className="mb-16 space-y-12">
          {/* Related Services in Same Location */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8">
            <h3 className="text-lg font-bold font-display text-white mb-2 flex items-center gap-2">
              <Wrench className="h-4 w-4 text-sky-400" />
              <span>Other HVAC, Appliance & Refrigeration Services in {location.name}</span>
            </h3>
            <p className="text-xs text-slate-400 mb-6 font-mono">
              Explore specialized engineering solutions available for doorstep dispatch in {location.name}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {CORE_SERVICES_NAV.map((s, idx) => (
                <Link
                  key={idx}
                  to="/services/$serviceSlug/$locationSlug"
                  params={{ serviceSlug: s.slug, locationSlug: locKey }}
                  className={`p-3 rounded-xl border text-xs font-medium transition-all ${
                    s.slug === serviceKey
                      ? "bg-sky-500/20 border-sky-500 text-sky-300 font-bold"
                      : "bg-slate-950/60 border-slate-800/80 text-slate-300 hover:text-white hover:border-slate-700 hover:bg-slate-900"
                  }`}
                >
                  {s.name} in {location.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Same Service in Nearby Locations */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8">
            <h3 className="text-lg font-bold font-display text-white mb-2 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-sky-400" />
              <span>{serviceInfo.title} Across Pune & PCMC Localities</span>
            </h3>
            <p className="text-xs text-slate-400 mb-6 font-mono">
              Prime Cool operates high-speed mobile technician vans across all key areas
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {NEARBY_LOCATIONS_NAV.map((l, idx) => (
                <Link
                  key={idx}
                  to="/services/$serviceSlug/$locationSlug"
                  params={{ serviceSlug: serviceKey, locationSlug: l.slug }}
                  className="p-3 rounded-xl border border-slate-800/80 bg-slate-950/60 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-700 hover:bg-slate-900 transition-all flex items-center justify-between"
                >
                  <span>{serviceInfo.title} in {l.name}</span>
                  <ArrowRight className="h-3 w-3 text-slate-500 shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 9. EMERGENCY CALLOUT BANNER */}
        <section className="rounded-3xl border border-sky-500/30 bg-gradient-to-br from-slate-900 via-sky-950/40 to-slate-900 p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.1),transparent_70%)] pointer-events-none" />
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest">
              Emergency Dispatch Hub · {location.name}
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white">
              Need Urgent {serviceInfo.title} in {location.name}?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              Our mobile technical units carry pre-staged OEM compressors, capacitors, fan motors, and refrigerant cylinders for same-day recovery.
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
