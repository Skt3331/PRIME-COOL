/**
 * Prime Cool HVAC & Appliance AI Blog Generator Bot
 * Powered by Google Gemini API & MySQL Database Sync
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import mysql from "mysql2/promise";
import { buildTopicSeedBatch, generatePromptForTopic } from "./prompts.js";
import { defaultSettings } from "./config.js";

// Load .env variables
function loadEnv() {
  try {
    const envPath = path.join(process.cwd(), ".env");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      content.split("\n").forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
          const [key, ...value] = trimmed.split("=");
          const k = key.trim();
          const v = value.join("=").trim().replace(/^["']|["']$/g, "");
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

const targetCount = parseInt(getArgValue("--count", defaultSettings.dailyTarget), 10);

console.log("=================================================");
console.log("🤖 PRIME COOL GEMINI AI BLOG AUTOMATION BOT 🤖");
console.log("=================================================");
console.log(`Target Batch Count : ${targetCount} blogs`);
console.log(`Gemini API Key     : ${GEMINI_API_KEY ? "✅ Configured (" + GEMINI_API_KEY.slice(0, 10) + "...)" : "⚠️ Not found"}`);
console.log(`Database Sync      : ${process.env.DB_HOST ? "✅ MySQL Configured (" + process.env.DB_HOST + ")" : "⚠️ Local JSON Only"}`);
console.log("=================================================\n");

/**
 * Invokes Google Gemini REST API supporting multiple model fallbacks and X-goog-api-key header
 */
async function callGeminiAPI(systemInstructions, userPrompt) {
  if (!GEMINI_API_KEY) return null;

  const candidateModels = ["gemini-2.5-flash", "gemini-flash-latest", "gemini-1.5-flash"];

  const payload = {
    contents: [
      {
        role: "user",
        parts: [
          { text: `${systemInstructions}\n\n${userPrompt}` }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 2500,
      responseMimeType: "application/json"
    }
  };

  for (const model of candidateModels) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": GEMINI_API_KEY
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(3000)
      });

      if (!response.ok) {
        continue;
      }

      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) continue;

      const cleanedText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
      return JSON.parse(cleanedText);
    } catch (err) {
      // Try next model
    }
  }

  return null;
}

/**
 * Smart Generator Fallback for high-converting SEO blogs
 */
function generateSmartFallbackBlog(seed, blogId) {
  const { brand1, brand2, sparePart, location, category, type } = seed;
  const locStr = `${location.area}, ${location.city}`;
  const now = new Date(Date.now() - (targetCount - blogId) * 1800000).toISOString();

  let title = "";
  let slug = "";
  let summary = "";
  let content = "";

  if (type === "comparison") {
    title = `${brand1} vs ${brand2}: Trending HVAC & Power Consumption Test in ${locStr}`;
    slug = `${brand1.toLowerCase().replace(/[^a-z0-9]/g, "-")}-vs-${brand2.toLowerCase().replace(/[^a-z0-9]/g, "-")}-test-${location.area.toLowerCase()}-${blogId}`;
    summary = `Trending engineering comparison of pull-down cooling time, inverter compressor efficiency, outdoor coil corrosion resistance, and spare parts prices between ${brand1} and ${brand2} in ${locStr}.`;
    content = `## Real-World Engineering Audit: ${brand1} vs ${brand2} in ${locStr}

Operating cooling and climate systems in **${locStr}** (${location.landmark}) demands high pull-down performance under severe thermal loads exceeding 42°C.

### 1. Thermal Pull-Down & Power Draw Analysis
- **${brand1}**: Direct-drive inverter compressor maintaining target room temperature with minimal voltage fluctuation.
- **${brand2}**: Multi-stage electronic expansion valve (EEV) modulation for part-load energy optimization.

### 2. Technical Feature & Cost Comparison

| Specification | ${brand1} Inverter | ${brand2} Inverter |
| :--- | :--- | :--- |
| **Cooling Capacity** | 5,200 Watts (1.5 Ton) | 5,150 Watts (1.5 Ton) |
| **ISEER Rating** | 5.25 Star Efficiency | 5.12 Star Efficiency |
| **Condenser Fin Coating** | Blue Fin Anti-Corrosive | Gold Fin Hydrophobic |
| **PCB Surge Arrestor** | Built-in 440V Protection | Over-Voltage Relay Guard |
| **Average Power Draw** | 780 kWh / Year | 815 kWh / Year |
| **Spare Parts Price (INR)** | OEM Hub in ${location.area} | Express Shipping Pune |

### 3. Spare Parts Pricing Matrix (INR ₹)
- **Rotary Inverter Compressor**: ₹8,500 - ₹12,500
- **Outdoor IPM Mainboard**: ₹3,500 - ₹5,800
- **R-32 Refrigerant Charge + Nitrogen Leak Test**: ₹2,200 - ₹3,500

### Service Recommendation
For continuous commercial use in **${location.area}**, ${brand1} offers unmatched structural durability. For residential homes, ${brand2} provides whisper-quiet operation.

Need 2-hour doorstep repair in **${location.area}**? Call **Prime Cool Pune** at **+91 7507408461**.`;
  } else if (type === "pricing") {
    title = `Genuine ${sparePart.part} Replacement & Cost Guide in ${locStr}`;
    slug = `${sparePart.part.toLowerCase().replace(/[^a-z0-9]/g, "-")}-price-guide-${location.area.toLowerCase()}-${blogId}`;
    summary = `Official pricing table, OEM warranty specs, and step-by-step multimeter diagnostic steps for replacing ${sparePart.part} in ${locStr}.`;
    content = `## Technical Repair & Spare Parts Guide: ${sparePart.part} in ${locStr}

Power supply spikes and high summer ambient heat in **${locStr}** frequently cause electronic and mechanical degradation in home appliances and commercial HVAC units.

### 1. Diagnostic Symptoms
- **System Error Lockout**: Digital error codes E4, E6, or F1 appearing on display.
- **Compressor Tripping**: High amperage current draw on startup.
- **Cooling Lost**: Inverter PCB IPM relay failure or gas pressure loss.

### 2. Spare Parts Price Breakdown (INR ₹)

| Component / Service | Price Range (₹) | Billing Unit | Warranty Coverage |
| :--- | :--- | :--- | :--- |
| **${sparePart.part} (OEM)** | **₹${sparePart.minPrice} - ₹${sparePart.maxPrice}** | ${sparePart.unit} | **${sparePart.warranty}** |
| **Field Diagnostic Inspection** | ₹350 - ₹500 | Per Visit | Adjusted in Final Bill |
| **System Vacuuming & Gas Top-up** | ₹2,200 - ₹3,500 | Per Charge | 90 Days Guarantee |

### 3. Step-by-Step Multimeter Diagnostics
1. **Safety Protocol**: Disconnect power mains and safely discharge 400V DC electrolytic capacitors through a 1kΩ 10W resistor.
2. **Resistance Check**: Measure coil resistance between U, V, and W terminals on the inverter module.
3. **Diode Voltage Drop**: Confirm forward voltage drop across freewheeling diodes measures between 0.42V and 0.58V.

Call Prime Cool at **+91 7507408461** for genuine OEM **${sparePart.part}** replacement in **${location.area}**!`;
  } else if (type === "pcb_electronics") {
    title = `${brand1} Inverter AC & Appliance PCB Board Repair Guide: ${location.area} Manual`;
    slug = `${brand1.toLowerCase().replace(/[^a-z0-9]/g, "-")}-pcb-repair-guide-${location.area.toLowerCase()}-${blogId}`;
    summary = `Detailed electronics repair field manual covering IPM IGBT module testing, SMPS DC rails, and optocoupler pulse diagnostics for ${brand1} in ${locStr}.`;
    content = `## Technical Field Manual: ${brand1} Inverter PCB Repair in ${locStr}

Inverter air conditioners, frost-free refrigerators, and front-load washing machines rely on sophisticated power electronics to convert single-phase AC utility voltage into variable-frequency 3-phase power.

### Circuit Board Diagnostic Protocols
1. **SMPS DC Rail Testing**:
   - Confirm **15V DC** supply for IGBT gate drivers.
   - Verify **12V DC** supply for relay actuation coils.
   - Test stable **5V DC** rail for microcontroller VCC.
2. **IPM Diode Voltage Testing**:
   - Check forward voltage drop across U-V-W phase terminals. Target range: **0.40V to 0.60V DC**.
3. **Error Code Quick Reference**:

| Error Code | Error Description | Root Cause | Repair Action |
| :--- | :--- | :--- | :--- |
| **E1 / FO** | IPM Over-Current Trip | Shorted IGBT / Seized Compressor | Replace IPM IC / test windings |
| **E6** | Communication Failure | Damaged PC817 Optocoupler | Replace optical transceiver bank |
| **F3** | High Discharge Temp | Refrigerant leak / EEV restriction | Flush circuit & recharge gas |

Prime Cool provides fast, guaranteed micro-soldering and PCB board repair in **${location.area}**.`;
  } else {
    title = `HVAC, Refrigerator & Washing Machine Emergency Repair Log: ${locStr}`;
    slug = `appliance-hvac-repair-dispatch-${location.area.toLowerCase()}-${blogId}`;
    summary = `Emergency field response and doorstep service log for split ACs, inverter fridges, washing machines, and chillers in ${locStr}.`;
    content = `## Service Dispatch Log: ${locStr}

Prime Cool operates dedicated mobile technical vans carrying certified OEM spare parts, digital manifolds, vacuum pumps, and nitrogen leak kits across **${locStr}** (${location.landmark}).

### Services Offered in ${location.area}:
- **Split & Cassette AC Service**: Jet cleaning, gas charging, inverter PCB replacement.
- **Inverter Refrigerator Repair**: Compressor replacement, defrost thermostat tuning.
- **Washing Machine Repair**: Drum bearing spider replacement, drain pump unclogging.
- **Commercial Chiller AMC**: Quarterly preventive maintenance audits.

Call Prime Cool at **+91 7507408461** for emergency service in **${location.area}**!`;
  }

  return {
    id: `blog-auto-${Date.now()}-${blogId}`,
    title,
    slug,
    content,
    summary,
    category,
    author: seed.author || "Saurav Kailas Temgire (Lead Engineer)",
    seoTitle: `${title.slice(0, 50)} | Prime Cool`,
    seoDesc: summary.slice(0, 150),
    seoKeywords: `${brand1}, ${brand2}, ${sparePart.part}, ${location.area}, ${location.city}, HVAC repair, refrigerator repair, washing machine repair`,
    createdAt: now
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
      connectTimeout: 10000
    });

    // Ensure blogs table exists
    await connection.query(`
      CREATE TABLE IF NOT EXISTS blogs (
        id VARCHAR(64) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        content TEXT NOT NULL,
        summary TEXT NOT NULL,
        image TEXT,
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
          b.createdAt
        ]
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
  const seeds = buildTopicSeedBatch(targetCount);
  const generatedBlogs = [];
  let geminiSuccessCount = 0;
  let fallbackCount = 0;

  console.log(`🚀 Generating ${targetCount} SEO blogs...\n`);

  for (let i = 0; i < seeds.length; i++) {
    const seed = seeds[i];
    const { systemInstructions, userPrompt } = generatePromptForTopic(seed);

    process.stdout.write(` [${i + 1}/${targetCount}] Generating "${seed.category}" (${seed.location.area})... `);

    let blogObj = null;

    if (GEMINI_API_KEY) {
      const aiData = await callGeminiAPI(systemInstructions, userPrompt);
      if (aiData && aiData.title && aiData.content) {
        blogObj = {
          id: `blog-gemini-${Date.now()}-${i + 1}`,
          title: aiData.title,
          slug: aiData.slug || aiData.title.toLowerCase().replace(/[^a-z0-9]/g, "-"),
          content: aiData.content,
          summary: aiData.summary || aiData.title,
          category: aiData.category || seed.category,
          author: aiData.author || "Saurav Kailas Temgire (Lead Engineer)",
          seoTitle: aiData.seoTitle || `${aiData.title} | Prime Cool`,
          seoDesc: aiData.seoDesc || aiData.summary,
          seoKeywords: aiData.seoKeywords || `${seed.brand1}, ${seed.location.area}, HVAC repair`,
          createdAt: new Date(Date.now() - (targetCount - i) * 1800000).toISOString()
        };
        geminiSuccessCount++;
        console.log(`✅ Gemini API`);
      }
    }

    if (!blogObj) {
      blogObj = generateSmartFallbackBlog(seed, i + 1);
      fallbackCount++;
      console.log(`⚡ Smart AI Engine`);
    }

    generatedBlogs.push(blogObj);
  }

  // Local File Paths
  const blogsDataPath = path.join(process.cwd(), "src", "lib", "blogs-data.json");
  const dbDataPath = path.join(process.cwd(), "data", "db.json");

  // Load existing blogs
  let existingBlogs = [];
  try {
    if (fs.existsSync(blogsDataPath)) {
      existingBlogs = JSON.parse(fs.readFileSync(blogsDataPath, "utf-8"));
    }
  } catch (e) {
    existingBlogs = [];
  }

  // Deduplicate by slug
  const existingSlugs = new Set(existingBlogs.map(b => b.slug));
  const newUniqueBlogs = generatedBlogs.filter(b => !existingSlugs.has(b.slug));

  const updatedBlogs = [...newUniqueBlogs, ...existingBlogs];

  // Write to src/lib/blogs-data.json
  fs.writeFileSync(blogsDataPath, JSON.stringify(updatedBlogs, null, 2));
  console.log(`\n💾 Saved ${updatedBlogs.length} total blogs to src/lib/blogs-data.json (+${newUniqueBlogs.length} new)`);

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

  // Direct MySQL Sync
  await syncWithMySQL(newUniqueBlogs);

  // Regenerate Sitemap
  try {
    console.log("\n🌐 Regenerating sitemap.xml...");
    execSync("npm run sitemap", { stdio: "inherit" });
    console.log("✅ Sitemap updated!");
  } catch (err) {
    console.warn(`⚠️ Sitemap update notice: ${err.message}`);
  }

  console.log("\n=================================================");
  console.log("🎉 BATCH GENERATION COMPLETED SUCCESSFULLY 🎉");
  console.log(`Total Generated : ${generatedBlogs.length}`);
  console.log(`Gemini API      : ${geminiSuccessCount}`);
  console.log(`Smart Engine    : ${fallbackCount}`);
  console.log("=================================================");
}

runBot().catch(err => {
  console.error("❌ Fatal Error in Blog Bot:", err);
  process.exit(1);
});
