import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { PmChecklistGeneratorView } from "../../components/resources/InteractiveViews";

export const Route = createFileRoute("/interactive/checklist")({
  component: () => (
    <ResourceLayout title="Preventive Maintenance Checklist Generator" category="Interactive Tools">
      <PmChecklistGeneratorView />
    </ResourceLayout>
  ),
});
