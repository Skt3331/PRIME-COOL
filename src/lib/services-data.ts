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
  "pcb-voltas-smps-switch-mode-power-supply-15v-rail-repair-1": {
    slug: "pcb-voltas-smps-switch-mode-power-supply-15v-rail-repair-1",
    title: "Voltas Inverter AC PCB: SMPS Switch-Mode Power Supply 15V Rail Repair #1",
    category: "industrial",
    tagline:
      "Precision component-level electronics repair for Voltas inverter AC & VRF mainboards.",
    description:
      "Professional PCB electronics repair for Voltas inverter air conditioners. Includes smps switch-mode power supply 15v rail repair, oscilloscope signal analysis, SMD diode replacement, and high-voltage capacitor testing.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "Component-level SMD IC and diode replacement",
      "Thermal compound repasting & heatsink cleaning",
      "24-Hour continuous load bench testing",
    ],
    process: [
      "Diagnostic isolation of high voltage DC bus vs low voltage logic rail",
      "Component desoldering using ESD-safe rework station",
      "Replacement with OEM rated capacitors and IGBT modules",
      "Coating mainboard with conformal moisture isolation resin",
    ],
    faqs: [
      {
        q: "Can a burnt Voltas PCB be repaired instead of replaced?",
        a: "Yes! Over 90% of inverter PCB failures are caused by burnt SMPS diodes or IPM modules which can be repaired at a fraction of mainboard replacement cost.",
      },
    ],
    seoTitle:
      "Voltas Inverter AC PCB: SMPS Switch-Mode Power Supply 15V Rail Repair #1 | Prime Cool",
    seoDesc:
      "Component-level repair for Voltas inverter AC PCBs in Pune & MIDC industrial parks. Specialist in SMPS Switch-Mode Power Supply 15V Rail Repair.",
  },
  "pcb-blue-star-optocoupler-communication-loop-refurbishment-2": {
    slug: "pcb-blue-star-optocoupler-communication-loop-refurbishment-2",
    title: "Blue Star Inverter AC PCB: Optocoupler Communication Loop Refurbishment #2",
    category: "industrial",
    tagline:
      "Precision component-level electronics repair for Blue Star inverter AC & VRF mainboards.",
    description:
      "Professional PCB electronics repair for Blue Star inverter air conditioners. Includes optocoupler communication loop refurbishment, oscilloscope signal analysis, SMD diode replacement, and high-voltage capacitor testing.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "Component-level SMD IC and diode replacement",
      "Thermal compound repasting & heatsink cleaning",
      "24-Hour continuous load bench testing",
    ],
    process: [
      "Diagnostic isolation of high voltage DC bus vs low voltage logic rail",
      "Component desoldering using ESD-safe rework station",
      "Replacement with OEM rated capacitors and IGBT modules",
      "Coating mainboard with conformal moisture isolation resin",
    ],
    faqs: [
      {
        q: "Can a burnt Blue Star PCB be repaired instead of replaced?",
        a: "Yes! Over 90% of inverter PCB failures are caused by burnt SMPS diodes or IPM modules which can be repaired at a fraction of mainboard replacement cost.",
      },
    ],
    seoTitle:
      "Blue Star Inverter AC PCB: Optocoupler Communication Loop Refurbishment #2 | Prime Cool",
    seoDesc:
      "Component-level repair for Blue Star inverter AC PCBs in Pune & MIDC industrial parks. Specialist in Optocoupler Communication Loop Refurbishment.",
  },
  "pcb-lg-microcontroller-eeprom-data-flashing---tuning-3": {
    slug: "pcb-lg-microcontroller-eeprom-data-flashing---tuning-3",
    title: "LG Inverter AC PCB: Microcontroller EEPROM Data Flashing & Tuning #3",
    category: "industrial",
    tagline: "Precision component-level electronics repair for LG inverter AC & VRF mainboards.",
    description:
      "Professional PCB electronics repair for LG inverter air conditioners. Includes microcontroller eeprom data flashing & tuning, oscilloscope signal analysis, SMD diode replacement, and high-voltage capacitor testing.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "Component-level SMD IC and diode replacement",
      "Thermal compound repasting & heatsink cleaning",
      "24-Hour continuous load bench testing",
    ],
    process: [
      "Diagnostic isolation of high voltage DC bus vs low voltage logic rail",
      "Component desoldering using ESD-safe rework station",
      "Replacement with OEM rated capacitors and IGBT modules",
      "Coating mainboard with conformal moisture isolation resin",
    ],
    faqs: [
      {
        q: "Can a burnt LG PCB be repaired instead of replaced?",
        a: "Yes! Over 90% of inverter PCB failures are caused by burnt SMPS diodes or IPM modules which can be repaired at a fraction of mainboard replacement cost.",
      },
    ],
    seoTitle: "LG Inverter AC PCB: Microcontroller EEPROM Data Flashing & Tuning #3 | Prime Cool",
    seoDesc:
      "Component-level repair for LG inverter AC PCBs in Pune & MIDC industrial parks. Specialist in Microcontroller EEPROM Data Flashing & Tuning.",
  },
  "pcb-hitachi-current-sensing-shunt-resistor-calibration-4": {
    slug: "pcb-hitachi-current-sensing-shunt-resistor-calibration-4",
    title: "Hitachi Inverter AC PCB: Current Sensing Shunt Resistor Calibration #4",
    category: "industrial",
    tagline:
      "Precision component-level electronics repair for Hitachi inverter AC & VRF mainboards.",
    description:
      "Professional PCB electronics repair for Hitachi inverter air conditioners. Includes current sensing shunt resistor calibration, oscilloscope signal analysis, SMD diode replacement, and high-voltage capacitor testing.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "Component-level SMD IC and diode replacement",
      "Thermal compound repasting & heatsink cleaning",
      "24-Hour continuous load bench testing",
    ],
    process: [
      "Diagnostic isolation of high voltage DC bus vs low voltage logic rail",
      "Component desoldering using ESD-safe rework station",
      "Replacement with OEM rated capacitors and IGBT modules",
      "Coating mainboard with conformal moisture isolation resin",
    ],
    faqs: [
      {
        q: "Can a burnt Hitachi PCB be repaired instead of replaced?",
        a: "Yes! Over 90% of inverter PCB failures are caused by burnt SMPS diodes or IPM modules which can be repaired at a fraction of mainboard replacement cost.",
      },
    ],
    seoTitle: "Hitachi Inverter AC PCB: Current Sensing Shunt Resistor Calibration #4 | Prime Cool",
    seoDesc:
      "Component-level repair for Hitachi inverter AC PCBs in Pune & MIDC industrial parks. Specialist in Current Sensing Shunt Resistor Calibration.",
  },
  "pcb-carrier-bldc-condenser-fan-motor-driver-ic-repair-5": {
    slug: "pcb-carrier-bldc-condenser-fan-motor-driver-ic-repair-5",
    title: "Carrier Inverter AC PCB: BLDC Condenser Fan Motor Driver IC Repair #5",
    category: "industrial",
    tagline:
      "Precision component-level electronics repair for Carrier inverter AC & VRF mainboards.",
    description:
      "Professional PCB electronics repair for Carrier inverter air conditioners. Includes bldc condenser fan motor driver ic repair, oscilloscope signal analysis, SMD diode replacement, and high-voltage capacitor testing.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "Component-level SMD IC and diode replacement",
      "Thermal compound repasting & heatsink cleaning",
      "24-Hour continuous load bench testing",
    ],
    process: [
      "Diagnostic isolation of high voltage DC bus vs low voltage logic rail",
      "Component desoldering using ESD-safe rework station",
      "Replacement with OEM rated capacitors and IGBT modules",
      "Coating mainboard with conformal moisture isolation resin",
    ],
    faqs: [
      {
        q: "Can a burnt Carrier PCB be repaired instead of replaced?",
        a: "Yes! Over 90% of inverter PCB failures are caused by burnt SMPS diodes or IPM modules which can be repaired at a fraction of mainboard replacement cost.",
      },
    ],
    seoTitle: "Carrier Inverter AC PCB: BLDC Condenser Fan Motor Driver IC Repair #5 | Prime Cool",
    seoDesc:
      "Component-level repair for Carrier inverter AC PCBs in Pune & MIDC industrial parks. Specialist in BLDC Condenser Fan Motor Driver IC Repair.",
  },
  "pcb-panasonic-dc-bus-high-voltage-capacitor-refurbishment-6": {
    slug: "pcb-panasonic-dc-bus-high-voltage-capacitor-refurbishment-6",
    title: "Panasonic Inverter AC PCB: DC Bus High Voltage Capacitor Refurbishment #6",
    category: "industrial",
    tagline:
      "Precision component-level electronics repair for Panasonic inverter AC & VRF mainboards.",
    description:
      "Professional PCB electronics repair for Panasonic inverter air conditioners. Includes dc bus high voltage capacitor refurbishment, oscilloscope signal analysis, SMD diode replacement, and high-voltage capacitor testing.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "Component-level SMD IC and diode replacement",
      "Thermal compound repasting & heatsink cleaning",
      "24-Hour continuous load bench testing",
    ],
    process: [
      "Diagnostic isolation of high voltage DC bus vs low voltage logic rail",
      "Component desoldering using ESD-safe rework station",
      "Replacement with OEM rated capacitors and IGBT modules",
      "Coating mainboard with conformal moisture isolation resin",
    ],
    faqs: [
      {
        q: "Can a burnt Panasonic PCB be repaired instead of replaced?",
        a: "Yes! Over 90% of inverter PCB failures are caused by burnt SMPS diodes or IPM modules which can be repaired at a fraction of mainboard replacement cost.",
      },
    ],
    seoTitle:
      "Panasonic Inverter AC PCB: DC Bus High Voltage Capacitor Refurbishment #6 | Prime Cool",
    seoDesc:
      "Component-level repair for Panasonic inverter AC PCBs in Pune & MIDC industrial parks. Specialist in DC Bus High Voltage Capacitor Refurbishment.",
  },
  "pcb-godrej-inverter-drive-phase-voltage-unbalance-fix-7": {
    slug: "pcb-godrej-inverter-drive-phase-voltage-unbalance-fix-7",
    title: "Godrej Inverter AC PCB: Inverter Drive Phase Voltage Unbalance Fix #7",
    category: "industrial",
    tagline:
      "Precision component-level electronics repair for Godrej inverter AC & VRF mainboards.",
    description:
      "Professional PCB electronics repair for Godrej inverter air conditioners. Includes inverter drive phase voltage unbalance fix, oscilloscope signal analysis, SMD diode replacement, and high-voltage capacitor testing.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "Component-level SMD IC and diode replacement",
      "Thermal compound repasting & heatsink cleaning",
      "24-Hour continuous load bench testing",
    ],
    process: [
      "Diagnostic isolation of high voltage DC bus vs low voltage logic rail",
      "Component desoldering using ESD-safe rework station",
      "Replacement with OEM rated capacitors and IGBT modules",
      "Coating mainboard with conformal moisture isolation resin",
    ],
    faqs: [
      {
        q: "Can a burnt Godrej PCB be repaired instead of replaced?",
        a: "Yes! Over 90% of inverter PCB failures are caused by burnt SMPS diodes or IPM modules which can be repaired at a fraction of mainboard replacement cost.",
      },
    ],
    seoTitle: "Godrej Inverter AC PCB: Inverter Drive Phase Voltage Unbalance Fix #7 | Prime Cool",
    seoDesc:
      "Component-level repair for Godrej inverter AC PCBs in Pune & MIDC industrial parks. Specialist in Inverter Drive Phase Voltage Unbalance Fix.",
  },
  "pcb-o-general-pcb-heatsink-compound-repasting---descaling-8": {
    slug: "pcb-o-general-pcb-heatsink-compound-repasting---descaling-8",
    title: "O General Inverter AC PCB: PCB Heatsink Compound Repasting & Descaling #8",
    category: "industrial",
    tagline:
      "Precision component-level electronics repair for O General inverter AC & VRF mainboards.",
    description:
      "Professional PCB electronics repair for O General inverter air conditioners. Includes pcb heatsink compound repasting & descaling, oscilloscope signal analysis, SMD diode replacement, and high-voltage capacitor testing.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "Component-level SMD IC and diode replacement",
      "Thermal compound repasting & heatsink cleaning",
      "24-Hour continuous load bench testing",
    ],
    process: [
      "Diagnostic isolation of high voltage DC bus vs low voltage logic rail",
      "Component desoldering using ESD-safe rework station",
      "Replacement with OEM rated capacitors and IGBT modules",
      "Coating mainboard with conformal moisture isolation resin",
    ],
    faqs: [
      {
        q: "Can a burnt O General PCB be repaired instead of replaced?",
        a: "Yes! Over 90% of inverter PCB failures are caused by burnt SMPS diodes or IPM modules which can be repaired at a fraction of mainboard replacement cost.",
      },
    ],
    seoTitle:
      "O General Inverter AC PCB: PCB Heatsink Compound Repasting & Descaling #8 | Prime Cool",
    seoDesc:
      "Component-level repair for O General inverter AC PCBs in Pune & MIDC industrial parks. Specialist in PCB Heatsink Compound Repasting & Descaling.",
  },
  "pcb-mitsubishi-surge-varistor-mov-overvoltage-protection-fix-9": {
    slug: "pcb-mitsubishi-surge-varistor-mov-overvoltage-protection-fix-9",
    title: "Mitsubishi Inverter AC PCB: Surge Varistor MOV Overvoltage Protection Fix #9",
    category: "industrial",
    tagline:
      "Precision component-level electronics repair for Mitsubishi inverter AC & VRF mainboards.",
    description:
      "Professional PCB electronics repair for Mitsubishi inverter air conditioners. Includes surge varistor mov overvoltage protection fix, oscilloscope signal analysis, SMD diode replacement, and high-voltage capacitor testing.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "Component-level SMD IC and diode replacement",
      "Thermal compound repasting & heatsink cleaning",
      "24-Hour continuous load bench testing",
    ],
    process: [
      "Diagnostic isolation of high voltage DC bus vs low voltage logic rail",
      "Component desoldering using ESD-safe rework station",
      "Replacement with OEM rated capacitors and IGBT modules",
      "Coating mainboard with conformal moisture isolation resin",
    ],
    faqs: [
      {
        q: "Can a burnt Mitsubishi PCB be repaired instead of replaced?",
        a: "Yes! Over 90% of inverter PCB failures are caused by burnt SMPS diodes or IPM modules which can be repaired at a fraction of mainboard replacement cost.",
      },
    ],
    seoTitle:
      "Mitsubishi Inverter AC PCB: Surge Varistor MOV Overvoltage Protection Fix #9 | Prime Cool",
    seoDesc:
      "Component-level repair for Mitsubishi inverter AC PCBs in Pune & MIDC industrial parks. Specialist in Surge Varistor MOV Overvoltage Protection Fix.",
  },
  "pcb-danfoss-ipm-module-igbt-transistor-switching-repair-10": {
    slug: "pcb-danfoss-ipm-module-igbt-transistor-switching-repair-10",
    title: "Danfoss Inverter AC PCB: IPM Module IGBT Transistor Switching Repair #10",
    category: "industrial",
    tagline:
      "Precision component-level electronics repair for Danfoss inverter AC & VRF mainboards.",
    description:
      "Professional PCB electronics repair for Danfoss inverter air conditioners. Includes ipm module igbt transistor switching repair, oscilloscope signal analysis, SMD diode replacement, and high-voltage capacitor testing.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "Component-level SMD IC and diode replacement",
      "Thermal compound repasting & heatsink cleaning",
      "24-Hour continuous load bench testing",
    ],
    process: [
      "Diagnostic isolation of high voltage DC bus vs low voltage logic rail",
      "Component desoldering using ESD-safe rework station",
      "Replacement with OEM rated capacitors and IGBT modules",
      "Coating mainboard with conformal moisture isolation resin",
    ],
    faqs: [
      {
        q: "Can a burnt Danfoss PCB be repaired instead of replaced?",
        a: "Yes! Over 90% of inverter PCB failures are caused by burnt SMPS diodes or IPM modules which can be repaired at a fraction of mainboard replacement cost.",
      },
    ],
    seoTitle:
      "Danfoss Inverter AC PCB: IPM Module IGBT Transistor Switching Repair #10 | Prime Cool",
    seoDesc:
      "Component-level repair for Danfoss inverter AC PCBs in Pune & MIDC industrial parks. Specialist in IPM Module IGBT Transistor Switching Repair.",
  },
  "pcb-abb-smps-switch-mode-power-supply-15v-rail-repair-11": {
    slug: "pcb-abb-smps-switch-mode-power-supply-15v-rail-repair-11",
    title: "ABB Inverter AC PCB: SMPS Switch-Mode Power Supply 15V Rail Repair #11",
    category: "industrial",
    tagline: "Precision component-level electronics repair for ABB inverter AC & VRF mainboards.",
    description:
      "Professional PCB electronics repair for ABB inverter air conditioners. Includes smps switch-mode power supply 15v rail repair, oscilloscope signal analysis, SMD diode replacement, and high-voltage capacitor testing.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "Component-level SMD IC and diode replacement",
      "Thermal compound repasting & heatsink cleaning",
      "24-Hour continuous load bench testing",
    ],
    process: [
      "Diagnostic isolation of high voltage DC bus vs low voltage logic rail",
      "Component desoldering using ESD-safe rework station",
      "Replacement with OEM rated capacitors and IGBT modules",
      "Coating mainboard with conformal moisture isolation resin",
    ],
    faqs: [
      {
        q: "Can a burnt ABB PCB be repaired instead of replaced?",
        a: "Yes! Over 90% of inverter PCB failures are caused by burnt SMPS diodes or IPM modules which can be repaired at a fraction of mainboard replacement cost.",
      },
    ],
    seoTitle: "ABB Inverter AC PCB: SMPS Switch-Mode Power Supply 15V Rail Repair #11 | Prime Cool",
    seoDesc:
      "Component-level repair for ABB inverter AC PCBs in Pune & MIDC industrial parks. Specialist in SMPS Switch-Mode Power Supply 15V Rail Repair.",
  },
  "pcb-schneider-optocoupler-communication-loop-refurbishment-12": {
    slug: "pcb-schneider-optocoupler-communication-loop-refurbishment-12",
    title: "Schneider Inverter AC PCB: Optocoupler Communication Loop Refurbishment #12",
    category: "industrial",
    tagline:
      "Precision component-level electronics repair for Schneider inverter AC & VRF mainboards.",
    description:
      "Professional PCB electronics repair for Schneider inverter air conditioners. Includes optocoupler communication loop refurbishment, oscilloscope signal analysis, SMD diode replacement, and high-voltage capacitor testing.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "Component-level SMD IC and diode replacement",
      "Thermal compound repasting & heatsink cleaning",
      "24-Hour continuous load bench testing",
    ],
    process: [
      "Diagnostic isolation of high voltage DC bus vs low voltage logic rail",
      "Component desoldering using ESD-safe rework station",
      "Replacement with OEM rated capacitors and IGBT modules",
      "Coating mainboard with conformal moisture isolation resin",
    ],
    faqs: [
      {
        q: "Can a burnt Schneider PCB be repaired instead of replaced?",
        a: "Yes! Over 90% of inverter PCB failures are caused by burnt SMPS diodes or IPM modules which can be repaired at a fraction of mainboard replacement cost.",
      },
    ],
    seoTitle:
      "Schneider Inverter AC PCB: Optocoupler Communication Loop Refurbishment #12 | Prime Cool",
    seoDesc:
      "Component-level repair for Schneider inverter AC PCBs in Pune & MIDC industrial parks. Specialist in Optocoupler Communication Loop Refurbishment.",
  },
  "pcb-siemens-microcontroller-eeprom-data-flashing---tuning-13": {
    slug: "pcb-siemens-microcontroller-eeprom-data-flashing---tuning-13",
    title: "Siemens Inverter AC PCB: Microcontroller EEPROM Data Flashing & Tuning #13",
    category: "industrial",
    tagline:
      "Precision component-level electronics repair for Siemens inverter AC & VRF mainboards.",
    description:
      "Professional PCB electronics repair for Siemens inverter air conditioners. Includes microcontroller eeprom data flashing & tuning, oscilloscope signal analysis, SMD diode replacement, and high-voltage capacitor testing.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "Component-level SMD IC and diode replacement",
      "Thermal compound repasting & heatsink cleaning",
      "24-Hour continuous load bench testing",
    ],
    process: [
      "Diagnostic isolation of high voltage DC bus vs low voltage logic rail",
      "Component desoldering using ESD-safe rework station",
      "Replacement with OEM rated capacitors and IGBT modules",
      "Coating mainboard with conformal moisture isolation resin",
    ],
    faqs: [
      {
        q: "Can a burnt Siemens PCB be repaired instead of replaced?",
        a: "Yes! Over 90% of inverter PCB failures are caused by burnt SMPS diodes or IPM modules which can be repaired at a fraction of mainboard replacement cost.",
      },
    ],
    seoTitle:
      "Siemens Inverter AC PCB: Microcontroller EEPROM Data Flashing & Tuning #13 | Prime Cool",
    seoDesc:
      "Component-level repair for Siemens inverter AC PCBs in Pune & MIDC industrial parks. Specialist in Microcontroller EEPROM Data Flashing & Tuning.",
  },
  "pcb-yaskawa-current-sensing-shunt-resistor-calibration-14": {
    slug: "pcb-yaskawa-current-sensing-shunt-resistor-calibration-14",
    title: "Yaskawa Inverter AC PCB: Current Sensing Shunt Resistor Calibration #14",
    category: "industrial",
    tagline:
      "Precision component-level electronics repair for Yaskawa inverter AC & VRF mainboards.",
    description:
      "Professional PCB electronics repair for Yaskawa inverter air conditioners. Includes current sensing shunt resistor calibration, oscilloscope signal analysis, SMD diode replacement, and high-voltage capacitor testing.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "Component-level SMD IC and diode replacement",
      "Thermal compound repasting & heatsink cleaning",
      "24-Hour continuous load bench testing",
    ],
    process: [
      "Diagnostic isolation of high voltage DC bus vs low voltage logic rail",
      "Component desoldering using ESD-safe rework station",
      "Replacement with OEM rated capacitors and IGBT modules",
      "Coating mainboard with conformal moisture isolation resin",
    ],
    faqs: [
      {
        q: "Can a burnt Yaskawa PCB be repaired instead of replaced?",
        a: "Yes! Over 90% of inverter PCB failures are caused by burnt SMPS diodes or IPM modules which can be repaired at a fraction of mainboard replacement cost.",
      },
    ],
    seoTitle:
      "Yaskawa Inverter AC PCB: Current Sensing Shunt Resistor Calibration #14 | Prime Cool",
    seoDesc:
      "Component-level repair for Yaskawa inverter AC PCBs in Pune & MIDC industrial parks. Specialist in Current Sensing Shunt Resistor Calibration.",
  },
  "pcb-daikin-bldc-condenser-fan-motor-driver-ic-repair-15": {
    slug: "pcb-daikin-bldc-condenser-fan-motor-driver-ic-repair-15",
    title: "Daikin Inverter AC PCB: BLDC Condenser Fan Motor Driver IC Repair #15",
    category: "industrial",
    tagline:
      "Precision component-level electronics repair for Daikin inverter AC & VRF mainboards.",
    description:
      "Professional PCB electronics repair for Daikin inverter air conditioners. Includes bldc condenser fan motor driver ic repair, oscilloscope signal analysis, SMD diode replacement, and high-voltage capacitor testing.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "Component-level SMD IC and diode replacement",
      "Thermal compound repasting & heatsink cleaning",
      "24-Hour continuous load bench testing",
    ],
    process: [
      "Diagnostic isolation of high voltage DC bus vs low voltage logic rail",
      "Component desoldering using ESD-safe rework station",
      "Replacement with OEM rated capacitors and IGBT modules",
      "Coating mainboard with conformal moisture isolation resin",
    ],
    faqs: [
      {
        q: "Can a burnt Daikin PCB be repaired instead of replaced?",
        a: "Yes! Over 90% of inverter PCB failures are caused by burnt SMPS diodes or IPM modules which can be repaired at a fraction of mainboard replacement cost.",
      },
    ],
    seoTitle: "Daikin Inverter AC PCB: BLDC Condenser Fan Motor Driver IC Repair #15 | Prime Cool",
    seoDesc:
      "Component-level repair for Daikin inverter AC PCBs in Pune & MIDC industrial parks. Specialist in BLDC Condenser Fan Motor Driver IC Repair.",
  },
  "pcb-voltas-dc-bus-high-voltage-capacitor-refurbishment-16": {
    slug: "pcb-voltas-dc-bus-high-voltage-capacitor-refurbishment-16",
    title: "Voltas Inverter AC PCB: DC Bus High Voltage Capacitor Refurbishment #16",
    category: "industrial",
    tagline:
      "Precision component-level electronics repair for Voltas inverter AC & VRF mainboards.",
    description:
      "Professional PCB electronics repair for Voltas inverter air conditioners. Includes dc bus high voltage capacitor refurbishment, oscilloscope signal analysis, SMD diode replacement, and high-voltage capacitor testing.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "Component-level SMD IC and diode replacement",
      "Thermal compound repasting & heatsink cleaning",
      "24-Hour continuous load bench testing",
    ],
    process: [
      "Diagnostic isolation of high voltage DC bus vs low voltage logic rail",
      "Component desoldering using ESD-safe rework station",
      "Replacement with OEM rated capacitors and IGBT modules",
      "Coating mainboard with conformal moisture isolation resin",
    ],
    faqs: [
      {
        q: "Can a burnt Voltas PCB be repaired instead of replaced?",
        a: "Yes! Over 90% of inverter PCB failures are caused by burnt SMPS diodes or IPM modules which can be repaired at a fraction of mainboard replacement cost.",
      },
    ],
    seoTitle:
      "Voltas Inverter AC PCB: DC Bus High Voltage Capacitor Refurbishment #16 | Prime Cool",
    seoDesc:
      "Component-level repair for Voltas inverter AC PCBs in Pune & MIDC industrial parks. Specialist in DC Bus High Voltage Capacitor Refurbishment.",
  },
  "pcb-blue-star-inverter-drive-phase-voltage-unbalance-fix-17": {
    slug: "pcb-blue-star-inverter-drive-phase-voltage-unbalance-fix-17",
    title: "Blue Star Inverter AC PCB: Inverter Drive Phase Voltage Unbalance Fix #17",
    category: "industrial",
    tagline:
      "Precision component-level electronics repair for Blue Star inverter AC & VRF mainboards.",
    description:
      "Professional PCB electronics repair for Blue Star inverter air conditioners. Includes inverter drive phase voltage unbalance fix, oscilloscope signal analysis, SMD diode replacement, and high-voltage capacitor testing.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "Component-level SMD IC and diode replacement",
      "Thermal compound repasting & heatsink cleaning",
      "24-Hour continuous load bench testing",
    ],
    process: [
      "Diagnostic isolation of high voltage DC bus vs low voltage logic rail",
      "Component desoldering using ESD-safe rework station",
      "Replacement with OEM rated capacitors and IGBT modules",
      "Coating mainboard with conformal moisture isolation resin",
    ],
    faqs: [
      {
        q: "Can a burnt Blue Star PCB be repaired instead of replaced?",
        a: "Yes! Over 90% of inverter PCB failures are caused by burnt SMPS diodes or IPM modules which can be repaired at a fraction of mainboard replacement cost.",
      },
    ],
    seoTitle:
      "Blue Star Inverter AC PCB: Inverter Drive Phase Voltage Unbalance Fix #17 | Prime Cool",
    seoDesc:
      "Component-level repair for Blue Star inverter AC PCBs in Pune & MIDC industrial parks. Specialist in Inverter Drive Phase Voltage Unbalance Fix.",
  },
  "pcb-lg-pcb-heatsink-compound-repasting---descaling-18": {
    slug: "pcb-lg-pcb-heatsink-compound-repasting---descaling-18",
    title: "LG Inverter AC PCB: PCB Heatsink Compound Repasting & Descaling #18",
    category: "industrial",
    tagline: "Precision component-level electronics repair for LG inverter AC & VRF mainboards.",
    description:
      "Professional PCB electronics repair for LG inverter air conditioners. Includes pcb heatsink compound repasting & descaling, oscilloscope signal analysis, SMD diode replacement, and high-voltage capacitor testing.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "Component-level SMD IC and diode replacement",
      "Thermal compound repasting & heatsink cleaning",
      "24-Hour continuous load bench testing",
    ],
    process: [
      "Diagnostic isolation of high voltage DC bus vs low voltage logic rail",
      "Component desoldering using ESD-safe rework station",
      "Replacement with OEM rated capacitors and IGBT modules",
      "Coating mainboard with conformal moisture isolation resin",
    ],
    faqs: [
      {
        q: "Can a burnt LG PCB be repaired instead of replaced?",
        a: "Yes! Over 90% of inverter PCB failures are caused by burnt SMPS diodes or IPM modules which can be repaired at a fraction of mainboard replacement cost.",
      },
    ],
    seoTitle: "LG Inverter AC PCB: PCB Heatsink Compound Repasting & Descaling #18 | Prime Cool",
    seoDesc:
      "Component-level repair for LG inverter AC PCBs in Pune & MIDC industrial parks. Specialist in PCB Heatsink Compound Repasting & Descaling.",
  },
  "pcb-hitachi-surge-varistor-mov-overvoltage-protection-fix-19": {
    slug: "pcb-hitachi-surge-varistor-mov-overvoltage-protection-fix-19",
    title: "Hitachi Inverter AC PCB: Surge Varistor MOV Overvoltage Protection Fix #19",
    category: "industrial",
    tagline:
      "Precision component-level electronics repair for Hitachi inverter AC & VRF mainboards.",
    description:
      "Professional PCB electronics repair for Hitachi inverter air conditioners. Includes surge varistor mov overvoltage protection fix, oscilloscope signal analysis, SMD diode replacement, and high-voltage capacitor testing.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "Component-level SMD IC and diode replacement",
      "Thermal compound repasting & heatsink cleaning",
      "24-Hour continuous load bench testing",
    ],
    process: [
      "Diagnostic isolation of high voltage DC bus vs low voltage logic rail",
      "Component desoldering using ESD-safe rework station",
      "Replacement with OEM rated capacitors and IGBT modules",
      "Coating mainboard with conformal moisture isolation resin",
    ],
    faqs: [
      {
        q: "Can a burnt Hitachi PCB be repaired instead of replaced?",
        a: "Yes! Over 90% of inverter PCB failures are caused by burnt SMPS diodes or IPM modules which can be repaired at a fraction of mainboard replacement cost.",
      },
    ],
    seoTitle:
      "Hitachi Inverter AC PCB: Surge Varistor MOV Overvoltage Protection Fix #19 | Prime Cool",
    seoDesc:
      "Component-level repair for Hitachi inverter AC PCBs in Pune & MIDC industrial parks. Specialist in Surge Varistor MOV Overvoltage Protection Fix.",
  },
  "pcb-carrier-ipm-module-igbt-transistor-switching-repair-20": {
    slug: "pcb-carrier-ipm-module-igbt-transistor-switching-repair-20",
    title: "Carrier Inverter AC PCB: IPM Module IGBT Transistor Switching Repair #20",
    category: "industrial",
    tagline:
      "Precision component-level electronics repair for Carrier inverter AC & VRF mainboards.",
    description:
      "Professional PCB electronics repair for Carrier inverter air conditioners. Includes ipm module igbt transistor switching repair, oscilloscope signal analysis, SMD diode replacement, and high-voltage capacitor testing.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "Component-level SMD IC and diode replacement",
      "Thermal compound repasting & heatsink cleaning",
      "24-Hour continuous load bench testing",
    ],
    process: [
      "Diagnostic isolation of high voltage DC bus vs low voltage logic rail",
      "Component desoldering using ESD-safe rework station",
      "Replacement with OEM rated capacitors and IGBT modules",
      "Coating mainboard with conformal moisture isolation resin",
    ],
    faqs: [
      {
        q: "Can a burnt Carrier PCB be repaired instead of replaced?",
        a: "Yes! Over 90% of inverter PCB failures are caused by burnt SMPS diodes or IPM modules which can be repaired at a fraction of mainboard replacement cost.",
      },
    ],
    seoTitle:
      "Carrier Inverter AC PCB: IPM Module IGBT Transistor Switching Repair #20 | Prime Cool",
    seoDesc:
      "Component-level repair for Carrier inverter AC PCBs in Pune & MIDC industrial parks. Specialist in IPM Module IGBT Transistor Switching Repair.",
  },
  "pcb-panasonic-smps-switch-mode-power-supply-15v-rail-repair-21": {
    slug: "pcb-panasonic-smps-switch-mode-power-supply-15v-rail-repair-21",
    title: "Panasonic Inverter AC PCB: SMPS Switch-Mode Power Supply 15V Rail Repair #21",
    category: "industrial",
    tagline:
      "Precision component-level electronics repair for Panasonic inverter AC & VRF mainboards.",
    description:
      "Professional PCB electronics repair for Panasonic inverter air conditioners. Includes smps switch-mode power supply 15v rail repair, oscilloscope signal analysis, SMD diode replacement, and high-voltage capacitor testing.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "Component-level SMD IC and diode replacement",
      "Thermal compound repasting & heatsink cleaning",
      "24-Hour continuous load bench testing",
    ],
    process: [
      "Diagnostic isolation of high voltage DC bus vs low voltage logic rail",
      "Component desoldering using ESD-safe rework station",
      "Replacement with OEM rated capacitors and IGBT modules",
      "Coating mainboard with conformal moisture isolation resin",
    ],
    faqs: [
      {
        q: "Can a burnt Panasonic PCB be repaired instead of replaced?",
        a: "Yes! Over 90% of inverter PCB failures are caused by burnt SMPS diodes or IPM modules which can be repaired at a fraction of mainboard replacement cost.",
      },
    ],
    seoTitle:
      "Panasonic Inverter AC PCB: SMPS Switch-Mode Power Supply 15V Rail Repair #21 | Prime Cool",
    seoDesc:
      "Component-level repair for Panasonic inverter AC PCBs in Pune & MIDC industrial parks. Specialist in SMPS Switch-Mode Power Supply 15V Rail Repair.",
  },
  "pcb-godrej-optocoupler-communication-loop-refurbishment-22": {
    slug: "pcb-godrej-optocoupler-communication-loop-refurbishment-22",
    title: "Godrej Inverter AC PCB: Optocoupler Communication Loop Refurbishment #22",
    category: "industrial",
    tagline:
      "Precision component-level electronics repair for Godrej inverter AC & VRF mainboards.",
    description:
      "Professional PCB electronics repair for Godrej inverter air conditioners. Includes optocoupler communication loop refurbishment, oscilloscope signal analysis, SMD diode replacement, and high-voltage capacitor testing.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "Component-level SMD IC and diode replacement",
      "Thermal compound repasting & heatsink cleaning",
      "24-Hour continuous load bench testing",
    ],
    process: [
      "Diagnostic isolation of high voltage DC bus vs low voltage logic rail",
      "Component desoldering using ESD-safe rework station",
      "Replacement with OEM rated capacitors and IGBT modules",
      "Coating mainboard with conformal moisture isolation resin",
    ],
    faqs: [
      {
        q: "Can a burnt Godrej PCB be repaired instead of replaced?",
        a: "Yes! Over 90% of inverter PCB failures are caused by burnt SMPS diodes or IPM modules which can be repaired at a fraction of mainboard replacement cost.",
      },
    ],
    seoTitle:
      "Godrej Inverter AC PCB: Optocoupler Communication Loop Refurbishment #22 | Prime Cool",
    seoDesc:
      "Component-level repair for Godrej inverter AC PCBs in Pune & MIDC industrial parks. Specialist in Optocoupler Communication Loop Refurbishment.",
  },
  "pcb-o-general-microcontroller-eeprom-data-flashing---tuning-23": {
    slug: "pcb-o-general-microcontroller-eeprom-data-flashing---tuning-23",
    title: "O General Inverter AC PCB: Microcontroller EEPROM Data Flashing & Tuning #23",
    category: "industrial",
    tagline:
      "Precision component-level electronics repair for O General inverter AC & VRF mainboards.",
    description:
      "Professional PCB electronics repair for O General inverter air conditioners. Includes microcontroller eeprom data flashing & tuning, oscilloscope signal analysis, SMD diode replacement, and high-voltage capacitor testing.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "Component-level SMD IC and diode replacement",
      "Thermal compound repasting & heatsink cleaning",
      "24-Hour continuous load bench testing",
    ],
    process: [
      "Diagnostic isolation of high voltage DC bus vs low voltage logic rail",
      "Component desoldering using ESD-safe rework station",
      "Replacement with OEM rated capacitors and IGBT modules",
      "Coating mainboard with conformal moisture isolation resin",
    ],
    faqs: [
      {
        q: "Can a burnt O General PCB be repaired instead of replaced?",
        a: "Yes! Over 90% of inverter PCB failures are caused by burnt SMPS diodes or IPM modules which can be repaired at a fraction of mainboard replacement cost.",
      },
    ],
    seoTitle:
      "O General Inverter AC PCB: Microcontroller EEPROM Data Flashing & Tuning #23 | Prime Cool",
    seoDesc:
      "Component-level repair for O General inverter AC PCBs in Pune & MIDC industrial parks. Specialist in Microcontroller EEPROM Data Flashing & Tuning.",
  },
  "pcb-mitsubishi-current-sensing-shunt-resistor-calibration-24": {
    slug: "pcb-mitsubishi-current-sensing-shunt-resistor-calibration-24",
    title: "Mitsubishi Inverter AC PCB: Current Sensing Shunt Resistor Calibration #24",
    category: "industrial",
    tagline:
      "Precision component-level electronics repair for Mitsubishi inverter AC & VRF mainboards.",
    description:
      "Professional PCB electronics repair for Mitsubishi inverter air conditioners. Includes current sensing shunt resistor calibration, oscilloscope signal analysis, SMD diode replacement, and high-voltage capacitor testing.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "Component-level SMD IC and diode replacement",
      "Thermal compound repasting & heatsink cleaning",
      "24-Hour continuous load bench testing",
    ],
    process: [
      "Diagnostic isolation of high voltage DC bus vs low voltage logic rail",
      "Component desoldering using ESD-safe rework station",
      "Replacement with OEM rated capacitors and IGBT modules",
      "Coating mainboard with conformal moisture isolation resin",
    ],
    faqs: [
      {
        q: "Can a burnt Mitsubishi PCB be repaired instead of replaced?",
        a: "Yes! Over 90% of inverter PCB failures are caused by burnt SMPS diodes or IPM modules which can be repaired at a fraction of mainboard replacement cost.",
      },
    ],
    seoTitle:
      "Mitsubishi Inverter AC PCB: Current Sensing Shunt Resistor Calibration #24 | Prime Cool",
    seoDesc:
      "Component-level repair for Mitsubishi inverter AC PCBs in Pune & MIDC industrial parks. Specialist in Current Sensing Shunt Resistor Calibration.",
  },
  "pcb-danfoss-bldc-condenser-fan-motor-driver-ic-repair-25": {
    slug: "pcb-danfoss-bldc-condenser-fan-motor-driver-ic-repair-25",
    title: "Danfoss Inverter AC PCB: BLDC Condenser Fan Motor Driver IC Repair #25",
    category: "industrial",
    tagline:
      "Precision component-level electronics repair for Danfoss inverter AC & VRF mainboards.",
    description:
      "Professional PCB electronics repair for Danfoss inverter air conditioners. Includes bldc condenser fan motor driver ic repair, oscilloscope signal analysis, SMD diode replacement, and high-voltage capacitor testing.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "Component-level SMD IC and diode replacement",
      "Thermal compound repasting & heatsink cleaning",
      "24-Hour continuous load bench testing",
    ],
    process: [
      "Diagnostic isolation of high voltage DC bus vs low voltage logic rail",
      "Component desoldering using ESD-safe rework station",
      "Replacement with OEM rated capacitors and IGBT modules",
      "Coating mainboard with conformal moisture isolation resin",
    ],
    faqs: [
      {
        q: "Can a burnt Danfoss PCB be repaired instead of replaced?",
        a: "Yes! Over 90% of inverter PCB failures are caused by burnt SMPS diodes or IPM modules which can be repaired at a fraction of mainboard replacement cost.",
      },
    ],
    seoTitle: "Danfoss Inverter AC PCB: BLDC Condenser Fan Motor Driver IC Repair #25 | Prime Cool",
    seoDesc:
      "Component-level repair for Danfoss inverter AC PCBs in Pune & MIDC industrial parks. Specialist in BLDC Condenser Fan Motor Driver IC Repair.",
  },
  "pcb-abb-dc-bus-high-voltage-capacitor-refurbishment-26": {
    slug: "pcb-abb-dc-bus-high-voltage-capacitor-refurbishment-26",
    title: "ABB Inverter AC PCB: DC Bus High Voltage Capacitor Refurbishment #26",
    category: "industrial",
    tagline: "Precision component-level electronics repair for ABB inverter AC & VRF mainboards.",
    description:
      "Professional PCB electronics repair for ABB inverter air conditioners. Includes dc bus high voltage capacitor refurbishment, oscilloscope signal analysis, SMD diode replacement, and high-voltage capacitor testing.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "Component-level SMD IC and diode replacement",
      "Thermal compound repasting & heatsink cleaning",
      "24-Hour continuous load bench testing",
    ],
    process: [
      "Diagnostic isolation of high voltage DC bus vs low voltage logic rail",
      "Component desoldering using ESD-safe rework station",
      "Replacement with OEM rated capacitors and IGBT modules",
      "Coating mainboard with conformal moisture isolation resin",
    ],
    faqs: [
      {
        q: "Can a burnt ABB PCB be repaired instead of replaced?",
        a: "Yes! Over 90% of inverter PCB failures are caused by burnt SMPS diodes or IPM modules which can be repaired at a fraction of mainboard replacement cost.",
      },
    ],
    seoTitle: "ABB Inverter AC PCB: DC Bus High Voltage Capacitor Refurbishment #26 | Prime Cool",
    seoDesc:
      "Component-level repair for ABB inverter AC PCBs in Pune & MIDC industrial parks. Specialist in DC Bus High Voltage Capacitor Refurbishment.",
  },
  "pcb-schneider-inverter-drive-phase-voltage-unbalance-fix-27": {
    slug: "pcb-schneider-inverter-drive-phase-voltage-unbalance-fix-27",
    title: "Schneider Inverter AC PCB: Inverter Drive Phase Voltage Unbalance Fix #27",
    category: "industrial",
    tagline:
      "Precision component-level electronics repair for Schneider inverter AC & VRF mainboards.",
    description:
      "Professional PCB electronics repair for Schneider inverter air conditioners. Includes inverter drive phase voltage unbalance fix, oscilloscope signal analysis, SMD diode replacement, and high-voltage capacitor testing.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "Component-level SMD IC and diode replacement",
      "Thermal compound repasting & heatsink cleaning",
      "24-Hour continuous load bench testing",
    ],
    process: [
      "Diagnostic isolation of high voltage DC bus vs low voltage logic rail",
      "Component desoldering using ESD-safe rework station",
      "Replacement with OEM rated capacitors and IGBT modules",
      "Coating mainboard with conformal moisture isolation resin",
    ],
    faqs: [
      {
        q: "Can a burnt Schneider PCB be repaired instead of replaced?",
        a: "Yes! Over 90% of inverter PCB failures are caused by burnt SMPS diodes or IPM modules which can be repaired at a fraction of mainboard replacement cost.",
      },
    ],
    seoTitle:
      "Schneider Inverter AC PCB: Inverter Drive Phase Voltage Unbalance Fix #27 | Prime Cool",
    seoDesc:
      "Component-level repair for Schneider inverter AC PCBs in Pune & MIDC industrial parks. Specialist in Inverter Drive Phase Voltage Unbalance Fix.",
  },
  "pcb-siemens-pcb-heatsink-compound-repasting---descaling-28": {
    slug: "pcb-siemens-pcb-heatsink-compound-repasting---descaling-28",
    title: "Siemens Inverter AC PCB: PCB Heatsink Compound Repasting & Descaling #28",
    category: "industrial",
    tagline:
      "Precision component-level electronics repair for Siemens inverter AC & VRF mainboards.",
    description:
      "Professional PCB electronics repair for Siemens inverter air conditioners. Includes pcb heatsink compound repasting & descaling, oscilloscope signal analysis, SMD diode replacement, and high-voltage capacitor testing.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "Component-level SMD IC and diode replacement",
      "Thermal compound repasting & heatsink cleaning",
      "24-Hour continuous load bench testing",
    ],
    process: [
      "Diagnostic isolation of high voltage DC bus vs low voltage logic rail",
      "Component desoldering using ESD-safe rework station",
      "Replacement with OEM rated capacitors and IGBT modules",
      "Coating mainboard with conformal moisture isolation resin",
    ],
    faqs: [
      {
        q: "Can a burnt Siemens PCB be repaired instead of replaced?",
        a: "Yes! Over 90% of inverter PCB failures are caused by burnt SMPS diodes or IPM modules which can be repaired at a fraction of mainboard replacement cost.",
      },
    ],
    seoTitle:
      "Siemens Inverter AC PCB: PCB Heatsink Compound Repasting & Descaling #28 | Prime Cool",
    seoDesc:
      "Component-level repair for Siemens inverter AC PCBs in Pune & MIDC industrial parks. Specialist in PCB Heatsink Compound Repasting & Descaling.",
  },
  "pcb-yaskawa-surge-varistor-mov-overvoltage-protection-fix-29": {
    slug: "pcb-yaskawa-surge-varistor-mov-overvoltage-protection-fix-29",
    title: "Yaskawa Inverter AC PCB: Surge Varistor MOV Overvoltage Protection Fix #29",
    category: "industrial",
    tagline:
      "Precision component-level electronics repair for Yaskawa inverter AC & VRF mainboards.",
    description:
      "Professional PCB electronics repair for Yaskawa inverter air conditioners. Includes surge varistor mov overvoltage protection fix, oscilloscope signal analysis, SMD diode replacement, and high-voltage capacitor testing.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "Component-level SMD IC and diode replacement",
      "Thermal compound repasting & heatsink cleaning",
      "24-Hour continuous load bench testing",
    ],
    process: [
      "Diagnostic isolation of high voltage DC bus vs low voltage logic rail",
      "Component desoldering using ESD-safe rework station",
      "Replacement with OEM rated capacitors and IGBT modules",
      "Coating mainboard with conformal moisture isolation resin",
    ],
    faqs: [
      {
        q: "Can a burnt Yaskawa PCB be repaired instead of replaced?",
        a: "Yes! Over 90% of inverter PCB failures are caused by burnt SMPS diodes or IPM modules which can be repaired at a fraction of mainboard replacement cost.",
      },
    ],
    seoTitle:
      "Yaskawa Inverter AC PCB: Surge Varistor MOV Overvoltage Protection Fix #29 | Prime Cool",
    seoDesc:
      "Component-level repair for Yaskawa inverter AC PCBs in Pune & MIDC industrial parks. Specialist in Surge Varistor MOV Overvoltage Protection Fix.",
  },
  "pcb-daikin-ipm-module-igbt-transistor-switching-repair-30": {
    slug: "pcb-daikin-ipm-module-igbt-transistor-switching-repair-30",
    title: "Daikin Inverter AC PCB: IPM Module IGBT Transistor Switching Repair #30",
    category: "industrial",
    tagline:
      "Precision component-level electronics repair for Daikin inverter AC & VRF mainboards.",
    description:
      "Professional PCB electronics repair for Daikin inverter air conditioners. Includes ipm module igbt transistor switching repair, oscilloscope signal analysis, SMD diode replacement, and high-voltage capacitor testing.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "Component-level SMD IC and diode replacement",
      "Thermal compound repasting & heatsink cleaning",
      "24-Hour continuous load bench testing",
    ],
    process: [
      "Diagnostic isolation of high voltage DC bus vs low voltage logic rail",
      "Component desoldering using ESD-safe rework station",
      "Replacement with OEM rated capacitors and IGBT modules",
      "Coating mainboard with conformal moisture isolation resin",
    ],
    faqs: [
      {
        q: "Can a burnt Daikin PCB be repaired instead of replaced?",
        a: "Yes! Over 90% of inverter PCB failures are caused by burnt SMPS diodes or IPM modules which can be repaired at a fraction of mainboard replacement cost.",
      },
    ],
    seoTitle:
      "Daikin Inverter AC PCB: IPM Module IGBT Transistor Switching Repair #30 | Prime Cool",
    seoDesc:
      "Component-level repair for Daikin inverter AC PCBs in Pune & MIDC industrial parks. Specialist in IPM Module IGBT Transistor Switching Repair.",
  },
  "pcb-voltas-smps-switch-mode-power-supply-15v-rail-repair-31": {
    slug: "pcb-voltas-smps-switch-mode-power-supply-15v-rail-repair-31",
    title: "Voltas Inverter AC PCB: SMPS Switch-Mode Power Supply 15V Rail Repair #31",
    category: "industrial",
    tagline:
      "Precision component-level electronics repair for Voltas inverter AC & VRF mainboards.",
    description:
      "Professional PCB electronics repair for Voltas inverter air conditioners. Includes smps switch-mode power supply 15v rail repair, oscilloscope signal analysis, SMD diode replacement, and high-voltage capacitor testing.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "Component-level SMD IC and diode replacement",
      "Thermal compound repasting & heatsink cleaning",
      "24-Hour continuous load bench testing",
    ],
    process: [
      "Diagnostic isolation of high voltage DC bus vs low voltage logic rail",
      "Component desoldering using ESD-safe rework station",
      "Replacement with OEM rated capacitors and IGBT modules",
      "Coating mainboard with conformal moisture isolation resin",
    ],
    faqs: [
      {
        q: "Can a burnt Voltas PCB be repaired instead of replaced?",
        a: "Yes! Over 90% of inverter PCB failures are caused by burnt SMPS diodes or IPM modules which can be repaired at a fraction of mainboard replacement cost.",
      },
    ],
    seoTitle:
      "Voltas Inverter AC PCB: SMPS Switch-Mode Power Supply 15V Rail Repair #31 | Prime Cool",
    seoDesc:
      "Component-level repair for Voltas inverter AC PCBs in Pune & MIDC industrial parks. Specialist in SMPS Switch-Mode Power Supply 15V Rail Repair.",
  },
  "pcb-blue-star-optocoupler-communication-loop-refurbishment-32": {
    slug: "pcb-blue-star-optocoupler-communication-loop-refurbishment-32",
    title: "Blue Star Inverter AC PCB: Optocoupler Communication Loop Refurbishment #32",
    category: "industrial",
    tagline:
      "Precision component-level electronics repair for Blue Star inverter AC & VRF mainboards.",
    description:
      "Professional PCB electronics repair for Blue Star inverter air conditioners. Includes optocoupler communication loop refurbishment, oscilloscope signal analysis, SMD diode replacement, and high-voltage capacitor testing.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "Component-level SMD IC and diode replacement",
      "Thermal compound repasting & heatsink cleaning",
      "24-Hour continuous load bench testing",
    ],
    process: [
      "Diagnostic isolation of high voltage DC bus vs low voltage logic rail",
      "Component desoldering using ESD-safe rework station",
      "Replacement with OEM rated capacitors and IGBT modules",
      "Coating mainboard with conformal moisture isolation resin",
    ],
    faqs: [
      {
        q: "Can a burnt Blue Star PCB be repaired instead of replaced?",
        a: "Yes! Over 90% of inverter PCB failures are caused by burnt SMPS diodes or IPM modules which can be repaired at a fraction of mainboard replacement cost.",
      },
    ],
    seoTitle:
      "Blue Star Inverter AC PCB: Optocoupler Communication Loop Refurbishment #32 | Prime Cool",
    seoDesc:
      "Component-level repair for Blue Star inverter AC PCBs in Pune & MIDC industrial parks. Specialist in Optocoupler Communication Loop Refurbishment.",
  },
  "pcb-lg-microcontroller-eeprom-data-flashing---tuning-33": {
    slug: "pcb-lg-microcontroller-eeprom-data-flashing---tuning-33",
    title: "LG Inverter AC PCB: Microcontroller EEPROM Data Flashing & Tuning #33",
    category: "industrial",
    tagline: "Precision component-level electronics repair for LG inverter AC & VRF mainboards.",
    description:
      "Professional PCB electronics repair for LG inverter air conditioners. Includes microcontroller eeprom data flashing & tuning, oscilloscope signal analysis, SMD diode replacement, and high-voltage capacitor testing.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "Component-level SMD IC and diode replacement",
      "Thermal compound repasting & heatsink cleaning",
      "24-Hour continuous load bench testing",
    ],
    process: [
      "Diagnostic isolation of high voltage DC bus vs low voltage logic rail",
      "Component desoldering using ESD-safe rework station",
      "Replacement with OEM rated capacitors and IGBT modules",
      "Coating mainboard with conformal moisture isolation resin",
    ],
    faqs: [
      {
        q: "Can a burnt LG PCB be repaired instead of replaced?",
        a: "Yes! Over 90% of inverter PCB failures are caused by burnt SMPS diodes or IPM modules which can be repaired at a fraction of mainboard replacement cost.",
      },
    ],
    seoTitle: "LG Inverter AC PCB: Microcontroller EEPROM Data Flashing & Tuning #33 | Prime Cool",
    seoDesc:
      "Component-level repair for LG inverter AC PCBs in Pune & MIDC industrial parks. Specialist in Microcontroller EEPROM Data Flashing & Tuning.",
  },
  "pcb-hitachi-current-sensing-shunt-resistor-calibration-34": {
    slug: "pcb-hitachi-current-sensing-shunt-resistor-calibration-34",
    title: "Hitachi Inverter AC PCB: Current Sensing Shunt Resistor Calibration #34",
    category: "industrial",
    tagline:
      "Precision component-level electronics repair for Hitachi inverter AC & VRF mainboards.",
    description:
      "Professional PCB electronics repair for Hitachi inverter air conditioners. Includes current sensing shunt resistor calibration, oscilloscope signal analysis, SMD diode replacement, and high-voltage capacitor testing.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "Component-level SMD IC and diode replacement",
      "Thermal compound repasting & heatsink cleaning",
      "24-Hour continuous load bench testing",
    ],
    process: [
      "Diagnostic isolation of high voltage DC bus vs low voltage logic rail",
      "Component desoldering using ESD-safe rework station",
      "Replacement with OEM rated capacitors and IGBT modules",
      "Coating mainboard with conformal moisture isolation resin",
    ],
    faqs: [
      {
        q: "Can a burnt Hitachi PCB be repaired instead of replaced?",
        a: "Yes! Over 90% of inverter PCB failures are caused by burnt SMPS diodes or IPM modules which can be repaired at a fraction of mainboard replacement cost.",
      },
    ],
    seoTitle:
      "Hitachi Inverter AC PCB: Current Sensing Shunt Resistor Calibration #34 | Prime Cool",
    seoDesc:
      "Component-level repair for Hitachi inverter AC PCBs in Pune & MIDC industrial parks. Specialist in Current Sensing Shunt Resistor Calibration.",
  },
  "pcb-carrier-bldc-condenser-fan-motor-driver-ic-repair-35": {
    slug: "pcb-carrier-bldc-condenser-fan-motor-driver-ic-repair-35",
    title: "Carrier Inverter AC PCB: BLDC Condenser Fan Motor Driver IC Repair #35",
    category: "industrial",
    tagline:
      "Precision component-level electronics repair for Carrier inverter AC & VRF mainboards.",
    description:
      "Professional PCB electronics repair for Carrier inverter air conditioners. Includes bldc condenser fan motor driver ic repair, oscilloscope signal analysis, SMD diode replacement, and high-voltage capacitor testing.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "Component-level SMD IC and diode replacement",
      "Thermal compound repasting & heatsink cleaning",
      "24-Hour continuous load bench testing",
    ],
    process: [
      "Diagnostic isolation of high voltage DC bus vs low voltage logic rail",
      "Component desoldering using ESD-safe rework station",
      "Replacement with OEM rated capacitors and IGBT modules",
      "Coating mainboard with conformal moisture isolation resin",
    ],
    faqs: [
      {
        q: "Can a burnt Carrier PCB be repaired instead of replaced?",
        a: "Yes! Over 90% of inverter PCB failures are caused by burnt SMPS diodes or IPM modules which can be repaired at a fraction of mainboard replacement cost.",
      },
    ],
    seoTitle: "Carrier Inverter AC PCB: BLDC Condenser Fan Motor Driver IC Repair #35 | Prime Cool",
    seoDesc:
      "Component-level repair for Carrier inverter AC PCBs in Pune & MIDC industrial parks. Specialist in BLDC Condenser Fan Motor Driver IC Repair.",
  },
  "pcb-panasonic-dc-bus-high-voltage-capacitor-refurbishment-36": {
    slug: "pcb-panasonic-dc-bus-high-voltage-capacitor-refurbishment-36",
    title: "Panasonic Inverter AC PCB: DC Bus High Voltage Capacitor Refurbishment #36",
    category: "industrial",
    tagline:
      "Precision component-level electronics repair for Panasonic inverter AC & VRF mainboards.",
    description:
      "Professional PCB electronics repair for Panasonic inverter air conditioners. Includes dc bus high voltage capacitor refurbishment, oscilloscope signal analysis, SMD diode replacement, and high-voltage capacitor testing.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "Component-level SMD IC and diode replacement",
      "Thermal compound repasting & heatsink cleaning",
      "24-Hour continuous load bench testing",
    ],
    process: [
      "Diagnostic isolation of high voltage DC bus vs low voltage logic rail",
      "Component desoldering using ESD-safe rework station",
      "Replacement with OEM rated capacitors and IGBT modules",
      "Coating mainboard with conformal moisture isolation resin",
    ],
    faqs: [
      {
        q: "Can a burnt Panasonic PCB be repaired instead of replaced?",
        a: "Yes! Over 90% of inverter PCB failures are caused by burnt SMPS diodes or IPM modules which can be repaired at a fraction of mainboard replacement cost.",
      },
    ],
    seoTitle:
      "Panasonic Inverter AC PCB: DC Bus High Voltage Capacitor Refurbishment #36 | Prime Cool",
    seoDesc:
      "Component-level repair for Panasonic inverter AC PCBs in Pune & MIDC industrial parks. Specialist in DC Bus High Voltage Capacitor Refurbishment.",
  },
  "pcb-godrej-inverter-drive-phase-voltage-unbalance-fix-37": {
    slug: "pcb-godrej-inverter-drive-phase-voltage-unbalance-fix-37",
    title: "Godrej Inverter AC PCB: Inverter Drive Phase Voltage Unbalance Fix #37",
    category: "industrial",
    tagline:
      "Precision component-level electronics repair for Godrej inverter AC & VRF mainboards.",
    description:
      "Professional PCB electronics repair for Godrej inverter air conditioners. Includes inverter drive phase voltage unbalance fix, oscilloscope signal analysis, SMD diode replacement, and high-voltage capacitor testing.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "Component-level SMD IC and diode replacement",
      "Thermal compound repasting & heatsink cleaning",
      "24-Hour continuous load bench testing",
    ],
    process: [
      "Diagnostic isolation of high voltage DC bus vs low voltage logic rail",
      "Component desoldering using ESD-safe rework station",
      "Replacement with OEM rated capacitors and IGBT modules",
      "Coating mainboard with conformal moisture isolation resin",
    ],
    faqs: [
      {
        q: "Can a burnt Godrej PCB be repaired instead of replaced?",
        a: "Yes! Over 90% of inverter PCB failures are caused by burnt SMPS diodes or IPM modules which can be repaired at a fraction of mainboard replacement cost.",
      },
    ],
    seoTitle: "Godrej Inverter AC PCB: Inverter Drive Phase Voltage Unbalance Fix #37 | Prime Cool",
    seoDesc:
      "Component-level repair for Godrej inverter AC PCBs in Pune & MIDC industrial parks. Specialist in Inverter Drive Phase Voltage Unbalance Fix.",
  },
  "pcb-o-general-pcb-heatsink-compound-repasting---descaling-38": {
    slug: "pcb-o-general-pcb-heatsink-compound-repasting---descaling-38",
    title: "O General Inverter AC PCB: PCB Heatsink Compound Repasting & Descaling #38",
    category: "industrial",
    tagline:
      "Precision component-level electronics repair for O General inverter AC & VRF mainboards.",
    description:
      "Professional PCB electronics repair for O General inverter air conditioners. Includes pcb heatsink compound repasting & descaling, oscilloscope signal analysis, SMD diode replacement, and high-voltage capacitor testing.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "Component-level SMD IC and diode replacement",
      "Thermal compound repasting & heatsink cleaning",
      "24-Hour continuous load bench testing",
    ],
    process: [
      "Diagnostic isolation of high voltage DC bus vs low voltage logic rail",
      "Component desoldering using ESD-safe rework station",
      "Replacement with OEM rated capacitors and IGBT modules",
      "Coating mainboard with conformal moisture isolation resin",
    ],
    faqs: [
      {
        q: "Can a burnt O General PCB be repaired instead of replaced?",
        a: "Yes! Over 90% of inverter PCB failures are caused by burnt SMPS diodes or IPM modules which can be repaired at a fraction of mainboard replacement cost.",
      },
    ],
    seoTitle:
      "O General Inverter AC PCB: PCB Heatsink Compound Repasting & Descaling #38 | Prime Cool",
    seoDesc:
      "Component-level repair for O General inverter AC PCBs in Pune & MIDC industrial parks. Specialist in PCB Heatsink Compound Repasting & Descaling.",
  },
  "pcb-mitsubishi-surge-varistor-mov-overvoltage-protection-fix-39": {
    slug: "pcb-mitsubishi-surge-varistor-mov-overvoltage-protection-fix-39",
    title: "Mitsubishi Inverter AC PCB: Surge Varistor MOV Overvoltage Protection Fix #39",
    category: "industrial",
    tagline:
      "Precision component-level electronics repair for Mitsubishi inverter AC & VRF mainboards.",
    description:
      "Professional PCB electronics repair for Mitsubishi inverter air conditioners. Includes surge varistor mov overvoltage protection fix, oscilloscope signal analysis, SMD diode replacement, and high-voltage capacitor testing.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "Component-level SMD IC and diode replacement",
      "Thermal compound repasting & heatsink cleaning",
      "24-Hour continuous load bench testing",
    ],
    process: [
      "Diagnostic isolation of high voltage DC bus vs low voltage logic rail",
      "Component desoldering using ESD-safe rework station",
      "Replacement with OEM rated capacitors and IGBT modules",
      "Coating mainboard with conformal moisture isolation resin",
    ],
    faqs: [
      {
        q: "Can a burnt Mitsubishi PCB be repaired instead of replaced?",
        a: "Yes! Over 90% of inverter PCB failures are caused by burnt SMPS diodes or IPM modules which can be repaired at a fraction of mainboard replacement cost.",
      },
    ],
    seoTitle:
      "Mitsubishi Inverter AC PCB: Surge Varistor MOV Overvoltage Protection Fix #39 | Prime Cool",
    seoDesc:
      "Component-level repair for Mitsubishi inverter AC PCBs in Pune & MIDC industrial parks. Specialist in Surge Varistor MOV Overvoltage Protection Fix.",
  },
  "pcb-danfoss-ipm-module-igbt-transistor-switching-repair-40": {
    slug: "pcb-danfoss-ipm-module-igbt-transistor-switching-repair-40",
    title: "Danfoss Inverter AC PCB: IPM Module IGBT Transistor Switching Repair #40",
    category: "industrial",
    tagline:
      "Precision component-level electronics repair for Danfoss inverter AC & VRF mainboards.",
    description:
      "Professional PCB electronics repair for Danfoss inverter air conditioners. Includes ipm module igbt transistor switching repair, oscilloscope signal analysis, SMD diode replacement, and high-voltage capacitor testing.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "Component-level SMD IC and diode replacement",
      "Thermal compound repasting & heatsink cleaning",
      "24-Hour continuous load bench testing",
    ],
    process: [
      "Diagnostic isolation of high voltage DC bus vs low voltage logic rail",
      "Component desoldering using ESD-safe rework station",
      "Replacement with OEM rated capacitors and IGBT modules",
      "Coating mainboard with conformal moisture isolation resin",
    ],
    faqs: [
      {
        q: "Can a burnt Danfoss PCB be repaired instead of replaced?",
        a: "Yes! Over 90% of inverter PCB failures are caused by burnt SMPS diodes or IPM modules which can be repaired at a fraction of mainboard replacement cost.",
      },
    ],
    seoTitle:
      "Danfoss Inverter AC PCB: IPM Module IGBT Transistor Switching Repair #40 | Prime Cool",
    seoDesc:
      "Component-level repair for Danfoss inverter AC PCBs in Pune & MIDC industrial parks. Specialist in IPM Module IGBT Transistor Switching Repair.",
  },
  "pcb-abb-smps-switch-mode-power-supply-15v-rail-repair-41": {
    slug: "pcb-abb-smps-switch-mode-power-supply-15v-rail-repair-41",
    title: "ABB Inverter AC PCB: SMPS Switch-Mode Power Supply 15V Rail Repair #41",
    category: "industrial",
    tagline: "Precision component-level electronics repair for ABB inverter AC & VRF mainboards.",
    description:
      "Professional PCB electronics repair for ABB inverter air conditioners. Includes smps switch-mode power supply 15v rail repair, oscilloscope signal analysis, SMD diode replacement, and high-voltage capacitor testing.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "Component-level SMD IC and diode replacement",
      "Thermal compound repasting & heatsink cleaning",
      "24-Hour continuous load bench testing",
    ],
    process: [
      "Diagnostic isolation of high voltage DC bus vs low voltage logic rail",
      "Component desoldering using ESD-safe rework station",
      "Replacement with OEM rated capacitors and IGBT modules",
      "Coating mainboard with conformal moisture isolation resin",
    ],
    faqs: [
      {
        q: "Can a burnt ABB PCB be repaired instead of replaced?",
        a: "Yes! Over 90% of inverter PCB failures are caused by burnt SMPS diodes or IPM modules which can be repaired at a fraction of mainboard replacement cost.",
      },
    ],
    seoTitle: "ABB Inverter AC PCB: SMPS Switch-Mode Power Supply 15V Rail Repair #41 | Prime Cool",
    seoDesc:
      "Component-level repair for ABB inverter AC PCBs in Pune & MIDC industrial parks. Specialist in SMPS Switch-Mode Power Supply 15V Rail Repair.",
  },
  "pcb-schneider-optocoupler-communication-loop-refurbishment-42": {
    slug: "pcb-schneider-optocoupler-communication-loop-refurbishment-42",
    title: "Schneider Inverter AC PCB: Optocoupler Communication Loop Refurbishment #42",
    category: "industrial",
    tagline:
      "Precision component-level electronics repair for Schneider inverter AC & VRF mainboards.",
    description:
      "Professional PCB electronics repair for Schneider inverter air conditioners. Includes optocoupler communication loop refurbishment, oscilloscope signal analysis, SMD diode replacement, and high-voltage capacitor testing.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "Component-level SMD IC and diode replacement",
      "Thermal compound repasting & heatsink cleaning",
      "24-Hour continuous load bench testing",
    ],
    process: [
      "Diagnostic isolation of high voltage DC bus vs low voltage logic rail",
      "Component desoldering using ESD-safe rework station",
      "Replacement with OEM rated capacitors and IGBT modules",
      "Coating mainboard with conformal moisture isolation resin",
    ],
    faqs: [
      {
        q: "Can a burnt Schneider PCB be repaired instead of replaced?",
        a: "Yes! Over 90% of inverter PCB failures are caused by burnt SMPS diodes or IPM modules which can be repaired at a fraction of mainboard replacement cost.",
      },
    ],
    seoTitle:
      "Schneider Inverter AC PCB: Optocoupler Communication Loop Refurbishment #42 | Prime Cool",
    seoDesc:
      "Component-level repair for Schneider inverter AC PCBs in Pune & MIDC industrial parks. Specialist in Optocoupler Communication Loop Refurbishment.",
  },
  "pcb-siemens-microcontroller-eeprom-data-flashing---tuning-43": {
    slug: "pcb-siemens-microcontroller-eeprom-data-flashing---tuning-43",
    title: "Siemens Inverter AC PCB: Microcontroller EEPROM Data Flashing & Tuning #43",
    category: "industrial",
    tagline:
      "Precision component-level electronics repair for Siemens inverter AC & VRF mainboards.",
    description:
      "Professional PCB electronics repair for Siemens inverter air conditioners. Includes microcontroller eeprom data flashing & tuning, oscilloscope signal analysis, SMD diode replacement, and high-voltage capacitor testing.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "Component-level SMD IC and diode replacement",
      "Thermal compound repasting & heatsink cleaning",
      "24-Hour continuous load bench testing",
    ],
    process: [
      "Diagnostic isolation of high voltage DC bus vs low voltage logic rail",
      "Component desoldering using ESD-safe rework station",
      "Replacement with OEM rated capacitors and IGBT modules",
      "Coating mainboard with conformal moisture isolation resin",
    ],
    faqs: [
      {
        q: "Can a burnt Siemens PCB be repaired instead of replaced?",
        a: "Yes! Over 90% of inverter PCB failures are caused by burnt SMPS diodes or IPM modules which can be repaired at a fraction of mainboard replacement cost.",
      },
    ],
    seoTitle:
      "Siemens Inverter AC PCB: Microcontroller EEPROM Data Flashing & Tuning #43 | Prime Cool",
    seoDesc:
      "Component-level repair for Siemens inverter AC PCBs in Pune & MIDC industrial parks. Specialist in Microcontroller EEPROM Data Flashing & Tuning.",
  },
  "pcb-yaskawa-current-sensing-shunt-resistor-calibration-44": {
    slug: "pcb-yaskawa-current-sensing-shunt-resistor-calibration-44",
    title: "Yaskawa Inverter AC PCB: Current Sensing Shunt Resistor Calibration #44",
    category: "industrial",
    tagline:
      "Precision component-level electronics repair for Yaskawa inverter AC & VRF mainboards.",
    description:
      "Professional PCB electronics repair for Yaskawa inverter air conditioners. Includes current sensing shunt resistor calibration, oscilloscope signal analysis, SMD diode replacement, and high-voltage capacitor testing.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "Component-level SMD IC and diode replacement",
      "Thermal compound repasting & heatsink cleaning",
      "24-Hour continuous load bench testing",
    ],
    process: [
      "Diagnostic isolation of high voltage DC bus vs low voltage logic rail",
      "Component desoldering using ESD-safe rework station",
      "Replacement with OEM rated capacitors and IGBT modules",
      "Coating mainboard with conformal moisture isolation resin",
    ],
    faqs: [
      {
        q: "Can a burnt Yaskawa PCB be repaired instead of replaced?",
        a: "Yes! Over 90% of inverter PCB failures are caused by burnt SMPS diodes or IPM modules which can be repaired at a fraction of mainboard replacement cost.",
      },
    ],
    seoTitle:
      "Yaskawa Inverter AC PCB: Current Sensing Shunt Resistor Calibration #44 | Prime Cool",
    seoDesc:
      "Component-level repair for Yaskawa inverter AC PCBs in Pune & MIDC industrial parks. Specialist in Current Sensing Shunt Resistor Calibration.",
  },
  "pcb-daikin-bldc-condenser-fan-motor-driver-ic-repair-45": {
    slug: "pcb-daikin-bldc-condenser-fan-motor-driver-ic-repair-45",
    title: "Daikin Inverter AC PCB: BLDC Condenser Fan Motor Driver IC Repair #45",
    category: "industrial",
    tagline:
      "Precision component-level electronics repair for Daikin inverter AC & VRF mainboards.",
    description:
      "Professional PCB electronics repair for Daikin inverter air conditioners. Includes bldc condenser fan motor driver ic repair, oscilloscope signal analysis, SMD diode replacement, and high-voltage capacitor testing.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "Component-level SMD IC and diode replacement",
      "Thermal compound repasting & heatsink cleaning",
      "24-Hour continuous load bench testing",
    ],
    process: [
      "Diagnostic isolation of high voltage DC bus vs low voltage logic rail",
      "Component desoldering using ESD-safe rework station",
      "Replacement with OEM rated capacitors and IGBT modules",
      "Coating mainboard with conformal moisture isolation resin",
    ],
    faqs: [
      {
        q: "Can a burnt Daikin PCB be repaired instead of replaced?",
        a: "Yes! Over 90% of inverter PCB failures are caused by burnt SMPS diodes or IPM modules which can be repaired at a fraction of mainboard replacement cost.",
      },
    ],
    seoTitle: "Daikin Inverter AC PCB: BLDC Condenser Fan Motor Driver IC Repair #45 | Prime Cool",
    seoDesc:
      "Component-level repair for Daikin inverter AC PCBs in Pune & MIDC industrial parks. Specialist in BLDC Condenser Fan Motor Driver IC Repair.",
  },
  "pcb-voltas-dc-bus-high-voltage-capacitor-refurbishment-46": {
    slug: "pcb-voltas-dc-bus-high-voltage-capacitor-refurbishment-46",
    title: "Voltas Inverter AC PCB: DC Bus High Voltage Capacitor Refurbishment #46",
    category: "industrial",
    tagline:
      "Precision component-level electronics repair for Voltas inverter AC & VRF mainboards.",
    description:
      "Professional PCB electronics repair for Voltas inverter air conditioners. Includes dc bus high voltage capacitor refurbishment, oscilloscope signal analysis, SMD diode replacement, and high-voltage capacitor testing.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "Component-level SMD IC and diode replacement",
      "Thermal compound repasting & heatsink cleaning",
      "24-Hour continuous load bench testing",
    ],
    process: [
      "Diagnostic isolation of high voltage DC bus vs low voltage logic rail",
      "Component desoldering using ESD-safe rework station",
      "Replacement with OEM rated capacitors and IGBT modules",
      "Coating mainboard with conformal moisture isolation resin",
    ],
    faqs: [
      {
        q: "Can a burnt Voltas PCB be repaired instead of replaced?",
        a: "Yes! Over 90% of inverter PCB failures are caused by burnt SMPS diodes or IPM modules which can be repaired at a fraction of mainboard replacement cost.",
      },
    ],
    seoTitle:
      "Voltas Inverter AC PCB: DC Bus High Voltage Capacitor Refurbishment #46 | Prime Cool",
    seoDesc:
      "Component-level repair for Voltas inverter AC PCBs in Pune & MIDC industrial parks. Specialist in DC Bus High Voltage Capacitor Refurbishment.",
  },
  "pcb-blue-star-inverter-drive-phase-voltage-unbalance-fix-47": {
    slug: "pcb-blue-star-inverter-drive-phase-voltage-unbalance-fix-47",
    title: "Blue Star Inverter AC PCB: Inverter Drive Phase Voltage Unbalance Fix #47",
    category: "industrial",
    tagline:
      "Precision component-level electronics repair for Blue Star inverter AC & VRF mainboards.",
    description:
      "Professional PCB electronics repair for Blue Star inverter air conditioners. Includes inverter drive phase voltage unbalance fix, oscilloscope signal analysis, SMD diode replacement, and high-voltage capacitor testing.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "Component-level SMD IC and diode replacement",
      "Thermal compound repasting & heatsink cleaning",
      "24-Hour continuous load bench testing",
    ],
    process: [
      "Diagnostic isolation of high voltage DC bus vs low voltage logic rail",
      "Component desoldering using ESD-safe rework station",
      "Replacement with OEM rated capacitors and IGBT modules",
      "Coating mainboard with conformal moisture isolation resin",
    ],
    faqs: [
      {
        q: "Can a burnt Blue Star PCB be repaired instead of replaced?",
        a: "Yes! Over 90% of inverter PCB failures are caused by burnt SMPS diodes or IPM modules which can be repaired at a fraction of mainboard replacement cost.",
      },
    ],
    seoTitle:
      "Blue Star Inverter AC PCB: Inverter Drive Phase Voltage Unbalance Fix #47 | Prime Cool",
    seoDesc:
      "Component-level repair for Blue Star inverter AC PCBs in Pune & MIDC industrial parks. Specialist in Inverter Drive Phase Voltage Unbalance Fix.",
  },
  "pcb-lg-pcb-heatsink-compound-repasting---descaling-48": {
    slug: "pcb-lg-pcb-heatsink-compound-repasting---descaling-48",
    title: "LG Inverter AC PCB: PCB Heatsink Compound Repasting & Descaling #48",
    category: "industrial",
    tagline: "Precision component-level electronics repair for LG inverter AC & VRF mainboards.",
    description:
      "Professional PCB electronics repair for LG inverter air conditioners. Includes pcb heatsink compound repasting & descaling, oscilloscope signal analysis, SMD diode replacement, and high-voltage capacitor testing.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "Component-level SMD IC and diode replacement",
      "Thermal compound repasting & heatsink cleaning",
      "24-Hour continuous load bench testing",
    ],
    process: [
      "Diagnostic isolation of high voltage DC bus vs low voltage logic rail",
      "Component desoldering using ESD-safe rework station",
      "Replacement with OEM rated capacitors and IGBT modules",
      "Coating mainboard with conformal moisture isolation resin",
    ],
    faqs: [
      {
        q: "Can a burnt LG PCB be repaired instead of replaced?",
        a: "Yes! Over 90% of inverter PCB failures are caused by burnt SMPS diodes or IPM modules which can be repaired at a fraction of mainboard replacement cost.",
      },
    ],
    seoTitle: "LG Inverter AC PCB: PCB Heatsink Compound Repasting & Descaling #48 | Prime Cool",
    seoDesc:
      "Component-level repair for LG inverter AC PCBs in Pune & MIDC industrial parks. Specialist in PCB Heatsink Compound Repasting & Descaling.",
  },
  "pcb-hitachi-surge-varistor-mov-overvoltage-protection-fix-49": {
    slug: "pcb-hitachi-surge-varistor-mov-overvoltage-protection-fix-49",
    title: "Hitachi Inverter AC PCB: Surge Varistor MOV Overvoltage Protection Fix #49",
    category: "industrial",
    tagline:
      "Precision component-level electronics repair for Hitachi inverter AC & VRF mainboards.",
    description:
      "Professional PCB electronics repair for Hitachi inverter air conditioners. Includes surge varistor mov overvoltage protection fix, oscilloscope signal analysis, SMD diode replacement, and high-voltage capacitor testing.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "Component-level SMD IC and diode replacement",
      "Thermal compound repasting & heatsink cleaning",
      "24-Hour continuous load bench testing",
    ],
    process: [
      "Diagnostic isolation of high voltage DC bus vs low voltage logic rail",
      "Component desoldering using ESD-safe rework station",
      "Replacement with OEM rated capacitors and IGBT modules",
      "Coating mainboard with conformal moisture isolation resin",
    ],
    faqs: [
      {
        q: "Can a burnt Hitachi PCB be repaired instead of replaced?",
        a: "Yes! Over 90% of inverter PCB failures are caused by burnt SMPS diodes or IPM modules which can be repaired at a fraction of mainboard replacement cost.",
      },
    ],
    seoTitle:
      "Hitachi Inverter AC PCB: Surge Varistor MOV Overvoltage Protection Fix #49 | Prime Cool",
    seoDesc:
      "Component-level repair for Hitachi inverter AC PCBs in Pune & MIDC industrial parks. Specialist in Surge Varistor MOV Overvoltage Protection Fix.",
  },
  "pcb-carrier-ipm-module-igbt-transistor-switching-repair-50": {
    slug: "pcb-carrier-ipm-module-igbt-transistor-switching-repair-50",
    title: "Carrier Inverter AC PCB: IPM Module IGBT Transistor Switching Repair #50",
    category: "industrial",
    tagline:
      "Precision component-level electronics repair for Carrier inverter AC & VRF mainboards.",
    description:
      "Professional PCB electronics repair for Carrier inverter air conditioners. Includes ipm module igbt transistor switching repair, oscilloscope signal analysis, SMD diode replacement, and high-voltage capacitor testing.",
    priceEstimate: "Starts from ₹1,499 + Spares",
    features: [
      "Oscilloscope PWM signal waveform analysis",
      "Component-level SMD IC and diode replacement",
      "Thermal compound repasting & heatsink cleaning",
      "24-Hour continuous load bench testing",
    ],
    process: [
      "Diagnostic isolation of high voltage DC bus vs low voltage logic rail",
      "Component desoldering using ESD-safe rework station",
      "Replacement with OEM rated capacitors and IGBT modules",
      "Coating mainboard with conformal moisture isolation resin",
    ],
    faqs: [
      {
        q: "Can a burnt Carrier PCB be repaired instead of replaced?",
        a: "Yes! Over 90% of inverter PCB failures are caused by burnt SMPS diodes or IPM modules which can be repaired at a fraction of mainboard replacement cost.",
      },
    ],
    seoTitle:
      "Carrier Inverter AC PCB: IPM Module IGBT Transistor Switching Repair #50 | Prime Cool",
    seoDesc:
      "Component-level repair for Carrier inverter AC PCBs in Pune & MIDC industrial parks. Specialist in IPM Module IGBT Transistor Switching Repair.",
  },
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
