import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { PtCalculatorView } from "../../components/resources/CalculatorViews";

export const Route = createFileRoute("/tools/pt-calculator")({
  component: () => (
    <ResourceLayout title="Refrigerant Pressure-Temperature Calculator" category="Calculators">
      <PtCalculatorView />
    </ResourceLayout>
  ),
});
