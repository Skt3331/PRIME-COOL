# Prime Cool HVAC & Appliance AI Blog Automation Bot

An autonomous AI content engine powered by Google Gemini API (`gemini-2.5-flash` / `gemini-1.5-flash`). The bot automatically generates daily high-converting, SEO-optimized engineering blogs, spare parts pricing guides, and brand comparison reviews covering HVAC, Refrigeration, Washing Machines, and Inverter PCB Repair across Pune, Shirur, Hadapsar, Chakan, PCMC, Thane, Nashik, and surrounding regions.

---

## 🚀 Features

- **Google Gemini AI Integration**: Calls Gemini REST API to create 600+ word technical articles formatted in Markdown with comparison matrices, pricing tables (INR ₹), error code reference tables, and multimeter diagnostics.
- **Smart Engine Fallback**: Seamless fallback generator if no `GEMINI_API_KEY` is provided or if network fails.
- **Rich Niche Coverage**:
  - **HVAC & Split ACs**: Daikin, Voltas, Blue Star, LG Dual Inverter, Hitachi, O General, Mitsubishi.
  - **Inverter Refrigerators**: Double Door, Frost-Free, Side-by-Side, Linear Compressor Repair, Defrost Thermostat.
  - **Washing Machines**: Front Load AI Direct Drive, Top Load Digital Inverter, Spider Bearings, PCB Mainboards, E4/UE Errors.
  - **Spare Parts & Pricing**: Inverter PCBs, IPM IGBT Modules, Rotary Compressors, EEV Valves, Gas Charges (R32, R410A, R134a).
  - **Regional SEO**: Pune, Shirur, Wagholi, Hadapsar, Kharadi IT Park, Chakan MIDC, Ranjangaon, PCMC, Kothrud, Viman Nagar, Bhosari, Hinjewadi.
- **Live Database Sync**: Directly updates `src/lib/blogs-data.json` and `data/db.json`, instantly appearing live on `/blogs` and `/blogs/$slug`.
- **Automatic Sitemap Update**: Triggers `npm run sitemap` after every batch.

---

## 📁 Directory Structure

```text
automation/
├── config.js          # Categories, brand pairs, spare parts price list (INR), locations & settings
├── prompts.js         # Prompt generators for Gemini API (Comparisons, Pricing, PCBs, Regional)
├── gemini-bot.js      # Main automation runner CLI
├── cron-scheduler.js  # Daily daemon scheduler (runs every 24 hours)
└── README.md          # Documentation
```

---

## 🛠️ Quick Start & Usage

### 1. Configure Gemini API Key (Optional)
Add your Gemini API Key in your `.env` file or export it in your environment:

```env
GEMINI_API_KEY=your_google_gemini_api_key_here
```

### 2. Run Single Generation Batch (e.g. 50 blogs)

```bash
npm run bot:generate
```

Or specify a custom blog count:

```bash
npm run bot:generate -- --count 20
```

### 3. Run Daily Scheduled Daemon

```bash
npm run bot:daily
```

---

## ⏰ Automating Daily 50-Blog Uploads

### Option A: Windows Task Scheduler
1. Open **Task Scheduler** on Windows.
2. Create a new Task named `PrimeCoolBlogBot`.
3. Action: `Start a program` -> `node`
4. Arguments: `c:\Users\svtv0\Desktop\prime-cool\automation\gemini-bot.js --count 50`
5. Trigger: Daily at `00:00`.

### Option B: Linux / Server Cron Job
Add to crontab (`crontab -e`):

```cron
0 0 * * * cd /var/www/prime-cool && npm run bot:generate >> /var/log/prime-cool-bot.log 2>&1
```

---

## 📊 Live Verification

1. Open `/blogs` in your browser or run dev server:
   ```bash
   npm run dev
   ```
2. Navigate to [http://localhost:3000/blogs](http://localhost:3000/blogs) to see all newly generated articles rendered with dates, pagination, tags, and full Markdown tables.
