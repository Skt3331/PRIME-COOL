import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { RefrigerantPressuresChartView } from "../../components/resources/GuideViews";

export const Route = createFileRoute("/guides/refrigerant-pressures-chart")({
  head: () => ({
    meta: [
      { title: "Refrigerant Pressures & Vacuum Micron Chart: R32, R404A, R407C" },
      {
        name: "description",
        content:
          "Detailed R32, R404A, and R407C pressure-temperature reference. Learn how to convert SEER to EER/COP, diagnose high head pressure, and convert vacuum microns.",
      },
    ],
  }),
  component: () => (
    <ResourceLayout
      title="Refrigerant Operating Pressures & Vacuum Micron Chart"
      category="Troubleshooting Guides"
    >
      <RefrigerantPressuresChartView />
    </ResourceLayout>
  ),
});
