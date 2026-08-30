import { createFileRoute, Link } from "@tanstack/react-router";
import { brandsData } from "../../lib/brands-data";
import { getCmsSettings } from "../../lib/api";
import logo from "../../assets/logo.webp";
import {
  ArrowLeft,
  Phone,
  Calendar,
  Search,
  Wrench,
  ShieldCheck,
  AlertTriangle,
  FileText,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/brands/$slug")({
  loader: async ({ params }) => {
    let brand = brandsData[params.slug];
    if (!brand) {
      const formattedBrand = params.slug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
      brand = {
        name: formattedBrand,
        slug: params.slug.toLowerCase(),
        faults: ["Cooling issues", "Gas leaks", "Compressor failures"],
        spares: ["Capacitors", "PCBs", "Sensors"],
        maintenance: ["Filter cleaning", "Coil washing"],
        warranty: "90 Days on parts",
        errorCodes: [],
      };
    }
    const { settings } = await getCmsSettings();
    return { brand, cms: settings };
  },
  head: ({ loaderData }) => {
    const brand = loaderData?.brand;
    if (!brand) return { meta: [] };
    const pageTitle = `${brand.name} AC Error Codes & Spare Parts Guide — Prime Cool`;
    const pageDesc = `Complete diagnosis guide for ${brand.name} HVAC units. Find common faults, genuine spare parts support, and searchable error code tables.`;
    return {
      meta: [
        { title: pageTitle },
        { name: "description", content: pageDesc },
        { property: "og:title", content: pageTitle },
        { property: "og:description", content: pageDesc },
        { property: "og:type", content: "website" },
      ],
      links: [{ rel: "canonical", href: `https://primecool.in/brands/${brand.slug}` }],
    };
  },
  component: BrandDetailsPage,
});

function BrandDetailsPage() {
  const { brand, cms } = Route.useLoaderData();
  const socials = cms?.socials || {};
  const phone = socials.phone || "+917507408461";

  const [activeTab, setActiveTab] = useState<"diagnostics" | "errors" | "maintenance">(
    "diagnostics",
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredErrors = brand.errorCodes.filter(
    (err: any) =>
      err.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      err.symptom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      err.fix.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `https://primecool.in/brands/${brand.slug}#article`,
        headline: `${brand.name} HVAC Error Codes, Diagnostics & Genuine Spares`,
        description: `Comprehensive troubleshooting manual, searchable fault error codes, and OEM spare parts reference for ${brand.name} air conditioners and refrigeration units.`,
        author: {
          "@type": "Organization",
          name: "Prime Cool",
        },
        publisher: {
          "@type": "Organization",
          name: "Prime Cool",
          logo: {
            "@type": "ImageObject",
            url: "https://primecool.in/logo.png",
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://primecool.in/brands/${brand.slug}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://primecool.in/" },
          { "@type": "ListItem", position: 2, name: "Brands", item: "https://primecool.in/brands" },
          {
            "@type": "ListItem",
            position: 3,
            name: brand.name,
            item: `https://primecool.in/brands/${brand.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen text-foreground flex flex-col justify-between bg-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      {/* Background gradients */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,color-mix(in_oklab,var(--electric)_8%,transparent),transparent_60%)] pointer-events-none" />

      {/* Main Container */}
      <main className="flex-1 pb-20 px-6 max-w-7xl mx-auto w-full relative z-10">
        {/* Breadcrumb */}
        <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary transition">
            Home
          </Link>{" "}
          /{" "}
          <Link to="/resources" className="hover:text-primary transition">
            Resources
          </Link>{" "}
          / <span className="text-foreground font-semibold">{brand.name} Reference</span>
        </div>

        {/* Hero Segment */}
        <div className="mb-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-xs font-semibold text-primary font-mono uppercase">
            <Wrench className="h-3.5 w-3.5" />
            <span>OEM Technical Brand Guide</span>
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight text-gradient">
            {brand.name} HVAC Technical Support
          </h1>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-3xl">
            Check common mechanical faults, searchable error codes, stocked spare parts lists, and
            warranty guidance details for {brand.name} air conditioners and refrigeration compressor
            loops.
          </p>
        </div>

        {/* Tabs navigation */}
        <div className="flex border-b border-border/80 gap-2 mb-8 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab("diagnostics")}
            className={`px-4 py-2 text-sm font-semibold whitespace-nowrap rounded-t-lg transition-colors ${
              activeTab === "diagnostics"
                ? "bg-slate-900 border-x border-t border-border text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Faults & Spares
          </button>
          <button
            onClick={() => setActiveTab("errors")}
            className={`px-4 py-2 text-sm font-semibold whitespace-nowrap rounded-t-lg transition-colors ${
              activeTab === "errors"
                ? "bg-slate-900 border-x border-t border-border text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Error Code Table ({brand.errorCodes.length})
          </button>
          <button
            onClick={() => setActiveTab("maintenance")}
            className={`px-4 py-2 text-sm font-semibold whitespace-nowrap rounded-t-lg transition-colors ${
              activeTab === "maintenance"
                ? "bg-slate-900 border-x border-t border-border text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Maintenance & Warranty
          </button>
        </div>

        {/* Tab contents */}
        <div className="min-h-[300px]">
          {activeTab === "diagnostics" && (
            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* Common Faults */}
              <div className="border border-border/60 bg-slate-900/20 p-6 rounded-2xl space-y-4">
                <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  <span>Common Mechanical Faults</span>
                </h3>
                <ul className="space-y-3">
                  {brand.faults.map((f: string, idx: number) => (
                    <li key={idx} className="flex gap-2 text-xs text-muted-foreground items-start">
                      <span className="text-primary font-mono mt-0.5">•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Spare Parts Stocked */}
              <div className="border border-border/60 bg-slate-900/20 p-6 rounded-2xl space-y-4">
                <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <span>Genuine Spares Stocked</span>
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We stock factory-approved spare parts to ensure high efficiency and fast SLAs.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {brand.spares.map((s: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg border border-border bg-slate-900 text-xs text-foreground font-mono"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "errors" && (
            <div className="space-y-6">
              {/* Search Bar */}
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search error codes (e.g. A6, U4)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-slate-900/80 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                />
              </div>

              {/* Error list */}
              {filteredErrors.length > 0 ? (
                <div className="border border-border rounded-xl overflow-hidden shadow-lg overflow-x-auto">
                  <table className="w-full border-collapse text-left text-xs bg-slate-900/25">
                    <thead>
                      <tr className="bg-slate-900/80 border-b border-border text-muted-foreground font-mono uppercase tracking-wider">
                        <th className="p-4 w-28">Code</th>
                        <th className="p-4 w-72">Symptom</th>
                        <th className="p-4">Action/Fix</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {filteredErrors.map((err: any, idx: number) => (
                        <tr key={idx} className="hover:bg-slate-900/30 transition">
                          <td className="p-4 font-mono font-bold text-primary">{err.code}</td>
                          <td className="p-4 text-foreground font-medium">{err.symptom}</td>
                          <td className="p-4 text-muted-foreground leading-relaxed">{err.fix}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="border border-dashed border-border p-12 text-center text-xs text-muted-foreground">
                  No error codes match your search query. Try another code.
                </div>
              )}
            </div>
          )}

          {activeTab === "maintenance" && (
            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* Maintenance checklist */}
              <div className="border border-border/60 bg-slate-900/20 p-6 rounded-2xl space-y-4">
                <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-primary" />
                  <span>Preventative Maintenance Checklist</span>
                </h3>
                <ul className="space-y-3">
                  {brand.maintenance.map((m: string, idx: number) => (
                    <li key={idx} className="flex gap-2 text-xs text-muted-foreground items-start">
                      <span className="text-emerald-400 font-mono mt-0.5">✓</span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Warranty Card */}
              <div className="border border-border/60 bg-slate-900/20 p-6 rounded-2xl space-y-4">
                <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <span>Warranty Guidance</span>
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{brand.warranty}</p>
                <div className="bg-primary/5 border border-primary/20 p-4 rounded-xl text-xs text-muted-foreground space-y-2">
                  <strong className="text-foreground block">Pro-Tip for System Lifespan:</strong>
                  <span>
                    Always maintain service history logs. Neglecting bi-annual maintenance can void
                    manufacturer warranties on compressor replacements.
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Immediate CTA */}
        <div className="mt-16 p-8 rounded-2xl border border-border bg-slate-900/40 text-center space-y-4 max-w-3xl mx-auto">
          <h3 className="font-display text-xl font-bold text-white">
            Need authorized servicing for {brand.name} units?
          </h3>
          <p className="text-xs text-muted-foreground">
            Our diagnostic team carries certified gauges and genuine OEM parts along the
            Wagholi–Shirur route.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              to="/booking"
              search={{}}
              className="inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-6 py-2.5 text-xs font-semibold hover:opacity-90 transition cursor-pointer"
            >
              <Calendar className="h-4 w-4" /> Book Technician Visit
            </Link>
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-slate-950/40 px-6 py-2.5 text-xs font-semibold hover:bg-slate-900 transition cursor-pointer"
            >
              <Phone className="h-4 w-4 text-primary" /> Call {phone}
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
