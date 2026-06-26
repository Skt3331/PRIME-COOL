import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { PsychrometricView } from "../../components/resources/CalculatorViews";

export const Route = createFileRoute("/tools/psychrometric")({
  component: () => (
    <ResourceLayout title="Psychrometric Calculator" category="Calculators">
      <PsychrometricView />
    </ResourceLayout>
  ),
});
