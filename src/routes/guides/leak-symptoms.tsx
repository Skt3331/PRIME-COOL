import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { LeakSymptomsView } from "../../components/resources/GuideViews";

export const Route = createFileRoute("/guides/leak-symptoms")({
  component: () => (
    <ResourceLayout title="Refrigerant Leak Symptoms" category="Troubleshooting Guides">
      <LeakSymptomsView />
    </ResourceLayout>
  ),
});
