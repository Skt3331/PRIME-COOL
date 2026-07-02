import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { HvacDesignGuideView } from "../../components/resources/GuideViews";

export const Route = createFileRoute("/guides/hvac-design-guide")({
  head: () => ({
    meta: [
      { title: "HVAC Sizing Sizing: CFM per Ton, Suction Line Sizing & Tower Approach" },
      {
        name: "description",
        content:
          "Engineering guidelines for comfort cooling airflow CFM calculations, copper piping velocity limits, and cooling tower approach definition.",
      },
    ],
  }),
  component: () => (
    <ResourceLayout
      title="CFM per Ton, Piping Sizing & Cooling Tower Sizing"
      category="Troubleshooting Guides"
    >
      <HvacDesignGuideView />
    </ResourceLayout>
  ),
});
