import { createFileRoute, Link } from "@tanstack/react-router";
import logo from "../../assets/logo.webp";
import { getCmsSettings } from "../../lib/api";
import {
  ArrowLeft,
  Phone,
  MapPin,
  ClipboardCheck,
  User,
  CheckCircle,
  Save,
  PenTool,
  Edit3,
  Thermometer,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/portal/technician")({
  loader: async () => {
    const { settings } = await getCmsSettings();
    return { cms: settings };
  },
  head: () => ({
    meta: [{ title: "Technician Dispatch Workspace — Prime Cool" }],
  }),
  component: TechnicianPortal,
});

function TechnicianPortal() {
  const { cms } = Route.useLoaderData();
  const socials = cms?.socials || {};
  const phone = socials.phone || "+917507408461";

  // Dispatch jobs list
  const [jobs, setJobs] = useState<any[]>([
    {
      id: "PC-98327",
      client: "Rahul Sharma",
      loc: "Wagholi, Pune",
      service: "AC Maintenance & Leak Check",
      status: "Dispatched",
      date: "Today, 11:00 AM",
    },
    {
      id: "PC-98328",
      client: "LG India Plant",
      loc: "Ranjangaon MIDC",
      service: "Chiller Tower Fill Replacements",
      status: "Pending",
      date: "Today, 2:30 PM",
    },
    {
      id: "PC-98329",
      client: "Fiat Automobiles",
      loc: "Karegaon",
      service: "Process Cooling Loop Bleed",
      status: "Pending",
      date: "Tomorrow, 9:00 AM",
    },
  ]);

  const [selectedJobId, setSelectedJobId] = useState("PC-98327");
  const activeJob = jobs.find((j) => j.id === selectedJobId) || jobs[0];

  // Refrigerant Logging state
  const [gasType, setGasType] = useState("R32");
  const [gasQty, setGasQty] = useState(1.2); // kg
  const [cylTare, setCylTare] = useState(6.5); // kg

  // Invoice Calculator state
  const [sparesCost, setSparesCost] = useState(850);
  const [hours, setHours] = useState(2);
  const [rate, setRate] = useState(300); // per hour

  // Inventory Checklist state
  const [sparesInventory, setSparesInventory] = useState([
    { name: "Dual run capacitor 45+5 uF", qty: 8 },
    { name: "IPM Inverter Driver Board", qty: 2 },
    { name: "Dixell XR02CX Digital Thermostat", qty: 4 },
    { name: "EEV Coil Assembly (Panasonic/Daikin)", qty: 3 },
  ]);

  // Signature canvas settings
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Clear Canvas
  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#020617"; // bg Slate 950
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  // Initialize Canvas background
  useEffect(() => {
    clearSignature();
  }, []);

  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>,
  ) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineWidth = 2.5;
        ctx.lineCap = "round";
        ctx.strokeStyle = "#06b6d4"; // primary Cyan 500

        let clientX = 0;
        let clientY = 0;

        if ("touches" in e) {
          clientX = e.touches[0].clientX;
          clientY = e.touches[0].clientY;
        } else {
          clientX = e.clientX;
          clientY = e.clientY;
        }

        const rect = canvas.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        ctx.beginPath();
        ctx.moveTo(x, y);
        setIsDrawing(true);
      }
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        let clientX = 0;
        let clientY = 0;

        if ("touches" in e) {
          clientX = e.touches[0].clientX;
          clientY = e.touches[0].clientY;
        } else {
          clientX = e.clientX;
          clientY = e.clientY;
        }

        const rect = canvas.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        ctx.lineTo(x, y);
        ctx.stroke();
      }
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // Update Active Job Status
  const updateJobStatus = (newStatus: string) => {
    setJobs(jobs.map((j) => (j.id === selectedJobId ? { ...j, status: newStatus } : j)));
    toast.success(`Job ${selectedJobId} status updated to: ${newStatus}`);
  };

  // Save gas charge
  const saveRefrigerantLog = () => {
    toast.success(`Logged ${gasQty}kg of ${gasType} charged into unit. Cylinder Tare updated.`);
  };

  // Save invoice and signoff
  const handleSignoffAndInvoice = () => {
    toast.success(
      `Job ${selectedJobId} signoff completed! Invoice generated for ₹${sparesCost + hours * rate}.`,
    );
    updateJobStatus("Completed");
    clearSignature();
  };

  return (
    <div className="min-h-screen text-foreground flex flex-col justify-between bg-slate-950">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,color-mix(in_oklab,var(--electric)_8%,transparent),transparent_60%)] pointer-events-none" />

      {/* Main container */}
      <main className="flex-1 pt-6 md:pt-8 pb-20 px-6 max-w-7xl mx-auto w-full relative z-10 grid lg:grid-cols-12 gap-8">
        {/* Left Column: Job Selector & Job Management */}
        <div className="lg:col-span-8 space-y-8">
          {/* Active Job Profile */}
          <div className="border border-border/80 bg-slate-900/40 backdrop-blur-md p-6 rounded-2xl space-y-6 shadow-xl">
            {/* Top dropdown */}
            <div className="flex flex-wrap justify-between items-center gap-4 border-b border-border/40 pb-4">
              <div>
                <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1">
                  Active Dispatch Selector
                </label>
                <select
                  value={selectedJobId}
                  onChange={(e) => setSelectedJobId(e.target.value)}
                  className="block w-48 rounded-lg border border-border bg-slate-950 px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                >
                  {jobs.map((j) => (
                    <option key={j.id} value={j.id}>
                      {j.id} - {j.client}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status triggers */}
              <div className="flex flex-wrap gap-2">
                {["Dispatched", "In Progress", "Completed"].map((st) => (
                  <button
                    key={st}
                    onClick={() => updateJobStatus(st)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition ${
                      activeJob.status === st
                        ? "bg-primary/20 border-primary text-primary"
                        : "border-border hover:bg-card text-muted-foreground"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Active profile description */}
            <div className="grid md:grid-cols-2 gap-6 text-xs leading-relaxed">
              <div className="space-y-3">
                <div className="space-y-1">
                  <span className="text-muted-foreground font-mono">Client Name</span>
                  <div className="font-semibold text-white flex items-center gap-1.5 text-sm">
                    <User className="h-4 w-4 text-primary" />
                    <span>{activeJob.client}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-muted-foreground font-mono">Service Address</span>
                  <div className="font-semibold text-white flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-primary shrink-0" />
                    <span>{activeJob.loc}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="space-y-1">
                  <span className="text-muted-foreground font-mono">Request Scope</span>
                  <div className="font-semibold text-white">{activeJob.service}</div>
                </div>
                <div className="space-y-1">
                  <span className="text-muted-foreground font-mono">Scheduled Window</span>
                  <div className="font-semibold text-white">{activeJob.date}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Service Log: Refrigerant usage & Invoice generation */}
          <div className="border border-border/80 bg-slate-900/40 backdrop-blur-md p-6 rounded-2xl space-y-6 shadow-xl grid md:grid-cols-2 gap-6 items-start">
            {/* Refrigerant Logging */}
            <div className="space-y-4">
              <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-primary" />
                <span>Refrigerant Logging</span>
              </h3>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase text-muted-foreground">
                  Gas Type
                </label>
                <select
                  value={gasType}
                  onChange={(e) => setGasType(e.target.value)}
                  className="w-full rounded-lg border border-border bg-slate-950 px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="R32">R-32 (HFC)</option>
                  <option value="R410A">R-410A (HFC)</option>
                  <option value="R404A">R-404A (HFC)</option>
                  <option value="R22">R-22 (HCFC)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-muted-foreground">
                    Charge Qty (kg)
                  </label>
                  <input
                    type="number"
                    step={0.1}
                    value={gasQty}
                    onChange={(e) => setGasQty(parseFloat(e.target.value) || 0)}
                    className="w-full rounded-lg border border-border bg-slate-950 px-3 py-1.5 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-muted-foreground">
                    Cylinder Tare (kg)
                  </label>
                  <input
                    type="number"
                    step={0.1}
                    value={cylTare}
                    onChange={(e) => setCylTare(parseFloat(e.target.value) || 0)}
                    className="w-full rounded-lg border border-border bg-slate-950 px-3 py-1.5 focus:outline-none"
                  />
                </div>
              </div>

              <button
                onClick={saveRefrigerantLog}
                className="w-full py-2 rounded-lg bg-primary/20 border border-primary text-primary font-semibold text-xs hover:bg-primary hover:text-primary-foreground transition cursor-pointer"
              >
                Log Refrigerant Charge
              </button>
            </div>

            {/* On-Site Invoice Estimator */}
            <div className="space-y-4 border-t md:border-t-0 md:border-l border-border/40 md:pl-6 pt-6 md:pt-0">
              <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5 text-primary" />
                <span>On-Site Invoice Calculator</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-muted-foreground">
                    Spare Parts Cost (₹)
                  </label>
                  <input
                    type="number"
                    value={sparesCost}
                    onChange={(e) => setSparesCost(parseInt(e.target.value) || 0)}
                    className="w-full rounded-lg border border-border bg-slate-950 px-3 py-1.5 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-muted-foreground">
                      Labor Hours
                    </label>
                    <input
                      type="number"
                      value={hours}
                      onChange={(e) => setHours(parseInt(e.target.value) || 0)}
                      className="w-full rounded-lg border border-border bg-slate-950 px-3 py-1.5 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-muted-foreground">
                      Hourly Rate (₹)
                    </label>
                    <input
                      type="number"
                      value={rate}
                      onChange={(e) => setRate(parseInt(e.target.value) || 0)}
                      className="w-full rounded-lg border border-border bg-slate-950 px-3 py-1.5 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-border/40 flex justify-between font-bold text-sm text-gradient">
                  <span>Total Bill Amount:</span>
                  <span>₹{sparesCost + hours * rate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Signature Signoff & Inventory */}
        <div className="lg:col-span-4 space-y-8">
          {/* Section: Customer Sign-off Canvas */}
          <div className="border border-border/80 bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl space-y-4 shadow-xl">
            <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
              <PenTool className="h-5 w-5 text-primary" />
              <span>Digital Client Sign-off</span>
            </h3>
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              Have the client sign inside the box below to authorize job completion and confirm
              invoice receipt.
            </p>

            {/* Canvas Signature Pad */}
            <div className="border border-border rounded-xl overflow-hidden bg-slate-950 relative">
              <canvas
                ref={canvasRef}
                width={300}
                height={150}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="w-full h-[150px] cursor-crosshair touch-none"
              />
              <button
                onClick={clearSignature}
                className="absolute bottom-2 right-2 px-2 py-1 rounded bg-slate-900/80 hover:bg-slate-800 text-[10px] font-mono text-muted-foreground border border-border/60"
              >
                Clear
              </button>
            </div>

            <button
              onClick={handleSignoffAndInvoice}
              className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs hover:opacity-95 transition inline-flex justify-center items-center gap-1.5 shadow-lg shadow-primary/20 cursor-pointer"
            >
              <CheckCircle className="h-4 w-4" />
              <span>Sign-off & Submit Job</span>
            </button>
          </div>

          {/* Section: Truck Spares Inventory */}
          <div className="border border-border/80 bg-slate-900/40 backdrop-blur-md p-6 rounded-2xl space-y-4 shadow-xl">
            <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
              <Edit3 className="h-4 w-4 text-primary" />
              <span>Truck Spares Stock</span>
            </h3>

            <div className="space-y-3 text-xs">
              {sparesInventory.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center border-b border-border/40 pb-2"
                >
                  <span className="text-muted-foreground">{item.name}</span>
                  <div className="flex items-center gap-2 font-mono">
                    <button
                      onClick={() =>
                        setSparesInventory(
                          sparesInventory.map((iv, i) =>
                            i === idx ? { ...iv, qty: Math.max(0, iv.qty - 1) } : iv,
                          ),
                        )
                      }
                      className="px-1.5 py-0.5 rounded bg-slate-800 border border-border/60 hover:bg-slate-700 font-bold"
                    >
                      −
                    </button>
                    <span className="w-5 text-center font-bold text-white">{item.qty}</span>
                    <button
                      onClick={() =>
                        setSparesInventory(
                          sparesInventory.map((iv, i) =>
                            i === idx ? { ...iv, qty: iv.qty + 1 } : iv,
                          ),
                        )
                      }
                      className="px-1.5 py-0.5 rounded bg-slate-800 border border-border/60 hover:bg-slate-700 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/80 py-8 text-center text-xs text-muted-foreground bg-slate-950/80 z-10 relative">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div>© {new Date().getFullYear()} Prime Cool — Technician Workspace</div>
          <div className="flex gap-4">
            <Link to="/" className="hover:text-primary transition">
              Home
            </Link>
            <Link to="/resources" className="hover:text-primary transition">
              Resources
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
