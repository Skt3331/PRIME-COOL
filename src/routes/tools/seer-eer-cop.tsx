import { createFileRoute } from "@tanstack/react-router";
import { ResourceLayout } from "../../components/resources/ResourceLayout";
import { SeerEerCopView } from "../../components/resources/CalculatorViews";

export const Route = createFileRoute("/tools/seer-eer-cop")({
  head: () => ({
    meta: [
      { title: "SEER to EER & COP Converter & Calculator — Prime Cool" },
      {
        name: "description",
        content:
          "Convert SEER, SEER2, EER, and COP efficiency ratings. Calculate annual energy operating costs and compare heat pump/AC options.",
      },
    ],
  }),
  component: () => (
    <ResourceLayout title="SEER to EER & COP Converter" category="Calculators">
      <SeerEerCopView />
    </ResourceLayout>
  ),
});
