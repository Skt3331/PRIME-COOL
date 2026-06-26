import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { TonnageCalculatorView } from "../../components/resources/CalculatorViews";

export const Route = createFileRoute("/tools/tonnage-calculator")({
  component: () => (
    <ResourceLayout title="AC Tonnage Calculator" category="Calculators">
      <TonnageCalculatorView />
    </ResourceLayout>
  ),
});
