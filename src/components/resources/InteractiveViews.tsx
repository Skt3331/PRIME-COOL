import { useState } from "react";
import { Brain, CheckCircle2, AlertTriangle, ShieldCheck, HelpCircle, Wrench, RefreshCw, Zap, DollarSign, ListChecks, ArrowRight, ClipboardList } from "lucide-react";

// Helper wrapper
function InteractiveCard({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
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

/* -------------------------------------------------------------------------- */
/* 1. HVAC/R Quiz View                                                        */
/* -------------------------------------------------------------------------- */
interface Question {
  q: string;
  options: string[];
  correct: number;
  explanation: string;
}

const quizQuestions: Question[] = [
  {
    q: "What is the primary indicator of refrigerant charge level in a system equipped with a thermal expansion valve (TXV)?",
    options: ["Superheat", "Subcooling", "Discharge temperature", "Evaporator air pressure drop"],
    correct: 1,
    explanation: "Systems with a TXV maintain a constant superheat at the evaporator outlet. Therefore, liquid line subcooling is the primary indicator used to verify proper refrigerant charge.",
  },
  {
    q: "If a system has low suction pressure and high superheat, what is the most likely issue?",
    options: ["Blocked condenser fan motor", "Overcharged refrigerant", "Undercharged refrigerant or restricted expansion valve", "Dirty indoor air filter"],
    correct: 2,
    explanation: "Low refrigerant charge or a restricted metering device reduces refrigerant flow to the evaporator, resulting in low suction pressure and elevated suction line superheat.",
  },
  {
    q: "What does a high vacuum level of 2000 microns after evacuation indicate?",
    options: ["A dry, moisture-free system", "Presence of moisture or a vacuum leak", "A fully charged refrigeration loop", "An optimal deep vacuum"],
    correct: 1,
    explanation: "An industry-standard deep vacuum is 500 microns or below. A reading that rises and stays at 2000 microns indicates trapped moisture or a small leak in the piping.",
  },
  {
    q: "Which refrigerant is a low-GWP replacement for R410A classified as A2L (mildly flammable)?",
    options: ["R22", "R32", "R404A", "R134a"],
    correct: 1,
    explanation: "R32 has a GWP of 675 (compared to 2088 for R410A) and is classified under safety standard ASHRAE 34 as A2L (mildly flammable).",
  },
  {
    q: "What happens to the suction pressure if the indoor blower motor fails completely?",
    options: ["It rises significantly", "It remains unchanged", "It drops, eventually leading to evaporator coil freezing", "The discharge pressure will double instantly"],
    correct: 2,
    explanation: "Without air blowing over the evaporator coil, heat transfer stops. The temperature and pressure of the refrigerant drop, causing the coil to freeze.",
  },
  {
    q: "What is the compression ratio of a compressor operating at 350 PSIG discharge and 70 PSIG suction pressure?",
    options: ["5.0:1", "4.3:1", "3.2:1", "6.2:1"],
    correct: 1,
    explanation: "Compression Ratio = (Discharge + 14.7) / (Suction + 14.7) = (350 + 14.7) / (70 + 14.7) = 364.7 / 84.7 = 4.3:1. (Always use absolute pressures).",
  },
  {
    q: "What type of compressor oil is highly hygroscopic and typically paired with HFC refrigerants?",
    options: ["Mineral Oil (MO)", "Alkylbenzene Oil (AB)", "Polyolester Oil (POE)", "Silicone Oil"],
    correct: 2,
    explanation: "POE oil is the standard lubricant for HFC refrigerants like R134a and R410A because of its compatibility. However, POE is highly hygroscopic and absorbs moisture rapidly.",
  },
  {
    q: "In a commercial walk-in freezer, what is the typical function of the defrost termination thermostat?",
    options: ["To start the compressor when the temperature rises", "To terminate defrost cycle based on coil temperature", "To sound an alarm if the door is left open", "To control the liquid line solenoid valve"],
    correct: 1,
    explanation: "Defrost heaters melt frost on the evaporator coil. The termination thermostat senses when the coil has warmed up enough to ensure all frost has melted, switching the system back to refrigeration mode.",
  },
  {
    q: "Which device protects a compressor from slugging liquid refrigerant back to the crankcase?",
    options: ["Filter drier", "Oil separator", "Suction line accumulator", "Discharge muffler"],
    correct: 2,
    explanation: "A suction accumulator is a reservoir placed before the compressor suction port designed to catch liquid refrigerant, allowing only vapor to enter the compressor.",
  },
  {
    q: "What causes non-condensable gases to accumulate inside an air conditioning system?",
    options: ["Refrigerant decomposition from high temperatures", "Charging the system with liquid instead of vapor", "Failure to pull a proper vacuum before charging", "A faulty thermal expansion valve bulb"],
    correct: 2,
    explanation: "Failing to evacuate air and moisture from the lines before charging traps nitrogen, oxygen, and moisture in the condenser, raising head pressure and energy costs.",
  },
];

export function HvacQuizView() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleNext = () => {
    if (selectedOpt === quizQuestions[currentIdx].correct) {
      setScore(score + 1);
    }
    setSelectedOpt(null);
    setSubmitted(false);
    
    if (currentIdx + 1 < quizQuestions.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setScore(0);
    setSubmitted(false);
    setQuizFinished(false);
  };

  if (quizFinished) {
    return (
      <InteractiveCard title="HVAC/R Technician Quiz" desc="Test your refrigeration cycle, diagnostics, and standards knowledge.">
        <div className="text-center py-6 space-y-4">
          <Brain className="h-16 w-16 text-primary mx-auto animate-pulse" />
          <h3 className="text-2xl font-bold text-foreground">Quiz Completed!</h3>
          <p className="text-sm text-muted-foreground">
            You scored <strong className="text-primary text-lg">{score}</strong> out of <strong className="text-foreground text-lg">{quizQuestions.length}</strong>.
          </p>
          
          <div className="bg-card/25 p-4 rounded-xl border border-border max-w-md mx-auto text-xs space-y-2">
            <h4 className="font-bold text-foreground">Score Assessment:</h4>
            {score >= 9 ? (
              <p className="text-emerald-400 font-semibold">Master Level! You have outstanding diagnostic skills and technical understanding.</p>
            ) : score >= 6 ? (
              <p className="text-yellow-400 font-semibold">Competent Technician! A solid grasp, but some study of thermodynamics is recommended.</p>
            ) : (
              <p className="text-rose-400 font-semibold">Apprentice Level! Keep practicing and reviewing standard HVAC manuals.</p>
            )}
          </div>

          <button onClick={resetQuiz} className="px-5 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/95 transition inline-flex items-center gap-1.5 mt-4">
            <RefreshCw className="h-4 w-4" />
            <span>Retake Quiz</span>
          </button>
        </div>
      </InteractiveCard>
    );
  }

  const q = quizQuestions[currentIdx];

  return (
    <InteractiveCard title="HVAC/R Technician Quiz" desc="Test your refrigeration cycle, diagnostics, and standards knowledge.">
      <div className="space-y-6">
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>Question {currentIdx + 1} of {quizQuestions.length}</span>
          <span className="font-semibold text-primary">Score: {score}</span>
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-bold text-foreground leading-snug">{q.q}</h3>
          
          <div className="space-y-2">
            {q.options.map((opt, i) => {
              let optClass = "border-border/60 hover:bg-card/30";
              if (submitted) {
                if (i === q.correct) {
                  optClass = "border-emerald-500/50 bg-emerald-500/10 text-emerald-400 font-semibold";
                } else if (selectedOpt === i) {
                  optClass = "border-rose-500/50 bg-rose-500/10 text-rose-400";
                } else {
                  optClass = "border-border/30 opacity-60";
                }
              } else if (selectedOpt === i) {
                optClass = "border-primary bg-primary/10 text-primary font-semibold";
              }

              return (
                <button
                  key={i}
                  disabled={submitted}
                  onClick={() => setSelectedOpt(i)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs transition flex items-center justify-between ${optClass}`}
                >
                  <span>{opt}</span>
                  {submitted && i === q.correct && <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 ml-2" />}
                  {submitted && selectedOpt === i && i !== q.correct && <AlertTriangle className="h-4 w-4 text-rose-400 shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>
        </div>

        {submitted && (
          <div className="bg-primary/5 border border-primary/20 p-4 rounded-xl space-y-1.5">
            <h4 className="text-xs font-bold text-primary">Explanation:</h4>
            <p className="text-xs text-muted-foreground leading-normal">{q.explanation}</p>
          </div>
        )}

        <div className="flex justify-end pt-2">
          {!submitted ? (
            <button
              disabled={selectedOpt === null}
              onClick={() => setSubmitted(true)}
              className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs disabled:opacity-50 transition"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/95 transition inline-flex items-center gap-1.5"
            >
              <span>{currentIdx + 1 === quizQuestions.length ? "Finish Quiz" : "Next Question"}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </InteractiveCard>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. Refrigeration Troubleshooting Wizard                                     */
/* -------------------------------------------------------------------------- */
interface WizardNode {
  question: string;
  choices: { text: string; nextNode: string }[];
  resolution?: string;
}

const wizardTree: Record<string, WizardNode> = {
  start: {
    question: "Select the primary symptom you are experiencing with the AC/Refrigeration system:",
    choices: [
      { text: "System is not cooling at all (Warm air blowing / Compressor off)", nextNode: "not_cooling" },
      { text: "System is cooling, but not enough (Insufficient capacity / Constant run)", nextNode: "insufficient_cooling" },
      { text: "Compressor turns on and off constantly (Short cycling)", nextNode: "short_cycling" },
      { text: "Ice formation / Frosting on indoor unit coils", nextNode: "ice_formation" },
    ],
  },
  not_cooling: {
    question: "Is the outdoor unit (condenser fan and compressor) running?",
    choices: [
      { text: "Yes, fan is spinning but compressor feels off/humming", nextNode: "fan_runs_comp_off" },
      { text: "No, both outdoor fan and compressor are completely dead", nextNode: "outdoor_dead" },
    ],
  },
  fan_runs_comp_off: {
    question: "A humming compressor that doesn't start usually points to electrical motor assist issues.",
    choices: [],
    resolution: "Recommendation: Inspect the Dual Run Capacitor. A bulged, failed capacitor is the #1 reason a compressor fails to start. If the capacitor measures fine, the compressor is likely locked up mechanically or has tripped its internal overload.",
  },
  outdoor_dead: {
    question: "Is the indoor thermostat sending a cooling signal (contactor pulled in)?",
    choices: [
      { text: "Yes, contactor button is pushed in on the outdoor unit", nextNode: "contactor_engaged" },
      { text: "No, outdoor unit is not receiving 24V control signal", nextNode: "no_control_voltage" },
    ],
  },
  contactor_engaged: {
    question: "Contactor is closed but no power reaches outdoor components.",
    choices: [],
    resolution: "Recommendation: Check the outdoor disconnect switch box and the main circuit breaker. You likely have a blown cartridge fuse, a tripped breaker, or burnt wiring at the contactor terminals.",
  },
  no_control_voltage: {
    question: "No 24V signal is coming from the thermostat or control board.",
    choices: [],
    resolution: "Recommendation: Check the thermostat settings, the safety switches (like float switches in drain pans), and the low-voltage fuse on the indoor furnace/air handler control board. Tripped condensate overflow switches are a common cause.",
  },
  insufficient_cooling: {
    question: "Measure the temperature difference (Delta T) between the supply air and return air grills:",
    choices: [
      { text: "Delta T is less than 15°F (Weak cooling)", nextNode: "weak_delta_t" },
      { text: "Delta T is normal (18°F to 22°F) but indoor stays warm", nextNode: "normal_delta_t_warm" },
    ],
  },
  weak_delta_t: {
    question: "Are the refrigeration pipes leading to the outdoor unit showing any unusual indicators?",
    choices: [
      { text: "Suction line has ice on it or is freezing cold", nextNode: "suction_line_frost" },
      { text: "Liquid line feels hot, suction line is warm", nextNode: "warm_suction" },
    ],
  },
  suction_line_frost: {
    question: "Frost indicates saturated temperature is dropping below freezing.",
    choices: [],
    resolution: "Recommendation: Airflow issue. Check for a clogged air filter, closed register dampers, dirty evaporator coil fins, or a slipping fan belt. If airflow is clear, the system has a low refrigerant charge (leak).",
  },
  warm_suction: {
    question: "Warm suction suggests lack of refrigerant or inactive expansion valve.",
    choices: [],
    resolution: "Recommendation: Check refrigerant pressures. This indicates a leak leading to an undercharged loop, or a stuck-closed TXV restricting refrigerant flow.",
  },
  normal_delta_t_warm: {
    question: "Your AC is generating standard cooling output, but cannot keep up with the structural load.",
    choices: [],
    resolution: "Recommendation: Check for extreme outdoor temperatures, lack of building insulation, open doors/windows, or an undersized AC unit for the space. Jet clean the outdoor condenser coil as high head pressure reduces operational capacity.",
  },
  short_cycling: {
    question: "Does the system cut off on low-pressure or high-pressure safety switches?",
    choices: [
      { text: "Trips low-pressure switch (low suction side)", nextNode: "low_pressure_trip" },
      { text: "Trips high-pressure switch (high discharge side)", nextNode: "high_pressure_trip" },
    ],
  },
  low_pressure_trip: {
    question: "Low suction side safety cuts out.",
    choices: [],
    resolution: "Recommendation: Verify refrigerant charge. The low pressure switch cuts the compressor to protect it from running dry due to a refrigerant leak. Also check for a completely blocked evaporator filter.",
  },
  high_pressure_trip: {
    question: "High pressure cuts out.",
    choices: [],
    resolution: "Recommendation: Condenser heat dissipation failure. Wash dirt out of the condenser coils. Ensure the outdoor fan is spinning at full speed. Overcharging the system will also trip the high-pressure switch.",
  },
  ice_formation: {
    question: "Is the air filter clean and the indoor blower motor spinning at full speed?",
    choices: [
      { text: "Yes, air filter is clean and blower is running fine", nextNode: "suction_line_frost" },
      { text: "No, air filter is clogged or blower motor is sluggish", nextNode: "fix_airflow" },
    ],
  },
  fix_airflow: {
    question: "Airflow restriction drops evaporator temperature below freezing point of water.",
    choices: [],
    resolution: "Recommendation: Replace the air filter immediately and clean the indoor fan blower. Let the coil defrost completely (run FAN ONLY mode) before starting cooling again.",
  },
};

export function TroubleshootingWizardView() {
  const [currentNode, setCurrentNode] = useState("start");
  const [history, setHistory] = useState<string[]>([]);

  const node = wizardTree[currentNode] || wizardTree.start;

  const handleSelectChoice = (next: string) => {
    setHistory([...history, currentNode]);
    setCurrentNode(next);
  };

  const handleBack = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setCurrentNode(prev);
      setHistory(history.slice(0, -1));
    }
  };

  const handleReset = () => {
    setCurrentNode("start");
    setHistory([]);
  };

  return (
    <InteractiveCard title="Troubleshooting Diagnostic Wizard" desc="Interactive decision tree to diagnose common faults in air conditioners and commercial coolers.">
      <div className="space-y-6">
        <div className="bg-card/25 border border-border/80 p-5 rounded-2xl relative">
          <div className="absolute top-3 right-3 text-[10px] text-muted-foreground uppercase font-semibold">Diagnostic Engine</div>
          
          <div className="space-y-4">
            {!node.resolution && <h3 className="text-base font-bold text-foreground pr-10">{node.question}</h3>}

            {node.resolution ? (
              <div className="space-y-4">
                <div className="flex gap-2.5 items-start p-4 rounded-xl border border-primary/20 bg-primary/5 text-xs text-foreground leading-relaxed">
                  <Wrench className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-primary mb-1">Diagnostic Resolution:</h4>
                    <p>{node.resolution}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Disclaimer: High-voltage diagnostics and refrigerant line servicing must only be performed by certified technicians. Call Prime Cool Solutions for on-site support.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {node.choices.map((choice, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectChoice(choice.nextNode)}
                    className="w-full text-left p-3.5 rounded-xl border border-border hover:border-primary hover:bg-primary/5 text-xs transition flex justify-between items-center text-foreground"
                  >
                    <span>{choice.text}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center">
          {history.length > 0 ? (
            <button onClick={handleBack} className="px-4 py-2 rounded-lg border border-border hover:bg-card/50 text-xs font-semibold text-muted-foreground transition">
              Back
            </button>
          ) : (
            <div />
          )}

          <button onClick={handleReset} className="px-4 py-2 rounded-lg border border-border/60 hover:bg-card/50 text-xs font-semibold text-primary transition flex items-center gap-1">
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Reset Wizard</span>
          </button>
        </div>
      </div>
    </InteractiveCard>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. Refrigerant Selector Tool                                               */
/* -------------------------------------------------------------------------- */
export function RefrigerantSelectorView() {
  const [app, setApp] = useState("ac"); // ac, med-temp, low-temp
  const [gwpLimit, setGwpLimit] = useState(1500);
  const [flammableAllowed, setFlammableAllowed] = useState(true);

  // Recommendations logic
  let selection = "R410A";
  let why = "";

  if (app === "ac") {
    if (gwpLimit < 700) {
      if (flammableAllowed) {
        selection = "R32";
        why = "Excellent thermal performance and lower charge size. Standard replacement for R410A with moderate A2L flammability.";
      } else {
        selection = "R410A";
        why = "Non-flammable safety compliance limits low-GWP options. R410A is a safe A1 selection despite its GWP of 2088.";
      }
    } else {
      selection = "R410A";
      why = "Widely available, high-pressure design, zero flammability hazard. Best compatibility for residential and light commercial splits.";
    }
  } else if (app === "med-temp") {
    if (gwpLimit < 2000) {
      selection = "R134a";
      why = "Low operating pressures and high critical temperature. Perfect for commercial display cases and medium-temperature walk-ins.";
    } else {
      selection = "R407C / R404A";
      why = "Widely supported for mid-temp refrigeration, though R404A has a high GWP of 3922 which is subject to phase-downs.";
    }
  } else {
    // low-temp
    if (gwpLimit < 2500) {
      selection = "R448A / R449A";
      why = "Lower-GWP HFO blends designed as eco-friendly drop-ins to replace R404A in freezer rooms.";
    } else {
      selection = "R404A";
      why = "Classic standard for deep freezing (-20°C to -30°C). Provides outstanding envelope reliability, but restricted in new installs due to GWP.";
    }
  }

  return (
    <InteractiveCard title="Refrigerant Selection Assistant" desc="Find the optimal refrigerant choice based on application temperature guidelines, flammability constraints, and GWP limits.">
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground font-semibold">Application Class</label>
            <select
              value={app}
              onChange={(e) => setApp(e.target.value)}
              className="w-full rounded-lg border border-border bg-background/50 px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="ac">Air Conditioning (Evap temp: 5°C to 12°C)</option>
              <option value="med-temp">Medium Temp Refrigeration (Evap temp: -5°C to 2°C)</option>
              <option value="low-temp">Low Temp Deep Freezer (Evap temp: -30°C to -15°C)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground font-semibold block">Maximum Allowable GWP Index</label>
            <div className="flex gap-4 text-xs">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="radio" checked={gwpLimit < 1000} onChange={() => setGwpLimit(700)} className="accent-primary" />
                <span>Low (&lt; 1000)</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="radio" checked={gwpLimit >= 1000} onChange={() => setGwpLimit(2500)} className="accent-primary" />
                <span>Standard (&lt; 2500)</span>
              </label>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground font-semibold block">Flammable (A2L/A3) Refrigerants Allowed?</label>
            <div className="flex gap-4 text-xs">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="radio" checked={flammableAllowed} onChange={() => setFlammableAllowed(true)} className="accent-primary" />
                <span>Yes (R32 / Hydrocarbons)</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="radio" checked={!flammableAllowed} onChange={() => setFlammableAllowed(false)} className="accent-primary" />
                <span>No (A1 Safety Class Only)</span>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-background/40 border border-border p-5 rounded-2xl space-y-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Recommended Refrigerant Type</div>
          <div className="text-4xl font-display font-bold text-primary">{selection}</div>
          
          <div className="space-y-2.5 pt-2 border-t border-border/40">
            <div className="text-xs text-foreground font-semibold">Selection Rationale:</div>
            <p className="text-xs text-muted-foreground leading-relaxed">{why}</p>
          </div>
        </div>
      </div>
    </InteractiveCard>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. AC Installation Cost Estimator                                          */
/* -------------------------------------------------------------------------- */
export function CostEstimatorView() {
  const [acType, setAcType] = useState("split"); // split, cassette, ductable
  const [tonnage, setTonnage] = useState(1.5);
  const [pipingFeet, setPipingFeet] = useState(15);
  const [bracketNeeded, setBracketNeeded] = useState(true);

  // Math variables
  const baseCostMap: Record<string, number> = {
    split: 2500, // INR basic split installation
    cassette: 6000,
    ductable: 12000,
  };

  const baseInstallCost = baseCostMap[acType] || 2500;
  const standardPipingAllowance = 10; // 10 ft included usually
  const extraPipingLength = Math.max(0, pipingFeet - standardPipingAllowance);
  const extraPipingCost = extraPipingLength * 280; // 280 INR per foot copper cabling
  const bracketCost = bracketNeeded ? 750 : 0;
  
  const estimatedTotal = baseInstallCost + extraPipingCost + bracketCost;

  return (
    <InteractiveCard title="AC Installation Cost Estimator" desc="Calculate the estimated installation labor and material costs for air conditioners in Pune & Mumbai districts.">
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground font-semibold">Indoor Unit Type</label>
            <select
              value={acType}
              onChange={(e) => setAcType(e.target.value)}
              className="w-full rounded-lg border border-border bg-background/50 px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="split">Hi-Wall Split AC (Standard)</option>
              <option value="cassette">Ceiling Cassette AC (Office/Shop)</option>
              <option value="ductable">Ductable Split System (Commercial)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground font-semibold">Tonnage Rating</label>
            <select
              value={tonnage}
              onChange={(e) => setTonnage(parseFloat(e.target.value))}
              className="w-full rounded-lg border border-border bg-background/50 px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value={1.0}>1.0 Ton</option>
              <option value={1.5}>1.5 Ton</option>
              <option value={2.0}>2.0 Ton</option>
              <option value={3.0}>3.0 Ton +</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <label className="text-muted-foreground font-semibold">Total Pipe Run Length</label>
              <span className="text-primary font-mono">{pipingFeet} ft</span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              step={5}
              value={pipingFeet}
              onChange={(e) => setPipingFeet(parseInt(e.target.value))}
              className="w-full accent-primary cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-muted-foreground">
              <input
                type="checkbox"
                checked={bracketNeeded}
                onChange={(e) => setBracketNeeded(e.target.checked)}
                className="accent-primary rounded"
              />
              <span>Include Outdoor Wall Bracket (+ ₹750)</span>
            </label>
          </div>
        </div>

        <div className="bg-background/40 border border-border p-5 rounded-2xl space-y-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Installation Cost Estimate</div>
          <div className="text-4xl font-display font-bold text-gradient">₹{estimatedTotal.toLocaleString()}</div>
          
          <div className="space-y-1 pt-2 border-t border-border/40 text-xs">
            <div className="flex justify-between py-1 border-b border-border/20 text-muted-foreground">
              <span>Base Labor Installation</span>
              <span className="font-mono">₹{baseInstallCost}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/20 text-muted-foreground">
              <span>Extra Copper & Cable ({extraPipingLength} ft)</span>
              <span className="font-mono">₹{extraPipingCost}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/20 text-muted-foreground">
              <span>Outdoor Mounting Bracket</span>
              <span className="font-mono">₹{bracketCost}</span>
            </div>
            <div className="pt-3 font-semibold text-foreground leading-normal">
              Note: Estimates exclude core-cutting through concrete structural walls and scaffold hoisting charges if installing higher than second floors.
            </div>
          </div>
        </div>
      </div>
    </InteractiveCard>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. PM Checklist Generator                                                  */
/* -------------------------------------------------------------------------- */
interface ChecklistTask {
  category: string;
  tasks: string[];
}

const checklists: Record<string, ChecklistTask[]> = {
  split: [
    {
      category: "Indoor Unit Diagnostics",
      tasks: [
        "Clean and disinfect air filters and front grill",
        "Wash condensate drain tray and inspect drain outlet drainage path",
        "Chemically spray and wipe aluminum evaporator coil fins",
        "Verify indoor fan blower wheel balance and speed",
        "Inspect electrical wiring terminals and power cord plug"
      ],
    },
    {
      category: "Outdoor Unit Inspection",
      tasks: [
        "Jet wash aluminum condenser coils with high-pressure water pump",
        "Check condenser fan motor amperage draw and rotation balance",
        "Inspect contactor points for pitting or burn marks",
        "Verify run capacitor capacitance microfarads using multimeter",
        "Measure suction and discharge pressures under load"
      ],
    },
  ],
  chiller: [
    {
      category: "Compressor & Lubrication",
      tasks: [
        "Measure oil pressure levels and oil heater crankcase voltage",
        "Inspect oil filter pressure drop and run oil acidity analysis",
        "Verify vibration isolators and listen for internal bearing wear sounds",
        "Check compressor motor insulation resistance (Megger test)"
      ],
    },
    {
      category: "Evaporator & Condenser Loop",
      tasks: [
        "Inspect water flow rates and check water loop pump pressure metrics",
        "Verify chiller barrel approach temperatures to check for tube scaling",
        "Calibrate chilled water inlet/outlet thermistors",
        "Purge air pockets from the hydronic piping headers"
      ],
    },
  ],
  coldroom: [
    {
      category: "Evaporator Unit checks",
      tasks: [
        "Verify defrost heater resistance elements and operation",
        "Check defrost termination sensor and high-limit safety cutouts",
        "Clean copper drain lines and heat cables inside drain pan",
        "Ensure evaporator fan blades spin clear of ice blockages"
      ],
    },
    {
      category: "Enclosure Seals",
      tasks: [
        "Inspect walk-in cooler door gaskets for rips, tears, or drafts",
        "Wipe thermal escape pressure relief ports",
        "Test walk-in safety latch lock release handle from the inside",
        "Verify strip curtains are aligned correctly to reduce air exchange"
      ],
    },
  ],
};

export function PmChecklistGeneratorView() {
  const [eqType, setEqType] = useState("split");
  const [isGenerated, setIsGenerated] = useState(false);

  const selectedList = checklists[eqType] || checklists.split;

  return (
    <InteractiveCard title="Preventive Maintenance Checklist Generator" desc="Generate customized mechanical PM checklist sheets for home air conditioners, commercial chillers, or cold rooms.">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="space-y-1.5 flex-1 min-w-[200px]">
            <label className="text-xs text-muted-foreground font-semibold">Equipment Type</label>
            <select
              value={eqType}
              onChange={(e) => {
                setEqType(e.target.value);
                setIsGenerated(false);
              }}
              className="w-full rounded-lg border border-border bg-background/50 px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="split">Hi-Wall Split / Window AC</option>
              <option value="chiller">Water-Cooled / Air-Cooled Chiller</option>
              <option value="coldroom">Commercial Cold Storage / Freezer Room</option>
            </select>
          </div>
          <button
            onClick={() => setIsGenerated(true)}
            className="px-5 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/95 transition inline-flex items-center gap-1.5 shrink-0 h-9"
          >
            <ClipboardList className="h-4 w-4" />
            <span>Generate Checklist</span>
          </button>
        </div>

        {isGenerated && (
          <div className="bg-card/30 border border-border/80 p-6 rounded-2xl space-y-6 animate-fadeIn">
            <div className="flex justify-between items-start pb-4 border-b border-border/40">
              <div>
                <h3 className="text-lg font-bold text-foreground capitalize">{eqType} PM Work Checklist</h3>
                <p className="text-[10px] text-muted-foreground mt-0.5">Prime Cool Solutions Quality Compliance Form</p>
              </div>
              <span className="text-[10px] bg-primary/20 text-primary border border-primary/30 px-2 py-0.5 rounded-full uppercase font-semibold">Standard PM Form</span>
            </div>

            <div className="space-y-6">
              {selectedList.map((cat, i) => (
                <div key={i} className="space-y-2.5">
                  <h4 className="text-xs font-bold text-primary tracking-wide uppercase">{cat.category}</h4>
                  <div className="space-y-1.5">
                    {cat.tasks.map((task, j) => (
                      <label key={j} className="flex items-start gap-2.5 text-xs text-muted-foreground hover:text-foreground cursor-pointer select-none">
                        <input type="checkbox" className="accent-primary rounded mt-0.5 shrink-0" />
                        <span>{task}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-border/40 flex justify-between items-center text-[10px] text-muted-foreground">
              <span>Date: ________________</span>
              <span>Technician Signature: ________________</span>
            </div>
          </div>
        )}
      </div>
    </InteractiveCard>
  );
}

/* -------------------------------------------------------------------------- */
/* 6. HVAC ROI / Energy Savings Calculator                                    */
/* -------------------------------------------------------------------------- */
export function RoiCalculatorView() {
  const [oldCop, setOldCop] = useState(2.5); // Old non-inverter AC
  const [newCop, setNewCop] = useState(4.2); // New 5-star inverter AC
  const [tonnage, setTonnage] = useState(1.5);
  const [hours, setHours] = useState(8);
  const [electricityRate, setElectricityRate] = useState(10);
  const [newAcCost, setNewAcCost] = useState(45000);

  // Electrical kW = cooling capacity / COP
  // Cooling capacity = tonnage * 3.517 kW
  const coolingKw = tonnage * 3.517;
  const oldKw = coolingKw / oldCop;
  const newKw = coolingKw / newCop;
  
  const dailyOldKwh = oldKw * hours;
  const dailyNewKwh = newKw * hours;
  const dailySavingsKwh = dailyOldKwh - dailyNewKwh;

  const monthlySavings = dailySavingsKwh * 30 * electricityRate;
  const annualSavings = monthlySavings * 10; // assuming 10 heavy cooling months per year
  const paybackYears = newAcCost / (annualSavings || 1);

  return (
    <InteractiveCard title="AC Efficiency ROI & Payback Calculator" desc="Calculate the estimated monthly energy bill savings and amortization period when upgrading to a high-efficiency inverter AC.">
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <NumericInput label="AC Capacity (Tons)" value={tonnage} onChange={setTonnage} unit="Tons" min={1.0} max={10.0} step={0.5} />
          <NumericInput label="Old AC COP Rating" value={oldCop} onChange={setOldCop} unit="COP" min={1.8} max={3.2} step={0.1} />
          <NumericInput label="New AC COP Rating" value={newCop} onChange={setNewCop} unit="COP" min={3.5} max={5.5} step={0.1} />
          <NumericInput label="Daily Hours of Operation" value={hours} onChange={setHours} unit="Hours/Day" min={2} max={24} />
          <NumericInput label="Cost of New AC System" value={newAcCost} onChange={setNewAcCost} unit="₹" min={25000} max={120000} step={2000} />
          <NumericInput label="Electricity Rate (per Unit)" value={electricityRate} onChange={setElectricityRate} unit="₹/kWh" min={5} max={20} step={0.5} />
        </div>

        <div className="bg-background/40 border border-border p-5 rounded-2xl space-y-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Payback & ROI Analytics</div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-[10px] text-muted-foreground">ANNUAL ENERGY SAVINGS</div>
              <div className="text-xl font-bold font-display text-primary">₹{Math.round(annualSavings).toLocaleString()}</div>
            </div>
            <div>
              <div className="text-[10px] text-muted-foreground">PAYBACK PERIOD</div>
              <div className="text-xl font-bold font-display text-gradient">
                {paybackYears > 8 ? "8+ Years" : `${paybackYears.toFixed(1)} Years`}
              </div>
            </div>
          </div>

          <div className="space-y-1.5 pt-3 border-t border-border/40 text-xs">
            <div className="flex justify-between py-1 border-b border-border/20 text-muted-foreground">
              <span>Old AC Electrical Demand</span>
              <span className="font-mono">{oldKw.toFixed(2)} kW</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/20 text-muted-foreground">
              <span>New AC Electrical Demand</span>
              <span className="font-mono">{newKw.toFixed(2)} kW</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/20 text-muted-foreground">
              <span>Estimated 5-Year Net Savings</span>
              <span className="font-mono text-emerald-400 font-bold">₹{Math.round(annualSavings * 5).toLocaleString()}</span>
            </div>
            <div className="pt-2 text-xs text-muted-foreground leading-relaxed">
              Note: ROI calculations are based on average cooling load cycles. High-efficiency systems also increase building grid safety by drawing fewer startup starting amperes.
            </div>
          </div>
        </div>
      </div>
    </InteractiveCard>
  );
}

// Simple NumericInput helper for this file
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
    <div className="space-y-1">
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
          className="w-24 rounded-lg border border-border bg-background/50 px-2 py-1 text-xs text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-primary"
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
