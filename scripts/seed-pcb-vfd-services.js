import fs from "fs";
import path from "path";

// Generate 50 PCB Services & 60 VFD Services
const pcbServices = [];
const vfdServices = [];

const pcbTopics = [
  "IPM Module IGBT Transistor Switching Repair",
  "SMPS Switch-Mode Power Supply 15V Rail Repair",
  "Optocoupler Communication Loop Refurbishment",
  "Microcontroller EEPROM Data Flashing & Tuning",
  "Current Sensing Shunt Resistor Calibration",
  "BLDC Condenser Fan Motor Driver IC Repair",
  "DC Bus High Voltage Capacitor Refurbishment",
  "Inverter Drive Phase Voltage Unbalance Fix",
  "PCB Heatsink Compound Repasting & Descaling",
  "Surge Varistor MOV Overvoltage Protection Fix"
];

const vfdTopics = [
  "Chiller Pump Motor VFD Carrier Frequency Tuning",
  "Cooling Tower Fan VFD PID Temperature Loop Setup",
  "VFD Active Harmonic Filter & Line Reactor Setup",
  "VFD DC Bus Electrolytic Capacitor Bank Overhaul",
  "Soft-Starter to Variable Frequency Drive Upgrade",
  "VFD Modbus RS-485 Telemetry & SCADA Integration",
  "AHU Supply Fan VFD Differential Pressure Setup",
  "VFD Braking Resistor & Dynamic Stopping Tune",
  "Submersible Water Pump VFD Constant Pressure Setup",
  "Industrial Conveyor Motor VFD Torque Vector Tuning"
];

const brands = ["Daikin", "Voltas", "Blue Star", "LG", "Hitachi", "Carrier", "Panasonic", "Godrej", "O General", "Mitsubishi", "Danfoss", "ABB", "Schneider", "Siemens", "Yaskawa"];

// Generate 50 PCB Services
for (let i = 1; i <= 50; i++) {
  const brand = brands[i % brands.length];
  const topic = pcbTopics[i % pcbTopics.length];
  const slug = `pcb-${brand.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${topic.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${i}`;
  const title = `${brand} Inverter AC PCB: ${topic} #${i}`;
  
  pcbServices.push({
    slug,
    title,
    category: "industrial",
    tagline: `Precision component-level electronics repair for ${brand} inverter AC & VRF mainboards.`,
    description: `Professional PCB electronics repair for ${brand} inverter air conditioners. Includes ${topic.toLowerCase()}, oscilloscope signal analysis, SMD diode replacement, and high-voltage capacitor testing.`,
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "Component-level SMD IC and diode replacement",
      "Thermal compound repasting & heatsink cleaning",
      "24-Hour continuous load bench testing"
    ],
    process: [
      "Diagnostic isolation of high voltage DC bus vs low voltage logic rail",
      "Component desoldering using ESD-safe rework station",
      "Replacement with OEM rated capacitors and IGBT modules",
      "Coating mainboard with conformal moisture isolation resin"
    ],
    faqs: [
      { q: `Can a burnt ${brand} PCB be repaired instead of replaced?`, a: "Yes! Over 90% of inverter PCB failures are caused by burnt SMPS diodes or IPM modules which can be repaired at a fraction of mainboard replacement cost." }
    ],
    seoTitle: `${title} | Prime Cool`,
    seoDesc: `Component-level repair for ${brand} inverter AC PCBs in Pune & MIDC industrial parks. Specialist in ${topic}.`
  });
}

// Generate 60 VFD Services
for (let i = 1; i <= 60; i++) {
  const brand = brands[i % brands.length];
  const topic = vfdTopics[i % vfdTopics.length];
  const slug = `vfd-${brand.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${topic.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${i}`;
  const title = `${brand} VFD Engineering: ${topic} #${i}`;

  vfdServices.push({
    slug,
    title,
    category: "industrial",
    tagline: `Variable Frequency Drive (VFD) parameterization, harmonic filtering, and motor control for industrial HVAC.`,
    description: `Industrial VFD service and parameterization for ${brand} drives. Specializing in ${topic.toLowerCase()}, motor acceleration curves, harmonic suppression, and energy optimization for factory chillers and cooling towers.`,
    priceEstimate: "Starts from ₹2,499 + Spares",
    features: [
      "PID loop parameterization & sensor feedback calibration",
      "Harmonic suppression & dV/dt filter installation",
      "DC bus capacitor bank health audit",
      "Modbus / BACnet SCADA communication setup"
    ],
    process: [
      "Motor nameplate data input and auto-tuning calibration",
      "Acceleration & deceleration ramp curve optimization",
      "Thermal overload relay & short-circuit trip verification",
      "Full load current and harmonic distortion harmonic logging"
    ],
    faqs: [
      { q: `How much energy does installing a VFD on a cooling tower save?`, a: "Installing a VFD allows fan speed modulation based on wet-bulb temperature, reducing fan electrical consumption by up to 35-50%." }
    ],
    seoTitle: `${title} | Prime Cool`,
    seoDesc: `Industrial VFD tuning and repair for ${brand} drives in Chakan & Ranjangaon MIDC. ${topic}.`
  });
}

console.log(`Generated ${pcbServices.length} PCB Services and ${vfdServices.length} VFD Services! Total: ${pcbServices.length + vfdServices.length}`);

// Read current services-data.ts
const servicesDataPath = path.join(process.cwd(), "src", "lib", "services-data.ts");
let currentContent = fs.readFileSync(servicesDataPath, "utf8");

// Parse existing export const servicesData
const allNewServices = [...pcbServices, ...vfdServices];
const newEntries = allNewServices.map(s => `  "${s.slug}": ${JSON.stringify(s, null, 4)}`).join(",\n");

// Insert new entries into servicesData object
const insertMarker = "export const servicesData: Record<string, ServiceDetail> = {";
const updatedContent = currentContent.replace(
  insertMarker,
  `${insertMarker}\n${newEntries},`
);

fs.writeFileSync(servicesDataPath, updatedContent, "utf8");
console.log(`Successfully updated ${servicesDataPath} with ${allNewServices.length} new services!`);

// Update sitemap-constants.ts
const sitemapConstantsPath = path.join(process.cwd(), "src", "lib", "sitemap-constants.ts");
let sitemapContent = fs.readFileSync(sitemapConstantsPath, "utf8");

const newSlugs = allNewServices.map(s => `  "${s.slug}"`).join(",\n");
sitemapContent = sitemapContent.replace(
  "export const SERVICES = [",
  `export const SERVICES = [\n${newSlugs},`
);

fs.writeFileSync(sitemapConstantsPath, sitemapContent, "utf8");
console.log(`Successfully updated ${sitemapConstantsPath} with ${allNewServices.length} new service slugs!`);
