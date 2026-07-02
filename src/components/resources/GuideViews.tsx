import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  Thermometer,
  Wind,
  Zap,
  Settings,
  Award,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getCmsSettings } from "../../lib/api";

/* -------------------------------------------------------------------------- */
/* Helper components & styles                                                 */
/* -------------------------------------------------------------------------- */
function ArticleLayout({
  title,
  category,
  children,
}: {
  title: string;
  category: string;
  children: React.ReactNode;
}) {
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
        <h1 className="text-3xl font-bold font-display text-foreground mt-1 leading-tight">
          {title}
        </h1>
      </div>
      <article className="space-y-5 pt-4 border-t border-border/40">{children}</article>
      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 mt-8 flex items-start gap-3">
        <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
        <div className="text-xs">
          <strong>Need professional assistance?</strong>
          <p className="mt-1 text-muted-foreground">
            Saurav Temgire (Lead Engineer at Prime Cool) coordinates rapid-response HVAC, Chiller,
            and Cold Storage maintenance along the Wagholi–Shirur corridor.{" "}
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="text-primary hover:underline font-semibold"
            >
              Call {phone}
            </a>{" "}
            to schedule a visit.
          </p>
        </div>
      </div>
    </div>
  );
}

function PtTable({
  name,
  startTemp,
  endTemp,
  refData,
}: {
  name: string;
  startTemp: number;
  endTemp: number;
  refData: { b: number; a: number; c: number };
}) {
  const [unit, setUnit] = useState<"PSI" | "bar">("PSI");
  const rows = [];

  for (let t = startTemp; t <= endTemp; t += 5) {
    const tK = t + 273.15;
    // Antoine equation log10(P) = A - B/(T + C)
    const logP = refData.a - refData.b / (tK + refData.c);
    const pBar = Math.pow(10, logP) - 1.01325; // gauge pressure
    const pPsi = pBar * 14.5038;

    rows.push({
      tempC: t,
      tempF: Math.round((t * 9) / 5 + 32),
      pressure: unit === "PSI" ? Math.max(0, pPsi).toFixed(1) : Math.max(0, pBar).toFixed(2),
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-card/20 p-3 rounded-xl border border-border">
        <span className="text-xs font-semibold text-foreground">
          {name} Saturation Table (Gauge)
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setUnit("PSI")}
            className={`px-2 py-1 text-[10px] rounded border ${unit === "PSI" ? "bg-primary/10 border-primary text-primary" : "border-border"}`}
          >
            PSI
          </button>
          <button
            onClick={() => setUnit("bar")}
            className={`px-2 py-1 text-[10px] rounded border ${unit === "bar" ? "bg-primary/10 border-primary text-primary" : "border-border"}`}
          >
            bar
          </button>
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
      <p>
        If your air conditioner is running but blowing warm air, there are several mechanical,
        electrical, and airflow issues that could be causing the failure.
      </p>

      <h3 className="text-base font-semibold text-foreground">Top 5 Common Airflow Restrictions</h3>
      <ul className="list-disc pl-5 space-y-1.5">
        <li>
          <strong>Dirty Air Filter:</strong> Restricts airflow, causing the evaporator coil to
          freeze and block heat transfer.
        </li>
        <li>
          <strong>Blocked Condenser Coils:</strong> Dirt, leaves, or dust on the outdoor unit
          prevent heat dissipation.
        </li>
        <li>
          <strong>Blocked Registers:</strong> Closed vents inside the house disrupt balanced static
          pressure.
        </li>
        <li>
          <strong>Failed Blower Motor:</strong> Fan fails to circulate air over the indoor coil.
        </li>
        <li>
          <strong>Crushed Ductwork:</strong> Physical collapse of flex ducts restricts cold air
          delivery.
        </li>
      </ul>

      <h3 className="text-base font-semibold text-foreground">
        Refrigeration Loop & Electrical Failures
      </h3>
      <ol className="list-decimal pl-5 space-y-1.5">
        <li>
          <strong>Low Refrigerant Charge:</strong> Caused by leaks, resulting in low suction
          pressure and freezing coils.
        </li>
        <li>
          <strong>Failed Start Capacitor:</strong> The compressor or fan motor cannot start.
        </li>
        <li>
          <strong>Faulty Thermostat:</strong> Fails to signal the control board to engage the
          contactor.
        </li>
        <li>
          <strong>Tripped Breaker:</strong> Electrical overload trips the main fuse.
        </li>
        <li>
          <strong>Compressor Valve Failure:</strong> Internal valves leak, preventing compression.
        </li>
      </ol>
    </ArticleLayout>
  );
}

// 2. Low Suction Pressure
export function LowSuctionView() {
  return (
    <ArticleLayout
      title="Low Suction Pressure: Causes & Diagnostics"
      category="Troubleshooting Guides"
    >
      <p>
        Low suction pressure (low-side pressure) is a common symptom in heat pump and refrigeration
        systems. It indicates that either refrigerant mass flow is restricted, or heat transfer at
        the evaporator is insufficient.
      </p>

      <h3 className="text-base font-semibold text-foreground">Potential Causes</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-card/20 p-4 rounded-xl border border-border">
          <h4 className="font-bold text-foreground text-xs mb-2">1. Low Heat Load (Airflow)</h4>
          <p className="text-xs">
            Dirty filters, restricted ducts, or a failing indoor fan motor will decrease heat
            transfer to the liquid refrigerant, reducing pressures.
          </p>
        </div>
        <div className="bg-card/20 p-4 rounded-xl border border-border">
          <h4 className="font-bold text-foreground text-xs mb-2">2. Refrigerant Undercharge</h4>
          <p className="text-xs">
            A leak in the coils or joints reduces the volume of refrigerant, dropping vapor pressure
            at the compressor suction port.
          </p>
        </div>
      </div>
    </ArticleLayout>
  );
}

// 3. High Head Pressure
export function HighHeadView() {
  return (
    <ArticleLayout title="High Head Pressure: Causes & Solutions" category="Troubleshooting Guides">
      <p>
        High head pressure (discharge pressure) indicates that the outdoor condenser coil is unable
        to dissipate heat effectively, or there is an excess of mass/non-condensables in the system.
      </p>
      <h3 className="text-base font-semibold text-foreground">Diagnostic Checklist</h3>
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Dirty condenser fins (needs jet cleaning).</li>
        <li>Outdoor fan motor failed or running backwards.</li>
        <li>System overcharged with refrigerant.</li>
        <li>
          Non-condensable gases (like air or moisture) trapped inside the loop due to poor vacuum
          evacuation.
        </li>
      </ul>
    </ArticleLayout>
  );
}

// 4. Compressor Short Cycling
export function ShortCyclingView() {
  return (
    <ArticleLayout
      title="Compressor Short Cycling: Diagnostic Guide"
      category="Troubleshooting Guides"
    >
      <p>
        Short cycling occurs when the compressor turns on and off rapidly, leading to high power
        draw, thermal motor damage, and shortened equipment life.
      </p>
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
      <p>
        An iced evaporator coil restricts airflow entirely and can wash liquid refrigerant back to
        the compressor, leading to mechanical slugging.
      </p>
      <h3 className="text-base font-semibold text-foreground">Remediation Steps</h3>
      <ol className="list-decimal pl-5 space-y-1.5">
        <li>Turn off the cooling call immediately and run the fan on 'ON' to melt ice.</li>
        <li>Check for dirty filters, blocked return grills, or restricted capillary tubes.</li>
        <li>
          Measure system operating pressures once defrosted to verify refrigerant charge level.
        </li>
      </ol>
    </ArticleLayout>
  );
}

// 6. Walk-In Cooler Warm
export function WalkInWarmView() {
  return (
    <ArticleLayout title="Why Is My Walk-In Cooler Warm?" category="Troubleshooting Guides">
      <p>
        A warm walk-in cooler puts thousands of rupees of stock at risk. Quick diagnostic response
        is mandatory.
      </p>
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
      <p>
        Superheat is measured on systems with fixed orifice metering devices (like capillary tubes)
        to check if the evaporator is loaded properly without liquid floodback.
      </p>
      <h3 className="text-base font-semibold text-foreground">Formula & Method</h3>
      <p className="italic">
        Superheat = Suction Line Temp - Saturated Suction Temp (PT Conversion)
      </p>
      <ol className="list-decimal pl-5 space-y-1.5">
        <li>Connect manifold gauge to suction line service port to read suction pressure.</li>
        <li>Convert the pressure reading to saturated temperature using a PT chart.</li>
        <li>
          Attach a pipe clamp thermocouple to the suction line near the service port to read suction
          line temperature.
        </li>
        <li>
          Subtract the saturated temperature from the line temperature. Target is typically 8°F to
          12°F.
        </li>
      </ol>
    </ArticleLayout>
  );
}

// 9. How to Measure Subcooling
export function HowToSubcoolingView() {
  return (
    <ArticleLayout title="How to Measure Subcooling" category="Troubleshooting Guides">
      <p>
        Subcooling is measured on systems with Thermal Expansion Valves (TXV) to check if the liquid
        line is packed with solid liquid refrigerant.
      </p>
      <h3 className="text-base font-semibold text-foreground">Formula & Method</h3>
      <p className="italic">
        Subcooling = Saturated Liquid Temp (PT Conversion) - Liquid Line Temp
      </p>
      <ol className="list-decimal pl-5 space-y-1.5">
        <li>Connect manifold gauge to liquid line service port to read discharge pressure.</li>
        <li>Convert the pressure reading to saturated temperature using a PT chart.</li>
        <li>
          Attach a pipe clamp thermocouple to the liquid line near the service port to read liquid
          line temperature.
        </li>
        <li>
          Subtract the line temperature from the saturated temperature. Target is typically 10°F to
          14°F.
        </li>
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
      <p>
        R134a is an HFC refrigerant widely used in automotive air conditioning, domestic
        refrigerators, and commercial chiller applications.
      </p>
      <PtTable name="R134a" startTemp={-20} endTemp={45} refData={antoineConsts.r134a} />
    </ArticleLayout>
  );
}

export function R410aPtView() {
  return (
    <ArticleLayout title="R410A Pressure-Temperature (PT) Reference Chart" category="Refrigerants">
      <p>
        R410A is a high-pressure near-azeotropic HFC blend (50/50 R32 and R125) widely used in
        modern residential split and VRF air conditioners.
      </p>
      <PtTable name="R410A" startTemp={-15} endTemp={50} refData={antoineConsts.r410a} />
    </ArticleLayout>
  );
}

export function R32PtView() {
  return (
    <ArticleLayout title="R32 Pressure-Temperature (PT) Reference Chart" category="Refrigerants">
      <p>
        R32 is a low-GWP, mildly flammable HFC refrigerant designed to replace R410A in residential
        split air conditioners.
      </p>
      <PtTable name="R32" startTemp={-15} endTemp={50} refData={antoineConsts.r32} />
    </ArticleLayout>
  );
}

export function R404aPtView() {
  return (
    <ArticleLayout title="R404A Pressure-Temperature (PT) Reference Chart" category="Refrigerants">
      <p>
        R404A is a popular HFC blend widely used in low and medium-temperature commercial food
        refrigeration and transport systems.
      </p>
      <PtTable name="R404A" startTemp={-30} endTemp={40} refData={antoineConsts.r404a} />
    </ArticleLayout>
  );
}

export function R407cPtView() {
  return (
    <ArticleLayout title="R407C Pressure-Temperature (PT) Reference Chart" category="Refrigerants">
      <p>
        R407C is an HFC blend designed to replace R22 in residential and commercial packaged air
        conditioning units.
      </p>
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
      <p>
        Explore essential equations used by design engineers for airflow, sensible, latent, and
        total heat load calculations.
      </p>

      <div className="space-y-6">
        {/* Sensible Heat Formula */}
        <div className="bg-card/20 border border-border p-5 rounded-2xl space-y-3">
          <h3 className="text-base font-semibold text-primary">1. Sensible Heat Formula</h3>
          <p className="text-xs">
            Used to calculate the heat gain associated with changes in temperature without phase
            change.
          </p>
          <div className="font-mono text-sm text-foreground bg-background/50 p-3 rounded-lg border border-border/50 select-all">
            Q_sensible = CFM * 1.08 * Delta_T
          </div>

          <div className="pt-3 border-t border-border/40 space-y-3">
            <div className="text-xs font-semibold text-foreground">
              Interactive Sensible Calculator
            </div>
            <div className="grid sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="text-muted-foreground">Airflow Rate (CFM)</label>
                <input
                  type="number"
                  value={cfm}
                  onChange={(e) => setCfm(parseFloat(e.target.value) || 0)}
                  className="w-full rounded bg-background border border-border px-2 py-1 font-mono text-foreground"
                />
              </div>
              <div className="space-y-1">
                <label className="text-muted-foreground">Temp Difference (Delta T)</label>
                <input
                  type="number"
                  value={td}
                  onChange={(e) => setTd(parseFloat(e.target.value) || 0)}
                  className="w-full rounded bg-background border border-border px-2 py-1 font-mono text-foreground"
                />
              </div>
            </div>
            <div className="text-xs text-foreground mt-2">
              Resulting Sensible Heat:{" "}
              <strong className="text-primary font-mono">
                {Math.round(sensibleHeat).toLocaleString()} BTU/hr
              </strong>
            </div>
          </div>
        </div>

        {/* Latent Heat Formula */}
        <div className="bg-card/20 border border-border p-5 rounded-2xl space-y-3">
          <h3 className="text-base font-semibold text-primary">2. Latent Heat Formula</h3>
          <p className="text-xs">
            Used to calculate the energy required to change the state of moisture in the air (phase
            change).
          </p>
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
          <p className="text-xs">
            Calculates the ratio of absolute discharge pressure to absolute suction pressure. High
            compression ratios indicate low efficiency and overheating.
          </p>
          <div className="font-mono text-sm text-foreground bg-background/50 p-3 rounded-lg border border-border/50 select-all">
            CR = (Discharge Pressure + 14.7) / (Suction Pressure + 14.7)
          </div>
        </div>

        <div className="bg-card/20 border border-border p-5 rounded-2xl space-y-3">
          <h3 className="text-base font-semibold text-primary">
            2. Coefficient of Performance (COP)
          </h3>
          <p className="text-xs">
            Evaluates compressor refrigeration output relative to electrical power input.
          </p>
          <div className="font-mono text-sm text-foreground bg-background/50 p-3 rounded-lg border border-border/50 select-all">
            COP = Refrigeration Effect (kW) / Work of Compression (kW)
          </div>
        </div>
      </div>
    </ArticleLayout>
  );
}

/* -------------------------------------------------------------------------- */
/* Refrigerator Error Codes & Cooling Problems                                */
/* -------------------------------------------------------------------------- */
export function RefrigeratorErrorCodesView() {
  return (
    <ArticleLayout
      title="Refrigerator Error Codes & Cooling Troubleshooting"
      category="Troubleshooting Guides"
    >
      <p>
        A reference guide to diagnose cooling faults, clicking compressors, and error codes for
        major refrigerator brands including Haier, Bosch, and Godrej.
      </p>

      <div className="space-y-6 mt-4">
        {/* Haier Section */}
        <div className="bg-card/20 border border-border p-5 rounded-2xl space-y-3">
          <h3 className="text-base font-bold text-primary">Haier Refrigerator Troubleshooting</h3>
          <p className="text-xs">
            Common issues include the evaporator fan motor failing or defrost sensor issues.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse border border-border/40">
              <thead>
                <tr className="bg-muted/40 border-b border-border/40 font-semibold">
                  <th className="p-2 border-r border-border/40">Error Code</th>
                  <th className="p-2 border-r border-border/40">Meaning / Fault</th>
                  <th className="p-2">Troubleshooting Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                <tr>
                  <td className="p-2 border-r border-border/40 font-mono font-bold">F1</td>
                  <td className="p-2 border-r border-border/40">Refrigerator Sensor Fault</td>
                  <td className="p-2">Check wire harness and replace refrigerator thermistor.</td>
                </tr>
                <tr>
                  <td className="p-2 border-r border-border/40 font-mono font-bold">F2</td>
                  <td className="p-2 border-r border-border/40">Freezer Sensor Fault</td>
                  <td className="p-2">Check connections and replace freezer sensor.</td>
                </tr>
                <tr>
                  <td className="p-2 border-r border-border/40 font-mono font-bold">E1</td>
                  <td className="p-2 border-r border-border/40">Freezer Fan Motor Fault</td>
                  <td className="p-2">
                    Check fan blades for frost obstruction. Replace fan motor if necessary.
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border-r border-border/40 font-mono font-bold">E2</td>
                  <td className="p-2 border-r border-border/40">Defrost Heater Failure</td>
                  <td className="p-2">
                    Check bimetal thermostat and defrost heater resistance (typically 200-400 ohms).
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Bosch Section */}
        <div className="bg-card/20 border border-border p-5 rounded-2xl space-y-3">
          <h3 className="text-base font-bold text-primary">Bosch Refrigerator Troubleshooting</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse border border-border/40">
              <thead>
                <tr className="bg-muted/40 border-b border-border/40 font-semibold">
                  <th className="p-2 border-r border-border/40">Error Code</th>
                  <th className="p-2 border-r border-border/40">Meaning / Fault</th>
                  <th className="p-2">Troubleshooting Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                <tr>
                  <td className="p-2 border-r border-border/40 font-mono font-bold">E01</td>
                  <td className="p-2 border-r border-border/40">
                    Fresh food room temp sensor fault
                  </td>
                  <td className="p-2">Replace fresh food compartment temperature sensor.</td>
                </tr>
                <tr>
                  <td className="p-2 border-r border-border/40 font-mono font-bold">E02</td>
                  <td className="p-2 border-r border-border/40">Freezer room temp sensor fault</td>
                  <td className="p-2">Replace freezer temperature sensor.</td>
                </tr>
                <tr>
                  <td className="p-2 border-r border-border/40 font-mono font-bold">E10</td>
                  <td className="p-2 border-r border-border/40">
                    Control module/display board error
                  </td>
                  <td className="p-2">
                    Reset power. Check wires to door hinge. Replace main board.
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border-r border-border/40 font-mono font-bold">E20</td>
                  <td className="p-2 border-r border-border/40">Communication fault</td>
                  <td className="p-2">
                    Inspect wiring harness between main board and user interface.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Godrej Section */}
        <div className="bg-card/20 border border-border p-5 rounded-2xl space-y-3">
          <h3 className="text-base font-bold text-primary">Godrej Refrigerator Troubleshooting</h3>
          <p className="text-xs font-semibold">Clicking compressor issue (Godrej / LG / Voltas):</p>
          <p className="text-xs">
            If you hear a distinct clicking sound from the bottom rear every few minutes but the
            compressor doesn't run, check the **Start Relay (PTC)** and **Overload Protector
            (OLP)**. A failed start capacitor will also prevent the motor from starting.
          </p>
        </div>
      </div>
    </ArticleLayout>
  );
}

export function AcGasChargingView() {
  const [selectedGas, setSelectedGas] = useState("R-32");
  const [ambientTemp, setAmbientTemp] = useState(35); // °C

  // Gas specifications & math calculators
  const gasData: Record<
    string,
    {
      boilingPoint: string;
      baseSuction: number; // at 35C ambient
      baseDischarge: number; // at 35C ambient
      baseStanding: number; // at 35C ambient
      type: string;
    }
  > = {
    "R-32": {
      boilingPoint: "-51.7°C",
      baseSuction: 120,
      baseDischarge: 380,
      baseStanding: 250,
      type: "Single Component HFC",
    },
    "R-410A": {
      boilingPoint: "-48.5°C",
      baseSuction: 120,
      baseDischarge: 385,
      baseStanding: 260,
      type: "Near-Azeotropic HFC Blend",
    },
    "R-22": {
      boilingPoint: "-40.8°C",
      baseSuction: 68,
      baseDischarge: 260,
      baseStanding: 155,
      type: "HCFC (Phasing out)",
    },
    "R-134a": {
      boilingPoint: "-26.3°C",
      baseSuction: 35,
      baseDischarge: 180,
      baseStanding: 95,
      type: "Single Component HFC (Medium Temp)",
    },
    "R-290": {
      boilingPoint: "-42.1°C",
      baseSuction: 65,
      baseDischarge: 220,
      baseStanding: 140,
      type: "Hydrocarbon (Eco-friendly / Flammable)",
    },
    "R-404A": {
      boilingPoint: "-46.2°C",
      baseSuction: 85,
      baseDischarge: 295,
      baseStanding: 185,
      type: "Near-Azeotropic HFC Blend (Low Temp)",
    },
    "R-407C": {
      boilingPoint: "-43.6°C",
      baseSuction: 80,
      baseDischarge: 290,
      baseStanding: 175,
      type: "Zeotropic HFC Blend (Temperature Glide)",
    },
    "R-600a": {
      boilingPoint: "-11.7°C",
      baseSuction: 12,
      baseDischarge: 110,
      baseStanding: 45,
      type: "Hydrocarbon (Eco-friendly / Refrigerator focus)",
    },
  };

  const selected = gasData[selectedGas] || gasData["R-32"];

  // Temperature correction multiplier: pressure increases by approx 1.8% to 2.2% per °C change from 35°C
  const tempCorrection = 1 + (ambientTemp - 35) * 0.02;

  // Final adjusted calculations
  const suctionMin = Math.round(selected.baseSuction * 0.9 * tempCorrection);
  const suctionMax = Math.round(selected.baseSuction * 1.1 * tempCorrection);
  const dischargeMin = Math.round(selected.baseDischarge * 0.9 * tempCorrection);
  const dischargeMax = Math.round(selected.baseDischarge * 1.1 * tempCorrection);
  const standingVal = Math.round(selected.baseStanding * tempCorrection);

  return (
    <ArticleLayout
      title="AC Gas Charging Pressures & Operating Guidelines"
      category="Troubleshooting Guides"
    >
      <p>
        A highly advanced pressure sizer for air conditioning and refrigeration systems. All
        operating suction, discharge, and standing pressures fluctuate based on ambient temperature.
      </p>

      <div className="space-y-6 mt-4">
        {/* Dynamic Calculator Card */}
        <div className="bg-card/20 border border-primary/30 p-6 rounded-2xl space-y-4">
          <div className="text-sm font-bold text-primary uppercase tracking-wider">
            Dynamic Ambient-Compensated Pressure Calculator
          </div>
          <p className="text-xs text-muted-foreground">
            Select a refrigerant and slide the outdoor temperature to calculate target pressures for
            diagnostics.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground block font-semibold">
                Select Refrigerant Gas
              </label>
              <select
                value={selectedGas}
                onChange={(e) => setSelectedGas(e.target.value)}
                className="w-full rounded-lg border border-border bg-background/50 px-3 py-2 text-xs text-foreground focus:outline-none"
              >
                {Object.keys(gasData).map((gas) => (
                  <option key={gas} value={gas}>
                    {gas} ({gasData[gas].type})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="text-muted-foreground block font-semibold">
                  Outdoor Ambient Temp
                </label>
                <span className="text-primary font-mono font-bold">{ambientTemp}°C</span>
              </div>
              <input
                type="range"
                min="15"
                max="48"
                step="1"
                value={ambientTemp}
                onChange={(e) => setAmbientTemp(parseInt(e.target.value) || 35)}
                className="w-full accent-primary cursor-pointer mt-1"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-border/40">
            <div className="p-4 rounded-xl bg-background/40 border border-border/50 text-center">
              <div className="text-[10px] uppercase text-muted-foreground font-semibold">
                Boiling Point (1 atm)
              </div>
              <div className="text-xl font-bold font-display text-foreground mt-1">
                {selected.boilingPoint}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-background/40 border border-border/50 text-center">
              <div className="text-[10px] uppercase text-muted-foreground font-semibold">
                Target Suction (Low Side)
              </div>
              <div className="text-xl font-bold font-display text-primary mt-1">
                {suctionMin} - {suctionMax} <span className="text-xs font-normal">psig</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-background/40 border border-border/50 text-center">
              <div className="text-[10px] uppercase text-muted-foreground font-semibold">
                Target Discharge (High Side)
              </div>
              <div className="text-xl font-bold font-display text-primary mt-1">
                {dischargeMin} - {dischargeMax} <span className="text-xs font-normal">psig</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-background/40 border border-border/50 text-center">
              <div className="text-[10px] uppercase text-muted-foreground font-semibold">
                Standing Pressure (Off)
              </div>
              <div className="text-xl font-bold font-display text-foreground mt-1">
                ~{standingVal} <span className="text-xs font-normal">psig</span>
              </div>
            </div>
          </div>
        </div>

        {/* Complete lookup reference table */}
        <div className="bg-card/20 border border-border p-5 rounded-2xl space-y-3">
          <h3 className="text-base font-bold text-primary">
            Standard Operating Pressures (At 35°C Ambient Outdoor Temp)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse border border-border/40">
              <thead>
                <tr className="bg-muted/40 border-b border-border/40 font-semibold">
                  <th className="p-2 border-r border-border/40">Refrigerant</th>
                  <th className="p-2 border-r border-border/40">Suction (Low Side) Pressure</th>
                  <th className="p-2 border-r border-border/40">Discharge (High Side) Pressure</th>
                  <th className="p-2">Standing Pressure (Off)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {Object.keys(gasData).map((gas) => (
                  <tr key={gas}>
                    <td className="p-2 border-r border-border/40 font-semibold text-primary">
                      {gas}
                    </td>
                    <td className="p-2 border-r border-border/40 font-mono">
                      {Math.round(gasData[gas].baseSuction * 0.9)} -{" "}
                      {Math.round(gasData[gas].baseSuction * 1.1)} psig
                    </td>
                    <td className="p-2 border-r border-border/40 font-mono">
                      {Math.round(gasData[gas].baseDischarge * 0.9)} -{" "}
                      {Math.round(gasData[gas].baseDischarge * 1.1)} psig
                    </td>
                    <td className="p-2 font-mono">~{gasData[gas].baseStanding} psig</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-card/20 border border-border p-5 rounded-2xl space-y-3 text-xs leading-relaxed text-muted-foreground">
          <p className="font-semibold text-foreground">Important Gas Charging Guidelines:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              Always pull a vacuum of under 500 microns before charging to remove non-condensables.
            </li>
            <li>Charge R410A and R404A blends as liquid only to prevent blend fractionation.</li>
            <li>
              Standby or standing pressures should never be used as a primary guide for charge
              sufficiency.
            </li>
          </ul>
        </div>
      </div>
    </ArticleLayout>
  );
}

/* -------------------------------------------------------------------------- */
/* 12. Brand Comparisons Guide                                               */
/* -------------------------------------------------------------------------- */
export function BrandComparisonsView() {
  return (
    <ArticleLayout
      title="Carrier vs. Hitachi, Daikin, Mitsubishi, Voltas & O General AC: Which is Better?"
      category="Troubleshooting Guides"
    >
      <p>
        Choosing the right air conditioner for Indian summers requires comparing cooling efficiency,
        tropical performance at 50°C+, spare part costs, and long-term compressor reliability.
      </p>

      <h3 className="text-base font-semibold text-foreground">
        Carrier vs. Hitachi AC: Detailed Comparison
      </h3>
      <p>
        When evaluating **Carrier AC vs. Hitachi AC**, Carrier stands out for heavy-duty commercial
        scale engineering and robust copper condensers that withstand voltage fluctuations. Carrier
        units deliver high CFM airflow, making them excellent for larger rooms. On the other hand,
        **Hitachi AC** is celebrated for its quad-sensor technology and precision humidity control.
        Hitachi excels in sub-cooling loops and power-saving inverter logic, though spare parts for
        Hitachi are generally more expensive in the Indian aftermarket.
      </p>

      <h3 className="text-base font-semibold text-foreground">
        Carrier vs. O General AC: Heavy-Duty Cooling
      </h3>
      <p>
        Comparing **Carrier vs. O General AC**, O General represents the gold standard for
        hyper-tropical performance. O General units utilize oversized rotary compressors and robust
        casing to sustain rated tonnage even at 52°C ambient temperatures. However, O General
        requires a premium budget. Carrier provides a highly competitive alternative, offering
        similar durability at a 20-30% lower entry cost.
      </p>

      <h3 className="text-base font-semibold text-foreground">
        Mitsubishi vs. Voltas AC: Premium vs. Mass-Market Value
      </h3>
      <p>
        For residential users, **Mitsubishi vs. Voltas AC** is a choice between premium refinement
        and mass-market value. Mitsubishi Electric (and Mitsubishi Heavy Industries) ACs offer
        silent blowers (as low as 19 dBA) and exceptional build quality. **Voltas AC** is Tata's
        flagship cooling brand, offering unparalleled spare parts availability, simple maintenance,
        and an affordable price tag, making it the highest selling brand in India.
      </p>

      <h3 className="text-base font-semibold text-foreground">
        Daikin vs. Hitachi AC: Inverter Technology
      </h3>
      <p>
        Evaluating **Daikin vs. Hitachi AC**, Daikin features patented swing compressors that
        eliminate friction and gas leakage during cycles. Daikin is highly efficient at low load
        factors. Hitachi counters with its expandable inverter technology, which boosts compressor
        RPM beyond nameplate capacity during startup to achieve rapid pulldown.
      </p>

      {/* Comparison Matrix Table */}
      <div className="bg-card/25 border border-border p-5 rounded-2xl space-y-3">
        <h4 className="font-bold text-foreground text-xs">HVAC Brand Comparison Matrix</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse border border-border/40 font-mono">
            <thead>
              <tr className="bg-muted/40 border-b border-border/40 font-semibold">
                <th className="p-2 border-r border-border/40">Brand</th>
                <th className="p-2 border-r border-border/40">Tropical Sizing Limit</th>
                <th className="p-2 border-r border-border/40">Noise Profile</th>
                <th className="p-2">Part Replacement Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              <tr>
                <td className="p-2 border-r border-border/40 font-bold text-primary">O General</td>
                <td className="p-2 border-r border-border/40">55°C (Excellent)</td>
                <td className="p-2 border-r border-border/40">Moderate (High CFM)</td>
                <td className="p-2 text-amber-400">High</td>
              </tr>
              <tr>
                <td className="p-2 border-r border-border/40 font-bold text-primary">Daikin</td>
                <td className="p-2 border-r border-border/40">50°C (Good)</td>
                <td className="p-2 border-r border-border/40">Ultra-Quiet</td>
                <td className="p-2 text-emerald-400">Medium</td>
              </tr>
              <tr>
                <td className="p-2 border-r border-border/40 font-bold text-primary">Carrier</td>
                <td className="p-2 border-r border-border/40">52°C (Very Good)</td>
                <td className="p-2 border-r border-border/40">Quiet</td>
                <td className="p-2 text-emerald-400">Medium-Low</td>
              </tr>
              <tr>
                <td className="p-2 border-r border-border/40 font-bold text-primary">Voltas</td>
                <td className="p-2 border-r border-border/40">48°C (Standard)</td>
                <td className="p-2 border-r border-border/40">Standard</td>
                <td className="p-2 text-emerald-400">Low (Readily Available)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </ArticleLayout>
  );
}

/* -------------------------------------------------------------------------- */
/* 13. Refrigerator Troubleshooting Guide                                     */
/* -------------------------------------------------------------------------- */
export function RefrigeratorNotCoolingView() {
  return (
    <ArticleLayout
      title="Refrigerator Not Cooling: Haier, Bosch & Godrej Diagnostics"
      category="Troubleshooting Guides"
    >
      <p>
        A warm refrigerator puts perishables at risk. Here is how to diagnose cooling failures and
        click-out faults for Haier, Bosch, and Godrej refrigerators.
      </p>

      <h3 className="text-base font-semibold text-foreground">
        Godrej Refrigerator Cooling Problems & Solutions
      </h3>
      <p>
        A classic **Godrej refrigerator cooling problem** is a failed PTC starter relay or thermal
        Overload Protector (OLP). If you hear a regular clicking noise from the rear bottom panel
        every few minutes but the compressor motor fails to hum, the compressor is overloading.
        Replacing the starter kit (₹450 - ₹900) usually resolves this.
      </p>

      <h3 className="text-base font-semibold text-foreground">
        Bosch Refrigerator Not Cooling: Sensor & Inverter Faults
      </h3>
      <p>
        When a premium **Bosch refrigerator is not cooling**, the issue often stems from sensor
        resistance drift. Bosch dual-evaporator models rely on NTC thermistors to command the
        electronic air damper. If the E01 or E02 code appears, the damper is stuck closed,
        restricting cold airflow from the freezer to the fresh food cabin.
      </p>

      <h3 className="text-base font-semibold text-foreground">
        Haier Refrigerator Not Cooling / Not Working
      </h3>
      <p>
        If your **Haier refrigerator is not cooling** or not working, check the frost levels in the
        freezer compartment. Haier frost-free units frequently suffer from defrost bimetal failures.
        The evaporator coil gets choked with ice blocks, preventing the internal fan motor from
        blowing cold air. Manual defrosting and sensor replacement are required to restore airflow.
      </p>

      {/* Troubleshooting Checklist */}
      <div className="bg-card/25 border border-border p-5 rounded-2xl space-y-3">
        <h4 className="font-bold text-foreground text-xs uppercase text-primary">
          Field Troubleshooting Flowchart
        </h4>
        <ul className="space-y-2 list-none pl-0">
          <li className="flex gap-2">
            <span className="text-primary font-bold">1.</span>
            <span>Check condenser coils for dust insulation. Clean with air brush.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold">2.</span>
            <span>Check magnetic door gasket seal. Perform paper-pull test.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold">3.</span>
            <span>
              Check if evaporator fan is humming. If frozen, defrost manually for 12 hours.
            </span>
          </li>
        </ul>
      </div>
    </ArticleLayout>
  );
}

/* -------------------------------------------------------------------------- */
/* 14. HVAC/R Design Guidelines                                              */
/* -------------------------------------------------------------------------- */
export function HvacDesignGuideView() {
  return (
    <ArticleLayout
      title="HVAC Design: CFM Airflow, Line Sizing & Cooling Tower Sizing"
      category="Troubleshooting Guides"
    >
      <p>
        This engineering guide documents volumetric airflow (CFM), copper piping line velocities,
        and cooling tower heat rejection parameters.
      </p>

      <h3 className="text-base font-semibold text-foreground">CFM Airflow Sizing Guidelines</h3>
      <p>
        In comfort cooling HVAC designs, the standard airflow index is **400 CFM per Ton of
        cooling**. High latent heat environments (e.g. coastal regions) require a lower airflow
        rating (320-350 CFM/ton) to encourage moisture condensation. In dry climates, this can
        exceed **450 CFM/ton** for faster heat transfer.
      </p>

      <h3 className="text-base font-semibold text-foreground">
        Refrigeration Copper Line Sizing & Velocities
      </h3>
      <p>
        Copper refrigerant lines must be sized carefully. If the suction pipe is too thin, pressure
        drop increases, lowering compressor capacity. However, if the pipe is too wide, the vapor
        velocity drops below the minimum required (**500 FPM in horizontal runs and 1000 FPM in
        vertical risers**) to carry oil back to the compressor crankcase.
      </p>

      <h3 className="text-base font-semibold text-foreground">Cooling Tower Approach & Sizing</h3>
      <p>
        The **cooling tower approach** is defined as the temperature difference between the cold
        water leaving the tower and the wet bulb temperature of the entering air:
      </p>
      <div className="font-mono text-xs text-foreground bg-slate-950 p-3 rounded-lg text-center">
        Approach = Cold Water Temperature - Wet Bulb Temperature
      </div>
      <p>
        A smaller approach temperature indicates a highly efficient cooling tower. Typically, towers
        are designed for a 3°C to 5°C approach limit.
      </p>
    </ArticleLayout>
  );
}

/* -------------------------------------------------------------------------- */
/* 15. Refrigerant Pressures & Vacuum Conversions                           */
/* -------------------------------------------------------------------------- */
export function RefrigerantPressuresChartView() {
  return (
    <ArticleLayout
      title="Refrigerant Pressures & Vacuum Micron Conversions"
      category="Troubleshooting Guides"
    >
      <p>A reference guide for refrigerant operating pressures and deep vacuum conversions.</p>

      <h3 className="text-base font-semibold text-foreground">R32 & R404A Pressures Chart</h3>
      <p>
        **R32 refrigerant pressures** operate at approximately 120-130 psig suction side, and 380
        psig head side in standard conditions. **Freon 404A (R404A)** is designed for
        low-temperature food storage, operating at 15-25 psig suction for deep freezing (-20°C
        target temperature).
      </p>

      <h3 className="text-base font-semibold text-foreground">High Head Pressure & R407C Glides</h3>
      <p>
        **High head pressure** indicates a dirty condenser, non-condensable gas traps, or system
        overcharging. For **R407C systems**, head pressure typically ranges between 270-300 psig.
        Because R407C is a zeotropic blend, it exhibits a temperature glide of about 5°C, meaning it
        boils and condenses at varying temperatures.
      </p>

      <h3 className="text-base font-semibold text-foreground">Vacuum Micron Conversion Chart</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse border border-border/40 font-mono">
          <thead>
            <tr className="bg-muted/40 border-b border-border/40 font-semibold">
              <th className="p-2 border-r border-border/40">Microns</th>
              <th className="p-2 border-r border-border/40">Torr / mmHg</th>
              <th className="p-2 border-r border-border/40">Pascals (Pa)</th>
              <th className="p-2">mbar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            <tr>
              <td className="p-2 border-r border-border/40 font-bold text-primary">500 (Target)</td>
              <td className="p-2 border-r border-border/40">0.5</td>
              <td className="p-2 border-r border-border/40">66.6</td>
              <td className="p-2">0.66</td>
            </tr>
            <tr>
              <td className="p-2 border-r border-border/40">1000</td>
              <td className="p-2 border-r border-border/40">1.0</td>
              <td className="p-2 border-r border-border/40">133.3</td>
              <td className="p-2">1.33</td>
            </tr>
            <tr>
              <td className="p-2 border-r border-border/40">5000</td>
              <td className="p-2 border-r border-border/40">5.0</td>
              <td className="p-2 border-r border-border/40">666.6</td>
              <td className="p-2">6.66</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-base font-semibold text-foreground">Energy Efficiency conversions</h3>
      <p>
        Convert rating types dynamically: * **EER to COP**: `COP = EER / 3.412` * **SEER to EER**:
        `EER = SEER * 0.875` (approximate comfort factor) * **HSPF to COP**: `COP = HSPF * 0.293`
        (for heating cycles)
      </p>
    </ArticleLayout>
  );
}

/* -------------------------------------------------------------------------- */
/* 16. AC Leaks & Gas Charging                                                */
/* -------------------------------------------------------------------------- */
export function AcLeaksGasChargingView() {
  return (
    <ArticleLayout
      title="AC Water Leaks & Refrigerant Gas Charging Procedures"
      category="Troubleshooting Guides"
    >
      <p>
        This guide covers diagnosing AC water leak paths and executing precise gas recharging
        procedures.
      </p>

      <h3 className="text-base font-semibold text-foreground">AC Leaking Water: Root Causes</h3>
      <p>
        An **AC leaking water** inside the room is usually caused by: * **Blocked Condensate Drain
        Pipe**: Dust and slime block water flow, backing up the evaporator tray. * **Frozen
        Evaporator Coils**: Ice blocks melt rapidly when the compressor cycles off, overflowing the
        drain pan. * **Improper Slope**: If the indoor unit is not tilted slightly toward the drain
        outlet, water will overflow the front panel.
      </p>

      <h3 className="text-base font-semibold text-foreground">Refrigerant Gas Charging Steps</h3>
      <p>
        When performing **gas charging in AC units**: 1. **Leak Check**: Pressurize the loop with
        nitrogen (up to 350 psig for R410A) and check joints with soap solution. 2. **Evacuation**:
        Connect a dual-stage vacuum pump and pull down below **500 microns** to dry the piping. 3.
        **Charge by Weight**: Position the cylinder upside down on a digital charging scale, and
        charge refrigerant as liquid into the liquid line port to match the manufacturer's exact
        weight spec.
      </p>
    </ArticleLayout>
  );
}
