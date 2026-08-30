import { createFileRoute, Link } from "@tanstack/react-router";
import { industrialData } from "../../lib/industrial-data";
import { getCmsSettings } from "../../lib/api";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import {
  Phone,
  Calendar,
  Settings,
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/industrial/$topic")({
  loader: async ({ params }) => {
    const topicKey = params.topic.toLowerCase();
    let topic = industrialData[topicKey];

    if (!topic) {
      const formattedTopic = params.topic
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
      topic = {
        id: params.topic.toLowerCase(),
        slug: params.topic.toLowerCase(),
        title: formattedTopic,
        metaDescription: `Industrial solutions and mechanical services for ${formattedTopic}.`,
        heroTagline: `Heavy duty ${formattedTopic} systems operations.`,
        overview: `We offer custom process plant setups and maintenance for ${formattedTopic}.`,
        features: ["Heavy Duty", "High Efficiency"],
        diagnosticCodes: [],
        maintenanceChecklist: ["Regular Inspection", "Lubrication"],
        faqs: [],
      };
    }

    const { settings } = await getCmsSettings();
    return { topic, cms: settings };
  },
  head: ({ loaderData }) => {
    const topic = loaderData?.topic;
    if (!topic) return { meta: [] };

    const pageTitle = `${topic.title} | Prime Cool Industrial Solutions`;
    return {
      meta: [
        { title: pageTitle },
        { name: "description", content: topic.metaDescription },
        { property: "og:title", content: pageTitle },
        { property: "og:description", content: topic.metaDescription },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: `https://primecool.in/industrial/${topic.slug}` }],
    };
  },
  component: IndustrialTopicPage,
});

function IndustrialTopicPage() {
  const { topic, cms } = Route.useLoaderData();
  const phone = cms?.socials?.phone || "+917507408461";

  return (
    <div className="min-h-screen text-foreground flex flex-col justify-between bg-slate-950">
      {/* Background gradients */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,color-mix(in_oklab,var(--primary)_8%,transparent),transparent_60%)] pointer-events-none" />

      {/* Main Container */}
      <main className="flex-1 pt-6 md:pt-8 pb-20 px-6 max-w-7xl mx-auto w-full relative z-10">
        <Breadcrumbs />

        {/* Hero Segment */}
        <div className="grid lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary font-mono uppercase tracking-wider">
              <Settings className="h-3.5 w-3.5" />
              <span>Heavy Commercial Systems</span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
              {topic.title.split(" ").map((word, i) => (
                <span key={i} className={i % 2 === 1 ? "text-gradient" : ""}>
                  {word}{" "}
                </span>
              ))}
            </h1>

            <p className="text-lg text-primary font-medium">{topic.heroTagline}</p>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
              {topic.overview}
            </p>

            <div className="flex flex-wrap gap-3 pt-4">
              <Link
                to="/emergency"
                className="inline-flex items-center gap-2 rounded-full bg-red-500 text-white px-6 py-3 text-sm font-semibold hover:bg-red-600 transition shadow-[0_0_20px_rgba(239,68,68,0.3)] cursor-pointer"
              >
                <AlertTriangle className="h-4 w-4" />
                <span>Code Red Breakdown</span>
              </Link>
              <a
                href={`tel:${phone.replace(/\\s+/g, "")}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-slate-900/60 px-6 py-3 text-sm font-semibold hover:bg-card transition cursor-pointer"
              >
                <Phone className="h-4 w-4 text-primary" />
                <span>Consult Lead Engineer</span>
              </a>
            </div>
          </div>

          {/* Features Card */}
          <div className="lg:col-span-5 border border-border/80 bg-slate-900/40 p-6 rounded-3xl space-y-6 shadow-2xl backdrop-blur-md">
            <div className="space-y-4">
              <span className="text-xs font-mono text-primary uppercase font-bold tracking-wider block border-b border-border/40 pb-2">
                Technical Capabilities
              </span>
              <ul className="space-y-3 text-sm text-foreground">
                {topic.features.map((feature, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" />
                    <span className="leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-950/50 p-4 rounded-xl border border-border/40 mt-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span className="font-semibold uppercase tracking-wider">Industrial SLA</span>
              </div>
              <p className="text-xs text-foreground leading-relaxed">
                We operate across Chakan, Ranjangaon, and Wagholi MIDCs with 4-hour response times
                for critical manufacturing plant breakdowns.
              </p>
            </div>
          </div>
        </div>

        {/* Diagnostic Codes & Checklist */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Fault Codes */}
          <div className="border border-border/60 bg-slate-900/20 p-6 md:p-8 rounded-3xl space-y-6">
            <h2 className="font-display font-bold text-2xl text-white">Fault Code Library</h2>
            <p className="text-sm text-muted-foreground">
              Common {topic.title} error codes and our diagnostic response protocols.
            </p>

            <div className="space-y-6">
              {topic.diagnosticCodes.map((brandObj, idx) => (
                <div key={idx} className="space-y-3">
                  <h3 className="text-sm font-bold text-primary font-mono uppercase bg-primary/10 inline-block px-3 py-1 rounded-md">
                    {brandObj.brand}
                  </h3>
                  <div className="space-y-3">
                    {brandObj.codes.map((codeObj, cIdx) => (
                      <div
                        key={cIdx}
                        className="bg-slate-950/60 p-4 rounded-xl border border-border/40"
                      >
                        <div className="flex items-start gap-3">
                          <span className="bg-red-500/20 text-red-400 font-mono font-bold px-2 py-1 rounded text-xs">
                            {codeObj.code}
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-white mb-1">
                              {codeObj.meaning}
                            </p>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              <span className="font-mono text-primary mr-1">Action:</span>
                              {codeObj.action}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Maintenance Checklist */}
          <div className="border border-border/60 bg-slate-900/20 p-6 md:p-8 rounded-3xl space-y-6">
            <h2 className="font-display font-bold text-2xl text-white">Preventive Maintenance</h2>
            <p className="text-sm text-muted-foreground">
              Our standardized operating procedures (SOPs) for routine maintenance.
            </p>

            <ol className="space-y-4 text-sm text-foreground list-decimal pl-5">
              {topic.maintenanceChecklist.map((item, idx) => (
                <li
                  key={idx}
                  className="leading-relaxed pl-2 pb-2 border-b border-border/20 last:border-0"
                >
                  {item}
                </li>
              ))}
            </ol>

            {topic.caseStudyHighlight && (
              <div className="mt-8 bg-gradient-to-br from-primary/20 to-transparent p-5 rounded-2xl border border-primary/30 relative overflow-hidden">
                <div className="absolute -right-4 -top-4 opacity-10">
                  <Settings className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-primary mb-2">
                    Case Study Highlight
                  </div>
                  <h4 className="font-bold text-lg text-white mb-1">
                    {topic.caseStudyHighlight.title}
                  </h4>
                  <div className="text-sm font-bold text-emerald-400 mb-2">
                    {topic.caseStudyHighlight.metric}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {topic.caseStudyHighlight.description}
                  </p>
                  <Link
                    to="/portfolio"
                    className="inline-flex items-center gap-1 text-xs text-primary mt-3 hover:underline"
                  >
                    View full portfolio <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* FAQs */}
        <div className="border border-border/60 bg-slate-900/20 p-6 md:p-8 rounded-3xl">
          <h2 className="font-display font-bold text-2xl text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {topic.faqs.map((faq, idx) => (
              <div key={idx} className="bg-slate-950/40 p-5 rounded-xl border border-border/40">
                <h4 className="font-semibold text-sm text-foreground mb-2 flex gap-2">
                  <span className="text-primary font-bold">Q.</span> {faq.q}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed pl-5 border-l-2 border-border/40">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
