import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { SubcoolingCalculatorView } from "../../components/resources/CalculatorViews";

export const Route = createFileRoute("/tools/subcooling-calculator")({
  component: () => (
    <ResourceLayout title="Subcooling Calculator" category="Calculators">
      <SubcoolingCalculatorView />
    </ResourceLayout>
  ),
});
