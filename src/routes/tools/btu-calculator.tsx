import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { BtuCalculatorView } from "../../components/resources/CalculatorViews";

export const Route = createFileRoute("/tools/btu-calculator")({
  component: () => (
    <ResourceLayout title="BTU Load Calculator" category="Calculators">
      <BtuCalculatorView />
    </ResourceLayout>
  ),
});
