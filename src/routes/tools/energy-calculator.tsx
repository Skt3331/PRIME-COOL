import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { EnergyCalculatorView } from "../../components/resources/CalculatorViews";

export const Route = createFileRoute("/tools/energy-calculator")({
  component: () => (
    <ResourceLayout title="Energy Consumption Calculator" category="Calculators">
      <EnergyCalculatorView />
    </ResourceLayout>
  ),
});
