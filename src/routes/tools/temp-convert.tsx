import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { TempConvertView } from "../../components/resources/CalculatorViews";

export const Route = createFileRoute("/tools/temp-convert")({
  component: () => (
    <ResourceLayout title="Temperature Conversion Tool" category="Calculators">
      <TempConvertView />
    </ResourceLayout>
  ),
});
