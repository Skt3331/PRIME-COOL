import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { AcLeaksGasChargingView } from "../../components/resources/GuideViews";

export const Route = createFileRoute("/guides/ac-leaks-gas-charging")({
  head: () => ({
    meta: [
      { title: "AC Water Leaks & Refrigerant Gas Charging Procedures" },
      {
        name: "description",
        content:
          "Diagnose why your AC is leaking water inside. Read about nitrogen leak checking, deep evacuation, and weight-based gas charging steps.",
      },
    ],
  }),
  component: () => (
    <ResourceLayout
      title="AC Leaking Water & Refrigerant Gas Charging Steps"
      category="Troubleshooting Guides"
    >
      <AcLeaksGasChargingView />
    </ResourceLayout>
  ),
});
