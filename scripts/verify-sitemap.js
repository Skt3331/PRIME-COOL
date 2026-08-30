import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.resolve(__dirname, "../public");
const MASTER_SITEMAP = path.join(PUBLIC_DIR, "sitemap.xml");

function verifySitemaps() {
  console.log("==================================================");
  console.log("       STARTING SITEMAP AUDIT & VERIFICATION       ");
  console.log("==================================================\n");

  if (!fs.existsSync(MASTER_SITEMAP)) {
    console.error("❌ ERROR: Master sitemap.xml does not exist in public directory!");
    process.exit(1);
  }

  const masterXml = fs.readFileSync(MASTER_SITEMAP, "utf8");
  const sitemapMatches = masterXml.match(/<loc>(.*?)<\/loc>/g) || [];
  const registeredSubSitemaps = sitemapMatches.map((m) => m.replace(/<\/?loc>/g, "").trim());

  console.log(
    `✓ Master sitemap.xml found with ${registeredSubSitemaps.length} registered sub-sitemaps.\n`,
  );

  const allUrls = new Set();
  const duplicateUrls = [];
  const fileReports = [];
  let totalUrlsCount = 0;

  for (const sitemapUrl of registeredSubSitemaps) {
    const filename = path.basename(sitemapUrl);
    const localFilePath = path.join(PUBLIC_DIR, filename);

    if (!fs.existsSync(localFilePath)) {
      console.error(`❌ ERROR: Sub-sitemap file ${filename} not found on disk!`);
      continue;
    }

    const xmlContent = fs.readFileSync(localFilePath, "utf8");
    const locMatches = xmlContent.match(/<loc>(.*?)<\/loc>/g) || [];
    const urlsInFile = locMatches.map((m) => m.replace(/<\/?loc>/g, "").trim());

    let fileDuplicates = 0;
    for (const url of urlsInFile) {
      if (allUrls.has(url)) {
        duplicateUrls.push({ url, file: filename });
        fileDuplicates++;
      } else {
        allUrls.add(url);
      }
    }

    totalUrlsCount += urlsInFile.length;

    // Check XML syntax structure
    const hasValidHeader = xmlContent.startsWith('<?xml version="1.0" encoding="UTF-8"?>');
    const hasUrlsetOpen = xmlContent.includes(
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    );
    const hasUrlsetClose = xmlContent.includes("</urlset>");

    const isValidXml = hasValidHeader && hasUrlsetOpen && hasUrlsetClose;

    fileReports.push({
      filename,
      urlCount: urlsInFile.length,
      fileSizeKb: (fs.statSync(localFilePath).size / 1024).toFixed(1),
      isValidXml,
      fileDuplicates,
      sampleUrls: urlsInFile.slice(0, 3),
    });
  }

  console.log("--------------------------------------------------");
  console.log("               SUB-SITEMAP DETAILS                ");
  console.log("--------------------------------------------------");

  for (const report of fileReports) {
    const statusIcon = report.isValidXml && report.fileDuplicates === 0 ? "✓" : "⚠️";
    console.log(
      `${statusIcon} ${report.filename.padEnd(35)} | ${String(report.urlCount).padStart(5)} URLs | ${report.fileSizeKb.padStart(6)} KB | XML: ${report.isValidXml ? "VALID" : "INVALID"}`,
    );
    for (const sample of report.sampleUrls) {
      console.log(`    ↳ Example: ${sample}`);
    }
  }

  console.log("\n==================================================");
  console.log("                 VERIFICATION AUDIT RESULTS        ");
  console.log("==================================================");
  console.log(`Total Sub-Sitemaps Audited: ${fileReports.length}`);
  console.log(`Total URLs Indexed:         ${totalUrlsCount}`);
  console.log(`Total Unique URLs:          ${allUrls.size}`);
  console.log(`Total Duplicate URLs:       ${duplicateUrls.length}`);
  console.log(`Broken Sub-Sitemap Files:   ${fileReports.filter((r) => !r.isValidXml).length}`);

  if (duplicateUrls.length === 0 && fileReports.every((r) => r.isValidXml)) {
    console.log("\n🎉 ALL SITEMAPS PASSED 100% VERIFICATION WITH ZERO DUPLICATES!");
  } else {
    console.warn(`\n⚠️ Warnings encountered: ${duplicateUrls.length} duplicates found.`);
  }
}

verifySitemaps();
