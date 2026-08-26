import express from "express";
import compression from "compression";
import path from "path";
import { fileURLToPath } from "url";
import handler from "./dist/server/server.js";
import { exec } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fix for EEXIST error on process.stdin in cPanel/Passenger environments
try {
  const _ = process.stdin;
} catch (e) {
  Object.defineProperty(process, "stdin", {
    get() {
      return null;
    },
    configurable: true,
  });
}

const app = express();
const PORT = process.env.PORT || 8080;
const CLIENT_DIR = path.join(__dirname, "dist", "client");
const PUBLIC_DIR = path.join(__dirname, "public");

// Enable Gzip/Brotli HTTP compression for high performance
app.use(compression());

// Serve public directory (sitemaps, robots.txt, uploads)
app.use(
  express.static(PUBLIC_DIR, {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith(".xml")) {
        res.setHeader("Content-Type", "application/xml; charset=utf-8");
        res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=3600");
      } else if (filePath.endsWith(".txt")) {
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.setHeader("Cache-Control", "public, max-age=86400");
      }
    },
  })
);

// URL Canonicalization Middleware for Google Search Console
app.use((req, res, next) => {
  const host = req.headers.host || "";
  const isWww = host.startsWith("www.");
  const pathname = req.path;
  
  // Remove trailing slashes (except root '/') to prevent duplicate URL issues in Google Search Console
  if (pathname.length > 1 && pathname.endsWith("/")) {
    const query = req.url.slice(pathname.length);
    const safePath = pathname.slice(0, -1) + query;
    return res.redirect(301, safePath);
  }
  
  // Redirect www to non-www
  if (isWww) {
    const cleanHost = host.replace(/^www\./, "");
    return res.redirect(301, `${req.protocol}://${cleanHost}${req.url}`);
  }
  
  next();
});

// 1. Serve static files from dist/client
app.use(
  express.static(CLIENT_DIR, {
    index: "index.html",
    maxAge: "1y",
    setHeaders: (res, filePath) => {
      if (filePath.endsWith(".html")) {
        res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
      }
    },
  })
);

// Scheduled Sitemap Generation (Every 2 hours)
function runSitemapGenerator() {
  console.log("[Sitemap Scheduler] Running scheduled sitemap generation...");
  exec(`"${process.execPath}" scripts/generate-sitemap.js`, (error, stdout, stderr) => {
    if (error) {
      console.error(`[Sitemap Scheduler] Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`[Sitemap Scheduler] stderr: ${stderr}`);
    }
    console.log(`[Sitemap Scheduler] stdout: ${stdout}`);
  });
}
const TWO_HOURS = 2 * 60 * 60 * 1000;
setInterval(runSitemapGenerator, TWO_HOURS);
// Run once on startup
runSitemapGenerator();

// -------------------------------------------------------------
// Nightly Automatic Blog Generator (Runs at 00:00 every night)
// -------------------------------------------------------------
function runNightlyBlogAutomation() {
  console.log("[Nightly Blog Automation] Running daily 50 website SEO blog generation...");
  exec(`"${process.execPath}" automation/gemini-bot.js --count 50`, (error, stdout, stderr) => {
    if (error) {
      console.error(`[Blog Automation] Error: ${error.message}`);
      return;
    }
    console.log(`[Blog Automation] Successfully executed daily blog run!`);
  });
}

function scheduleNextMidnightRun() {
  const now = new Date();
  const nextMidnight = new Date();
  nextMidnight.setHours(24, 0, 0, 0); // 00:00:00 midnight
  const timeToMidnight = nextMidnight.getTime() - now.getTime();

  console.log(`[Nightly Blog Automation] Next scheduled 50-blog generation in ${(timeToMidnight / 3600000).toFixed(2)} hours (at 00:00).`);

  setTimeout(() => {
    runNightlyBlogAutomation();
    setInterval(runNightlyBlogAutomation, 24 * 60 * 60 * 1000);
  }, timeToMidnight);
}

scheduleNextMidnightRun();

// API Route: Trigger Blog Generation on-demand (/api/admin/trigger-blog-automation)
app.all("/api/admin/trigger-blog-automation", (req, res) => {
  const count = req.query.count || 50;
  console.log(`[API Trigger] Triggering blog automation bot for ${count} blogs...`);
  exec(`"${process.execPath}" automation/gemini-bot.js --count ${count}`, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
    res.json({ success: true, message: `Successfully generated ${count} blogs and synced with MySQL database & sitemap!`, output: stdout });
  });
});

// 2. Delegate everything else to TanStack Start SSR handler
app.all("*", async (req, res) => {
  try {
    const protocol = req.headers["x-forwarded-proto"] || req.protocol || "http";
    const host = req.headers.host || `localhost:${PORT}`;
    const url = new URL(req.url, `${protocol}://${host}`);

    // Read request body
    const bodyBuffers = [];
    for await (const chunk of req) {
      bodyBuffers.push(chunk);
    }
    const body = bodyBuffers.length ? Buffer.concat(bodyBuffers) : undefined;

    // Build Web Request compatible with TanStack Start SSR
    const webReq = new Request(url.href, {
      method: req.method,
      headers: req.headers,
      body: ["GET", "HEAD"].includes(req.method) ? undefined : body,
    });

    // Call fetch handler
    const webRes = await handler.fetch(webReq);

    // Write headers
    webRes.headers.forEach((val, key) => {
      res.setHeader(key, val);
    });

    res.status(webRes.status);

    // Write body
    if (webRes.body) {
      const reader = webRes.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
    }
    res.end();
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Express-wrapped production server running at http://localhost:${PORT}`);
});
