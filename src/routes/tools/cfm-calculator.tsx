import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { CfmCalculatorView } from "../../components/resources/CalculatorViews";

export const Route = createFileRoute("/tools/cfm-calculator")({
  component: () => (
    <ResourceLayout title="Airflow (CFM) Calculator" category="Calculators">
      <CfmCalculatorView />
    </ResourceLayout>
  ),
});
