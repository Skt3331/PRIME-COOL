import { categories, websiteServices, brands, comparisonPairs, sparePartsPriceList, locations } from "./config.js";

const authors = [
  "Saurav Kailas Temgire (Lead HVAC Engineer)",
  "Prime Cool Engineering Team",
  "Senior Inverter PCB Electronics Specialist"
];

/**
 * Builds prompt payload for Gemini API based on a generated topic seed
 */
export function generatePromptForTopic(topicSeed) {
  const { type, index, location, brand1, brand2, sparePart, category } = topicSeed;

  const locationContext = `${location.area}, ${location.city} (${location.landmark}, Postal ${location.postal})`;

  const systemInstructions = `You are a Senior HVAC & Refrigeration Lead Systems Engineer for Prime Cool Pune.
Write a comprehensive, professional, highly technical, and engaging SEO blog post in Markdown format.
Include clear section headers, Markdown comparison/pricing tables, realistic engineering specs, troubleshooting steps, and local service availability in ${locationContext}.

Strictly format your response as a SINGLE VALID JSON object without any backticks around it or JSON formatting tags like \`\`\`json.
The JSON object MUST contain the following keys:
{
  "title": "Clear, compelling blog post title",
  "slug": "url-friendly-kebab-case-slug",
  "summary": "100-140 word executive summary highlighting key findings, engineering specs, and local Pune/Shirur availability.",
  "category": "${category}",
  "author": "${authors[index % authors.length]}",
  "seoTitle": "SEO title under 65 chars | Prime Cool Pune",
  "seoDesc": "Meta description under 155 chars with location and key terms.",
  "seoKeywords": "comma separated relevant technical keywords including location and brand names",
  "content": "Full markdown body content (minimum 600 words) formatted with headings (##, ###), bullet points, markdown tables, pricing tables in INR (₹), and step-by-step diagnostic workflows."
}`;

  let userPrompt = "";

  switch (type) {
    case "comparison":
      userPrompt = `Write a deep-dive technical comparison blog post evaluating "${brand1}" vs "${brand2}" for residential and commercial customers in ${locationContext}.
Include:
1. Detailed pull-down cooling time, compressor architecture (Inverter vs Fixed Speed, Rotary vs Scroll), and power draw analysis.
2. Atmospheric fin corrosion resistance in high ambient temperatures near ${location.area}.
3. Comprehensive markdown comparison table comparing ISEER rating, noise level dB, warranty terms, and spare parts cost in INR ₹.
4. Maintenance recommendations and local Prime Cool field support details in ${location.area}.`;
      break;

    case "pricing":
      userPrompt = `Write an official spare parts replacement & pricing guide for "${sparePart.part}" in ${locationContext}.
Include:
1. Technical reasons for component failure (over-voltage spikes, thermal degradation, gas leakage, IPM driver breakdown).
2. Genuine OEM vs Aftermarket pricing breakdown table in INR (ranging ₹${sparePart.minPrice} to ₹${sparePart.maxPrice} ${sparePart.unit}) with warranty duration (${sparePart.warranty}).
3. Step-by-step diagnostic testing procedures using a digital multimeter or oscilloscope (e.g. U-V-W resistance, capacitor microfarads, gas pressure manifold checks).
4. Direct emergency repair booking details with Prime Cool technical team in ${location.area}.`;
      break;

    case "pcb_electronics":
      userPrompt = `Write an advanced Inverter AC & Appliance PCB Electronics Repair Field Manual focusing on ${brand1} Inverter Boards in ${locationContext}.
Include:
1. Microcontroller, IPM (Intelligent Power Module), SMPS power supply 15V/12V/5V DC rail diagnostics.
2. Error code lookup and optical isolator pulse verification (E1 to E12 diagnostic matrix table).
3. Circuit safety discharge protocol (draining 400V DC capacitors through 1kΩ resistor).
4. On-site field repair guidelines and board replacement costs for clients in ${location.area}.`;
      break;

    case "refrigerator_washing":
      userPrompt = `Write a step-by-step troubleshooting and repair guide for ${brand1} Inverter Refrigerators & ${brand2} Fully Automatic Washing Machines in ${locationContext}.
Include:
1. Refrigerator cooling failure, frost build-up, inverter linear compressor relay testing, and gas leak symptoms.
2. Washing machine spin cycle noise, drum bearing spider damage, drain pump clog, and E4/UE error codes.
3. Spare parts pricing table for motors, water valves, door gaskets, and main PCBs in INR ₹.
4. Fast 2-hour doorstep repair services offered by Prime Cool across ${location.area} and nearby industrial belts.`;
      break;

    default: // Regional Field Guide
      userPrompt = `Write a regional HVAC & Heavy Appliance Engineering Service Dispatch Log for ${locationContext}.
Include:
1. Operational challenges due to ambient heat, dust, and industrial power fluctuations in ${location.area}.
2. Comprehensive preventive maintenance checklist for residential split ACs, commercial cassette units, and cold storage freezers.
3. Spare parts availability matrix and emergency field dispatch contact info for Prime Cool in ${location.area}.`;
      break;
  }

  return { systemInstructions, userPrompt };
}

/**
 * Creates a batch of topic seeds for batch generation
 */
export function buildTopicSeedBatch(count = 50) {
  const seeds = [];
  const types = ["comparison", "pricing", "pcb_electronics", "refrigerator_washing", "regional"];

  for (let i = 0; i < count; i++) {
    const type = types[i % types.length];
    const category = categories[i % categories.length];
    const location = locations[i % locations.length];
    const brand1 = brands[i % brands.length];
    const brand2 = brands[(i + 1) % brands.length];
    const pair = comparisonPairs[i % comparisonPairs.length];
    const sparePart = sparePartsPriceList[i % sparePartsPriceList.length];

    seeds.push({
      index: i + 1,
      type,
      category,
      location,
      brand1: pair ? pair.p1 : brand1,
      brand2: pair ? pair.p2 : brand2,
      sparePart
    });
  }

  return seeds;
}
