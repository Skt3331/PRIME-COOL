import { useState } from "react";
import {
  Gauge,
  Zap,
  Thermometer,
  Wind,
  Settings,
  ArrowRight,
  ShieldCheck,
  Flame,
  Scale,
  Volume2,
  Copy,
  CheckCheck,
  ChevronDown,
  Info,
  Calculator,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* Helper components & styles                                                 */
/* -------------------------------------------------------------------------- */

function CopyButton({ value }: { value: string | number }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(String(value)).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <button
      onClick={handleCopy}
      title="Copy value"
      className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold transition-all"
      style={{
        background: copied ? "rgba(0,200,255,0.15)" : "rgba(255,255,255,0.06)",
        border: copied ? "1px solid rgba(0,200,255,0.4)" : "1px solid rgba(255,255,255,0.10)",
        color: copied ? "#00c8ff" : "#94a3b8",
      }}
    >
      {copied ? <CheckCheck className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function FormulaPanel({ formula, notes }: { formula: string; notes?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-4 rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-semibold text-left transition"
        style={{ background: "rgba(0,200,255,0.06)", color: "#00c8ff" }}
      >
        <span className="flex items-center gap-2"><Info className="h-3.5 w-3.5" /> How it&apos;s calculated</span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-4 py-3 space-y-2" style={{ background: "rgba(0,0,0,0.3)" }}>
          <div className="font-mono text-xs text-[#00c8ff] bg-[#09090f]/80 px-3 py-2 rounded-lg border border-white/5">{formula}</div>
          {notes && <p className="text-xs text-slate-400 leading-relaxed">{notes}</p>}
        </div>
      )}
    </div>
  );
}

function ViewCard({
  title,
  desc,
  icon: Icon,
  children,
}: {
  title: string;
  desc: string;
  icon?: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        {Icon && (
          <div className="h-12 w-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, rgba(0,200,255,0.15), rgba(0,102,255,0.15))", border: "1px solid rgba(0,200,255,0.25)" }}>
            <Icon className="h-6 w-6 text-[#00c8ff]" />
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold font-display text-white flex items-center gap-2">
            <span>{title}</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">{desc}</p>
        </div>
      </div>

      {/* Content card */}
      <div
        className="rounded-2xl p-6 relative overflow-hidden space-y-6"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
        }}
      >
        {/* Top gradient line */}
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, #00c8ff, #0066ff, #8b5cf6)" }} />
        {/* Glow orb */}
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, #00c8ff, transparent)" }} />
        {children}
      </div>
    </div>
  );
}

function NumericInput({
  label,
  value,
  onChange,
  unit,
  min,
  max,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (val: number) => void;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
}) {
  const pct = max && min !== undefined ? ((value - min) / (max - min)) * 100 : 50;
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-semibold text-slate-300">{label}</label>
        <div className="flex items-center gap-2">
          {unit && <span className="text-[10px] font-bold uppercase tracking-wider text-[#00c8ff] bg-[#00c8ff]/10 border border-[#00c8ff]/20 px-2 py-0.5 rounded-md">{unit}</span>}
          <input
            type="number"
            min={min}
            max={max}
            step={step}
            value={isNaN(value) ? "" : value}
            onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
            className="w-20 rounded-lg px-2.5 py-1.5 text-sm text-white font-mono text-right focus:outline-none focus:ring-1 transition"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", focusRingColor: "#00c8ff" }}
          />
        </div>
      </div>
      {/* Custom slider */}
      <div className="relative h-5 flex items-center">
        <div className="absolute left-0 right-0 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }} />
        <div
          className="absolute left-0 h-1.5 rounded-full"
          style={{ width: `${Math.max(0, Math.min(100, pct))}%`, background: "linear-gradient(90deg, #00c8ff, #0066ff)" }}
        />
        <input
          type="range"
          min={min ?? 0}
          max={max ?? 100}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="absolute left-0 right-0 w-full opacity-0 cursor-pointer h-5"
          style={{ accentColor: "#00c8ff" }}
        />
        <div
          className="absolute w-4 h-4 rounded-full border-2 border-[#00c8ff] shadow-lg pointer-events-none"
          style={{
            left: `calc(${Math.max(0, Math.min(100, pct))}% - 8px)`,
            background: "linear-gradient(135deg, #00c8ff, #0066ff)",
            boxShadow: "0 0 10px rgba(0,200,255,0.5)",
          }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-slate-600">
        <span>{min ?? 0}</span>
        <span>{max ?? 100}</span>
      </div>
    </div>
  );
}

function ResultRow({
  label,
  value,
  unit,
  highlight,
}: {
  label: string;
  value: string | number;
  unit?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex justify-between items-center py-2.5 border-b text-sm ${
        highlight
          ? "border-[#00c8ff]/20"
          : "border-white/5"
      }`}
    >
      <span className="text-slate-400 text-xs">{label}</span>
      <div className="flex items-center gap-2">
        {highlight ? (
          <span
            className="font-bold font-mono text-sm px-3 py-1 rounded-full"
            style={{
              background: "linear-gradient(135deg, rgba(0,200,255,0.15), rgba(0,102,255,0.15))",
              border: "1px solid rgba(0,200,255,0.3)",
              color: "#00c8ff",
            }}
          >
            {value} {unit && <span className="opacity-80 text-xs">{unit}</span>}
          </span>
        ) : (
          <span className="font-mono text-white text-sm">
            {value} {unit && <span className="opacity-60 text-xs ml-0.5">{unit}</span>}
          </span>
        )}
        <CopyButton value={`${value}${unit ? " " + unit : ""}`} />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 1. BTU Load Calculator                                                      */
/* -------------------------------------------------------------------------- */
export function BtuCalculatorView() {
  const [width, setWidth] = useState(12);
  const [length, setLength] = useState(15);
  const [height, setHeight] = useState(10);
  const [isCommercial, setIsCommercial] = useState(false);
  const [insulation, setInsulation] = useState(2); // 1 = poor, 2 = standard, 3 = premium
  const [people, setPeople] = useState(2);
  const [sunlight, setSunlight] = useState(1.0); // 0.9 = shaded, 1.0 = average, 1.1 = sunny

  // Calculation logic
  const area = width * length;
  const volume = area * height;
  let baseBtu = area * (isCommercial ? 150 : 100);

  // Adjust for insulation
  if (insulation === 1) baseBtu *= 1.25;
  if (insulation === 3) baseBtu *= 0.85;

  // Add load for people and sunlight
  const peopleBtu = people * 400;
  const sunlightBtu = baseBtu * (sunlight - 1);
  const totalBtu = Math.round(baseBtu + peopleBtu + sunlightBtu);
  const tonnage = (totalBtu / 12000).toFixed(1);
  const kw = (totalBtu * 0.000293).toFixed(2);

  return (
    <ViewCard
      title="BTU Load Calculator"
      desc="Estimate the sensible heat cooling load requirement for residential or commercial spaces."
      icon={Thermometer}
    >
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-muted-foreground">Type:</span>
            <button
              onClick={() => setIsCommercial(false)}
              className={`px-3 py-1 text-xs rounded-lg border transition ${
                !isCommercial
                  ? "bg-primary/20 border-primary text-primary"
                  : "border-border hover:bg-card"
              }`}
            >
              Residential
            </button>
            <button
              onClick={() => setIsCommercial(true)}
              className={`px-3 py-1 text-xs rounded-lg border transition ${
                isCommercial
                  ? "bg-primary/20 border-primary text-primary"
                  : "border-border hover:bg-card"
              }`}
            >
              Commercial
            </button>
          </div>

          <NumericInput
            label="Room Width (feet)"
            value={width}
            onChange={setWidth}
            unit="ft"
            min={5}
            max={100}
          />
          <NumericInput
            label="Room Length (feet)"
            value={length}
            onChange={setLength}
            unit="ft"
            min={5}
            max={100}
          />
          <NumericInput
            label="Ceiling Height (feet)"
            value={height}
            onChange={setHeight}
            unit="ft"
            min={7}
            max={25}
          />
          <NumericInput
            label="Occupancy Count"
            value={people}
            onChange={setPeople}
            unit="people"
            min={1}
            max={50}
          />

          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground font-semibold block">
              Insulation Quality
            </label>
            <select
              value={insulation}
              onChange={(e) => setInsulation(parseInt(e.target.value))}
              className="w-full rounded-lg border border-border bg-background/50 px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value={1}>Poor (Drafty / Large Windows)</option>
              <option value={2}>Standard (Average Code)</option>
              <option value={3}>Premium (Highly Insulated / Double Glazed)</option>
            </select>
          </div>
        </div>

        <div className="bg-background/40 border border-border p-5 rounded-2xl space-y-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            Cooling Demand Estimate
          </div>
          <div className="text-4xl font-display font-bold text-primary">
            {totalBtu.toLocaleString()}{" "}
            <span className="text-sm font-sans font-medium text-foreground">BTU/hr</span>
          </div>

          <div className="space-y-1">
            <ResultRow label="Room Area" value={area} unit="sq ft" />
            <ResultRow label="Room Volume" value={volume} unit="cu ft" />
            <ResultRow label="Recommended AC Size" value={tonnage} unit="Tons" highlight />
            <ResultRow label="Electrical Cooling Power Equivalent" value={kw} unit="kW" />
          </div>
          <FormulaPanel formula="Total BTU = (Area × 100) + (People × 400)" notes="Commercial baseline is 150 BTU/sqft. Adjustments applied for insulation and solar load." />
        </div>
      </div>
    </ViewCard>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. HVAC Tonnage Calculator                                                 */
/* -------------------------------------------------------------------------- */
export function TonnageCalculatorView() {
  const [sqft, setSqft] = useState(1200);
  const [loadType, setLoadType] = useState("living-room");

  const loadFactors: Record<string, number> = {
    bedroom: 350,
    "living-room": 400,
    office: 500,
    "server-room": 800,
  };

  const factor = loadFactors[loadType] || 400;
  const btu = sqft * (400 / factor) * 35; // base estimation formula
  const tonnageVal = btu / 12000;

  // Round to nearest 0.5 tonnage
  const roundedTonnage = Math.max(0.5, Math.round(tonnageVal * 2) / 2);

  return (
    <ViewCard
      title="HVAC Tonnage Calculator"
      desc="Convert floor area into estimated air conditioning tonnage ratings based on room heating characteristics."
      icon={Scale}
    >
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <NumericInput
            label="Floor Area (Square Feet)"
            value={sqft}
            onChange={setSqft}
            unit="sq ft"
            min={100}
            max={10000}
            step={50}
          />

          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground font-semibold block">
              Load / Room Category
            </label>
            <select
              value={loadType}
              onChange={(e) => setLoadType(e.target.value)}
              className="w-full rounded-lg border border-border bg-background/50 px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="bedroom">Bedroom (Low thermal gain, quiet occupancy)</option>
              <option value="living-room">Living Area / Average (Standard windows & lights)</option>
              <option value="office">Commercial Office (Computers, lighting, average staff)</option>
              <option value="server-room">
                Server / UPS Room (High-density active heat output)
              </option>
            </select>
          </div>
        </div>

        <div className="bg-background/40 border border-border p-5 rounded-2xl space-y-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            Tonnage Estimate
          </div>
          <div className="text-4xl font-display font-bold text-gradient">
            {roundedTonnage}{" "}
            <span className="text-sm font-sans font-medium text-foreground">Tons</span>
          </div>

          <div className="space-y-1">
            <ResultRow
              label="Raw Required Capacity"
              value={Math.round(btu).toLocaleString()}
              unit="BTU/hr"
            />
            <ResultRow label="Precise Calc Tonnage" value={tonnageVal.toFixed(2)} unit="Tons" />
            <ResultRow
              label="Recommended COP Rating"
              value="3.5 - 4.2"
            />
          </div>
          <FormulaPanel formula="Tonnage = (SqFt × RoomFactor × 35) / 12000" notes="Rounded to the nearest 0.5 Tons." />
        </div>
      </div>
    </ViewCard>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. Refrigerant PT Calculator                                               */
/* -------------------------------------------------------------------------- */
interface RefrigerantData {
  name: string;
  a: number; // Antoine coefficient A
  b: number; // Antoine coefficient B
  c: number; // Antoine coefficient C
  gwp: number; // Global Warming Potential
  class: string; // Safety class
}

const refrigerants: Record<string, RefrigerantData> = {
  R134a: { name: "R134a", a: 4.419, b: 1013.7, c: -28.16, gwp: 1430, class: "A1 (Non-Toxic)" },
  R410A: { name: "R410A", a: 4.095, b: 840.4, c: -38.65, gwp: 2088, class: "A1 (High Pressure)" },
  R32: { name: "R32", a: 4.148, b: 864.2, c: -32.55, gwp: 675, class: "A2L (Low Flammable)" },
  R22: { name: "R22", a: 4.208, b: 925.2, c: -33.95, gwp: 1810, class: "A1 (HCFC - Phasing Out)" },
  R404A: { name: "R404A", a: 4.119, b: 825.4, c: -36.15, gwp: 3922, class: "A1 (High Glide)" },
  R407C: { name: "R407C", a: 4.152, b: 890.3, c: -34.85, gwp: 1774, class: "A1 (Zeotropic Glide)" },
};

export function PtCalculatorView() {
  const [refrigerant, setRefrigerant] = useState("R410A");
  const [pressurePsi, setPressurePsi] = useState(120);

  const ref = refrigerants[refrigerant] || refrigerants.R410A;

  // Convert PSI to bar for Antoine equation (approximate Antoine calculation)
  const pBar = pressurePsi / 14.5038 + 1.01325;
  // log10(P) = A - B/(T + C) -> T = B / (A - log10(P)) - C
  const logP = Math.log10(pBar);
  let tempC = ref.b / (ref.a - logP) - ref.c - 273.15;
  if (isNaN(tempC) || tempC < -100 || tempC > 100) tempC = 0; // protection fallback

  const tempF = (tempC * 9) / 5 + 32;

  return (
    <ViewCard
      title="Refrigerant PT Calculator"
      desc="Convert pressure to saturated temperature for common refrigerants. Crucial tool for diagnosing subcooling and superheat."
      icon={Gauge}
    >
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground font-semibold block">
              Select Refrigerant
            </label>
            <select
              value={refrigerant}
              onChange={(e) => setRefrigerant(e.target.value)}
              className="w-full rounded-lg border border-border bg-background/50 px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {Object.keys(refrigerants).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>

          <NumericInput
            label="Suction / Discharge Pressure (PSI)"
            value={pressurePsi}
            onChange={setPressurePsi}
            unit="PSI"
            min={0}
            max={600}
            step={5}
          />
        </div>

        <div className="bg-background/40 border border-border p-5 rounded-2xl space-y-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            Saturated Temperature (Bubble/Dew)
          </div>
          <div className="text-4xl font-display font-bold text-primary">
            {tempC.toFixed(1)}{" "}
            <span className="text-sm font-sans font-medium text-foreground">°C</span>{" "}
            <span className="text-xl font-sans text-muted-foreground">/ {tempF.toFixed(1)}°F</span>
          </div>

          <div className="space-y-1">
            <ResultRow label="Safety Classification" value={ref.class} />
            <ResultRow label="GWP Index (AR4)" value={ref.gwp} />
            <ResultRow
              label="Approximate Evaporating State"
              highlight={tempC < 0}
            />
          </div>
          <FormulaPanel formula="T = B / (A - log10(P)) - C" notes="Antoine Equation using specific refrigerant coefficients." />
        </div>
      </div>
    </ViewCard>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. Superheat Calculator                                                    */
/* -------------------------------------------------------------------------- */
export function SuperheatCalculatorView() {
  const [refrigerant, setRefrigerant] = useState("R410A");
  const [pressurePsi, setPressurePsi] = useState(120);
  const [lineTempF, setLineTempF] = useState(55);

  const ref = refrigerants[refrigerant] || refrigerants.R410A;
  const pBar = pressurePsi / 14.5038 + 1.01325;
  const logP = Math.log10(pBar);
  const satTempC = ref.b / (ref.a - logP) - ref.c - 273.15;
  const satTempF = (satTempC * 9) / 5 + 32;

  const superheat = lineTempF - satTempF;

  let evaluation = "Optimal";
  let evalColor = "text-emerald-400";
  if (superheat < 4) {
    evaluation = "CRITICAL: Liquid Floodback Hazard (Too Low)";
    evalColor = "text-rose-500 font-bold animate-pulse";
  } else if (superheat < 8) {
    evaluation = "Low Superheat (Overcharged or Airflow issue)";
    evalColor = "text-yellow-500";
  } else if (superheat > 15) {
    evaluation = "High Superheat (Undercharged / Blocked TXV)";
    evalColor = "text-rose-400";
  }

  return (
    <ViewCard
      title="Superheat Calculator"
      desc="Calculate superheat at evaporator suction line. Important for TXV and fixed orifice diagnostics."
    >
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground font-semibold block">
              Select Refrigerant
            </label>
            <select
              value={refrigerant}
              onChange={(e) => setRefrigerant(e.target.value)}
              className="w-full rounded-lg border border-border bg-background/50 px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="R410A">R410A</option>
              <option value="R22">R22</option>
              <option value="R32">R32</option>
            </select>
          </div>

          <NumericInput
            label="Suction Pressure (PSI)"
            value={pressurePsi}
            onChange={setPressurePsi}
            unit="PSI"
            min={20}
            max={250}
            step={2}
          />
          <NumericInput
            label="Suction Line Temperature (°F)"
            value={lineTempF}
            onChange={setLineTempF}
            unit="°F"
            min={20}
            max={100}
          />
        </div>

        <div className="bg-background/40 border border-border p-5 rounded-2xl space-y-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            Calculated Superheat
          </div>
          <div className="text-4xl font-display font-bold text-primary">
            {superheat.toFixed(1)}{" "}
            <span className="text-sm font-sans font-medium text-foreground">°F</span>
          </div>

          <div className="space-y-2.5">
            <ResultRow
              label="Saturated Evap Temp (Sat Temp)"
              value={satTempF.toFixed(1)}
              unit="°F"
            />
            <ResultRow label="Suction Line Actual Temp" value={lineTempF.toFixed(1)} unit="°F" />
            <div className="pt-2 border-t border-border">
              <div className="text-[10px] uppercase text-muted-foreground">
                Diagnostics Assessment
              </div>
              <div className={`text-xs mt-1 font-semibold ${evalColor}`}>{evaluation}</div>
            </div>
          </div>
        </div>
      </div>
    </ViewCard>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. Subcooling Calculator                                                   */
/* -------------------------------------------------------------------------- */
export function SubcoolingCalculatorView() {
  const [refrigerant, setRefrigerant] = useState("R410A");
  const [pressurePsi, setPressurePsi] = useState(330);
  const [lineTempF, setLineTempF] = useState(90);

  const ref = refrigerants[refrigerant] || refrigerants.R410A;
  const pBar = pressurePsi / 14.5038 + 1.01325;
  const logP = Math.log10(pBar);
  const satTempC = ref.b / (ref.a - logP) - ref.c - 273.15;
  const satTempF = (satTempC * 9) / 5 + 32;

  const subcooling = satTempF - lineTempF;

  let evaluation = "Optimal (Normal Charge)";
  let evalColor = "text-emerald-400";
  if (subcooling < 6) {
    evaluation = "Low Subcooling (Undercharged System)";
    evalColor = "text-rose-400";
  } else if (subcooling > 16) {
    evaluation = "High Subcooling (Overcharged / Restricted Liquid Line)";
    evalColor = "text-rose-500 font-bold";
  }

  return (
    <ViewCard
      title="Subcooling Calculator"
      desc="Calculate subcooling at condenser liquid line. Primary indicator of system refrigerant charge."
    >
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground font-semibold block">
              Select Refrigerant
            </label>
            <select
              value={refrigerant}
              onChange={(e) => setRefrigerant(e.target.value)}
              className="w-full rounded-lg border border-border bg-background/50 px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="R410A">R410A</option>
              <option value="R134a">R134a</option>
              <option value="R404A">R404A</option>
            </select>
          </div>

          <NumericInput
            label="Liquid Line Pressure (PSI)"
            value={pressurePsi}
            onChange={setPressurePsi}
            unit="PSI"
            min={100}
            max={600}
            step={5}
          />
          <NumericInput
            label="Liquid Line Temperature (°F)"
            value={lineTempF}
            onChange={setLineTempF}
            unit="°F"
            min={50}
            max={140}
          />
        </div>

        <div className="bg-background/40 border border-border p-5 rounded-2xl space-y-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            Calculated Subcooling
          </div>
          <div className="text-4xl font-display font-bold text-primary">
            {subcooling.toFixed(1)}{" "}
            <span className="text-sm font-sans font-medium text-foreground">°F</span>
          </div>

          <div className="space-y-2.5">
            <ResultRow label="Liquid Saturation Temp" value={satTempF.toFixed(1)} unit="°F" />
            <ResultRow label="Liquid Line Actual Temp" value={lineTempF.toFixed(1)} unit="°F" />
            <div className="pt-2 border-t border-border">
              <div className="text-[10px] uppercase text-muted-foreground">
                Diagnostics Assessment
              </div>
              <div className={`text-xs mt-1 font-semibold ${evalColor}`}>{evaluation}</div>
            </div>
          </div>
        </div>
      </div>
    </ViewCard>
  );
}

/* -------------------------------------------------------------------------- */
/* 6. Airflow (CFM) Calculator                                                 */
/* -------------------------------------------------------------------------- */
export function CfmCalculatorView() {
  const [tonnage, setTonnage] = useState(3.0);
  const [tempDiff, setTempDiff] = useState(20); // standard delta T

  const sensibleHeatLoad = tonnage * 12000 * 0.72; // Assuming 72% sensible heat ratio
  // CFM = Sensible Heat Load (BTU/hr) / (1.08 * TempDiff)
  const cfm = sensibleHeatLoad / (1.08 * tempDiff);

  return (
    <ViewCard
      title="Airflow (CFM) Calculator"
      desc="Calculate the volumetric airflow rate (CFM) across the evaporator coil based on tonnage and temperature drop."
    >
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <NumericInput
            label="AC Tonnage Size"
            value={tonnage}
            onChange={setTonnage}
            unit="Tons"
            min={1.0}
            max={25.0}
            step={0.5}
          />
          <NumericInput
            label="Coil Temp Difference (Delta T)"
            value={tempDiff}
            onChange={setTempDiff}
            unit="°F"
            min={12}
            max={28}
          />
        </div>

        <div className="bg-background/40 border border-border p-5 rounded-2xl space-y-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            Airflow Volume
          </div>
          <div className="text-4xl font-display font-bold text-gradient">
            {Math.round(cfm).toLocaleString()}{" "}
            <span className="text-sm font-sans font-medium text-foreground">CFM</span>
          </div>

          <div className="space-y-1">
            <ResultRow
              label="Estimated Sensible Heat Load"
              value={Math.round(sensibleHeatLoad).toLocaleString()}
              unit="BTU/hr"
            />
            <ResultRow
              label="Airflow per Tonnage Rating"
              value={Math.round(cfm / tonnage).toLocaleString()}
              unit="CFM / Ton"
              highlight={Math.round(cfm / tonnage) >= 350 && Math.round(cfm / tonnage) <= 450}
            />
            <ResultRow
              label="Airflow Status Evaluation"
              value={
                Math.round(cfm / tonnage) < 350
                  ? "Low Airflow (Freezing risk)"
                  : Math.round(cfm / tonnage) > 450
                    ? "High Airflow (Humidity issue)"
                    : "Normal Airflow (Optimal)"
              }
            />
          </div>
        </div>
      </div>
    </ViewCard>
  );
}

/* -------------------------------------------------------------------------- */
/* 7. Duct Size Calculator                                                    */
/* -------------------------------------------------------------------------- */
export function DuctCalculatorView() {
  const [cfm, setCfm] = useState(800);
  const [friction, setFriction] = useState(0.1); // in. WC per 100ft

  // Duct sizing approximation formulas based on Equal Friction Method
  // Round diameter = 4 * (CFM/friction)^0.38
  const velocity = 800; // design velocity in fpm (assumed)
  const diameter = Math.pow(cfm / (0.0027 * velocity), 0.5) * 1.5;
  const roundedDiameter = Math.round(diameter * 2) / 2;

  // Rectangular equivalents
  const width = Math.round(roundedDiameter * 1.2);
  const height = Math.round((roundedDiameter * roundedDiameter) / width);

  return (
    <ViewCard
      title="Duct Size Calculator"
      desc="Size air conditioning supply/return ducts using the equal friction method."
    >
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <NumericInput
            label="Airflow Rate (CFM)"
            value={cfm}
            onChange={setCfm}
            unit="CFM"
            min={100}
            max={8000}
            step={100}
          />
          <NumericInput
            label="Friction Loss rate (per 100ft)"
            value={friction}
            onChange={setFriction}
            unit="in. WC"
            min={0.05}
            max={0.25}
            step={0.01}
          />
        </div>

        <div className="bg-background/40 border border-border p-5 rounded-2xl space-y-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            Recommended Round Duct Size
          </div>
          <div className="text-4xl font-display font-bold text-primary">
            Ø {roundedDiameter}{" "}
            <span className="text-sm font-sans font-medium text-foreground">Inches</span>
          </div>

          <div className="space-y-1">
            <ResultRow label="Friction Design Target" value={friction.toFixed(2)} unit="in. WC" />
            <ResultRow label="Equivalent Rectangular Width" value={width} unit="Inches" />
            <ResultRow label="Equivalent Rectangular Height" value={height} unit="Inches" />
            <ResultRow label="Approximate Duct Velocity" value={velocity} unit="FPM" highlight />
          </div>
        </div>
      </div>
    </ViewCard>
  );
}

/* -------------------------------------------------------------------------- */
/* 8. Pipe Sizing Calculator                                                  */
/* -------------------------------------------------------------------------- */
export function PipeSizingView() {
  const [tonnage, setTonnage] = useState(3.0);
  const [refrigerant, setRefrigerant] = useState("R410A");

  // Approximate tube diameters in inches based on tonnage
  let suction = '5/8"';
  let liquid = '3/8"';

  if (tonnage <= 1.5) {
    suction = '1/2"';
    liquid = '1/4"';
  } else if (tonnage <= 3.0) {
    suction = '5/8"';
    liquid = '3/8"';
  } else if (tonnage <= 5.0) {
    suction = '7/8"';
    liquid = '3/8"';
  } else if (tonnage <= 10.0) {
    suction = '1-1/8"';
    liquid = '1/2"';
  } else {
    suction = '1-3/8"';
    liquid = '5/8"';
  }

  return (
    <ViewCard
      title="Refrigerant Pipe Sizing"
      desc="Size copper refrigerant line sets (suction and liquid lines) to ensure minimal pressure drop."
    >
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <NumericInput
            label="System Tonnage Size"
            value={tonnage}
            onChange={setTonnage}
            unit="Tons"
            min={1.0}
            max={25.0}
            step={0.5}
          />

          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground font-semibold block">
              Select Refrigerant
            </label>
            <select
              value={refrigerant}
              onChange={(e) => setRefrigerant(e.target.value)}
              className="w-full rounded-lg border border-border bg-background/50 px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="R410A">R410A</option>
              <option value="R32">R32</option>
              <option value="R134a">R134a</option>
            </select>
          </div>
        </div>

        <div className="bg-background/40 border border-border p-5 rounded-2xl space-y-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            Recommended Line Sizes
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-[10px] text-muted-foreground">SUCTION LINE (Vapor)</div>
              <div className="text-2xl font-bold font-display text-primary">{suction}</div>
            </div>
            <div>
              <div className="text-[10px] text-muted-foreground">LIQUID LINE (Liquid)</div>
              <div className="text-2xl font-bold font-display text-gradient">{liquid}</div>
            </div>
          </div>

          <div className="space-y-1 border-t border-border/40 pt-3">
            <ResultRow label="Maximum Velocity (Suction)" value="1500" unit="FPM" />
            <ResultRow label="Maximum Pressure Drop Target" value="2.0" unit="PSI (Equivalent)" />
            <ResultRow label="Connection Material" value="Soft Drawn Copper" />
          </div>
        </div>
      </div>
    </ViewCard>
  );
}

/* -------------------------------------------------------------------------- */
/* 9. Cooling Load Calculator                                                 */
/* -------------------------------------------------------------------------- */
export function CoolingLoadView() {
  const [wallArea, setWallArea] = useState(800);
  const [roofArea, setRoofArea] = useState(1200);
  const [people, setPeople] = useState(5);
  const [lightsWatts, setLightsWatts] = useState(500);

  // Simple sensible heat calculations
  const wallLoad = wallArea * 1.2 * 15; // area * U-factor * tempDiff
  const roofLoad = roofArea * 1.5 * 20;
  const peopleLoad = people * 250;
  const lightsLoad = lightsWatts * 3.412; // 1W = 3.412 BTU/h
  const totalLoad = Math.round(wallLoad + roofLoad + peopleLoad + lightsLoad);

  return (
    <ViewCard
      title="Building Heat Gain load"
      desc="Estimate the mechanical heat load gain components for structural engineering."
    >
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <NumericInput
            label="Exposure Wall Area"
            value={wallArea}
            onChange={setWallArea}
            unit="sq ft"
            min={100}
            max={10000}
            step={100}
          />
          <NumericInput
            label="Roof Area"
            value={roofArea}
            onChange={setRoofArea}
            unit="sq ft"
            min={100}
            max={10000}
            step={100}
          />
          <NumericInput
            label="Occupancy Count"
            value={people}
            onChange={setPeople}
            unit="people"
            min={1}
            max={100}
          />
          <NumericInput
            label="Electrical Lighting Load"
            value={lightsWatts}
            onChange={setLightsWatts}
            unit="Watts"
            min={0}
            max={5000}
            step={100}
          />
        </div>

        <div className="bg-background/40 border border-border p-5 rounded-2xl space-y-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            Estimated Heat Gain Load
          </div>
          <div className="text-4xl font-display font-bold text-primary">
            {totalLoad.toLocaleString()}{" "}
            <span className="text-sm font-sans font-medium text-foreground">BTU/hr</span>
          </div>

          <div className="space-y-1">
            <ResultRow
              label="Wall Heat Gain component"
              value={Math.round(wallLoad).toLocaleString()}
              unit="BTU/h"
            />
            <ResultRow
              label="Roof Heat Gain component"
              value={Math.round(roofLoad).toLocaleString()}
              unit="BTU/h"
            />
            <ResultRow label="Metabolic Human Gain load" value={peopleLoad} unit="BTU/h" />
            <ResultRow
              label="Electrical Lighting Heat gain"
              value={Math.round(lightsLoad).toLocaleString()}
              unit="BTU/h"
            />
            <ResultRow
              label="Total Load Equivalent"
              value={(totalLoad * 0.000293).toFixed(2)}
              unit="kW"
              highlight
            />
          </div>
        </div>
      </div>
    </ViewCard>
  );
}

/* -------------------------------------------------------------------------- */
/* 10. Energy Consumption Calculator                                          */
/* -------------------------------------------------------------------------- */
export function EnergyCalculatorView() {
  const [tonnage, setTonnage] = useState(2.0);
  const [hours, setHours] = useState(8);
  const [rate, setRate] = useState(10); // INR/kWh typical in Pune/Mumbai
  const [cop, setCop] = useState(3.5);

  const electricalKw = (tonnage * 3.517) / cop; // 1 Ton = 3.517 kW cooling
  const dailyKwh = electricalKw * hours;
  const monthlyCost = dailyKwh * 30 * rate;
  const monthlyCo2 = dailyKwh * 30 * 0.85; // 0.85 kg CO2 per kWh (typical coal power)

  return (
    <ViewCard
      title="Energy Cost Calculator"
      desc="Calculate the estimated monthly electrical operating cost and carbon footprint of AC systems."
    >
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <NumericInput
            label="AC Capacity (Tonnage)"
            value={tonnage}
            onChange={setTonnage}
            unit="Tons"
            min={1.0}
            max={10.0}
            step={0.5}
          />
          <NumericInput
            label="Daily Run Time"
            value={hours}
            onChange={setHours}
            unit="Hours/Day"
            min={1}
            max={24}
          />
          <NumericInput
            label="Electricity Billing Rate"
            value={rate}
            onChange={setRate}
            unit="₹ / Unit (kWh)"
            min={5}
            max={20}
            step={0.5}
          />
          <NumericInput
            label="Compressor COP Rating"
            value={cop}
            onChange={setCop}
            unit="COP"
            min={2.0}
            max={5.5}
            step={0.1}
          />
        </div>

        <div className="bg-background/40 border border-border p-5 rounded-2xl space-y-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            Estimated Monthly Billing
          </div>
          <div className="text-4xl font-display font-bold text-gradient">
            ₹{Math.round(monthlyCost).toLocaleString()}{" "}
            <span className="text-sm font-sans font-medium text-foreground">/ Month</span>
          </div>

          <div className="space-y-1">
            <ResultRow
              label="Electrical Power Consumption"
              value={electricalKw.toFixed(2)}
              unit="kW"
            />
            <ResultRow label="Daily Energy Usage" value={dailyKwh.toFixed(1)} unit="Units (kWh)" />
            <ResultRow
              label="Estimated Annual Cost"
              value={`₹${Math.round(monthlyCost * 12).toLocaleString()}`}
            />
            <ResultRow
              label="Monthly Carbon Footprint"
              value={Math.round(monthlyCo2).toLocaleString()}
              unit="kg CO2"
              highlight
            />
          </div>
        </div>
      </div>
    </ViewCard>
  );
}

/* -------------------------------------------------------------------------- */
/* 11. Pressure to Temperature Converter                                      */
/* -------------------------------------------------------------------------- */
export function PressureTempConverterView() {
  const [pressurePsi, setPressurePsi] = useState(120);

  const bar = pressurePsi / 14.5038;
  const kpa = pressurePsi * 6.89476;

  return (
    <ViewCard
      title="Pressure to Temperature Converter"
      desc="Convert pressure metrics instantly across standard international units."
    >
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <NumericInput
            label="Pressure Value (PSI)"
            value={pressurePsi}
            onChange={setPressurePsi}
            unit="PSI"
            min={0}
            max={1000}
            step={5}
          />
        </div>

        <div className="bg-background/40 border border-border p-5 rounded-2xl space-y-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            Converted Pressure Metrics
          </div>
          <div className="space-y-2">
            <ResultRow label="Bar Pressure" value={bar.toFixed(2)} unit="bar" highlight />
            <ResultRow
              label="KiloPascal Pressure"
              value={Math.round(kpa).toLocaleString()}
              unit="kPa"
            />
            <ResultRow label="MegaPascal Equivalent" value={(kpa / 1000).toFixed(4)} unit="MPa" />
          </div>
        </div>
      </div>
    </ViewCard>
  );
}

/* -------------------------------------------------------------------------- */
/* 12. Temperature Conversion Tool                                            */
/* -------------------------------------------------------------------------- */
export function TempConvertView() {
  const [tempC, setTempC] = useState(25);

  const tempF = (tempC * 9) / 5 + 32;
  const tempK = tempC + 273.15;

  return (
    <ViewCard
      title="Temperature Conversion"
      desc="Convert thermodynamic temperature properties among Celsius, Fahrenheit, and Kelvin."
    >
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <NumericInput
            label="Enter Temperature (°C)"
            value={tempC}
            onChange={setTempC}
            unit="°C"
            min={-100}
            max={200}
          />
        </div>

        <div className="bg-background/40 border border-border p-5 rounded-2xl space-y-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            Converted Temperature Outputs
          </div>
          <div className="space-y-2">
            <ResultRow label="Fahrenheit Scale" value={tempF.toFixed(2)} unit="°F" highlight />
            <ResultRow label="Kelvin Absolute Scale" value={tempK.toFixed(2)} unit="K" />
            <ResultRow
              label="Water Boiling State"
              value={tempC >= 100 ? "Steam (Vapor)" : tempC <= 0 ? "Ice (Solid)" : "Liquid Water"}
            />
          </div>
        </div>
      </div>
    </ViewCard>
  );
}

/* -------------------------------------------------------------------------- */
/* 13. Vacuum Conversion Calculator                                           */
/* -------------------------------------------------------------------------- */
export function VacuumConvertView() {
  const [microns, setMicrons] = useState(500);

  const torr = microns / 1000;
  const pascal = microns * 0.133322;
  const mbar = microns * 0.00133322;

  let evaluation = "Optimal deep vacuum (Tight, dry system)";
  let evalColor = "text-emerald-400";
  if (microns > 1000) {
    evaluation = "Wet System / Major leak (Vacuum is poor)";
    evalColor = "text-rose-500 font-bold";
  } else if (microns > 500) {
    evaluation = "Moderate vacuum (Air and moisture remnants)";
    evalColor = "text-yellow-500";
  }

  return (
    <ViewCard
      title="Vacuum Converter"
      desc="Convert system vacuum depth from Microns to Torr, Pascal, and Millibar. A core technician utility."
    >
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <NumericInput
            label="Vacuum level in Microns"
            value={microns}
            onChange={setMicrons}
            unit="Microns"
            min={1}
            max={5000}
            step={20}
          />
        </div>

        <div className="bg-background/40 border border-border p-5 rounded-2xl space-y-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            Converted Vacuum Readings
          </div>
          <div className="space-y-2">
            <ResultRow label="Torr scale" value={torr.toFixed(4)} unit="Torr" />
            <ResultRow
              label="Pascal Absolute Pressure"
              value={pascal.toFixed(2)}
              unit="Pa"
              highlight
            />
            <ResultRow label="MilliBar scale" value={mbar.toFixed(5)} unit="mbar" />
            <div className="pt-2 border-t border-border mt-2">
              <div className="text-[10px] uppercase text-muted-foreground">
                Dehydration Quality Evaluation
              </div>
              <div className={`text-xs mt-1 font-semibold ${evalColor}`}>{evaluation}</div>
            </div>
          </div>
        </div>
      </div>
    </ViewCard>
  );
}

/* -------------------------------------------------------------------------- */
/* 14. Psychrometric Calculator                                               */
/* -------------------------------------------------------------------------- */
export function PsychrometricView() {
  const [dbC, setDbC] = useState(30); // Dry bulb Temp in Celsius
  const [rh, setRh] = useState(50); // Relative Humidity %

  // Simple approximations for psychrometric calculations
  // Dew Point approximation: Tdp = T - ((100 - RH)/5)
  const dewPoint = dbC - (100 - rh) / 5;
  // Wet bulb approximation: Twb = T * atan(0.151977 * (RH + 8.313659)^0.5) + atan(T + RH) - atan(RH - 1.676331) + 0.003918 * RH^1.5 * atan(0.023101 * RH) - 4.686035
  const wetBulb =
    dbC * Math.atan(0.151977 * Math.pow(rh + 8.313659, 0.5)) +
    Math.atan(dbC + rh) -
    Math.atan(rh - 1.676331) +
    0.003918 * Math.pow(rh, 1.5) * Math.atan(0.023101 * rh) -
    4.686035;

  return (
    <ViewCard
      title="Psychrometric Calculator"
      desc="Calculate dew point, wet bulb, and absolute humidity parameters from dry bulb temperature and relative humidity."
    >
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <NumericInput
            label="Dry Bulb Temp (°C)"
            value={dbC}
            onChange={setDbC}
            unit="°C"
            min={5}
            max={50}
          />
          <NumericInput
            label="Relative Humidity (%)"
            value={rh}
            onChange={setRh}
            unit="%"
            min={1}
            max={100}
          />
        </div>

        <div className="bg-background/40 border border-border p-5 rounded-2xl space-y-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            Thermodynamic Properties of Air
          </div>
          <div className="space-y-2">
            <ResultRow
              label="Dew Point Temperature"
              value={dewPoint.toFixed(1)}
              unit="°C"
              highlight
            />
            <ResultRow label="Wet Bulb Temperature" value={wetBulb.toFixed(1)} unit="°C" />
            <ResultRow
              label="Absolute Moisture Content"
              value={((rh / 100) * 15).toFixed(1)}
              unit="g/kg dry air"
            />
          </div>
        </div>
      </div>
    </ViewCard>
  );
}

/* -------------------------------------------------------------------------- */
/* 15. COP & EER Calculator                                                   */
/* -------------------------------------------------------------------------- */
export function CopEerConverterView() {
  const [eer, setEer] = useState(11.0);

  // COP = EER / 3.41214
  const cop = eer / 3.41214;
  const seer = eer * 1.15; // average SEER multiplier

  return (
    <ViewCard
      title="COP & EER Calculator"
      desc="Convert Energy Efficiency Ratio (EER) to Coefficient of Performance (COP) values."
    >
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <NumericInput
            label="EER Value"
            value={eer}
            onChange={setEer}
            unit="EER"
            min={5.0}
            max={20.0}
            step={0.1}
          />
        </div>

        <div className="bg-background/40 border border-border p-5 rounded-2xl space-y-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            Efficiency Metrics Conversion
          </div>
          <div className="space-y-2">
            <ResultRow
              label="Coefficient of Performance"
              value={cop.toFixed(2)}
              unit="COP"
              highlight
            />
            <ResultRow label="Seasonal SEER Equivalent" value={seer.toFixed(2)} unit="SEER" />
            <ResultRow
              label="Efficiency Grade"
              value={
                cop >= 4.0
                  ? "Grade A (Highly Efficient)"
                  : cop >= 3.0
                    ? "Grade B (Standard)"
                    : "Grade C (Low efficiency)"
              }
            />
          </div>
        </div>
      </div>
    </ViewCard>
  );
}

/* -------------------------------------------------------------------------- */
/* 16. Compressor Capacity Calculator                                          */
/* -------------------------------------------------------------------------- */
export function CompressorCapacityView() {
  const [displacement, setDisplacement] = useState(25); // cc
  const [rpm, setRpm] = useState(2900); // normal AC compressor RPM

  // Volumetric displacement (m3/h) = displacement (cc) * RPM * 60 / 1,000,000
  const displacementM3H = (displacement * rpm * 60) / 1000000;
  // Estimated cooling capacity (approximate for typical refrigerant densities: 2000 BTU/m3/h displacement)
  const capacityBtu = displacementM3H * 2200;

  return (
    <ViewCard
      title="Compressor Capacity Calculator"
      desc="Calculate theoretical compressor volumetric displacement and estimated refrigeration capacity."
    >
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <NumericInput
            label="Cylinder Displacement (cc)"
            value={displacement}
            onChange={setDisplacement}
            unit="cc"
            min={5}
            max={150}
          />
          <NumericInput
            label="Rotational Speed (RPM)"
            value={rpm}
            onChange={setRpm}
            unit="RPM"
            min={1000}
            max={6000}
            step={100}
          />
        </div>

        <div className="bg-background/40 border border-border p-5 rounded-2xl space-y-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            Calculated Performance
          </div>
          <div className="space-y-2">
            <ResultRow
              label="Volumetric Flow Displacement"
              value={displacementM3H.toFixed(2)}
              unit="m³/hr"
              highlight
            />
            <ResultRow
              label="Est. Cooling capacity"
              value={Math.round(capacityBtu).toLocaleString()}
              unit="BTU/hr"
            />
            <ResultRow
              label="AC Tonnage Equivalent"
              value={(capacityBtu / 12000).toFixed(2)}
              unit="Tons"
            />
          </div>
        </div>
      </div>
    </ViewCard>
  );
}

/* -------------------------------------------------------------------------- */
/* 17. Refrigerant Charge Calculator                                          */
/* -------------------------------------------------------------------------- */
export function RefrigerantChargeView() {
  const [length, setLength] = useState(25); // ft
  const [pipeSize, setPipeSize] = useState("3/8"); // inches

  // Base charge calculation multiplier in grams per foot for different liquid line sizes
  const sizes: Record<string, number> = {
    "1/4": 15, // 15 grams per foot
    "3/8": 30, // 30 grams per foot
    "1/2": 60, // 60 grams per foot
  };

  const multiplier = sizes[pipeSize] || 30;
  const chargeGrams = length * multiplier;
  const chargeOunces = chargeGrams * 0.035274;

  return (
    <ViewCard
      title="Refrigerant Charge Calculator"
      desc="Calculate the additional refrigerant charge required for long copper line sets."
    >
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <NumericInput
            label="Line Set Length (Feet)"
            value={length}
            onChange={setLength}
            unit="ft"
            min={5}
            max={250}
            step={5}
          />

          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground font-semibold block">
              Liquid Line Pipe Size
            </label>
            <select
              value={pipeSize}
              onChange={(e) => setPipeSize(e.target.value)}
              className="w-full rounded-lg border border-border bg-background/50 px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="1/4">1/4" OD (Small splits)</option>
              <option value="3/8">3/8" OD (Standard residential/commercial)</option>
              <option value="1/2">1/2" OD (High capacity VRF/Chillers)</option>
            </select>
          </div>
        </div>

        <div className="bg-background/40 border border-border p-5 rounded-2xl space-y-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            Additional Charge Required
          </div>
          <div className="text-4xl font-display font-bold text-primary">
            {chargeGrams.toLocaleString()}{" "}
            <span className="text-sm font-sans font-medium text-foreground">grams</span>
          </div>

          <div className="space-y-1">
            <ResultRow
              label="Equivalent Weight"
              value={chargeOunces.toFixed(2)}
              unit="oz"
              highlight
            />
            <ResultRow label="Base Line Factor" value={multiplier} unit="g/ft" />
            <ResultRow label="Pre-Charged Length Allowance" value="15" unit="ft (Typically)" />
          </div>
        </div>
      </div>
    </ViewCard>
  );
}

/* -------------------------------------------------------------------------- */
/* 18. Cooling Tower Approach Calculator                                       */
/* -------------------------------------------------------------------------- */
export function CoolingTowerApproachView() {
  const [inletTemp, setInletTemp] = useState(38); // °C (Hot water in)
  const [outletTemp, setOutletTemp] = useState(32); // °C (Cold water out)
  const [wetBulbTemp, setWetBulbTemp] = useState(27); // °C (Ambient Wet Bulb)

  const range = inletTemp - outletTemp;
  const approach = outletTemp - wetBulbTemp;
  const effectiveness = (range / (range + approach)) * 100;

  return (
    <ViewCard
      title="Cooling Tower Approach Sizer"
      desc="Calculate Approach, Range, and Effectiveness metrics to evaluate cooling tower performance."
    >
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <NumericInput
            label="Inlet Water Temp (Hot)"
            value={inletTemp}
            onChange={setInletTemp}
            unit="°C"
            min={20}
            max={60}
            step={0.5}
          />
          <NumericInput
            label="Outlet Water Temp (Cold)"
            value={outletTemp}
            onChange={setOutletTemp}
            unit="°C"
            min={15}
            max={50}
            step={0.5}
          />
          <NumericInput
            label="Ambient Wet Bulb Temp"
            value={wetBulbTemp}
            onChange={setWetBulbTemp}
            unit="°C"
            min={10}
            max={35}
            step={0.5}
          />
        </div>

        <div className="bg-background/40 border border-border p-5 rounded-2xl space-y-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            Calculated Performance
          </div>
          <div className="space-y-2">
            <ResultRow label="Range (Delta T)" value={range.toFixed(1)} unit="°C" />
            <ResultRow
              label="Approach (Difference)"
              value={approach.toFixed(1)}
              unit="°C"
              highlight
            />
            <ResultRow
              label="Thermal Effectiveness"
              value={isNaN(effectiveness) ? "0.0" : effectiveness.toFixed(1)}
              unit="%"
            />
            <ResultRow
              label="Performance Status"
              value={
                approach <= 2.8
                  ? "Optimal"
                  : approach <= 5.5
                    ? "Acceptable"
                    : "Maintenance Required"
              }
            />
          </div>
        </div>
      </div>
    </ViewCard>
  );
}

/* -------------------------------------------------------------------------- */
/* 19. SEER to EER & COP Converter                                            */
/* -------------------------------------------------------------------------- */
export function SeerEerCopView() {
  const [inputVal, setInputVal] = useState(14.0);
  const [type, setType] = useState<"seer" | "eer" | "cop">("seer");
  const [tons, setTons] = useState(1.5);
  const [hours, setHours] = useState(8);
  const [rate, setRate] = useState(8); // Rs. per kWh

  let seer = 0;
  let eer = 0;
  let cop = 0;

  if (type === "seer") {
    seer = inputVal;
    // EER = SEER * 0.875 (average real-world approximation)
    eer = seer * 0.875;
    cop = eer / 3.41214;
  } else if (type === "eer") {
    eer = inputVal;
    seer = eer / 0.875;
    cop = eer / 3.41214;
  } else {
    cop = inputVal;
    eer = cop * 3.41214;
    seer = eer / 0.875;
  }

  // Calculate annual running cost (assuming 250 days/year cooling)
  // Power (kW) = (Tons * 12000) / EER / 1000
  const powerKw = (tons * 12000) / eer / 1000;
  const dailyCost = powerKw * hours * rate;
  const annualCost = dailyCost * 250;

  return (
    <ViewCard
      title="SEER to EER & COP Converter"
      desc="Convert between SEER, EER, and COP ratings and estimate operating power cost."
    >
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground font-semibold block">
              Input Rating Type
            </label>
            <select
              value={type}
              onChange={(e) => {
                const newType = e.target.value as any;
                setType(newType);
                if (newType === "cop") setInputVal(3.2);
                else if (newType === "eer") setInputVal(11.0);
                else setInputVal(14.0);
              }}
              className="w-full rounded-lg border border-border bg-background/50 px-3 py-1.5 text-xs text-foreground focus:outline-none"
            >
              <option value="seer">SEER (Seasonal EER)</option>
              <option value="eer">EER (Energy Efficiency Ratio)</option>
              <option value="cop">COP (Coefficient of Performance)</option>
            </select>
          </div>

          <NumericInput
            label="Rating Value"
            value={inputVal}
            onChange={setInputVal}
            min={type === "cop" ? 1.5 : 5.0}
            max={type === "cop" ? 6.5 : 30.0}
            step={0.1}
          />

          <div className="border-t border-border/50 pt-4 space-y-4">
            <div className="text-xs font-bold text-primary uppercase">Operating Cost Estimator</div>
            <NumericInput
              label="AC Tonnage"
              value={tons}
              onChange={setTons}
              unit="Tons"
              min={0.5}
              max={10.0}
              step={0.5}
            />
            <NumericInput
              label="Hours Run Per Day"
              value={hours}
              onChange={setHours}
              unit="hrs"
              min={1}
              max={24}
            />
            <NumericInput
              label="Electricity Rate (INR/kWh)"
              value={rate}
              onChange={setRate}
              unit="₹/unit"
              min={1}
              max={25}
            />
          </div>
        </div>

        <div className="bg-background/40 border border-border p-5 rounded-2xl space-y-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            Equivalencies & Savings
          </div>
          <div className="space-y-2">
            <ResultRow label="SEER Rating" value={seer.toFixed(2)} highlight={type === "seer"} />
            <ResultRow label="EER Rating" value={eer.toFixed(2)} highlight={type === "eer"} />
            <ResultRow label="COP Rating" value={cop.toFixed(2)} highlight={type === "cop"} />
            <ResultRow label="Electrical Load Demand" value={powerKw.toFixed(2)} unit="kW" />
            <ResultRow
              label="Estimated Daily Running Cost"
              value={"₹" + Math.round(dailyCost).toLocaleString()}
              highlight
            />
            <ResultRow
              label="Est. Annual Running Cost"
              value={"₹" + Math.round(annualCost).toLocaleString()}
              highlight
            />
          </div>
        </div>
      </div>
    </ViewCard>
  );
}

/* -------------------------------------------------------------------------- */
/* 20. Air Velocity Calculator                                                */
/* -------------------------------------------------------------------------- */
export function AirVelocityView() {
  const [cfm, setCfm] = useState(1000);
  const [shape, setShape] = useState<"round" | "rectangular">("rectangular");
  const [width, setWidth] = useState(12);
  const [height, setHeight] = useState(12);
  const [diameter, setDiameter] = useState(12);

  // Area in square feet
  let areaSqFt = 0;
  if (shape === "rectangular") {
    areaSqFt = (width * height) / 144;
  } else {
    areaSqFt = (Math.PI * Math.pow(diameter / 2, 2)) / 144;
  }

  const velocityFpm = areaSqFt > 0 ? cfm / areaSqFt : 0;
  const velocityMps = velocityFpm * 0.00508;

  return (
    <ViewCard
      title="Air Velocity Calculator"
      desc="Calculate the air speed velocity in ductwork or diffusers based on volumetric flow rate (CFM) and dimensions."
    >
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <NumericInput
            label="Volumetric Airflow (CFM)"
            value={cfm}
            onChange={setCfm}
            unit="CFM"
            min={50}
            max={15000}
            step={50}
          />

          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground font-semibold block">Duct Shape</label>
            <div className="flex gap-2">
              <button
                onClick={() => setShape("rectangular")}
                className={`px-3 py-1 text-xs rounded-lg border transition ${
                  shape === "rectangular"
                    ? "bg-primary/20 border-primary text-primary"
                    : "border-border hover:bg-card"
                }`}
              >
                Rectangular
              </button>
              <button
                onClick={() => setShape("round")}
                className={`px-3 py-1 text-xs rounded-lg border transition ${
                  shape === "round"
                    ? "bg-primary/20 border-primary text-primary"
                    : "border-border hover:bg-card"
                }`}
              >
                Round / Circular
              </button>
            </div>
          </div>

          {shape === "rectangular" ? (
            <div className="grid grid-cols-2 gap-4">
              <NumericInput
                label="Duct Width (inches)"
                value={width}
                onChange={setWidth}
                unit="in"
                min={3}
                max={120}
              />
              <NumericInput
                label="Duct Height (inches)"
                value={height}
                onChange={setHeight}
                unit="in"
                min={3}
                max={120}
              />
            </div>
          ) : (
            <NumericInput
              label="Duct Diameter (inches)"
              value={diameter}
              onChange={setDiameter}
              unit="in"
              min={3}
              max={120}
            />
          )}
        </div>

        <div className="bg-background/40 border border-border p-5 rounded-2xl space-y-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            Calculated Velocity
          </div>
          <div className="space-y-2">
            <ResultRow label="Duct Cross-Sectional Area" value={areaSqFt.toFixed(3)} unit="sq ft" />
            <ResultRow
              label="Duct Cross-Sectional Area"
              value={(areaSqFt * 0.0929).toFixed(3)}
              unit="sq m"
            />
            <ResultRow
              label="Air Velocity (FPM)"
              value={Math.round(velocityFpm).toLocaleString()}
              unit="FPM"
              highlight
            />
            <ResultRow
              label="Air Velocity (M/S)"
              value={velocityMps.toFixed(2)}
              unit="m/s"
              highlight
            />
          </div>
          <div className="rounded-lg bg-primary/5 border border-primary/20 p-3 text-[10px] text-muted-foreground leading-relaxed">
            <strong>Duct Design Guideline:</strong> Keep duct velocity between 800 - 1200 FPM for
            commercial branch lines, and 1200 - 1800 FPM for main supply trunks to minimize noise
            and static pressure resistance.
          </div>
        </div>
      </div>
    </ViewCard>
  );
}

/* -------------------------------------------------------------------------- */
/* 21. Monthly Electricity Cost Calculator                                    */
/* -------------------------------------------------------------------------- */
export function ElectricityCostView() {
  const [kw, setKw] = useState(2.0);
  const [hours, setHours] = useState(8);
  const [days, setDays] = useState(30);
  const [tariff, setTariff] = useState(8.5);
  const [compressorType, setCompressorType] = useState<"fixed" | "inverter">("inverter");

  // Inverter runs at variable capacities, taking average 70% energy load compared to peak nameplate capacity
  const scalingFactor = compressorType === "inverter" ? 0.7 : 1.0;

  const dailyKwh = kw * hours * scalingFactor;
  const monthlyKwh = dailyKwh * days;
  const monthlyCost = monthlyKwh * tariff;
  const annualCost = monthlyCost * 12;
  // Standard Indian grid CO2 index is roughly 0.82 kg CO2 per kWh
  const carbonFootprint = monthlyKwh * 12 * 0.82;

  return (
    <ViewCard
      title="Power Consumption & Bill Calculator"
      desc="Estimate the monthly operational energy bills and carbon footprint of HVAC/R compressors or electrical equipment."
    >
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <NumericInput
            label="Equipment Power Rating (kW)"
            value={kw}
            onChange={setKw}
            unit="kW"
            min={0.1}
            max={150.0}
            step={0.5}
          />
          <NumericInput
            label="Daily Running Hours"
            value={hours}
            onChange={setHours}
            unit="hrs"
            min={1}
            max={24}
          />
          <NumericInput
            label="Monthly Operating Days"
            value={days}
            onChange={setDays}
            unit="days"
            min={1}
            max={31}
          />
          <NumericInput
            label="Electricity Tariff Rate"
            value={tariff}
            onChange={setTariff}
            unit="₹/unit"
            min={1.0}
            max={25.0}
            step={0.5}
          />

          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground font-semibold block">
              Compressor Sizing Modulator
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setCompressorType("inverter")}
                className={`px-3 py-1 text-xs rounded-lg border transition ${
                  compressorType === "inverter"
                    ? "bg-primary/20 border-primary text-primary"
                    : "border-border hover:bg-card"
                }`}
              >
                Inverter (Variable Modulation)
              </button>
              <button
                onClick={() => setCompressorType("fixed")}
                className={`px-3 py-1 text-xs rounded-lg border transition ${
                  compressorType === "fixed"
                    ? "bg-primary/20 border-primary text-primary"
                    : "border-border hover:bg-card"
                }`}
              >
                Fixed Speed (Full Draw Cycles)
              </button>
            </div>
          </div>
        </div>

        <div className="bg-background/40 border border-border p-5 rounded-2xl space-y-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            Consumption Diagnostics
          </div>
          <div className="space-y-2">
            <ResultRow label="Energy Drawn Per Day" value={dailyKwh.toFixed(2)} unit="kWh" />
            <ResultRow
              label="Estimated Monthly Consumption"
              value={monthlyKwh.toFixed(1)}
              unit="kWh"
            />
            <ResultRow
              label="Estimated Monthly Bill"
              value={"₹" + Math.round(monthlyCost).toLocaleString()}
              highlight
            />
            <ResultRow
              label="Estimated Annual Bill"
              value={"₹" + Math.round(annualCost).toLocaleString()}
              highlight
            />
            <ResultRow
              label="Estimated CO₂ Footprint"
              value={Math.round(carbonFootprint).toLocaleString()}
              unit="kg CO₂/yr"
            />
          </div>
          <div className="rounded-lg bg-primary/5 border border-primary/20 p-3 text-[10px] text-muted-foreground leading-relaxed">
            <strong>Power Tip:</strong> Inverter compressors reduce monthly bills by adjusting speed
            based on load spikes rather than turning off/on, preventing start-up current surges.
          </div>
        </div>
      </div>
    </ViewCard>
  );
}

/* -------------------------------------------------------------------------- */
/* 22. Voltage Drop Calculator                                                */
/* -------------------------------------------------------------------------- */
export function VoltageDropView() {
  const [phase, setPhase] = useState<"single" | "three">("single");
  const [voltage, setVoltage] = useState(230);
  const [length, setLength] = useState(50);
  const [current, setCurrent] = useState(16);
  const [material, setMaterial] = useState<"copper" | "aluminum">("copper");
  const [wireSize, setWireSize] = useState(4); // default 4 sq mm

  const sizes = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50];

  // Specific resistivity (rho) in Ohm * mm^2 / meter at 75°C standard cable run
  const resistivity = material === "copper" ? 0.0178 : 0.0282;

  // Resistance = resistivity * length / cross-sectional area
  const wireResistance = (resistivity * length) / wireSize;

  // Voltage drop formula:
  // Single phase: Vd = 2 * R * I
  // Three phase: Vd = sqrt(3) * R * I
  const voltageDrop =
    phase === "single" ? 2 * wireResistance * current : Math.sqrt(3) * wireResistance * current;

  const dropPercent = (voltageDrop / voltage) * 100;
  const finalVoltage = Math.max(0, voltage - voltageDrop);

  const meetsStandard = dropPercent <= 3.0;

  return (
    <ViewCard
      title="Electrical Voltage Drop Calculator"
      desc="Calculate the voltage drop over long electrical wire runs to prevent compressor relay trip-outs and motor overheating."
    >
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground font-semibold block">Phase Type</label>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setPhase("single");
                  setVoltage(230);
                }}
                className={`px-3 py-1 text-xs rounded-lg border transition ${
                  phase === "single"
                    ? "bg-primary/20 border-primary text-primary"
                    : "border-border hover:bg-card"
                }`}
              >
                1-Phase (Single Line)
              </button>
              <button
                onClick={() => {
                  setPhase("three");
                  setVoltage(415);
                }}
                className={`px-3 py-1 text-xs rounded-lg border transition ${
                  phase === "three"
                    ? "bg-primary/20 border-primary text-primary"
                    : "border-border hover:bg-card"
                }`}
              >
                3-Phase (Industrial Line)
              </button>
            </div>
          </div>

          <NumericInput
            label="Target Line Voltage"
            value={voltage}
            onChange={setVoltage}
            unit="V"
            min={110}
            max={600}
            step={5}
          />
          <NumericInput
            label="Line Run Length"
            value={length}
            onChange={setLength}
            unit="meters"
            min={1}
            max={500}
            step={5}
          />
          <NumericInput
            label="Current Load Demand"
            value={current}
            onChange={setCurrent}
            unit="Amps"
            min={1}
            max={300}
            step={1}
          />

          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground font-semibold block">
              Wire Conductor Material
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setMaterial("copper")}
                className={`px-3 py-1 text-xs rounded-lg border transition ${
                  material === "copper"
                    ? "bg-primary/20 border-primary text-primary"
                    : "border-border hover:bg-card"
                }`}
              >
                Copper (Cu)
              </button>
              <button
                onClick={() => setMaterial("aluminum")}
                className={`px-3 py-1 text-xs rounded-lg border transition ${
                  material === "aluminum"
                    ? "bg-primary/20 border-primary text-primary"
                    : "border-border hover:bg-card"
                }`}
              >
                Aluminum (Al)
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground font-semibold block">
              Wire Size Cross-Section
            </label>
            <select
              value={wireSize}
              onChange={(e) => setWireSize(parseFloat(e.target.value))}
              className="w-full rounded-lg border border-border bg-background/50 px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {sizes.map((sz) => (
                <option key={sz} value={sz}>
                  {sz} mm²
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-background/40 border border-border p-5 rounded-2xl space-y-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            Drop Diagnostics
          </div>
          <div className="space-y-2">
            <ResultRow
              label="Conductor Resistivity (ρ)"
              value={resistivity.toFixed(5)}
              unit="Ω·mm²/m"
            />
            <ResultRow label="Cable Resistance (R)" value={wireResistance.toFixed(4)} unit="Ω" />
            <ResultRow
              label="Calculated Voltage Drop"
              value={voltageDrop.toFixed(2)}
              unit="V"
              highlight={!meetsStandard}
            />
            <ResultRow
              label="Voltage Drop Percentage"
              value={dropPercent.toFixed(2) + "%"}
              highlight={!meetsStandard}
            />
            <ResultRow
              label="Terminal Voltage at Equipment"
              value={finalVoltage.toFixed(1)}
              unit="V"
            />
            <div className="pt-2 border-t border-border/40 flex justify-between items-center text-xs">
              <span className="text-muted-foreground">NEC Compliance (&lt; 3%):</span>
              {meetsStandard ? (
                <span className="text-emerald-400 font-bold">PASS</span>
              ) : (
                <span className="text-red-400 font-bold">FAIL (Cable too thin)</span>
              )}
            </div>
          </div>
          <div className="rounded-lg bg-primary/5 border border-primary/20 p-3 text-[10px] text-muted-foreground leading-relaxed">
            <strong>Electrical Hazard Tip:</strong> Running a compressor at sub-voltage triggers
            high running amps, which burns out starter capacitors, damages windings, and trips
            internal overload sensors.
          </div>
        </div>
      </div>
    </ViewCard>
  );
}
