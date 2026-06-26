import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { CompressorCapacityView } from "../../components/resources/CalculatorViews";

export const Route = createFileRoute("/tools/compressor-capacity")({
  component: () => (
    <ResourceLayout title="Compressor Capacity Calculator" category="Calculators">
      <CompressorCapacityView />
    </ResourceLayout>
  ),
});
