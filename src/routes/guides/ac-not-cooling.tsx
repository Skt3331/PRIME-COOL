import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { AcNotCoolingView } from "../../components/resources/GuideViews";

export const Route = createFileRoute("/guides/ac-not-cooling")({
  component: () => (
    <ResourceLayout title="AC Not Cooling – 15 Possible Causes" category="Troubleshooting Guides">
      <AcNotCoolingView />
    </ResourceLayout>
  ),
});
