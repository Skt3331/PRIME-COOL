import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { AcGasChargingView } from "../../components/resources/GuideViews";

export const Route = createFileRoute("/guides/ac-gas-charging")({
  head: () => ({
    meta: [
      { title: "AC Gas Charging Pressures & Operating Guide (R32, R410A, R404A) — Prime Cool" },
      {
        name: "description",
        content:
          "Complete AC gas charging pressure reference. Operating pressures, suction/discharge pressures, and charging guidelines for R32, R410A, R22, R404A, and R407C.",
      },
    ],
  }),
  component: () => (
    <ResourceLayout title="AC Gas Charging Pressures Guide" category="Troubleshooting Guides">
      <AcGasChargingView />
    </ResourceLayout>
  ),
});
