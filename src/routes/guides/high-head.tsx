import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { HighHeadView } from "../../components/resources/GuideViews";

export const Route = createFileRoute("/guides/high-head")({
  component: () => (
    <ResourceLayout title="High Head Pressure Causes" category="Troubleshooting Guides">
      <HighHeadView />
    </ResourceLayout>
  ),
});
