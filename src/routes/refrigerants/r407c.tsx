import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { R407cPtView } from "../../components/resources/GuideViews";

export const Route = createFileRoute("/refrigerants/r407c")({
  component: () => (
    <ResourceLayout title="R407C PT Chart Reference" category="Refrigerants">
      <R407cPtView />
    </ResourceLayout>
  ),
});
