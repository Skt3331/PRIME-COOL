/**
 * Daily Cron Scheduler for Prime Cool Blog Automation Bot
 */

import { execSync } from "child_process";
import path from "path";

const DAILY_INTERVAL_MS = 24 * 60 * 60 * 1000; // 24 hours

function runDailyGeneration() {
  const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  console.log(`\n=================================================`);
  console.log(`⏰ [${timestamp}] EXECUTING DAILY BLOG GENERATION JOB`);
  console.log(`=================================================`);

  try {
    const scriptPath = path.join(process.cwd(), "automation", "gemini-bot.js");
    execSync(`node "${scriptPath}" --count 50`, { stdio: "inherit" });
    console.log(`\n✅ Daily blog generation job completed successfully!`);
  } catch (err) {
    console.error(`❌ Daily blog generation job failed: ${err.message}`);
  }
}

console.log("=================================================");
console.log("⏳ PRIME COOL DAILY BLOG CRON SCHEDULER ACTIVE ⏳");
console.log("=================================================");
console.log("Bot will generate 50 new blogs immediately, then run daily at 00:00.");
console.log("Press Ctrl+C to stop the daemon.\n");

// Initial run immediately
runDailyGeneration();

// Schedule daily run
setInterval(() => {
  runDailyGeneration();
}, DAILY_INTERVAL_MS);
