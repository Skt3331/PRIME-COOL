export type IndustrialTopic = {
  id: string;
  slug: string;
  title: string;
  metaDescription: string;
  heroTagline: string;
  overview: string;
  features: string[];
  diagnosticCodes: { brand: string; codes: { code: string; meaning: string; action: string }[] }[];
  maintenanceChecklist: string[];
  caseStudyHighlight?: { title: string; metric: string; description: string };
  faqs: { q: string; a: string }[];
};

export const industrialData: Record<string, IndustrialTopic> = {
  "vrf-vrv-systems": {
    id: "vrf-vrv",
    slug: "vrf-vrv-systems",
    title: "VRF & VRV System Diagnostics",
    metaDescription:
      "Expert diagnostics for large-scale multi-split VRF & VRV systems. Fault code troubleshooting, addressing logic, and indoor/outdoor unit balancing protocols.",
    heroTagline: "Precision Control for Large-Scale Commercial Climate Systems.",
    overview:
      "Variable Refrigerant Flow (VRF) and Variable Refrigerant Volume (VRV) systems are the backbone of modern commercial buildings. We specialize in managing configurations of 10+ outdoor and 70+ indoor units, ensuring optimal refrigerant flow, accurate addressing, and rapid fault resolution.",
    features: [
      "Auto-Addressing & Network Communication Diagnostics",
      "Compressor Inverter Drive Testing",
      "Electronic Expansion Valve (EEV) Calibration",
      "Refrigerant Charge Balancing (Pounds per Foot calculations)",
    ],
    diagnosticCodes: [
      {
        brand: "Daikin (VRV)",
        codes: [
          {
            code: "U4",
            meaning: "Transmission error between indoor & outdoor units",
            action: "Check control wiring F1/F2 polarity and continuity.",
          },
          {
            code: "E4",
            meaning: "Low pressure drop / actuation",
            action: "Verify refrigerant charge and check for leaks using nitrogen.",
          },
          {
            code: "L5",
            meaning: "Inverter compressor overcurrent",
            action: "Check compressor windings and inverter PCB output.",
          },
        ],
      },
      {
        brand: "Mitsubishi (City Multi VRF)",
        codes: [
          {
            code: "6600",
            meaning: "Duplicate address error",
            action: "Re-run auto-addressing sequence or manually set rotary switches.",
          },
          {
            code: "4220",
            meaning: "Inverter bus voltage drop",
            action: "Inspect main power supply phases and noise filters.",
          },
        ],
      },
    ],
    maintenanceChecklist: [
      "Log suction and discharge pressures across all operating modes.",
      "Check transmission voltage (16V DC) between indoor and outdoor terminals.",
      "Clean condenser coils to prevent high-pressure tripouts during peak summer.",
      "Verify oil return cycles are executing properly in the central controller.",
    ],
    caseStudyHighlight: {
      title: "Commercial IT Park, Kharadi",
      metric: "Restored 32-Unit VRF Network",
      description:
        "Diagnosed a cascade communication failure caused by a single shorted indoor unit PCB, restoring cooling to a 3-story office layout within 4 hours.",
    },
    faqs: [
      {
        q: "Why are my VRF indoor units blowing warm air?",
        a: "This often indicates a communication loss where the EEV remains closed, or a system-wide low refrigerant charge.",
      },
      {
        q: "How often should a commercial VRF system be serviced?",
        a: "We recommend quarterly deep-cleans for filters and coils, with a biannual comprehensive electronic diagnostic.",
      },
    ],
  },
  "industrial-air-dryers": {
    id: "air-dryers",
    slug: "industrial-air-dryers",
    title: "Industrial Air Dryers & Pneumatics",
    metaDescription:
      "Maintenance and troubleshooting for heavy-duty compressed air dryers. Ensure moisture-free pneumatics for manufacturing and processing plants.",
    heroTagline: "Zero Moisture. Maximum Pneumatic Reliability.",
    overview:
      "Moisture in compressed air lines causes rust, pneumatic valve failure, and ruined end-products. We provide specialized maintenance for refrigerated and desiccant air dryers, ensuring exact dew-point control for sensitive manufacturing processes.",
    features: [
      "Refrigerant Circuit Leak Testing & Recharging",
      "Hot Gas Bypass Valve Calibration",
      "Auto-Drain Valve Overhauls",
      "Dew Point Sensor Verification",
    ],
    diagnosticCodes: [
      {
        brand: "Atlas Copco",
        codes: [
          {
            code: "High Dew Point Alarm",
            meaning: "Evaporator temperature is too high",
            action: "Check condenser fan operation and ambient temperature.",
          },
          {
            code: "Compressor Overload",
            meaning: "High head pressure or electrical fault",
            action: "Clean condenser fins and verify amp draw.",
          },
        ],
      },
    ],
    maintenanceChecklist: [
      "Verify refrigerant suction pressure matches the target dew point (usually 3°C to 5°C).",
      "Clean or replace the auto-drain strainer.",
      "Check the operation of the hot gas bypass valve under no-load conditions.",
      "Measure pressure drop across pre and post filters.",
    ],
    caseStudyHighlight: {
      title: "Auto-Component Factory, Chakan",
      metric: "Eliminated Pneumatic Rust",
      description:
        "Overhauled a failing 500 CFM refrigerated dryer, resolving intermittent high dew point alarms and saving CNC machine valves from moisture damage.",
    },
    faqs: [
      {
        q: "What is the ideal dew point for a refrigerated air dryer?",
        a: "The standard pressure dew point for refrigerated dryers is typically +3°C (37°F). Anything higher indicates a loss of cooling capacity.",
      },
      {
        q: "Why is water still coming out of my air lines?",
        a: "Either the dryer's auto-drain is clogged, the bypass valve is open, or the dryer is undersized for the current compressor output.",
      },
    ],
  },
  "large-scale-ducting": {
    id: "ducting",
    slug: "large-scale-ducting",
    title: "Large-Scale Ducting & Exhaust Design",
    metaDescription:
      "Design, balancing, and friction loss diagnostics for industrial exhaust extraction and factory ventilation standards.",
    heroTagline: "Engineered Airflow for Massive Spaces.",
    overview:
      "Proper ventilation is critical for factory safety and comfort. We provide airflow balancing, static pressure diagnostics, and duct modification for large-scale AHU systems, fresh air intakes, and toxic exhaust extraction networks.",
    features: [
      "Static Pressure & Friction Loss Calculations",
      "Anemometer Airflow Balancing (CFM/Velocity)",
      "Motorized Damper Actuator Servicing",
      "Canvas/Flexible Joint Replacements",
    ],
    diagnosticCodes: [
      {
        brand: "AHU / Exhaust Standards",
        codes: [
          {
            code: "Low Static Pressure",
            meaning: "Duct leakage or slipping fan belts",
            action: "Perform smoke test for leaks; tighten blower belts.",
          },
          {
            code: "High Static Pressure",
            meaning: "Clogged filters or closed fire dampers",
            action: "Check secondary filters and VCD/FD damper positions.",
          },
        ],
      },
    ],
    maintenanceChecklist: [
      "Measure total external static pressure (TESP) across the blower.",
      "Inspect canvas connections for tears or air leaks.",
      "Verify all Volume Control Dampers (VCDs) are locked in their balanced positions.",
      "Check exhaust fan motor bearings for vibration using diagnostic tools.",
    ],
    caseStudyHighlight: {
      title: "Pharmaceutical Plant, Ranjangaon",
      metric: "Optimized Cleanroom Airflow",
      description:
        "Re-balanced a massive ducting network post-expansion, ensuring positive pressure in cleanrooms and exact ACH (Air Changes per Hour) compliance.",
    },
    faqs: [
      {
        q: "Why is the airflow weak at the end of the duct run?",
        a: "This is usually caused by excessive friction loss, poor duct transition design, or uncalibrated dampers diverting air too early.",
      },
      {
        q: "What is the standard velocity for industrial exhaust?",
        a: "It varies by application. Fumes require ~2000 FPM, while heavy dust extraction may require 4000+ FPM to prevent settling.",
      },
    ],
  },
  "chiller-plant-operations": {
    id: "chillers",
    slug: "chiller-plant-operations",
    title: "Chiller Plant Operations",
    metaDescription:
      "Maintenance checklists and efficiency tracking for water-cooled and air-cooled industrial chiller systems.",
    heroTagline: "High-Tonnage Cooling for Mission-Critical Operations.",
    overview:
      "From plastic injection molding to pharmaceutical cold-chains, industrial chillers run 24/7. We provide comprehensive descaling, oil analysis, and PLC diagnostics for screw, scroll, and centrifugal chiller plants.",
    features: [
      "Shell-and-Tube Chemical Descaling",
      "Compressor Oil Acidity & Viscosity Analysis",
      "Electronic Expansion Valve (EXV) Stepper Motor Tests",
      "Chilled Water Flow Rate (GPM) Calibration",
    ],
    diagnosticCodes: [
      {
        brand: "Carrier / Trane",
        codes: [
          {
            code: "Low Evaporator Pressure",
            meaning: "Low refrigerant, restricted EXV, or poor water flow",
            action: "Check water pump pressure differential and strainer.",
          },
          {
            code: "High Condenser Pressure",
            meaning: "Fouled condenser tubes or high entering water temp",
            action: "Perform chemical descaling on condenser tubes.",
          },
          {
            code: "Oil Pressure Fault",
            meaning: "Clogged oil filter or failed oil pump",
            action: "Replace oil filter and check compressor sump heater.",
          },
        ],
      },
    ],
    maintenanceChecklist: [
      "Log Approach Temperature (Difference between leaving water temp and refrigerant saturation temp).",
      "Clean Y-strainers on both evaporator and condenser water loops.",
      "Megger test compressor windings (500V/1000V DC) to check insulation resistance.",
      "Verify the operation of flow switches to prevent freeze-ups.",
    ],
    caseStudyHighlight: {
      title: "Plastics Manufacturing, Shirur",
      metric: "25% Energy Efficiency Gain",
      description:
        "Performed deep chemical descaling on a 200TR water-cooled chiller's condenser, reducing the approach temperature from 8°C back to the factory 2°C, drastically dropping compressor amp draw.",
    },
    faqs: [
      {
        q: "What is an 'Approach Temperature' in a chiller?",
        a: "It's the difference between the leaving water temperature and the refrigerant temperature. A high approach indicates poor heat transfer, usually due to scale buildup in the tubes.",
      },
      {
        q: "How often should chiller oil be replaced?",
        a: "Oil should be tested annually for acidity and moisture. It usually requires replacement every 3 to 5 years, or immediately after a compressor burnout.",
      },
    ],
  },
};
