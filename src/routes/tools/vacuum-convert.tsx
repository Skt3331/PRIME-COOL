import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { VacuumConvertView } from "../../components/resources/CalculatorViews";

export const Route = createFileRoute("/tools/vacuum-convert")({
  component: () => (
    <ResourceLayout title="Vacuum Conversion Calculator" category="Calculators">
      <VacuumConvertView />
    </ResourceLayout>
  ),
});
