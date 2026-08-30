export interface ServiceDetail {
  slug: string;
  title: string;
  category: "residential" | "commercial" | "refrigeration" | "industrial";
  tagline: string;
  description: string;
  priceEstimate: string;
  features: string[];
  process: string[];
  faqs: { q: string; a: string }[];
  seoTitle?: string;
  seoDesc?: string;
  seoKeywords?: string;
}

export const servicesData: Record<string, ServiceDetail> = {
  // =========================================================================
  // TOP 30 INVERTER PCB REPAIR SERVICES (AC, FRIDGE, WASHING MACHINE)
  // =========================================================================

  // --- SECTION 1: TOP 10 AC INVERTER PCB REPAIR SERVICES ---
  "pcb-split-ac-inverter-board-repair": {
    slug: "pcb-split-ac-inverter-board-repair",
    title: "Split Inverter AC Outdoor PCB Board & IPM Repair",
    category: "residential",
    tagline: "Component-level micro-soldering for burnt IPM IGBT modules, 320V DC bus rails, and SMPS power supplies.",
    description: "Professional component-level electronics repair for 1.0, 1.5, and 2.0 Ton split inverter AC outdoor and indoor PCB mainboards. Includes IPM power module replacement, optical coupler communication loop fixes, and 24-hour continuous load bench testing.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "IPM IGBT transistor switching module replacement",
      "SMPS 15V logic & gate driver rail restoration",
      "High-voltage DC bus filter capacitor bank testing",
    ],
    process: [
      "Diagnostic isolation of high voltage 320V DC bus vs low voltage 15V/5V logic rails",
      "Desoldering shorted IPM module using temperature-controlled ESD rework station",
      "Soldering genuine OEM replacement IGBTs and testing gate driver optocouplers",
      "Applying premium thermal compound and conformal anti-moisture silicone coating",
    ],
    faqs: [
      {
        q: "Can a burnt inverter AC PCB board be repaired instead of buying a new one?",
        a: "Yes! Over 90% of inverter PCB failures are caused by burnt IPM modules or SMPS diodes. Component-level repair restores 100% functionality at a fraction of replacement cost.",
      },
    ],
    seoTitle: "Split Inverter AC Outdoor PCB Board & IPM Repair | Prime Cool",
    seoDesc: "Certified component-level repair for split inverter AC PCBs in Pune & MIDC industrial parks. Specialist in IPM module and SMPS power rail repair.",
  },

  "pcb-daikin-inverter-ac-repair": {
    slug: "pcb-daikin-inverter-ac-repair",
    title: "Daikin Inverter AC PCB Repair (Error Code U4 / L5 / A6)",
    category: "residential",
    tagline: "Specialist repair for Daikin swing compressor driver circuits, optical couplers, and EEV stepper drivers.",
    description: "Expert diagnostic repair for Daikin residential and commercial inverter AC control boards. We fix U4 communication errors, L5 outdoor compressor overcurrent trips, A6 indoor motor driver faults, and burnt DC bus capacitors.",
    priceEstimate: "Starts from ₹1,800 + Spares",
    features: [
      "Daikin Service Checker digital telemetry diagnostic",
      "Optical communication transceiver loop refurbishment",
      "Electronic Expansion Valve (EEV) step-motor driver IC repair",
      "DC fan motor driver microcontroller signal tuning",
    ],
    process: [
      "Interfacing Daikin serial analyzer to log fault registers and inverter frequencies",
      "Isolating open-circuited SMD resistors and communication optocouplers",
      "Replacing damaged gate driver ICs and heatsink power transistors",
      "Performing bench load testing with simulated compressor and thermistor coils",
    ],
    faqs: [
      {
        q: "What causes Daikin Error Code U4 on inverter ACs?",
        a: "Error U4 indicates communication failure between indoor and outdoor boards, usually caused by a burnt optical coupler or noise filter capacitor.",
      },
    ],
    seoTitle: "Daikin Inverter AC PCB Repair (Error U4, L5, A6) | Prime Cool",
    seoDesc: "Component-level Daikin inverter AC PCB repair in Pune. Fix U4 communication errors and L5 compressor IPM trips with 6-month warranty.",
  },

  "pcb-voltas-inverter-ac-repair": {
    slug: "pcb-voltas-inverter-ac-repair",
    title: "Voltas Inverter AC PCB Board Repair (Error Code E1 / E6 / F1)",
    category: "residential",
    tagline: "Voltas inverter outdoor mainboard diagnostics, SMPS diode replacement, and high-voltage capacitor bank renewal.",
    description: "Precision component-level repair for Voltas 3-Star & 5-Star Adjustable Inverter AC PCB motherboards. Resolves E1 sensor faults, E6 communication severed loops, and F1 IPM module short-circuits caused by high voltage surges.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "SMPS Switch-Mode Power Supply 15V/12V rail rebuild",
      "Current sensing shunt resistor calibration",
      "Microcontroller EEPROM firmware re-flashing",
      "Conformal moisture and tropical gecko isolation coating",
    ],
    process: [
      "Testing rectifier bridge and DC smoothing capacitor ripple voltage",
      "Replacing burnt SMD zener diodes and switching transistors",
      "Calibrating microcontroller current sense comparator loop",
      "Running 100% full-load compressor drive test on simulator bench",
    ],
    faqs: [
      {
        q: "Why did my Voltas inverter AC outdoor PCB burn?",
        a: "Voltage spikes, lightning surges, or thermal overheating due to caked dust on outdoor heatsinks commonly cause IPM module burnout.",
      },
    ],
    seoTitle: "Voltas Inverter AC PCB Board Repair (Error E1, E6, F1) | Prime Cool",
    seoDesc: "Fast doorstep Voltas inverter AC PCB repair across Pune & PCMC. Component-level soldering with genuine OEM parts and warranty.",
  },

  "pcb-lg-dual-inverter-ac-repair": {
    slug: "pcb-lg-dual-inverter-ac-repair",
    title: "LG Dual Inverter AC PCB Motherboard Repair (Error CH05 / CH21 / CH61)",
    category: "residential",
    tagline: "Dual inverter IGBT power module micro-soldering, Smart Diagnosis loop recovery, and reactor coil testing.",
    description: "Specialized repair for LG Dual Inverter split AC mainboards. Fixes CH05 serial communication loss, CH21 DC peak over-current faults, CH61 condenser overheating trips, and burnt reactor coil circuits.",
    priceEstimate: "Starts from ₹1,799 + Spares",
    features: [
      "Dual Inverter twin-compressor driver PWM stage repair",
      "LG Smart Diagnosis serial communication restoration",
      "Reactor coil inductance and magnetic core integrity check",
      "Gold-fin thermal sensor amplifier calibration",
    ],
    process: [
      "Scanning fault logs via oscilloscope and LG diagnostic analyzer",
      "Replacing shorted IPM power transistors and optocouplers",
      "Repasting heatsink using high-thermal-conductivity compound",
      "24-Hour continuous dynamic load testing before site re-installation",
    ],
    faqs: [
      {
        q: "How to fix LG Inverter AC Error Code CH05?",
        a: "CH05 is fixed by repairing the serial communication loop on the outdoor PCB, replacing damaged optocouplers, and checking line voltage.",
      },
    ],
    seoTitle: "LG Dual Inverter AC PCB Motherboard Repair (CH05, CH21) | Prime Cool",
    seoDesc: "Certified LG dual inverter AC PCB motherboard repair in Pune. Fix CH05 and CH21 errors with genuine OEM parts.",
  },

  "pcb-blue-star-inverter-ac-repair": {
    slug: "pcb-blue-star-inverter-ac-repair",
    title: "Blue Star Inverter AC PCB Board Repair (Error Code E2 / EC / P4)",
    category: "commercial",
    tagline: "Blue Star inverter split and cassette PCB electronics repair, optocoupler communication loop, and current sense resistors.",
    description: "Component-level electronics repair for Blue Star residential split, multi-split, and ceiling cassette inverter air conditioners. Fixes E2 outdoor board error, EC refrigerant leakage logic trip, and P4 inverter drive module failure.",
    priceEstimate: "Starts from ₹1,699 + Spares",
    features: [
      "Optocoupler communication loop refurbishment",
      "High-current IPM transistor switching stage repair",
      "BLDC fan motor drive IC and snubber circuit overhaul",
      "Precision low-drift shunt resistor replacement",
    ],
    process: [
      "Isolating high-voltage inverter stage from low-voltage micro-controller",
      "Desoldering damaged ICs using temperature-regulated ESD station",
      "Replacing high-voltage electrolytic filter capacitors",
      "Testing compressor start-up frequency ramp-up under load",
    ],
    faqs: [
      {
        q: "What causes Blue Star AC Error Code EC?",
        a: "Code EC triggers when the PCB detects abnormal suction temperatures or low pressure, indicating refrigerant loss or a drifting sensor circuit.",
      },
    ],
    seoTitle: "Blue Star Inverter AC PCB Board Repair (Error E2, EC, P4) | Prime Cool",
    seoDesc: "Blue Star inverter AC PCB board repair across Pune and industrial MIDCs. Reliable component-level diagnostics.",
  },

  "pcb-carrier-inverter-ac-repair": {
    slug: "pcb-carrier-inverter-ac-repair",
    title: "Carrier Inverter AC PCB Board Repair (Error Code E1 / E4 / P0)",
    category: "residential",
    tagline: "Carrier outdoor inverter mainboard rework, BLDC condenser fan driver IC replacement, and DC ripple filtering.",
    description: "Comprehensive electronics repair for Carrier inverter split and ducted AC mainboards. Fixes E1 EEPROM memory errors, E4 indoor temperature sensor faults, and P0 IPM module software protection trips.",
    priceEstimate: "Starts from ₹1,599 + Spares",
    features: [
      "BLDC condenser fan motor driver IC replacement",
      "DC bus ripple filter and MOV surge arrestor renewal",
      "EEPROM memory parameter reset and re-flashing",
      "4-Way reversing valve relay trigger circuit repair",
    ],
    process: [
      "Inspecting PCB under high-magnification stereomicroscope for micro-fractures",
      "Replacing degraded capacitors and switching power diodes",
      "Testing gate drive PWM signals across all 6 IGBT phases",
      "Re-coating with hydrophobic silicone resin to prevent moisture corrosion",
    ],
    faqs: [
      {
        q: "Why is Carrier inverter AC showing Error P0?",
        a: "P0 indicates IPM module protection triggered by compressor overcurrent, locked rotor, or failed heatsink thermal dissipation.",
      },
    ],
    seoTitle: "Carrier Inverter AC PCB Board Repair (Error E1, E4, P0) | Prime Cool",
    seoDesc: "Carrier inverter AC PCB repair specialist in Pune. Component-level micro-soldering for outdoor IPM boards.",
  },

  "pcb-hitachi-inverter-ac-repair": {
    slug: "pcb-hitachi-inverter-ac-repair",
    title: "Hitachi Tropical Inverter AC PCB Repair (Error Code 01 / 02 / 11)",
    category: "residential",
    tagline: "Hitachi 52°C tropical inverter board repair, current sensing shunt calibration, and EEPROM micro-controller flashing.",
    description: "Specialist repair for Hitachi Tropical Inverter air conditioner control boards designed for extreme summer operation. Resolves Error 01 indoor sensor fault, 02 outdoor safety trip, and 11 compressor drive module failure.",
    priceEstimate: "Starts from ₹1,899 + Spares",
    features: [
      "Tropical 52°C high-temperature component rating validation",
      "Cascading sensor array amplifier calibration",
      "Microcontroller EEPROM data re-flashing and tuning",
      "High-power IPM heat sink compound renewal",
    ],
    process: [
      "Tracing high-frequency switching noise and DC bus stability",
      "Replacing degraded IGBT modules and current shunt resistors",
      "Testing stepper motor louver driver circuits",
      "Simulating 52°C ambient thermal stress on test bench",
    ],
    faqs: [
      {
        q: "Can high summer heat damage Hitachi inverter PCBs?",
        a: "Yes! Ambient temperatures above 45°C stress outdoor heatsinks. Component-level repair with heavy-duty thermal paste restores full durability.",
      },
    ],
    seoTitle: "Hitachi Tropical Inverter AC PCB Repair (Error 01, 02, 11) | Prime Cool",
    seoDesc: "Hitachi tropical inverter AC PCB repair in Pune. OEM component micro-soldering with 6-month warranty.",
  },

  "pcb-panasonic-inverter-ac-repair": {
    slug: "pcb-panasonic-inverter-ac-repair",
    title: "Panasonic Inverter AC nanoe PCB Repair (Error Code H11 / F99)",
    category: "residential",
    tagline: "Panasonic nanoe-X inverter board troubleshooting, DC bus high-voltage capacitor renewal, and gate driver IC repair.",
    description: "Dedicated electronics repair for Panasonic inverter air conditioners featuring nanoe-G and nanoe-X air purification. Fixes H11 indoor/outdoor communication failure, F99 outdoor DC peak overcurrent, and air purifier high-voltage generator circuits.",
    priceEstimate: "Starts from ₹1,699 + Spares",
    features: [
      "nanoe-G high-voltage ion generator circuit repair",
      "DC bus high-voltage filter capacitor bank refurbishment",
      "Gate driver IC and snubber diode replacement",
      "Communication loop noise suppression filter overhaul",
    ],
    process: [
      "Checking optical isolation barrier and power supply rails",
      "Replacing blown surface-mount diodes and driver transistors",
      "Verifying pulse-width modulated motor outputs",
      "Conducting 24-hour bench load test under full inverter modulation",
    ],
    faqs: [
      {
        q: "What does Panasonic AC Error Code H11 mean?",
        a: "H11 represents a communication timeout between indoor and outdoor PCB units, usually caused by damaged signal optocouplers.",
      },
    ],
    seoTitle: "Panasonic Inverter AC nanoe PCB Repair (H11, F99) | Prime Cool",
    seoDesc: "Panasonic inverter AC PCB repair in Pune & PCMC. Fix H11 communication errors and F99 outdoor DC peak trips.",
  },

  "pcb-samsung-inverter-ac-repair": {
    slug: "pcb-samsung-inverter-ac-repair",
    title: "Samsung WindFree Inverter AC PCB Repair (Error Code E101 / E464)",
    category: "residential",
    tagline: "Samsung 8-pole digital inverter mainboard repair, IPM heatsink thermal repasting, and communication circuit fixes.",
    description: "Expert circuit board repair for Samsung Digital Inverter and WindFree split air conditioners. Resolves E101 indoor communication errors, E464 IPM overcurrent trips, E466 DC voltage abnormality, and stepper motor driver issues.",
    priceEstimate: "Starts from ₹1,599 + Spares",
    features: [
      "8-Pole digital inverter compressor driver stage repair",
      "Micro-holes front panel stepper motor drive logic testing",
      "DC bus over/under voltage protection circuit calibration",
      "SMPS switching transformer and diode replacement",
    ],
    process: [
      "Reading diagnostic blink codes and oscilloscope waveform logs",
      "Replacing damaged power semiconductors on outdoor board",
      "Inspecting capacitor ESR values and replacing high-ESR caps",
      "Running dynamic compressor ramp test on simulated rig",
    ],
    faqs: [
      {
        q: "How to fix Samsung AC Error Code E464?",
        a: "E464 indicates IPM over-current protection. Our engineers micro-solder damaged power transistors and replace the thermal heatsink paste.",
      },
    ],
    seoTitle: "Samsung WindFree Inverter AC PCB Repair (E101, E464) | Prime Cool",
    seoDesc: "Samsung digital inverter AC PCB board repair in Pune. Fast doorstep collection and component-level micro-soldering.",
  },

  "pcb-vrv-vrf-outdoor-inverter-repair": {
    slug: "pcb-vrv-vrf-outdoor-inverter-repair",
    title: "Commercial VRV / VRF Master Inverter PCB Controller Repair",
    category: "commercial",
    tagline: "High-capacity multi-zone VRV/VRF outdoor inverter master PCB diagnostics, IGBT pack replacement, and BMS Modbus loop repair.",
    description: "Industrial-grade electronics repair for Daikin VRV, LG Multi V, Mitsubishi City Multi, and Blue Star VRF commercial outdoor master inverter controller boards. We replace 100A+ IGBT packs, sub-cooling solenoid driver circuits, and RS-485 BMS communication transceivers.",
    priceEstimate: "Starts from ₹3,500 + Spares",
    features: [
      "High-power 100A+ IGBT power module pack replacement",
      "BMS Modbus / BACnet RS-485 communication transceiver rework",
      "Sub-cooling electronic expansion valve (EEV) driver testing",
      "Multi-module master-slave synchronization loop repair",
    ],
    process: [
      "Connecting factory serial diagnostic tools to read inverter telemetry registers",
      "De-soldering heavy multi-pin IGBT power packs with industrial desoldering tools",
      "Replacing optoisolated gate drivers and surge protection varistors",
      "Testing three-phase current balance and 24-hour continuous burn-in load",
    ],
    faqs: [
      {
        q: "Why do VRV/VRF outdoor inverter boards cost so much to replace?",
        a: "New VRV/VRF mainboards often cost ₹25,000 to ₹60,000. Component-level repair of burnt IGBTs or transceiver ICs saves over 70% of the cost.",
      },
    ],
    seoTitle: "Commercial VRV / VRF Master Inverter PCB Controller Repair | Prime Cool",
    seoDesc: "Commercial VRV/VRF outdoor inverter PCB repair in Pune & MIDC industrial parks. Fast emergency turnaround for corporate systems.",
  },

  // --- SECTION 2: TOP 10 REFRIGERATOR / FREEZER INVERTER PCB REPAIR SERVICES ---
  "pcb-inverter-refrigerator-motherboard-repair": {
    slug: "pcb-inverter-refrigerator-motherboard-repair",
    title: "Inverter Refrigerator Main PCB Motherboard Diagnostics & Repair",
    category: "refrigeration",
    tagline: "Component-level repair for single-door, double-door, and frost-free inverter refrigerator control boards.",
    description: "Universal component-level electronics repair for residential frost-free and digital inverter refrigerator mainboards. Fixes non-starting compressor clicks, flashing error LEDs, dead display cards, and irregular defrost cycles.",
    priceEstimate: "Starts from ₹1,299 + Spares",
    features: [
      "Digital Inverter compressor driver frequency generator repair",
      "SMPS power supply 12V/5V DC logic rail restoration",
      "Bimetal defrost heater solid-state relay replacement",
      "Capacitive touch display panel button repair",
    ],
    process: [
      "Measuring 230V AC input vs 12V DC logic rails across SMPS transformer",
      "Testing compressor drive 3-phase UVW inverter output signals",
      "Replacing burnt switching ICs, zener diodes, and filter capacitors",
      "Bench testing with simulated thermistors and bimetal defrost load",
    ],
    faqs: [
      {
        q: "Why is my inverter refrigerator clicking but not cooling?",
        a: "A clicking sound without compressor start usually indicates a failed starting relay, burnt inverter drive IC on the PCB, or low DC bus voltage.",
      },
    ],
    seoTitle: "Inverter Refrigerator Main PCB Motherboard Repair | Prime Cool",
    seoDesc: "Doorstep inverter refrigerator PCB motherboard repair in Pune. Certified electronics micro-soldering with 6-month warranty.",
  },

  "pcb-lg-double-door-fridge-repair": {
    slug: "pcb-lg-double-door-fridge-repair",
    title: "LG Smart Inverter & Side-by-Side Refrigerator PCB Repair",
    category: "refrigeration",
    tagline: "LG linear compressor driver board repair, defrost sensor circuit fixes, and LED error code diagnostics.",
    description: "Specialized repair for LG Smart Inverter, Double Door, and Side-by-Side refrigerator electronic motherboards. Fixes LED blink codes (1 flash, 5 flashes, 6 flashes), freezer cooling but warm lower compartment, and ice maker controller faults.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "LG Smart Inverter linear compressor driver stage repair",
      "Defrost heater electronic triac / relay replacement",
      "Microprocessor LED blink error code diagnostic & reset",
      "Evaporator BLDC fan motor driver circuit overhaul",
    ],
    process: [
      "Decoding LED blink sequence to pinpoint hardware fault",
      "Isolating shorted power transistors and blown fuse traces",
      "Replacing high-voltage DC capacitors and gate drivers",
      "Verifying automatic defrost cycle timing on bench test",
    ],
    faqs: [
      {
        q: "What do the flashing LED lights on LG fridge PCB mean?",
        a: "Flashing LEDs indicate specific errors (e.g. 5 flashes = compressor motor drive failure, 6 flashes = IPM overcurrent). We repair the exact faulty circuit.",
      },
    ],
    seoTitle: "LG Smart Inverter & Side-by-Side Refrigerator PCB Repair | Prime Cool",
    seoDesc: "Component-level LG inverter refrigerator PCB repair in Pune. Solve LED blink codes and cooling issues with genuine OEM spares.",
  },

  "pcb-samsung-digital-inverter-fridge-repair": {
    slug: "pcb-samsung-digital-inverter-fridge-repair",
    title: "Samsung Digital Inverter Refrigerator PCB Board Repair",
    category: "refrigeration",
    tagline: "Samsung frost-free inverter fridge mainboard repair, SMPS switching IC swaps, and bimetal defrost control logic.",
    description: "Comprehensive circuit board repair for Samsung Digital Inverter single door, double door, and French door refrigerators. Fixes compressor start failure, continuous fan running, and erratic temperature control.",
    priceEstimate: "Starts from ₹1,450 + Spares",
    features: [
      "Samsung Digital Inverter compressor speed driver repair",
      "Frost-free defrost timer micro-controller circuit rework",
      "SMPS VIPer switching IC and electrolytic capacitor swap",
      "Multi-flow air damper stepper motor driver repair",
    ],
    process: [
      "Checking DC bus voltage stability across capacitor terminals",
      "Testing inverter output switching waveform to compressor",
      "Replacing degraded SMD diodes and relay switches",
      "Applying protective moisture-resistant conformal resin",
    ],
    faqs: [
      {
        q: "Can Samsung fridge inverter board be repaired on the same day?",
        a: "Yes! Our technicians carry diagnostic kits and common SMD replacement parts for same-day repair across Pune.",
      },
    ],
    seoTitle: "Samsung Digital Inverter Refrigerator PCB Board Repair | Prime Cool",
    seoDesc: "Fast Samsung digital inverter refrigerator PCB repair across Pune & PCMC. Transparent pricing and genuine parts.",
  },

  "pcb-whirlpool-inverter-fridge-repair": {
    slug: "pcb-whirlpool-inverter-fridge-repair",
    title: "Whirlpool IntelliFresh Inverter Refrigerator PCB Repair",
    category: "refrigeration",
    tagline: "Whirlpool 6th Sense inverter fridge PCB troubleshooting, compressor starting capacitor check, and sensor rail repair.",
    description: "Expert diagnostics for Whirlpool IntelliFresh, Protton 3-Door, and Bottom Mounted Inverter refrigerator mainboards. Fixes 6th Sense auto-defrost failure, sensor rail drift, and inverter driver board burnouts.",
    priceEstimate: "Starts from ₹1,350 + Spares",
    features: [
      "6th Sense smart temperature sensor comparator repair",
      "Compressor inverter drive frequency controller rework",
      "Heavy-duty defrost relay and thermal fuse replacement",
      "Base power supply surge protection overhaul",
    ],
    process: [
      "Testing sensor line resistance and voltage drop",
      "Soldering new switching transistors and rectifier diodes",
      "Testing active air damper motor cycling",
      "Validating 24-hour continuous defrost and cool profile",
    ],
    faqs: [
      {
        q: "Why is the lower compartment of Whirlpool fridge warm?",
        a: "A faulty PCB damper driver or failed defrost cycle causes ice buildup, preventing air circulation to the lower section.",
      },
    ],
    seoTitle: "Whirlpool IntelliFresh Inverter Refrigerator PCB Repair | Prime Cool",
    seoDesc: "Whirlpool inverter refrigerator PCB repair in Pune. Component-level soldering for double-door and triple-door models.",
  },

  "pcb-haier-inverter-refrigerator-repair": {
    slug: "pcb-haier-inverter-refrigerator-repair",
    title: "Haier Bottom Mounted & Side-by-Side Fridge PCB Repair",
    category: "refrigeration",
    tagline: "Haier inverter refrigerator control card refurbishment, inverter compressor RPM modulation fixes, and power supply repair.",
    description: "Component-level repair for Haier Bottom Mounted Refrigerator (BMR), Double Door, and Side-by-Side inverter electronic control boards. Solves compressor RPM locking, touch screen error codes, and defrost cycle failures.",
    priceEstimate: "Starts from ₹1,299 + Spares",
    features: [
      "Haier Inverter compressor RPM modulation circuit repair",
      "Capacitive touch temperature selection board rework",
      "Defrost heater solid-state relay replacement",
      "DC voltage regulator and bridge rectifier renewal",
    ],
    process: [
      "Tracing high-voltage switching rail and low-voltage logic outputs",
      "Replacing defective SMD components and power regulators",
      "Testing defrost timer circuit with thermal sensor inputs",
      "Simulating compressor load on automated test bench",
    ],
    faqs: [
      {
        q: "What causes Haier inverter fridge display to blink continuously?",
        a: "A blinking display indicates a communication drop or a faulty SMPS capacitor rail on the main motherboard.",
      },
    ],
    seoTitle: "Haier Bottom Mounted & Side-by-Side Fridge PCB Repair | Prime Cool",
    seoDesc: "Haier inverter refrigerator PCB motherboard repair in Pune. Doorstep service with certified engineers.",
  },

  "pcb-godrej-inverter-fridge-repair": {
    slug: "pcb-godrej-inverter-fridge-repair",
    title: "Godrej Edge Pro Inverter Refrigerator PCB Board Repair",
    category: "refrigeration",
    tagline: "Godrej frost-free inverter fridge motherboard repair, fan motor driver relay replacement, and surge protection restoration.",
    description: "Reliable electronic repair for Godrej Edge Pro, Eon, and Frost-Free Inverter refrigerator mainboards. Fixes non-starting compressor, faulty evaporator fan switching, and power supply surge damage.",
    priceEstimate: "Starts from ₹1,199 + Spares",
    features: [
      "SMPS power converter and surge MOV renewal",
      "Evaporator fan motor electronic driver replacement",
      "Defrost bimetal thermostat timing circuit repair",
      "Internal LED lighting power controller restoration",
    ],
    process: [
      "Inspecting PCB for burnt tracks and electrolytic leakage",
      "Desoldering and testing suspect switching diodes and ICs",
      "Installing OEM replacement components and re-soldering",
      "Bench load testing with simulated cooling cycles",
    ],
    faqs: [
      {
        q: "Can high voltage fluctuations damage Godrej fridge PCB?",
        a: "Yes. Voltage surges burn the MOV surge arrestor and SMPS diode. We replace these protective parts to restore the motherboard.",
      },
    ],
    seoTitle: "Godrej Edge Pro Inverter Refrigerator PCB Board Repair | Prime Cool",
    seoDesc: "Godrej inverter refrigerator PCB board repair in Pune & PCMC. Fast turnaround with 6-month warranty.",
  },

  "pcb-bosch-siemens-inverter-fridge-repair": {
    slug: "pcb-bosch-siemens-inverter-fridge-repair",
    title: "Bosch & Siemens Inverter Refrigerator Electronic PCB Repair",
    category: "refrigeration",
    tagline: "German-engineered Bosch/Siemens multi-door fridge inverter motherboard repair, VFD motor control, and sensor diagnostics.",
    description: "High-precision electronics repair for Bosch and Siemens premium multi-door and built-in inverter refrigerators. Fixes VFD inverter compressor drive faults, electronic damper failures, and digital touch temperature control issues.",
    priceEstimate: "Starts from ₹2,100 + Spares",
    features: [
      "German-standard multi-layer PCB precision micro-soldering",
      "Variable Frequency Drive (VFD) inverter driver repair",
      "Multi-zone electronic damper valve stepper logic check",
      "CAN-bus internal sensor communication network tuning",
    ],
    process: [
      "Connecting diagnostic scanner to read Bosch error codes",
      "Isolating multi-layer board short circuits using thermal camera",
      "Replacing high-spec SMD micro-controllers and power ICs",
      "48-Hour continuous temperature cycling validation",
    ],
    faqs: [
      {
        q: "Why is a Bosch/Siemens fridge PCB more complex?",
        a: "Bosch and Siemens use multi-layer printed circuit boards with fine-pitch microcontrollers that require specialized micro-soldering rework stations.",
      },
    ],
    seoTitle: "Bosch & Siemens Inverter Refrigerator Electronic PCB Repair | Prime Cool",
    seoDesc: "Specialist Bosch and Siemens inverter refrigerator PCB motherboard repair in Pune. Premium component-level restoration.",
  },

  "pcb-panasonic-inverter-fridge-repair": {
    slug: "pcb-panasonic-inverter-fridge-repair",
    title: "Panasonic Econavi Inverter Refrigerator PCB Repair",
    category: "refrigeration",
    tagline: "Panasonic Econavi smart sensor microprocessor board repair, inverter drive IC replacement, and defrost logic tuning.",
    description: "Advanced repair for Panasonic Econavi smart inverter refrigerators. Fixes light sensor and door opening sensor processing faults, inverter compressor modulation drops, and automatic defrost logic failures.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Econavi smart sensor microprocessor circuit repair",
      "Inverter compressor 3-phase driver stage overhaul",
      "Defrost heater electronic switching relay replacement",
      "Anti-bacterial Ag-Clean power module refurbishment",
    ],
    process: [
      "Testing Econavi ambient light and thermistor sensor inputs",
      "Replacing blown surface-mount diodes and driver transistors",
      "Verifying pulse-width modulated motor outputs",
      "Bench load testing with simulated compressor and sensor coils",
    ],
    faqs: [
      {
        q: "What does the Econavi sensor do on Panasonic refrigerators?",
        a: "Econavi sensors monitor lighting and usage habits to optimize cooling. PCB repair restores automated energy-saving algorithms.",
      },
    ],
    seoTitle: "Panasonic Econavi Inverter Refrigerator PCB Repair | Prime Cool",
    seoDesc: "Panasonic Econavi inverter refrigerator PCB repair in Pune. Doorstep diagnostics and component-level micro-soldering.",
  },

  "pcb-commercial-deep-freezer-controller-repair": {
    slug: "pcb-commercial-deep-freezer-controller-repair",
    title: "Commercial Deep Freezer & Cold Room Digital Controller PCB Repair",
    category: "refrigeration",
    tagline: "Dixell, Carel, and Sub-Zero digital thermostat controller PCB repair, heavy-duty contactor relay swaps, and defrost timers.",
    description: "Industrial repair for commercial deep freezers, blast freezers, bottle coolers, and walk-in cold room digital electronic temperature controllers (Dixell, Carel, Eliwell, Sub-Zero). Fixes sensor readout errors (P1/P2), contactor chatter, and defrost relay burnouts.",
    priceEstimate: "Starts from ₹1,650 + Spares",
    features: [
      "Dixell / Carel digital thermostat controller PCB rework",
      "Heavy-duty 16A/30A compressor relay switch replacement",
      "NTC/PTC probe analog-to-digital converter calibration",
      "Defrost heater and fan delay timing circuit restoration",
    ],
    process: [
      "Testing relay contact resistance and coil trigger voltage",
      "Replacing degraded switching power supply capacitors",
      "Calibrating temperature readout against reference digital probe",
      "Performing high-current contactor load test",
    ],
    faqs: [
      {
        q: "Why is my commercial deep freezer controller showing Error P1?",
        a: "Error P1 represents a broken or shorted NTC room temperature probe, or a damaged analog input channel on the controller board.",
      },
    ],
    seoTitle: "Commercial Deep Freezer & Cold Room Controller PCB Repair | Prime Cool",
    seoDesc: "Commercial refrigeration & cold room digital controller PCB repair in Pune & MIDC industrial parks. Fast emergency service.",
  },

  "pcb-side-by-side-fridge-display-board-repair": {
    slug: "pcb-side-by-side-fridge-display-board-repair",
    title: "Side-by-Side Refrigerator Touch Display & Inverter Driver Board Repair",
    category: "refrigeration",
    tagline: "Multi-door luxury refrigerator capacitive touch panel PCB repair, ice maker dispenser electronic logic, and inverter driver boards.",
    description: "Specialist repair for luxury Side-by-Side, French Door, and Multi-Door refrigerator front touch display cards, water/ice dispenser electronic control boards, and primary inverter drive cards.",
    priceEstimate: "Starts from ₹1,950 + Spares",
    features: [
      "Capacitive touch panel button & LED segment display repair",
      "Automatic ice maker motor and solenoid driver board rework",
      "Dual evaporator stepper damper valve controller repair",
      "Internal communication bus link between door and mainboard",
    ],
    process: [
      "Tracing ribbon cable continuity and signal integrity",
      "Replacing failed display driver ICs and touch controller chips",
      "Testing dispenser auger motor relay and solenoid actuation",
      "Bench testing full touch interface and temperature selection logic",
    ],
    faqs: [
      {
        q: "Can an unresponsive touch display panel on a side-by-side fridge be fixed?",
        a: "Yes! Replacing the touch controller IC or repairing ribbon cable traces restores full touch functionality without replacing the entire door panel.",
      },
    ],
    seoTitle: "Side-by-Side Refrigerator Touch Display & PCB Repair | Prime Cool",
    seoDesc: "Side-by-side luxury refrigerator touch display and inverter PCB repair in Pune. Certified multi-door specialists.",
  },

  // --- SECTION 3: TOP 10 WASHING MACHINE PCB REPAIR SERVICES ---
  "pcb-front-load-washing-machine-drive-repair": {
    slug: "pcb-front-load-washing-machine-drive-repair",
    title: "Front Load Washing Machine Inverter Motor Drive PCB Repair",
    category: "residential",
    tagline: "Component-level repair for front-load BLDC motor drive boards, IPM transistors, tachometer circuits, and power modules.",
    description: "Expert electronics repair for fully automatic front-load washing machine main controller motherboards and inverter motor drive units. Fixes drum not rotating, violent spin vibration trips, water drainage errors, and dead power boards.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "BLDC 3-phase inverter motor drive IPM module replacement",
      "Motor tachometer feedback speed sensor circuit repair",
      "Electronic door interlock triac and heater relay replacement",
      "Water level frequency pressure sensor circuit overhaul",
    ],
    process: [
      "Diagnostic reading of error codes and motor driver voltage outputs",
      "Replacing burnt triacs, power IGBTs, and switching diodes",
      "Testing tachometer RPM feedback loops on simulator rig",
      "Applying conformal moisture-proofing coating to prevent detergent corrosion",
    ],
    faqs: [
      {
        q: "Why is my front load washing machine drum not turning despite motor hum?",
        a: "A motor hum without drum rotation usually points to a burnt IPM power transistor or blown motor drive triac on the main PCB.",
      },
    ],
    seoTitle: "Front Load Washing Machine Inverter Motor Drive PCB Repair | Prime Cool",
    seoDesc: "Front load washing machine PCB board repair in Pune. Component-level micro-soldering with genuine OEM parts and 6-month warranty.",
  },

  "pcb-top-load-washing-machine-motherboard-repair": {
    slug: "pcb-top-load-washing-machine-motherboard-repair",
    title: "Top Load Fully Automatic Washing Machine PCB Motherboard Repair",
    category: "residential",
    tagline: "Water level pressure sensor circuit repair, triac motor direction switching, and main power transformer renewal.",
    description: "Reliable circuit board repair for top load fully automatic washing machines across all brands. Resolves water intake errors, continuous draining, spin cycle failure, and unbalance sensor misfires.",
    priceEstimate: "Starts from ₹1,299 + Spares",
    features: [
      "Motor clockwise/counter-clockwise directional triac replacement",
      "Pressure switch frequency comparator circuit repair",
      "Drain motor & clutch solenoid driver transistor replacement",
      "SMPS power supply transformer and bridge rectifier overhaul",
    ],
    process: [
      "Checking DC operating rails (5V logic, 12V relay)",
      "Testing motor direction switching under simulated wash agitation",
      "Replacing damaged PCB tracks caused by vibration or moisture",
      "Bench load testing complete wash, rinse, and spin cycles",
    ],
    faqs: [
      {
        q: "Why does my top load washing machine keep draining water immediately?",
        a: "A short-circuited drain motor triac on the PCB continuously activates the drain valve, draining water as soon as it fills.",
      },
    ],
    seoTitle: "Top Load Washing Machine PCB Motherboard Repair | Prime Cool",
    seoDesc: "Top load washing machine PCB motherboard repair in Pune & PCMC. Fast doorstep service with certified technicians.",
  },

  "pcb-ifb-front-load-washing-machine-repair": {
    slug: "pcb-ifb-front-load-washing-machine-repair",
    title: "IFB Front Load Washing Machine PCB Board Repair (Error E01 / E02 / E08)",
    category: "residential",
    tagline: "IFB Senator, Elena, and Executive washing machine control board rework, door lock triac replacement, and motor driver repairs.",
    description: "Specialized repair for IFB Senator, Elena, Serena, and Executive front load washing machine electronic control cards. Resolves Error E01 (door lock fault), E02 (water level error), E08 (motor drive overcurrent), and dead display boards.",
    priceEstimate: "Starts from ₹1,650 + Spares",
    features: [
      "IFB door latch electronic PTC triac replacement",
      "Motor drive circuit and carbon brush tachometer signal rework",
      "Water heating element safety relay switch replacement",
      "Display selector rotary encoder and button switch restoration",
    ],
    process: [
      "Isolating failed power supply components and burnt copper traces",
      "Replacing shorted switching triacs and optocouplers",
      "Testing door lock engagement signal and heating relay actuation",
      "Full cycle simulation on automated test bench",
    ],
    faqs: [
      {
        q: "What causes IFB washing machine Error Code E01?",
        a: "Error E01 indicates a door lock circuit fault on the PCB or a burnt door switch triac preventing the wash cycle from starting.",
      },
    ],
    seoTitle: "IFB Front Load Washing Machine PCB Board Repair (E01, E08) | Prime Cool",
    seoDesc: "IFB front load washing machine PCB repair specialist in Pune. Component-level repair with genuine spares and 6-month warranty.",
  },

  "pcb-lg-inverter-direct-drive-washing-machine-repair": {
    slug: "pcb-lg-inverter-direct-drive-washing-machine-repair",
    title: "LG Direct Drive (DD) Inverter Washing Machine PCB Repair (Error LE / OE / dE)",
    category: "residential",
    tagline: "LG 6 Motion Direct Drive IPM inverter board micro-soldering, hall sensor feedback circuit repair, and drain pump triacs.",
    description: "Component-level electronics repair for LG Inverter Direct Drive (DD) and 6 Motion front load & top load washing machines. Fixes Error LE (motor overload / locked rotor), OE (water drain timeout), dE (door error), and PE (pressure sensor fault).",
    priceEstimate: "Starts from ₹1,699 + Spares",
    features: [
      "Direct Drive BLDC motor IPM power stage replacement",
      "Hall sensor 3-phase rotor position feedback circuit repair",
      "Drain pump driver transistor and snubber diode overhaul",
      "Smart Diagnosis electronic communication circuit restoration",
    ],
    process: [
      "Analyzing hall sensor square-wave feedback signals with oscilloscope",
      "Desoldering damaged surface-mount power transistors",
      "Replacing low-ESR filter capacitors and optoisolators",
      "Running 1400 RPM spin balance test on dynamic test stand",
    ],
    faqs: [
      {
        q: "What causes LG Washing Machine Error Code LE?",
        a: "Error LE occurs when the PCB cannot read rotor speed from the hall sensor or the inverter IPM module is overloaded.",
      },
    ],
    seoTitle: "LG Direct Drive Inverter Washing Machine PCB Repair (LE, OE) | Prime Cool",
    seoDesc: "LG Direct Drive washing machine PCB motherboard repair in Pune. Certified component-level micro-soldering.",
  },

  "pcb-samsung-ecobubble-washing-machine-repair": {
    slug: "pcb-samsung-ecobubble-washing-machine-repair",
    title: "Samsung EcoBubble Inverter Washing Machine PCB Repair (Error 3C / 4C / 5C)",
    category: "residential",
    tagline: "Samsung Digital Inverter washing machine mainboard repair, bubble generator circuit fixes, and water inlet valve drivers.",
    description: "High-precision repair for Samsung EcoBubble and Digital Inverter front load and top load washing machine control boards. Fixes Error 3C (motor drive failure), 4C (water supply error), 5C (drain block), and dC (door lock fault).",
    priceEstimate: "Starts from ₹1,599 + Spares",
    features: [
      "Digital Inverter motor driver stage micro-soldering",
      "EcoBubble air pump generator switching circuit repair",
      "Water inlet valve and drain pump triac replacement",
      "Microcontroller EEPROM parameter reset and flashing",
    ],
    process: [
      "Testing inverter bridge switching gate waveforms",
      "Replacing damaged triacs, capacitors, and SMD resistors",
      "Testing water inlet valve pulse activation and flow rate sensing",
      "Simulating high-speed spin cycle with unbalanced load detection",
    ],
    faqs: [
      {
        q: "How to fix Samsung Washing Machine Error Code 3C?",
        a: "Error 3C points to a motor driver failure on the PCB. We micro-solder the inverter drive IC and replace gate resistors.",
      },
    ],
    seoTitle: "Samsung EcoBubble Inverter Washing Machine PCB Repair (3C, 5C) | Prime Cool",
    seoDesc: "Samsung inverter washing machine PCB repair in Pune & PCMC. Doorstep technician service and component-level rework.",
  },

  "pcb-bosch-series-washing-machine-repair": {
    slug: "pcb-bosch-series-washing-machine-repair",
    title: "Bosch Series 4 / 6 / 8 Washing Machine Control Board PCB Repair (Error E18 / E23)",
    category: "residential",
    tagline: "Bosch EcoSilence Drive inverter motor controller PCB repair, aqua-stop relay fixes, and program selector microprocessor tuning.",
    description: "Expert electronics repair for Bosch Series 4, Series 6, and Series 8 front load washing machines. Fixes Error E18 (drain pump timeout), E23 (AquaStop leak sensor trigger), E57 (inverter motor drive error), and unresponsive touch selectors.",
    priceEstimate: "Starts from ₹1,950 + Spares",
    features: [
      "EcoSilence Drive brushless BLDC motor controller repair",
      "AquaStop leak sensor relay and safety circuit overhaul",
      "Rotary program selector and capacitive touch board repair",
      "German-spec multi-layer PCB precision trace micro-repair",
    ],
    process: [
      "Scanning fault memory using Bosch diagnostic interface",
      "Locating damaged SMD components under stereo microscope",
      "Replacing defective inverter drive transistors and optoisolators",
      "Testing complete 90°C cotton cycle on test simulator",
    ],
    faqs: [
      {
        q: "What causes Bosch washing machine Error E57?",
        a: "Error E57 indicates a communication failure or burnt IGBT module on the EcoSilence Drive inverter motor PCB.",
      },
    ],
    seoTitle: "Bosch Series 4/6/8 Washing Machine Control Board PCB Repair | Prime Cool",
    seoDesc: "Bosch washing machine PCB board repair specialist in Pune. Fix E18, E23, E57 errors with genuine OEM parts.",
  },

  "pcb-whirlpool-6th-sense-washing-machine-repair": {
    slug: "pcb-whirlpool-6th-sense-washing-machine-repair",
    title: "Whirlpool 6th Sense Inverter Washing Machine PCB Repair (Error F02 / F06)",
    category: "residential",
    tagline: "Whirlpool BloomWash and FreshCare washing machine motherboard rework, spin motor triac replacements, and display card repairs.",
    description: "Comprehensive electronics repair for Whirlpool 6th Sense, BloomWash, and FreshCare washing machine mainboards. Solves Error F02 (drain error), F06 (tachometer motor speed error), F08 (heater relay fault), and dead power supplies.",
    priceEstimate: "Starts from ₹1,450 + Spares",
    features: [
      "6th Sense smart sensor microcontroller loop repair",
      "Spin motor & agitator bidirectional triac replacement",
      "Drain pump & water valve switching transistor overhaul",
      "Display touch card and LED segment indicator repair",
    ],
    process: [
      "Testing motor tachometer signal feedback across speed ranges",
      "Replacing blown power switching diodes and filter capacitors",
      "Re-soldering cracked solder joints caused by spin vibration",
      "Validating automated water-sensing cycle on test stand",
    ],
    faqs: [
      {
        q: "What does Whirlpool Error Code F06 mean?",
        a: "Error F06 indicates the control board cannot detect motor speed feedback from the tachometer coil.",
      },
    ],
    seoTitle: "Whirlpool 6th Sense Inverter Washing Machine PCB Repair | Prime Cool",
    seoDesc: "Whirlpool washing machine PCB motherboard repair in Pune & PCMC. Fast turnaround with 6-month warranty.",
  },

  "pcb-panasonic-inverter-washing-machine-repair": {
    slug: "pcb-panasonic-inverter-washing-machine-repair",
    title: "Panasonic StainMaster Inverter Washing Machine PCB Repair (Error U11 / U14)",
    category: "residential",
    tagline: "Panasonic top and front load washing machine power board repairs, water sensor comparator circuits, and motor driver ICs.",
    description: "Component-level repair for Panasonic StainMaster, Econavi, and Inverter washing machine electronic motherboards. Fixes Error U11 (drain failure), U13 (unbalanced spin load), U14 (water intake timeout), and H01 (pressure sensor abnormality).",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Econavi water temperature and load sensor circuit repair",
      "Inverter drive motor 3-phase output stage overhaul",
      "Water inlet valve and drain motor triac replacement",
      "Waterproof conformal potting compound renewal",
    ],
    process: [
      "Testing pressure sensor analog signal voltage against water levels",
      "Replacing degraded switching ICs and power diodes",
      "Testing motor speed ramp-up under heavy simulated load",
      "Applying silicone moisture barrier coating",
    ],
    faqs: [
      {
        q: "Why is my Panasonic washing machine showing Error U14?",
        a: "Error U14 means water is not filling in time, often caused by a failed water inlet valve triac on the PCB.",
      },
    ],
    seoTitle: "Panasonic Inverter Washing Machine PCB Repair (U11, U14) | Prime Cool",
    seoDesc: "Panasonic washing machine PCB repair in Pune. Doorstep technician service and component-level micro-soldering.",
  },

  "pcb-haier-direct-motion-washing-machine-repair": {
    slug: "pcb-haier-direct-motion-washing-machine-repair",
    title: "Haier Direct Motion Inverter Washing Machine PCB Board Repair (Error E4 / UNB)",
    category: "residential",
    tagline: "Haier washing machine inverter motor driver board restoration, unbalance sensor calibration, and SMPS power module fixes.",
    description: "Specialized repair for Haier Direct Motion and Fully Automatic inverter washing machine mainboards. Solves Error E4 (water fill timeout), UNB (unbalanced load protection), E2 (drain error), and motor startup jitter.",
    priceEstimate: "Starts from ₹1,399 + Spares",
    features: [
      "Direct Motion inverter motor controller stage repair",
      "Unbalance optical and accelerometer sensor calibration",
      "Drain pump and water inlet solenoid driver triac replacement",
      "SMPS power supply rail and capacitor bank overhaul",
    ],
    process: [
      "Testing Direct Motion motor 3-phase driving waveforms",
      "Replacing shorted power transistors and snubber diodes",
      "Checking water level sensor frequency response",
      "Performing dynamic spin cycle vibration test",
    ],
    faqs: [
      {
        q: "What causes Haier washing machine to stop during spin cycle with UNB error?",
        a: "A faulty unbalance sensing comparator circuit on the PCB or broken shock sensor causes premature spin aborts.",
      },
    ],
    seoTitle: "Haier Direct Motion Inverter Washing Machine PCB Repair | Prime Cool",
    seoDesc: "Haier washing machine PCB board repair in Pune. Certified component-level micro-soldering with warranty.",
  },

  "pcb-semi-automatic-washing-machine-timer-repair": {
    slug: "pcb-semi-automatic-washing-machine-timer-repair",
    title: "Semi-Automatic Washing Machine Spin & Wash Timer Electronic Board Repair",
    category: "residential",
    tagline: "Heavy-duty dual capacitor check, buzzer electronic circuit repair, wash selector switch refurbishment, and motor wiring harness.",
    description: "Cost-effective repair and refurbishment for semi-automatic twin-tub washing machine mechanical/electronic wash timers, spin timers, dual run capacitor banks, and end-of-cycle buzzers across all brands.",
    priceEstimate: "Starts from ₹699 + Spares",
    features: [
      "Heavy-duty wash & spin timer contact point refurbishment",
      "Dual run capacitor (10+5 µF / 12+6 µF) capacitance test & swap",
      "End-of-cycle alarm buzzer electronic circuit repair",
      "Wash mode selector (Gentle/Normal/Strong) contact restoration",
    ],
    process: [
      "Inspecting timer gear train and cleaning oxidized electrical contact points",
      "Testing motor run capacitor with digital LCR capacitance meter",
      "Replacing burnt safety spin lid micro-switch",
      "Verifying automatic timer countdown and directional motor reversal",
    ],
    faqs: [
      {
        q: "Why is the wash timer ticking but the motor not reversing direction?",
        a: "Worn or burnt contact points inside the timer prevent polarity reversal. Refurbishing or replacing the timer restores bidirectional washing.",
      },
    ],
    seoTitle: "Semi-Automatic Washing Machine Timer & Electronic Board Repair | Prime Cool",
    seoDesc: "Semi-automatic washing machine timer and capacitor repair in Pune. Fast doorstep service for LG, Samsung, Whirlpool, Godrej.",
  },

  // =========================================================================
  // CORE RESIDENTIAL, COMMERCIAL, REFRIGERATION & INDUSTRIAL SERVICES
  // =========================================================================

  // --- Residential Services ---
  "split-ac-repair": {
    slug: "split-ac-repair",
    title: "Split & Inverter AC Servicing & Jet Wash",
    category: "residential",
    tagline: "High-pressure chemical jet cleaning, coil descaling, and precision cooling tune-ups.",
    description:
      "Comprehensive servicing for split and inverter air conditioners. Includes high-pressure chemical jet cleaning of evaporator and condenser coils, drain line flushing, gas pressure testing, and anti-bacterial foam treatment.",
    priceEstimate: "Starts from ₹499",
    features: [
      "High-pressure 140-bar chemical jet wash",
      "Evaporator & condenser coil descaling",
      "Condensate drain line flush & clog removal",
      "Gas pressure & operating current measurement",
    ],
    process: [
      "Inspecting electrical connections and capacitor health",
      "Applying eco-friendly foam cleaner on cooling fins",
      "Jet washing outdoor condensing unit and blower fan",
      "Testing supply air delta-T temperature differential",
    ],
    faqs: [
      {
        q: "How often should an inverter split AC be serviced?",
        a: "We recommend deep jet servicing twice a year — before summer peak load and post-monsoon.",
      },
    ],
    seoTitle: "Split & Inverter AC Jet Servicing in Pune | Prime Cool",
    seoDesc:
      "Professional high-pressure jet wash and chemical servicing for split & inverter ACs in Pune, Wagholi, Kharadi, and Hadapsar. Guaranteed cooling.",
  },
  "window-ac-repair": {
    slug: "window-ac-repair",
    title: "Window AC Servicing & Chemical Wash",
    category: "residential",
    tagline: "Full unit overhaul, fan motor lubrication, and rust treatment.",
    description:
      "Complete servicing and overhaul for all window AC models. Includes chassis removal, deep chemical dip wash, fan motor bearing greasing, condenser coil straightening, and vibration isolation damper checks.",
    priceEstimate: "Starts from ₹449",
    features: [
      "Complete chassis dismounting and deep wash",
      "Blower motor bearing lubrication",
      "Capacitor and thermal overload relay test",
      "Anti-rust protective coating on base tray",
    ],
    process: [
      "Dismounting window AC unit from sleeve frame",
      "Chemical cleaning of front grill, filter, and evaporator",
      "Checking compressor winding resistance and rubber mounts",
      "Re-installing with leak check and airflow balance",
    ],
    faqs: [
      {
        q: "Why is water leaking inside from my window AC?",
        a: "A clogged drain tray, blocked drain hole, or tilted unit mounting frame usually causes water overflow inside.",
      },
    ],
  },
  "ac-gas-charging": {
    slug: "ac-gas-charging",
    title: "AC Gas Leak Repair & Recharging (R32 / R410A / R22)",
    category: "residential",
    tagline: "Nitrogen pressure leak detection, copper brazing, and digital weight gas charging.",
    description:
      "Expert refrigerant leak detection and gas recharging for inverter and fixed-speed ACs. We pressurize system lines with dry nitrogen up to 350 PSI to locate micro-leaks, silver braze copper joints, pull deep vacuum to 500 microns, and charge virgin gas by electronic scale weight.",
    priceEstimate: "Starts from ₹1,499",
    features: [
      "Nitrogen pressure leak testing up to 350 PSI",
      "Silver-alloy copper tube brazing",
      "500-micron deep vacuum evacuation",
      "Precision gas charging using digital refrigerant scale",
    ],
    process: [
      "Diagnostic isolation of indoor unit, outdoor unit, and line sets",
      "Repairing flare nuts, schrader valves, or copper splits",
      "Vacuum pulling to remove moisture and non-condensables",
      "Weighing exact R32 / R410A refrigerant charge per nameplate",
    ],
    faqs: [
      {
        q: "Do inverter ACs require special gas charging procedure?",
        a: "Yes! R32 and R410A are synthetic blends that MUST be charged in liquid phase using a digital scale after deep vacuuming.",
      },
    ],
  },
  "ac-installation": {
    slug: "ac-installation",
    title: "Split & Window AC Installation / Dismantling",
    category: "residential",
    tagline: "Precision wall mounting, copper piping, flare joints, and vacuum testing.",
    description:
      "Professional mounting and uninstallation of split, window, and multi-split ACs. Uses heavy-duty powder-coated wall brackets, seamless copper piping, vibration dampers, core drilling, and post-installation vacuum commissioning.",
    priceEstimate: "Starts from ₹999",
    features: [
      "Heavy-duty powder-coated outdoor wall brackets",
      "Insulated copper line installation & flare fitting",
      "Wall core drilling with neat hole grommet sealing",
      "Vacuum pump air purge and leak verification",
    ],
    process: [
      "Leveling indoor unit mounting plate using spirit level",
      "Routing copper pipe, drain hose, and signal cables",
      "Torquing flare nuts using calibrated torque wrench",
      "Testing condensate gravity drainage and cooling",
    ],
    faqs: [
      {
        q: "Is copper pipe insulation included in AC installation?",
        a: "Yes, both liquid and suction lines are individually insulated with nitrile foam sleeves to prevent sweating.",
      },
    ],
  },
  "fridge-repair": {
    slug: "fridge-repair",
    title: "Single & Double Door Refrigerator Repair",
    category: "residential",
    tagline: "Compressor relay, thermostat, defrost timer, and gas charging.",
    description:
      "Reliable repair for single door, double door, side-by-side, and frost-free refrigerators. We fix non-cooling issues, noisy compressors, automatic defrost failures, thermostat cut-offs, and door gasket sealing.",
    priceEstimate: "Starts from ₹399 + Spares",
    features: [
      "PTC relay & overload protector (OLP) replacement",
      "Defrost heater & thermal bimetal sensor repair",
      "R600a / R134a hydrocarbon eco-gas charging",
      "Magnetic door gasket seal replacement",
    ],
    process: [
      "Testing thermostat contacts and compressor windings",
      "Replacing failed bimetal defrost thermostat or timer board",
      "Evacuated refrigerant gas charging",
      "Verifying freezer temperature reaches sub-zero targets",
    ],
    faqs: [
      {
        q: "Why is my freezer cold but the lower fridge section warm?",
        a: "This is caused by a blocked air damper, failed defrost heater, or ice build-up in the evaporator air duct.",
      },
    ],
  },
  "washing-machine": {
    slug: "washing-machine",
    title: "Front & Top Load Washing Machine Repair",
    category: "residential",
    tagline: "Drum bearing, motor carbon brushes, drain pump, and PCB repairs.",
    description:
      "Comprehensive servicing for fully automatic front load, top load, and semi-automatic washing machines. Fixes excessive vibration, noisy spinning, drainage errors (OE/E2), water inlet valve leaks, and drum bearing noise.",
    priceEstimate: "Starts from ₹399 + Spares",
    features: [
      "Heavy-duty spider arm & drum bearing replacement",
      "Drain pump motor & lint trap filter cleaning",
      "Inverter drive motor controller board diagnostic",
      "Door rubber boot diaphragm seal replacement",
    ],
    process: [
      "Diagnosing error codes and motor tachometer feedback",
      "Testing water inlet solenoid valve and pressure switch",
      "Replacing worn drive belt or shock absorber struts",
      "Running high-RPM spin cycle vibration test",
    ],
    faqs: [
      {
        q: "Why is my washing machine making loud grinding noise during spin?",
        a: "Worn tub bearings or a corroded spider arm bracket usually cause loud grinding noises during high-speed spinning.",
      },
    ],
  },

  // --- Commercial Services ---
  "cassette-ac-repair": {
    slug: "cassette-ac-repair",
    title: "Cassette & Ceiling Suspended AC Repair",
    category: "commercial",
    tagline: "4-way blow panel cleaning, lift pump repairs, and multi-split controls.",
    description:
      "Specialized maintenance for commercial ceiling cassette air conditioners. Includes 4-way airflow louvre motor alignment, condensate lift pump testing, coil descaling, and wireless remote sensor troubleshooting.",
    priceEstimate: "Starts from ₹899 + Spares",
    features: [
      "Ceiling cassette 4-way grill & filter deep wash",
      "Condensate drain lift pump & float switch testing",
      "Louvre swing step motor replacement",
      "Indoor fan motor capacitor & bearing service",
    ],
    process: [
      "Lowering decorative ceiling grill panel",
      "Cleaning internal drain pan and testing auto-drain pump",
      "Chemical jet washing evaporator coil in-place with catch bag",
      "Commissioning multi-directional airflow dampers",
    ],
    faqs: [
      {
        q: "Why is the error light blinking on my cassette AC?",
        a: "A blinking light typically indicates a condensate lift pump failure or high water level float switch trip.",
      },
    ],
  },
  "ductable-ac-repair": {
    slug: "ductable-ac-repair",
    title: "Ductable Split & Central Air Conditioning",
    category: "commercial",
    tagline: "Blower belt tensioning, duct insulation, volume control dampers, and AMC.",
    description:
      "End-to-end service for high-static ductable units and package central air conditioners. We balance supply/return air CFM, insulate ductwork with acoustic liner, replace centrifugal blower belts, and clean multi-row cooling coils.",
    priceEstimate: "Starts from ₹1,299 + Spares",
    features: [
      "Centrifugal fan pulley alignment & belt tensioning",
      "Multi-row evaporator coil chemical pressure washing",
      "Thermostat controller cable & relay board repair",
      "Supply air grille velocity measurement",
    ],
    process: [
      "Inspecting duct connections for air leakage",
      "Cleaning washable aluminum mesh filters",
      "Checking scroll compressor crankcase heater & oil sight glass",
      "Verifying static pressure delta across supply plenum",
    ],
    faqs: [
      {
        q: "How often should commercial AC ducts be inspected?",
        a: "Duct filters and blower belts should be checked monthly, with full coil descaling every quarter.",
      },
    ],
  },
  "vrf-systems": {
    slug: "vrf-systems",
    title: "VRF / VRV Multi-Zone Climate Systems",
    category: "commercial",
    tagline:
      "Inverter compressor oil management, expansion valve tuning, and branch selector box repairs.",
    description:
      "Expert diagnostics for Daikin VRV, Mitsubishi City Multi, LG Multi V, and Voltas VRF systems. Specialist in E3/E5 communication fault resolution, Electronic Expansion Valve (EEV) step motor replacement, oil return solenoid cycle checks, and centralized touch controller programming.",
    priceEstimate: "Custom Site Quote",
    features: [
      "Inverter scroll compressor variable frequency drive analysis",
      "Electronic Expansion Valve (EEV) pulse motor testing",
      "Branch selector (BS) box solenoid valve repair",
      "Refrigerant piping pressure hold & oil balance logging",
    ],
    process: [
      "Connecting manufacturer diagnostic service tool software",
      "Analyzing superheat/subcooling across all active indoor units",
      "Checking outdoor master/slave module communication loops",
      "Calibrating system refrigerant charge",
    ],
    faqs: [
      {
        q: "What causes communication errors (E5/U4) in VRF systems?",
        a: "Loose shielded RS-485 communication wires, electrical noise, or damaged optocouplers on the mainboard cause communication errors.",
      },
    ],
  },
  "corporate-hvac-amc": {
    slug: "corporate-hvac-amc",
    title: "Corporate Office HVAC AMC & Facility Servicing",
    category: "commercial",
    tagline: "Scheduled monthly maintenance, priority emergency response, and energy audits.",
    description:
      "Annual Maintenance Contracts (AMC) designed for IT parks, corporate offices, commercial towers, and retail spaces. Includes 24/7 priority technician dispatch, monthly preventative filter cleanings, quarterly coil descaling, energy consumption logging, and zero-downtime SLA coverage.",
    priceEstimate: "Custom Annual Quote",
    features: [
      "Comprehensive (Labour + Parts) or Non-Comprehensive AMC options",
      "Monthly preventative maintenance site visits",
      "24/7 Code Red emergency breakdown dispatch",
      "Dedicated HVAC engineer assigned to facility",
    ],
    process: [
      "Comprehensive baseline HVAC equipment thermal audit",
      "Establishing preventative maintenance schedule log",
      "Performing scheduled filter, coil, and electrical checks",
      "Providing quarterly energy efficiency compliance reports",
    ],
    faqs: [
      {
        q: "Does your AMC cover emergency breakdowns on weekends?",
        a: "Yes! Our corporate AMC includes 24/7 emergency technician dispatch within 2 hours.",
      },
    ],
  },
  "server-room-cooling": {
    slug: "server-room-cooling",
    title: "Server Room Cooling & N+1 Redundancy",
    category: "commercial",
    tagline: "Hot/cold aisle layouts, standby AC controllers, and monitoring.",
    description:
      "Server rooms require constant operation. We set up automatic sequential control systems, N+1 standby AC switchboards, hot/cold aisle cooling configurations, and temperature alarm warning widgets.",
    priceEstimate: "Starts from ₹1,500 / Consultation",
    features: [
      "Standby cyclic controller fitting",
      "SMS temperature warning alert integration",
      "Hot/cold aisle containment",
      "Dual power supply auto-throwover check",
    ],
    process: [
      "Auditing thermal load density of server racks",
      "Installing cyclical controllers to rotate active AC units",
      "Setting up redundancy thresholds",
      "Simulating sensor trips to verify failover alarms",
    ],
    faqs: [
      {
        q: "What is an N+1 cooling setup?",
        a: "It means having at least one backup cooling unit (Standby) more than required, ensuring full operation if one main unit breaks down.",
      },
    ],
  },

  // --- Refrigeration ---
  "cold-rooms": {
    slug: "cold-rooms",
    title: "Cold Room Design & Installation",
    category: "refrigeration",
    tagline: "PUF panel cold rooms, condensing unit installations, and testing.",
    description:
      "We install and repair walk-in commercial cold storage facilities. We supply PUF panels, install walk-in sliding doors, calibrate electronic controllers, and mount indoor evaporator unit coils.",
    priceEstimate: "Custom Project Quote",
    features: [
      "PUF panel wall construction & interlocking check",
      "Hermetic & semi-hermetic condensing unit fitment",
      "Door heater wire installation (freeze prevention)",
      "Digital temperature recording controller setup",
    ],
    process: [
      "Site floor leveling and baseline marking",
      "Cam-locking PUF panel modules",
      "Installing refrigeration units and running lines",
      "Vacuum pulling to 500 microns and commissioning log",
    ],
    faqs: [
      {
        q: "What thickness PUF panel is required for positive cold rooms?",
        a: "For temperatures above 0°C, 60mm to 80mm thickness is standard, while freezers require 100mm to 150mm.",
      },
    ],
  },
  "walk-in-chillers": {
    slug: "walk-in-chillers",
    title: "Walk-in Chillers (0°C to +4°C)",
    category: "refrigeration",
    tagline: "Fresh food and beverage cold rooms troubleshooting.",
    description:
      "Walk-in chillers hold items above freezing. We resolve evaporator icing, replace expansion valve orifices, recharge R134a/R404A gas, and check compressor oils.",
    priceEstimate: "Starts from ₹1,200 + Spares",
    features: [
      "Liquid line solenoid valve diagnostics",
      "Evaporator defrost heater testing",
      "Pressure switch controls (HP/LP) adjustment",
      "Digital Dixell/Eliwell controller calibration",
    ],
    process: [
      "Checking evaporator coils for ice bridging",
      "Testing suction gas superheat values",
      "Measuring fan motor current draws",
      "Calibrating air temperature sensors",
    ],
    faqs: [
      {
        q: "Why is water dripping inside the walk-in chiller?",
        a: "A frozen drain line or clogged condensate tray is the typical cause, preventing defrost water from leaving the room.",
      },
    ],
  },
  "walk-in-freezers": {
    slug: "walk-in-freezers",
    title: "Walk-in Freezers (-18°C to -25°C)",
    category: "refrigeration",
    tagline: "Sub-zero cold room maintenance and defrost cycle controls.",
    description:
      "Sub-zero walk-in freezers require heavy-duty defrost setups. We diagnose frozen coils, replace failed defrost elements, fit pressure relief ports, and repair door heater wires.",
    priceEstimate: "Starts from ₹1,500 + Spares",
    features: [
      "Sub-zero door pressure release ports repair",
      "Heavy duty defrost heaters replacement",
      "Liquid-injection scroll compressor checks",
      "Polyurethane door sweep renewals",
    ],
    process: [
      "Performing insulation barrier checks",
      "Testing defrost heaters current draw",
      "Verifying fan delay controls after defrosting",
      "Checking oil return separator loops",
    ],
    faqs: [
      {
        q: "Why is there heavy ice buildup near the freezer door?",
        a: "This is usually caused by worn magnetic sweeps or a failed door heater cable allowing moisture to condense and freeze instantly.",
      },
    ],
  },
  "ice-machines": {
    slug: "ice-machines",
    title: "Commercial Ice Machine Service",
    category: "refrigeration",
    tagline: "Cube, flake, and tube ice makers descaling and diagnostics.",
    description:
      "Ice machines require strict hygienic descaling, water level control changes, dump valve cleanups, harvest cycle controls, and compressor check-ups.",
    priceEstimate: "Starts from ₹950 + Materials",
    features: [
      "Hygienic evaporator grid descaling",
      "Water level sensor & float replacements",
      "Hot gas harvest solenoid valve repair",
      "Water pump replacement",
    ],
    process: [
      "Running chemical cleaning cycles with nickel-safe agents",
      "Checking evaporator water distribution tubes",
      "Testing hot gas bypass valve response",
      "Verifying ice thickness sensors",
    ],
    faqs: [
      {
        q: "Why are the ice cubes hollow or thin?",
        a: "This is often due to low water flow, scaled-up evaporator grids, or slightly low refrigerant charge.",
      },
    ],
  },
  "blast-freezers": {
    slug: "blast-freezers",
    title: "Blast Freezers (-35°C to -40°C)",
    category: "refrigeration",
    tagline: "Rapid freezing cycle systems overhauls and testing.",
    description:
      "Blast freezers freeze food products rapidly. We design, service, and repair two-stage refrigeration compressor systems, high-CFM evaporator blowers, and electrical control panels.",
    priceEstimate: "Custom Quote",
    features: [
      "Two-stage reciprocating compressor service",
      "Low temperature expansion valves replacement",
      "Vapor injection system calibration",
      "Heavy defrost element arrays service",
    ],
    process: [
      "Checking compression ratio and interstage pressures",
      "Testing oil level switches",
      "Verifying evaporator fan motor speed controls",
      "Recording pull-down times from +20°C to -35°C",
    ],
    faqs: [
      {
        q: "Why is pull-down time critical for blast freezers?",
        a: "Slow freezing creates large ice crystals, which damages food cell walls and degrades product quality upon thawing.",
      },
    ],
  },
  "bottle-coolers": {
    slug: "bottle-coolers",
    title: "Bottle Cooler Repair & Gas Charging",
    category: "refrigeration",
    tagline: "Beverage chest coolers repairs and thermostatic controls.",
    description:
      "Chest style bottle coolers require fan motor repairs, thermostat adjustments, gas leaks patches, and starting relays swaps.",
    priceEstimate: "Starts from ₹650 + Spares",
    features: [
      "Thermostat replacement & tuning",
      "Starting relay & overload protector (OLP) swaps",
      "Capillary tube replacement & system flushing",
      "Hermetic compressor repairs",
    ],
    process: [
      "Inspecting condenser coil dust buildup",
      "Testing starting current and run values",
      "Patching refrigerant leaks and vacuum pulling",
      "Checking cut-in and cut-out temperatures",
    ],
    faqs: [
      {
        q: "Why is the bottle cooler compressor running continuously?",
        a: "This is typically caused by a failed thermostat, dirty condenser coils, or a slight refrigerant leak.",
      },
    ],
  },
  "display-counters": {
    slug: "display-counters",
    title: "Display Counter Repair & Defrosting",
    category: "refrigeration",
    tagline: "Sweet shops and cake display counter refrigeration repairs.",
    description:
      "Commercial display counters require static cooling coils maintenance, glass condensation heaters check, internal LED light circuit fixes, and thermostat calibrations.",
    priceEstimate: "Starts from ₹850 + Spares",
    features: [
      "Anti-sweat glass heaters repair",
      "Digital temperature probe replacements",
      "Evaporator fan blades replacement",
      "Static cooling coil repairs",
    ],
    process: [
      "Checking display temperature profile",
      "Testing heater strip continuity",
      "Cleaning compact bottom condenser units",
      "Checking refrigerant charge (R134a/R290)",
    ],
    faqs: [
      {
        q: "Why is the front glass of my pastry counter sweating?",
        a: "This happens when the glass heater circuit fails or the ambient humidity in the room is extremely high.",
      },
    ],
  },
  "water-coolers": {
    slug: "water-coolers",
    title: "Storage Water Coolers Servicing",
    category: "refrigeration",
    tagline: "Drinking water storage coolers cleaning and gas charging.",
    description:
      "Drinking water coolers in schools and offices require coil repairs, float valve adjustments, tap replacements, tank cleaning, and thermostat checkups.",
    priceEstimate: "Starts from ₹750 + Materials",
    features: [
      "Drinking water tank hygienic descaling",
      "Inlet float valve replacements",
      "Stainless steel body grounding check",
      "Thermostat adjustments",
    ],
    process: [
      "Isolating power and flushing the water tank",
      "Scrubbing tank walls and sanitizing",
      "Testing electrical insulation to prevent shocks",
      "Measuring compressor start parameters",
    ],
    faqs: [
      {
        q: "Why is the drinking water not cold enough?",
        a: "This is usually caused by heavy scale buildup on the copper coils inside the tank, or a faulty thermostat.",
      },
    ],
  },
  "deep-freezers": {
    slug: "deep-freezers",
    title: "Commercial Deep Freezer Servicing",
    category: "refrigeration",
    tagline: "Chest deep freezer repairs, compressor swaps, and capillary swaps.",
    description:
      "Chest deep freezers holding frozen foods require condenser fan motors replacement, hermetic compressor retrofits, capillary tube flushing, and body rust protection.",
    priceEstimate: "Starts from ₹850 + Spares",
    features: [
      "Hermetic compressor replacements",
      "Capillary tube flushing & liquid line drier swaps",
      "Condenser fan motor swaps",
      "Magnetic door gasket renewals",
    ],
    process: [
      "Testing compressor winding resistances",
      "Running pressure tests to detect internal leaks",
      "Replacing driers and pulling vacuums",
      "Charging refrigerant (R134a/R290) by weight",
    ],
    faqs: [
      {
        q: "Can we convert an older R12 freezer to R134a?",
        a: "Yes, but this requires flushing mineral oil, replacing it with POE oil, and changing the expansion capillary tube.",
      },
    ],
  },
  "commercial-refrigerators": {
    slug: "commercial-refrigerators",
    title: "Reach-in Commercial Refrigerators",
    category: "refrigeration",
    tagline: "Kitchen upright chiller and cabinet refrigeration repairs.",
    description:
      "We service vertical reach-in upright chillers and freezers in restaurant kitchens. We replace door hinges, fit digital controllers, swap fan blades, and service compact condensing units.",
    priceEstimate: "Starts from ₹950 + Spares",
    features: [
      "Upright kitchen refrigerator fan motor repair",
      "Heavy duty door hinge replacement",
      "Electronic temperature control board setup",
      "Condenser coil grease removal wash",
    ],
    process: [
      "Moving unit out to inspect condensing loop",
      "Degreasing condenser coils using alkaline washes",
      "Verifying door gaskets and self-closing hinges",
      "Re-charging refrigerant to nameplate spec",
    ],
    faqs: [
      {
        q: "Why is my commercial kitchen fridge running hot?",
        a: "Restaurant kitchens gather airborne cooking grease, which chokes condenser coils and blocks heat transfer.",
      },
    ],
  },

  // --- Industrial ---
  chillers: {
    slug: "chillers",
    title: "Industrial Process Chiller Maintenance",
    category: "industrial",
    tagline: "Water-cooled and air-cooled screw/scroll chiller overhauls.",
    description:
      "We provide comprehensive industrial chiller services. We overhaul screw and scroll compressors, descale shell and tube heat exchangers, optimize refrigerant levels, analyze compressor oil, and calibrate PLC control systems.",
    priceEstimate: "Custom / AMC Contracted",
    features: [
      "Scroll and screw compressor overhauls",
      "Shell and tube evaporator chemical descaling",
      "Compressor oil acidity and moisture analysis",
      "Microprocessor control board parameter configurations",
    ],
    process: [
      "Conducting compressor oil logging checks",
      "Descaling tube bundles with scale-remover chemicals",
      "Verifying high/low pressure switch parameters",
      "Testing refrigerant moisture levels through sight glass",
    ],
    faqs: [
      {
        q: "What causes a chiller low-pressure trip?",
        a: "This is typically caused by low refrigerant charge, poor water flow through the evaporator, or a fouled heat exchanger.",
      },
    ],
  },
  "cooling-towers": {
    slug: "cooling-towers",
    title: "Cooling Tower Overhauls & Cleaning",
    category: "industrial",
    tagline: "PVC fills replacements, fan shaft repairs, and water balancing.",
    description:
      "Maintain industrial heat rejection equipment. We replace fouled PVC fills, balance fan blades, repair gearboxes, replace sprinkler nozzles, and align fan drive shafts.",
    priceEstimate: "Custom Quote",
    features: [
      "Fouled PVC honeycomb fills replacement",
      "Bespoke sprinkler nozzle configuration",
      "Fan gearbox alignment and oil changes",
      "Drift eliminator installation",
    ],
    process: [
      "Pressure washing basin mud and biological growth",
      "Removing and replacing deteriorated PVC honeycombs",
      "Laser aligning fan shaft drive lines",
      "Calibrating auto-make up water valves",
    ],
    faqs: [
      {
        q: "Why is cooling tower approach temperature rising?",
        a: "This is caused by fouled PVC fills restricting heat transfer, or blocked nozzles causing dry zones on the fills.",
      },
    ],
  },
  "industrial-compressors": {
    slug: "industrial-compressors",
    title: "Heavy Compressor Rebuilds",
    category: "industrial",
    tagline: "Semi-hermetic and screw compressor cylinder overhauls.",
    description:
      "We rebuild high-capacity industrial compressors. We replace piston rings, hone cylinders, install new crankshaft bearings, change oil pumps, and test motor insulation windings.",
    priceEstimate: "Custom Quote",
    features: [
      "Crankshaft and main bearings replacement",
      "Valve plate and piston ring renewals",
      "Winding insulation megger test",
      "Crankcase heater element swaps",
    ],
    process: [
      "Draining lubricant oil and recovering gas charge",
      "Disassembling compressor head blocks",
      "Honing cylinders and checking clearances",
      "Re-assembling with new gaskets and charging new oil",
    ],
    faqs: [
      {
        q: "When does a compressor need rebuilding?",
        a: "When oil analysis shows high metal wear particles, compression ratio drops, or electrical insulation values drop.",
      },
    ],
  },
  "process-cooling": {
    slug: "process-cooling",
    title: "Factory Process Cooling Loops",
    category: "industrial",
    tagline: "Injection molding and chemical process line cooling repairs.",
    description:
      "Design and repair industrial cooling systems. We manage heat exchangers, sizing pumps, balancing multi-point cooling manifolds, and controlling line pressures.",
    priceEstimate: "Custom Site Quote",
    features: [
      "Plate heat exchangers (PHE) descaling",
      "VFD controlled secondary pump manifolds",
      "Line pressure regulating valves setup",
      "Closed loop cooling water treatment",
    ],
    process: [
      "Calculating thermal heat rejection load",
      "Installing modulating bypass valves",
      "Checking flow rates with ultrasonic meters",
      "Configuring automated failover control panels",
    ],
    faqs: [
      {
        q: "Why are injection molding cycles slowing down?",
        a: "Poor mold heat rejection due to scaled water lines or warm chiller water slows plastic cooling times.",
      },
    ],
  },
  "dairy-refrigeration": {
    slug: "dairy-refrigeration",
    title: "Dairy Chillers & Bulk Milk Coolers",
    category: "industrial",
    tagline: "BMC units maintenance, plate chillers, and milk cold rooms.",
    description:
      "Critical dairy refrigeration support. We maintain bulk milk coolers (BMC), plate heat exchangers, ice bank tanks (IBT), and cold storage rooms to protect fresh dairy products.",
    priceEstimate: "Custom Quote / 24/7 SLA",
    features: [
      "Agitator motor repairs",
      "Ice Bank Tank (IBT) evaporator coil maintenance",
      "Plate pasteurization cooling loop service",
      "Emergency backup generator control checks",
    ],
    process: [
      "Testing milk cooling rate targets (4°C in under 2 hours)",
      "Checking agitator paddle speed and gearbox",
      "Sanitizing chemical descaling of milk plates",
      "Inspecting safety thermal release valves",
    ],
    faqs: [
      {
        q: "Why must milk be cooled to 4°C rapidly?",
        a: "Rapid cooling stops bacterial growth, preserving quality and keeping raw milk within safety standards.",
      },
    ],
  },
  "pharma-refrigeration": {
    slug: "pharma-refrigeration",
    title: "Pharma Temperature Validation (2°C to 8°C)",
    category: "industrial",
    tagline: "Validated vaccine cold rooms, standby refrigeration, data logs.",
    description:
      "Highly regulated pharmaceutical cold rooms require N+1 backup systems, calibrated digital data loggers, automatic alarm switchers, and DQ/IQ/OQ/PQ validation audits.",
    priceEstimate: "Custom Validation Quote",
    features: [
      "Dual refrigeration unit automatic switchover panels",
      "FDA 21 CFR Part 11 compliant data logger setup",
      "IQ/OQ/PQ technical documentation audits",
      "Standby generator failover loops testing",
    ],
    process: [
      "Conducting multi-point thermal mapping test holds",
      "Testing automatic backup unit failover systems",
      "Calibrating system alarm sirens and phone notifications",
      "Compiling validation documentation",
    ],
    faqs: [
      {
        q: "What does IQ/OQ validation mean in pharma cold storage?",
        a: "Installation Qualification (IQ) and Operational Qualification (OQ) prove the system is installed and runs exactly to FDA/WHO safety standards.",
      },
    ],
  },
};
