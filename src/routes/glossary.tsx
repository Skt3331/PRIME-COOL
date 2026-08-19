import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ResourceLayout } from "../components/resources/ResourceLayout";
import { BookOpen, Search } from "lucide-react";

export const Route = createFileRoute("/glossary")({
  head: () => ({
    meta: [
      { title: "HVAC & Refrigeration Technical Glossary | A-Z Terms | Prime Cool" },
      {
        name: "description",
        content:
          "Comprehensive dictionary of HVAC, thermodynamic, and mechanical refrigeration terms including accumulator, superheat, COP, VRF, subcooling, and chiller approach temperatures.",
      },
      { property: "og:title", content: "HVAC & Refrigeration Technical Glossary | A-Z Terms | Prime Cool" },
      { property: "og:description", content: "Comprehensive dictionary of HVAC, thermodynamic, and mechanical refrigeration terms." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://primecool.in/glossary" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "DefinedTermSet",
          name: "Prime Cool Technical HVAC Glossary",
          url: "https://primecool.in/glossary",
          description: "A-Z technical dictionary of heating, ventilation, air conditioning, and refrigeration concepts.",
        }),
      },
    ],
  }),
  component: GlossaryPage,
});

interface Term {
  term: string;
  def: string;
}

const glossaryTerms: Term[] = [
  {
    term: "Accumulator",
    def: "A safety vessel placed on the suction line before the compressor to trap liquid refrigerant and prevent it from entering the crankcase.",
  },
  {
    term: "Approach Temperature",
    def: "The difference between the leaving fluid temperature and the saturation temperature of the refrigerant inside the heat exchanger. Lower approach indicates higher heat transfer efficiency.",
  },
  {
    term: "Azeotrope",
    def: "A liquid mixture of two or more substances (like R502) that retains its composition and boiling point during distillation, behaving like a single refrigerant.",
  },
  {
    term: "BTU (British Thermal Unit)",
    def: "The quantity of heat required to raise the temperature of one pound of liquid water by one degree Fahrenheit.",
  },
  {
    term: "Capillary Tube",
    def: "A simple metering device consisting of a long copper tube with a tiny inside diameter, restricting refrigerant flow by friction pressure drop.",
  },
  {
    term: "Centrifugal Compressor",
    def: "A dynamic compressor that increases pressure by accelerating refrigerant vapor through an impeller and converting kinetic energy to static pressure.",
  },
  {
    term: "Chiller barrel",
    def: "A shell-and-tube or plate heat exchanger where chilled water is cooled by evaporating liquid refrigerant.",
  },
  {
    term: "Coefficient of Performance (COP)",
    def: "The ratio of heating or cooling capacity produced to the electrical energy consumed. High COP denotes high efficiency.",
  },
  {
    term: "Compression Ratio",
    def: "The ratio of absolute discharge pressure (head pressure + atmospheric) to absolute suction pressure (suction pressure + atmospheric).",
  },
  {
    term: "Condenser",
    def: "A heat exchanger where high-pressure refrigerant vapor rejects heat to water or air and condenses into a liquid state.",
  },
  {
    term: "Contactor",
    def: "An electrical relay switch used to supply high-voltage current to the compressor and condenser fan motors when signaled by the thermostat.",
  },
  {
    term: "Crankcase Heater",
    def: "An electrical heating element placed around the compressor base to boil off refrigerant dissolved in the lubrication oil during off-cycles.",
  },
  {
    term: "Delta T (ΔT)",
    def: "The difference in temperature between two measured points, such as air entering vs. leaving an evaporator coil.",
  },
  {
    term: "Dew Point",
    def: "The temperature at which air becomes saturated with moisture (100% relative humidity) and water vapor begins to condense into liquid droplets.",
  },
  {
    term: "Dry Bulb Temperature",
    def: "The ambient air temperature measured by a standard thermometer shielded from radiation and moisture.",
  },
  {
    term: "Ductwork",
    def: "A network of metal, plastic, or fiberglass conduits used to distribute conditioned supply air and return air throughout a building.",
  },
  {
    term: "EER (Energy Efficiency Ratio)",
    def: "The cooling capacity in BTU/h divided by the electrical power input in Watts at specific rating conditions.",
  },
  {
    term: "Evaporator",
    def: "A heat exchanger inside the conditioned space where low-pressure liquid refrigerant absorbs heat and boils into a vapor.",
  },
  {
    term: "Expansion Valve (TXV)",
    def: "A control valve that regulates the mass flow of refrigerant into the evaporator based on suction line superheat.",
  },
  {
    term: "Filter Drier",
    def: "A dual-purpose refrigeration accessory containing desiccant core materials to absorb moisture and filter debris from the liquid line.",
  },
  {
    term: "Glide",
    def: "The temperature difference between the bubble point and dew point of a zeotropic refrigerant blend at a constant pressure.",
  },
  {
    term: "GWP (Global Warming Potential)",
    def: "A measure of how much heat a greenhouse gas traps in the atmosphere relative to carbon dioxide (GWP of 1).",
  },
  {
    term: "Hermetic Compressor",
    def: "A compressor where the motor and pump are welded inside a single gas-tight steel shell, preventing shaft seal leaks.",
  },
  {
    term: "HFC (Hydrofluorocarbon)",
    def: "Refrigerants composed of hydrogen, fluorine, and carbon (such as R134a, R32, R410A) with zero ozone depletion potential.",
  },
  {
    term: "HCFC (Hydrochlorofluorocarbon)",
    def: "Refrigerants containing chlorine, fluorine, carbon, and hydrogen (such as R22) being phased out globally due to ozone layer damage.",
  },
  {
    term: "HFO (Hydrofluoroolefin)",
    def: "Modern low-GWP refrigerants (like R1234yf) derived from unsaturated organic compounds.",
  },
  {
    term: "Hygroscopic",
    def: "The property of absorbing moisture from the surrounding air. Synthetic POE oils are highly hygroscopic.",
  },
  {
    term: "Latent Heat",
    def: "Heat energy absorbed or released during a phase change (like boiling or condensing) at constant temperature.",
  },
  {
    term: "Liquid Line",
    def: "The copper tube carrying high-pressure liquid refrigerant from the condenser outlet to the metering device.",
  },
  {
    term: "Manifold Gauge Set",
    def: "A service tool consisting of high and low pressure gauges, valves, and hoses used to diagnose and charge systems.",
  },
  {
    term: "Micron",
    def: "A unit of length equal to one-millionth of a meter. Used to measure vacuum pressure (760,000 microns = atmospheric pressure).",
  },
  {
    term: "Non-Condensable Gases",
    def: "Gases like air, nitrogen, or oxygen that do not liquefy in the condenser, raising system pressure and reducing efficiency.",
  },
  {
    term: "Oil Separator",
    def: "A mechanical filter on the compressor discharge line that extracts oil and returns it to the crankcase, keeping coils clean.",
  },
  {
    term: "Psychrometrics",
    def: "The study of the thermodynamic properties of moist air (humidity, wet bulb, enthalpy, dew point).",
  },
  {
    term: "R32",
    def: "A low-GWP, mildly flammable HFC refrigerant used in residential split systems.",
  },
  {
    term: "R134a",
    def: "A medium-pressure HFC refrigerant widely used in automotive air conditioning and domestic refrigerators.",
  },
  {
    term: "R410A",
    def: "A high-pressure near-azeotropic HFC blend (R32/R125) widely used in residential split air conditioners.",
  },
  {
    term: "Refrigerant",
    def: "A thermodynamic fluid that cycle-evaporates at low temperature/pressure and condenses at high temperature/pressure to transfer heat.",
  },
  {
    term: "Sensible Heat",
    def: "Heat energy that causes a change in dry bulb temperature of a substance without a change of state.",
  },
  {
    term: "Short Cycling",
    def: "A fault condition where the compressor starts and stops in rapid succession, causing electrical and thermal stress.",
  },
  {
    term: "Slugging",
    def: "A destructive condition where liquid refrigerant or oil enters the compressor cylinders, causing mechanical valve failure.",
  },
  {
    term: "Subcooling",
    def: "The difference between the saturated condensing temperature and the actual temperature of the liquid refrigerant leaving the condenser.",
  },
  {
    term: "Suction Line",
    def: "The insulated copper line carrying low-pressure vapor refrigerant from the evaporator outlet to the compressor suction port.",
  },
  {
    term: "Superheat",
    def: "The temperature difference between the actual vapor temperature leaving the evaporator and its saturated vapor temperature.",
  },
  {
    term: "Ton of Refrigeration",
    def: "A unit of cooling capacity equivalent to the heat extraction rate required to melt 1 short ton (2000 lbs) of ice in 24 hours (12,000 BTU/h).",
  },
  {
    term: "Vacuum Pump",
    def: "A mechanical pump used to evacuate air and moisture from a refrigeration circuit before charging.",
  },
  {
    term: "Wet Bulb Temperature",
    def: "The temperature measured by a thermometer bulb covered with a water-saturated wick under airflow, indicating evaporative cooling capacity.",
  },
  {
    term: "Zeotrope",
    def: "A refrigerant blend (like R407C) composed of multiple components with different boiling points, resulting in temperature glide.",
  },
];

export function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWZ".split("");

  const filteredTerms = glossaryTerms.filter((item) => {
    const matchesSearch =
      item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.def.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLetter = selectedLetter
      ? item.term.toUpperCase().startsWith(selectedLetter)
      : true;

    return matchesSearch && matchesLetter;
  });

  return (
    <ResourceLayout title="Glossary" category="Reference">
      <div className="space-y-6">
        <div className="space-y-2 border-b border-border/40 pb-2">
          <h1 className="text-3xl font-bold font-display text-foreground flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span>HVAC/R Technical Glossary</span>
          </h1>
          <p className="text-xs text-muted-foreground">
            A comprehensive definitions index containing essential thermodynamic, mechanical, and
            technician field terms.
          </p>
        </div>

        {/* Search and Letter Filters */}
        <div className="space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search definitions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-border bg-background/50 pl-10 pr-4 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="flex flex-wrap gap-1 border-b border-border/20 pb-3">
            <button
              onClick={() => setSelectedLetter(null)}
              className={`px-2.5 py-1 rounded text-[10px] font-mono border transition ${
                selectedLetter === null
                  ? "bg-primary/20 border-primary text-primary"
                  : "border-border/60 hover:bg-card text-muted-foreground"
              }`}
            >
              ALL
            </button>
            {letters.map((char) => {
              const hasTerms = glossaryTerms.some((t) => t.term.toUpperCase().startsWith(char));
              return (
                <button
                  key={char}
                  disabled={!hasTerms}
                  onClick={() => setSelectedLetter(char)}
                  className={`w-6 h-6 flex items-center justify-center rounded text-[10px] font-mono border transition ${
                    !hasTerms
                      ? "opacity-30 cursor-not-allowed border-transparent text-muted-foreground"
                      : selectedLetter === char
                        ? "bg-primary/20 border-primary text-primary font-bold"
                        : "border-border/60 hover:bg-card text-muted-foreground"
                  }`}
                >
                  {char}
                </button>
              );
            })}
          </div>
        </div>

        {/* Glossary Terms Listing */}
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
          {filteredTerms.length > 0 ? (
            filteredTerms.map((item, idx) => (
              <div key={idx} className="border-b border-border/20 pb-3 space-y-1">
                <h3 className="font-bold text-foreground text-sm font-display tracking-tight flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>{item.term}</span>
                </h3>
                <p className="text-xs text-muted-foreground leading-normal pl-3">{item.def}</p>
              </div>
            ))
          ) : (
            <p className="text-xs text-muted-foreground py-4 text-center">
              No terms found matching filters.
            </p>
          )}
        </div>
      </div>
    </ResourceLayout>
  );
}
