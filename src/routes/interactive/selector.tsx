import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { RefrigerantSelectorView } from "../../components/resources/InteractiveViews";

export const Route = createFileRoute("/interactive/selector")({
  component: () => (
    <ResourceLayout title="Refrigerant Selector" category="Interactive Tools">
      <RefrigerantSelectorView />
    </ResourceLayout>
  ),
});
