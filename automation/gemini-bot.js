/**
 * Prime Cool HVAC & Industrial Appliance AI Blog Generator Bot
 * Powered by Google Gemini API, Active Deduplication & MySQL Database Sync
 * Daily Quotas: 10 Trending Topics, 20 Location SEO Blogs, 10 Commercial Blogs, 10 Industrial Blogs
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import mysql from "mysql2/promise";
import { buildTopicSeedBatch, generatePromptForTopic } from "./prompts.js";
import { DAILY_QUOTAS, defaultSettings, authors } from "./config.js";

// Load .env variables
function loadEnv() {
  try {
    const envPath = path.join(process.cwd(), ".env");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      content.split(/\r?\n/).forEach((line) => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
          const [key, ...value] = trimmed.split("=");
          const k = key.trim();
          let v = value.join("=").trim();
          if (
            (v.startsWith('"') && v.endsWith('"')) ||
            (v.startsWith("'") && v.endsWith("'"))
          ) {
            v = v.slice(1, -1);
          }
          process.env[k] = v;
        }
      });
    }
  } catch (err) {
    // Ignore error
  }
}

loadEnv();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

// Parse CLI args
function getArgValue(flag, defaultValue) {
  const args = process.argv.slice(2);
  const idx = args.indexOf(flag);
  if (idx !== -1 && args[idx + 1]) {
    return args[idx + 1];
  }
  return defaultValue;
}

const isDailyMode = process.argv.includes("--daily") || !process.argv.slice(2).some((a) => a.startsWith("--count"));
const targetCount = parseInt(getArgValue("--count", DAILY_QUOTAS.total), 10);
const targetType = getArgValue("--type", "all");

console.log("=================================================");
console.log("🤖 PRIME COOL GEMINI AI BLOG AUTOMATION BOT 🤖");
console.log("=================================================");
console.log(`Daily Quota Target : ${targetCount} blogs (10 Trending, 20 Location, 10 Commercial, 10 Industrial)`);
console.log(`Execution Mode     : ${isDailyMode ? "Automated Daily Batch" : "Custom Batch"}`);
console.log(
  `Gemini AI Engine   : ${GEMINI_API_KEY ? "✅ Configured (" + GEMINI_API_KEY.slice(0, 8) + "...)" : "⚡ Smart Fallback Engine Active"}`,
);
console.log(
  `MySQL Database     : ${process.env.DB_HOST ? "✅ " + process.env.DB_HOST + " (" + (process.env.DB_DATABASE || "primecool") + ")" : "⚠️ Local JSON Storage"}`,
);
console.log("=================================================\n");

/**
 * Invokes Google Gemini REST API with candidate models and JSON response guarantee
 */
async function callGeminiAPI(systemInstructions, userPrompt) {
  if (!GEMINI_API_KEY) return null;

  const candidateModels = ["gemini-2.5-flash", "gemini-flash-latest", "gemini-1.5-flash"];

  const payload = {
    contents: [
      {
        role: "user",
        parts: [{ text: `${systemInstructions}\n\n${userPrompt}` }],
      },
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 3000,
      responseMimeType: "application/json",
    },
  };

  for (const model of candidateModels) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": GEMINI_API_KEY,
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(2500),
      });

      if (!response.ok) continue;

      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) continue;

      const cleanedText = rawText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
      return JSON.parse(cleanedText);
    } catch (err) {
      // Continue to next model
    }
  }

  return null;
}

/**
 * Helper to clean kebab-case URL slugs
 */
function cleanSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Smart Fallback Engine: Generates comprehensive, SEO-optimized, technical blogs
 */
function generateSmartFallbackBlog(seed, blogId) {
  const { type, location, brand1, brand2, sparePart, errorCode, topicTitle, focus, category } = seed;
  const locStr = `${location.area}, ${location.city}`;
  const now = new Date(Date.now() - (targetCount - blogId) * 900000).toISOString();

  let title = "";
  let baseSlug = "";
  let summary = "";
  let content = "";
  let seoTitle = "";
  let seoDesc = "";
  let seoKeywords = "";

  if (type === "trending") {
    title = `${topicTitle}: Real-World Engineering Test & Efficiency Guide in ${location.area}`;
    baseSlug = cleanSlug(`${topicTitle}-${location.area}-${seed.dateKey || ""}-${blogId}`);
    summary = `In-depth technical breakdown of ${topicTitle.toLowerCase()}. Evaluating ISEER ratings, high-ambient cooling up to 52°C, inverter PCB power stage diagnostics, and spare parts pricing in ${locStr}.`;
    seoTitle = `${topicTitle.slice(0, 48)} in ${location.area} | Prime Cool`;
    seoDesc = `Complete engineering review of ${topicTitle.slice(0, 60)} in ${location.area}. Check ISEER ratings, spare parts pricing & doorstep repair.`;
    seoKeywords = `${topicTitle}, ${brand1}, ${brand2}, ${sparePart.part}, inverter AC repair ${location.area}, HVAC engineering Pune`;

    content = `## Engineering Analysis: ${topicTitle} in ${locStr}

Operating cooling and power electronics systems in **${locStr}** (${location.landmark}) demands high pull-down performance under harsh summer ambient temperatures exceeding 42°C and regional power line fluctuations.

### 1. Thermodynamic & Electronic Performance Principles
- **Inverter Compression & Modulation**: Advanced twin-rotary inverter compressors dynamically modulate motor frequency between 15 Hz and 110 Hz to maintain setpoint temperature with minimum thermal oscillation.
- **Power Efficiency & Heat Dissipation**: Hydrophobic blue-fin condenser coils and enlarged microchannel circuits provide superior heat rejection in dusty, high-ambient environments.
- **Micro-soldering & Circuit Protection**: Multi-stage metal oxide varistors (MOVs) and 440V surge arrestors guard sensitive IPM microcontrollers against sudden voltage spikes.

---

### 2. Technical Comparison Matrix: ${brand1} vs ${brand2}

| Engineering Metric | ${brand1} Inverter System | ${brand2} Inverter System |
| :--- | :--- | :--- |
| **Cooling Capacity** | 5,250 Watts (1.5 Ton) | 5,180 Watts (1.5 Ton) |
| **ISEER Energy Rating** | 5.28 Star Efficiency | 5.14 Star Efficiency |
| **Compressor Architecture** | DC Twin-Rotary Inverter | Smart Scroll Inverter |
| **Condenser Coil Material** | 100% Grooved Copper + Blue Fin | 100% Copper + Gold Fin |
| **IPM Surge Protection** | Built-in 440V Dual Clamping | Active Relay Shunt Guard |
| **Average Annual Power Draw** | 760 kWh / Year | 795 kWh / Year |
| **Spare Parts Hub** | Express Dispatch in ${location.area} | Central Pune OEM Stock |

---

### 3. Step-by-Step Multimeter Diagnostics & Error Code Matrix

When troubleshooting inverter board lockouts and power failure, certified Prime Cool technicians follow strict multimeter protocols:

| Error Code | Error Description | Root Cause | Repair Action |
| :--- | :--- | :--- | :--- |
| **${errorCode.code}** | ${errorCode.name} | ${errorCode.desc} | Replace damaged components & calibrate circuit |
| **E6 / CH05** | Communication Failure | Optical PC817 transceiver degraded | Re-solder optocoupler bank |
| **F3 / E4** | Discharge Pipe Overheating | Low R-32 refrigerant / pinched EEV | 450 PSI dry nitrogen test & gas top-up |
| **E2 / CL** | Evaporator Freeze-Up | Blocked airflow or thermistor open | High-pressure jet cleaning & sensor swap |

#### Diagnostic Protocol:
1. **Safety Discharge**: Disconnect utility power mains and safely discharge high-voltage 400V DC electrolytic capacitors through a 1kΩ 10W resistor.
2. **IPM Diode Check**: Measure forward voltage drop across U-V-W phase terminals with digital multimeter diode mode. Target range: **0.42V to 0.58V DC**.
3. **Low Voltage DC Rails**: Verify stable **15V DC** (IGBT gate drive), **12V DC** (relays), and **5V DC** (microcontroller VCC).

---

### 4. Genuine OEM Spare Parts Price Matrix (INR ₹)

| Component / Service | Price Range (₹) | Billing Unit | Warranty Coverage |
| :--- | :--- | :--- | :--- |
| **${sparePart.part} (OEM)** | **₹${sparePart.minPrice} - ₹${sparePart.maxPrice}** | ${sparePart.unit} | **${sparePart.warranty}** |
| **Field Diagnostic & Safety Inspection** | ₹350 - ₹450 | Per Visit | Adjusted in Repair Bill |
| **R-32 Refrigerant Gas Charge + Vacuuming** | ₹2,200 - ₹3,500 | Per Recharge | 90 Days Guarantee |
| **Indoor & Outdoor High-Pressure Jet Wash** | ₹599 - ₹899 | Per Unit | 30 Days Clean Warranty |

---

### 5. Frequently Asked Questions (FAQs)

#### Q1: What makes inverter cooling technology essential in ${location.area}?
Inverter systems prevent continuous full-load compressor restarts, lowering annual electricity bills by up to 38% while maintaining steady comfort despite Pune's summer thermal peaks.

#### Q2: How frequently should AC condenser coils be serviced in ${location.area}?
Due to industrial dust and ambient traffic near ${location.landmark}, condenser coils require chemical jet cleaning every 3 to 4 months to prevent high-head pressure compressor tripping.

#### Q3: Does Prime Cool provide doorstep warranty on spare parts?
Yes. Every genuine OEM part installed—including ${sparePart.part}—comes with an official manufacturer warranty (${sparePart.warranty}) and a Prime Cool labor guarantee.

---

### 6. 2-Hour Doorstep Service in ${location.area}
Need emergency inverter AC repair, PCB diagnostics, or gas charging in **${location.area}**? Contact **Prime Cool Pune** at **+91 7507408461** for immediate 45-minute engineer dispatch!`;

  } else if (type === "location") {
    title = `${location.area} Doorstep HVAC & Appliance Repair Guide: AC, Fridge & Washing Machine`;
    baseSlug = cleanSlug(`hvac-appliance-repair-service-${location.area}-pune-${seed.dateKey || ""}-${blogId}`);
    summary = `Complete doorstep HVAC, refrigerator, washing machine, and commercial cooling repair manual in ${locStr}. Features rapid dispatch SLAs, spare parts pricing, and troubleshooting tips.`;
    seoTitle = `AC & Appliance Repair in ${location.area} Pune | Prime Cool`;
    seoDesc = `Fast 45-min doorstep AC, Refrigerator & Washing Machine repair in ${location.area}, Pune. Genuine OEM parts, gas charging & 24/7 support.`;
    seoKeywords = `AC repair ${location.area}, refrigerator service ${location.area} Pune, washing machine repair ${location.area}, HVAC technician ${location.postal}`;

    content = `## Local Engineering Field Guide: ${location.area}, ${location.city}

Prime Cool operates dedicated mobile service vans across **${location.area}** (${location.landmark}, Postal: **${location.postal}**), offering prompt doorstep repair for residential homes, corporate IT offices, and commercial facilities.

### 1. Operational Climate & Electrical Challenges in ${location.area}
- **Utility Voltage Spikes**: Rapid urban and industrial development along ${location.hub} creates inductive power surges that frequently damage inverter PCB modules.
- **Hard Water Mineral Scaling**: High TDS municipal and borewell water causes rapid calcium deposits on washing machine drum bearings and boiler heater elements.
- **Dust & High Ambient Thermal Load**: Summer temperatures exceeding 42°C demand peak condenser airflow and clean heat exchangers.

---

### 2. Comprehensive Service Pricing in ${location.area} (INR ₹)

| Service Category | Typical Faults | Price Range (₹) | SLA in ${location.area} |
| :--- | :--- | :--- | :--- |
| **Inverter Split AC Service** | Low Cooling, Water Leak, Gas Leak | ₹599 - ₹2,800 | Under 45 Mins |
| **Inverter PCB Board Repair** | Error ${errorCode.code}, No Power | ₹1,800 - ₹4,500 | Same Day |
| **Double Door Fridge Repair** | Not Cooling, Defrost Failure | ₹650 - ₹3,200 | Under 60 Mins |
| **Front Load Washer Service** | Drum Vibration, Drain Error | ₹750 - ₹3,800 | Under 60 Mins |
| **${sparePart.part}** | Mechanical / Electrical Wear | **₹${sparePart.minPrice} - ₹${sparePart.maxPrice}** | Genuine OEM |

---

### 3. Step-by-Step Diagnostic Protocol for ${location.area} Technicians

1. **Refrigerant Pressure Verification**:
   - R-32 Running Suction: **115 - 130 PSI** (Ambient 35°C).
   - R-410A Running Suction: **120 - 135 PSI**.
   - Discharge Pressure: **380 - 420 PSI**.
2. **Capacitor & Motor Windings**:
   - Measure run capacitor capacitance (µF) with digital meter (tolerance ±5%).
   - Verify 3-phase compressor winding balance (U-V, V-W, W-U within 0.2Ω).
3. **Error Code Resolution**:
   - Resolve **${errorCode.code}** by executing full circuit diagnostic and sensor replacement.

---

### 4. Frequently Asked Questions (FAQs) in ${location.area}

#### Q1: How quickly can an engineer reach my home in ${location.area}?
Our dedicated dispatch hub near ${location.landmark} guarantees an on-site technician arrival within 30 to 45 minutes for emergency cooling breakdowns.

#### Q2: Do you service all major appliance brands in ${location.area}?
Yes. We service all major brands including Daikin, Voltas, LG, Samsung, Blue Star, Whirlpool, Bosch, IFB, and Godrej with genuine OEM spare parts.

#### Q3: What warranty do you offer on AC gas refills in ${location.area}?
All AC refrigerant gas recharging includes a mandatory 450 PSI nitrogen leak test, deep electronic vacuuming, and a 90-day leak-free guarantee.

---

### 5. Book Emergency Doorstep Service in ${location.area}
Call **Prime Cool Pune** today at **+91 7507408461** or book online for fast, certified doorstep repair in **${location.area}**!`;

  } else if (type === "commercial") {
    title = `${topicTitle}: Commercial Engineering & AMC Manual in ${location.area}`;
    baseSlug = cleanSlug(`${topicTitle}-${location.area}-${seed.dateKey || ""}-${blogId}`);
    summary = `Official commercial HVAC, VRV/VRF, cold room, and ducted climate systems maintenance manual for corporate facilities and restaurants in ${locStr}.`;
    seoTitle = `Commercial HVAC & Cold Room AMC ${location.area} | Prime Cool`;
    seoDesc = `Expert commercial HVAC, VRF/VRV, and Cold Storage maintenance in ${location.area}, Pune. 24/7 corporate AMC SLAs & certified engineers.`;
    seoKeywords = `${topicTitle}, commercial HVAC Pune, VRV system maintenance ${location.area}, cold room repair Pune, chiller AMC contract`;

    content = `## Commercial Engineering Field Manual: ${topicTitle}

Commercial enterprises, IT parks, hotels, and retail stores across **${locStr}** require continuous, high-efficiency climate control and refrigeration systems to protect operational continuity.

### 1. Commercial System Dynamics: ${focus}
- **Part-Load Efficiency (IPLV)**: Modulating compressor staging and electronically commutated (EC) fans deliver peak energy efficiency during varying occupancy loads.
- **Microprocessor Automation**: Centralized building management systems (BMS) continuously log suction/discharge pressures, refrigerant superheat, and power factor.
- **Condenser Descaling**: Chemical descaling of water-cooled and air-cooled heat exchangers prevents high-discharge head pressure lockouts.

---

### 2. Commercial Capacity & Engineering Specifications

| Parameter | Standard Commercial Spec | High-Efficiency Inverter Tier |
| :--- | :--- | :--- |
| **Refrigerant Type** | R-410A / R-407C / R-32 | Eco Low-GWP R-32 / R-454B |
| **Part-Load IPLV / COP** | 3.80 - 4.50 COP | 5.20 - 6.40 COP |
| **Piping Lift Distance** | Up to 50 Meters | Up to 110 Meters |
| **Operating Ambient Range** | -5°C to +48°C | -10°C to +52°C |
| **Noise Level @ 1 Meter** | 58 - 68 dBA | 48 - 56 dBA (Whisper Quiet) |
| **Preventive AMC Frequency** | Bi-Monthly Audits | Monthly 36-Point Inspection |

---

### 3. Commercial Safety Interlocks & Error Matrix

| Error Code | Commercial Fault | Impact | Maintenance Action |
| :--- | :--- | :--- | :--- |
| **${errorCode.code}** | ${errorCode.name} | System Safety Shutdown | Inspect power stage, clear restrictions |
| **HP Lockout** | High Condenser Pressure (>420 PSI) | Compressor Overload Trip | Descale fins, replace condenser fan |
| **LP Lockout** | Low Suction Pressure (<40 PSI) | Coil Freezing & Low Cooling | Locate leak, flush with nitrogen |
| **Phase Error** | Phase Reversal / Voltage Asymmetry | Motor Direction Inversion | Reset phase sequence monitor |

---

### 4. Commercial Spare Parts & AMC Pricing (INR ₹)

| Component / Commercial Service | Rate Range (₹) | Billing Basis | Warranty Coverage |
| :--- | :--- | :--- | :--- |
| **${sparePart.part}** | **₹${sparePart.minPrice} - ₹${sparePart.maxPrice}** | ${sparePart.unit} | **${sparePart.warranty}** |
| **Commercial VRV/VRF Quarterly AMC** | ₹1,800 - ₹3,500 | Per Indoor/Outdoor Unit | 1 Year Comprehensive |
| **Cold Room Deep Freezer Overhaul** | ₹6,500 - ₹18,500 | Per Chiller System | 6 Months Warranty |
| **Chemical Condenser Coil Descaling** | ₹1,200 - ₹2,500 | Per 5-10 TR Unit | Immediate Delta-T Gain |

---

### 5. Facility Manager FAQs

#### Q1: What response time is guaranteed under Prime Cool Commercial AMCs?
Our corporate AMC contracts include a guaranteed 2-hour on-site breakdown response across Pune and PCMC industrial corridors.

#### Q2: How can we reduce commercial HVAC energy bills?
By maintaining correct refrigerant superheat (6K - 8K), cleaning condenser coils monthly, and programming BMS setback schedules, facilities reduce power draw by 18% to 26%.

---

### 6. Commercial AMC & Breakdown Hotline
Partner with **Prime Cool** for enterprise HVAC & cold chain reliability in **${location.area}**. Call **+91 7507408461** for a free site audit.`;

  } else {
    // Industrial
    title = `${topicTitle}: Industrial Process Cooling Overhaul in ${location.area} MIDC`;
    baseSlug = cleanSlug(`${topicTitle}-${location.area}-midc-${seed.dateKey || ""}-${blogId}`);
    summary = `Comprehensive heavy industrial engineering manual covering ${topicTitle.toLowerCase()} in ${locStr}. Includes process chiller overhauls, cooling tower maintenance, and VFD drive repair.`;
    seoTitle = `Industrial Chiller & Process Cooling ${location.area} | Prime Cool`;
    seoDesc = `Heavy industrial chiller repair, cooling tower overhaul & HVAC engineering in ${location.area} MIDC, Pune. 24/7 breakdown support.`;
    seoKeywords = `${topicTitle}, industrial chiller repair Pune, cooling tower overhaul Chakan Bhosari, process cooling maintenance MIDC`;

    content = `## Heavy Industrial Engineering Guide: ${topicTitle}

Manufacturing plants, automotive factories, cleanrooms, and chemical processing facilities across **${locStr}** (${location.landmark}) depend on continuous, high-capacity cooling systems to prevent severe production downtime.

### 1. Heavy Industrial Process Cooling Dynamics: ${focus}
- **Process Water Chiller Staging (50 to 500 TR)**: Screw, centrifugal, and multi-scroll chillers maintain tight chilled water tolerances (6°C - 10°C) for injection molding, CNC tooling, and chemical reactors.
- **Cooling Tower Heat Transfer**: Induced-draft counter-flow cooling towers require optimal liquid-to-gas ratios (L/G) and clean PVC honeycomb fills to maintain design approach temperatures below 4°C.
- **Power Electronics & VFD Inverter Drives**: Heavy-duty variable frequency drives require ripple-free DC bus capacitors and clean heat sinks to prevent thermal trips under high ambient plant conditions.

---

### 2. Heavy Industrial Engineering Performance Matrix

| Engineering Metric | Standard Chiller Plant | Optimized High-Efficiency Plant |
| :--- | :--- | :--- |
| **Power Consumption (IKW/TR)** | 0.85 - 0.98 kW / TR | 0.54 - 0.68 kW / TR |
| **Evaporator Approach Temp** | 3.5°C - 5.0°C | 1.2°C - 2.0°C |
| **Cooling Tower Approach** | 5.5°C - 7.0°C | 2.8°C - 3.8°C |
| **Vibration Velocity RMS** | < 4.5 mm/s | < 1.8 mm/s (Precision Balanced) |
| **Refrigerant Charge** | R-134a / R-407C / R-410A | Low GWP R-513A / R-1234ze / Ammonia |
| **Oil Acid Number (TAN)** | < 0.15 mg KOH/g | < 0.04 mg KOH/g (Pure Grade) |

---

### 3. Industrial Diagnostic & Safety Interlock Protocols

| Fault Code / Symptom | Root Cause | Impact on Plant | Engineering Solution |
| :--- | :--- | :--- | :--- |
| **${errorCode.code}** | ${errorCode.name} | Process Stoppage | Calibrate sensor & replace worn power stage |
| **High Oil Temp (>65°C)** | Oil cooler scaling / filter clog | Lubrication breakdown | Clean shell-and-tube oil cooler, replace filter |
| **Low Evaporator Pressure** | Tube fouling / gas leakage | Risk of water freeze-up | Eddy-current test tubes, recharge refrigerant |
| **Tower Fan Vibration** | Blade imbalance / worn bearing | Tower structural damage | Dynamic laser balancing, replace spherical bearings |

---

### 4. Heavy Industrial Spare Parts & Overhaul Rates (INR ₹)

| Industrial Component / Service | Pricing Range (₹) | Billing Unit | Warranty Coverage |
| :--- | :--- | :--- | :--- |
| **${sparePart.part}** | **₹${sparePart.minPrice} - ₹${sparePart.maxPrice}** | ${sparePart.unit} | **${sparePart.warranty}** |
| **50-200 TR Screw Compressor Overhaul** | ₹35,000 - ₹95,000 | Per Compressor | 1 Year Service Warranty |
| **Cooling Tower Complete PVC Fill Repack** | ₹18,000 - ₹55,000 | Per Cell | 2 Years Warranty |
| **Industrial VFD / Inverter Drive Rebuild** | ₹12,500 - ₹38,000 | Per Module | 6 Months Warranty |

---

### 5. Industrial Plant Engineer FAQs

#### Q1: How does Prime Cool prevent catastrophic process chiller downtime?
We implement monthly vibration FFT spectrum analysis, oil spectrographic testing, and eddy-current tube wall thinning audits during scheduled low-production windows.

#### Q2: What is your emergency response SLA in Chakan, Bhosari, and Ranjangaon MIDC?
Prime Cool maintains pre-staged OEM spares and dedicated industrial mobile response units with guaranteed on-site arrival within 90 to 120 minutes.

---

### 6. Industrial Engineering Support in ${location.area}
For 24/7 emergency industrial mechanical dispatch or comprehensive annual maintenance contracts (AMC), call **Prime Cool Lead Engineers** at **+91 7507408461**.`;
  }

  return {
    id: `blog-prime-${Date.now()}-${blogId}`,
    title,
    slug: baseSlug,
    content,
    summary,
    category,
    author: seed.author || authors[blogId % authors.length],
    seoTitle,
    seoDesc,
    seoKeywords,
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * Direct MySQL Database Sync Function
 */
async function syncWithMySQL(blogs) {
  const host = process.env.DB_HOST;
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const database = process.env.DB_DATABASE;

  if (!host || !user || !database) {
    console.log("ℹ️ MySQL credentials not configured in .env (Skipping remote database sync).");
    return;
  }

  console.log(`\n🗄️ Connecting to MySQL Database (${host})...`);
  let connection;

  try {
    connection = await mysql.createConnection({
      host,
      port: parseInt(process.env.DB_PORT || "3306", 10),
      user,
      password,
      database,
      connectTimeout: 10000,
    });

    // Ensure blogs table exists
    await connection.query(`
      CREATE TABLE IF NOT EXISTS blogs (
        id VARCHAR(64) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        content LONGTEXT NOT NULL,
        summary TEXT NOT NULL,
        image LONGTEXT,
        category VARCHAR(128),
        author VARCHAR(128),
        seoTitle VARCHAR(255),
        seoDesc VARCHAR(255),
        updatedAt VARCHAR(64),
        createdAt VARCHAR(64) NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    let insertedCount = 0;
    for (const b of blogs) {
      await connection.query(
        `INSERT INTO blogs (id, title, slug, content, summary, image, category, author, seoTitle, seoDesc, updatedAt, createdAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
           title = VALUES(title),
           content = VALUES(content),
           summary = VALUES(summary),
           category = VALUES(category),
           seoTitle = VALUES(seoTitle),
           seoDesc = VALUES(seoDesc),
           updatedAt = VALUES(updatedAt)`,
        [
          b.id,
          b.title,
          b.slug,
          b.content,
          b.summary,
          b.image || null,
          b.category || null,
          b.author || null,
          b.seoTitle || null,
          b.seoDesc || null,
          b.updatedAt || b.createdAt,
          b.createdAt,
        ],
      );
      insertedCount++;
    }

    console.log(`✅ Successfully synced ${insertedCount} blogs into MySQL database table 'blogs'!`);
  } catch (err) {
    console.warn(`⚠️ MySQL Database Sync Warning: ${err.message}`);
  } finally {
    if (connection) await connection.end();
  }
}

/**
 * Main Execution Function
 */
async function runBot() {
  const blogsDataPath = path.join(process.cwd(), "src", "lib", "blogs-data.json");
  const dbDataPath = path.join(process.cwd(), "data", "db.json");

  // 1. Load existing blogs to build comprehensive deduplication sets
  let existingBlogs = [];
  try {
    if (fs.existsSync(blogsDataPath)) {
      existingBlogs = JSON.parse(fs.readFileSync(blogsDataPath, "utf-8"));
    }
  } catch (e) {
    existingBlogs = [];
  }

  const existingSlugs = new Set(existingBlogs.map((b) => b.slug.toLowerCase().trim()));
  const existingTitles = new Set(existingBlogs.map((b) => b.title.toLowerCase().trim()));

  console.log(`📊 Existing Blog Database: ${existingBlogs.length} blogs loaded.`);

  // 2. Build topic seed batch
  let seeds = buildTopicSeedBatch(targetCount, existingSlugs);

  // Filter by type if requested
  if (targetType !== "all") {
    seeds = seeds.filter((s) => s.type === targetType);
  }

  const generatedBlogs = [];
  let geminiSuccessCount = 0;
  let fallbackCount = 0;
  let duplicatePreventedCount = 0;
  let consecutiveApiFailures = 0;

  const categoryStats = {
    trending: 0,
    location: 0,
    commercial: 0,
    industrial: 0,
  };

  console.log(`🚀 Generating ${seeds.length} SEO blogs with Active Deduplication...\n`);

  for (let i = 0; i < seeds.length; i++) {
    const seed = seeds[i];
    const { systemInstructions, userPrompt } = generatePromptForTopic(seed);

    process.stdout.write(
      ` [${i + 1}/${seeds.length}] [${seed.type.toUpperCase()}] "${seed.topicTitle.slice(0, 35)}..." (${seed.location.area})... `,
    );

    let blogObj = null;

    if (GEMINI_API_KEY && consecutiveApiFailures < 2) {
      try {
        const aiData = await callGeminiAPI(systemInstructions, userPrompt);
        if (aiData && aiData.title && aiData.content) {
          consecutiveApiFailures = 0;
          let slug = cleanSlug(aiData.slug || aiData.title);

          // Deduplication check
          if (existingSlugs.has(slug)) {
            slug = `${slug}-${seed.dateKey || Date.now()}-${i + 1}`;
            duplicatePreventedCount++;
          }

          blogObj = {
            id: `blog-gemini-${Date.now()}-${i + 1}`,
            title: aiData.title,
            slug,
            content: aiData.content,
            summary: aiData.summary || aiData.title,
            category: aiData.category || seed.category,
            author: aiData.author || seed.author || authors[i % authors.length],
            seoTitle: aiData.seoTitle || `${aiData.title.slice(0, 48)} | Prime Cool`,
            seoDesc: aiData.seoDesc || aiData.summary.slice(0, 155),
            seoKeywords: aiData.seoKeywords || seed.keywords,
            createdAt: new Date(Date.now() - (seeds.length - i) * 900000).toISOString(),
            updatedAt: new Date().toISOString(),
          };
          geminiSuccessCount++;
          console.log(`✅ Gemini API`);
        } else {
          consecutiveApiFailures++;
        }
      } catch (err) {
        consecutiveApiFailures++;
      }
    }

    if (!blogObj) {
      blogObj = generateSmartFallbackBlog(seed, i + 1);

      // Deduplication check
      if (existingSlugs.has(blogObj.slug.toLowerCase().trim())) {
        blogObj.slug = `${blogObj.slug}-${Date.now().toString(36)}`;
        duplicatePreventedCount++;
      }

      fallbackCount++;
      console.log(`⚡ Smart Fallback Engine`);
    }

    // Register generated slug into set to prevent within-batch duplication
    existingSlugs.add(blogObj.slug.toLowerCase().trim());
    existingTitles.add(blogObj.title.toLowerCase().trim());

    if (categoryStats[seed.type] !== undefined) {
      categoryStats[seed.type]++;
    }

    generatedBlogs.push(blogObj);
  }

  // 3. Save new unique blogs
  const finalSlugs = new Set();
  const dedupedGenerated = [];

  for (const b of generatedBlogs) {
    if (!finalSlugs.has(b.slug)) {
      finalSlugs.add(b.slug);
      dedupedGenerated.push(b);
    }
  }

  const updatedBlogs = [...dedupedGenerated, ...existingBlogs];

  // Write to src/lib/blogs-data.json
  fs.writeFileSync(blogsDataPath, JSON.stringify(updatedBlogs, null, 2));
  console.log(
    `\n💾 Saved ${updatedBlogs.length} total blogs to src/lib/blogs-data.json (+${dedupedGenerated.length} new blogs added)`,
  );

  // Write to data/db.json
  try {
    if (fs.existsSync(dbDataPath)) {
      const dbContent = JSON.parse(fs.readFileSync(dbDataPath, "utf-8"));
      dbContent.blogs = updatedBlogs;
      fs.writeFileSync(dbDataPath, JSON.stringify(dbContent, null, 2));
      console.log(`💾 Updated data/db.json successfully!`);
    }
  } catch (e) {
    console.warn(`[Warning] Could not update data/db.json: ${e.message}`);
  }

  // 4. Direct MySQL Sync
  await syncWithMySQL(dedupedGenerated);

  // 5. Automatically Regenerate Sitemaps
  try {
    console.log("\n🌐 Regenerating sitemap.xml with new blog entries...");
    execSync("npm run sitemap", { stdio: "inherit" });
    console.log("✅ Sitemap updated successfully!");
  } catch (err) {
    console.warn(`⚠️ Sitemap update notice: ${err.message}`);
  }

  console.log("\n=================================================");
  console.log("🎉 DAILY BATCH GENERATION COMPLETED 🎉");
  console.log(`Total New Blogs Added : ${dedupedGenerated.length}`);
  console.log(`  - Trending Blogs    : ${categoryStats.trending} (Target: ${DAILY_QUOTAS.trending})`);
  console.log(`  - Location Blogs    : ${categoryStats.location} (Target: ${DAILY_QUOTAS.location})`);
  console.log(`  - Commercial Blogs  : ${categoryStats.commercial} (Target: ${DAILY_QUOTAS.commercial})`);
  console.log(`  - Industrial Blogs  : ${categoryStats.industrial} (Target: ${DAILY_QUOTAS.industrial})`);
  console.log(`Deduplication Handled : ${duplicatePreventedCount} duplicates prevented`);
  console.log(`Gemini API Powered    : ${geminiSuccessCount}`);
  console.log(`Smart AI Engine       : ${fallbackCount}`);
  console.log(`Total Blog Database   : ${updatedBlogs.length} blogs active`);
  console.log("=================================================");
}

runBot().catch((err) => {
  console.error("❌ Fatal Error in Blog Bot:", err);
  process.exit(1);
});
