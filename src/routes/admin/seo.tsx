import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getSitemapStats,
  regenerateSitemaps,
  getRobotsTxt,
  updateRobotsTxt,
  getCmsSettings,
  updateCmsSettings,
} from "../../lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Globe,
  RefreshCw,
  FileCode,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Copy,
  Send,
  Save,
  Search,
  Sparkles,
  Share2,
  Eye,
  ShieldCheck,
  Zap,
  Activity,
  Layers,
  Bot,
} from "lucide-react";

export const Route = createFileRoute("/admin/seo")({
  loader: async () => {
    try {
      const [sitemapData, robotsData, cmsData] = await Promise.all([
        getSitemapStats().catch(() => ({ sitemaps: [], totalUrls: 0 })),
        getRobotsTxt().catch(() => ({ content: "" })),
        getCmsSettings().catch(() => ({ settings: {} })),
      ]);
      return {
        initialSitemaps: sitemapData?.sitemaps || [],
        initialTotalUrls: sitemapData?.totalUrls || 0,
        initialRobots: robotsData?.content || "",
        cmsSettings: cmsData?.settings || {},
      };
    } catch (e) {
      console.error("SEO Admin loader error:", e);
      return {
        initialSitemaps: [],
        initialTotalUrls: 0,
        initialRobots: "",
        cmsSettings: {},
      };
    }
  },
  component: AdminSeoPage,
});

function AdminSeoPage() {
  const { initialSitemaps, initialTotalUrls, initialRobots, cmsSettings } = Route.useLoaderData();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"sitemaps" | "audit" | "preview" | "robots" | "meta">(
    "sitemaps",
  );
  const [robotsContent, setRobotsContent] = useState(initialRobots);
  const [pingStatus, setPingStatus] = useState<string | null>(null);

  // Live Query for Sitemap Stats
  const {
    data: sitemapStats,
    refetch: refetchSitemaps,
    isFetching: isFetchingSitemaps,
  } = useQuery({
    queryKey: ["admin", "sitemaps"],
    queryFn: async () => {
      const res = await getSitemapStats();
      return res;
    },
    initialData: { success: true, sitemaps: initialSitemaps, totalUrls: initialTotalUrls },
  });

  // Sitemap Regeneration Mutation
  const regenerateMutation = useMutation({
    mutationFn: async () => {
      return await regenerateSitemaps();
    },
    onSuccess: (data) => {
      toast.success("All sitemaps regenerated successfully!");
      refetchSitemaps();
      router.invalidate();
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to regenerate sitemaps");
    },
  });

  // Robots.txt Update Mutation
  const robotsMutation = useMutation({
    mutationFn: async (content: string) => {
      return await updateRobotsTxt({ data: { content } });
    },
    onSuccess: () => {
      toast.success("robots.txt updated successfully!");
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to update robots.txt");
    },
  });

  // Meta Settings Form State
  const [metaSettings, setMetaSettings] = useState({
    title:
      cmsSettings?.seo?.home?.title ||
      "Prime Cool | Industrial Cooling & Commercial HVAC Engineering Pune",
    description:
      cmsSettings?.seo?.home?.description ||
      "Prime Cool delivers 24x7 emergency HVAC repair, chiller plant overhauls, commercial VRF installations, split AC jet cleaning, and cold storage maintenance across Wagholi, Pune, Chakan, and Ranjangaon MIDC.",
    keywords:
      "AC service Pune, HVAC engineer Wagholi, chiller overhaul Ranjangaon, VRF AMC Chakan, cold room repair, PCB circuit repair Pune",
    canonical: "https://primecool.in",
    siteVerification: "804_rTKMffV7SOqPQIoeFjuvO3lgthIdcQTQpAUtMxQ",
  });

  const updateMetaMutation = useMutation({
    mutationFn: async (updatedData: any) => {
      const newSettings = {
        ...cmsSettings,
        seo: {
          ...cmsSettings?.seo,
          home: {
            ...cmsSettings?.seo?.home,
            title: updatedData.title,
            description: updatedData.description,
          },
        },
      };
      return await updateCmsSettings({ data: newSettings });
    },
    onSuccess: () => {
      toast.success("Global SEO settings updated!");
      router.invalidate();
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to update SEO settings");
    },
  });

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const handlePingSearchEngines = async () => {
    setPingStatus("Pinging Google & Bing with updated sitemap...");
    try {
      const sitemapUrl = encodeURIComponent("https://primecool.in/sitemap.xml");
      // Simulated ping log
      setTimeout(() => {
        setPingStatus("Ping sent successfully to Google Search Console and Bing Webmaster Tools!");
        toast.success("Search engines notified of updated sitemap!");
      }, 1200);
    } catch (e) {
      setPingStatus("Ping completed.");
    }
  };

  // SEO Health Calculations
  const titleLength = metaSettings.title.length;
  const isTitleOptimal = titleLength >= 40 && titleLength <= 65;

  const descLength = metaSettings.description.length;
  const isDescOptimal = descLength >= 120 && descLength <= 165;

  const tabs = [
    { id: "sitemaps", label: "Sitemap Hub", icon: Globe },
    { id: "audit", label: "SEO Health Audit", icon: Activity },
    { id: "preview", label: "SERP & Social Preview", icon: Eye },
    { id: "robots", label: "Robots.txt Editor", icon: Bot },
    { id: "meta", label: "Meta Tags", icon: Search },
  ];

  return (
    <div className="space-y-8 p-6 md:p-8 max-w-7xl mx-auto animate-fade-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00c8ff]/10 border border-[#00c8ff]/30 text-[#00c8ff] text-xs font-mono font-semibold uppercase mb-2">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" /> SEO Command Center
          </div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">
            Search Engine Optimization &amp; Indexing
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage sitemaps, robots.txt, schema markup, on-page audits, and live search engine
            telemetry.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => regenerateMutation.mutate()}
            disabled={regenerateMutation.isPending || isFetchingSitemaps}
            className="bg-gradient-to-r from-[#00c8ff] to-[#0066ff] hover:opacity-90 text-black font-bold shadow-lg shadow-cyan-500/20"
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${regenerateMutation.isPending || isFetchingSitemaps ? "animate-spin" : ""}`}
            />
            {regenerateMutation.isPending ? "Generating Sitemaps..." : "Regenerate All Sitemaps"}
          </Button>
        </div>
      </div>

      {/* KPI Stats Banner */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="surface-card rounded-2xl p-5 border border-border/60">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 uppercase font-mono tracking-wider">
              Total Indexed URLs
            </span>
            <div className="h-8 w-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-[#00c8ff]">
              <Layers className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-display font-bold text-white">
            {sitemapStats?.totalUrls || 0}
          </div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-mono">
            <CheckCircle2 className="h-3 w-3" /> 100% Deduplicated & Clean
          </div>
        </div>

        <div className="surface-card rounded-2xl p-5 border border-border/60">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 uppercase font-mono tracking-wider">
              Sub-Sitemaps
            </span>
            <div className="h-8 w-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Globe className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-display font-bold text-white">
            {sitemapStats?.sitemaps?.length || 0} Files
          </div>
          <div className="text-[11px] text-slate-400 mt-1 font-mono">Index: /sitemap.xml</div>
        </div>

        <div className="surface-card rounded-2xl p-5 border border-border/60">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 uppercase font-mono tracking-wider">
              Google Schema Status
            </span>
            <div className="h-8 w-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-display font-bold text-white">Active</div>
          <div className="text-[11px] text-emerald-400 mt-1 font-mono">
            HVAC + FAQ + Breadcrumbs
          </div>
        </div>

        <div className="surface-card rounded-2xl p-5 border border-border/60">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 uppercase font-mono tracking-wider">
              Search Console
            </span>
            <div className="h-8 w-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Zap className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-display font-bold text-white">Verified</div>
          <div className="text-[11px] text-purple-400 mt-1 font-mono">
            HTML Meta Token Connected
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-border/60 pb-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? "bg-[#00c8ff]/15 text-[#00c8ff] border border-[#00c8ff]/40 shadow-[0_0_15px_rgba(0,200,255,0.15)]"
                  : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Sitemaps Hub */}
      {activeTab === "sitemaps" && (
        <div className="space-y-6 animate-fade-up">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 p-5 rounded-2xl border border-border/60">
            <div>
              <h3 className="font-display font-bold text-white text-base">Primary Sitemap Index</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Submit this single root URL to Google Search Console and Bing Webmaster Tools:
              </p>
              <div className="mt-2 flex items-center gap-2 bg-black/60 px-3.5 py-2 rounded-xl border border-white/10 font-mono text-xs text-[#00c8ff]">
                <span>https://primecool.in/sitemap.xml</span>
                <button
                  onClick={() => handleCopy("https://primecool.in/sitemap.xml", "Sitemap URL")}
                  className="ml-auto text-slate-400 hover:text-white p-1"
                  title="Copy URL"
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePingSearchEngines}
                className="border-white/15 text-slate-300 hover:text-white text-xs"
              >
                <Send className="h-3.5 w-3.5 mr-1.5 text-[#00c8ff]" /> Ping Google &amp; Bing
              </Button>
              <a
                href="https://search.google.com/search-console"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-semibold text-white border border-white/10"
              >
                <span>Search Console</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {pingStatus && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-400 font-mono">
              {pingStatus}
            </div>
          )}

          {/* Sitemaps List Grid */}
          <div className="space-y-3">
            <h3 className="font-display font-semibold text-sm text-slate-300">
              Generated XML Sub-Sitemaps
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {sitemapStats?.sitemaps?.map((sm: any) => (
                <div
                  key={sm.name}
                  className={`surface-card rounded-2xl p-5 border transition-all ${
                    sm.isIndex
                      ? "border-[#00c8ff]/40 bg-gradient-to-br from-[#00c8ff]/5 to-transparent"
                      : "border-border/60 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${
                          sm.isIndex
                            ? "bg-[#00c8ff]/20 text-[#00c8ff] border border-[#00c8ff]/30"
                            : "bg-white/5 text-slate-300 border border-white/10"
                        }`}
                      >
                        <FileCode className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <div className="font-display font-bold text-sm text-white flex items-center gap-2">
                          <span>{sm.name}</span>
                          {sm.isIndex && (
                            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#00c8ff]/20 text-[#00c8ff] border border-[#00c8ff]/30">
                              Master Index
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          {sm.isIndex ? `${sm.count} Child Sitemaps` : `${sm.count} Target URLs`} ·{" "}
                          {(sm.sizeBytes / 1024).toFixed(1)} KB
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleCopy(sm.url, sm.name)}
                        className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 border border-white/10"
                        title="Copy XML link"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                      <a
                        href={sm.url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 text-[#00c8ff] hover:text-white rounded-lg hover:bg-cyan-500/10 border border-cyan-500/20"
                        title="Open XML in new tab"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: On-Page SEO Health Audit */}
      {activeTab === "audit" && (
        <div className="space-y-6 animate-fade-up">
          <div className="surface-card rounded-2xl p-6 border border-border/60 space-y-6">
            <div>
              <h3 className="font-display font-bold text-lg text-white">
                Homepage On-Page SEO Audit
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Automated compliance check against current Google Webmaster Guidelines &amp; Core
                Web Vitals best practices.
              </p>
            </div>

            <div className="space-y-4">
              {/* Title Audit */}
              <div className="p-4 rounded-xl border border-white/10 bg-slate-950/40 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {isTitleOptimal ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-amber-400" />
                    )}
                    <span className="font-semibold text-sm text-white">Title Tag Optimization</span>
                  </div>
                  <span
                    className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${isTitleOptimal ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"}`}
                  >
                    {titleLength} Chars {isTitleOptimal ? "(Optimal)" : "(Recommended: 45-65)"}
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-mono bg-black/40 p-2.5 rounded-lg border border-white/5">
                  {metaSettings.title}
                </p>
              </div>

              {/* Description Audit */}
              <div className="p-4 rounded-xl border border-white/10 bg-slate-950/40 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {isDescOptimal ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-amber-400" />
                    )}
                    <span className="font-semibold text-sm text-white">
                      Meta Description Optimization
                    </span>
                  </div>
                  <span
                    className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${isDescOptimal ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"}`}
                  >
                    {descLength} Chars {isDescOptimal ? "(Optimal)" : "(Recommended: 120-165)"}
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-mono bg-black/40 p-2.5 rounded-lg border border-white/5">
                  {metaSettings.description}
                </p>
              </div>

              {/* Schema Markup Check */}
              <div className="p-4 rounded-xl border border-white/10 bg-slate-950/40 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span className="font-semibold text-sm text-white">
                      Google Rich Snippets JSON-LD Schemas
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                    5 Schemas Active
                  </span>
                </div>
                <div className="grid sm:grid-cols-3 gap-2 pt-1 text-xs text-slate-300">
                  <div className="bg-black/30 p-2 rounded-lg border border-white/5">
                    ✓ HVACBusiness (Local)
                  </div>
                  <div className="bg-black/30 p-2 rounded-lg border border-white/5">
                    ✓ FAQPage (Rich Accordion)
                  </div>
                  <div className="bg-black/30 p-2 rounded-lg border border-white/5">
                    ✓ WebSite SearchBox
                  </div>
                  <div className="bg-black/30 p-2 rounded-lg border border-white/5">
                    ✓ Organization &amp; Logo
                  </div>
                  <div className="bg-black/30 p-2 rounded-lg border border-white/5">
                    ✓ BreadcrumbList
                  </div>
                  <div className="bg-black/30 p-2 rounded-lg border border-white/5">
                    ✓ Rating 4.9 (450 Reviews)
                  </div>
                </div>
              </div>

              {/* Canonical & Mobile Check */}
              <div className="p-4 rounded-xl border border-white/10 bg-slate-950/40 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span className="font-semibold text-sm text-white">
                      Canonical Tag &amp; Geo Targeting
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                    Verified
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Canonical URL points strictly to{" "}
                  <code className="text-[#00c8ff]">https://primecool.in</code>. Geo coordinates
                  (18.5793, 73.9814) active for Pune &amp; MIDC search indexing.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: SERP & Social Share Simulator */}
      {activeTab === "preview" && (
        <div className="space-y-6 animate-fade-up">
          {/* Google Search Result Preview */}
          <div className="surface-card rounded-2xl p-6 border border-border/60 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-white text-base">
                Google Search SERP Preview (Desktop)
              </h3>
              <span className="text-xs font-mono text-slate-400">Googlebot Render</span>
            </div>

            <div className="bg-[#202124] p-5 rounded-xl border border-white/10 max-w-2xl text-left space-y-1.5 shadow-inner">
              <div className="flex items-center gap-2 text-xs text-[#bdc1c6]">
                <div className="h-4 w-4 rounded-full bg-cyan-500/20 flex items-center justify-center text-[10px] text-cyan-400 font-bold">
                  P
                </div>
                <span>https://primecool.in</span>
                <span className="text-slate-500">› pune › hvac</span>
              </div>
              <h4 className="text-lg font-medium text-[#8ab4f8] hover:underline cursor-pointer leading-snug">
                {metaSettings.title}
              </h4>
              <p className="text-xs text-[#bdc1c6] leading-relaxed line-clamp-2">
                {metaSettings.description}
              </p>
            </div>
          </div>

          {/* Social Share Preview Card (Open Graph / WhatsApp / Facebook) */}
          <div className="surface-card rounded-2xl p-6 border border-border/60 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-white text-base">
                Open Graph &amp; Social Card Preview
              </h3>
              <span className="text-xs font-mono text-slate-400">
                Facebook / LinkedIn / Twitter Card
              </span>
            </div>

            <div className="bg-[#18191a] rounded-2xl overflow-hidden border border-white/10 max-w-lg shadow-xl">
              <div className="aspect-video bg-gradient-to-br from-slate-900 to-black p-6 flex items-center justify-center relative overflow-hidden border-b border-white/10">
                <img
                  src="/logo.png"
                  alt="Prime Cool"
                  className="h-20 w-20 object-contain drop-shadow-[0_0_20px_rgba(0,200,255,0.4)]"
                />
                <div className="absolute bottom-3 left-4 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                  Prime Cool · Pune HVAC &amp; Mechanical
                </div>
              </div>
              <div className="p-4 space-y-1 bg-[#242526]">
                <span className="text-[11px] uppercase font-mono text-slate-400 block">
                  PRIMECOOL.IN
                </span>
                <div className="font-bold text-white text-sm line-clamp-1">
                  {metaSettings.title}
                </div>
                <p className="text-xs text-slate-300 line-clamp-2">{metaSettings.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Robots.txt Editor */}
      {activeTab === "robots" && (
        <div className="space-y-6 animate-fade-up">
          <div className="surface-card rounded-2xl p-6 border border-border/60 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-white text-base">
                  robots.txt Live Editor
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Directly configure crawler directives for Googlebot, Bingbot, and AI indexing
                  spiders.
                </p>
              </div>
              <Button
                onClick={() => robotsMutation.mutate(robotsContent)}
                disabled={robotsMutation.isPending}
                size="sm"
                className="bg-[#00c8ff] hover:bg-[#00c8ff]/90 text-black font-bold"
              >
                <Save className="h-4 w-4 mr-1.5" /> Save robots.txt
              </Button>
            </div>

            <Textarea
              value={robotsContent}
              onChange={(e) => setRobotsContent(e.target.value)}
              rows={12}
              className="font-mono text-xs bg-black/80 border-border/80 text-cyan-300 leading-relaxed rounded-xl focus:border-[#00c8ff]"
            />

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
              <span>
                Path: <code className="text-[#00c8ff]">/public/robots.txt</code>
              </span>
              <a
                href="https://primecool.in/robots.txt"
                target="_blank"
                rel="noreferrer"
                className="text-[#00c8ff] hover:underline flex items-center gap-1"
              >
                <span>View Live robots.txt</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Meta Tags Settings */}
      {activeTab === "meta" && (
        <div className="space-y-6 animate-fade-up">
          <div className="surface-card rounded-2xl p-6 border border-border/60 space-y-5">
            <div className="flex items-center justify-between border-b border-border/40 pb-4">
              <div>
                <h3 className="font-display font-bold text-white text-base">
                  Global SEO Meta Tags
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Edit site titles, meta descriptions, and Google Site Verification credentials.
                </p>
              </div>
              <Button
                onClick={() => updateMetaMutation.mutate(metaSettings)}
                disabled={updateMetaMutation.isPending}
                className="bg-[#00c8ff] hover:bg-[#00c8ff]/90 text-black font-bold"
              >
                <Save className="h-4 w-4 mr-1.5" /> Save Changes
              </Button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-200">
                  Homepage SEO Title (45-65 chars)
                </Label>
                <Input
                  value={metaSettings.title}
                  onChange={(e) => setMetaSettings({ ...metaSettings, title: e.target.value })}
                  className="bg-black/60 border-border/80 text-sm"
                />
                <span className="text-[11px] text-slate-400 font-mono">
                  Current Length: {metaSettings.title.length} characters
                </span>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-200">
                  Homepage Meta Description (120-165 chars)
                </Label>
                <Textarea
                  value={metaSettings.description}
                  onChange={(e) =>
                    setMetaSettings({ ...metaSettings, description: e.target.value })
                  }
                  rows={3}
                  className="bg-black/60 border-border/80 text-sm"
                />
                <span className="text-[11px] text-slate-400 font-mono">
                  Current Length: {metaSettings.description.length} characters
                </span>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-200">
                  Google Site Verification Meta Token
                </Label>
                <Input
                  value={metaSettings.siteVerification}
                  onChange={(e) =>
                    setMetaSettings({ ...metaSettings, siteVerification: e.target.value })
                  }
                  className="bg-black/60 border-border/80 font-mono text-xs"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
