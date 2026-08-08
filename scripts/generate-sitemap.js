import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = "https://primecool.in";
const ROUTES_DIR = path.resolve(__dirname, "../src/routes");
const OUTPUT_FILE = path.resolve(__dirname, "../public/sitemap.xml");

// Walk directory recursively
function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getFiles(filePath, fileList);
    } else if (file.endsWith(".tsx") || file.endsWith(".ts")) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

async function getBlogs() {
  // Load environment variables manually
  try {
    const envPath = path.resolve(__dirname, "../.env");
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, "utf8");
      const lines = envContent.split(/\r?\n/);
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const match = trimmed.match(/^([^=]+)=(.*)$/);
        if (match) {
          const key = match[1].trim();
          let value = match[2].trim();
          if (
            (value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))
          ) {
            value = value.slice(1, -1);
          }
          process.env[key] = value;
        }
      }
    }
  } catch (e) {
    // Ignore
  }

  const host = process.env.DB_HOST;
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const database = process.env.DB_DATABASE;
  const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306;

  if (host && user && database) {
    try {
      const mysql = await import("mysql2/promise");
      const connection = await mysql.createConnection({
        host,
        port,
        user,
        password,
        database,
      });
      const [rows] = await connection.query("SELECT * FROM blogs ORDER BY createdAt DESC");
      await connection.end();
      console.log(`Successfully fetched ${rows.length} blogs from MySQL database for sitemap.`);
      return rows;
    } catch (err) {
      console.error(
        "Failed to fetch blogs from MySQL for sitemap, falling back to db.json:",
        err.message,
      );
    }
  }

  // Fallback to database.sql
  const sqlPath = path.resolve(__dirname, "../database.sql");
  if (fs.existsSync(sqlPath)) {
    try {
      const sqlContent = fs.readFileSync(sqlPath, "utf8");
      const regex = /INSERT INTO `blogs`[\s\S]*?VALUES([\s\S]*?)(?:ON DUPLICATE KEY UPDATE|;)/g;
      let match;
      const sqlBlogs = [];
      while ((match = regex.exec(sqlContent)) !== null) {
        const valuesStr = match[1];
        // Match the first 3 strings in the tuple: ('id', 'title', 'slug', ...)
        const rowRegex = /\(\s*'[^']*'\s*,\s*'[^']*'\s*,\s*'([^']+)'/g;
        let rowMatch;
        while ((rowMatch = rowRegex.exec(valuesStr)) !== null) {
          sqlBlogs.push({ slug: rowMatch[1] });
        }
      }
      if (sqlBlogs.length > 0) {
        console.log(`Successfully read ${sqlBlogs.length} blogs from database.sql for sitemap.`);
        return sqlBlogs;
      }
    } catch (e) {
      console.error("Failed to parse database.sql for sitemap generation:", e);
    }
  }

  // Fallback to db.json
  const dbPath = path.resolve(__dirname, "../data/db.json");
  if (fs.existsSync(dbPath)) {
    try {
      const dbStr = fs.readFileSync(dbPath, "utf8");
      const db = JSON.parse(dbStr);
      if (db.blogs && Array.isArray(db.blogs)) {
        console.log(`Successfully read ${db.blogs.length} blogs from db.json for sitemap.`);
        return db.blogs;
      }
    } catch (e) {
      console.error("Failed to parse db.json for sitemap generation:", e);
    }
  }
  return [];
}

async function getDbLocations() {
  const host = process.env.DB_HOST;
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const database = process.env.DB_DATABASE;
  const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306;

  if (host && user && database) {
    try {
      const mysql = await import("mysql2/promise");
      const connection = await mysql.createConnection({
        host,
        port,
        user,
        password,
        database,
      });
      const [rows] = await connection.query("SELECT slug FROM locations");
      await connection.end();
      console.log(`Successfully fetched ${rows.length} locations from MySQL database for sitemap.`);
      return rows.map(r => r.slug);
    } catch (err) {
      console.error(
        "Failed to fetch locations from MySQL for sitemap, falling back to db.json:",
        err.message,
      );
    }
  }

  // Fallback to db.json
  const dbPath = path.resolve(__dirname, "../data/db.json");
  if (fs.existsSync(dbPath)) {
    try {
      const dbStr = fs.readFileSync(dbPath, "utf8");
      const db = JSON.parse(dbStr);
      if (db.locations && Array.isArray(db.locations)) {
        console.log(`Successfully read ${db.locations.length} locations from db.json for sitemap.`);
        return db.locations.map(l => l.slug);
      }
    } catch (e) {
      console.error("Failed to parse db.json for sitemap locations:", e);
    }
  }
  return [];
}

async function generateSitemap() {
  console.log("Generating sitemap...");

  if (!fs.existsSync(ROUTES_DIR)) {
    console.warn(`Routes directory not found: ${ROUTES_DIR}. Skipping static routes discovery and using pre-computed dynamic routes.`);
    // Initialize empty files list to prevent crash
    var allFiles = [];
  } else {
    var allFiles = getFiles(ROUTES_DIR);
  }
  const urls = [];
  const currentDate = new Date().toISOString().split("T")[0];

  for (const filePath of allFiles) {
    const relativePath = path.relative(ROUTES_DIR, filePath);

    // Normalize path separators to forward slashes
    const normalizedPath = relativePath.replace(/\\/g, "/");

    // Skip dynamic parameterized templates and layout wrappers
    if (
      normalizedPath.includes("$") ||
      normalizedPath.startsWith("__") ||
      normalizedPath.startsWith("_") ||
      normalizedPath.includes("/__") ||
      normalizedPath.includes("/_") ||
      normalizedPath.startsWith("admin/") ||
      normalizedPath === "admin.tsx"
    ) {
      continue;
    }

    // Convert file path to URL path
    let routePath = normalizedPath.replace(/\.tsx?$/, "");

    if (routePath === "index") {
      routePath = "";
    } else if (routePath.endsWith("/index")) {
      routePath = routePath.slice(0, -6);
    }

    const fullUrl = `${BASE_URL}/${routePath}`.replace(/\/$/, ""); // remove trailing slash if any

    // Determine changefreq and priority based on route path
    let changefreq = "monthly";
    let priority = "0.7";

    if (routePath === "") {
      changefreq = "weekly";
      priority = "1.0";
    } else if (routePath === "booking" || routePath === "portfolio" || routePath === "resources") {
      changefreq = "weekly";
      priority = "0.9";
    } else if (routePath.startsWith("guides/")) {
      changefreq = "monthly";
      priority = "0.8";
    } else if (routePath.startsWith("interactive/")) {
      changefreq = "monthly";
      priority = "0.7";
    } else if (routePath.startsWith("tools/")) {
      changefreq = "monthly";
      priority = "0.8";
    }

    urls.push({
      loc: fullUrl === BASE_URL ? `${BASE_URL}/` : fullUrl,
      lastmod: currentDate,
      changefreq,
      priority,
    });
  }

  // Define dynamic sitemap additions
  const LOCATIONS = [
    ...(await getDbLocations()),
    "wagholi",
    "lonikand",
    "koregaon-bhima",
    "shikrapur",
    "karegaon",
    "ranjangaon-midc",
    "shirur",
    "hadapsar",
    "kharadi",
    "chakan-midc",
    "pimpri-chinchwad",
    "pune-district",
    "mumbai-district",
    "nashik-district"
  ];

  const BRANDS = [
    "daikin",
    "lg",
    "voltas",
    "carrier",
    "hitachi",
    "panasonic",
    "blue-star",
    "lloyd",
    "samsung",
    "godrej",
    "whirlpool",
    "haier",
    "o-general",
    "mitsubishi-electric",
    "mitsubishi-heavy",
    "toshiba",
    "danfoss",
    "copeland",
    "carrier-transicold",
    "thermo-king",
    "bitzer",
    "emerson",
  ];

  const REFRIGERANTS = ["r134a", "r410a", "r32", "r404a", "r407c", "r22", "r290"];

  const SERVICES = [
    "split-ac-repair",
    "window-ac-repair",
    "inverter-ac-repair",
    "portable-ac-repair",
    "tower-ac-repair",
    "cassette-ac-repair",
    "vrf-systems",
    "vrv-systems",
    "ahu",
    "fcu",
    "package-units",
    "ductable-ac",
    "precision-ac",
    "server-room-cooling",
    "cold-rooms",
    "walk-in-chillers",
    "walk-in-freezers",
    "ice-machines",
    "blast-freezers",
    "bottle-coolers",
    "display-counters",
    "water-coolers",
    "deep-freezers",
    "commercial-refrigerators",
    "chillers",
    "cooling-towers",
    "industrial-compressors",
    "process-cooling",
    "dairy-refrigeration",
    "pharma-refrigeration",
    "ac-repair",
    "ac-installation",
    "ac-uninstallation",
    "ac-shifting",
    "ac-gas-charging",
    "ac-gas-leak-repair",
    "commercial-ac-installation",
    "office-hvac-solutions",
    "warehouse-hvac",
    "factory-hvac",
    "hospital-hvac",
    "school-hvac",
    "hotel-hvac",
    "restaurant-hvac",
    "industrial-cooling",
    "cold-room-repair",
    "cold-storage-maintenance",
    "cnc-machine-cooling",
    "air-compressors",
  ];

  // 1. Locations SEO URLs
  for (const loc of LOCATIONS) {
    urls.push({
      loc: `${BASE_URL}/locations/${loc}`,
      lastmod: currentDate,
      changefreq: "weekly",
      priority: "0.8",
    });
  }

  // 1b. Joint Locations x Services SEO URLs
  for (const loc of LOCATIONS) {
    for (const service of SERVICES) {
      urls.push({
        loc: `${BASE_URL}/services/${service}/${loc}`,
        lastmod: currentDate,
        changefreq: "weekly",
        priority: "0.85",
      });
    }
  }

  // 1c. Cities SEO URLs
  for (const loc of LOCATIONS) {
    urls.push({
      loc: `${BASE_URL}/cities/${loc}`,
      lastmod: currentDate,
      changefreq: "weekly",
      priority: "0.8",
    });
  }

  // 1d. Joint Cities x Services SEO URLs
  for (const loc of LOCATIONS) {
    for (const service of SERVICES) {
      urls.push({
        loc: `${BASE_URL}/cities/${loc}/${service}`,
        lastmod: currentDate,
        changefreq: "weekly",
        priority: "0.85",
      });
    }
  }

  // 2. Services SEO URLs
  for (const service of SERVICES) {
    urls.push({
      loc: `${BASE_URL}/services/${service}`,
      lastmod: currentDate,
      changefreq: "weekly",
      priority: "0.9",
    });
  }

  // 3. Brands SEO URLs
  for (const brand of BRANDS) {
    urls.push({
      loc: `${BASE_URL}/brands/${brand}`,
      lastmod: currentDate,
      changefreq: "monthly",
      priority: "0.8",
    });
  }

  // 3b. Dynamic Brand-Appliance SEO URLs (88 combinations)
  const APPLIANCES = ["ac", "fridge", "washing-machine", "hvac"];
  for (const brand of BRANDS) {
    for (const app of APPLIANCES) {
      urls.push({
        loc: `${BASE_URL}/brands/${brand}/${app}`,
        lastmod: currentDate,
        changefreq: "monthly",
        priority: "0.75",
      });
    }
  }

  // 3c. Dynamic Brand Comparisons SEO URLs (15 pages)
  const COMPARISONS = [
    "carrier-vs-hitachi",
    "daikin-vs-hitachi",
    "mitsubishi-vs-voltas",
    "carrier-vs-o-general",
    "lg-vs-samsung",
    "godrej-vs-whirlpool",
    "haier-vs-samsung",
    "daikin-vs-carrier",
    "daikin-vs-voltas",
    "voltas-vs-blue-star",
    "lloyd-vs-voltas",
    "hitachi-vs-o-general",
    "carrier-vs-blue-star",
    "mitsubishi-vs-daikin",
    "panasonic-vs-daikin",
  ];
  for (const comp of COMPARISONS) {
    urls.push({
      loc: `${BASE_URL}/brands/compare/${comp}`,
      lastmod: currentDate,
      changefreq: "monthly",
      priority: "0.8",
    });
  }

  // 4. Refrigerants SEO URLs
  for (const ref of REFRIGERANTS) {
    urls.push({
      loc: `${BASE_URL}/refrigerants/${ref}`,
      lastmod: currentDate,
      changefreq: "monthly",
      priority: "0.8",
    });
  }

  // 4b. Industrial Systems SEO URLs
  const INDUSTRIAL_TOPICS = [
    "vrf-vrv-systems",
    "industrial-air-dryers",
    "large-scale-ducting",
    "chiller-plant-operations",
  ];
  for (const topic of INDUSTRIAL_TOPICS) {
    urls.push({
      loc: `${BASE_URL}/industrial/${topic}`,
      lastmod: currentDate,
      changefreq: "monthly",
      priority: "0.9",
    });
  }

  // 4c. Emergency Portal
  urls.push({
    loc: `${BASE_URL}/emergency`,
    lastmod: currentDate,
    changefreq: "monthly",
    priority: "0.8",
  });

  // 5. Load dynamic blogs from database or db.json fallback
  const blogs = await getBlogs();
  for (const blog of blogs) {
    if (blog.slug) {
      urls.push({
        loc: `${BASE_URL}/blogs/${blog.slug}`,
        lastmod: currentDate,
        changefreq: "weekly",
        priority: "0.8",
      });
    }
  }

  // Categorize URLs
  const categorizedUrls = {
    main: [],
    locations: [],
    locations_services: [],
    cities: [],
    cities_services: [],
    brands: [],
    other: []
  };

  for (const url of urls) {
    const pathParts = url.loc.replace(BASE_URL, '').split('/').filter(Boolean);
    if (pathParts[0] === 'services' && pathParts.length > 1) {
      if (pathParts.length > 2) {
        categorizedUrls.locations_services.push(url);
      } else {
        categorizedUrls.other.push(url);
      }
    } else if (pathParts[0] === 'cities') {
      if (pathParts.length > 2) {
        categorizedUrls.cities_services.push(url);
      } else {
        categorizedUrls.cities.push(url);
      }
    } else if (pathParts[0] === 'locations') {
      categorizedUrls.locations.push(url);
    } else if (pathParts[0] === 'brands') {
      categorizedUrls.brands.push(url);
    } else {
      categorizedUrls.main.push(url);
    }
  }

  const URLS_PER_SITEMAP = 45000;
  const sitemapFiles = [];
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const [category, catUrls] of Object.entries(categorizedUrls)) {
    if (catUrls.length === 0) continue;
    
    // Sort urls by priority desc, then loc asc for each category
    catUrls.sort((a, b) => {
      const pA = parseFloat(a.priority);
      const pB = parseFloat(b.priority);
      if (pB !== pA) return pB - pA;
      return a.loc.localeCompare(b.loc);
    });

    const chunks = [];
    for (let i = 0; i < catUrls.length; i += URLS_PER_SITEMAP) {
      chunks.push(catUrls.slice(i, i + URLS_PER_SITEMAP));
    }

    chunks.forEach((chunk, index) => {
      const filename = chunks.length === 1 ? `sitemap-${category}.xml` : `sitemap-${category}-${index + 1}.xml`;
      const filePath = path.join(outputDir, filename);
      
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
      for (const url of chunk) {
        xml += "  <url>\n";
        xml += `    <loc>${url.loc}</loc>\n`;
        xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
        xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
        xml += `    <priority>${url.priority}</priority>\n`;
        xml += "  </url>\n";
      }
      xml += "</urlset>\n";
      
      fs.writeFileSync(filePath, xml, "utf8");
      sitemapFiles.push(filename);
      console.log(`Generated ${filename} with ${chunk.length} URLs`);
    });
  }

  // Generate sitemap index
  let indexXml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  indexXml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  for (const file of sitemapFiles) {
    indexXml += "  <sitemap>\n";
    indexXml += `    <loc>${BASE_URL}/${file}</loc>\n`;
    indexXml += `    <lastmod>${currentDate}</lastmod>\n`;
    indexXml += "  </sitemap>\n";
  }
  indexXml += "</sitemapindex>\n";
  
  fs.writeFileSync(OUTPUT_FILE, indexXml, "utf8");
  console.log(`Successfully generated sitemap index at ${OUTPUT_FILE} linking to ${sitemapFiles.length} sitemaps.`);
}

generateSitemap().catch(console.error);
