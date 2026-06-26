import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { ShortCyclingView } from "../../components/resources/GuideViews";

export const Route = createFileRoute("/guides/short-cycling")({
  component: () => (
    <ResourceLayout title="Compressor Short Cycling" category="Troubleshooting Guides">
      <ShortCyclingView />
    </ResourceLayout>
  ),
});
