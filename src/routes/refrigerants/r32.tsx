import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { R32PtView } from "../../components/resources/GuideViews";

export const Route = createFileRoute("/refrigerants/r32")({
  component: () => (
    <ResourceLayout title="R32 PT Chart Reference" category="Refrigerants">
      <R32PtView />
    </ResourceLayout>
  ),
});
