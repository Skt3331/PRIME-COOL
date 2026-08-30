import fs from "fs";
import path from "path";

// 1. Clean services-data.ts
const servicesDataPath = path.join(process.cwd(), "src", "lib", "services-data.ts");
let servicesContent = fs.readFileSync(servicesDataPath, "utf8");

// Filter out entries where key starts with "vfd-"
// We can parse or regex replace lines with "vfd-
const lines = servicesContent.split("\n");
const cleanedLines = [];
let skipping = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('"vfd-')) {
    skipping = true;
    continue;
  }
  if (skipping) {
    if (line.trim().endsWith("},") || line.trim().endsWith("}")) {
      skipping = false;
    }
    continue;
  }
  cleanedLines.push(line);
}

fs.writeFileSync(servicesDataPath, cleanedLines.join("\n"), "utf8");
console.log("Cleaned vfd- entries from services-data.ts");

// 2. Clean sitemap-constants.ts
const sitemapConstantsPath = path.join(process.cwd(), "src", "lib", "sitemap-constants.ts");
let sitemapContent = fs.readFileSync(sitemapConstantsPath, "utf8");

const sitemapLines = sitemapContent.split("\n");
const cleanedSitemapLines = sitemapLines.filter((l) => !l.includes('"vfd-'));
fs.writeFileSync(sitemapConstantsPath, cleanedSitemapLines.join("\n"), "utf8");
console.log("Cleaned vfd- entries from sitemap-constants.ts");
