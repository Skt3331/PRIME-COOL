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
}

export const servicesData: Record<string, ServiceDetail> = {
  // --- Residential ---
  "split-ac-repair": {
    slug: "split-ac-repair",
    title: "Split AC Repair & Servicing",
    category: "residential",
    tagline: "Precision diagnosis, jet cleaning, and component repair for split AC units.",
    description:
      "Our split AC repair services cover indoor evaporator maintenance, outdoor condenser fan repairs, PCB troubleshooting, leak detection, and gas recharging. We ensure optimal cooling efficiency with minimum noise levels.",
    priceEstimate: "Starts from ₹599 + Spares",
    features: [
      "High-pressure jet pump coil washing",
      "PCB repair and troubleshooting",
      "Compressor start capacitor replacement",
      "Refrigerant leak detection & gas charging (R32, R410A)",
    ],
    process: [
      "Visual and electrical safety checks of lines and coils",
      "Airflow temperature difference (Delta T) calculation",
      "Jet wash cleaning of filter and cooling coils",
      "Current draw and pressure check for optimal charge",
    ],
    faqs: [
      {
        q: "Why is my split AC blowing room-temperature air?",
        a: "This is usually caused by low refrigerant pressure, a blown compressor start capacitor, or blocked condenser coils.",
      },
      {
        q: "How often should I get my split AC jet-washed?",
        a: "Under Indian conditions, a deep jet-wash is recommended once before the summer peak and once mid-season.",
      },
    ],
  },
  "window-ac-repair": {
    slug: "window-ac-repair",
    title: "Window AC Repair & Installation",
    category: "residential",
    tagline: "Durable and efficient window AC unit diagnostics and overhaul.",
    description:
      "Window ACs are compact cooling powerhouses. We offer drum fan balance, condenser coil descaling, motor lubrication, and casing vibration sealing services.",
    priceEstimate: "Starts from ₹499 + Spares",
    features: [
      "Blower motor oiling and replacement",
      "Corrosion-resistant coil coating",
      "Casing vibration isolation pads fitting",
      "Refrigerant charging (R22, R32)",
    ],
    process: [
      "Unit pull-out and inspection",
      "Chemical foam wash for blocked condenser fins",
      "Air filter descaling",
      "Current load inspection",
    ],
    faqs: [
      {
        q: "Why is my window AC making rattling noises?",
        a: "This is often due to loose mounting brackets, worn blower motor bearings, or contact between copper capillary tubes.",
      },
    ],
  },
  "inverter-ac-repair": {
    slug: "inverter-ac-repair",
    title: "Inverter AC Diagnostic & Repair",
    category: "residential",
    tagline: "Advanced variable speed compressor and complex PCB diagnostics.",
    description:
      "Inverter ACs feature complex electronic control boards (PCBs) on both indoor and outdoor units. We specialize in error-code based diagnostics, sensor testing, and variable motor driver repairs.",
    priceEstimate: "Starts from ₹799 + Spares",
    features: [
      "PCB microprocessor repair and component replacement",
      "Thermistor and sensor calibration",
      "EEPROM reset and sensor error diagnostics",
      "DC fan motor repair",
    ],
    process: [
      "Diagnostic error-code lookup reading",
      "Voltage/current profiling on IPM modules",
      "Sensors resistance value verification",
      "Refrigerant pressure calibration under test mode",
    ],
    faqs: [
      {
        q: "What does 'E6' or 'F3' error mean on my inverter AC?",
        a: "These are error codes specifying communications faults between indoor/outdoor boards or discharge pipe sensor failures.",
      },
    ],
  },
  "portable-ac-repair": {
    slug: "portable-ac-repair",
    title: "Portable AC Repair & Exhaust Sizing",
    category: "residential",
    tagline: "Mobile spot cooling servicing and hose setup optimizations.",
    description:
      "We handle mobile air conditioner compressor diagnostics, internal water condensation tray drains, fan motor swaps, and high-efficiency exhaust hose sizing.",
    priceEstimate: "Starts from ₹699 + Spares",
    features: [
      "Exhaust duct hose replacements",
      "Internal water pump repair",
      "Condensate auto-evaporation check",
      "Compressor relays replacements",
    ],
    process: [
      "Dismantling body panels",
      "Cleaning internal double-evaporator coils",
      "Checking fan blower wheels",
      "Verifying float switch limits",
    ],
    faqs: [
      {
        q: "Why does my portable AC stop and display 'P1' / Full Water?",
        a: "If the auto-evaporator function fails or a drain line is clogged, the float switch halts the compressor to prevent leaks.",
      },
    ],
  },
  "tower-ac-repair": {
    slug: "tower-ac-repair",
    title: "Tower AC Sizing & Servicing",
    category: "residential",
    tagline: "High-capacity floor standing air conditioner servicing.",
    description:
      "Tower ACs are ideal for larger residential halls and conference spaces. We service high-volume fan wheels, heavy-duty compressors, and air sweep louvers.",
    priceEstimate: "Starts from ₹899 + Spares",
    features: [
      "Heavy-duty scroll compressor diagnostics",
      "Multi-directional swing motor repair",
      "High-CFM air throw optimization",
      "Drier filter replacements",
    ],
    process: [
      "High-pressure clean of large coil area",
      "Terminal wiring safety check",
      "Contactor contact points burn inspection",
      "Dynamic airflow volume check",
    ],
    faqs: [
      {
        q: "Can a Tower AC cool a 400 sq ft hall?",
        a: "Yes, standard 2.0 or 3.0 Ton tower ACs are highly optimized for high ceiling and wide open areas.",
      },
    ],
  },
  "cassette-ac-repair": {
    slug: "cassette-ac-repair",
    title: "Cassette AC Commissioning & Repair",
    category: "residential",
    tagline: "Ceiling-mounted unit filter drops, drain pumps, and servicing.",
    description:
      "We repair and maintain ceiling cassette AC units. Our technicians resolve drain pump overflows, clean 4-way louvers, replace PCB communication wires, and perform clean chemical wash downs without damaging office interiors.",
    priceEstimate: "Starts from ₹999 + Spares",
    features: [
      "Condensate lift drain pump repair & replacement",
      "360-degree round flow louver repair",
      "High-lift float switch calibration",
      "Jet washing using customized water hoods",
    ],
    process: [
      "Deploying safety drop-sheets",
      "Dismantling decorative louver panel",
      "Testing lift pump and flushing drain lines",
      "Coil chemical foaming and high pressure rinsing",
    ],
    faqs: [
      {
        q: "Why is water dripping from the ceiling near my cassette AC?",
        a: "This is usually caused by a failed condensate lift pump or a clogged overhead drain line forcing the tray to overflow.",
      },
    ],
  },

  // --- Commercial ---
  "vrf-systems": {
    slug: "vrf-systems",
    title: "VRF (Variable Refrigerant Flow) Systems",
    category: "commercial",
    tagline: "Multi-split VRF troubleshooting, branch selector box repairs, and zoning.",
    description:
      "Variable Refrigerant Flow (VRF) systems provide localized zoning comfort for hotels and offices. We specialize in diagnostic software check-ups, electronic expansion valve (EEV) calibration, branch selector box troubleshooting, and inverter compressor replacements.",
    priceEstimate: "Custom Quote / SLA Contracted",
    features: [
      "Inverter inverter drive module diagnosis",
      "Branch selector (BS) solenoid valves replacement",
      "Refnet joint leak check with pressure holds",
      "OEM control system integration (BACnet/Modbus)",
    ],
    process: [
      "Plugging in system monitoring tool (service software)",
      "Checking compressor discharge superheat values",
      "Reading electronic expansion valve pulse rates",
      "Verifying multi-unit zoning thermostat communication",
    ],
    faqs: [
      {
        q: "What is the difference between VRF and VRV?",
        a: "VRV (Variable Refrigerant Volume) is Daikin's trademarked name, while VRF is the general engineering term for this multi-split HVAC technology.",
      },
    ],
  },
  "vrv-systems": {
    slug: "vrv-systems",
    title: "VRV (Variable Refrigerant Volume) Diagnostics",
    category: "commercial",
    tagline: "Premium Daikin VRV maintenance, oil-retrieval cycles and controls.",
    description:
      "Authorized style support for Daikin VRV platforms. We replace compressor scroll heads, debug transmission code 'U4' errors, balance oil returns, and run scheduled preventative maintenance audits.",
    priceEstimate: "Custom Quote / AMC",
    features: [
      "Transmission line diagnostics",
      "Oil level equalization circuit calibration",
      "EEV pulse coils replacement",
      "Zero-downtime preventative cycles",
    ],
    process: [
      "Isolating system power",
      "Reading system diagnostic registers for history faults",
      "Checking compressor oil acidity levels",
      "Dynamic pressure testing of liquid lines",
    ],
    faqs: [
      {
        q: "What causes a VRV system 'U4' error code?",
        a: "A 'U4' error indicates a communication failure between the outdoor and indoor units, often due to loose wiring or fried transceiver chips.",
      },
    ],
  },
  ahu: {
    slug: "ahu",
    title: "Air Handling Unit (AHU) Overhauls",
    category: "commercial",
    tagline: "Belt alignments, motor replacements, and filter bank upgrades.",
    description:
      "AHUs are the heart of commercial air distribution. We offer blower wheel dynamic balancing, pulley replacement, V-belt alignment, actuator check-ups, and HEPA filter bank installations.",
    priceEstimate: "Starts from ₹2,500 + Materials",
    features: [
      "Dynamic blower fan balancing",
      "V-belt tensioning & laser pulley alignment",
      "Chilled water modulating valve actuator repair",
      "MERV & HEPA filter replacement",
    ],
    process: [
      "Isolating main breaker panel and applying lockouts",
      "Cleaning internal fan sections and cooling coil faces",
      "Inspecting drain pan slope and clearing algae blockages",
      "Checking static pressure across filter banks",
    ],
    faqs: [
      {
        q: "Why is our AHU blowing less air than designed?",
        a: "Typically, this is caused by slipped/worn blower belts, choked air filters, or incorrect VFD frequency settings.",
      },
    ],
  },
  fcu: {
    slug: "fcu",
    title: "Fan Coil Unit (FCU) Maintenance",
    category: "commercial",
    tagline: "Compact ceiling fan coil unit descaling and thermostat checks.",
    description:
      "Chilled water or DX FCUs require periodic coil descaling, condensate line flush, blower motor replacement, and thermostat wiring repairs.",
    priceEstimate: "Starts from ₹890 + Spares",
    features: [
      "Chilled water coil descaling",
      "3-speed blower motor diagnostics",
      "Thermostatic valve inspections",
      "Drip tray biological descaling",
    ],
    process: [
      "Removing ceiling access panel",
      "Cleaning direct expansion or chilled water coils",
      "Flushing the gravity drain line",
      "Testing three-speed motor control contacts",
    ],
    faqs: [
      {
        q: "Why is office FCU filters need cleaning?",
        a: "Every 4 to 6 weeks, as they trap high amounts of indoor dust and lint in commercial spaces.",
      },
    ],
  },
  "package-units": {
    slug: "package-units",
    title: "Rooftop Package Units Repair",
    category: "commercial",
    tagline: "All-in-one commercial HVAC units servicing and gas recharging.",
    description:
      "Package units housing both compressor and air flow blower systems on rooftops require specialized weatherproofing, damper checkups, contactor renewals, and refrigerant recharges.",
    priceEstimate: "Starts from ₹2,500 + Spares",
    features: [
      "Commercial scroll compressor replacements",
      "Economizer damper actuator calibration",
      "Weatherproof control panel updates",
      "Dual condenser fan motor overhauls",
    ],
    process: [
      "Opening weather-sealed access panels",
      "Checking electrical phase balance and contactor surfaces",
      "Measuring superheat on thermostatic expansion valves (TXV)",
      "Coil jet-wash descaling",
    ],
    faqs: [
      {
        q: "Why do package units fail in hot summers?",
        a: "High ambient heat causes condenser high-pressure trip out if coils are choked with dust or condenser fan motors fail.",
      },
    ],
  },
  "ductable-ac": {
    slug: "ductable-ac",
    title: "Ductable AC Design & Installation",
    category: "commercial",
    tagline: "Custom duct layouts, volume control damper installation, and repairs.",
    description:
      "We install and repair ducted split AC systems, including sheet metal/pre-insulated duct routing, diffuser layout engineering, and refrigerant piping runs.",
    priceEstimate: "Custom Site Quote",
    features: [
      "Pre-insulated duct layout drafting",
      "Volume control dampers (VCD) fitting",
      "Vibration isolators installation",
      "Acoustic lining for silent operation",
    ],
    process: [
      "Load estimation calculations using BTU tables",
      "Duct static pressure sizing calculations",
      "Installing supply and return grilles",
      "Commissioning system and air balancing",
    ],
    faqs: [
      {
        q: "What is the benefit of ductable AC over split AC?",
        a: "Ductable systems distribute air uniformly across large areas and maintain premium aesthetics by concealing equipment.",
      },
    ],
  },
  "precision-ac": {
    slug: "precision-ac",
    title: "Precision AC (PAC) SLA Maintenance",
    category: "commercial",
    tagline: "Close control climate systems for laboratories and critical spaces.",
    description:
      "Precision ACs manage both temperature and humidity within tight tolerances. We calibrate electrode humidifiers, check reheat coils, inspect backward-curved EC fans, and support quick-response contracts.",
    priceEstimate: "SLA / AMC",
    features: [
      "Electrode steam humidifier cylinder servicing",
      "Electrical staging heaters inspection",
      "EC fan motor control setup",
      "Microprocessor control board calibrations",
    ],
    process: [
      "Verifying relative humidity (RH) sensor calibration",
      "Checking reheat element contactor current draw",
      "Inspecting cooling circuit expansion valves",
      "Testing alarm communications to central NOC/BMS",
    ],
    faqs: [
      {
        q: "Why is precision cooling needed in labs?",
        a: "Standard ACs allow temperature swings of 2-3°C and cannot control humidity, which compromises sensitive scientific calibrations.",
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
