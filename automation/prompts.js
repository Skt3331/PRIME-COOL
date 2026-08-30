import {
  DAILY_QUOTAS,
  trendingTopics,
  locations,
  commercialTopics,
  industrialTopics,
  brands,
  sparePartsPriceList,
  errorCodes,
  authors,
} from "./config.js";

/**
 * Builds system & user prompt payload for Gemini API
 */
export function generatePromptForTopic(topicSeed) {
  const { type, index, location, brand1, brand2, sparePart, errorCode, category, topicTitle, focus, keywords } = topicSeed;

  const locStr = `${location.area}, ${location.city} (${location.landmark}, Postal ${location.postal})`;

  const systemInstructions = `You are the Principal HVAC & Industrial Systems Engineer for Prime Cool Pune (Proprietor: Saurav Kailas Temgire).
Write an authoritative, highly technical, and engaging SEO blog post in structured Markdown format.
Include clear H2 and H3 section headers, Markdown comparison/pricing tables with realistic INR (₹) rates, step-by-step diagnostic workflows with multimeter test points, error code matrix, 3-4 schema-ready FAQs, and localized Prime Cool emergency doorstep service availability in ${locStr}.

Strictly format your response as a SINGLE VALID JSON object without backticks around it or JSON formatting tags like \`\`\`json.
The JSON object MUST contain the following keys:
{
  "title": "Compelling, keyword-rich SEO blog title (under 75 characters)",
  "slug": "url-friendly-kebab-case-slug-without-special-chars",
  "summary": "120-150 word executive summary highlighting key findings, engineering specs, and Pune/PCMC doorstep service availability.",
  "category": "${category}",
  "author": "${topicSeed.author || authors[index % authors.length]}",
  "seoTitle": "High CTR SEO title under 60 chars | Prime Cool Pune",
  "seoDesc": "Meta description under 155 chars with location, focus keywords and 24/7 call to action.",
  "seoKeywords": "${keywords || 'HVAC repair Pune, AC service, commercial chiller maintenance'}",
  "content": "Full markdown body content (minimum 750 words) with structured headings (##, ###), bullet points, markdown technical tables, pricing tables in INR (₹), error code matrices, 3-4 high-intent FAQs, and emergency call-to-action (+91 7507408461)."
}`;

  let userPrompt = "";

  if (type === "trending") {
    userPrompt = `Write a deep-dive engineering analysis on: "${topicTitle}".
Focus Area: ${focus}.
Location Context: ${locStr}.

Required Sections:
1. Executive Technical Overview & Thermodynamic / Electronic Principles.
2. Direct Comparison Matrix Table (${brand1} vs ${brand2}) comparing energy efficiency (ISEER/COP), power draw under 48°C ambient heat, failure rates, and spare parts cost in INR ₹.
3. Inverter Board & Power Electronics Troubleshooting (Gate driver signals, IPM diode drop 0.45V-0.60V DC, SMPS rails).
4. Error Code Reference Table including ${errorCode.code} (${errorCode.name} - ${errorCode.desc}).
5. Realistic Spare Parts Price Table (INR ₹) featuring ${sparePart.part} (₹${sparePart.minPrice} - ₹${sparePart.maxPrice} ${sparePart.unit}).
6. Frequently Asked Questions (3-4 technical FAQs with in-depth answers).
7. Pune / PCMC 2-Hour Doorstep Service & Rapid Dispatch info (+91 7507408461).`;
  } else if (type === "location") {
    userPrompt = `Write a comprehensive, hyper-localized HVAC & Heavy Appliance Engineering Service Guide for "${location.area}, ${location.city}" (Landmark: ${location.landmark}, Postal: ${location.postal}).
Focus: Fast Doorstep Repair for Inverter Split ACs, Cassette ACs, Frost-Free Refrigerators, Front-Load Washing Machines, and Commercial Freezers.

Required Sections:
1. Local Operational Challenges in ${location.area} (power line voltage spikes, hard water drum scaling, ambient summer temperatures up to 43°C).
2. Diagnostic & Repair Protocol:
   - AC Gas Leakage (R-32 / R-410A) & Nitrogen Pressure Hold Testing (450 PSI).
   - Inverter PCB micro-soldering & error code resolution (${errorCode.code}: ${errorCode.desc}).
   - Refrigerator defrost sensor & washing machine spider bearing replacement.
3. Transparent Spare Parts & Service Pricing Table for ${location.area} in INR ₹.
4. Error Code Matrix Table & Multimeter Testing Checklist.
5. Frequently Asked Questions (3-4 FAQs specific to homeowners & businesses in ${location.area}).
6. Prime Cool Rapid Mobile Dispatch in ${location.area} (<45 minutes SLA, 24/7 Hotline: +91 7507408461).`;
  } else if (type === "commercial") {
    userPrompt = `Write an official Commercial HVAC & Refrigeration Engineering Manual on: "${topicTitle}".
Focus: ${focus}.
Facility Location: Commercial hubs in ${locStr}.

Required Sections:
1. System Engineering Architecture & Commercial Part-Load Energy Efficiency (BMS / VRF / Cold Room).
2. Preventative Maintenance & Quarterly AMC Audit Checklist (Compressor oil acidity, EEV stepping, condenser descaling).
3. Commercial Technical Comparison / Capacity Matrix Table.
4. Error Code & Safety Lockout Diagnostics (${errorCode.code}: ${errorCode.name}).
5. Commercial Spare Parts & AMC Cost Breakdown in INR ₹.
6. 3-4 Commercial Facility Manager FAQs.
7. Commercial Emergency Service & AMC Booking details with Prime Cool (+91 7507408461).`;
  } else {
    // industrial
    userPrompt = `Write an advanced Heavy Industrial HVAC & Mechanical Process Cooling Overhaul Manual on: "${topicTitle}".
Focus: ${focus}.
Industrial MIDC Zone: ${locStr}.

Required Sections:
1. Heavy Industrial Process Cooling Dynamics (Process Water Chillers, Cooling Towers, VFDs, Cleanrooms).
2. Step-by-Step Major Overhaul & Precision Alignment Protocol (Laser alignment, vibration analysis <2.5 mm/s RMS, tube eddy current testing).
3. Industrial Performance & Heat Load Calculation Matrix Table.
4. Industrial Error Codes, Interlock Safety Trips & Electrical Diagnostics (${errorCode.code}).
5. Heavy Industrial Spare Parts & Turnaround Overhaul Pricing in INR ₹.
6. 3-4 Industrial Plant Engineer FAQs.
7. 24/7 Industrial Breakdown Dispatch SLA (<2 hours in Chakan, Bhosari, Ranjangaon MIDC, Call: +91 7507408461).`;
  }

  return { systemInstructions, userPrompt };
}

/**
 * Creates the exact daily batch quota of topic seeds:
 * 10 Trending + 20 Location + 10 Commercial + 10 Industrial = 50 Total Blogs
 * Accepts optional existingSlugs/existingTitles set to guarantee zero duplicate seed topics.
 */
export function buildTopicSeedBatch(count = 50, existingSlugs = new Set()) {
  const seeds = [];

  // Calculate proportions based on DAILY_QUOTAS
  let trendingCount = DAILY_QUOTAS.trending;
  let locationCount = DAILY_QUOTAS.location;
  let commercialCount = DAILY_QUOTAS.commercial;
  let industrialCount = DAILY_QUOTAS.industrial;

  if (count !== DAILY_QUOTAS.total) {
    const ratio = count / DAILY_QUOTAS.total;
    trendingCount = Math.max(1, Math.round(DAILY_QUOTAS.trending * ratio));
    locationCount = Math.max(1, Math.round(DAILY_QUOTAS.location * ratio));
    commercialCount = Math.max(1, Math.round(DAILY_QUOTAS.commercial * ratio));
    industrialCount = Math.max(1, count - (trendingCount + locationCount + commercialCount));
  }

  let globalIndex = 0;
  const dateKey = new Date().toISOString().slice(0, 10).replace(/-/g, "");

  // 1. Trending Topics (10)
  for (let i = 0; i < trendingCount; i++) {
    globalIndex++;
    const t = trendingTopics[i % trendingTopics.length];
    const loc = locations[i % locations.length];
    const brand1 = brands[i % brands.length];
    const brand2 = brands[(i + 3) % brands.length];
    const sparePart = sparePartsPriceList[i % sparePartsPriceList.length];
    const errorCode = errorCodes[i % errorCodes.length];

    seeds.push({
      type: "trending",
      index: globalIndex,
      category: t.category,
      topicTitle: t.topic,
      focus: t.focus,
      keywords: t.keywords,
      location: loc,
      brand1,
      brand2,
      sparePart,
      errorCode,
      author: authors[globalIndex % authors.length],
      dateKey,
    });
  }

  // 2. Location Topics (20)
  for (let i = 0; i < locationCount; i++) {
    globalIndex++;
    const loc = locations[i % locations.length];
    const brand1 = brands[(i + 1) % brands.length];
    const brand2 = brands[(i + 4) % brands.length];
    const sparePart = sparePartsPriceList[(i + 2) % sparePartsPriceList.length];
    const errorCode = errorCodes[i % errorCodes.length];
    const serviceType = i % 3 === 0 ? "Inverter Split AC & Cassette Repair" : i % 3 === 1 ? "Refrigerator & Deep Freezer Service" : "Washing Machine & PCB Electronics Repair";

    seeds.push({
      type: "location",
      index: globalIndex,
      category: "Regional HVAC & Appliance Field Dispatch",
      topicTitle: `${loc.area} Doorstep ${serviceType} & Maintenance Guide`,
      focus: `Local field diagnostics, OEM parts availability, power surge protection, and fast technician dispatch in ${loc.area}`,
      keywords: `${loc.area} AC repair, appliance service ${loc.area} Pune, ${brand1} repair ${loc.area}, refrigerator gas filling ${loc.area}`,
      location: loc,
      brand1,
      brand2,
      sparePart,
      errorCode,
      author: authors[globalIndex % authors.length],
      dateKey,
    });
  }

  // 3. Commercial Topics (10)
  for (let i = 0; i < commercialCount; i++) {
    globalIndex++;
    const c = commercialTopics[i % commercialTopics.length];
    const loc = locations[(i + 2) % locations.length];
    const brand1 = brands[(i + 2) % brands.length];
    const brand2 = brands[(i + 5) % brands.length];
    const sparePart = sparePartsPriceList[(i + 4) % sparePartsPriceList.length];
    const errorCode = errorCodes[(i + 1) % errorCodes.length];

    seeds.push({
      type: "commercial",
      index: globalIndex,
      category: c.category,
      topicTitle: c.topic,
      focus: c.focus,
      keywords: c.keywords,
      location: loc,
      brand1,
      brand2,
      sparePart,
      errorCode,
      author: authors[globalIndex % authors.length],
      dateKey,
    });
  }

  // 4. Industrial Topics (10)
  for (let i = 0; i < industrialCount; i++) {
    globalIndex++;
    const ind = industrialTopics[i % industrialTopics.length];
    const loc = locations[(i + 5) % locations.length];
    const brand1 = brands[(i + 3) % brands.length];
    const brand2 = brands[(i + 6) % brands.length];
    const sparePart = sparePartsPriceList[(i + 6) % sparePartsPriceList.length];
    const errorCode = errorCodes[(i + 2) % errorCodes.length];

    seeds.push({
      type: "industrial",
      index: globalIndex,
      category: ind.category,
      topicTitle: ind.topic,
      focus: ind.focus,
      keywords: ind.keywords,
      location: loc,
      brand1,
      brand2,
      sparePart,
      errorCode,
      author: authors[globalIndex % authors.length],
      dateKey,
    });
  }

  return seeds;
}
