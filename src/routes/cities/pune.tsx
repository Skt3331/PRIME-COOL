import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { PuneServicesView } from "../../components/resources/CityViews";

export const Route = createFileRoute("/cities/pune")({
  component: () => (
    <ResourceLayout title="Refrigeration Services in Pune" category="Local Service Hubs">
      <PuneServicesView />
    </ResourceLayout>
  ),
});
