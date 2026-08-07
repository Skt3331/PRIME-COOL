import express from "express";
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

// 1. Serve static files from dist/client
app.use(express.static(CLIENT_DIR, { index: "index.html", maxAge: "1y" }));

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
