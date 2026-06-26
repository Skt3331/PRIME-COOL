import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { R410aPtView } from "../../components/resources/GuideViews";

export const Route = createFileRoute("/refrigerants/r410a")({
  component: () => (
    <ResourceLayout title="R410A PT Chart Reference" category="Refrigerants">
      <R410aPtView />
    </ResourceLayout>
  ),
});
