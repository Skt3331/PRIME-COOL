# Prime Cool AI Blog Automation & Daily Regeneration Engine 🤖🚀

Automated, SEO-rich blog generation and daily synchronization system for **Prime Cool HVAC, Refrigeration & Industrial Mechanical Solutions (Pune & Maharashtra)**.

Powered by **Google Gemini API**, a high-precision **Smart Fallback Engine**, **Active Deduplication**, and **Automated Sitemap XML Updates**.

---

## 🎯 Daily 50-Blog Quota Distribution

The system automatically generates **50 comprehensive, SEO-optimized blogs daily** structured into 4 high-value categories:

| Category | Daily Target | Topics Covered | Key Value & SEO Focus |
| :--- | :--- | :--- | :--- |
| **Trending Topics** | **10 Blogs** | R-32 vs R-454B eco-refrigerants, AI Dual Inverter ACs, Inverter PCB micro-soldering, Front Load washer drum spiders, BLDC fan motors | High search volume keywords, technical comparison tables, ISEER calculations, power savings. |
| **Location SEO** | **20 Blogs** | Wagholi, Kharadi, Hadapsar, Hinjewadi, Chakan, Bhosari, Kothrud, Baner, Wakad, Shikrapur, Shirur, etc. | Hyper-localized Pune/PCMC search queries, local landmarks, pincodes, rapid 45-min doorstep dispatch SLAs. |
| **Commercial HVAC/R** | **10 Blogs** | Commercial VRV/VRF multi-zone, cold rooms & walk-in freezers, cassette AC drain pumps, server room PAC cooling, restaurant ventilation | Corporate AMC terms, BMS automation, IPLV part-load metrics, supermarket chiller maintenance. |
| **Industrial Mechanical** | **10 Blogs** | Process water chillers (50-500 TR), industrial cooling tower overhauls, compressed air dryers, industrial VFD drives, pharma cleanroom HVAC | MIDC manufacturing zones (Chakan, Bhosari, Ranjangaon), screw compressor overhauls, IKW/TR efficiency. |

---

## 🛡️ Active Deduplication Engine

The bot features a zero-duplicate guarantee:
- Before generation, it loads all existing slugs and titles from `src/lib/blogs-data.json`, `data/db.json`, and MySQL.
- When creating seeds or AI outputs, candidate slugs and titles are verified against the global database.
- If a matching topic is detected, unique timestamp/date/sub-locational signatures are automatically injected, preventing slug collisions and content duplication.

---

## 🔍 SEO & Content Quality Standards

Every generated blog includes:
- **Title Tag (`seoTitle`)**: Under 60 characters, high CTR, keyword and location optimized.
- **Meta Description (`seoDesc`)**: Under 155 characters with service details and 24/7 call-to-action.
- **Structured Content**: H2/H3 headings, minimum 750 words.
- **Markdown Tables**:
  - Technical engineering specification & brand comparison tables.
  - Genuine OEM spare parts pricing table in INR (₹) with warranty terms.
  - Multimeter diagnostic & error code matrix table (E1-E12, CH05, F3, etc.).
- **Schema-Ready FAQs**: 3 to 4 high-intent search questions answered with technical depth.
- **Local Pune Dispatch CTA**: Direct emergency hotline (+91 7507408461).

---

## ⚙️ Commands & Running the Bot

### 1. Run Daily Generation Batch (50 Blogs: 10+20+10+10)
```bash
npm run bot:generate
# or
node automation/gemini-bot.js --daily
```

### 2. Run Daily Automated Cron Daemon (24/7 Background Runner)
```bash
npm run bot:daily
# or
node automation/cron-scheduler.js
```

### 3. Generate Specific Batch Sizes or Categories
```bash
# Generate 10 specific location blogs
node automation/gemini-bot.js --count 10 --type location

# Generate 5 industrial blogs
node automation/gemini-bot.js --count 5 --type industrial

# Custom batch of 20 blogs
node automation/gemini-bot.js --count 20
```

---

## 📁 Files Synced Automatically
1. `src/lib/blogs-data.json` - Static frontend seed & fast SSR rendering.
2. `data/db.json` - Local database cache.
3. MySQL `blogs` table - Remote database synchronization (if configured in `.env`).
4. `public/sitemap.xml` & `public/sitemap-blogs.xml` - Automatically rebuilt via `npm run sitemap`.
