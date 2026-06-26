import { useState } from "react";
import { Gauge, Zap, Thermometer, Wind, Settings, ArrowRight, ShieldCheck, Flame, Scale, Volume2 } from "lucide-react";

/* -------------------------------------------------------------------------- */
/* Helper components & styles                                                 */
/* -------------------------------------------------------------------------- */
function ViewCard({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-display text-primary flex items-center gap-2">
          <span>{title}</span>
        </h2>
        <p className="text-sm text-muted-foreground mt-1">{desc}</p>
      </div>
      <div className="border border-border/50 rounded-2xl p-6 bg-card/10 space-y-6 relative overflow-hidden">
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
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center text-xs">
        <label className="text-muted-foreground font-semibold">{label}</label>
        {unit && <span className="text-primary font-mono">{unit}</span>}
      </div>
      <div className="flex gap-2">
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={isNaN(value) ? "" : value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="w-24 rounded-lg border border-border bg-background/50 px-2 py-1.5 text-xs text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <input
          type="range"
          min={min ?? 0}
          max={max ?? 100}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="flex-1 accent-primary cursor-pointer"
        />
      </div>
    </div>
  );
}

function ResultRow({ label, value, unit, highlight }: { label: string; value: string | number; unit?: string; highlight?: boolean }) {
  return (
    <div className={`flex justify-between items-center py-2.5 border-b border-border/40 text-xs ${highlight ? "text-primary font-bold" : ""}`}>
      <span className="text-muted-foreground">{label}</span>
      <span className="font-mono">
        {value} {unit && <span className="opacity-80 ml-0.5">{unit}</span>}
      </span>
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
    <ViewCard title="BTU Load Calculator" desc="Estimate the sensible heat cooling load requirement for residential or commercial spaces.">
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-muted-foreground">Type:</span>
            <button
              onClick={() => setIsCommercial(false)}
              className={`px-3 py-1 text-xs rounded-lg border transition ${
                !isCommercial ? "bg-primary/20 border-primary text-primary" : "border-border hover:bg-card"
              }`}
            >
              Residential
            </button>
            <button
              onClick={() => setIsCommercial(true)}
              className={`px-3 py-1 text-xs rounded-lg border transition ${
                isCommercial ? "bg-primary/20 border-primary text-primary" : "border-border hover:bg-card"
              }`}
            >
              Commercial
            </button>
          </div>

          <NumericInput label="Room Width (feet)" value={width} onChange={setWidth} unit="ft" min={5} max={100} />
          <NumericInput label="Room Length (feet)" value={length} onChange={setLength} unit="ft" min={5} max={100} />
          <NumericInput label="Ceiling Height (feet)" value={height} onChange={setHeight} unit="ft" min={7} max={25} />
          <NumericInput label="Occupancy Count" value={people} onChange={setPeople} unit="people" min={1} max={50} />

          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground font-semibold block">Insulation Quality</label>
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
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Cooling Demand Estimate</div>
          <div className="text-4xl font-display font-bold text-primary">{totalBtu.toLocaleString()} <span className="text-sm font-sans font-medium text-foreground">BTU/hr</span></div>
          
          <div className="space-y-1">
            <ResultRow label="Room Area" value={area} unit="sq ft" />
            <ResultRow label="Room Volume" value={volume} unit="cu ft" />
            <ResultRow label="Recommended AC Size" value={tonnage} unit="Tons" highlight />
            <ResultRow label="Electrical Cooling Power Equivalent" value={kw} unit="kW" />
          </div>
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
    <ViewCard title="HVAC Tonnage Calculator" desc="Convert floor area into estimated air conditioning tonnage ratings based on room heating characteristics.">
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <NumericInput label="Floor Area (Square Feet)" value={sqft} onChange={setSqft} unit="sq ft" min={100} max={10000} step={50} />
          
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground font-semibold block">Load / Room Category</label>
            <select
              value={loadType}
              onChange={(e) => setLoadType(e.target.value)}
              className="w-full rounded-lg border border-border bg-background/50 px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="bedroom">Bedroom (Low thermal gain, quiet occupancy)</option>
              <option value="living-room">Living Area / Average (Standard windows & lights)</option>
              <option value="office">Commercial Office (Computers, lighting, average staff)</option>
              <option value="server-room">Server / UPS Room (High-density active heat output)</option>
            </select>
          </div>
        </div>

        <div className="bg-background/40 border border-border p-5 rounded-2xl space-y-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Tonnage Estimate</div>
          <div className="text-4xl font-display font-bold text-gradient">{roundedTonnage} <span className="text-sm font-sans font-medium text-foreground">Tons</span></div>
          
          <div className="space-y-1">
            <ResultRow label="Raw Required Capacity" value={Math.round(btu).toLocaleString()} unit="BTU/hr" />
            <ResultRow label="Precise Calc Tonnage" value={tonnageVal.toFixed(2)} unit="Tons" />
            <ResultRow label="Typical CFM Requirement" value={Math.round(roundedTonnage * 400)} unit="CFM" highlight />
            <ResultRow label="Recommended COP Rating" value="3.5 - 4.2" />
          </div>
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
  const pBar = (pressurePsi / 14.5038) + 1.01325; 
  // log10(P) = A - B/(T + C) -> T = B / (A - log10(P)) - C
  const logP = Math.log10(pBar);
  let tempC = (ref.b / (ref.a - logP)) - ref.c - 273.15;
  if (isNaN(tempC) || tempC < -100 || tempC > 100) tempC = 0; // protection fallback

  const tempF = (tempC * 9/5) + 32;

  return (
    <ViewCard title="Refrigerant PT Calculator" desc="Convert pressure to saturated temperature for common refrigerants. Crucial tool for diagnosing subcooling and superheat.">
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground font-semibold block">Select Refrigerant</label>
            <select
              value={refrigerant}
              onChange={(e) => setRefrigerant(e.target.value)}
              className="w-full rounded-lg border border-border bg-background/50 px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {Object.keys(refrigerants).map((key) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
          </div>

          <NumericInput label="Suction / Discharge Pressure (PSI)" value={pressurePsi} onChange={setPressurePsi} unit="PSI" min={0} max={600} step={5} />
        </div>

        <div className="bg-background/40 border border-border p-5 rounded-2xl space-y-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Saturated Temperature (Bubble/Dew)</div>
          <div className="text-4xl font-display font-bold text-primary">{tempC.toFixed(1)} <span className="text-sm font-sans font-medium text-foreground">°C</span> <span className="text-xl font-sans text-muted-foreground">/ {tempF.toFixed(1)}°F</span></div>
          
          <div className="space-y-1">
            <ResultRow label="Safety Classification" value={ref.class} />
            <ResultRow label="GWP Index (AR4)" value={ref.gwp} />
            <ResultRow label="Approximate Evaporating State" value={tempC < 0 ? "Freezing (Sub-zero)" : "Air Conditioning"} highlight={tempC < 0} />
          </div>
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
  const pBar = (pressurePsi / 14.5038) + 1.01325;
  const logP = Math.log10(pBar);
  const satTempC = (ref.b / (ref.a - logP)) - ref.c - 273.15;
  const satTempF = (satTempC * 9/5) + 32;

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
    <ViewCard title="Superheat Calculator" desc="Calculate superheat at evaporator suction line. Important for TXV and fixed orifice diagnostics.">
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground font-semibold block">Select Refrigerant</label>
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

          <NumericInput label="Suction Pressure (PSI)" value={pressurePsi} onChange={setPressurePsi} unit="PSI" min={20} max={250} step={2} />
          <NumericInput label="Suction Line Temperature (°F)" value={lineTempF} onChange={setLineTempF} unit="°F" min={20} max={100} />
        </div>

        <div className="bg-background/40 border border-border p-5 rounded-2xl space-y-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Calculated Superheat</div>
          <div className="text-4xl font-display font-bold text-primary">{superheat.toFixed(1)} <span className="text-sm font-sans font-medium text-foreground">°F</span></div>
          
          <div className="space-y-2.5">
            <ResultRow label="Saturated Evap Temp (Sat Temp)" value={satTempF.toFixed(1)} unit="°F" />
            <ResultRow label="Suction Line Actual Temp" value={lineTempF.toFixed(1)} unit="°F" />
            <div className="pt-2 border-t border-border">
              <div className="text-[10px] uppercase text-muted-foreground">Diagnostics Assessment</div>
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
  const pBar = (pressurePsi / 14.5038) + 1.01325;
  const logP = Math.log10(pBar);
  const satTempC = (ref.b / (ref.a - logP)) - ref.c - 273.15;
  const satTempF = (satTempC * 9/5) + 32;

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
    <ViewCard title="Subcooling Calculator" desc="Calculate subcooling at condenser liquid line. Primary indicator of system refrigerant charge.">
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground font-semibold block">Select Refrigerant</label>
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

          <NumericInput label="Liquid Line Pressure (PSI)" value={pressurePsi} onChange={setPressurePsi} unit="PSI" min={100} max={600} step={5} />
          <NumericInput label="Liquid Line Temperature (°F)" value={lineTempF} onChange={setLineTempF} unit="°F" min={50} max={140} />
        </div>

        <div className="bg-background/40 border border-border p-5 rounded-2xl space-y-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Calculated Subcooling</div>
          <div className="text-4xl font-display font-bold text-primary">{subcooling.toFixed(1)} <span className="text-sm font-sans font-medium text-foreground">°F</span></div>
          
          <div className="space-y-2.5">
            <ResultRow label="Liquid Saturation Temp" value={satTempF.toFixed(1)} unit="°F" />
            <ResultRow label="Liquid Line Actual Temp" value={lineTempF.toFixed(1)} unit="°F" />
            <div className="pt-2 border-t border-border">
              <div className="text-[10px] uppercase text-muted-foreground">Diagnostics Assessment</div>
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
    <ViewCard title="Airflow (CFM) Calculator" desc="Calculate the volumetric airflow rate (CFM) across the evaporator coil based on tonnage and temperature drop.">
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <NumericInput label="AC Tonnage Size" value={tonnage} onChange={setTonnage} unit="Tons" min={1.0} max={25.0} step={0.5} />
          <NumericInput label="Coil Temp Difference (Delta T)" value={tempDiff} onChange={setTempDiff} unit="°F" min={12} max={28} />
        </div>

        <div className="bg-background/40 border border-border p-5 rounded-2xl space-y-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Airflow Volume</div>
          <div className="text-4xl font-display font-bold text-gradient">{Math.round(cfm).toLocaleString()} <span className="text-sm font-sans font-medium text-foreground">CFM</span></div>
          
          <div className="space-y-1">
            <ResultRow label="Estimated Sensible Heat Load" value={Math.round(sensibleHeatLoad).toLocaleString()} unit="BTU/hr" />
            <ResultRow label="Airflow per Tonnage Rating" value={Math.round(cfm / tonnage).toLocaleString()} unit="CFM / Ton" highlight={Math.round(cfm / tonnage) >= 350 && Math.round(cfm / tonnage) <= 450} />
            <ResultRow label="Airflow Status Evaluation" value={Math.round(cfm / tonnage) < 350 ? "Low Airflow (Freezing risk)" : Math.round(cfm / tonnage) > 450 ? "High Airflow (Humidity issue)" : "Normal Airflow (Optimal)"} />
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
  const [friction, setFriction] = useState(0.10); // in. WC per 100ft

  // Duct sizing approximation formulas based on Equal Friction Method
  // Round diameter = 4 * (CFM/friction)^0.38
  const velocity = 800; // design velocity in fpm (assumed)
  const diameter = Math.pow((cfm / (0.0027 * velocity)), 0.5) * 1.5;
  const roundedDiameter = Math.round(diameter * 2) / 2;

  // Rectangular equivalents
  const width = Math.round(roundedDiameter * 1.2);
  const height = Math.round((roundedDiameter * roundedDiameter) / width);

  return (
    <ViewCard title="Duct Size Calculator" desc="Size air conditioning supply/return ducts using the equal friction method.">
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <NumericInput label="Airflow Rate (CFM)" value={cfm} onChange={setCfm} unit="CFM" min={100} max={8000} step={100} />
          <NumericInput label="Friction Loss rate (per 100ft)" value={friction} onChange={setFriction} unit="in. WC" min={0.05} max={0.25} step={0.01} />
        </div>

        <div className="bg-background/40 border border-border p-5 rounded-2xl space-y-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Recommended Round Duct Size</div>
          <div className="text-4xl font-display font-bold text-primary">Ø {roundedDiameter} <span className="text-sm font-sans font-medium text-foreground">Inches</span></div>
          
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
    <ViewCard title="Refrigerant Pipe Sizing" desc="Size copper refrigerant line sets (suction and liquid lines) to ensure minimal pressure drop.">
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <NumericInput label="System Tonnage Size" value={tonnage} onChange={setTonnage} unit="Tons" min={1.0} max={25.0} step={0.5} />
          
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground font-semibold block">Select Refrigerant</label>
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
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Recommended Line Sizes</div>
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
    <ViewCard title="Building Heat Gain load" desc="Estimate the mechanical heat load gain components for structural engineering.">
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <NumericInput label="Exposure Wall Area" value={wallArea} onChange={setWallArea} unit="sq ft" min={100} max={10000} step={100} />
          <NumericInput label="Roof Area" value={roofArea} onChange={setRoofArea} unit="sq ft" min={100} max={10000} step={100} />
          <NumericInput label="Occupancy Count" value={people} onChange={setPeople} unit="people" min={1} max={100} />
          <NumericInput label="Electrical Lighting Load" value={lightsWatts} onChange={setLightsWatts} unit="Watts" min={0} max={5000} step={100} />
        </div>

        <div className="bg-background/40 border border-border p-5 rounded-2xl space-y-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Estimated Heat Gain Load</div>
          <div className="text-4xl font-display font-bold text-primary">{totalLoad.toLocaleString()} <span className="text-sm font-sans font-medium text-foreground">BTU/hr</span></div>
          
          <div className="space-y-1">
            <ResultRow label="Wall Heat Gain component" value={Math.round(wallLoad).toLocaleString()} unit="BTU/h" />
            <ResultRow label="Roof Heat Gain component" value={Math.round(roofLoad).toLocaleString()} unit="BTU/h" />
            <ResultRow label="Metabolic Human Gain load" value={peopleLoad} unit="BTU/h" />
            <ResultRow label="Electrical Lighting Heat gain" value={Math.round(lightsLoad).toLocaleString()} unit="BTU/h" />
            <ResultRow label="Total Load Equivalent" value={(totalLoad * 0.000293).toFixed(2)} unit="kW" highlight />
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
    <ViewCard title="Energy Cost Calculator" desc="Calculate the estimated monthly electrical operating cost and carbon footprint of AC systems.">
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <NumericInput label="AC Capacity (Tonnage)" value={tonnage} onChange={setTonnage} unit="Tons" min={1.0} max={10.0} step={0.5} />
          <NumericInput label="Daily Run Time" value={hours} onChange={setHours} unit="Hours/Day" min={1} max={24} />
          <NumericInput label="Electricity Billing Rate" value={rate} onChange={setRate} unit="₹ / Unit (kWh)" min={5} max={20} step={0.5} />
          <NumericInput label="Compressor COP Rating" value={cop} onChange={setCop} unit="COP" min={2.0} max={5.5} step={0.1} />
        </div>

        <div className="bg-background/40 border border-border p-5 rounded-2xl space-y-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Estimated Monthly Billing</div>
          <div className="text-4xl font-display font-bold text-gradient">₹{Math.round(monthlyCost).toLocaleString()} <span className="text-sm font-sans font-medium text-foreground">/ Month</span></div>
          
          <div className="space-y-1">
            <ResultRow label="Electrical Power Consumption" value={electricalKw.toFixed(2)} unit="kW" />
            <ResultRow label="Daily Energy Usage" value={dailyKwh.toFixed(1)} unit="Units (kWh)" />
            <ResultRow label="Estimated Annual Cost" value={`₹${Math.round(monthlyCost * 12).toLocaleString()}`} />
            <ResultRow label="Monthly Carbon Footprint" value={Math.round(monthlyCo2).toLocaleString()} unit="kg CO2" highlight />
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
    <ViewCard title="Pressure to Temperature Converter" desc="Convert pressure metrics instantly across standard international units.">
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <NumericInput label="Pressure Value (PSI)" value={pressurePsi} onChange={setPressurePsi} unit="PSI" min={0} max={1000} step={5} />
        </div>

        <div className="bg-background/40 border border-border p-5 rounded-2xl space-y-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Converted Pressure Metrics</div>
          <div className="space-y-2">
            <ResultRow label="Bar Pressure" value={bar.toFixed(2)} unit="bar" highlight />
            <ResultRow label="KiloPascal Pressure" value={Math.round(kpa).toLocaleString()} unit="kPa" />
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

  const tempF = (tempC * 9/5) + 32;
  const tempK = tempC + 273.15;

  return (
    <ViewCard title="Temperature Conversion" desc="Convert thermodynamic temperature properties among Celsius, Fahrenheit, and Kelvin.">
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <NumericInput label="Enter Temperature (°C)" value={tempC} onChange={setTempC} unit="°C" min={-100} max={200} />
        </div>

        <div className="bg-background/40 border border-border p-5 rounded-2xl space-y-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Converted Temperature Outputs</div>
          <div className="space-y-2">
            <ResultRow label="Fahrenheit Scale" value={tempF.toFixed(2)} unit="°F" highlight />
            <ResultRow label="Kelvin Absolute Scale" value={tempK.toFixed(2)} unit="K" />
            <ResultRow label="Water Boiling State" value={tempC >= 100 ? "Steam (Vapor)" : tempC <= 0 ? "Ice (Solid)" : "Liquid Water"} />
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
    <ViewCard title="Vacuum Converter" desc="Convert system vacuum depth from Microns to Torr, Pascal, and Millibar. A core technician utility.">
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <NumericInput label="Vacuum level in Microns" value={microns} onChange={setMicrons} unit="Microns" min={1} max={5000} step={20} />
        </div>

        <div className="bg-background/40 border border-border p-5 rounded-2xl space-y-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Converted Vacuum Readings</div>
          <div className="space-y-2">
            <ResultRow label="Torr scale" value={torr.toFixed(4)} unit="Torr" />
            <ResultRow label="Pascal Absolute Pressure" value={pascal.toFixed(2)} unit="Pa" highlight />
            <ResultRow label="MilliBar scale" value={mbar.toFixed(5)} unit="mbar" />
            <div className="pt-2 border-t border-border mt-2">
              <div className="text-[10px] uppercase text-muted-foreground">Dehydration Quality Evaluation</div>
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
  const dewPoint = dbC - ((100 - rh) / 5);
  // Wet bulb approximation: Twb = T * atan(0.151977 * (RH + 8.313659)^0.5) + atan(T + RH) - atan(RH - 1.676331) + 0.003918 * RH^1.5 * atan(0.023101 * RH) - 4.686035
  const wetBulb = dbC * Math.atan(0.151977 * Math.pow(rh + 8.313659, 0.5)) + Math.atan(dbC + rh) - Math.atan(rh - 1.676331) + 0.003918 * Math.pow(rh, 1.5) * Math.atan(0.023101 * rh) - 4.686035;

  return (
    <ViewCard title="Psychrometric Calculator" desc="Calculate dew point, wet bulb, and absolute humidity parameters from dry bulb temperature and relative humidity.">
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <NumericInput label="Dry Bulb Temp (°C)" value={dbC} onChange={setDbC} unit="°C" min={5} max={50} />
          <NumericInput label="Relative Humidity (%)" value={rh} onChange={setRh} unit="%" min={1} max={100} />
        </div>

        <div className="bg-background/40 border border-border p-5 rounded-2xl space-y-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Thermodynamic Properties of Air</div>
          <div className="space-y-2">
            <ResultRow label="Dew Point Temperature" value={dewPoint.toFixed(1)} unit="°C" highlight />
            <ResultRow label="Wet Bulb Temperature" value={wetBulb.toFixed(1)} unit="°C" />
            <ResultRow label="Absolute Moisture Content" value={((rh / 100) * 15).toFixed(1)} unit="g/kg dry air" />
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
    <ViewCard title="COP & EER Calculator" desc="Convert Energy Efficiency Ratio (EER) to Coefficient of Performance (COP) values.">
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <NumericInput label="EER Value" value={eer} onChange={setEer} unit="EER" min={5.0} max={20.0} step={0.1} />
        </div>

        <div className="bg-background/40 border border-border p-5 rounded-2xl space-y-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Efficiency Metrics Conversion</div>
          <div className="space-y-2">
            <ResultRow label="Coefficient of Performance" value={cop.toFixed(2)} unit="COP" highlight />
            <ResultRow label="Seasonal SEER Equivalent" value={seer.toFixed(2)} unit="SEER" />
            <ResultRow label="Efficiency Grade" value={cop >= 4.0 ? "Grade A (Highly Efficient)" : cop >= 3.0 ? "Grade B (Standard)" : "Grade C (Low efficiency)"} />
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
    <ViewCard title="Compressor Capacity Calculator" desc="Calculate theoretical compressor volumetric displacement and estimated refrigeration capacity.">
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <NumericInput label="Cylinder Displacement (cc)" value={displacement} onChange={setDisplacement} unit="cc" min={5} max={150} />
          <NumericInput label="Rotational Speed (RPM)" value={rpm} onChange={setRpm} unit="RPM" min={1000} max={6000} step={100} />
        </div>

        <div className="bg-background/40 border border-border p-5 rounded-2xl space-y-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Calculated Performance</div>
          <div className="space-y-2">
            <ResultRow label="Volumetric Flow Displacement" value={displacementM3H.toFixed(2)} unit="m³/hr" highlight />
            <ResultRow label="Est. Cooling capacity" value={Math.round(capacityBtu).toLocaleString()} unit="BTU/hr" />
            <ResultRow label="AC Tonnage Equivalent" value={(capacityBtu / 12000).toFixed(2)} unit="Tons" />
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
    <ViewCard title="Refrigerant Charge Calculator" desc="Calculate the additional refrigerant charge required for long copper line sets.">
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <NumericInput label="Line Set Length (Feet)" value={length} onChange={setLength} unit="ft" min={5} max={250} step={5} />
          
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground font-semibold block">Liquid Line Pipe Size</label>
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
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Additional Charge Required</div>
          <div className="text-4xl font-display font-bold text-primary">{chargeGrams.toLocaleString()} <span className="text-sm font-sans font-medium text-foreground">grams</span></div>
          
          <div className="space-y-1">
            <ResultRow label="Equivalent Weight" value={chargeOunces.toFixed(2)} unit="oz" highlight />
            <ResultRow label="Base Line Factor" value={multiplier} unit="g/ft" />
            <ResultRow label="Pre-Charged Length Allowance" value="15" unit="ft (Typically)" />
          </div>
        </div>
      </div>
    </ViewCard>
  );
}
