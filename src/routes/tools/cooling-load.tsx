import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { CoolingLoadView } from "../../components/resources/CalculatorViews";

export const Route = createFileRoute("/tools/cooling-load")({
  component: () => (
    <ResourceLayout title="Cooling Load Calculator" category="Calculators">
      <CoolingLoadView />
    </ResourceLayout>
  ),
});
