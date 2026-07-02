import { useState, useRef } from "react";
import {
  Bot,
  X,
  MessageSquare,
  Mic,
  Image,
  Sparkles,
  ArrowRight,
  Thermometer,
  ShieldAlert,
  DollarSign,
  Upload,
  Volume2,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";

export function AiDiagnosticsWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [systemType, setSystemType] = useState<"ac" | "fridge" | "chiller">("ac");
  const [symptom, setSymptom] = useState("not_cooling");

  // Custom dict lookup for symptom based diagnoses
  const diagnosisDict: Record<
    string,
    { cause: string; spare: string; cost: string; action: string }
  > = {
    // AC Symptoms
    not_cooling: {
      cause: "Low refrigerant gas pressure or failed start capacitor.",
      spare: "Run Capacitor (45uF) / R32 Gas Recharge",
      cost: "₹1,200 - ₹2,500",
      action: "Requires refrigerant leak testing, vacuum pull, and capacitor capacitance test.",
    },
    short_cycling: {
      cause: "High head pressure due to blocked condenser or frozen evaporator coil.",
      spare: "Thermostatic Expansion Valve (TXV) / Condenser Fan Motor",
      cost: "₹1,500 - ₹3,500",
      action: "Clean outdoor condenser fins, verify indoor fan speed, check for overcharge.",
    },
    noisy_operation: {
      cause: "Worn fan bearings or loose compressor mounting bolts.",
      spare: "Blower Motor / Anti-Vibration Pads",
      cost: "₹850 - ₹1,800",
      action: "Inspect blower wheel balance, replace fan motor bushing, tighten housing mounts.",
    },
    // Fridge Symptoms
    fridge_warm: {
      cause: "Failed starting relay or defective defrost termination thermostat.",
      spare: "Compressor Starter Relay (OLP) / Defrost Timer",
      cost: "₹650 - ₹1,400",
      action:
        "Measure compressor winding resistance, verify heater element, replace starter relay.",
    },
    ice_accumulation: {
      cause: "Hardened door gasket allowing warm moisture to seep inside.",
      spare: "Magnetic Door Gasket Seal",
      cost: "₹800 - ₹1,600",
      action: "Run door gasket dollar bill test, replace magnetic seal strip.",
    },
    // Chiller Symptoms
    chiller_lp_trip: {
      cause: "Low evaporator water flow rate or fouled shell and tube heat exchanger.",
      spare: "Water Flow Safety Differential Switch / Acid Descaling Wash",
      cost: "₹4,500 - ₹12,000",
      action:
        "Descale condenser tubes with acidic loop, check secondary pump impeller, check refrigerant charge.",
    },
    oil_failure: {
      cause: "Low compressor oil pressure or blocked oil strainer.",
      spare: "Industrial Oil Pressure Safety Switch / Filter Core",
      cost: "₹6,000 - ₹15,000",
      action: "Conduct compressor oil acid test, clean oil pump screen, replace oil charges.",
    },
  };

  const activeDiagnosis =
    diagnosisDict[
      `${systemType === "ac" ? symptom : systemType === "fridge" ? symptom : symptom}`
    ] || diagnosisDict["not_cooling"];

  // Voice recognition states & ref
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const startVoiceSearch = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error("Web Speech API is not supported in this browser. Please type your symptoms.");
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    const rec = new SpeechRecognition();
    rec.continuous = false;
    rec.interimResults = false;
    rec.lang = "en-IN";

    rec.onstart = () => {
      setIsListening(true);
      toast.info("Listening for symptoms... (Speak now)");
    };

    rec.onerror = (e: any) => {
      console.error(e);
      setIsListening(false);
      toast.error("Speech recognition error. Please try again.");
    };

    rec.onend = () => {
      setIsListening(false);
    };

    rec.onresult = (event: any) => {
      const text = event.results[0][0].transcript.toLowerCase();
      toast.success(`Voice Recognized: "${text}"`);

      // Auto-match keywords
      if (text.includes("cool") || text.includes("gas") || text.includes("chilling")) {
        setSystemType("ac");
        setSymptom("not_cooling");
      } else if (text.includes("short") || text.includes("trip") || text.includes("cycling")) {
        setSystemType("ac");
        setSymptom("short_cycling");
      } else if (text.includes("noise") || text.includes("rattle") || text.includes("sound")) {
        setSystemType("ac");
        setSymptom("noisy_operation");
      } else if (text.includes("warm") || text.includes("defrost") || text.includes("fridge")) {
        setSystemType("fridge");
        setSymptom("fridge_warm");
      } else if (text.includes("ice") || text.includes("freezer") || text.includes("frozen")) {
        setSystemType("fridge");
        setSymptom("ice_accumulation");
      } else if (
        text.includes("chiller") ||
        text.includes("high pressure") ||
        text.includes("lp")
      ) {
        setSystemType("chiller");
        setSymptom("chiller_lp_trip");
      } else {
        toast.info("Symptom not matched directly. Reverting to base cooling check.");
        setSystemType("ac");
        setSymptom("not_cooling");
      }
    };

    recognitionRef.current = rec;
    rec.start();
  };

  // Image Upload state
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        toast.success("Fault photo loaded into AI diagnosis model!");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-24 z-50 h-14 w-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition cursor-pointer glow-ring border border-cyan-400/20"
        title="AI Fault Diagnosis Hub"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6 animate-pulse" />}
      </button>

      {/* Floating Dialog Widget */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-full max-w-sm border border-border bg-slate-900/90 backdrop-blur-xl rounded-2xl p-6 shadow-2xl space-y-6 animate-fade-in text-xs">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-border/40 pb-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-white">
                  AI Diagnostics & Cost Engine
                </h3>
                <p className="text-[10px] text-muted-foreground">
                  Diagnose HVAC/R faults instantly
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-white transition"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* System Type */}
            <div className="space-y-1.5">
              <label className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                Select Equipment
              </label>
              <div className="flex gap-1.5">
                {[
                  { id: "ac", label: "Air Conditioner" },
                  { id: "fridge", label: "Refrigerator" },
                  { id: "chiller", label: "Process Chiller" },
                ].map((eq) => (
                  <button
                    key={eq.id}
                    onClick={() => {
                      setSystemType(eq.id as any);
                      if (eq.id === "ac") setSymptom("not_cooling");
                      else if (eq.id === "fridge") setSymptom("fridge_warm");
                      else setSymptom("chiller_lp_trip");
                    }}
                    className={`flex-1 py-1 rounded-lg border text-[10px] font-semibold transition ${
                      systemType === eq.id
                        ? "bg-primary/20 border-primary text-primary"
                        : "border-border hover:bg-card text-muted-foreground"
                    }`}
                  >
                    {eq.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Symptom Select */}
            <div className="space-y-1.5">
              <label className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                Active Symptom
              </label>
              <select
                value={symptom}
                onChange={(e) => setSymptom(e.target.value)}
                className="w-full rounded-lg border border-border bg-slate-950 px-3 py-2 text-xs text-foreground focus:outline-none"
              >
                {systemType === "ac" && (
                  <>
                    <option value="not_cooling">AC Blowing Room-Temp Air</option>
                    <option value="short_cycling">Compressor Short Cycling (Rapid Off/On)</option>
                    <option value="noisy_operation">Vibration / Loud Rattling Noise</option>
                  </>
                )}
                {systemType === "fridge" && (
                  <>
                    <option value="fridge_warm">Fresh Food Cabin Warm</option>
                    <option value="ice_accumulation">Freezer Ice/Frost Bridge Accumulation</option>
                  </>
                )}
                {systemType === "chiller" && (
                  <>
                    <option value="chiller_lp_trip">Chiller Low Pressure LP Switch Trip</option>
                    <option value="oil_failure">Oil Pressure Switch Trip</option>
                  </>
                )}
              </select>
            </div>

            {/* Voice & Image Diagnostic Tools */}
            <div className="flex gap-2 justify-between items-center pt-1 border-t border-border/20">
              <span className="text-[10px] font-mono text-muted-foreground uppercase">
                Interactive Inputs:
              </span>
              <div className="flex gap-2">
                <button
                  onClick={startVoiceSearch}
                  className={`p-2 rounded-lg border transition ${
                    isListening
                      ? "bg-red-500/20 border-red-500 text-red-500 animate-pulse"
                      : "border-border hover:bg-card text-muted-foreground"
                  }`}
                  title="Mock Voice Diagnosis"
                >
                  <Mic className="h-4 w-4" />
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className={`p-2 rounded-lg border border-border hover:bg-card text-muted-foreground transition ${
                    imagePreview ? "border-primary text-primary" : ""
                  }`}
                  title="Mock Photo-Based Diagnosis"
                >
                  <Image className="h-4 w-4" />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>

            {/* Image Preview Container */}
            {imagePreview && (
              <div className="relative aspect-video rounded-lg overflow-hidden border border-border bg-slate-950 shadow-inner">
                <img
                  src={imagePreview}
                  alt="Fault diagnosis snapshot"
                  className="object-cover w-full h-full opacity-80"
                />
                <button
                  onClick={() => setImagePreview(null)}
                  className="absolute top-1 right-1 p-1 bg-slate-950/80 rounded-full border border-border hover:text-red-400"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>

          {/* AI Result Card */}
          <div className="rounded-xl border border-border bg-slate-950/60 p-4 space-y-3.5 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-bl from-primary/5 to-transparent pointer-events-none" />

            <div className="space-y-1">
              <span className="text-[9px] font-mono text-primary uppercase tracking-widest flex items-center gap-1">
                <ShieldAlert className="h-3 w-3" /> Probable Root Cause
              </span>
              <p className="text-[11px] text-foreground leading-relaxed">{activeDiagnosis.cause}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[9px] font-mono text-primary uppercase tracking-widest block">
                Recommended Action & Spares
              </span>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                {activeDiagnosis.action} <br />
                <span className="text-white font-mono font-bold mt-1 inline-block">
                  Parts: {activeDiagnosis.spare}
                </span>
              </p>
            </div>

            <div className="pt-2.5 border-t border-border/40 flex justify-between items-center">
              <div>
                <span className="text-[9px] font-mono text-muted-foreground uppercase block">
                  Est. Cost Range
                </span>
                <span className="font-display font-bold text-sm text-gradient">
                  {activeDiagnosis.cost}
                </span>
              </div>

              <Link
                to="/booking"
                search={{}}
                className="px-3.5 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-[10px] hover:opacity-95 transition inline-flex items-center gap-1 cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                <span>Book Service</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
