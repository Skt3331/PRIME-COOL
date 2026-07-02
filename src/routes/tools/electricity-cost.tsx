import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { ElectricityCostView } from "../../components/resources/CalculatorViews";

export const Route = createFileRoute("/tools/electricity-cost")({
  component: () => (
    <ResourceLayout title="Monthly Power & Bill Cost Calculator" category="Calculators">
      <ElectricityCostView />
    </ResourceLayout>
  ),
});
