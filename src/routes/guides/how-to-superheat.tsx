import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { HowToSuperheatView } from "../../components/resources/GuideViews";

export const Route = createFileRoute("/guides/how-to-superheat")({
  component: () => (
    <ResourceLayout title="How To Check Superheat" category="Troubleshooting Guides">
      <HowToSuperheatView />
    </ResourceLayout>
  ),
});
