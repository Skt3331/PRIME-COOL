import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { PressureTempConverterView } from "../../components/resources/CalculatorViews";

export const Route = createFileRoute("/tools/pressure-temp")({
  component: () => (
    <ResourceLayout title="Pressure-Temp Converter" category="Calculators">
      <PressureTempConverterView />
    </ResourceLayout>
  ),
});
