# Prime Cool — Engineered climate & Mechanical Solutions

A high-performance, dark-themed responsive web application built for **Prime Cool**, a premier provider of HVAC, domestic/commercial refrigeration, washing machine servicing, and heavy industrial mechanical solutions across Pune (Wagholi–Shirur corridor, Karegaon, and Ranjangaon MIDCs).

Built on top of **TanStack Start (Vite + React 19 + Vinxi)**, this codebase utilizes type-safe file-based routing, client-side React Query caching, secure RPC Server Functions, and a sequential thread-safe local JSON database.

---

## 🔐 Administrative Credentials

Access the Control Panel at `/admin` (auto-redirects from `/admin` to `/admin/login` if not authenticated).

* **Default Username**: `admin`
* **Default Password**: `admin123`

*Note: Credentials can be updated directly from the Security Settings card inside the Admin Dashboard.*

---

## 🚀 Key Features & Workings

### 1. File-Based Routing (`@tanstack/react-router`)
* Implements client-side routing without full page reloads using the `<Link>` component.
* Routes:
  * `/` : Dynamic landing page showcasing services, catalog, coverage, testimonials, and latest case studies.
  * `/booking` : Client appointment scheduling desk.
  * `/portfolio` : Case study filter and previous works viewer.
  * `/admin` : Secure Control Panel (redirects to `/admin/login` if unauthenticated).

### 2. Live Calendar Booking System
* Fully interactive date picker powered by Shadcn `<Calendar>` and `react-day-picker`.
* **Dynamic Time Slots**: Selects standard slots (`09:00 AM`, `11:00 AM`, `01:00 PM`, `03:00 PM`, `05:00 PM`). Requests live database states using React Query when the calendar date changes, disabling occupied slots to prevent double-booking.
* **Double-Booking Verification**: Handles absolute validation checks on the server function side, returning descriptive errors if race conditions occur.

### 3. Automated Notification Logs
* Upon registration of a booking, the server generates simulated **WhatsApp (SMS)** and **Email** confirmation templates tailored to the client.
* Delivery logs are stored in the database and appear in real-time in the admin console.
* Displays a smartphone frame mockup on booking completion, rendering the formatted WhatsApp message.

### 4. Admin Management Dashboard
* **High-Level Metrics**: Live counters showing Total Site Visits, Total Bookings, Confirmed, and Pending requests.
* **Appointment Queue**: List of bookings with quick actions to "Confirm Booking" (triggers WhatsApp confirmation log), "Cancel/Refuse" (triggers Email cancellation log), or "Delete Record".
* **Credential Manager**: Secure inputs to change administrative credentials.

### 5. Dynamic Portfolio CRUD
* **Portfolio Manager**: Form inside the admin panel to publish new case studies (Title, Location, Category, Description, up to 3 Metric pairs).
* **Local Image Uploads**: Form processes files on the client via `FileReader` into Base64 strings. The server-side RPC function decodes and saves the buffer to `./public/uploads/portfolio/` before storing the URL path.
* **Filter Layouts**: Dynamic filtering tabs (*All*, *Domestic*, *Commercial*, *Industrial*) on `/portfolio` loading database rows automatically.

---

## 🏗️ Architecture & Server Function Isolation

To meet Vite and Vinxi's client environment packaging constraints, server-side imports are strictly decoupled from route entrypoints:

```
[Client Routes (src/routes/*)] 
       │
       ▼ (Client imports safe RPC hooks)
[RPC Handlers (src/lib/api.ts & auth.ts)] 
       │
       ▼ (Server-only handler compilation)
[Server Helpers (src/lib/api-helpers.server.ts & auth-helpers.server.ts)]
       │
       ▼ (Local File System operations)
[Local JSON Database (src/lib/db.ts)] <───> [data/db.json]
```

* **RPC Endpoint Files (`src/lib/api.ts` & `auth.ts`)**: Declare `createServerFn` builders and Zod validator schemas. Handlers delegate to server-only helpers. The compiler strips these handler function bodies in browser bundles.
* **Server Helper Files (`*.server.ts`)**: Hold server-side imports like `getRequest` (from `@tanstack/react-start/server`), `node:fs`, `node:path`, and `node:crypto`. These files are never bundled on the client.
* **JSON Database (`src/lib/db.ts`)**: Manages reading and writing to `./data/db.json`. Employs a **Sequential Write Queue** class to queue database writes to prevent race conditions during concurrent server requests.

---

## 📂 File Directory Map

```
prime-cool-mech-wiz-main/
├── data/
│   └── db.json                    # Local database (Bookings, Portfolio, Session keys, Visits)
├── public/
│   └── uploads/portfolio/         # Published portfolio image uploads
└── src/
    ├── assets/                    # Static image/logo resources
    ├── components/
    │   └── ui/                    # Shadcn UI primitives (Button, Calendar, Input, etc.)
    ├── lib/
    │   ├── api-helpers.server.ts  # Upload handlers, bookings verification, mock alerts
    │   ├── api.ts                 # client-safe createServerFn APIs with Zod validators
    │   ├── auth-helpers.server.ts # SHA-256 hash, request cookie parsing, database sessions
    │   ├── auth.ts                # client-safe login, logout, checkSession RPCs
    │   ├── db.ts                  # Sequential writing JSON DB wrapper & seed records
    │   ├── error-capture.ts       # SSR diagnostics capture
    │   ├── error-page.ts          # SSR fallback error pages
    │   ├── lovable-error-reporting.ts # Client logs dispatch
    │   └── utils.ts               # cn tailwind merge helper
    ├── routes/
    │   ├── __root.tsx             # Main layout, toaster portal, session visit trackers
    │   ├── index.tsx              # Public home page
    │   ├── booking.tsx            # Booking slot selector & WhatsApp confirmation
    │   ├── portfolio.tsx          # Dynamic public works filter board
    │   ├── admin.tsx              # Dashboard framework (Loader security validations)
    │   └── admin/
    │       ├── index.tsx          # Dashboard statistics, queues, and logs
    │       ├── login.tsx          # Secure glassmorphic portal login
    │       └── portfolio.tsx      # Portfolio publishing CRUD panel
    ├── router.tsx                 # TanStack Router instance generator
    ├── server.ts                  # SSG/SSR nitro entrywrapper
    ├── start.ts                   # Client start entrypoints
    └── styles.css                 # Tailwind CSS v4 custom variants & keyframe animations
```

---

## 💻 Setup & Development

### 1. Prerequisites
Ensure you have **Node.js (v18+)** installed.

### 2. Run Development Server
Launches the server with hot-reload and TanStack Router auto-generation:
```bash
npm run dev
```
The application will run locally at `http://localhost:8080/`.

### 3. Check Types
To verify there are no TypeScript issues:
```bash
npx tsc --noEmit
```

### 4. Build Production Bundle
Generates optimized static chunks for both client-side and server-side SSR deployments:
```bash
npm run build
```
The output is compiled to the `./dist/` directory.
