import { createFileRoute, Link } from "@tanstack/react-router";
import logo from "../../assets/logo.webp";
import { getCmsSettings } from "../../lib/api";
import {
  ArrowLeft,
  Phone,
  Calendar,
  ClipboardList,
  Download,
  CreditCard,
  RefreshCw,
  PlusCircle,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/portal/customer")({
  loader: async () => {
    const { settings } = await getCmsSettings();
    return { cms: settings };
  },
  head: () => ({
    meta: [{ title: "Customer Portal — Prime Cool Mechanical Solutions" }],
  }),
  component: CustomerPortal,
});

function CustomerPortal() {
  const { cms } = Route.useLoaderData();
  const socials = cms?.socials || {};
  const phone = socials.phone || "+917507408461";

  // Mock states
  const [activeJobStep, setActiveJobStep] = useState(2); // 1 = Received, 2 = Dispatched, 3 = In Progress, 4 = Completed
  const [registeredWarranties, setRegisteredWarranties] = useState<any[]>([
    { brand: "Daikin", model: "FTKF50TV16U", serial: "DK837492A", registeredOn: "2026-04-10" },
  ]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [payingFor, setPayingFor] = useState("");

  // Form states
  const [newBrand, setNewBrand] = useState("");
  const [newModel, setNewModel] = useState("");
  const [newSerial, setNewSerial] = useState("");

  const handleRegisterWarranty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBrand || !newModel || !newSerial) {
      toast.error("Please fill all warranty registration fields");
      return;
    }
    const newEntry = {
      brand: newBrand,
      model: newModel,
      serial: newSerial,
      registeredOn: new Date().toISOString().split("T")[0],
    };
    setRegisteredWarranties([...registeredWarranties, newEntry]);
    setNewBrand("");
    setNewModel("");
    setNewSerial("");
    toast.success("Appliance warranty registered successfully!");
  };

  const triggerPayment = (name: string) => {
    setPayingFor(name);
    setShowPaymentModal(true);
  };

  const handleCompletePayment = () => {
    setShowPaymentModal(false);
    toast.success(
      `Payment of ₹${payingFor === "AMC" ? "3,999" : "1,499"} completed successfully via Razorpay Simulator!`,
    );
  };

  return (
    <div className="min-h-screen text-foreground flex flex-col justify-between bg-slate-950">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,color-mix(in_oklab,var(--primary)_8%,transparent),transparent_60%)] pointer-events-none" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-950/60 border-b border-border/80">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={logo} alt="Prime Cool logo" className="h-9 w-9" />
            <span className="font-display font-bold text-lg tracking-tight">
              Prime <span className="text-gradient">Cool</span>
            </span>
          </Link>
          <span className="text-xs font-mono uppercase bg-primary/10 border border-primary/20 text-primary px-3 py-1 rounded-full">
            Client Workspace
          </span>
          <Link
            to="/"
            className="text-sm font-medium hover:text-primary transition flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Home</span>
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 pt-24 pb-20 px-6 max-w-7xl mx-auto w-full relative z-10 grid lg:grid-cols-12 gap-8">
        {/* Left Column: Tracking & Warranties */}
        <div className="lg:col-span-8 space-y-8">
          {/* Section: Live Job Status Tracker */}
          <div className="border border-border/80 bg-slate-900/40 backdrop-blur-md p-6 rounded-2xl space-y-6 shadow-xl">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-primary" />
                  <span>Live Job Tracking</span>
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Job ID: PC-98327 · AC Maintenance & Leak Rectification
                </p>
              </div>
              <span className="text-xs font-mono bg-amber-400/10 border border-amber-400/20 text-amber-400 px-2 py-0.5 rounded">
                TECHNICIAN EN-ROUTE
              </span>
            </div>

            {/* Stepper Visual */}
            <div className="relative flex justify-between items-center py-4">
              <div className="absolute left-0 right-0 h-0.5 bg-slate-800 pointer-events-none" />
              <div
                className="absolute left-0 h-0.5 bg-primary pointer-events-none transition-all duration-500"
                style={{ width: `${((activeJobStep - 1) / 3) * 100}%` }}
              />

              {[
                { step: 1, label: "Booking Received" },
                { step: 2, label: "Tech Dispatched" },
                { step: 3, label: "Diagnosis Active" },
                { step: 4, label: "Job Completed" },
              ].map((s) => (
                <div key={s.step} className="relative z-10 flex flex-col items-center gap-1.5">
                  <div
                    onClick={() => setActiveJobStep(s.step)} // Interactive for demonstration!
                    className={`h-7 w-7 rounded-full border-2 flex items-center justify-center font-bold text-xs cursor-pointer transition ${
                      activeJobStep >= s.step
                        ? "bg-primary border-primary text-primary-foreground"
                        : "bg-slate-950 border-slate-800 text-muted-foreground"
                    }`}
                  >
                    {s.step}
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground whitespace-nowrap hidden sm:inline">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-slate-950/40 p-4 rounded-xl border border-border/40 text-xs text-muted-foreground flex justify-between items-center">
              <div>
                <strong>Assigned Technician:</strong> Saurav Temgire (+91 75074 08461)
              </div>
              <a href={`tel:${phone}`} className="text-primary font-semibold hover:underline">
                Call Tech
              </a>
            </div>
          </div>

          {/* Section: Appliance Warranty Registry */}
          <div className="border border-border/80 bg-slate-900/40 backdrop-blur-md p-6 rounded-2xl space-y-6 shadow-xl">
            <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <span>Registered Appliances & Warranties</span>
            </h2>

            {/* List */}
            <div className="space-y-3">
              {registeredWarranties.map((w, idx) => (
                <div
                  key={idx}
                  className="border border-border/40 bg-slate-950/20 p-4 rounded-xl flex justify-between items-center"
                >
                  <div>
                    <span className="text-[10px] font-mono text-primary uppercase tracking-widest block">
                      {w.brand}
                    </span>
                    <strong className="text-sm text-foreground block mt-0.5">{w.model}</strong>
                    <span className="text-xs text-muted-foreground font-mono">
                      S/N: {w.serial} · Registered on {w.registeredOn}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                    SLA ACTIVE
                  </span>
                </div>
              ))}
            </div>

            {/* Form */}
            <form
              onSubmit={handleRegisterWarranty}
              className="space-y-4 border-t border-border/40 pt-4"
            >
              <div className="text-xs font-bold text-primary uppercase">Register New Product</div>
              <div className="grid sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Brand (e.g. Daikin)"
                  value={newBrand}
                  onChange={(e) => setNewBrand(e.target.value)}
                  className="rounded-lg border border-border bg-slate-950 px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <input
                  type="text"
                  placeholder="Model Number"
                  value={newModel}
                  onChange={(e) => setNewModel(e.target.value)}
                  className="rounded-lg border border-border bg-slate-950 px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <input
                  type="text"
                  placeholder="Serial Number"
                  value={newSerial}
                  onChange={(e) => setNewSerial(e.target.value)}
                  className="rounded-lg border border-border bg-slate-950 px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-primary/20 border border-primary text-primary font-semibold text-xs hover:bg-primary hover:text-primary-foreground transition inline-flex items-center gap-1.5 cursor-pointer"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Register Appliance</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Invoices & AMC Tiers */}
        <div className="lg:col-span-4 space-y-8">
          {/* Section: AMC Card */}
          <div className="border border-border/80 bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 shadow-xl space-y-4">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block">
              Your Contract Status
            </span>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-display font-bold text-lg text-white">
                  Commercial Routine AMC
                </h3>
                <span className="text-xs text-muted-foreground block mt-0.5">
                  Expires: 2026-12-31
                </span>
              </div>
              <span className="text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">
                COMPLIANT
              </span>
            </div>

            <div className="pt-2">
              <button
                onClick={() => triggerPayment("AMC")}
                className="w-full justify-center px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs hover:opacity-95 transition inline-flex items-center gap-1.5 shadow-lg shadow-primary/10 cursor-pointer"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Renew Contract (₹3,999)</span>
              </button>
            </div>
          </div>

          {/* Section: Invoices Log */}
          <div className="border border-border/80 bg-slate-900/40 backdrop-blur-md p-6 rounded-2xl space-y-4 shadow-xl">
            <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-primary" />
              <span>Invoices & Payments</span>
            </h3>

            <div className="space-y-3 font-mono text-xs">
              {[
                {
                  id: "INV-1094",
                  desc: "AC Service & Gas Charging",
                  date: "2026-06-22",
                  amt: "₹1,499",
                  status: "paid",
                },
                {
                  id: "INV-0982",
                  desc: "Start Capacitor Replacement",
                  date: "2026-05-15",
                  amt: "₹850",
                  status: "paid",
                },
              ].map((inv) => (
                <div
                  key={inv.id}
                  className="border-b border-border/40 pb-2.5 flex justify-between items-center"
                >
                  <div>
                    <strong className="text-foreground block">{inv.id}</strong>
                    <span className="text-[10px] text-muted-foreground">
                      {inv.desc} · {inv.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-white">{inv.amt}</span>
                    <button
                      onClick={() => toast.info(`Downloading invoice PDF: ${inv.id}`)}
                      className="text-primary hover:text-cyan-400 transition"
                      title="Download PDF"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Simulator Payment Gateway Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="border border-border bg-slate-900 rounded-2xl max-w-sm w-full p-6 space-y-6 shadow-2xl relative">
            <div className="text-center space-y-2">
              <img src={logo} alt="Prime Cool logo" className="h-10 w-10 mx-auto" />
              <h3 className="font-display text-lg font-bold text-white">Razorpay Simulator</h3>
              <p className="text-xs text-muted-foreground">
                Paying to Prime Cool Mechanical Solutions
              </p>
            </div>

            <div className="bg-slate-950/60 p-4 rounded-xl border border-border/60 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Description:</span>
                <span className="font-semibold text-white">
                  {payingFor === "AMC" ? "1-Year AMC Renewal" : "AC Servicing Job"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Amount:</span>
                <span className="font-bold text-primary">
                  {payingFor === "AMC" ? "₹3,999" : "₹1,499"}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleCompletePayment}
                className="w-full justify-center px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs hover:opacity-95 transition inline-flex items-center gap-1.5 shadow-lg shadow-primary/20 cursor-pointer"
              >
                <span>Authorize Simulated Payment</span>
              </button>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="w-full justify-center px-4 py-2.5 rounded-xl border border-border bg-slate-950/40 text-foreground font-semibold text-xs hover:bg-slate-800 transition inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>Cancel</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-border/80 py-8 text-center text-xs text-muted-foreground bg-slate-950/80 z-10 relative">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div>© {new Date().getFullYear()} Prime Cool — Client Portal</div>
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
