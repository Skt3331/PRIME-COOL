import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { LowSuctionView } from "../../components/resources/GuideViews";

export const Route = createFileRoute("/guides/low-suction")({
  component: () => (
    <ResourceLayout title="Low Suction Pressure Causes" category="Troubleshooting Guides">
      <LowSuctionView />
    </ResourceLayout>
  ),
});
