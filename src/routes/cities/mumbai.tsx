import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { MumbaiServicesView } from "../../components/resources/CityViews";

export const Route = createFileRoute("/cities/mumbai")({
  component: () => (
    <ResourceLayout title="Refrigeration Services in Mumbai" category="Local Service Hubs">
      <MumbaiServicesView />
    </ResourceLayout>
  ),
});
