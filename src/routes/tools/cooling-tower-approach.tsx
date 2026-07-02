import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { CoolingTowerApproachView } from "../../components/resources/CalculatorViews";

export const Route = createFileRoute("/tools/cooling-tower-approach")({
  head: () => ({
    meta: [
      { title: "Cooling Tower Approach Sizer & Calculator — Prime Cool" },
      {
        name: "description",
        content:
          "Calculate cooling tower approach temperature, range, and thermal effectiveness. Optimize cooling tower performance with our interactive sizer tool.",
      },
    ],
  }),
  component: () => (
    <ResourceLayout title="Cooling Tower Approach Sizer" category="Calculators">
      <CoolingTowerApproachView />
    </ResourceLayout>
  ),
});
