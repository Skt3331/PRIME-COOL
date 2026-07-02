import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { AirVelocityView } from "../../components/resources/CalculatorViews";

export const Route = createFileRoute("/tools/air-velocity")({
  component: () => (
    <ResourceLayout title="Duct Air Velocity Calculator" category="Calculators">
      <AirVelocityView />
    </ResourceLayout>
  ),
});
