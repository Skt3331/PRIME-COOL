import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { R134aPtView } from "../../components/resources/GuideViews";

export const Route = createFileRoute("/refrigerants/r134a")({
  component: () => (
    <ResourceLayout title="R134a PT Chart Reference" category="Refrigerants">
      <R134aPtView />
    </ResourceLayout>
  ),
});
