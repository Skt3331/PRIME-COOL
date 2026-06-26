import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { RefrigerationFormulasView } from "../../components/resources/GuideViews";

export const Route = createFileRoute("/formulas/refrigeration")({
  component: () => (
    <ResourceLayout title="Refrigeration Formulas Reference" category="Formulas & Reference">
      <RefrigerationFormulasView />
    </ResourceLayout>
  ),
});
