/**
 * Daily Cron Scheduler for Prime Cool Blog Automation Bot
 * Automatically generates 50 SEO-Optimized Blogs Daily:
 * - 10 Trending Topics
 * - 20 Location SEO Blogs
 * - 10 Commercial HVAC & Refrigeration Blogs
 * - 10 Industrial Mechanical Blogs
 */

import { execSync } from "child_process";
import path from "path";

const DAILY_INTERVAL_MS = 24 * 60 * 60 * 1000; // 24 hours

function runDailyGeneration() {
  const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  console.log(`\n=================================================`);
  console.log(`⏰ [${timestamp}] EXECUTING DAILY BLOG GENERATION CRON`);
  console.log(`=================================================`);

  try {
    const scriptPath = path.join(process.cwd(), "automation", "gemini-bot.js");
    execSync(`node "${scriptPath}" --daily`, { stdio: "inherit" });
    console.log(`\n✅ Daily blog generation & sitemap sync completed successfully at ${timestamp}!`);
  } catch (err) {
    console.error(`❌ Daily blog generation job failed: ${err.message}`);
  }
}

console.log("=================================================");
console.log("⏳ PRIME COOL DAILY BLOG CRON SCHEDULER ACTIVE ⏳");
console.log("=================================================");
console.log("Bot will generate 50 new blogs immediately (10 Trending, 20 Location, 10 Commercial, 10 Industrial),");
console.log("then automatically execute every 24 hours.");
console.log("Press Ctrl+C to stop the daemon.\n");

// Initial run immediately
runDailyGeneration();

// Schedule recurring daily run
setInterval(() => {
  runDailyGeneration();
}, DAILY_INTERVAL_MS);
