import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { CostEstimatorView } from "../../components/resources/InteractiveViews";

export const Route = createFileRoute("/interactive/cost-estimator")({
  component: () => (
    <ResourceLayout title="AC Installation Cost Estimator" category="Interactive Tools">
      <CostEstimatorView />
    </ResourceLayout>
  ),
});
