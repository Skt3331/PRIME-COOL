import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ShieldCheck, AlertTriangle, HelpCircle, Thermometer, Wind, Zap, Settings, Award } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getCmsSettings } from "../../lib/api";

/* -------------------------------------------------------------------------- */
/* Helper components & styles                                                 */
/* -------------------------------------------------------------------------- */
function ArticleLayout({ title, category, children }: { title: string; category: string; children: React.ReactNode }) {
  const { data } = useQuery({
    queryKey: ["cmsSettings"],
    queryFn: () => getCmsSettings(),
  });
  const cms = data?.settings;
  const phone = cms?.socials?.phone || "+917507408461";

  return (
    <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
      <div>
        <span className="text-xs uppercase font-bold text-primary tracking-wider">{category}</span>
        <h1 className="text-3xl font-bold font-display text-foreground mt-1 leading-tight">{title}</h1>
      </div>
      <article className="space-y-5 pt-4 border-t border-border/40">
        {children}
      </article>
      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 mt-8 flex items-start gap-3">
        <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
        <div className="text-xs">
          <strong>Need professional assistance?</strong>
          <p className="mt-1 text-muted-foreground">Saurav Temgire (Lead Engineer at Prime Cool) coordinates rapid-response HVAC, Chiller, and Cold Storage maintenance along the Wagholi–Shirur corridor. <a href={`tel:${phone.replace(/\s+/g, "")}`} className="text-primary hover:underline font-semibold">Call {phone}</a> to schedule a visit.</p>
        </div>
      </div>
    </div>
  );
}

function PtTable({ name, startTemp, endTemp, refData }: { name: string; startTemp: number; endTemp: number; refData: { b: number; a: number; c: number } }) {
  const [unit, setUnit] = useState<"PSI" | "bar">("PSI");
  const rows = [];

  for (let t = startTemp; t <= endTemp; t += 5) {
    const tK = t + 273.15;
    // Antoine equation log10(P) = A - B/(T + C)
    const logP = refData.a - (refData.b / (tK + refData.c));
    const pBar = Math.pow(10, logP) - 1.01325; // gauge pressure
    const pPsi = pBar * 14.5038;

    rows.push({
      tempC: t,
      tempF: Math.round(t * 9/5 + 32),
      pressure: unit === "PSI" ? Math.max(0, pPsi).toFixed(1) : Math.max(0, pBar).toFixed(2),
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-card/20 p-3 rounded-xl border border-border">
        <span className="text-xs font-semibold text-foreground">{name} Saturation Table (Gauge)</span>
        <div className="flex gap-2">
          <button onClick={() => setUnit("PSI")} className={`px-2 py-1 text-[10px] rounded border ${unit === "PSI" ? "bg-primary/10 border-primary text-primary" : "border-border"}`}>PSI</button>
          <button onClick={() => setUnit("bar")} className={`px-2 py-1 text-[10px] rounded border ${unit === "bar" ? "bg-primary/10 border-primary text-primary" : "border-border"}`}>bar</button>
        </div>
      </div>
      <div className="overflow-x-auto rounded-xl border border-border bg-background/30">
        <table className="w-full text-left text-xs">
          <thead className="bg-card/40 text-muted-foreground uppercase text-[10px] border-b border-border">
            <tr>
              <th className="p-3">Temp (°C)</th>
              <th className="p-3">Temp (°F)</th>
              <th className="p-3">Pressure ({unit})</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40 font-mono text-foreground">
            {rows.map((row) => (
              <tr key={row.tempC} className="hover:bg-card/25">
                <td className="p-3">{row.tempC}°C</td>
                <td className="p-3">{row.tempF}°F</td>
                <td className="p-3 text-primary font-bold">{row.pressure}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Guides & PT Charts                                                         */
/* -------------------------------------------------------------------------- */

// 1. AC Not Cooling
export function AcNotCoolingView() {
  return (
    <ArticleLayout title="AC Not Cooling – 15 Possible Causes" category="Troubleshooting Guides">
      <p>If your air conditioner is running but blowing warm air, there are several mechanical, electrical, and airflow issues that could be causing the failure.</p>
      
      <h3 className="text-base font-semibold text-foreground">Top 5 Common Airflow Restrictions</h3>
      <ul className="list-disc pl-5 space-y-1.5">
        <li><strong>Dirty Air Filter:</strong> Restricts airflow, causing the evaporator coil to freeze and block heat transfer.</li>
        <li><strong>Blocked Condenser Coils:</strong> Dirt, leaves, or dust on the outdoor unit prevent heat dissipation.</li>
        <li><strong>Blocked Registers:</strong> Closed vents inside the house disrupt balanced static pressure.</li>
        <li><strong>Failed Blower Motor:</strong> Fan fails to circulate air over the indoor coil.</li>
        <li><strong>Crushed Ductwork:</strong> Physical collapse of flex ducts restricts cold air delivery.</li>
      </ul>

      <h3 className="text-base font-semibold text-foreground">Refrigeration Loop & Electrical Failures</h3>
      <ol className="list-decimal pl-5 space-y-1.5">
        <li><strong>Low Refrigerant Charge:</strong> Caused by leaks, resulting in low suction pressure and freezing coils.</li>
        <li><strong>Failed Start Capacitor:</strong> The compressor or fan motor cannot start.</li>
        <li><strong>Faulty Thermostat:</strong> Fails to signal the control board to engage the contactor.</li>
        <li><strong>Tripped Breaker:</strong> Electrical overload trips the main fuse.</li>
        <li><strong>Compressor Valve Failure:</strong> Internal valves leak, preventing compression.</li>
      </ol>
    </ArticleLayout>
  );
}

// 2. Low Suction Pressure
export function LowSuctionView() {
  return (
    <ArticleLayout title="Low Suction Pressure: Causes & Diagnostics" category="Troubleshooting Guides">
      <p>Low suction pressure (low-side pressure) is a common symptom in heat pump and refrigeration systems. It indicates that either refrigerant mass flow is restricted, or heat transfer at the evaporator is insufficient.</p>
      
      <h3 className="text-base font-semibold text-foreground">Potential Causes</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-card/20 p-4 rounded-xl border border-border">
          <h4 className="font-bold text-foreground text-xs mb-2">1. Low Heat Load (Airflow)</h4>
          <p className="text-xs">Dirty filters, restricted ducts, or a failing indoor fan motor will decrease heat transfer to the liquid refrigerant, reducing pressures.</p>
        </div>
        <div className="bg-card/20 p-4 rounded-xl border border-border">
          <h4 className="font-bold text-foreground text-xs mb-2">2. Refrigerant Undercharge</h4>
          <p className="text-xs">A leak in the coils or joints reduces the volume of refrigerant, dropping vapor pressure at the compressor suction port.</p>
        </div>
      </div>
    </ArticleLayout>
  );
}

// 3. High Head Pressure
export function HighHeadView() {
  return (
    <ArticleLayout title="High Head Pressure: Causes & Solutions" category="Troubleshooting Guides">
      <p>High head pressure (discharge pressure) indicates that the outdoor condenser coil is unable to dissipate heat effectively, or there is an excess of mass/non-condensables in the system.</p>
      <h3 className="text-base font-semibold text-foreground">Diagnostic Checklist</h3>
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Dirty condenser fins (needs jet cleaning).</li>
        <li>Outdoor fan motor failed or running backwards.</li>
        <li>System overcharged with refrigerant.</li>
        <li>Non-condensable gases (like air or moisture) trapped inside the loop due to poor vacuum evacuation.</li>
      </ul>
    </ArticleLayout>
  );
}

// 4. Compressor Short Cycling
export function ShortCyclingView() {
  return (
    <ArticleLayout title="Compressor Short Cycling: Diagnostic Guide" category="Troubleshooting Guides">
      <p>Short cycling occurs when the compressor turns on and off rapidly, leading to high power draw, thermal motor damage, and shortened equipment life.</p>
      <h3 className="text-base font-semibold text-foreground">Key Triggers</h3>
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Low pressure switch tripping due to a refrigerant leak.</li>
        <li>High pressure switch tripping from lack of condenser cooling.</li>
        <li>Thermostat placed too close to a supply register.</li>
        <li>Oversized AC unit cooling the room too quickly without dehumidifying.</li>
      </ul>
    </ArticleLayout>
  );
}

// 5. Evaporator Coil Freezing
export function CoilFreezingView() {
  return (
    <ArticleLayout title="Evaporator Coil Freezing Up" category="Troubleshooting Guides">
      <p>An iced evaporator coil restricts airflow entirely and can wash liquid refrigerant back to the compressor, leading to mechanical slugging.</p>
      <h3 className="text-base font-semibold text-foreground">Remediation Steps</h3>
      <ol className="list-decimal pl-5 space-y-1.5">
        <li>Turn off the cooling call immediately and run the fan on 'ON' to melt ice.</li>
        <li>Check for dirty filters, blocked return grills, or restricted capillary tubes.</li>
        <li>Measure system operating pressures once defrosted to verify refrigerant charge level.</li>
      </ol>
    </ArticleLayout>
  );
}

// 6. Walk-In Cooler Warm
export function WalkInWarmView() {
  return (
    <ArticleLayout title="Why Is My Walk-In Cooler Warm?" category="Troubleshooting Guides">
      <p>A warm walk-in cooler puts thousands of rupees of stock at risk. Quick diagnostic response is mandatory.</p>
      <h3 className="text-base font-semibold text-foreground">Common Failure Points</h3>
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Failed defrost timer clock stuck in defrost mode.</li>
        <li>Torn or worn out door gaskets letting humid air inside.</li>
        <li>Iced evaporator coil due to failed defrost heaters.</li>
        <li>Accumulation of dirt on outdoor condensing unit.</li>
      </ul>
    </ArticleLayout>
  );
}

// 7. Refrigerant Leak Symptoms
export function LeakSymptomsView() {
  return (
    <ArticleLayout title="Refrigerant Leak Symptoms & Locations" category="Troubleshooting Guides">
      <p>Detecting refrigerant leaks early prevents compressor burnout and costly gas top-ups.</p>
      <h3 className="text-base font-semibold text-foreground">Key Symptoms</h3>
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Hissing sound near the evaporator or condenser coil.</li>
        <li>Ice forming on the suction line or indoor coil.</li>
        <li>AC running constantly but unable to lower indoor temperature.</li>
        <li>Oil stains around flare joints, bends, or solder connections.</li>
      </ul>
    </ArticleLayout>
  );
}

// 8. How to Check Superheat
export function HowToSuperheatView() {
  return (
    <ArticleLayout title="How to Check Superheat" category="Troubleshooting Guides">
      <p>Superheat is measured on systems with fixed orifice metering devices (like capillary tubes) to check if the evaporator is loaded properly without liquid floodback.</p>
      <h3 className="text-base font-semibold text-foreground">Formula & Method</h3>
      <p className="italic">Superheat = Suction Line Temp - Saturated Suction Temp (PT Conversion)</p>
      <ol className="list-decimal pl-5 space-y-1.5">
        <li>Connect manifold gauge to suction line service port to read suction pressure.</li>
        <li>Convert the pressure reading to saturated temperature using a PT chart.</li>
        <li>Attach a pipe clamp thermocouple to the suction line near the service port to read suction line temperature.</li>
        <li>Subtract the saturated temperature from the line temperature. Target is typically 8°F to 12°F.</li>
      </ol>
    </ArticleLayout>
  );
}

// 9. How to Measure Subcooling
export function HowToSubcoolingView() {
  return (
    <ArticleLayout title="How to Measure Subcooling" category="Troubleshooting Guides">
      <p>Subcooling is measured on systems with Thermal Expansion Valves (TXV) to check if the liquid line is packed with solid liquid refrigerant.</p>
      <h3 className="text-base font-semibold text-foreground">Formula & Method</h3>
      <p className="italic">Subcooling = Saturated Liquid Temp (PT Conversion) - Liquid Line Temp</p>
      <ol className="list-decimal pl-5 space-y-1.5">
        <li>Connect manifold gauge to liquid line service port to read discharge pressure.</li>
        <li>Convert the pressure reading to saturated temperature using a PT chart.</li>
        <li>Attach a pipe clamp thermocouple to the liquid line near the service port to read liquid line temperature.</li>
        <li>Subtract the line temperature from the saturated temperature. Target is typically 10°F to 14°F.</li>
      </ol>
    </ArticleLayout>
  );
}

/* -------------------------------------------------------------------------- */
/* Refrigerant PT Charts                                                      */
/* -------------------------------------------------------------------------- */

const antoineConsts = {
  r134a: { a: 4.419, b: 1013.7, c: -28.16 },
  r410a: { a: 4.095, b: 840.4, c: -38.65 },
  r32: { a: 4.148, b: 864.2, c: -32.55 },
  r404a: { a: 4.119, b: 825.4, c: -36.15 },
  r407c: { a: 4.152, b: 890.3, c: -34.85 },
};

export function R134aPtView() {
  return (
    <ArticleLayout title="R134a Pressure-Temperature (PT) Reference Chart" category="Refrigerants">
      <p>R134a is an HFC refrigerant widely used in automotive air conditioning, domestic refrigerators, and commercial chiller applications.</p>
      <PtTable name="R134a" startTemp={-20} endTemp={45} refData={antoineConsts.r134a} />
    </ArticleLayout>
  );
}

export function R410aPtView() {
  return (
    <ArticleLayout title="R410A Pressure-Temperature (PT) Reference Chart" category="Refrigerants">
      <p>R410A is a high-pressure near-azeotropic HFC blend (50/50 R32 and R125) widely used in modern residential split and VRF air conditioners.</p>
      <PtTable name="R410A" startTemp={-15} endTemp={50} refData={antoineConsts.r410a} />
    </ArticleLayout>
  );
}

export function R32PtView() {
  return (
    <ArticleLayout title="R32 Pressure-Temperature (PT) Reference Chart" category="Refrigerants">
      <p>R32 is a low-GWP, mildly flammable HFC refrigerant designed to replace R410A in residential split air conditioners.</p>
      <PtTable name="R32" startTemp={-15} endTemp={50} refData={antoineConsts.r32} />
    </ArticleLayout>
  );
}

export function R404aPtView() {
  return (
    <ArticleLayout title="R404A Pressure-Temperature (PT) Reference Chart" category="Refrigerants">
      <p>R404A is a popular HFC blend widely used in low and medium-temperature commercial food refrigeration and transport systems.</p>
      <PtTable name="R404A" startTemp={-30} endTemp={40} refData={antoineConsts.r404a} />
    </ArticleLayout>
  );
}

export function R407cPtView() {
  return (
    <ArticleLayout title="R407C Pressure-Temperature (PT) Reference Chart" category="Refrigerants">
      <p>R407C is an HFC blend designed to replace R22 in residential and commercial packaged air conditioning units.</p>
      <PtTable name="R407C" startTemp={-10} endTemp={45} refData={antoineConsts.r407c} />
    </ArticleLayout>
  );
}

/* -------------------------------------------------------------------------- */
/* Formula Libraries                                                          */
/* -------------------------------------------------------------------------- */

export function HvacFormulasView() {
  const [cfm, setCfm] = useState(1200);
  const [td, setTd] = useState(20);

  const sensibleHeat = cfm * 1.08 * td;

  return (
    <ArticleLayout title="HVAC Formula Library" category="Formulas & Reference">
      <p>Explore essential equations used by design engineers for airflow, sensible, latent, and total heat load calculations.</p>
      
      <div className="space-y-6">
        {/* Sensible Heat Formula */}
        <div className="bg-card/20 border border-border p-5 rounded-2xl space-y-3">
          <h3 className="text-base font-semibold text-primary">1. Sensible Heat Formula</h3>
          <p className="text-xs">Used to calculate the heat gain associated with changes in temperature without phase change.</p>
          <div className="font-mono text-sm text-foreground bg-background/50 p-3 rounded-lg border border-border/50 select-all">
            Q_sensible = CFM * 1.08 * Delta_T
          </div>
          
          <div className="pt-3 border-t border-border/40 space-y-3">
            <div className="text-xs font-semibold text-foreground">Interactive Sensible Calculator</div>
            <div className="grid sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="text-muted-foreground">Airflow Rate (CFM)</label>
                <input type="number" value={cfm} onChange={(e) => setCfm(parseFloat(e.target.value) || 0)} className="w-full rounded bg-background border border-border px-2 py-1 font-mono text-foreground" />
              </div>
              <div className="space-y-1">
                <label className="text-muted-foreground">Temp Difference (Delta T)</label>
                <input type="number" value={td} onChange={(e) => setTd(parseFloat(e.target.value) || 0)} className="w-full rounded bg-background border border-border px-2 py-1 font-mono text-foreground" />
              </div>
            </div>
            <div className="text-xs text-foreground mt-2">
              Resulting Sensible Heat: <strong className="text-primary font-mono">{Math.round(sensibleHeat).toLocaleString()} BTU/hr</strong>
            </div>
          </div>
        </div>

        {/* Latent Heat Formula */}
        <div className="bg-card/20 border border-border p-5 rounded-2xl space-y-3">
          <h3 className="text-base font-semibold text-primary">2. Latent Heat Formula</h3>
          <p className="text-xs">Used to calculate the energy required to change the state of moisture in the air (phase change).</p>
          <div className="font-mono text-sm text-foreground bg-background/50 p-3 rounded-lg border border-border/50 select-all">
            Q_latent = CFM * 0.68 * Delta_W (Grains of moisture)
          </div>
        </div>
      </div>
    </ArticleLayout>
  );
}

export function RefrigerationFormulasView() {
  return (
    <ArticleLayout title="Refrigeration Formula Library" category="Formulas & Reference">
      <p>Key thermal calculations for commercial refrigeration technicians and plant operators.</p>
      
      <div className="space-y-6">
        <div className="bg-card/20 border border-border p-5 rounded-2xl space-y-3">
          <h3 className="text-base font-semibold text-primary">1. Compression Ratio</h3>
          <p className="text-xs">Calculates the ratio of absolute discharge pressure to absolute suction pressure. High compression ratios indicate low efficiency and overheating.</p>
          <div className="font-mono text-sm text-foreground bg-background/50 p-3 rounded-lg border border-border/50 select-all">
            CR = (Discharge Pressure + 14.7) / (Suction Pressure + 14.7)
          </div>
        </div>

        <div className="bg-card/20 border border-border p-5 rounded-2xl space-y-3">
          <h3 className="text-base font-semibold text-primary">2. Coefficient of Performance (COP)</h3>
          <p className="text-xs">Evaluates compressor refrigeration output relative to electrical power input.</p>
          <div className="font-mono text-sm text-foreground bg-background/50 p-3 rounded-lg border border-border/50 select-all">
            COP = Refrigeration Effect (kW) / Work of Compression (kW)
          </div>
        </div>
      </div>
    </ArticleLayout>
  );
}
