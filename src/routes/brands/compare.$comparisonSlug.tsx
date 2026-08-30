import { createFileRoute, Link } from "@tanstack/react-router";
import { brandsData } from "../../lib/brands-data";
import { getCmsSettings } from "../../lib/api";
import logo from "../../assets/logo.webp";
import {
  ArrowLeft,
  Phone,
  Calendar,
  Star,
  CheckCircle,
  XCircle,
  Info,
  Landmark,
  HelpCircle,
  Layers,
} from "lucide-react";

// Comparative metadata for popular brands
const COMPARISON_METRICS: Record<
  string,
  { rating: number; partsCost: string; tropicalLimit: string; specialty: string }
> = {
  daikin: {
    rating: 4.8,
    partsCost: "Medium-High",
    tropicalLimit: "50°C",
    specialty: "Patented Swing Compressors & Inverter efficiency",
  },
  carrier: {
    rating: 4.7,
    partsCost: "Medium-Low",
    tropicalLimit: "52°C",
    specialty: "Heavy-duty outdoor condensers & robust coil sizing",
  },
  hitachi: {
    rating: 4.6,
    partsCost: "High",
    tropicalLimit: "50°C",
    specialty: "Expandable inverter and relative humidity controls",
  },
  "o-general": {
    rating: 4.9,
    partsCost: "High",
    tropicalLimit: "55°C",
    specialty: "Hyper-tropical compressor torque and build longevity",
  },
  voltas: {
    rating: 4.5,
    partsCost: "Low (Readily Available)",
    tropicalLimit: "48°C",
    specialty: "Mass market reliability, affordable maintenance",
  },
  "mitsubishi-electric": {
    rating: 4.8,
    partsCost: "High",
    tropicalLimit: "52°C",
    specialty: "Ultra-quiet operations (19 dBA) and pristine PCBs",
  },
  "mitsubishi-heavy": {
    rating: 4.9,
    partsCost: "High",
    tropicalLimit: "54°C",
    specialty: "Heavy commercial durability & high CFM airflow",
  },
  lg: {
    rating: 4.6,
    partsCost: "Medium",
    tropicalLimit: "48°C",
    specialty: "Dual-inverter compressor systems & Smart diagnosis",
  },
  samsung: {
    rating: 4.4,
    partsCost: "Medium",
    tropicalLimit: "48°C",
    specialty: "SmartThings integration & wind-free cooling grids",
  },
  godrej: {
    rating: 4.3,
    partsCost: "Low",
    tropicalLimit: "46°C",
    specialty: "Budget eco-friendly cooling designs",
  },
  whirlpool: {
    rating: 4.3,
    partsCost: "Medium-Low",
    tropicalLimit: "46°C",
    specialty: "6th Sense cooling intelligence loops",
  },
  haier: {
    rating: 4.4,
    partsCost: "Medium-Low",
    tropicalLimit: "48°C",
    specialty: "Self-clean frosting/descaling evaporator tech",
  },
  panasonic: {
    rating: 4.7,
    partsCost: "Medium-High",
    tropicalLimit: "50°C",
    specialty: "nanoe-G air purification and eco-sensors",
  },
  "blue-star": {
    rating: 4.6,
    partsCost: "Medium",
    tropicalLimit: "50°C",
    specialty: "Precision temperature control for offices",
  },
  lloyd: {
    rating: 4.4,
    partsCost: "Medium-Low",
    tropicalLimit: "48°C",
    specialty: "Rapid cooling features, Havells parent support",
  },
};

export const Route = createFileRoute("/brands/compare/$comparisonSlug")({
  loader: async ({ params }) => {
    const parts = params.comparisonSlug.toLowerCase().split("-vs-");
    const slug1 = parts[0] || "carrier";
    const slug2 = parts[1] || "hitachi";

    const brandOne = brandsData[slug1] || {
      slug: slug1,
      name: slug1.toUpperCase(),
      faults: [],
      spares: [],
      maintenance: [],
      warranty: "",
      errorCodes: [],
    };
    const brandTwo = brandsData[slug2] || {
      slug: slug2,
      name: slug2.toUpperCase(),
      faults: [],
      spares: [],
      maintenance: [],
      warranty: "",
      errorCodes: [],
    };

    const statsOne = COMPARISON_METRICS[slug1] || {
      rating: 4.5,
      partsCost: "Medium",
      tropicalLimit: "48°C",
      specialty: "Comfort cooling applications",
    };
    const statsTwo = COMPARISON_METRICS[slug2] || {
      rating: 4.5,
      partsCost: "Medium",
      tropicalLimit: "48°C",
      specialty: "Comfort cooling applications",
    };

    const { settings } = await getCmsSettings();
    return {
      brandOne,
      brandTwo,
      statsOne,
      statsTwo,
      cms: settings,
      comparisonSlug: params.comparisonSlug,
    };
  },
  head: ({ loaderData }) => {
    const brandOne = loaderData?.brandOne;
    const brandTwo = loaderData?.brandTwo;
    if (!brandOne || !brandTwo) return { meta: [] };
    const pageTitle = `${brandOne.name} vs ${brandTwo.name}: Which AC/Appliance is Better?`;
    const pageDesc = `Detailed comparison between ${brandOne.name} and ${brandTwo.name}. Check summer cooling capability, spare parts replacement costs, and user ratings.`;
    return {
      meta: [
        { title: pageTitle },
        { name: "description", content: pageDesc },
        { property: "og:title", content: pageTitle },
        { property: "og:description", content: pageDesc },
      ],
      links: [
        {
          rel: "canonical",
          href: `https://primecool.in/brands/compare/${loaderData.comparisonSlug}`,
        },
      ],
    };
  },
  component: BrandComparisonPage,
});

function BrandComparisonPage() {
  const { brandOne, brandTwo, statsOne, statsTwo, cms } = Route.useLoaderData();
  const socials = cms?.socials || {};
  const phone = socials.phone || "+917507408461";

  // Determine better brand based on ratings
  const betterBrand = statsOne.rating >= statsTwo.rating ? brandOne : brandTwo;

  return (
    <div className="min-h-screen text-foreground flex flex-col justify-between bg-slate-950">
      {/* Background gradients */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,color-mix(in_oklab,var(--electric)_8%,transparent),transparent_60%)] pointer-events-none" />

      {/* Main Container */}
      <main className="flex-1 pt-6 md:pt-8 pb-20 px-6 max-w-7xl mx-auto w-full relative z-10">
        {/* Breadcrumb */}
        <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary transition">
            Home
          </Link>{" "}
          /{" "}
          <Link to="/resources" className="hover:text-primary transition">
            Resources
          </Link>{" "}
          / <span className="text-foreground font-semibold">Brand Comparison</span>
        </div>

        {/* Hero Segment */}
        <div className="mb-10 space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary font-mono uppercase">
            <Layers className="h-3.5 w-3.5" />
            <span>OEM Comparative Analytics</span>
          </div>

          <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight text-white">
            {brandOne.name} vs <span className="text-gradient">{brandTwo.name}</span>
          </h1>

          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Comparing Summer Performance, Reliability Index, Replacement Spares Cost, and Technical
            Reliability thresholds for Indian weather.
          </p>
        </div>

        {/* Head-to-Head Comparison Matrix */}
        <div className="border border-border/80 bg-slate-900/40 p-6 rounded-2xl mb-10 shadow-xl backdrop-blur-md">
          <h3 className="font-display font-bold text-lg text-white mb-6 text-center">
            Comparison Summary
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="border-b border-border/60">
                  <th className="py-3 px-4 font-semibold text-muted-foreground">Parameter</th>
                  <th className="py-3 px-4 font-semibold text-primary">{brandOne.name}</th>
                  <th className="py-3 px-4 font-semibold text-gradient">{brandTwo.name}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20 text-muted-foreground">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-foreground">Reliability Rating</td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                      <span className="font-bold text-foreground">{statsOne.rating} / 5.0</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                      <span className="font-bold text-foreground">{statsTwo.rating} / 5.0</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-foreground">Tropical Limit (°C)</td>
                  <td className="py-3.5 px-4 text-foreground font-mono">
                    {statsOne.tropicalLimit}
                  </td>
                  <td className="py-3.5 px-4 text-foreground font-mono">
                    {statsTwo.tropicalLimit}
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-foreground">Spare Parts Cost</td>
                  <td className="py-3.5 px-4 font-medium">{statsOne.partsCost}</td>
                  <td className="py-3.5 px-4 font-medium">{statsTwo.partsCost}</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-foreground">Core Competence</td>
                  <td className="py-3.5 px-4 leading-relaxed">{statsOne.specialty}</td>
                  <td className="py-3.5 px-4 leading-relaxed">{statsTwo.specialty}</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-foreground">Standard Warranty</td>
                  <td className="py-3.5 px-4 leading-relaxed">
                    {brandOne.warranty || "1 Year Standard"}
                  </td>
                  <td className="py-3.5 px-4 leading-relaxed">
                    {brandTwo.warranty || "1 Year Standard"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Brand One Breakdown */}
          <div className="border border-border/60 bg-slate-900/20 p-6 rounded-2xl space-y-4">
            <h3 className="font-display font-bold text-lg text-white">
              {brandOne.name} Considerations
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Downtime diagnostics and common repair requests we manage along the industrial
              corridor for {brandOne.name} systems:
            </p>
            <ul className="space-y-2 text-xs text-muted-foreground">
              {brandOne.faults.slice(0, 4).map((f: string, idx: number) => (
                <li key={idx} className="flex gap-2 items-start">
                  <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Brand Two Breakdown */}
          <div className="border border-border/60 bg-slate-900/20 p-6 rounded-2xl space-y-4">
            <h3 className="font-display font-bold text-lg text-white">
              {brandTwo.name} Considerations
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Downtime diagnostics and common repair requests we manage along the industrial
              corridor for {brandTwo.name} systems:
            </p>
            <ul className="space-y-2 text-xs text-muted-foreground">
              {brandTwo.faults.slice(0, 4).map((f: string, idx: number) => (
                <li key={idx} className="flex gap-2 items-start">
                  <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sizing Recommendations Box */}
        <div className="bg-gradient-to-r from-card to-background border border-border rounded-3xl p-6 md:p-10 relative overflow-hidden mb-12">
          <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-primary/15 blur-3xl" />
          <div className="relative space-y-4">
            <h3 className="font-display font-bold text-lg md:text-xl text-white flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" />
              <span>Verdict: Which is better for your case?</span>
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed max-w-3xl">
              If you require a system that withstands extreme voltage fluctuations and has lower
              component replacement costs, **{betterBrand.name}** ranks highly. However, if quiet
              indoor operations and micro-controlled sensor loops are priority, checking model
              specifications is recommended.
            </p>
            <div className="flex gap-3 pt-2">
              <Link
                to="/booking"
                search={{}}
                className="inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-5 py-2.5 text-xs font-semibold hover:opacity-90 transition glow-ring cursor-pointer"
              >
                <Calendar className="h-4 w-4" />
                <span>Schedule Servicing Audits</span>
              </Link>
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-slate-900/60 px-5 py-2.5 text-xs font-semibold hover:bg-card transition cursor-pointer"
              >
                <Phone className="h-4 w-4 text-primary" />
                <span>Consult Saurav Temgire</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/80 py-8 text-center text-xs text-muted-foreground bg-slate-950/80 z-10 relative">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>© {new Date().getFullYear()} Prime Cool — Brand Sizing Comparisons</div>
          <div className="flex gap-4">
            <Link to="/" className="hover:text-primary transition">
              Home
            </Link>
            <Link to="/resources" className="hover:text-primary transition">
              Resources
            </Link>
            <Link to="/booking" className="hover:text-primary transition">
              Inquire Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
