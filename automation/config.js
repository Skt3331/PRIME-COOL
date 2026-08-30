/**
 * Automation Bot Configuration
 * Prime Cool HVAC, Refrigeration & Home Appliance Blog Engine
 * Strictly aligned with high-ranking Google Search queries & engineering standards in Pune/PCMC
 */

export const DAILY_QUOTAS = {
  trending: 10,
  location: 20,
  commercial: 10,
  industrial: 10,
  total: 50,
};

export const trendingTopics = [
  {
    topic: "R-32 vs R-454B Next-Gen Low GWP Refrigerants in Tropical Ambient Heat",
    category: "Trending HVAC Innovations & Eco Refrigerants",
    focus: "Thermodynamic operating pressure, discharge temperature, flammability index A2L, and compressor displacement",
    keywords: "R32 vs R454B refrigerant, low GWP refrigerant India, eco friendly AC gas, Pune HVAC retrofitting",
  },
  {
    topic: "AI-Powered Dual Inverter AC vs Expandable Inverter: 52°C Ambient Cooling Test",
    category: "Trending Brand & Tech Comparisons",
    focus: "Real-world pull-down speed, ISEER rating, power consumption kW/h, and outdoor fin thermal dissipation",
    keywords: "AI dual inverter AC, expandable inverter AC test, 52 degree ambient cooling, 5 star AC electricity savings",
  },
  {
    topic: "Inverter AC IPM PCB Micro-soldering & Microcontroller 15V/12V/5V Rail Diagnostics",
    category: "Inverter PCB Electronics & Micro-soldering",
    focus: "Switch-mode power supply (SMPS) rail testing, gate driver optocoupler pulses, and IPM IGBT diode drops",
    keywords: "inverter AC PCB repair, IPM IGBT module test, AC circuit board repair Pune, multimeter PCB diagnostics",
  },
  {
    topic: "Front Load vs Top Load Washing Machine: Drum Spider Bearing Longevity & PCB Failure Rates",
    category: "Appliance Engineering & Diagnostic Guides",
    focus: "Cast aluminium spider corrosion in hard water, high-spin vibration damping, and digital inverter BLDC motor control",
    keywords: "front load vs top load washing machine repair, drum bearing spider replacement, washing machine motor PCB",
  },
  {
    topic: "Convertible Multi-Door Inverter Refrigerators: Linear Compressor Reliability & Defrost Cycles",
    category: "Refrigeration Diagnostics & Energy Efficiency",
    focus: "Inverter linear compressor stroke modulation, bimetal defrost sensor failure, and dual-evaporator airflow",
    keywords: "convertible refrigerator repair, inverter linear compressor troubleshooting, fridge defrost sensor replacement",
  },
  {
    topic: "BLDC Condenser Fan Motors vs Traditional PSC Motors: Power Savings & Thermal Overload",
    category: "Trending HVAC Innovations & Eco Refrigerants",
    focus: "Brushless DC electronic commutation, Hall sensor feedback, capacitor-less design, and operating life under dust",
    keywords: "BLDC fan motor AC, condenser motor replacement, inverter AC fan motor error, HVAC energy efficiency",
  },
  {
    topic: "Copper Condenser with Hydrophobic Blue Fin vs Microchannel Aluminium: Pune Monsoon & Dust Resistance",
    category: "Trending Brand & Tech Comparisons",
    focus: "Galvanic corrosion resistance, heat transfer coefficients, brazing repairability, and lifecycle TCO",
    keywords: "copper vs aluminium condenser AC, blue fin coating AC, anti corrosion AC Pune, air conditioner coil leak repair",
  },
  {
    topic: "Inverter AC Gas Leak Detection: Ultrasonic vs Nitrogen Pressure Decay & Electronic Sniffers",
    category: "Inverter AC Repair & Gas Charging Guides",
    focus: "450 PSI dry nitrogen pressure hold tests, bubble leak detection at flare joints, and R-32 vapor recharge precision",
    keywords: "AC gas leak detection, nitrogen pressure test AC, R32 gas charging price, split AC leak repair Pune",
  },
  {
    topic: "Smart Wi-Fi & IoT HVAC Automation: Energy Monitoring, Peak Shaving & Predictive Diagnostics",
    category: "Trending HVAC Innovations & Eco Refrigerants",
    focus: "Modbus / Wi-Fi telemetry integration, automated filter clean alerts, inverter frequency throttling, and mobile AMC logs",
    keywords: "smart WiFi AC automation, IoT HVAC energy monitor, predictive AC maintenance, smart home cooling Pune",
  },
  {
    topic: "5-Star vs 3-Star Inverter AC Real Cost Analysis: 8-Year Pune Electricity & Maintenance ROI",
    category: "Trending Brand & Tech Comparisons",
    focus: "MSEDCL tariff calculation (₹8.50 - ₹11.50/unit), cooling seasonal performance factor (CSPF), and initial price delta payoff",
    keywords: "5 star vs 3 star AC power bill, Pune electricity tariff AC calculator, 1.5 ton inverter AC running cost",
  },
];

export const locations = [
  { city: "Pune", area: "Wagholi", postal: "412207", landmark: "Wagheshwar Temple & Bakori Road", hub: "Pune East Corridor" },
  { city: "Pune", area: "Kharadi", postal: "411014", landmark: "EON IT Park & World Trade Center", hub: "IT Hub & Corporate Zone" },
  { city: "Pune", area: "Hadapsar", postal: "411028", landmark: "Magarpatta Cybercity & SP Infocity", hub: "Cybercity & Industrial Corridor" },
  { city: "Pune", area: "Viman Nagar", postal: "411014", landmark: "Phoenix Marketcity & Airport Road", hub: "Commercial & Residential Hub" },
  { city: "Pune", area: "Kalyani Nagar", postal: "411006", landmark: "Bishop School & Central Avenue", hub: "Luxury Residential & Commercial" },
  { city: "Pune", area: "Hinjewadi", postal: "411057", landmark: "Rajiv Gandhi Infotech Park Phase 1-3", hub: "Flagship IT Megacity" },
  { city: "Pune", area: "Baner", postal: "411045", landmark: "Balewadi High Street & Pancard Club Road", hub: "Commercial High Street & IT Annex" },
  { city: "Pune", area: "Wakad", postal: "411057", landmark: "Dutt Mandir & Bhumkar Chowk", hub: "High-density Residential & Tech" },
  { city: "Pune", area: "Pimple Saudagar", postal: "411027", landmark: "Govind Garden & Linear Garden", hub: "PCMC Residential Belt" },
  { city: "Pune", area: "Kothrud", postal: "411038", landmark: "Chandani Chowk & MIT World Peace University", hub: "Pune West Central" },
  { city: "Pune", area: "Aundh", postal: "411007", landmark: "DP Road & Westend Mall", hub: "Premium West Pune" },
  { city: "Pune", area: "Bavdhan", postal: "411021", landmark: "Chandani Chowk & NDA Road", hub: "Highway Corridor" },
  { city: "Pune", area: "Chakan", postal: "410501", landmark: "Chakan MIDC Phase 1-4 & Auto Cluster", hub: "Automobile & Heavy Engineering Belt" },
  { city: "Pune", area: "Bhosari", postal: "411026", landmark: "Bhosari MIDC, Telco Circle & PCMC Spine", hub: "Industrial Manufacturing Zone" },
  { city: "Pune", area: "Talawade", postal: "411062", landmark: "Talawade Software Park & MIDC", hub: "PCMC Tech & Industrial Hub" },
  { city: "Pune", area: "Ranjangaon", postal: "412209", landmark: "Ranjangaon MIDC Electronics & Appliance Corridor", hub: "Electronics Manufacturing Zone" },
  { city: "Pune", area: "Karegaon", postal: "412220", landmark: "Karegaon Industrial Zone & Nagar Highway", hub: "Manufacturing & Heavy Industrial" },
  { city: "Pune", area: "Shikrapur", postal: "412208", landmark: "Chakan-Shikrapur State Highway & Logistics Park", hub: "Logistics & Factory Belt" },
  { city: "Pune", area: "Sanaswadi", postal: "412208", landmark: "Sanaswadi MIDC & Steel Plant Corridor", hub: "Heavy Engineering & Metallurgy" },
  { city: "Pune", area: "Shirur", postal: "412210", landmark: "Shirur MIDC, Ghod River & Pune-Nagar Highway", hub: "East Pune Gateway & Industrial" },
  { city: "Pune", area: "Lonikand", postal: "412216", landmark: "Nagar Highway Logistics & Transport Hub", hub: "Logistics Corridor" },
  { city: "Pune", area: "Kesnand", postal: "412207", landmark: "Kesnand Phata & Theur Link Road", hub: "Residential & SME Industrial" },
  { city: "Pune", area: "Nigdi", postal: "411044", landmark: "Bhakti Shakti Chowk & Pradhikaran", hub: "PCMC Residential & Commercial" },
  { city: "Pune", area: "Alandi", postal: "412105", landmark: "Indrayani River & Dehu-Alandi Industrial Link", hub: "North Pune Industrial Belt" },
  { city: "Pune", area: "Katraj", postal: "411046", landmark: "Katraj Snake Park & Bharati Vidyapeeth", hub: "South Pune Gateway" },
];

export const commercialTopics = [
  {
    topic: "Commercial VRV/VRF Multi-Zone Inverter Air Conditioning: Energy Audit & AMC Guide",
    category: "Commercial VRF/VRV & Multi-Zone Climate Systems",
    focus: "Simultaneous cooling and heating, branch selector (BS) boxes, refrigerant piping length up to 1000m, and central BMS integration",
    keywords: "commercial VRV VRF system Pune, multi zone VRF AMC contract, office air conditioning maintenance, Daikin VRV service",
  },
  {
    topic: "Supermarket & Cold Room Walk-in Freezer: R-404A/R-448A Defrost Failure & Temperature Holding",
    category: "Commercial Cold Storage & Deep Freezers",
    focus: "Electric heater vs hot gas defrost cycles, bimetal termination thermostats, sub-zero holding at -18°C to -25°C, and stock preservation",
    keywords: "commercial cold room repair Pune, walk in freezer service, supermarket refrigerator maintenance, R404A deep freezer gas leak",
  },
  {
    topic: "Commercial Cassette AC 4-Way Inverter: Drain Pump Blockage, Condensate Overflow & Mold Remediation",
    category: "Commercial Air Conditioning & Ceiling Cassettes",
    focus: "Internal condensate lift pump head pressure, float switch trip prevention, antimicrobial drain pan sanitization, and jet cleaning",
    keywords: "cassette AC repair Pune, 4 way cassette AC dripping water, ceiling AC service restaurant, cassette AC drain pump replacement",
  },
  {
    topic: "Server Room & Data Center Precision Air Conditioning (PAC): Dual Circuit Redundancy & Humidity Control",
    category: "Commercial Precision Climate & IT Cooling",
    focus: "N+1 active-standby redundancy, sensible heat ratio (SHR > 0.90), electrode steam humidification, and 24/7 microprocessor control",
    keywords: "server room precision AC maintenance, PAC unit repair Pune, data center cooling AMC, IT hub HVAC emergency service",
  },
  {
    topic: "Restaurant & Commercial Kitchen HVAC: Makeup Air Units (MAU), Exhaust Hoods & Heat Load Management",
    category: "Commercial Kitchen HVAC & Ventilation",
    focus: "Negative pressure balancing, heavy grease filtration, spot cooling for chefs, and kitchen exhaust duct fire damper safety",
    keywords: "commercial kitchen exhaust repair, restaurant HVAC installation Pune, makeup air unit service, commercial kitchen ventilation",
  },
  {
    topic: "Hospital & Cleanroom HVAC: HEPA Filtration, Positive Air Pressure & Sterile Air Changes (ACH)",
    category: "Healthcare & Cleanroom Climate Systems",
    focus: "ISO Class 5-8 cleanroom compliance, differential pressure monitoring, laminar airflow ceiling modules, and UVGI germicidal lamps",
    keywords: "hospital HVAC maintenance Pune, cleanroom air conditioning AMC, operation theater AHU validation, HEPA filter replacement",
  },
  {
    topic: "Commercial Water Cooler & Commercial RO Dispenser: Compressor Burnout & Thermostat Calibration",
    category: "Commercial Water Cooling & Dispensing",
    focus: "Stainless steel 304 storage tanks, high-draw capillary tube sizing, copper coil wrap insulation, and food-grade safety",
    keywords: "commercial water cooler repair Pune, stainless steel water chiller, corporate water dispenser repair, water cooler gas charging",
  },
  {
    topic: "Retail Mall & Department Store Ductable Split AC: Air Balancing, Damper Actuators & Noise Control",
    category: "Commercial Ducted HVAC Systems",
    focus: "Static pressure drop calculation across duct runs, acoustic lining, motorized VAV damper control, and seasonal chiller interface",
    keywords: "ductable AC repair Pune, commercial air duct balancing, showroom AC maintenance, ducted split system service",
  },
  {
    topic: "Hotel & Banquet Hall Centralized Air Conditioning: Part-Load Efficiency & Rapid Chill Pull-Down",
    category: "Hospitality & Multi-Zone Climate Systems",
    focus: "Variable occupancy thermal peaks, fresh air CFM requirements, odor filtration, and sound attenuator calibration",
    keywords: "hotel HVAC AMC Pune, banquet hall AC cooling failure, commercial chiller staging, centralized AC repair hotel",
  },
  {
    topic: "Commercial Refrigerated Display Counters & Glass Door Merchandisers: Condenser Dust Choking & Fan Failure",
    category: "Commercial Cold Storage & Deep Freezers",
    focus: "Forced-air bottom condenser maintenance, LED anti-sweat glass heaters, digital micro-controller temperature calibration (2°C to 8°C)",
    keywords: "display counter fridge repair Pune, commercial bakery display cooler, glass door chiller service, supermarket fridge maintenance",
  },
];

export const industrialTopics = [
  {
    topic: "Industrial Process Water Chillers (50 to 500 TR): Screw vs Centrifugal Compressor Overhaul & IKW/TR Optimization",
    category: "Industrial Process Chillers & Plant Overhauls",
    focus: "Semi-hermetic twin screw rotors, slide valve capacity control (25%-100%), shell-and-tube evaporator descaling, and oil separator servicing",
    keywords: "industrial process chiller repair Pune, screw chiller maintenance Chakan, centrifugal chiller overhaul Bhosari, chiller efficiency IKW per TR",
  },
  {
    topic: "Industrial Induced-Draft Cooling Towers: PVC Fill Replacement, Drift Eliminator & Gearbox Vibration Balancing",
    category: "Industrial Cooling Towers & Heat Dissipation",
    focus: "Approach temperature reduction, cross-flow vs counter-flow PVC honeycomb fills, dynamic fan blade balancing, and bio-fouling scale removal",
    keywords: "industrial cooling tower overhaul Pune, cooling tower PVC fill replacement, industrial cooling tower AMC Ranjangaon, gearbox alignment",
  },
  {
    topic: "MIDC Manufacturing Plant Air Compressor Dryers: Refrigerated vs Desiccant Air Dryer Dewpoint Maintenance",
    category: "Industrial Compressed Air & Moisture Extraction",
    focus: "Pressure dew point (+3°C vs -40°C), hot gas bypass valve calibration, silica gel / activated alumina bed regeneration, and moisture drain solenoids",
    keywords: "industrial air dryer repair Pune, refrigerated air dryer maintenance Chakan, desiccant air dryer service, compressed air moisture filter",
  },
  {
    topic: "Heavy Duty Inverter Drive & Industrial VFD Repair: IGBT Module Testing, DC Bus Capacitor Bank Bank Rejuvenation",
    category: "Industrial Electronics & Power Systems",
    focus: "600V-1200V IGBT bridge rectification, DC link ripple voltage measurement, snubbing circuits, and conformal coating in dusty factory environments",
    keywords: "industrial VFD repair Pune, AC drive IGBT replacement, inverter drive PCB micro-soldering, industrial electronic controller repair",
  },
  {
    topic: "Industrial Cold Storage Plant (1000+ Metric Tonnes): Ammonia (NH3) vs Freon R-404A/R-507 Retrofit & Safety Audit",
    category: "Industrial Process Chillers & Plant Overhauls",
    focus: "Two-stage reciprocating / screw booster compressors, surge drum liquid level controllers, leak sniffers, and emergency purge scrubber systems",
    keywords: "industrial cold storage overhaul Pune, ammonia refrigeration plant repair, cold warehouse refrigeration AMC Shikrapur, Freon retrofit",
  },
  {
    topic: "CNC Machine Spindle & Hydraulic Oil Chillers: Thermal Runaway Prevention & Micro-Chiller Servicing",
    category: "Industrial Process Chillers & Plant Overhauls",
    focus: "Closed-loop immersion heat exchangers, precise oil temperature tolerance (±0.5°C), high-pressure circulation pump seals, and particulate cleaning",
    keywords: "CNC spindle chiller repair Pune, hydraulic oil chiller maintenance Bhosari, industrial oil cooler service Chakan MIDC, laser machine chiller",
  },
  {
    topic: "Plastic Injection Molding Mold Temperature Controllers (MTC) & Central Chilled Water Loop Balancing",
    category: "Industrial Process Chillers & Plant Overhauls",
    focus: "High-temperature pressurized water/oil systems up to 180°C, dual magnetic drive pumps, SSR solid state relay heating, and scale descaling",
    keywords: "mold temperature controller repair, plastic injection molding chiller Pune, industrial process cooling loop, MTC heater replacement",
  },
  {
    topic: "Pharmaceutical Cleanroom HVAC Validation: DQ/IQ/OQ/PQ Protocols & ISO 14644-1 Airflow Velocity Testing",
    category: "Industrial Cleanroom HVAC & Sterile Engineering",
    focus: "Anemometer duct traverse airflow measurements, PAO aerosol filter integrity testing, particle counter compliance, and BMS automated logging",
    keywords: "pharma HVAC validation Pune, cleanroom air handling unit qualification, ISO 14644 testing Bhosari, pharmaceutical HVAC AMC",
  },
  {
    topic: "Chemical & Battery Manufacturing Plant Explosion-Proof (ATEX / Flameproof) HVAC Systems",
    category: "Industrial Process Chillers & Plant Overhauls",
    focus: "Zone 1 / Zone 2 hazardous area certification, spark-resistant copper fan blades, flameproof junction boxes, and static dissipative belt drives",
    keywords: "flameproof AC repair Pune, explosion proof HVAC service Ranjangaon, hazardous area air conditioning, chemical plant ventilation AMC",
  },
  {
    topic: "Industrial Capacitor Banks & Automatic Power Factor Controllers (APFC): Harmonic Mitigation for Heavy HVAC Loads",
    category: "Industrial Electronics & Power Systems",
    focus: "Detuned harmonic filter reactors (7% / 14%), heavy-duty metallized polypropylene capacitors, thyristor switching modules, and kVAR correction",
    keywords: "APFC panel repair Pune, industrial power factor controller HVAC, harmonic filter capacitor replacement, capacitor bank testing MIDC",
  },
];

export const brands = [
  "Daikin",
  "Voltas",
  "Blue Star",
  "LG",
  "Hitachi",
  "Carrier",
  "Panasonic",
  "Godrej",
  "O General",
  "Mitsubishi Heavy",
  "Whirlpool",
  "IFB",
  "Bosch",
  "Samsung",
  "Danfoss",
  "Copeland",
  "Bitzer",
];

export const sparePartsPriceList = [
  {
    part: "Inverter AC IPM Outdoor PCB Mainboard",
    minPrice: 3200,
    maxPrice: 6800,
    unit: "per board",
    warranty: "6 Months",
  },
  {
    part: "Rotary Inverter Compressor (1.5 Ton R32)",
    minPrice: 7800,
    maxPrice: 12800,
    unit: "per unit",
    warranty: "1 Year",
  },
  {
    part: "BLDC Outdoor Condenser Fan Motor",
    minPrice: 2200,
    maxPrice: 4600,
    unit: "per motor",
    warranty: "6 Months",
  },
  {
    part: "Electronic Expansion Valve (EEV) Coil & Body Kit",
    minPrice: 1850,
    maxPrice: 3700,
    unit: "per kit",
    warranty: "6 Months",
  },
  {
    part: "Refrigerator Inverter Linear Compressor",
    minPrice: 6800,
    maxPrice: 11500,
    unit: "per compressor",
    warranty: "1 Year",
  },
  {
    part: "Refrigerator Defrost Thermostat, Sensor & Bimetal Set",
    minPrice: 650,
    maxPrice: 1450,
    unit: "per kit",
    warranty: "3 Months",
  },
  {
    part: "Washing Machine Drum Spider & High-Speed Bearing Kit",
    minPrice: 2500,
    maxPrice: 4900,
    unit: "per kit",
    warranty: "6 Months",
  },
  {
    part: "Washing Machine Digital Inverter Control PCB Board",
    minPrice: 2900,
    maxPrice: 5600,
    unit: "per board",
    warranty: "6 Months",
  },
  {
    part: "Commercial Cassette Drain Lift Pump Motor",
    minPrice: 1850,
    maxPrice: 3200,
    unit: "per pump",
    warranty: "6 Months",
  },
  {
    part: "R-32 Refrigerant Gas Charging + Dry Nitrogen Leak Test",
    minPrice: 2200,
    maxPrice: 3500,
    unit: "per recharge",
    warranty: "90 Days",
  },
  {
    part: "R-410A Refrigerant Gas Charging + Deep Vacuuming",
    minPrice: 2500,
    maxPrice: 3800,
    unit: "per recharge",
    warranty: "90 Days",
  },
  {
    part: "Industrial Chiller Semi-Hermetic Oil Filter & Solenoid Kit",
    minPrice: 4500,
    maxPrice: 9500,
    unit: "per kit",
    warranty: "6 Months",
  },
  {
    part: "Industrial Cooling Tower PVC Honeycomb Fills (Fluted Block)",
    minPrice: 850,
    maxPrice: 1650,
    unit: "per block",
    warranty: "1 Year",
  },
];

export const errorCodes = [
  { code: "E1 / F0", name: "IPM Over-Current / Thermal Trip", desc: "Short-circuited IGBT, seized compressor rotor, or heat sink overheating" },
  { code: "E6 / CH05", name: "Serial Indoor-Outdoor Communication Lost", desc: "Damaged PC817 optocoupler, open communication wire, or SMPS voltage drop" },
  { code: "F3 / E4", name: "High Discharge Pipe Overheating (>115°C)", desc: "Low refrigerant gas level, pinched capillary/EEV, or clogged condenser fins" },
  { code: "E2 / CL", name: "Indoor Coil Freeze-Up / Sensor Open", desc: "Blocked air filter, failed cross-flow blower motor, or defective NTC thermistor" },
  { code: "UE / dE", name: "Washing Machine Unbalance / Door Lock Error", desc: "Worn drum spider bearing, uneven laundry load, or faulty PTC door latch" },
  { code: "dF / Er-FS", name: "Refrigerator Defrost Failure / Airflow Block", desc: "Blown thermal fuse, defective defrost heater glass tube, or ice dam in duct" },
];

export const authors = [
  "Saurav Kailas Temgire (Lead HVAC & Industrial Systems Engineer)",
  "Prime Cool Engineering Operations Team",
  "Senior Inverter PCB Electronics Specialist",
  "Commercial HVAC & Cold Storage Project Engineer",
];

export const defaultSettings = {
  model: "gemini-2.5-flash",
  fallbackModel: "gemini-1.5-flash",
  dailyTarget: 50,
  outputDir: "src/lib/blogs-data.json",
  dbPath: "data/db.json",
};
