import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { RefrigeratorNotCoolingView } from "../../components/resources/GuideViews";

export const Route = createFileRoute("/guides/refrigerator-not-cooling")({
  head: () => ({
    meta: [
      { title: "Refrigerator Not Cooling: Haier, Bosch & Godrej Fault Fixes" },
      {
        name: "description",
        content:
          "Troubleshoot Godrej refrigerator cooling problems, Bosch sensor or control board failure, and Haier refrigerator compressor start click-outs.",
      },
    ],
  }),
  component: () => (
    <ResourceLayout
      title="Refrigerator Not Cooling: Haier, Bosch & Godrej Diagnostics"
      category="Troubleshooting Guides"
    >
      <RefrigeratorNotCoolingView />
    </ResourceLayout>
  ),
});
