import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://primecool.in';
const ROUTES_DIR = path.resolve(__dirname, '../src/routes');
const OUTPUT_FILE = path.resolve(__dirname, '../public/sitemap.xml');

// Walk directory recursively
function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getFiles(filePath, fileList);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

async function getBlogs() {
  // Load environment variables manually
  try {
    const envPath = path.resolve(__dirname, '../.env');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      const lines = envContent.split(/\r?\n/);
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const match = trimmed.match(/^([^=]+)=(.*)$/);
        if (match) {
          const key = match[1].trim();
          let value = match[2].trim();
          if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
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
      const mysql = await import('mysql2/promise');
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
      console.error("Failed to fetch blogs from MySQL for sitemap, falling back to db.json:", err.message);
    }
  }

  // Fallback to db.json
  const dbPath = path.resolve(__dirname, '../data/db.json');
  if (fs.existsSync(dbPath)) {
    try {
      const dbStr = fs.readFileSync(dbPath, 'utf8');
      const db = JSON.parse(dbStr);
      if (db.blogs && Array.isArray(db.blogs)) {
        console.log(`Successfully read ${db.blogs.length} blogs from db.json for sitemap.`);
        return db.blogs;
      }
    } catch (e) {
      console.error('Failed to parse db.json for sitemap generation:', e);
    }
  }
  return [];
}

async function generateSitemap() {
  console.log('Generating sitemap...');
  
  if (!fs.existsSync(ROUTES_DIR)) {
    console.error(`Routes directory not found: ${ROUTES_DIR}`);
    process.exit(1);
  }

  const allFiles = getFiles(ROUTES_DIR);
  const urls = [];
  const currentDate = new Date().toISOString().split('T')[0];

  for (const filePath of allFiles) {
    const relativePath = path.relative(ROUTES_DIR, filePath);
    
    // Normalize path separators to forward slashes
    const normalizedPath = relativePath.replace(/\\/g, '/');
    
    // Skip layout files, root wrapper, admin pages, etc.
    if (
      normalizedPath.startsWith('__') ||
      normalizedPath.startsWith('_') ||
      normalizedPath.includes('/__') ||
      normalizedPath.includes('/_') ||
      normalizedPath.startsWith('admin/') ||
      normalizedPath === 'admin.tsx'
    ) {
      continue;
    }

    // Convert file path to URL path
    let routePath = normalizedPath.replace(/\.tsx?$/, '');
    
    if (routePath === 'index') {
      routePath = '';
    } else if (routePath.endsWith('/index')) {
      routePath = routePath.slice(0, -6);
    }

    const fullUrl = `${BASE_URL}/${routePath}`.replace(/\/$/, ''); // remove trailing slash if any

    // Determine changefreq and priority based on route path
    let changefreq = 'monthly';
    let priority = '0.7';

    if (routePath === '') {
      changefreq = 'weekly';
      priority = '1.0';
    } else if (
      routePath === 'booking' ||
      routePath === 'portfolio' ||
      routePath === 'resources'
    ) {
      changefreq = 'weekly';
      priority = '0.9';
    } else if (routePath.startsWith('cities/')) {
      changefreq = 'weekly';
      priority = '0.8';
    } else if (routePath.startsWith('guides/')) {
      changefreq = 'monthly';
      priority = '0.8';
    } else if (routePath.startsWith('refrigerants/')) {
      changefreq = 'monthly';
      priority = '0.8';
    } else if (routePath.startsWith('interactive/')) {
      changefreq = 'monthly';
      priority = '0.7';
    } else if (routePath.startsWith('tools/')) {
      changefreq = 'monthly';
      priority = '0.8';
    }

    urls.push({
      loc: fullUrl === BASE_URL ? `${BASE_URL}/` : fullUrl,
      lastmod: currentDate,
      changefreq,
      priority,
    });
  }

  // Load dynamic blogs from database or db.json fallback
  const blogs = await getBlogs();
  for (const blog of blogs) {
    if (blog.slug) {
      urls.push({
        loc: `${BASE_URL}/blogs/${blog.slug}`,
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: '0.8',
      });
    }
  }

  // Sort urls by priority desc, then loc asc
  urls.sort((a, b) => {
    const pA = parseFloat(a.priority);
    const pB = parseFloat(b.priority);
    if (pB !== pA) return pB - pA;
    return a.loc.localeCompare(b.loc);
  });

  // Build the XML content
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const url of urls) {
    xml += '  <url>\n';
    xml += `    <loc>${url.loc}</loc>\n`;
    xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    xml += `    <priority>${url.priority}</priority>\n`;
    xml += '  </url>\n';
  }

  xml += '</urlset>\n';

  // Make sure output folder exists
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, xml, 'utf8');
  console.log(`Successfully generated sitemap.xml with ${urls.length} URLs at ${OUTPUT_FILE}`);
}

generateSitemap().catch(console.error);
