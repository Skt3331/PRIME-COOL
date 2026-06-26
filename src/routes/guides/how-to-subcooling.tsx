import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { HowToSubcoolingView } from "../../components/resources/GuideViews";

export const Route = createFileRoute("/guides/how-to-subcooling")({
  component: () => (
    <ResourceLayout title="How To Measure Subcooling" category="Troubleshooting Guides">
      <HowToSubcoolingView />
    </ResourceLayout>
  ),
});
