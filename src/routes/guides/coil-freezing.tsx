import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { CoilFreezingView } from "../../components/resources/GuideViews";

export const Route = createFileRoute("/guides/coil-freezing")({
  component: () => (
    <ResourceLayout title="Evaporator Coil Freezing Up" category="Troubleshooting Guides">
      <CoilFreezingView />
    </ResourceLayout>
  ),
});
