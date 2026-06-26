import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { SuperheatCalculatorView } from "../../components/resources/CalculatorViews";

export const Route = createFileRoute("/tools/superheat-calculator")({
  component: () => (
    <ResourceLayout title="Superheat Calculator" category="Calculators">
      <SuperheatCalculatorView />
    </ResourceLayout>
  ),
});
