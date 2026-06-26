import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { PipeSizingView } from "../../components/resources/CalculatorViews";

export const Route = createFileRoute("/tools/pipe-sizing")({
  component: () => (
    <ResourceLayout title="Pipe Sizing Calculator" category="Calculators">
      <PipeSizingView />
    </ResourceLayout>
  ),
});
