import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { CopEerConverterView } from "../../components/resources/CalculatorViews";

export const Route = createFileRoute("/tools/cop-eer")({
  component: () => (
    <ResourceLayout title="COP & EER Calculator" category="Calculators">
      <CopEerConverterView />
    </ResourceLayout>
  ),
});
