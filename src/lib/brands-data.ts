export interface BrandDetail {
  slug: string;
  name: string;
  faults: string[];
  spares: string[];
  maintenance: string[];
  warranty: string;
  errorCodes: { code: string; symptom: string; fix: string }[];
}

export const brandsData: Record<string, BrandDetail> = {
  daikin: {
    slug: "daikin",
    name: "Daikin",
    faults: [
      "Outdoor PCB communication error (Code U4)",
      "EEV coil blockage / pulse motor failure",
      "Thermostatic sensor drift (room/coil thermistors)",
      "Blower motor electrical burnout",
    ],
    spares: [
      "Genuine Daikin PCB (in/out)",
      "Daikin thermistors",
      "Expansion valve coils",
      "DC motor driver modules",
    ],
    maintenance: [
      "Run Daikin Service Checker telemetry diagnostic",
      "Check transmission wiring resistance (target: 70-110 ohms)",
      "Verify indoor fan speed pulse signal output",
      "Clean double-row outdoor heat exchanger",
    ],
    warranty:
      "1 Year comprehensive warranty, 5 Years on PCB, 10 Years on Inverter Compressor (standard Indian residential terms).",
    errorCodes: [
      {
        code: "A6",
        symptom: "Indoor fan motor overload / lock",
        fix: "Inspect fan blower wheel for obstruction, check motor winding resistance, replace motor if open-circuited.",
      },
      {
        code: "C9",
        symptom: "Indoor thermistor (return air) open or short circuit",
        fix: "Verify sensor resistance (approx. 20k ohm at 25°C), check terminal connection, replace sensor.",
      },
      {
        code: "E7",
        symptom: "Outdoor fan motor overload / lock",
        fix: "Inspect outdoor fan blade, test motor driver supply voltage from PCB, replace motor.",
      },
      {
        code: "U4",
        symptom: "Communication error between indoor and outdoor units",
        fix: "Check Interconnecting cables (wires 1, 2, 3), check 55V DC loop, inspect outdoor PCB surge fuse.",
      },
    ],
  },
  lg: {
    slug: "lg",
    name: "LG Electronics",
    faults: [
      "Dual Inverter compressor starting issues (Code CH05)",
      "Capillary line ice-clogs",
      "Indoor fan motor bushing wear and squeak",
      "Outdoor condenser fin rust",
    ],
    spares: [
      "LG Inverter compressor",
      "Reactor coils",
      "LG control board (PCB)",
      "Odor-free allergen filters",
    ],
    maintenance: [
      "Check Smart Diagnosis indicator diagnostic log",
      "Measure reactor coil inductance",
      "Descale gold-fin condenser protective coat",
      "Test capillary tube pressure drop",
    ],
    warranty: "1 Year comprehensive, 5 Years on PCB, 10 Years on Dual Inverter compressor.",
    errorCodes: [
      {
        code: "CH01",
        symptom: "Indoor air thermistor open/short circuit",
        fix: "Measure sensor resistance (10k ohm at 25°C), replace sensor if faulty.",
      },
      {
        code: "CH05",
        symptom: "Communication error between indoor and outdoor",
        fix: "Verify voltage drop on signal line, inspect wiring joints, check outdoor PCB LED flashes.",
      },
      {
        code: "CH21",
        symptom: "DC Peak (IPM fault / compressor overcurrent)",
        fix: "Test compressor winding resistance (should be balanced), check IPM heat-sink paste, replace PCB.",
      },
      {
        code: "CH61",
        symptom: "Condenser coil temp high (over 65°C)",
        fix: "Clean outdoor condenser fins, verify outdoor fan operation, check for refrigerant overcharge.",
      },
    ],
  },
  carrier: {
    slug: "carrier",
    name: "Carrier",
    faults: [
      "Run capacitor bulge on outdoor units",
      "High discharge temperature (scroll compressor overload)",
      "PCB relay sticking",
      "Capillary bypass tube vibration leakage",
    ],
    spares: [
      "45+5 uF Dual run capacitors",
      "Compressor contactors (2P 30A)",
      "Carrier thermistor probes",
      "Capillary dryers",
    ],
    maintenance: [
      "Measure compressor running amps against nameplate FLA",
      "Check contactor silver contact pitting",
      "Wash aluminum/blue fin condenser coils",
      "Inspect crankcase heater operation",
    ],
    warranty:
      "1 Year comprehensive, 10 Years on compressor, 5 Years on condenser coil (copper models).",
    errorCodes: [
      {
        code: "E1",
        symptom: "Indoor and outdoor communication failure",
        fix: "Verify interconnecting line wiring, check 230V AC loop on terminals L & N, inspect indoor board communication IC.",
      },
      {
        code: "F4",
        symptom: "Outdoor condenser temp sensor failure",
        fix: "Check outdoor sensor resistance value, verify wiring harness plug connection, replace probe.",
      },
      {
        code: "P0",
        symptom: "IPM module software error (Overcurrent)",
        fix: "Megger check compressor windings, inspect power grid voltage fluctuation, replace main PCB module.",
      },
    ],
  },
  danfoss: {
    slug: "danfoss",
    name: "Danfoss",
    faults: [
      "LP/HP pressure control switch drift",
      "Solenoid valve coil coil burnout",
      "Thermostatic expansion valve (TXV) power element gas charge loss",
      "Optyma condensing unit fan motor failure",
    ],
    spares: [
      "Danfoss KP1/KP5 pressure switches",
      "EVR solenoid valve coils",
      "T2/TE2 expansion valve orifices",
      "Filter drier cores (DML/DCL)",
    ],
    maintenance: [
      "Calibrate KP cut-in and cut-out pressure parameters",
      "Inspect sight glass for bubble-flashing (indicates low charge)",
      "Replace hermetic filter drier core during system evacuation",
      "Verify superheat settings at the evaporator outlet",
    ],
    warranty: "12 Months standard commercial equipment warranty from date of invoice.",
    errorCodes: [
      {
        code: "LP Trip",
        symptom: "Low suction pressure trip (KP1)",
        fix: "Check for gas leak, verify evaporator fan airflow, inspect expansion valve for blockage.",
      },
      {
        code: "HP Trip",
        symptom: "High discharge pressure trip (KP5)",
        fix: "Clean condenser coils, check condenser fan rotation, verify water flow rate in shell/tube condenser.",
      },
    ],
  },
  copeland: {
    slug: "copeland",
    name: "Copeland (Emerson)",
    faults: [
      "Internal scroll compressor high-temp overload trip",
      "Crankcase heater element burn out",
      "Suction reed valve break (Reciprocating models)",
      "Oil level drop (oil pump pressure failure)",
    ],
    spares: [
      "Copeland CR/ZR Compressors",
      "Crankcase heaters",
      "Internal overload protectors (Klick-on)",
      "Oil pump repair kits",
    ],
    maintenance: [
      "Megger test compressor motor winding insulation (target > 50 Megohms)",
      "Measure oil level in compressor sight glass (minimum 1/3 full)",
      "Verify operating pressure oil differential",
      "Test discharge line temperature (should not exceed 105°C)",
    ],
    warranty:
      "1 Year standard replacement warranty for hermetic and semi-hermetic compressor blocks.",
    errorCodes: [
      {
        code: "Overload",
        symptom: "Compressor drawing high amps & tripping on thermal overload",
        fix: "Measure running current, check grid voltage balance, check for liquid slugging or bad bearings.",
      },
      {
        code: "Low Oil",
        symptom: "Oil pressure safety switch trip",
        fix: "Check oil levels, verify oil return lines, inspect suction accumulator, replace oil pressure switch.",
      },
    ],
  },
  bitzer: {
    slug: "bitzer",
    name: "Bitzer",
    faults: [
      "Semi-hermetic shaft seal leaks",
      "Water cooled condenser copper tube scaling",
      "Unloader solenoid valve coil burnout",
      "SE-B1 protection module failure",
    ],
    spares: [
      "Bitzer valve plates",
      "Cylinder head gaskets",
      "SE-B1/SE-B2 modules",
      "PTC thermistor probes",
    ],
    maintenance: [
      "Check crankcase oil acidity levels",
      "Inspect water flow safety differential switches",
      "Descale shell-and-tube heat exchangers with acid-flush loop",
      "Verify capacity unloader solenoid activation sequence",
    ],
    warranty: "12 Months industrial parts warranty.",
    errorCodes: [
      {
        code: "SE-B1 Red",
        symptom: "Motor temperature warning / high winding resistance",
        fix: "Test PTC sensor chain resistance (should be < 1.8k ohms at normal temp), verify chiller water temp, check current balance.",
      },
    ],
  },
  // Adding quick placeholders for remaining brands so they have proper dynamic page support
  samsung: {
    slug: "samsung",
    name: "Samsung",
    faults: ["Inverter PCB communication faults", "Smart Inverter compressor relays fail"],
    spares: ["Samsung Main PCB", "Step assembly EEV", "Reactor blocks"],
    maintenance: ["Check LED indicators on outdoor board", "Wash eco-filter mesh"],
    warranty: "1 Year comprehensive, 10 Years on compressor.",
    errorCodes: [
      {
        code: "E101",
        symptom: "Indoor/Outdoor communication error",
        fix: "Verify wiring connections, inspect outdoor board main fuse.",
      },
    ],
  },
  voltas: {
    slug: "voltas",
    name: "Voltas",
    faults: ["Start capacitor failure", "Capillary pipe leak"],
    spares: ["Run capacitor (50uF)", "Blower motor 3-speed", "Remote sensor"],
    maintenance: ["Pressure wash condenser coils", "Test compressor winding insulation"],
    warranty: "1 Year comprehensive, 5 Years on compressor.",
    errorCodes: [
      {
        code: "EC",
        symptom: "Refrigerant leakage / sensor fault",
        fix: "Run leak search with soap water, repair joint, replace drier and gas charge.",
      },
    ],
  },
  "blue-star": {
    slug: "blue-star",
    name: "Blue Star",
    faults: ["High pressure switch trip on package units", "Blower belt slip"],
    spares: ["HP switch", "Blower belts", "Compressor contactors"],
    maintenance: ["Inspect belt tension", "Check coil fins for blockage"],
    warranty: "1 Year comprehensive, 5 Years on compressor.",
    errorCodes: [
      {
        code: "HP",
        symptom: "High pressure cut-out",
        fix: "Clean condenser fins, check fan motor start capacitor.",
      },
    ],
  },
  hitachi: {
    slug: "hitachi",
    name: "Hitachi",
    faults: ["Sensor value drift", "Outdoor fan driver error"],
    spares: ["Hitachi thermistors", "DC fan motor", "EEV coil assembly"],
    maintenance: ["Descale copper condenser coils", "Check drain slope"],
    warranty: "1 Year comprehensive, 5 Years on controller card.",
    errorCodes: [
      {
        code: "01",
        symptom: "Indoor unit malfunction",
        fix: "Check indoor fan motor connection and feedback sensor wire.",
      },
    ],
  },
  "mitsubishi-electric": {
    slug: "mitsubishi-electric",
    name: "Mitsubishi Electric",
    faults: ["IPM module failure", "Thermistors values shifting"],
    spares: ["ME main PCB", "IPM inverter block", "Liquid line thermistor"],
    maintenance: ["Run system test mode", "Deep clean clean-room filters"],
    warranty: "1 Year comprehensive, 5 Years on inverter compressor.",
    errorCodes: [
      {
        code: "E9",
        symptom: "Communication error / address conflict",
        fix: "Verify address switches on indoor units, check terminal wiring.",
      },
    ],
  },
  panasonic: {
    slug: "panasonic",
    name: "Panasonic",
    faults: ["Eco-sensor tracking failure", "Louvers motor wear"],
    spares: ["Louver gear motor", "Main board", "Sensor assembly"],
    maintenance: ["Clean auto-clean filter dust bins", "Check refrigerant charge"],
    warranty: "1 Year comprehensive, 10 Years on compressor.",
    errorCodes: [
      {
        code: "H11",
        symptom: "Indoor/Outdoor communication abnormal",
        fix: "Verify signal line voltage (should pulse 0-24V DC), check connection joints.",
      },
    ],
  },
  haier: {
    slug: "haier",
    name: "Haier",
    faults: ["Capacitor failure", "PCB relay failure"],
    spares: ["Capacitor 45uF", "Louver swing motor", "Display panel"],
    maintenance: ["Descale blue fin coil", "Clear drain hose"],
    warranty: "1 Year comprehensive, 10 Years on compressor.",
    errorCodes: [
      {
        code: "E7",
        symptom: "Indoor/Outdoor communication error",
        fix: "Check interconnecting cable connection, verify outdoor board supply voltage.",
      },
    ],
  },
  godrej: {
    slug: "godrej",
    name: "Godrej",
    faults: ["Defrost timer failure (Fridges)", "Start relay burnout"],
    spares: ["Defrost timer", "C-OLP starting relay", "Thermostat"],
    maintenance: ["Clean condenser dust grid", "Verify door gasket seal"],
    warranty: "1 Year comprehensive, 10 Years on compressor.",
    errorCodes: [
      {
        code: "E5",
        symptom: "Indoor coil temp sensor error",
        fix: "Measure thermistor resistance (approx 5k ohm), replace if open-circuit.",
      },
    ],
  },
  lloyd: {
    slug: "lloyd",
    name: "Lloyd",
    faults: ["Condenser coil leak", "Low starting torque on fan"],
    spares: ["Lloyd PCB", "Outdoor fan motor", "Coil sensor"],
    maintenance: ["Clean filters", "Test starting current"],
    warranty: "1 Year comprehensive, 10 Years on compressor.",
    errorCodes: [
      {
        code: "E5",
        symptom: "Outdoor temp sensor open circuit",
        fix: "Verify outdoor sensor harness connection, measure resistance.",
      },
    ],
  },
  "o-general": {
    slug: "o-general",
    name: "O General",
    faults: ["Outdoor board surge damage", "EEV coil block"],
    spares: ["O General PCB", "Thermal thermistor", "DC fan motor"],
    maintenance: ["Clean double-row gold fin coil", "Verify line voltage matches 230V AC ± 10%"],
    warranty: "1 Year comprehensive, 5 Years on compressor.",
    errorCodes: [
      {
        code: "02",
        symptom: "Indoor thermistor error",
        fix: "Measure return air sensor values, replace probe if out of range.",
      },
    ],
  },
  toshiba: {
    slug: "toshiba",
    name: "Toshiba",
    faults: ["Inverter driver overheat", "Fan speed loop fail"],
    spares: ["Toshiba PCB", "DC compressor unit", "Capacitor"],
    maintenance: ["Clean heat exchanger fins", "Check oil return loop"],
    warranty: "1 Year comprehensive, 10 Years on compressor.",
    errorCodes: [
      {
        code: "0C",
        symptom: "Discharge temperature too high",
        fix: "Check for gas leak, check expansion valve restriction.",
      },
    ],
  },
  whirlpool: {
    slug: "whirlpool",
    name: "Whirlpool",
    faults: ["Refrigerator starter relay fail", "Defrost heater fail"],
    spares: ["Defrost heater", "Start relay block", "Thermostat dial"],
    maintenance: ["Sanitize water drain line", "Check freezer fan motor"],
    warranty: "1 Year comprehensive, 10 Years on compressor.",
    errorCodes: [
      {
        code: "E2",
        symptom: "Indoor sensor failure",
        fix: "Replace coil thermistor, clear PCB connection dust.",
      },
    ],
  },
  emerson: {
    slug: "emerson",
    name: "Emerson (Copeland)",
    faults: ["Scroll compressor contactor pit", "LP switch drift"],
    spares: ["Emerson contactor", "HP/LP controls", "Liquid line drier"],
    maintenance: ["Measure compressor current draw", "Check oil levels"],
    warranty: "1 Year standard replacement warranty.",
    errorCodes: [
      {
        code: "Trip",
        symptom: "LP/HP safety switch cut-out",
        fix: "Check system gas charge, confirm condenser fan speed.",
      },
    ],
  },
  tecumseh: {
    slug: "tecumseh",
    name: "Tecumseh",
    faults: ["Starting relay contact weld", "Overload protector burn out"],
    spares: ["Potential starting relays", "Overload protectors", "Condenser fan blade"],
    maintenance: ["Verify starting current balance", "Clean compact compressor unit base"],
    warranty: "1 Year standard mechanical warranty.",
    errorCodes: [
      {
        code: "Relay trip",
        symptom: "Compressor fails to start and hums",
        fix: "Test potential starting capacitor, test compressor windings for short.",
      },
    ],
  },
  kirloskar: {
    slug: "kirloskar",
    name: "Kirloskar Pneumatic",
    faults: ["Unloader solenoid block", "Compressor shaft seal leak"],
    spares: ["Shaft seal kit", "Solenoid valve", "Suction valve rings"],
    maintenance: ["Calibrate oil pump regulator pressure", "Inspect coupling alignments"],
    warranty: "1 Year industrial mechanical assembly warranty.",
    errorCodes: [
      {
        code: "Oil Press Fail",
        symptom: "Low oil pressure safety trip",
        fix: "Verify oil pump pressure, check oil screen filter, replace oil.",
      },
    ],
  },
  trane: {
    slug: "trane",
    name: "Trane",
    faults: ["Contactor carbon buildup", "VFD variable speed trip"],
    spares: ["Trane scroll compressor", "Modulating damper motor", "Main controller card"],
    maintenance: ["Test scroll head thermal sensors", "Descale condenser loops"],
    warranty: "12 Months parts warranty from commissioning date.",
    errorCodes: [
      {
        code: "Err 09",
        symptom: "Communications failure",
        fix: "Verify shield wiring ground loop, check controller board voltage.",
      },
    ],
  },
};
