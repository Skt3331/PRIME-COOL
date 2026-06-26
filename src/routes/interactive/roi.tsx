import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { RoiCalculatorView } from "../../components/resources/InteractiveViews";

export const Route = createFileRoute("/interactive/roi")({
  component: () => (
    <ResourceLayout title="HVAC ROI Calculator" category="Interactive Tools">
      <RoiCalculatorView />
    </ResourceLayout>
  ),
});
