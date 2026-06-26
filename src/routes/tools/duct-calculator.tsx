import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { DuctCalculatorView } from "../../components/resources/CalculatorViews";

export const Route = createFileRoute("/tools/duct-calculator")({
  component: () => (
    <ResourceLayout title="Duct Size Calculator" category="Calculators">
      <DuctCalculatorView />
    </ResourceLayout>
  ),
});
