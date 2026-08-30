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
  if (!fs.existsSync(dir)) return fileList;
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

// Load environment variables manually
function loadEnv() {
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
}

async function getBlogs() {
  loadEnv();
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
      return rows;
    } catch (err) {
      // Ignore
    }
  }

  // Fallback to blogs-data.json
  const blogsDataPath = path.resolve(__dirname, "../src/lib/blogs-data.json");
  if (fs.existsSync(blogsDataPath)) {
    try {
      const blogsJson = JSON.parse(fs.readFileSync(blogsDataPath, "utf8"));
      return blogsJson;
    } catch (err) {
      // Ignore
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
        const rowRegex = /\(\s*'[^']*'\s*,\s*'[^']*'\s*,\s*'([^']+)'/g;
        let rowMatch;
        while ((rowMatch = rowRegex.exec(valuesStr)) !== null) {
          sqlBlogs.push({ slug: rowMatch[1] });
        }
      }
      if (sqlBlogs.length > 0) {
        return sqlBlogs;
      }
    } catch (e) {
      // Ignore
    }
  }

  return [];
}

async function getDbLocations() {
  loadEnv();
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
      return rows.map((r) => r.slug);
    } catch (err) {
      // Ignore
    }
  }

  const dbPath = path.resolve(__dirname, "../data/db.json");
  if (fs.existsSync(dbPath)) {
    try {
      const dbStr = fs.readFileSync(dbPath, "utf8");
      const db = JSON.parse(dbStr);
      if (db.locations && Array.isArray(db.locations)) {
        return db.locations.map((l) => l.slug);
      }
    } catch (e) {
      // Ignore
    }
  }
  return [];
}

async function getServicesFromServicesDataFile() {
  const servicesPath = path.resolve(__dirname, "../src/lib/services-data.ts");
  const extracted = [];
  if (fs.existsSync(servicesPath)) {
    try {
      const content = fs.readFileSync(servicesPath, "utf8");
      const matchRegex = /"([^"]+)":\s*\{\s*"slug":/g;
      let match;
      while ((match = matchRegex.exec(content)) !== null) {
        extracted.push(match[1]);
      }
    } catch (e) {
      // Ignore
    }
  }
  return extracted;
}

function escapeXml(unsafe) {
  return String(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function generateSitemap() {
  console.log(
    "Generating 100% complete sitemaps with all services, locations, and matrix routes...",
  );

  const currentDate = new Date().toISOString().split("T")[0];

  // Core Cities List
  const CORE_CITIES = [
    "pune",
    "mumbai",
    "thane",
    "navi-mumbai",
    "nashik",
    "pimpri-chinchwad",
    "nagpur",
    "aurangabad",
    "kolhapur",
    "solapur",
  ];

  // Comprehensive Localities & Industrial Hubs List
  const CORE_LOCATIONS = [
    // Pune East & Nagar Road Corridor
    "wagholi",
    "hadapsar",
    "kharadi",
    "viman-nagar",
    "kalyani-nagar",
    "magarpatta",
    "kesnand",
    "lonikand",
    "bakori",
    "awhalwadi",
    "ubale-nagar",
    "mundhwa",
    "fursungi",
    "sasane-nagar",
    "handewadi",
    "fatima-nagar",
    "ramtekdi",
    "chandan-nagar",
    "rakshak-nagar",
    "koregaon-bhima",
    "sanaswadi",
    "shikrapur",
    "kondhapuri",
    "karegaon",
    "shirur",
    "sarola",
    "ranjangaon-midc",

    // Pune North & Industrial Corridor
    "chakan-midc",
    "bhosari-midc",
    "talegaon-midc",
    "kuruli",
    "mahalunge",
    "moshi",
    "chikhali",
    "alandi",
    "rajgurunagar",
    "dighi",
    "charholi",
    "yerawada",
    "lohegaon",

    // Pune West & IT Corridors
    "hinjewadi",
    "baner",
    "balewadi",
    "wakad",
    "pimple-saudagar",
    "pimple-nilakh",
    "aundh",
    "bavdhan",
    "kothrud",
    "warje",
    "tathawade",
    "punawale",
    "marunji",
    "ravet",
    "akurdi",
    "nigdi",

    // Pune Central & South
    "shivajinagar",
    "swargate",
    "camp",
    "kondhwa",
    "katraj",
    "dhankawadi",
    "bibwewadi",
    "undri",
    "pisoli",
    "mohammadwadi",
  ];

  const dbLocations = await getDbLocations();
  const LOCATIONS = Array.from(new Set([...CORE_LOCATIONS, ...dbLocations]));

  // OEM Brands
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

  const BRAND_APPLIANCES = ["ac", "fridge", "washing-machine", "hvac"];

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

  const REFRIGERANTS = ["r134a", "r410a", "r32", "r404a", "r407c", "r22", "r290"];

  const INDUSTRIAL_TOPICS = [
    "vrf-vrv-systems",
    "industrial-air-dryers",
    "large-scale-ducting",
    "chiller-plant-operations",
  ];

  // Comprehensive Services List
  const standardServices = [
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
    "cold-room-repair",
    "cold-storage-maintenance",
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
    "cnc-machine-cooling",
    "air-compressors",
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
  ];

  const servicesDataSlugs = await getServicesFromServicesDataFile();
  const ALL_SERVICES = Array.from(new Set([...standardServices, ...servicesDataSlugs]));

  // Global Canonical Map (guarantees zero duplicate URLs)
  const urlMap = new Map();

  function addUrl(rawPath, { changefreq = "monthly", priority = "0.7", category = "other" } = {}) {
    let cleanPath = rawPath.trim();
    if (!cleanPath.startsWith("/")) cleanPath = "/" + cleanPath;
    cleanPath = cleanPath.replace(/\/+$/, ""); // remove trailing slash except root
    const fullUrl = cleanPath === "" ? BASE_URL : `${BASE_URL}${cleanPath}`;

    if (urlMap.has(fullUrl)) {
      const existing = urlMap.get(fullUrl);
      if (parseFloat(priority) > parseFloat(existing.priority)) {
        existing.priority = priority;
        existing.changefreq = changefreq;
        existing.category = category;
      }
      return;
    }

    urlMap.set(fullUrl, {
      loc: fullUrl,
      lastmod: currentDate,
      changefreq,
      priority,
      category,
    });
  }

  // 1. CORE STATIC PAGES
  addUrl("/", { changefreq: "daily", priority: "1.0", category: "main" });
  addUrl("/booking", { changefreq: "weekly", priority: "0.95", category: "main" });
  addUrl("/emergency", { changefreq: "daily", priority: "0.95", category: "main" });
  addUrl("/services", { changefreq: "weekly", priority: "0.90", category: "main" });
  addUrl("/locations", { changefreq: "weekly", priority: "0.90", category: "main" });
  addUrl("/cities", { changefreq: "weekly", priority: "0.90", category: "main" });
  addUrl("/brands", { changefreq: "weekly", priority: "0.85", category: "main" });
  addUrl("/portfolio", { changefreq: "weekly", priority: "0.85", category: "main" });
  addUrl("/blogs", { changefreq: "daily", priority: "0.85", category: "main" });
  addUrl("/calculators", { changefreq: "weekly", priority: "0.85", category: "main" });
  addUrl("/resources", { changefreq: "weekly", priority: "0.85", category: "main" });
  addUrl("/glossary", { changefreq: "monthly", priority: "0.80", category: "main" });
  addUrl("/guides", { changefreq: "weekly", priority: "0.80", category: "main" });
  addUrl("/formulas", { changefreq: "monthly", priority: "0.80", category: "main" });
  addUrl("/refrigerants", { changefreq: "monthly", priority: "0.80", category: "main" });
  addUrl("/industrial", { changefreq: "monthly", priority: "0.80", category: "main" });

  // 2. STATIC ROUTES FROM src/routes
  const allFiles = getFiles(ROUTES_DIR);
  for (const filePath of allFiles) {
    const relativePath = path.relative(ROUTES_DIR, filePath);
    const normalizedPath = relativePath.replace(/\\/g, "/");

    if (
      normalizedPath.includes("$") ||
      normalizedPath.startsWith("__") ||
      normalizedPath.startsWith("_") ||
      normalizedPath.includes("/__") ||
      normalizedPath.includes("/_") ||
      normalizedPath.startsWith("admin/") ||
      normalizedPath === "admin.tsx" ||
      normalizedPath.startsWith("portal/")
    ) {
      continue;
    }

    let routePath = normalizedPath.replace(/\.tsx?$/, "");
    if (routePath === "index") routePath = "";
    else if (routePath.endsWith("/index")) routePath = routePath.slice(0, -6);

    let category = "other";
    let priority = "0.7";
    let changefreq = "monthly";

    if (
      routePath === "" ||
      routePath === "booking" ||
      routePath === "emergency" ||
      routePath === "portfolio" ||
      routePath === "blogs" ||
      routePath === "services" ||
      routePath === "locations" ||
      routePath === "cities" ||
      routePath === "brands" ||
      routePath === "calculators" ||
      routePath === "resources" ||
      routePath === "glossary"
    ) {
      category = "main";
      priority = "0.85";
    } else if (routePath.startsWith("tools/")) {
      category = "tools-guides";
      priority = "0.80";
    } else if (routePath.startsWith("guides/")) {
      category = "tools-guides";
      priority = "0.80";
    } else if (routePath.startsWith("formulas/")) {
      category = "tools-guides";
      priority = "0.75";
    } else if (routePath.startsWith("interactive/")) {
      category = "tools-guides";
      priority = "0.75";
    } else if (routePath.startsWith("cities/")) {
      category = "cities";
      priority = "0.85";
    } else if (routePath.startsWith("locations/")) {
      category = "locations";
      priority = "0.85";
    } else if (routePath.startsWith("services/")) {
      category = "services";
      priority = "0.90";
    } else if (routePath.startsWith("brands/")) {
      category = "brands";
      priority = "0.80";
    } else if (routePath.startsWith("refrigerants/")) {
      category = "tools-guides";
      priority = "0.80";
    } else if (routePath.startsWith("industrial/")) {
      category = "tools-guides";
      priority = "0.80";
    }

    addUrl(`/${routePath}`, { changefreq, priority, category });
  }

  // 3. ALL STANDALONE SERVICES
  for (const service of ALL_SERVICES) {
    addUrl(`/services/${service}`, {
      changefreq: "weekly",
      priority: "0.90",
      category: "services",
    });
  }

  // 4. ALL STANDALONE LOCATIONS
  for (const loc of LOCATIONS) {
    addUrl(`/locations/${loc}`, {
      changefreq: "weekly",
      priority: "0.85",
      category: "locations",
    });
  }

  // 5. ALL CITIES & CITY-SERVICE MATRIX
  for (const city of CORE_CITIES) {
    addUrl(`/cities/${city}`, {
      changefreq: "weekly",
      priority: "0.85",
      category: "cities",
    });

    for (const service of standardServices) {
      addUrl(`/cities/${city}/${service}`, {
        changefreq: "weekly",
        priority: "0.80",
        category: "cities",
      });
    }
  }

  // 6. ALL SERVICES x LOCATIONS MATRIX
  for (const loc of LOCATIONS) {
    for (const service of standardServices) {
      addUrl(`/services/${service}/${loc}`, {
        changefreq: "weekly",
        priority: "0.80",
        category: "services-locations",
      });
    }
  }

  // 7. ALL BRANDS, APPLIANCES & COMPARISONS
  for (const brand of BRANDS) {
    addUrl(`/brands/${brand}`, {
      changefreq: "monthly",
      priority: "0.80",
      category: "brands",
    });

    for (const app of BRAND_APPLIANCES) {
      addUrl(`/brands/${brand}/${app}`, {
        changefreq: "monthly",
        priority: "0.75",
        category: "brands",
      });
    }

    // Brand Authorized Service Centers x Locations Matrix
    for (const loc of LOCATIONS) {
      addUrl(`/brands/${brand}/${loc}`, {
        changefreq: "weekly",
        priority: "0.80",
        category: "brands",
      });
    }
  }

  for (const comp of COMPARISONS) {
    addUrl(`/brands/compare/${comp}`, {
      changefreq: "monthly",
      priority: "0.80",
      category: "brands",
    });
  }

  // 8. ALL REFRIGERANTS & INDUSTRIAL TOPICS
  for (const ref of REFRIGERANTS) {
    addUrl(`/refrigerants/${ref}`, {
      changefreq: "monthly",
      priority: "0.80",
      category: "tools-guides",
    });
  }

  for (const topic of INDUSTRIAL_TOPICS) {
    addUrl(`/industrial/${topic}`, {
      changefreq: "monthly",
      priority: "0.80",
      category: "tools-guides",
    });
  }

  // 9. ALL BLOGS
  const blogs = await getBlogs();
  for (const blog of blogs) {
    if (blog.slug) {
      addUrl(`/blogs/${blog.slug}`, {
        changefreq: "weekly",
        priority: "0.85",
        category: "blogs",
      });
    }
  }

  // CATEGORIZATION BUCKETS
  const categorized = {
    main: [],
    services: [],
    locations: [],
    cities: [],
    "services-locations": [],
    brands: [],
    "tools-guides": [],
    blogs: [],
    other: [],
  };

  for (const urlObj of urlMap.values()) {
    const bucket = categorized[urlObj.category] ? urlObj.category : "other";
    categorized[bucket].push(urlObj);
  }

  const URLS_PER_SITEMAP = 5000;
  const sitemapFiles = [];
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Clean old sub-sitemaps
  const existingFiles = fs.readdirSync(outputDir);
  for (const file of existingFiles) {
    if (file.startsWith("sitemap") && file.endsWith(".xml") && file !== "sitemap.xml") {
      try {
        fs.unlinkSync(path.join(outputDir, file));
      } catch (e) {
        // Ignore
      }
    }
  }

  const stats = {};

  for (const [category, catUrls] of Object.entries(categorized)) {
    if (catUrls.length === 0) continue;

    catUrls.sort((a, b) => {
      const pA = parseFloat(a.priority);
      const pB = parseFloat(b.priority);
      if (pB !== pA) return pB - pA;
      return a.loc.localeCompare(b.loc);
    });

    stats[category] = catUrls.length;

    const chunks = [];
    for (let i = 0; i < catUrls.length; i += URLS_PER_SITEMAP) {
      chunks.push(catUrls.slice(i, i + URLS_PER_SITEMAP));
    }

    chunks.forEach((chunk, index) => {
      const filename =
        chunks.length === 1 ? `sitemap-${category}.xml` : `sitemap-${category}-${index + 1}.xml`;
      const filePath = path.join(outputDir, filename);

      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
      for (const url of chunk) {
        xml += "  <url>\n";
        xml += `    <loc>${escapeXml(url.loc)}</loc>\n`;
        xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
        xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
        xml += `    <priority>${url.priority}</priority>\n`;
        xml += "  </url>\n";
      }
      xml += "</urlset>\n";

      fs.writeFileSync(filePath, xml, "utf8");
      sitemapFiles.push(filename);
      console.log(`Generated ${filename} with ${chunk.length} unique URLs`);
    });
  }

  // Generate sitemap index (sitemap.xml)
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
  console.log(
    `Successfully generated sitemap index at ${OUTPUT_FILE} linking to ${sitemapFiles.length} sub-sitemaps (${urlMap.size} total unique URLs).`,
  );

  return {
    totalUrls: urlMap.size,
    sitemapFiles,
    categories: stats,
    generatedAt: currentDate,
  };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  generateSitemap().catch(console.error);
}
