/**
 * Automation Bot Configuration
 * Prime Cool HVAC, Refrigeration & Home Appliance Blog Engine
 * Strictly aligned with website content & high-ranking Google Search queries
 */

export const categories = [
  "Trending Brand Comparisons (Daikin, Voltas, LG, Blue Star)",
  "Inverter AC Repair & R-32/R-410A Gas Charging Guides",
  "Refrigerator Cooling Failure & Defrost Thermostat Diagnostics",
  "Washing Machine Drum Noise, Bearing & PCB Mainboard Repair",
  "Inverter PCB & Microcontroller Electronics Repair (IPM & SMPS)",
  "Commercial VRF/VRV & Multi-Zone Climate Systems",
  "Industrial Process Chillers & Cold Storage Overhauls",
  "OEM Spare Parts Price List & Replacement Standards (INR ₹)",
  "Regional HVAC & Appliance Emergency Field Dispatch (Pune & Maharashtra)"
];

export const websiteServices = [
  { name: "Inverter Split AC Repair & Jet Cleaning", slug: "split-ac-repair", category: "hvac" },
  { name: "Cassette & Package AC Installation", slug: "cassette-ac-installation", category: "hvac" },
  { name: "Double Door Frost-Free Refrigerator Repair", slug: "frost-free-fridge-repair", category: "refrigeration" },
  { name: "Commercial Cold Room & Deep Freezer Servicing", slug: "cold-room-repair", category: "refrigeration" },
  { name: "Front Load Fully Automatic Washing Machine Servicing", slug: "front-load-washer-repair", category: "washing_machine" },
  { name: "Top Load Digital Inverter Washer Repair", slug: "top-load-washer-repair", category: "washing_machine" },
  { name: "Inverter AC IPM PCB Board Micro-soldering", slug: "inverter-pcb-repair", category: "electronics" },
  { name: "Commercial VRF/VRV System AMC Maintenance", slug: "vrf-system-amc", category: "commercial" },
  { name: "Industrial Process Water Chiller Maintenance", slug: "industrial-chiller-overhaul", category: "industrial" }
];

export const brands = [
  "Daikin", "Voltas", "Blue Star", "LG", "Hitachi", "Carrier", 
  "Panasonic", "Godrej", "O General", "Mitsubishi Heavy", "Whirlpool", "IFB", "Bosch", "Samsung"
];

export const comparisonPairs = [
  { p1: "Daikin 1.5 Ton 5-Star Inverter AC", p2: "Voltas Adjustable Inverter AC", aspect: "ISEER Rating, Pull-down Speed & Power Draw" },
  { p1: "LG Dual Inverter AI AC", p2: "Hitachi Expandable Inverter AC", aspect: "High Ambient Cooling up to 52°C" },
  { p1: "Blue Star Commercial Cassette", p2: "O General Tropical Inverter AC", aspect: "Industrial Duty & Condenser Fin Durability" },
  { p1: "LG Side-by-Side Convertible Refrigerator", p2: "Samsung Curd Maestro Inverter Refrigerator", aspect: "Linear Compressor Reliability & Cooling Retention" },
  { p1: "Whirlpool Intellifresh Inverter Refrigerator", p2: "Godrej Eon Frost Free Refrigerator", aspect: "Defrost Heater Efficiency & Energy Consumption" },
  { p1: "IFB Front Load Direct Drive Washer", p2: "Bosch Serie 6 Front Load Washing Machine", aspect: "Drum Bearing Longevity & Spin Vibration Control" },
  { p1: "LG AI DD Front Load Washer", p2: "Samsung Digital Inverter Top Load Washer", aspect: "PCB Control Failure & Motor Replacement Cost" },
  { p1: "Screw Chiller 200 TR", p2: "Centrifugal Chiller 500 TR", aspect: "Industrial Process Efficiency (IKW/TR)" },
  { p1: "VRF Heat Pump System", p2: "VRF Heat Recovery 3-Pipe System", aspect: "Commercial Office Multi-Zone Energy Audit" }
];

export const sparePartsPriceList = [
  { part: "Inverter AC IPM Outdoor PCB Mainboard", minPrice: 3200, maxPrice: 6800, unit: "per board", warranty: "6 Months" },
  { part: "Rotary Inverter Compressor (1.5 Ton R32)", minPrice: 7800, maxPrice: 12800, unit: "per unit", warranty: "1 Year" },
  { part: "BLDC Outdoor Condenser Fan Motor", minPrice: 2200, maxPrice: 4600, unit: "per motor", warranty: "6 Months" },
  { part: "Electronic Expansion Valve (EEV) Kit", minPrice: 1850, maxPrice: 3700, unit: "per kit", warranty: "6 Months" },
  { part: "Refrigerator Inverter Linear Compressor", minPrice: 6800, maxPrice: 11500, unit: "per compressor", warranty: "1 Year" },
  { part: "Refrigerator Defrost Thermostat & Bimetal Set", minPrice: 650, maxPrice: 1450, unit: "per kit", warranty: "3 Months" },
  { part: "Washing Machine Drum Spider & Bearing Kit", minPrice: 2500, maxPrice: 4900, unit: "per kit", warranty: "6 Months" },
  { part: "Washing Machine Digital Control PCB Board", minPrice: 2900, maxPrice: 5600, unit: "per board", warranty: "6 Months" },
  { part: "Washing Machine Drain Pump Motor", minPrice: 850, maxPrice: 1950, unit: "per unit", warranty: "6 Months" },
  { part: "R-32 Refrigerant Gas Charging + Nitrogen Flush", minPrice: 2200, maxPrice: 3500, unit: "per recharge", warranty: "90 Days" },
  { part: "R-410A Refrigerant Gas Charging + Vacuuming", minPrice: 2500, maxPrice: 3800, unit: "per recharge", warranty: "90 Days" },
  { part: "Copper Pipe Extension (Dual 1/4 & 1/2 inch)", minPrice: 380, maxPrice: 560, unit: "per feet", warranty: "1 Year" },
  { part: "Dual Run Compressor Capacitor 45+5 uF", minPrice: 450, maxPrice: 950, unit: "per capacitor", warranty: "6 Months" }
];

export const locations = [
  { city: "Pune", area: "Shirur", postal: "412210", landmark: "Shirur MIDC & Bypass Highway" },
  { city: "Pune", area: "Wagholi", postal: "412207", landmark: "Bakarwadi & Pune-Nagar Road" },
  { city: "Pune", area: "Hadapsar", postal: "411028", landmark: "Magarpatta City & SP Infocity" },
  { city: "Pune", area: "Kharadi", postal: "411014", landmark: "EON IT Park & World Trade Center" },
  { city: "Pune", area: "Chakan", postal: "410501", landmark: "Chakan Industrial Zone Phase 1-4" },
  { city: "Pune", area: "Ranjangaon", postal: "412209", landmark: "Ranjangaon MIDC Electronics Corridor" },
  { city: "Pune", area: "PCMC", postal: "411018", landmark: "Pimpri Chinchwad Industrial Belt" },
  { city: "Pune", area: "Kothrud", postal: "411038", landmark: "Chandani Chowk & Paud Road" },
  { city: "Pune", area: "Viman Nagar", postal: "411014", landmark: "Phoenix Marketcity & Airport Corridor" },
  { city: "Pune", area: "Bhosari", postal: "411026", landmark: "Bhosari MIDC & Telco Circle" },
  { city: "Pune", area: "Hinjewadi", postal: "411057", landmark: "Rajiv Gandhi Tech Park Phase 1-3" },
  { city: "Pune", area: "Shikrapur", postal: "412208", landmark: "Chakan-Shikrapur State Highway" },
  { city: "Pune", area: "Lonikand", postal: "412216", landmark: "Nagar Highway Logistics Hub" },
  { city: "Thane", area: "Thane West", postal: "400601", landmark: "Ghodbunder Road & Wagle Industrial Estate" },
  { city: "Nashik", area: "Ambad MIDC", postal: "422010", landmark: "Nashik Manufacturing Belt" }
];

export const defaultSettings = {
  model: "gemini-2.5-flash",
  fallbackModel: "gemini-1.5-flash",
  dailyTarget: 50,
  outputDir: "src/lib/blogs-data.json",
  dbPath: "data/db.json"
};
