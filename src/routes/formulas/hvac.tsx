import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { HvacFormulasView } from "../../components/resources/GuideViews";

export const Route = createFileRoute("/formulas/hvac")({
  component: () => (
    <ResourceLayout title="HVAC Formulas Reference" category="Formulas & Reference">
      <HvacFormulasView />
    </ResourceLayout>
  ),
});
