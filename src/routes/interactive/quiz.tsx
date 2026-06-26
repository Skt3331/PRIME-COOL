import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { HvacQuizView } from "../../components/resources/InteractiveViews";

export const Route = createFileRoute("/interactive/quiz")({
  component: () => (
    <ResourceLayout title="HVAC/R Quiz" category="Interactive Tools">
      <HvacQuizView />
    </ResourceLayout>
  ),
});
