import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { VoltageDropView } from "../../components/resources/CalculatorViews";

export const Route = createFileRoute("/tools/voltage-drop")({
  component: () => (
    <ResourceLayout title="Electrical Voltage Drop Sizer" category="Calculators">
      <VoltageDropView />
    </ResourceLayout>
  ),
});
