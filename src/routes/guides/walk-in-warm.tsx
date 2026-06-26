import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { WalkInWarmView } from "../../components/resources/GuideViews";

export const Route = createFileRoute("/guides/walk-in-warm")({
  component: () => (
    <ResourceLayout title="Why Is My Walk-In Cooler Warm?" category="Troubleshooting Guides">
      <WalkInWarmView />
    </ResourceLayout>
  ),
});
