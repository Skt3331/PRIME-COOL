import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import mysql from "mysql2/promise";
import { fileURLToPath } from "node:url";

export interface Booking {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  serviceType: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "09:00 AM"
  notes?: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  location: string;
  category: "domestic" | "commercial" | "industrial";
  metrics: ProjectMetric[];
  image?: string; // Data URL or upload path
  seoTitle?: string;
  seoDesc?: string;
  seoKeywords?: string;
  createdAt: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string; // Markdown or text
  summary: string;
  image?: string; // Image path
  category?: string;
  author?: string;
  seoTitle?: string;
  seoDesc?: string;
  seoKeywords?: string;
  updatedAt?: string;
  createdAt: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  icon?: string;
  image?: string;
  isPopular: boolean;
  orderIndex: number;
  seoTitle?: string;
  seoDesc?: string;
  seoKeywords?: string;
}

export interface CalculatorMeta {
  id: string;
  slug: string;
  title: string;
  description: string;
  isActive: boolean;
  seoTitle?: string;
  seoDesc?: string;
  seoKeywords?: string;
}

export interface NotificationLog {
  id: string;
  recipient: string;
  type: "email" | "whatsapp";
  status: "sent" | "failed";
  subject?: string;
  message: string;
  sentAt: string;
}

export interface AdminSettings {
  username: string;
  passwordHash: string;
  salt: string;
}

export interface CmsHero {
  title1: string;
  title2: string;
  subtitle: string;
  cta1Text: string;
  cta1Link: string;
  cta2Text: string;
  cta2Link: string;
  backgroundImage?: string;
}

export interface CmsSeoPage {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
}

export interface CmsSeo {
  home: CmsSeoPage;
  booking: CmsSeoPage;
  portfolio: CmsSeoPage;
  resources: CmsSeoPage;
  calculators: CmsSeoPage;
  blogs: CmsSeoPage;
  brands: CmsSeoPage;
  locations: CmsSeoPage;
}

export interface CmsTheme {
  primary: string;
  electric: string;
  background: string;
  logo?: string;
  favicon?: string;
}

export interface CmsServiceItem {
  id: string;
  category: "domestic" | "industrial";
  title: string;
  desc: string;
  image: string;
  icon: string;
  images?: string[];
  results?: string[];
  seoTitle?: string;
  seoDesc?: string;
  seoKeywords?: string;
}

export interface CmsAmcTier {
  name: string;
  audience: string;
  price: string;
  icon: string;
  points: string[];
  featured?: boolean;
}

export interface CmsStat {
  value: string;
  label: string;
}

export interface CmsFaq {
  id: string;
  q: string;
  a: string;
}

export interface CmsWhatsApp {
  enabled: boolean;
  number: string;
  defaultMessage: string;
}

export interface CmsSocials {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  twitter?: string;
  email?: string;
  phone?: string;
}

export interface CmsSmtp {
  enabled: boolean;
  host: string;
  port: number;
  user: string;
  pass: string;
  secure: boolean;
  fromName: string;
  fromEmail: string;
}

export interface CmsSettings {
  hero: CmsHero;
  seo: CmsSeo;
  theme: CmsTheme;
  faqs: CmsFaq[];
  whatsapp: CmsWhatsApp;
  socials: CmsSocials;
  smtp: CmsSmtp;
  stats?: CmsStat[];
  services?: CmsServiceItem[];
  amcTiers?: CmsAmcTier[];
  regions?: string[];
}

export interface LocationReview {
  author: string;
  rating: number;
  text: string;
  role?: string;
}

export interface LocationFaq {
  q: string;
  a: string;
}

export interface LocationDetail {
  slug: string;
  name: string;
  type: string;
  pincodes: string[];
  landmarks: string[];
  nearbyBusinesses: string[];
  reviews: LocationReview[];
  mapEmbedUrl: string;
  faqs: LocationFaq[];
  seoTitle?: string;
  seoDesc?: string;
  seoKeywords?: string;
}

export interface DbSchema {
  bookings: Booking[];
  portfolio: Project[];
  notifications: NotificationLog[];
  visits: number;
  adminSettings: AdminSettings;
  sessions: { [token: string]: { username: string; expiresAt: string } };
  cms: CmsSettings;
  blogs: Blog[];
  services: Service[];
  calculators: CalculatorMeta[];
  locations: LocationDetail[];
}

function getAppRoot(): string {
  try {
    const currentFilePath = fileURLToPath(import.meta.url);
    const currentDir = path.dirname(currentFilePath);

    if (currentDir.includes("dist\\server\\assets") || currentDir.includes("dist/server/assets")) {
      return path.resolve(currentDir, "..", "..", "..");
    } else if (currentDir.includes("dist\\server") || currentDir.includes("dist/server")) {
      return path.resolve(currentDir, "..", "..");
    } else if (currentDir.includes("src\\lib") || currentDir.includes("src/lib")) {
      return path.resolve(currentDir, "..", "..");
    }
  } catch (err) {
    // Ignore URL parse failures and fallback
  }

  const mainScript = process.argv[1];
  if (mainScript && !mainScript.includes("node_modules") && !mainScript.includes("vite")) {
    return path.dirname(mainScript);
  }
  return process.cwd();
}

const DB_DIR = path.resolve(getAppRoot(), "data");
const DB_FILE = path.join(DB_DIR, "db.json");

// Sequential write actions for JSON fallback
class WriteQueue {
  private queue: Promise<void> = Promise.resolve();

  async enqueue<T>(operation: () => Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.queue = this.queue
        .then(async () => {
          try {
            const result = await operation();
            resolve(result);
          } catch (error) {
            reject(error);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

const writeQueue = new WriteQueue();

// Password hashing
function hashPassword(password: string, salt: string): string {
  return crypto
    .createHash("sha256")
    .update(password + salt)
    .digest("hex");
}

function getInitialLocations(): LocationDetail[] {
  return [
    {
      slug: "wagholi",
      name: "Wagholi",
      type: "locality",
      pincodes: ["412207", "411047"],
      landmarks: ["Wagheshwar Temple", "Lexicon International School", "Wagholi Plaza", "BJS College"],
      nearbyBusinesses: ["Decathlon Wagholi", "Soyuz Industrial Tools", "Ganesh Supermarket"],
      reviews: [
        { author: "Aniket Shinde", rating: 5, text: "Excellent split AC gas filling service in Wagholi.", role: "Homeowner" }
      ],
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d3782.2612989435647!2d73.97827827519266!3d18.574635682527878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c3f878f10fb5%3A0x6b4ef82110c73243!2sWagholi%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000",
      faqs: [{ q: "How fast can you dispatch an AC technician in Wagholi?", a: "We provide emergency AC dispatch under 45 minutes." }]
    },
    {
      slug: "hadapsar",
      name: "Hadapsar",
      type: "locality",
      pincodes: ["411028", "411013"],
      landmarks: ["Magarpatta City", "SP Infocity", "Noble Hospital"],
      nearbyBusinesses: ["Accenture SP Infocity", "Amanora Mall"],
      reviews: [{ author: "Vikram Sen", rating: 5, text: "Excellent server room cooling setup.", role: "IT Director" }],
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d3783.5029012435647!2d73.9262!3d18.5089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c1f9d50a2f5f%3A0xe5a3c9e6db3fbc5!2sHadapsar%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000",
      faqs: [{ q: "Do you service VRF/VRV air conditioning systems?", a: "Yes, we offer quarterly preventative descaling." }]
    }
  ];
}

function getInitialData(): DbSchema {
  const salt = crypto.randomBytes(16).toString("hex");
  const passwordHash = hashPassword("admin123", salt);

  return {
    locations: getInitialLocations(),
    services: [
      {
        id: "srv-1",
        title: "Air Conditioning Installation",
        slug: "ac-installation",
        description: "Professional installation of split and central air conditioning systems.",
        category: "domestic",
        icon: "Wind",
        image: "/uploads/services/ac-install.jpg",
        isPopular: true,
        orderIndex: 1,
      },
    ],
    calculators: [
      {
        id: "calc-1",
        slug: "tonnage-calculator",
        title: "AC Tonnage Calculator",
        description: "Calculate the exact AC tonnage required for your room.",
        isActive: true,
      },
      {
        id: "calc-2",
        slug: "electricity-cost",
        title: "Electricity Cost Calculator",
        description: "Estimate your monthly AC electricity bill.",
        isActive: true,
      },
    ],
    bookings: [
      {
        id: "b1",
        customerName: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        phone: "+919876543210",
        serviceType: "Washing Machine Service",
        date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
        timeSlot: "11:00 AM",
        notes: "Drum alignment issues during high-speed spin cycle.",
        status: "confirmed",
        createdAt: new Date().toISOString(),
      },
      {
        id: "b2",
        customerName: "Karan Malhotra",
        email: "karan.m@example.com",
        phone: "+917972253787",
        serviceType: "Air Conditioning Systems",
        date: new Date(Date.now() + 172800000).toISOString().split("T")[0],
        timeSlot: "03:00 PM",
        notes: "General gas pressure check and jet clean for office split AC.",
        status: "pending",
        createdAt: new Date().toISOString(),
      },
    ],
    portfolio: [
      {
        id: "p1",
        location: "Wagholi · Commercial",
        title: "Emergency Deep Freezer Revival",
        summary:
          "A retail grocer's 1,200L commercial deep freezer failed at 11:42 PM. Our on-call engineer arrived within 38 minutes, diagnosed a failed start capacitor and refrigerant leak, sealed the line, recharged R-404A and restored sub-zero hold before opening hours.",
        category: "commercial",
        metrics: [
          { value: "38 min", label: "On-site response" },
          { value: "₹1.8L", label: "Stock loss prevented" },
          { value: "0", label: "Hours of trading lost" },
        ],
        createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
      },
      {
        id: "p2",
        location: "Karegaon MIDC · Industrial",
        title: "Cooling Tower Complete Overhaul",
        summary:
          "Replaced degraded PVC fills, drift eliminators and corroded distribution nozzles on a 350 TR induced-draft cooling tower. Realigned the gearbox, balanced the fan blades and calibrated the make-up water valves — restoring designed approach temperature.",
        category: "industrial",
        metrics: [
          { value: "+22%", label: "Thermal efficiency" },
          { value: "−18%", label: "Power draw" },
          { value: "3 days", label: "Total turnaround" },
        ],
        createdAt: new Date(Date.now() - 15 * 86400000).toISOString(),
      },
      {
        id: "p3",
        location: "Shikrapur · Corporate",
        title: "14-Unit AC Rollout + AMC",
        summary:
          "Designed and installed 14 inverter split ACs across two corporate floors with custom copper runs and concealed drain lines. Onboarded the client to our Commercial Routine AMC with quarterly servicing and a logged diagnostics dashboard.",
        category: "domestic",
        metrics: [
          { value: "14", label: "Units commissioned" },
          { value: "4 yr", label: "AMC contracted" },
          { value: "100%", label: "Genuine OEM parts" },
        ],
        createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
      },
    ],
    blogs: [
      {
        id: "blog-1",
        title: "Daikin vs Hitachi AC: Which is Better for Indian Summers?",
        slug: "daikin-vs-hitachi-ac-which-is-better-for-indian-summers-2025-guide",
        content: `Choosing between Daikin and Hitachi split ACs is one of the most common dilemmas for Indian homeowners. Both brands represent premium engineering, but they serve slightly different operational requirements.

### 1. Cooling Performance
Daikin ACs are known for their rapid cooling technology (Power Chill mode) and robust performance in extreme ambient temperatures (up to 54°C). Hitachi uses a unique Expandable Inverter technology that adjusts compressor speed based on indoor heat load, making it exceptionally good at humidity control.

### 2. Energy Efficiency
Both brands offer high ISEER ratings (typically between 5.0 and 5.4 for 5-star models). Daikin inverter units are slightly more optimized for continuous, low-load running, while Hitachi performs better in heavy heat load variations.

### 3. Reliability and Maintenance
- **Daikin**: Uses high-quality copper tubes and anti-corrosion fins. Spares are easily available along major urban corridors.
- **Hitachi**: Features robust build quality but complex PCB boards. Servicing requires certified diagnostic tools.

At Prime Cool, we service and install both brands along the Wagholi–Shirur route. For high-humidity zones like Pune east, Hitachi is highly recommended, whereas for raw cooling speed, Daikin leads.`,
        summary:
          "An engineering comparison between Daikin and Hitachi split AC systems, looking at cooling curves, compressor tech, and maintenance overheads in India.",
        image: "/uploads/blogs/daikin-vs-hitachi.jpg",
        createdAt: new Date().toISOString(),
      },
      {
        id: "blog-2",
        title: "Top 5 Reasons Your Refrigerator is Not Cooling (and How to Fix It)",
        slug: "top-5-reasons-your-refrigerator-is-not-cooling-and-how-to-fix-it",
        content: `A refrigerator that has stopped cooling can lead to food spoilage. Before calling in an engineer, check these common fault points:

### 1. Degraded Condenser Coils
Coils located at the back or bottom of the fridge dissipate heat. If they are covered in dust or grime, heat exchange drops, causing the compressor to overheat and short-cycle. 
*Fix*: Turn off power and vacuum clean the coils.

### 2. Defective Start Capacitor
The compressor relies on a run/start capacitor to kickstart. If this component fails, you will hear a clicking sound every few minutes, but the compressor will not hum or start.
*Fix*: Needs replacement using a calibrated spare of identical rating.

### 3. Faulty Defrost Timer / Thermostat
If frost builds up on the evaporator coils behind the freezer panel, airflow to the fresh food compartment will block. This is usually caused by a failed defrost heater, bimetal thermostat, or timer.

### 4. Poor Door Gasket Seal
If the magnetic rubber gasket is torn or warped, warm humid air continuously leaks in, causing ice buildup and preventing the interior from reaching the set temperature.

### 5. Low Refrigerant Charge
A gas leak in the capillary or evaporator coil will cause the compressor to run continuously without cooling. This requires locating the leak, sealing it, vacuuming the system, and recharging R-134a or R-600a.

If you are located between Wagholi and Shirur, Prime Cool technicians carry replacement capacitors, gaskets, and gas-charging kits for rapid same-day response.`,
        summary:
          "A practical troubleshooting checklist for homeowners to diagnose refrigerator cooling issues, from dusty coils to capacitor failure.",
        image: "/uploads/blogs/fridge-not-cooling.jpg",
        createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
      },
    ],
    notifications: [
      {
        id: "n1",
        recipient: "+919876543210",
        type: "whatsapp",
        status: "sent",
        message:
          "Hi Rahul Sharma, your booking for Washing Machine Service on tomorrow at 11:00 AM has been CONFIRMED by Prime Cool. Lead engineer Saurav Temgire will contact you shortly.",
        sentAt: new Date().toISOString(),
      },
      {
        id: "n2",
        recipient: "karan.m@example.com",
        type: "email",
        status: "sent",
        subject: "Booking Received — Prime Cool",
        message:
          "Hello Karan Malhotra,\n\nWe have received your booking request for Air Conditioning Systems on day after tomorrow at 03:00 PM. We are currently verifying engineer availability along the Wagholi–Shirur route and will confirm shortly.\n\nThank you for choosing Prime Cool.\nProprietor Saurav Temgire",
        sentAt: new Date().toISOString(),
      },
    ],
    visits: 152,
    adminSettings: {
      username: "admin",
      passwordHash,
      salt,
    },
    sessions: {},
    cms: {
      hero: {
        title1: "Engineered cooling.",
        title2: "Mechanical precision.",
        subtitle:
          "Prime Cool is a premier provider of HVAC, appliance repair, and heavy industrial mechanical solutions — from your home AC to factory-scale cooling towers.",
        cta1Text: "Book a Service",
        cta1Link: "/booking",
        cta2Text: "7507408461",
        cta2Link: "tel:+917507408461",
      },
      seo: {
        home: {
          title: "Prime Cool — HVAC, Appliance & Industrial Mechanical Solutions",
          description:
            "Rapid-response HVAC, refrigeration, washing machine and heavy industrial mechanical service across Pune, Wagholi to Shirur, Karegaon and Ranjangaon.",
          ogTitle: "Prime Cool — Engineered Climate & Mechanical Solutions",
          ogDescription:
            "From split ACs to factory cooling towers — precision engineering, AMCs, and zero-downtime maintenance.",
        },
        booking: {
          title: "Book a Service — Prime Cool Mechanical Solutions",
          description:
            "Schedule rapid-response HVAC, appliance repair, or industrial mechanical servicing in Pune. Check live slot availability and book online.",
          ogTitle: "Book Online — Prime Cool Mechanical Solutions",
          ogDescription:
            "Schedule rapid-response servicing. Select a date, time slot, and service type.",
        },
        portfolio: {
          title: "Previous Works & Case Studies — Prime Cool",
          description:
            "Check out our previous works, client projects, and mechanical engineering case studies across Pune.",
          ogTitle: "Portfolio — Prime Cool",
          ogDescription: "Case studies and maintenance logs from Wagholi–Shirur and MIDC plants.",
        },
        resources: {
          title: "Technical Resources & Guides — Prime Cool",
          description: "Explore our collection of technical guides, engineering resources, and maintenance tips for HVAC and refrigeration.",
          ogTitle: "Resources — Prime Cool",
          ogDescription: "Explore our collection of technical guides and maintenance tips.",
        },
        calculators: {
          title: "HVAC & Electrical Calculators — Prime Cool",
          description: "Free interactive calculators for AC tonnage, subcooling, superheat, and electricity costs.",
          ogTitle: "HVAC Calculators — Prime Cool",
          ogDescription: "Calculate AC tonnage, superheat, subcooling, and more.",
        },
        blogs: {
          title: "Engineering Blog & Updates — Prime Cool",
          description: "Read the latest updates, industry news, and technical deep-dives from the Prime Cool engineering team.",
          ogTitle: "Blog — Prime Cool",
          ogDescription: "Industry news and technical deep-dives.",
        },
        brands: {
          title: "Brands We Service — Prime Cool",
          description: "We repair and service all major HVAC and refrigeration brands including Daikin, Voltas, LG, and Blue Star.",
          ogTitle: "Supported Brands — Prime Cool",
          ogDescription: "Authorized service for all major HVAC/R brands.",
        },
        locations: {
          title: "Service Locations — Prime Cool",
          description: "Find Prime Cool HVAC and refrigeration service centers near you in Pune, Wagholi, Shirur, and surrounding areas.",
          ogTitle: "Locations — Prime Cool",
          ogDescription: "Find a Prime Cool service center near you.",
        },
      },
      theme: {
        primary: "#0ea5e9",
        electric: "#8b5cf6",
        background: "#020617",
      },
      faqs: [
        {
          id: "faq-1",
          q: "How fast can you respond to an emergency call?",
          a: "Within the Wagholi–Shirur corridor we target an on-site response of under 60 minutes for residential calls and under 4 hours for industrial SLAs under our Zero-Downtime AMC. Off-route locations are quoted per site.",
        },
        {
          id: "faq-2",
          q: "What does an Annual Maintenance Contract actually cover?",
          a: "Scheduled preventative visits, jet/dry chemical cleaning, gas pressure verification, electrical safety checks, and a logged diagnostics report after every visit. Industrial tiers add valve and pressure-gauge calibration plus pre-staged spares.",
        },
        {
          id: "faq-3",
          q: "What is your service radius?",
          a: "We operate a dedicated route from Wagholi through Lonikand, Kesnand, Koregaon Bhima, Shikrapur and Shirur, with embedded support at Karegaon and Ranjangaon MIDC. Other parts of Pune are served on request.",
        },
        {
          id: "faq-4",
          q: "Do you provide a warranty on spare parts?",
          a: "Yes. Every genuine OEM spare we install carries the manufacturer warranty (typically 6–24 months depending on the component), backed by our own workmanship guarantee on the labour.",
        },
        {
          id: "faq-5",
          q: "Do you handle both domestic appliances and industrial machinery?",
          a: "Yes. The same team services home ACs, refrigerators and washing machines as well as commercial chillers, cooling towers, industrial valves and capacitor banks — the difference is the scale of equipment and the spares we carry on the visit.",
        },
      ],
      whatsapp: {
        enabled: true,
        number: "+917507408461",
        defaultMessage: "Hi Prime Cool, I need assistance with...",
      },
      socials: {
        facebook: "https://facebook.com/primecool",
        instagram: "https://instagram.com/primecool",
        linkedin: "https://linkedin.com/company/primecool",
        youtube: "https://youtube.com/primecool",
        twitter: "https://twitter.com/primecool",
        email: "support@primecool.in",
        phone: "+917507408461",
      },
      smtp: {
        enabled: false,
        host: "smtp.hostinger.com",
        port: 465,
        user: "booking@primecool.in",
        pass: "",
        secure: true,
        fromName: "Prime Cool Booking System",
        fromEmail: "booking@primecool.in",
      },
    },
  };
}

// ---------------- MySQL Driver Connection ----------------

let sqlPool: mysql.Pool | null = null;
let isMySQLActive = false;
let hasAttemptedConnection = false;

export async function getMySQLPool(): Promise<mysql.Pool | null> {
  if (sqlPool) return sqlPool;
  if (hasAttemptedConnection) return null;

  hasAttemptedConnection = true;
  try {
    const envPath = path.resolve(getAppRoot(), ".env");
    const envContent = await fs.readFile(envPath, "utf-8");
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
  } catch (e) {
    // Fallback if .env is missing or unreadable
  }

  const host = process.env.DB_HOST;
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const database = process.env.DB_DATABASE;
  const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306;

  if (host && user && database) {
    try {
      console.log(
        `Connecting to MySQL at host: "${host}" (port: ${port}, user: "${user}", database: "${database}")...`,
      );
      sqlPool = mysql.createPool({
        host,
        port,
        user,
        password,
        database,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });

      // Test connection
      const conn = await sqlPool.getConnection();
      conn.release();
      isMySQLActive = true;
      console.log("Successfully connected to MySQL database!");

      // Auto initialize tables
      await initializeMySQLTables(sqlPool);
      return sqlPool;
    } catch (err) {
      console.error("MySQL Connection Error, using local JSON fallback:", err);
      isMySQLActive = false;
      sqlPool = null;
    }
  }
  return null;
}

async function initializeMySQLTables(p: mysql.Pool) {
  // 1. visits table
  await p.query(`
    CREATE TABLE IF NOT EXISTS visits (
      id INT PRIMARY KEY AUTO_INCREMENT,
      count INT DEFAULT 152
    )
  `);
  const [visitsRows]: any = await p.query("SELECT COUNT(*) as cnt FROM visits");
  if (visitsRows[0].cnt === 0) {
    await p.query("INSERT INTO visits (count) VALUES (152)");
  }

  // 2. admin_settings
  await p.query(`
    CREATE TABLE IF NOT EXISTS admin_settings (
      username VARCHAR(255) PRIMARY KEY,
      passwordHash VARCHAR(255) NOT NULL,
      salt VARCHAR(255) NOT NULL
    )
  `);
  const [adminRows]: any = await p.query("SELECT COUNT(*) as cnt FROM admin_settings");
  if (adminRows[0].cnt === 0) {
    const initial = getInitialData();
    await p.query("INSERT INTO admin_settings (username, passwordHash, salt) VALUES (?, ?, ?)", [
      initial.adminSettings.username,
      initial.adminSettings.passwordHash,
      initial.adminSettings.salt,
    ]);
  }

  // 3. sessions
  await p.query(`
    CREATE TABLE IF NOT EXISTS sessions (
      token VARCHAR(255) PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      expiresAt VARCHAR(50) NOT NULL
    )
  `);

  // 4. bookings
  await p.query(`
    CREATE TABLE IF NOT EXISTS bookings (
      id VARCHAR(50) PRIMARY KEY,
      customerName VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      serviceType VARCHAR(255) NOT NULL,
      date VARCHAR(20) NOT NULL,
      timeSlot VARCHAR(20) NOT NULL,
      notes TEXT,
      status VARCHAR(50) NOT NULL,
      createdAt VARCHAR(50) NOT NULL
    )
  `);

  // 5. portfolio
  await p.query(`
    CREATE TABLE IF NOT EXISTS portfolio (
      id VARCHAR(50) PRIMARY KEY,
      location VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      summary TEXT NOT NULL,
      category VARCHAR(50) NOT NULL,
      metrics_json TEXT NOT NULL,
      image LONGTEXT,
      createdAt VARCHAR(50) NOT NULL
    )
  `);
  const [portfolioRows]: any = await p.query("SELECT COUNT(*) as cnt FROM portfolio");
  if (portfolioRows[0].cnt === 0) {
    const initial = getInitialData();
    for (const item of initial.portfolio) {
      await p.query(
        "INSERT INTO portfolio (id, location, title, summary, category, metrics_json, image, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          item.id,
          item.location,
          item.title,
          item.summary,
          item.category,
          JSON.stringify(item.metrics),
          item.image || null,
          item.createdAt,
        ],
      );
    }
  }

  // 6. notifications
  await p.query(`
    CREATE TABLE IF NOT EXISTS notifications (
      id VARCHAR(50) PRIMARY KEY,
      recipient VARCHAR(255) NOT NULL,
      type VARCHAR(50) NOT NULL,
      status VARCHAR(50) NOT NULL,
      subject VARCHAR(255),
      message TEXT NOT NULL,
      sentAt VARCHAR(50) NOT NULL
    )
  `);

  // 7. cms_settings
  await p.query(`
    CREATE TABLE IF NOT EXISTS cms_settings (
      id INT PRIMARY KEY AUTO_INCREMENT,
      settings_json LONGTEXT NOT NULL
    )
  `);
  const [cmsRows]: any = await p.query("SELECT COUNT(*) as cnt FROM cms_settings");
  if (cmsRows[0].cnt === 0) {
    const initial = getInitialData();
    await p.query("INSERT INTO cms_settings (id, settings_json) VALUES (1, ?)", [
      JSON.stringify(initial.cms),
    ]);
  }

  // 8. blogs
  await p.query(`
    CREATE TABLE IF NOT EXISTS blogs (
      id VARCHAR(50) PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL,
      content LONGTEXT NOT NULL,
      summary TEXT NOT NULL,
      image LONGTEXT,
      category VARCHAR(100),
      author VARCHAR(255),
      seoTitle VARCHAR(500),
      seoDesc TEXT,
      updatedAt VARCHAR(50),
      createdAt VARCHAR(50) NOT NULL
    )
  `);
  // Migrate existing blogs table if columns are missing
  try {
    const [blogCols]: any = await p.query("SHOW COLUMNS FROM blogs");
    const colNames = blogCols.map((c: any) => c.Field);
    if (!colNames.includes("category"))
      await p.query("ALTER TABLE blogs ADD COLUMN category VARCHAR(100) DEFAULT NULL");
    if (!colNames.includes("author"))
      await p.query("ALTER TABLE blogs ADD COLUMN author VARCHAR(255) DEFAULT NULL");
    if (!colNames.includes("seoTitle"))
      await p.query("ALTER TABLE blogs ADD COLUMN seoTitle VARCHAR(500) DEFAULT NULL");
    if (!colNames.includes("seoDesc"))
      await p.query("ALTER TABLE blogs ADD COLUMN seoDesc TEXT DEFAULT NULL");
    if (!colNames.includes("updatedAt"))
      await p.query("ALTER TABLE blogs ADD COLUMN updatedAt VARCHAR(50) DEFAULT NULL");
  } catch (migrateErr) {
    console.warn("Blog column migration warning:", migrateErr);
  }
  const [blogsRows]: any = await p.query("SELECT COUNT(*) as cnt FROM blogs");
  if (blogsRows[0].cnt === 0) {
    const initial = getInitialData();
    for (const blog of initial.blogs) {
      await p.query(
        "INSERT INTO blogs (id, title, slug, content, summary, image, category, author, seoTitle, seoDesc, updatedAt, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          blog.id,
          blog.title,
          blog.slug,
          blog.content,
          blog.summary,
          blog.image || null,
          (blog as any).category || null,
          (blog as any).author || null,
          (blog as any).seoTitle || null,
          (blog as any).seoDesc || null,
          (blog as any).updatedAt || null,
          blog.createdAt,
        ],
      );
    }
  }
  // 9. services
  await p.query(`
    CREATE TABLE IF NOT EXISTS services (
      id VARCHAR(50) PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      category VARCHAR(100) NOT NULL,
      icon VARCHAR(255),
      image LONGTEXT,
      isPopular BOOLEAN DEFAULT false,
      orderIndex INT DEFAULT 0,
      seoTitle VARCHAR(500),
      seoDesc TEXT,
      seoKeywords TEXT
    )
  `);
  // Migrate existing services table if columns are missing
  try {
    const [srvCols]: any = await p.query("SHOW COLUMNS FROM services");
    const colNames = srvCols.map((c: any) => c.Field);
    if (!colNames.includes("seoTitle"))
      await p.query("ALTER TABLE services ADD COLUMN seoTitle VARCHAR(500) DEFAULT NULL");
    if (!colNames.includes("seoDesc"))
      await p.query("ALTER TABLE services ADD COLUMN seoDesc TEXT DEFAULT NULL");
    if (!colNames.includes("seoKeywords"))
      await p.query("ALTER TABLE services ADD COLUMN seoKeywords TEXT DEFAULT NULL");
  } catch (migrateErr) {
    console.warn("Services column migration warning:", migrateErr);
  }

  const [servicesRows]: any = await p.query("SELECT COUNT(*) as cnt FROM services");
  if (servicesRows[0].cnt === 0) {
    const initial = getInitialData();
    for (const srv of initial.services) {
      await p.query(
        "INSERT INTO services (id, title, slug, description, category, icon, image, isPopular, orderIndex) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          srv.id,
          srv.title,
          srv.slug,
          srv.description,
          srv.category,
          srv.icon || null,
          srv.image || null,
          srv.isPopular,
          srv.orderIndex,
        ],
      );
    }
  }

  // 10. calculators
  await p.query(`
    CREATE TABLE IF NOT EXISTS calculators (
      id VARCHAR(50) PRIMARY KEY,
      slug VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      isActive BOOLEAN DEFAULT true,
      seoTitle VARCHAR(500),
      seoDesc TEXT,
      seoKeywords TEXT
    )
  `);
  // Migrate existing calculators table if columns are missing
  try {
    const [calcCols]: any = await p.query("SHOW COLUMNS FROM calculators");
    const colNames = calcCols.map((c: any) => c.Field);
    if (!colNames.includes("seoTitle"))
      await p.query("ALTER TABLE calculators ADD COLUMN seoTitle VARCHAR(500) DEFAULT NULL");
    if (!colNames.includes("seoDesc"))
      await p.query("ALTER TABLE calculators ADD COLUMN seoDesc TEXT DEFAULT NULL");
    if (!colNames.includes("seoKeywords"))
      await p.query("ALTER TABLE calculators ADD COLUMN seoKeywords TEXT DEFAULT NULL");
  } catch (migrateErr) {
    console.warn("Calculators column migration warning:", migrateErr);
  }

  const [calcRows]: any = await p.query("SELECT COUNT(*) as cnt FROM calculators");
  if (calcRows[0].cnt === 0) {
    const initial = getInitialData();
    for (const calc of initial.calculators) {
      await p.query(
        "INSERT INTO calculators (id, slug, title, description, isActive) VALUES (?, ?, ?, ?, ?)",
        [calc.id, calc.slug, calc.title, calc.description, calc.isActive],
      );
    }
  }

  // 11. locations
  await p.query(`
    CREATE TABLE IF NOT EXISTS locations (
      slug VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      type VARCHAR(50) NOT NULL,
      pincodes_json TEXT NOT NULL,
      landmarks_json TEXT NOT NULL,
      nearbyBusinesses_json TEXT NOT NULL,
      reviews_json LONGTEXT NOT NULL,
      mapEmbedUrl TEXT,
      faqs_json LONGTEXT NOT NULL,
      seoTitle VARCHAR(500),
      seoDesc TEXT,
      seoKeywords TEXT
    )
  `);
  // Migrate existing locations table if columns are missing
  try {
    const [locCols]: any = await p.query("SHOW COLUMNS FROM locations");
    const colNames = locCols.map((c: any) => c.Field);
    if (!colNames.includes("seoTitle"))
      await p.query("ALTER TABLE locations ADD COLUMN seoTitle VARCHAR(500) DEFAULT NULL");
    if (!colNames.includes("seoDesc"))
      await p.query("ALTER TABLE locations ADD COLUMN seoDesc TEXT DEFAULT NULL");
    if (!colNames.includes("seoKeywords"))
      await p.query("ALTER TABLE locations ADD COLUMN seoKeywords TEXT DEFAULT NULL");
  } catch (migrateErr) {
    console.warn("Locations column migration warning:", migrateErr);
  }
  const [locationsRows]: any = await p.query("SELECT COUNT(*) as cnt FROM locations");
  if (locationsRows[0].cnt === 0) {
    let seeded = false;
    try {
      const dbPath = path.join(DB_DIR, "db.json");
      const dataStr = await fs.readFile(dbPath, "utf-8");
      const dbObj = JSON.parse(dataStr);
      if (dbObj && dbObj.locations && dbObj.locations.length > 0) {
        console.log(`Seeding ${dbObj.locations.length} locations from db.json into MySQL...`);
        for (const loc of dbObj.locations) {
          await p.query(
            "INSERT IGNORE INTO locations (slug, name, type, pincodes_json, landmarks_json, nearbyBusinesses_json, reviews_json, mapEmbedUrl, faqs_json, seoTitle, seoDesc, seoKeywords) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
              loc.slug,
              loc.name,
              loc.type,
              JSON.stringify(loc.pincodes),
              JSON.stringify(loc.landmarks),
              JSON.stringify(loc.nearbyBusinesses),
              JSON.stringify(loc.reviews),
              loc.mapEmbedUrl || "",
              JSON.stringify(loc.faqs),
              loc.seoTitle || null,
              loc.seoDesc || null,
              loc.seoKeywords || null,
            ]
          );
        }
        seeded = true;
        console.log("Locations successfully seeded from db.json!");
      }
    } catch (e) {
      console.warn("Could not seed locations from db.json, using defaults:", e);
    }

    if (!seeded) {
      const initial = getInitialData();
      for (const loc of initial.locations) {
        await p.query(
          "INSERT INTO locations (slug, name, type, pincodes_json, landmarks_json, nearbyBusinesses_json, reviews_json, mapEmbedUrl, faqs_json, seoTitle, seoDesc, seoKeywords) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            loc.slug,
            loc.name,
            loc.type,
            JSON.stringify(loc.pincodes),
            JSON.stringify(loc.landmarks),
            JSON.stringify(loc.nearbyBusinesses),
            JSON.stringify(loc.reviews),
            loc.mapEmbedUrl || "",
            JSON.stringify(loc.faqs),
            loc.seoTitle || null,
            loc.seoDesc || null,
            loc.seoKeywords || null,
          ]
        );
      }
    }
  }
}

// ---------------- JSON Local Fallback Helpers ----------------

export async function readDb(): Promise<DbSchema> {
  try {
    await fs.mkdir(DB_DIR, { recursive: true });
    try {
      const dataStr = await fs.readFile(DB_FILE, "utf-8");
      const db = JSON.parse(dataStr) as DbSchema;
      const initial = getInitialData();
      let updated = false;

      if (!db.cms) {
        db.cms = initial.cms;
        updated = true;
      } else {
        const cmsKeys: (keyof CmsSettings)[] = [
          "hero",
          "seo",
          "theme",
          "faqs",
          "whatsapp",
          "socials",
          "smtp",
        ];
        for (const key of cmsKeys) {
          if (db.cms[key] === undefined) {
            db.cms[key] = initial.cms[key] as any;
            updated = true;
          }
        }
      }

      if (!db.blogs) {
        db.blogs = initial.blogs;
        updated = true;
      }

      if (!db.services) {
        db.services = initial.services;
        updated = true;
      }

      if (!db.calculators) {
        db.calculators = initial.calculators;
        updated = true;
      }

      if (!db.locations) {
        db.locations = initial.locations;
        updated = true;
      }

      if (updated) {
        await fs.writeFile(DB_FILE, JSON.stringify(db, null, 2), "utf-8");
      }
      return db;
    } catch (e: any) {
      if (e.code === "ENOENT") {
        const initial = getInitialData();
        await fs.writeFile(DB_FILE, JSON.stringify(initial, null, 2), "utf-8");
        return initial;
      }
      throw e;
    }
  } catch (error) {
    console.error("Failed to read database:", error);
    return getInitialData();
  }
}

export async function writeDb(data: DbSchema): Promise<void> {
  await writeQueue.enqueue(async () => {
    await fs.mkdir(DB_DIR, { recursive: true });
    await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  });
}

// ---------------- Database Logic Resolvers ----------------

export async function getBookings(): Promise<Booking[]> {
  const p = await getMySQLPool();
  if (p && isMySQLActive) {
    try {
      const [rows]: any = await p.query("SELECT * FROM bookings ORDER BY createdAt DESC");
      return rows;
    } catch (err) {
      console.error("MySQL query failed in getBookings, falling back:", err);
    }
  }
  const db = await readDb();
  return db.bookings.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function addBooking(
  booking: Omit<Booking, "id" | "createdAt" | "status">,
): Promise<Booking> {
  const newBooking: Booking = {
    ...booking,
    id: `b-${crypto.randomBytes(4).toString("hex")}`,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  const p = await getMySQLPool();
  if (p && isMySQLActive) {
    try {
      await p.query(
        "INSERT INTO bookings (id, customerName, email, phone, serviceType, date, timeSlot, notes, status, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          newBooking.id,
          newBooking.customerName,
          newBooking.email,
          newBooking.phone,
          newBooking.serviceType,
          newBooking.date,
          newBooking.timeSlot,
          newBooking.notes || null,
          newBooking.status,
          newBooking.createdAt,
        ],
      );
      return newBooking;
    } catch (err) {
      console.error("MySQL query failed in addBooking, falling back:", err);
    }
  }

  const db = await readDb();
  db.bookings.push(newBooking);
  await writeDb(db);
  return newBooking;
}

export async function updateBookingStatus(
  id: string,
  status: Booking["status"],
): Promise<Booking | null> {
  const p = await getMySQLPool();
  if (p && isMySQLActive) {
    try {
      await p.query("UPDATE bookings SET status = ? WHERE id = ?", [status, id]);
      const [rows]: any = await p.query("SELECT * FROM bookings WHERE id = ?", [id]);
      if (rows.length > 0) return rows[0];
      return null;
    } catch (err) {
      console.error("MySQL query failed in updateBookingStatus, falling back:", err);
    }
  }

  const db = await readDb();
  const idx = db.bookings.findIndex((b) => b.id === id);
  if (idx === -1) return null;
  db.bookings[idx].status = status;
  await writeDb(db);
  return db.bookings[idx];
}

export async function deleteBooking(id: string): Promise<boolean> {
  const p = await getMySQLPool();
  if (p && isMySQLActive) {
    try {
      const [res]: any = await p.query("DELETE FROM bookings WHERE id = ?", [id]);
      return res.affectedRows > 0;
    } catch (err) {
      console.error("MySQL query failed in deleteBooking, falling back:", err);
    }
  }

  const db = await readDb();
  const originalLength = db.bookings.length;
  db.bookings = db.bookings.filter((b) => b.id !== id);
  if (db.bookings.length === originalLength) return false;
  await writeDb(db);
  return true;
}

export async function getProjects(): Promise<Project[]> {
  const p = await getMySQLPool();
  if (p && isMySQLActive) {
    try {
      const [rows]: any = await p.query("SELECT * FROM portfolio ORDER BY createdAt DESC");
      return rows.map((r: any) => ({
        ...r,
        metrics: JSON.parse(r.metrics_json),
      }));
    } catch (err) {
      console.error("MySQL query failed in getProjects, falling back:", err);
    }
  }

  const db = await readDb();
  return db.portfolio.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function addProject(project: Omit<Project, "id" | "createdAt">): Promise<Project> {
  const newProject: Project = {
    ...project,
    id: `p-${crypto.randomBytes(4).toString("hex")}`,
    createdAt: new Date().toISOString(),
  };

  const p = await getMySQLPool();
  if (p && isMySQLActive) {
    try {
      await p.query(
        "INSERT INTO portfolio (id, location, title, summary, category, metrics_json, image, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          newProject.id,
          newProject.location,
          newProject.title,
          newProject.summary,
          newProject.category,
          JSON.stringify(newProject.metrics),
          newProject.image || null,
          newProject.createdAt,
        ],
      );
      return newProject;
    } catch (err) {
      console.error("MySQL query failed in addProject, falling back:", err);
    }
  }

  const db = await readDb();
  db.portfolio.push(newProject);
  await writeDb(db);
  return newProject;
}

export async function updateProject(
  id: string,
  project: Partial<Omit<Project, "id" | "createdAt">>,
): Promise<Project | null> {
  const p = await getMySQLPool();
  if (p && isMySQLActive) {
    try {
      const updateFields: string[] = [];
      const values: any[] = [];

      if (project.title !== undefined) {
        updateFields.push("title = ?");
        values.push(project.title);
      }
      if (project.location !== undefined) {
        updateFields.push("location = ?");
        values.push(project.location);
      }
      if (project.summary !== undefined) {
        updateFields.push("summary = ?");
        values.push(project.summary);
      }
      if (project.category !== undefined) {
        updateFields.push("category = ?");
        values.push(project.category);
      }
      if (project.metrics !== undefined) {
        updateFields.push("metrics_json = ?");
        values.push(JSON.stringify(project.metrics));
      }
      if (project.image !== undefined) {
        updateFields.push("image = ?");
        values.push(project.image);
      }

      if (updateFields.length > 0) {
        values.push(id);
        await p.query(`UPDATE portfolio SET ${updateFields.join(", ")} WHERE id = ?`, values);
      }

      const [rows]: any = await p.query("SELECT * FROM portfolio WHERE id = ?", [id]);
      if (rows.length > 0) {
        return {
          ...rows[0],
          metrics: JSON.parse(rows[0].metrics_json),
        };
      }
      return null;
    } catch (err) {
      console.error("MySQL query failed in updateProject, falling back:", err);
    }
  }

  const db = await readDb();
  const idx = db.portfolio.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  db.portfolio[idx] = { ...db.portfolio[idx], ...project };
  await writeDb(db);
  return db.portfolio[idx];
}

export async function deleteProject(id: string): Promise<boolean> {
  const p = await getMySQLPool();
  if (p && isMySQLActive) {
    try {
      const [res]: any = await p.query("DELETE FROM portfolio WHERE id = ?", [id]);
      return res.affectedRows > 0;
    } catch (err) {
      console.error("MySQL query failed in deleteProject, falling back:", err);
    }
  }

  const db = await readDb();
  const originalLength = db.portfolio.length;
  db.portfolio = db.portfolio.filter((p) => p.id !== id);
  if (db.portfolio.length === originalLength) return false;
  await writeDb(db);
  return true;
}

export async function getNotifications(): Promise<NotificationLog[]> {
  const p = await getMySQLPool();
  if (p && isMySQLActive) {
    try {
      const [rows]: any = await p.query("SELECT * FROM notifications ORDER BY sentAt DESC");
      return rows;
    } catch (err) {
      console.error("MySQL query failed in getNotifications, falling back:", err);
    }
  }

  const db = await readDb();
  return db.notifications.sort(
    (a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime(),
  );
}

export async function addNotification(
  log: Omit<NotificationLog, "id" | "sentAt">,
): Promise<NotificationLog> {
  const newLog: NotificationLog = {
    ...log,
    id: `n-${crypto.randomBytes(4).toString("hex")}`,
    sentAt: new Date().toISOString(),
  };

  const p = await getMySQLPool();
  if (p && isMySQLActive) {
    try {
      await p.query(
        "INSERT INTO notifications (id, recipient, type, status, subject, message, sentAt) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          newLog.id,
          newLog.recipient,
          newLog.type,
          newLog.status,
          newLog.subject || null,
          newLog.message,
          newLog.sentAt,
        ],
      );
      return newLog;
    } catch (err) {
      console.error("MySQL query failed in addNotification, falling back:", err);
    }
  }

  const db = await readDb();
  db.notifications.push(newLog);
  await writeDb(db);
  return newLog;
}

export async function incrementVisits(): Promise<number> {
  const p = await getMySQLPool();
  if (p && isMySQLActive) {
    try {
      await p.query("UPDATE visits SET count = count + 1");
      const [rows]: any = await p.query("SELECT count FROM visits LIMIT 1");
      return rows[0].count;
    } catch (err) {
      console.error("MySQL query failed in incrementVisits, falling back:", err);
    }
  }

  const db = await readDb();
  db.visits += 1;
  await writeDb(db);
  return db.visits;
}

export async function getVisits(): Promise<number> {
  const p = await getMySQLPool();
  if (p && isMySQLActive) {
    try {
      const [rows]: any = await p.query("SELECT count FROM visits LIMIT 1");
      return rows[0].count;
    } catch (err) {
      console.error("MySQL query failed in getVisits, falling back:", err);
    }
  }

  const db = await readDb();
  return db.visits;
}

export async function getAdminSettings(): Promise<AdminSettings> {
  const p = await getMySQLPool();
  if (p && isMySQLActive) {
    try {
      const [rows]: any = await p.query("SELECT * FROM admin_settings LIMIT 1");
      if (rows.length > 0) return rows[0];
    } catch (err) {
      console.error("MySQL query failed in getAdminSettings, falling back:", err);
    }
  }

  const db = await readDb();
  return db.adminSettings;
}

export async function updateAdminSettings(username: string, newPassword?: string): Promise<void> {
  let salt = "";
  let passwordHash = "";

  if (newPassword) {
    salt = crypto.randomBytes(16).toString("hex");
    passwordHash = hashPassword(newPassword, salt);
  }

  const p = await getMySQLPool();
  if (p && isMySQLActive) {
    try {
      if (newPassword) {
        await p.query("UPDATE admin_settings SET username = ?, passwordHash = ?, salt = ?", [
          username,
          passwordHash,
          salt,
        ]);
      } else {
        await p.query("UPDATE admin_settings SET username = ?", [username]);
      }
      return;
    } catch (err) {
      console.error("MySQL query failed in updateAdminSettings, falling back:", err);
    }
  }

  const db = await readDb();
  db.adminSettings.username = username;
  if (newPassword) {
    db.adminSettings.salt = salt;
    db.adminSettings.passwordHash = passwordHash;
  }
  await writeDb(db);
}

// Session Helpers
export async function createSession(token: string, username: string): Promise<void> {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(); // 7 days

  const p = await getMySQLPool();
  if (p && isMySQLActive) {
    try {
      await p.query("INSERT INTO sessions (token, username, expiresAt) VALUES (?, ?, ?)", [
        token,
        username,
        expiresAt,
      ]);
      return;
    } catch (err) {
      console.error("MySQL query failed in createSession, falling back:", err);
    }
  }

  const db = await readDb();
  db.sessions[token] = { username, expiresAt };
  await writeDb(db);
}

export async function validateSession(token: string): Promise<string | null> {
  const p = await getMySQLPool();
  if (p && isMySQLActive) {
    try {
      const [rows]: any = await p.query(
        "SELECT username, expiresAt FROM sessions WHERE token = ?",
        [token],
      );
      if (rows.length === 0) return null;
      const session = rows[0];
      if (new Date(session.expiresAt).getTime() < Date.now()) {
        await p.query("DELETE FROM sessions WHERE token = ?", [token]);
        return null;
      }
      return session.username;
    } catch (err) {
      console.error("MySQL query failed in validateSession, falling back:", err);
    }
  }

  const db = await readDb();
  const session = db.sessions[token];
  if (!session) return null;

  if (new Date(session.expiresAt).getTime() < Date.now()) {
    delete db.sessions[token];
    await writeDb(db);
    return null;
  }

  return session.username;
}

export async function deleteSession(token: string): Promise<void> {
  const p = await getMySQLPool();
  if (p && isMySQLActive) {
    try {
      await p.query("DELETE FROM sessions WHERE token = ?", [token]);
      return;
    } catch (err) {
      console.error("MySQL query failed in deleteSession, falling back:", err);
    }
  }

  const db = await readDb();
  delete db.sessions[token];
  await writeDb(db);
}

// CMS Helpers
export async function getCmsSettings(): Promise<CmsSettings> {
  const p = await getMySQLPool();
  if (p && isMySQLActive) {
    try {
      const [rows]: any = await p.query("SELECT settings_json FROM cms_settings WHERE id = 1");
      if (rows.length > 0) return JSON.parse(rows[0].settings_json);
    } catch (err) {
      console.error("MySQL query failed in getCmsSettings, falling back:", err);
    }
  }

  const db = await readDb();
  return db.cms;
}

export async function updateCmsSettings(settings: CmsSettings): Promise<void> {
  const p = await getMySQLPool();
  if (p && isMySQLActive) {
    try {
      await p.query("UPDATE cms_settings SET settings_json = ? WHERE id = 1", [
        JSON.stringify(settings),
      ]);
      return;
    } catch (err) {
      console.error("MySQL query failed in updateCmsSettings, falling back:", err);
    }
  }

  const db = await readDb();
  db.cms = settings;
  await writeDb(db);
}

export async function getFaqs(): Promise<CmsFaq[]> {
  const settings = await getCmsSettings();
  return settings.faqs;
}

export async function addFaq(faq: Omit<CmsFaq, "id">): Promise<CmsFaq> {
  const newFaq = { ...faq, id: `faq-${crypto.randomBytes(4).toString("hex")}` };

  const settings = await getCmsSettings();
  settings.faqs.push(newFaq);
  await updateCmsSettings(settings);
  return newFaq;
}

export async function updateFaq(
  id: string,
  faq: Partial<Omit<CmsFaq, "id">>,
): Promise<CmsFaq | null> {
  const settings = await getCmsSettings();
  const idx = settings.faqs.findIndex((f) => f.id === id);
  if (idx === -1) return null;
  settings.faqs[idx] = { ...settings.faqs[idx], ...faq };
  await updateCmsSettings(settings);
  return settings.faqs[idx];
}

export async function deleteFaq(id: string): Promise<boolean> {
  const settings = await getCmsSettings();
  const initialLength = settings.faqs.length;
  settings.faqs = settings.faqs.filter((f) => f.id !== id);
  if (settings.faqs.length === initialLength) return false;
  await updateCmsSettings(settings);
  return true;
}

// ---------------- Blogs API Helper Methods ----------------

export async function getBlogs(): Promise<Blog[]> {
  const p = await getMySQLPool();
  if (p && isMySQLActive) {
    try {
      const [rows]: any = await p.query("SELECT * FROM blogs ORDER BY createdAt DESC");
      return rows.map((r: any) => ({
        id: r.id,
        title: r.title,
        slug: r.slug,
        content: r.content,
        summary: r.summary,
        image: r.image || undefined,
        category: r.category || undefined,
        author: r.author || undefined,
        seoTitle: r.seoTitle || undefined,
        seoDesc: r.seoDesc || undefined,
        updatedAt: r.updatedAt || undefined,
        createdAt: r.createdAt,
      }));
    } catch (err) {
      console.error("MySQL query failed in getBlogs, falling back:", err);
    }
  }

  const db = await readDb();
  return db.blogs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function addBlog(blog: Omit<Blog, "id" | "createdAt">): Promise<Blog> {
  const newBlog: Blog = {
    ...blog,
    id: `blog-${crypto.randomBytes(4).toString("hex")}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const p = await getMySQLPool();
  if (p && isMySQLActive) {
    try {
      await p.query(
        "INSERT INTO blogs (id, title, slug, content, summary, image, category, author, seoTitle, seoDesc, updatedAt, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          newBlog.id,
          newBlog.title,
          newBlog.slug,
          newBlog.content,
          newBlog.summary,
          newBlog.image || null,
          newBlog.category || null,
          newBlog.author || null,
          newBlog.seoTitle || null,
          newBlog.seoDesc || null,
          newBlog.updatedAt || null,
          newBlog.createdAt,
        ],
      );
      return newBlog;
    } catch (err) {
      console.error("MySQL query failed in addBlog, falling back:", err);
    }
  }

  const db = await readDb();
  db.blogs.push(newBlog);
  await writeDb(db);
  return newBlog;
}

export async function updateBlog(
  id: string,
  blog: Partial<Omit<Blog, "id" | "createdAt">>,
): Promise<Blog | null> {
  const p = await getMySQLPool();
  if (p && isMySQLActive) {
    try {
      const updateFields: string[] = [];
      const values: any[] = [];

      if (blog.title !== undefined) {
        updateFields.push("title = ?");
        values.push(blog.title);
      }
      if (blog.slug !== undefined) {
        updateFields.push("slug = ?");
        values.push(blog.slug);
      }
      if (blog.content !== undefined) {
        updateFields.push("content = ?");
        values.push(blog.content);
      }
      if (blog.summary !== undefined) {
        updateFields.push("summary = ?");
        values.push(blog.summary);
      }
      if (blog.image !== undefined) {
        updateFields.push("image = ?");
        values.push(blog.image);
      }
      if (blog.category !== undefined) {
        updateFields.push("category = ?");
        values.push(blog.category);
      }
      if (blog.author !== undefined) {
        updateFields.push("author = ?");
        values.push(blog.author);
      }
      if (blog.seoTitle !== undefined) {
        updateFields.push("seoTitle = ?");
        values.push(blog.seoTitle);
      }
      if (blog.seoDesc !== undefined) {
        updateFields.push("seoDesc = ?");
        values.push(blog.seoDesc);
      }
      updateFields.push("updatedAt = ?");
      values.push(new Date().toISOString());

      if (updateFields.length > 0) {
        values.push(id);
        await p.query(`UPDATE blogs SET ${updateFields.join(", ")} WHERE id = ?`, values);
      }

      const [rows]: any = await p.query("SELECT * FROM blogs WHERE id = ?", [id]);
      if (rows.length > 0) {
        const r = rows[0];
        return {
          id: r.id,
          title: r.title,
          slug: r.slug,
          content: r.content,
          summary: r.summary,
          image: r.image || undefined,
          category: r.category || undefined,
          author: r.author || undefined,
          seoTitle: r.seoTitle || undefined,
          seoDesc: r.seoDesc || undefined,
          updatedAt: r.updatedAt || undefined,
          createdAt: r.createdAt,
        };
      }
      return null;
    } catch (err) {
      console.error("MySQL query failed in updateBlog, falling back:", err);
    }
  }

  const db = await readDb();
  const idx = db.blogs.findIndex((b) => b.id === id);
  if (idx === -1) return null;
  db.blogs[idx] = { ...db.blogs[idx], ...blog };
  await writeDb(db);
  return db.blogs[idx];
}

export async function deleteBlog(id: string): Promise<boolean> {
  const p = await getMySQLPool();
  if (p && isMySQLActive) {
    try {
      const [res]: any = await p.query("DELETE FROM blogs WHERE id = ?", [id]);
      return res.affectedRows > 0;
    } catch (err) {
      console.error("MySQL query failed in deleteBlog, falling back:", err);
    }
  }

  const db = await readDb();
  const originalLength = db.blogs.length;
  db.blogs = db.blogs.filter((b) => b.id !== id);
  if (db.blogs.length === originalLength) return false;
  await writeDb(db);
  return true;
}

export async function getDbStatus(): Promise<{
  type: "MySQL" | "JSON Fallback";
  connected: boolean;
  host: string;
  database: string;
}> {
  await getMySQLPool();
  return {
    type: isMySQLActive ? "MySQL" : "JSON Fallback",
    connected: isMySQLActive,
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_DATABASE || "",
  };
}

// ---------------- Services API Helper Methods ----------------

export async function getServices(): Promise<Service[]> {
  const p = await getMySQLPool();
  if (p && isMySQLActive) {
    try {
      const [rows]: any = await p.query("SELECT * FROM services ORDER BY orderIndex ASC");
      return rows.map((r: any) => ({
        id: r.id,
        title: r.title,
        slug: r.slug,
        description: r.description,
        category: r.category,
        icon: r.icon || undefined,
        image: r.image || undefined,
        isPopular: !!r.isPopular,
        orderIndex: r.orderIndex,
        seoTitle: r.seoTitle || undefined,
        seoDesc: r.seoDesc || undefined,
        seoKeywords: r.seoKeywords || undefined,
      }));
    } catch (err) {
      console.error("MySQL query failed in getServices, falling back:", err);
    }
  }

  const db = await readDb();
  return db.services.sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));
}

export async function addService(service: Omit<Service, "id">): Promise<Service> {
  const newService: Service = {
    ...service,
    id: `srv-${crypto.randomBytes(4).toString("hex")}`,
  };

  const p = await getMySQLPool();
  if (p && isMySQLActive) {
    try {
      await p.query(
        "INSERT INTO services (id, title, slug, description, category, icon, image, isPopular, orderIndex, seoTitle, seoDesc, seoKeywords) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          newService.id,
          newService.title,
          newService.slug,
          newService.description,
          newService.category,
          newService.icon || null,
          newService.image || null,
          newService.isPopular,
          newService.orderIndex,
          newService.seoTitle || null,
          newService.seoDesc || null,
          newService.seoKeywords || null,
        ],
      );
      return newService;
    } catch (err) {
      console.error("MySQL query failed in addService, falling back:", err);
    }
  }

  const db = await readDb();
  db.services.push(newService);
  await writeDb(db);
  return newService;
}

export async function updateService(
  id: string,
  service: Partial<Omit<Service, "id">>,
): Promise<Service | null> {
  const p = await getMySQLPool();
  if (p && isMySQLActive) {
    try {
      const updateFields: string[] = [];
      const values: any[] = [];

      if (service.title !== undefined) {
        updateFields.push("title = ?");
        values.push(service.title);
      }
      if (service.slug !== undefined) {
        updateFields.push("slug = ?");
        values.push(service.slug);
      }
      if (service.description !== undefined) {
        updateFields.push("description = ?");
        values.push(service.description);
      }
      if (service.category !== undefined) {
        updateFields.push("category = ?");
        values.push(service.category);
      }
      if (service.icon !== undefined) {
        updateFields.push("icon = ?");
        values.push(service.icon);
      }
      if (service.image !== undefined) {
        updateFields.push("image = ?");
        values.push(service.image);
      }
      if (service.isPopular !== undefined) {
        updateFields.push("isPopular = ?");
        values.push(service.isPopular);
      }
      if (service.orderIndex !== undefined) {
        updateFields.push("orderIndex = ?");
        values.push(service.orderIndex);
      }
      if (service.seoTitle !== undefined) {
        updateFields.push("seoTitle = ?");
        values.push(service.seoTitle);
      }
      if (service.seoDesc !== undefined) {
        updateFields.push("seoDesc = ?");
        values.push(service.seoDesc);
      }
      if (service.seoKeywords !== undefined) {
        updateFields.push("seoKeywords = ?");
        values.push(service.seoKeywords);
      }

      if (updateFields.length > 0) {
        values.push(id);
        await p.query(`UPDATE services SET ${updateFields.join(", ")} WHERE id = ?`, values);
      }

      const [rows]: any = await p.query("SELECT * FROM services WHERE id = ?", [id]);
      if (rows.length > 0) {
        const r = rows[0];
        return {
          id: r.id,
          title: r.title,
          slug: r.slug,
          description: r.description,
          category: r.category,
          icon: r.icon || undefined,
          image: r.image || undefined,
          isPopular: !!r.isPopular,
          orderIndex: r.orderIndex,
          seoTitle: r.seoTitle || undefined,
          seoDesc: r.seoDesc || undefined,
          seoKeywords: r.seoKeywords || undefined,
        };
      }
      return null;
    } catch (err) {
      console.error("MySQL query failed in updateService, falling back:", err);
    }
  }

  const db = await readDb();
  const idx = db.services.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  db.services[idx] = { ...db.services[idx], ...service };
  await writeDb(db);
  return db.services[idx];
}

export async function deleteService(id: string): Promise<boolean> {
  const p = await getMySQLPool();
  if (p && isMySQLActive) {
    try {
      const [res]: any = await p.query("DELETE FROM services WHERE id = ?", [id]);
      return res.affectedRows > 0;
    } catch (err) {
      console.error("MySQL query failed in deleteService, falling back:", err);
    }
  }

  const db = await readDb();
  const originalLength = db.services.length;
  db.services = db.services.filter((s) => s.id !== id);
  if (db.services.length === originalLength) return false;
  await writeDb(db);
  return true;
}

// ---------------- Calculators API Helper Methods ----------------

export async function getCalculators(): Promise<CalculatorMeta[]> {
  const p = await getMySQLPool();
  if (p && isMySQLActive) {
    try {
      const [rows]: any = await p.query("SELECT * FROM calculators");
      return rows.map((r: any) => ({
        id: r.id,
        slug: r.slug,
        title: r.title,
        description: r.description,
        isActive: !!r.isActive,
        seoTitle: r.seoTitle || undefined,
        seoDesc: r.seoDesc || undefined,
        seoKeywords: r.seoKeywords || undefined,
      }));
    } catch (err) {
      console.error("MySQL query failed in getCalculators, falling back:", err);
    }
  }

  const db = await readDb();
  return db.calculators;
}

export async function updateCalculator(
  id: string,
  calc: Partial<Omit<CalculatorMeta, "id">>,
): Promise<CalculatorMeta | null> {
  const p = await getMySQLPool();
  if (p && isMySQLActive) {
    try {
      const updateFields: string[] = [];
      const values: any[] = [];

      if (calc.title !== undefined) {
        updateFields.push("title = ?");
        values.push(calc.title);
      }
      if (calc.slug !== undefined) {
        updateFields.push("slug = ?");
        values.push(calc.slug);
      }
      if (calc.description !== undefined) {
        updateFields.push("description = ?");
        values.push(calc.description);
      }
      if (calc.isActive !== undefined) {
        updateFields.push("isActive = ?");
        values.push(calc.isActive);
      }
      if (calc.seoTitle !== undefined) {
        updateFields.push("seoTitle = ?");
        values.push(calc.seoTitle);
      }
      if (calc.seoDesc !== undefined) {
        updateFields.push("seoDesc = ?");
        values.push(calc.seoDesc);
      }
      if (calc.seoKeywords !== undefined) {
        updateFields.push("seoKeywords = ?");
        values.push(calc.seoKeywords);
      }

      if (updateFields.length > 0) {
        values.push(id);
        await p.query(`UPDATE calculators SET ${updateFields.join(", ")} WHERE id = ?`, values);
      }

      const [rows]: any = await p.query("SELECT * FROM calculators WHERE id = ?", [id]);
      if (rows.length > 0) {
        const r = rows[0];
        return {
          id: r.id,
          slug: r.slug,
          title: r.title,
          description: r.description,
          isActive: !!r.isActive,
          seoTitle: r.seoTitle || undefined,
          seoDesc: r.seoDesc || undefined,
          seoKeywords: r.seoKeywords || undefined,
        };
      }
      return null;
    } catch (err) {
      console.error("MySQL query failed in updateCalculator, falling back:", err);
    }
  }

  const db = await readDb();
  const idx = db.calculators.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  db.calculators[idx] = { ...db.calculators[idx], ...calc };
  await writeDb(db);
  return db.calculators[idx];
}

// ---------------- Locations API Helper Methods ----------------

export async function getLocations(): Promise<LocationDetail[]> {
  const p = await getMySQLPool();
  if (p && isMySQLActive) {
    try {
      const [rows]: any = await p.query("SELECT * FROM locations");
      return rows.map((r: any) => ({
        slug: r.slug,
        name: r.name,
        type: r.type,
        pincodes: JSON.parse(r.pincodes_json),
        landmarks: JSON.parse(r.landmarks_json),
        nearbyBusinesses: JSON.parse(r.nearbyBusinesses_json),
        reviews: JSON.parse(r.reviews_json),
        mapEmbedUrl: r.mapEmbedUrl || "",
        faqs: JSON.parse(r.faqs_json),
        seoTitle: r.seoTitle || undefined,
        seoDesc: r.seoDesc || undefined,
        seoKeywords: r.seoKeywords || undefined,
      }));
    } catch (err) {
      console.error("MySQL query failed in getLocations, falling back:", err);
    }
  }

  const db = await readDb();
  return db.locations || [];
}

export async function addLocation(location: LocationDetail): Promise<LocationDetail> {
  const p = await getMySQLPool();
  if (p && isMySQLActive) {
    try {
      await p.query(
        "INSERT INTO locations (slug, name, type, pincodes_json, landmarks_json, nearbyBusinesses_json, reviews_json, mapEmbedUrl, faqs_json, seoTitle, seoDesc, seoKeywords) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          location.slug,
          location.name,
          location.type,
          JSON.stringify(location.pincodes),
          JSON.stringify(location.landmarks),
          JSON.stringify(location.nearbyBusinesses),
          JSON.stringify(location.reviews),
          location.mapEmbedUrl || "",
          JSON.stringify(location.faqs),
          location.seoTitle || null,
          location.seoDesc || null,
          location.seoKeywords || null,
        ]
      );
      return location;
    } catch (err) {
      console.error("MySQL query failed in addLocation, falling back:", err);
    }
  }

  const db = await readDb();
  if (!db.locations) db.locations = [];
  db.locations.push(location);
  await writeDb(db);
  return location;
}

export async function updateLocation(
  slug: string,
  location: Partial<LocationDetail>,
): Promise<LocationDetail | null> {
  const p = await getMySQLPool();
  if (p && isMySQLActive) {
    try {
      const updateFields: string[] = [];
      const values: any[] = [];

      if (location.name !== undefined) {
        updateFields.push("name = ?");
        values.push(location.name);
      }
      if (location.type !== undefined) {
        updateFields.push("type = ?");
        values.push(location.type);
      }
      if (location.pincodes !== undefined) {
        updateFields.push("pincodes_json = ?");
        values.push(JSON.stringify(location.pincodes));
      }
      if (location.landmarks !== undefined) {
        updateFields.push("landmarks_json = ?");
        values.push(JSON.stringify(location.landmarks));
      }
      if (location.nearbyBusinesses !== undefined) {
        updateFields.push("nearbyBusinesses_json = ?");
        values.push(JSON.stringify(location.nearbyBusinesses));
      }
      if (location.reviews !== undefined) {
        updateFields.push("reviews_json = ?");
        values.push(JSON.stringify(location.reviews));
      }
      if (location.mapEmbedUrl !== undefined) {
        updateFields.push("mapEmbedUrl = ?");
        values.push(location.mapEmbedUrl);
      }
      if (location.faqs !== undefined) {
        updateFields.push("faqs_json = ?");
        values.push(JSON.stringify(location.faqs));
      }
      if (location.seoTitle !== undefined) {
        updateFields.push("seoTitle = ?");
        values.push(location.seoTitle);
      }
      if (location.seoDesc !== undefined) {
        updateFields.push("seoDesc = ?");
        values.push(location.seoDesc);
      }
      if (location.seoKeywords !== undefined) {
        updateFields.push("seoKeywords = ?");
        values.push(location.seoKeywords);
      }

      if (updateFields.length > 0) {
        values.push(slug);
        await p.query(`UPDATE locations SET ${updateFields.join(", ")} WHERE slug = ?`, values);
      }

      const [rows]: any = await p.query("SELECT * FROM locations WHERE slug = ?", [slug]);
      if (rows.length > 0) {
        const r = rows[0];
        return {
          slug: r.slug,
          name: r.name,
          type: r.type,
          pincodes: JSON.parse(r.pincodes_json),
          landmarks: JSON.parse(r.landmarks_json),
          nearbyBusinesses: JSON.parse(r.nearbyBusinesses_json),
          reviews: JSON.parse(r.reviews_json),
          mapEmbedUrl: r.mapEmbedUrl || "",
          faqs: JSON.parse(r.faqs_json),
          seoTitle: r.seoTitle || undefined,
          seoDesc: r.seoDesc || undefined,
          seoKeywords: r.seoKeywords || undefined,
        };
      }
      return null;
    } catch (err) {
      console.error("MySQL query failed in updateLocation, falling back:", err);
    }
  }

  const db = await readDb();
  const idx = db.locations?.findIndex((c) => c.slug === slug);
  if (idx === undefined || idx === -1) return null;
  db.locations[idx] = { ...db.locations[idx], ...location };
  await writeDb(db);
  return db.locations[idx];
}

export async function deleteLocation(slug: string): Promise<boolean> {
  const p = await getMySQLPool();
  if (p && isMySQLActive) {
    try {
      const [res]: any = await p.query("DELETE FROM locations WHERE slug = ?", [slug]);
      return res.affectedRows > 0;
    } catch (err) {
      console.error("MySQL query failed in deleteLocation, falling back:", err);
    }
  }

  const db = await readDb();
  if (!db.locations) return false;
  const originalLength = db.locations.length;
  db.locations = db.locations.filter((s) => s.slug !== slug);
  if (db.locations.length === originalLength) return false;
  await writeDb(db);
  return true;
}
