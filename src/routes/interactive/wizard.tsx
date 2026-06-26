import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { TroubleshootingWizardView } from "../../components/resources/InteractiveViews";

export const Route = createFileRoute("/interactive/wizard")({
  component: () => (
    <ResourceLayout title="Troubleshooting Wizard" category="Interactive Tools">
      <TroubleshootingWizardView />
    </ResourceLayout>
  ),
});
