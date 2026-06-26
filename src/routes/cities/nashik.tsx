import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { NashikServicesView } from "../../components/resources/CityViews";

export const Route = createFileRoute("/cities/nashik")({
  component: () => (
    <ResourceLayout title="Refrigeration Services in Nashik" category="Local Service Hubs">
      <NashikServicesView />
    </ResourceLayout>
  ),
});
