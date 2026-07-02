import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { BrandComparisonsView } from "../../components/resources/GuideViews";

export const Route = createFileRoute("/guides/brand-comparisons")({
  head: () => ({
    meta: [
      { title: "Carrier vs Hitachi vs Daikin vs O General AC: Which is Better?" },
      {
        name: "description",
        content:
          "Detailed comparison of Carrier AC, Hitachi AC, Daikin, Mitsubishi, Voltas and O General AC brands. Compare summer cooling efficiency, spare part costs, and tropical reliability.",
      },
    ],
  }),
  component: () => (
    <ResourceLayout
      title="Carrier vs Hitachi vs O General vs Voltas AC Sizing"
      category="Troubleshooting Guides"
    >
      <BrandComparisonsView />
    </ResourceLayout>
  ),
});
