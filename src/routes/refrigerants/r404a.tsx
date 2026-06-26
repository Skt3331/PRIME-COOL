import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { R404aPtView } from "../../components/resources/GuideViews";

export const Route = createFileRoute("/refrigerants/r404a")({
  component: () => (
    <ResourceLayout title="R404A PT Chart Reference" category="Refrigerants">
      <R404aPtView />
    </ResourceLayout>
  ),
});
