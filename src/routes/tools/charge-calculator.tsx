import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { RefrigerantChargeView } from "../../components/resources/CalculatorViews";

export const Route = createFileRoute("/tools/charge-calculator")({
  component: () => (
    <ResourceLayout title="Refrigerant Charge Calculator" category="Calculators">
      <RefrigerantChargeView />
    </ResourceLayout>
  ),
});
