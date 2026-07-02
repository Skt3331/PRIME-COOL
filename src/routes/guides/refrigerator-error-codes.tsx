import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { RefrigeratorErrorCodesView } from "../../components/resources/GuideViews";

export const Route = createFileRoute("/guides/refrigerator-error-codes")({
  head: () => ({
    meta: [
      { title: "Refrigerator Error Codes & Cooling Problems (Haier, Bosch, Godrej) — Prime Cool" },
      {
        name: "description",
        content:
          "Troubleshoot refrigerator cooling problems and error codes for Haier, Bosch, Godrej, LG, and Samsung. Learn how to diagnose failed start capacitors, fans, and sensors.",
      },
    ],
  }),
  component: () => (
    <ResourceLayout
      title="Refrigerator Error Codes & Cooling Problems"
      category="Troubleshooting Guides"
    >
      <RefrigeratorErrorCodesView />
    </ResourceLayout>
  ),
});
