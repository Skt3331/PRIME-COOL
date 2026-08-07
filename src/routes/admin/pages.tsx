import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getLocations,
  updateLocation,
  getAdminServices,
  updateService,
  getAdminBlogs,
  updateBlog,
  getCalculatorsList,
  updateCalculatorMeta,
  getCmsSettings,
  updateCmsSettings,
} from "../../lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  FileText,
  Search,
  Sliders,
  Sparkles,
  SearchCode,
  Edit3,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

export const Route = createFileRoute("/admin/pages")({
  head: () => ({
    meta: [{ title: "SEO Pages Manager — Prime Cool Admin" }],
  }),
  component: AdminPagesPage,
});

interface PageItem {
  id: string;
  name: string;
  url: string;
  type: "static" | "service" | "location" | "blog" | "calculator";
  seoTitle: string;
  seoDesc: string;
  seoKeywords: string;
  originalItem: any;
}

function AdminPagesPage() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  // SEO Editing State
  const [editingPage, setEditingPage] = useState<PageItem | null>(null);
  const [newSeoTitle, setNewSeoTitle] = useState("");
  const [newSeoDesc, setNewSeoDesc] = useState("");
  const [newSeoKeywords, setNewSeoKeywords] = useState("");

  // Queries
  const { data: locationsData, isLoading: locationsLoading } = useQuery({
    queryKey: ["adminLocations"],
    queryFn: () => getLocations(),
  });

  const { data: servicesData, isLoading: servicesLoading } = useQuery({
    queryKey: ["adminServices"],
    queryFn: () => getAdminServices(),
  });

  const { data: blogsData, isLoading: blogsLoading } = useQuery({
    queryKey: ["adminBlogs"],
    queryFn: () => getAdminBlogs(),
  });

  const { data: calculatorsData, isLoading: calculatorsLoading } = useQuery({
    queryKey: ["adminCalculators"],
    queryFn: () => getCalculatorsList(),
  });

  const { data: cmsData, isLoading: cmsLoading } = useQuery({
    queryKey: ["cmsSettings"],
    queryFn: () => getCmsSettings(),
  });

  // Mutations
  const updateLocationMutation = useMutation({
    mutationFn: (variables: any) => updateLocation({ data: variables }),
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Location SEO updated!");
        setEditingPage(null);
        queryClient.invalidateQueries({ queryKey: ["adminLocations"] });
      } else {
        toast.error("Failed to update Location SEO.");
      }
    },
  });

  const updateServiceMutation = useMutation({
    mutationFn: (variables: any) => updateService({ data: variables }),
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Service SEO updated!");
        setEditingPage(null);
        queryClient.invalidateQueries({ queryKey: ["adminServices"] });
      } else {
        toast.error("Failed to update Service SEO.");
      }
    },
  });

  const updateBlogMutation = useMutation({
    mutationFn: (variables: any) => updateBlog({ data: variables }),
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Blog post SEO updated!");
        setEditingPage(null);
        queryClient.invalidateQueries({ queryKey: ["adminBlogs"] });
      } else {
        toast.error("Failed to update Blog SEO.");
      }
    },
  });

  const updateCalculatorMutation = useMutation({
    mutationFn: (variables: any) => updateCalculatorMeta({ data: variables }),
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Calculator SEO updated!");
        setEditingPage(null);
        queryClient.invalidateQueries({ queryKey: ["adminCalculators"] });
      } else {
        toast.error("Failed to update Calculator SEO.");
      }
    },
  });

  const updateCmsMutation = useMutation({
    mutationFn: (variables: any) => updateCmsSettings({ data: variables }),
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Static Page SEO settings updated!");
        setEditingPage(null);
        queryClient.invalidateQueries({ queryKey: ["cmsSettings"] });
      } else {
        toast.error("Failed to save Static SEO settings.");
      }
    },
  });

  // Compile Page Array
  const pages: PageItem[] = [];

  const cms = cmsData?.settings;
  if (cms && cms.seo) {
    const staticMeta = [
      { id: "st-home", name: "Home Page", key: "home", url: "/" },
      { id: "st-booking", name: "Booking Page", key: "booking", url: "/booking" },
      { id: "st-portfolio", name: "Portfolio Hub", key: "portfolio", url: "/portfolio" },
      { id: "st-resources", name: "Resources Hub", key: "resources", url: "/resources" },
      { id: "st-calculators", name: "Calculators List", key: "calculators", url: "/calculators" },
      { id: "st-blogs", name: "Blogs Grid", key: "blogs", url: "/blogs" },
      { id: "st-brands", name: "Brands Grid", key: "brands", url: "/brands" },
      { id: "st-locations", name: "Locations Index", key: "locations", url: "/locations" },
    ];

    staticMeta.forEach((meta) => {
      const seoData = cms.seo[meta.key] || {};
      pages.push({
        id: meta.id,
        name: meta.name,
        url: meta.url,
        type: "static",
        seoTitle: seoData.title || "",
        seoDesc: seoData.description || "",
        seoKeywords: "",
        originalItem: { key: meta.key, cmsSettings: cms },
      });
    });
  }

  // Add Services
  const services = servicesData?.services || [];
  services.forEach((srv: any) => {
    pages.push({
      id: `srv-${srv.id}`,
      name: `Service: ${srv.title}`,
      url: `/services/${srv.slug}`,
      type: "service",
      seoTitle: srv.seoTitle || "",
      seoDesc: srv.seoDesc || "",
      seoKeywords: srv.seoKeywords || "",
      originalItem: srv,
    });
  });

  // Add Locations
  const locations = locationsData?.locations || [];
  locations.forEach((loc: any) => {
    pages.push({
      id: `loc-${loc.slug}`,
      name: `Location: ${loc.name}`,
      url: `/locations/${loc.slug}`,
      type: "location",
      seoTitle: loc.seoTitle || "",
      seoDesc: loc.seoDesc || "",
      seoKeywords: loc.seoKeywords || "",
      originalItem: loc,
    });
  });

  // Add Blogs
  const blogs = blogsData?.blogs || [];
  blogs.forEach((blog: any) => {
    pages.push({
      id: `blog-${blog.id}`,
      name: `Blog: ${blog.title}`,
      url: `/blogs/${blog.slug}`,
      type: "blog",
      seoTitle: blog.seoTitle || "",
      seoDesc: blog.seoDesc || "",
      seoKeywords: blog.seoKeywords || "",
      originalItem: blog,
    });
  });

  // Add Calculators
  const calculators = calculatorsData?.calculators || [];
  calculators.forEach((calc: any) => {
    pages.push({
      id: `calc-${calc.id}`,
      name: `Calculator: ${calc.title}`,
      url: `/calculators/${calc.slug}`,
      type: "calculator",
      seoTitle: calc.seoTitle || "",
      seoDesc: calc.seoDesc || "",
      seoKeywords: calc.seoKeywords || "",
      originalItem: calc,
    });
  });

  // Filters
  const filteredPages = pages.filter((page) => {
    const matchesSearch =
      page.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.seoTitle.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === "all" || page.type === typeFilter;

    return matchesSearch && matchesType;
  });

  const handleEditSeo = (page: PageItem) => {
    setEditingPage(page);
    setNewSeoTitle(page.seoTitle);
    setNewSeoDesc(page.seoDesc);
    setNewSeoKeywords(page.seoKeywords);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSaveSeo = () => {
    if (!editingPage) return;

    if (editingPage.type === "static") {
      const key = editingPage.originalItem.key;
      const originalCms = editingPage.originalItem.cmsSettings;
      const updatedSeo = { ...originalCms.seo };
      updatedSeo[key] = {
        ...updatedSeo[key],
        title: newSeoTitle,
        description: newSeoDesc,
        ogTitle: newSeoTitle,
        ogDescription: newSeoDesc,
      };

      updateCmsMutation.mutate({
        ...originalCms,
        seo: updatedSeo,
      });
    } else if (editingPage.type === "service") {
      updateServiceMutation.mutate({
        id: editingPage.originalItem.id,
        seoTitle: newSeoTitle,
        seoDesc: newSeoDesc,
        seoKeywords: newSeoKeywords,
      });
    } else if (editingPage.type === "location") {
      updateLocationMutation.mutate({
        slug: editingPage.originalItem.slug,
        seoTitle: newSeoTitle,
        seoDesc: newSeoDesc,
        seoKeywords: newSeoKeywords,
      });
    } else if (editingPage.type === "blog") {
      updateBlogMutation.mutate({
        id: editingPage.originalItem.id,
        seoTitle: newSeoTitle,
        seoDesc: newSeoDesc,
        seoKeywords: newSeoKeywords,
      });
    } else if (editingPage.type === "calculator") {
      updateCalculatorMutation.mutate({
        id: editingPage.originalItem.id,
        seoTitle: newSeoTitle,
        seoDesc: newSeoDesc,
        seoKeywords: newSeoKeywords,
      });
    }
  };

  const isSaving =
    updateLocationMutation.isPending ||
    updateServiceMutation.isPending ||
    updateBlogMutation.isPending ||
    updateCalculatorMutation.isPending ||
    updateCmsMutation.isPending;

  const isLoading =
    locationsLoading ||
    servicesLoading ||
    blogsLoading ||
    calculatorsLoading ||
    cmsLoading;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
      <div>
        <h1 className="text-3xl font-display font-bold">SEO Pages Manager</h1>
        <p className="text-muted-foreground mt-1">
          Review, check, and configure SEO tag overrides across all static and dynamic pages.
        </p>
      </div>

      {/* Editor Modal / Panel */}
      {editingPage && (
        <div className="surface-card rounded-2xl p-6 border border-primary/30 bg-primary/[0.02] space-y-6">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                Configure Meta Overrides: <span className="text-primary">{editingPage.name}</span>
              </h2>
              <span className="text-xs font-mono text-muted-foreground block mt-1">
                Resource URL: {editingPage.url}
              </span>
            </div>
            <Button variant="outline" size="sm" onClick={() => setEditingPage(null)}>
              Close Panel
            </Button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">SEO Title Override</Label>
              <Input
                placeholder="Target meta title (Recommended: 50-60 characters)"
                value={newSeoTitle}
                onChange={(e) => setNewSeoTitle(e.target.value)}
              />
              <span className="text-[10px] text-muted-foreground font-mono block">
                Length: {newSeoTitle.length} characters
              </span>
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">SEO Description Override</Label>
              <Textarea
                rows={3}
                placeholder="Target meta description (Recommended: 150-160 characters)"
                value={newSeoDesc}
                onChange={(e) => setNewSeoDesc(e.target.value)}
              />
              <span className="text-[10px] text-muted-foreground font-mono block">
                Length: {newSeoDesc.length} characters
              </span>
            </div>

            {editingPage.type !== "static" && (
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Keywords (Comma separated)</Label>
                <Input
                  placeholder="e.g. ac repair pune, hvac maintenance"
                  value={newSeoKeywords}
                  onChange={(e) => setNewSeoKeywords(e.target.value)}
                />
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={() => setEditingPage(null)} className="flex-1">
              Discard
            </Button>
            <Button onClick={handleSaveSeo} disabled={isSaving} className="flex-[2]">
              {isSaving ? "Saving Updates..." : "Save SEO Override"}
            </Button>
          </div>
        </div>
      )}

      {/* Pages Grid Control Row */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-b border-border pb-6">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search pages by name or slug..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <select
            className="flex h-10 w-full sm:w-48 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All Page Types</option>
            <option value="static">Static Page</option>
            <option value="service">Service Detail</option>
            <option value="location">Location Hub</option>
            <option value="blog">Blog Post</option>
            <option value="calculator">Calculator</option>
          </select>
        </div>
      </div>

      {/* Listings */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24 text-muted-foreground gap-3">
          <span className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
          <span>Building dynamic page index...</span>
        </div>
      ) : filteredPages.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border rounded-2xl bg-card/10 text-muted-foreground">
          <FileText className="h-10 w-10 mx-auto opacity-50 mb-3" />
          <h3 className="font-semibold text-sm">No Pages Found</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Try adjusting your search query or filters.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filteredPages.map((page) => {
            const hasSeo = page.seoTitle && page.seoDesc;
            return (
              <div
                key={page.id}
                className={`p-5 rounded-2xl border bg-card/50 transition-all flex flex-col justify-between group ${hasSeo ? "border-border" : "border-amber-500/20 bg-amber-500/[0.01]"
                  } hover:border-primary/50`}
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="font-display font-semibold text-base group-hover:text-primary transition-colors flex items-center gap-2">
                        {page.name}
                        <span className="text-[9px] uppercase tracking-wider bg-slate-900 border border-border px-2 py-0.5 rounded-full font-mono text-muted-foreground">
                          {page.type}
                        </span>
                      </h3>
                      <span className="text-xs font-mono text-muted-foreground mt-0.5 block">
                        {page.url}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {hasSeo ? (
                        <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                          <CheckCircle className="h-3 w-3" />
                          <span>SEO Configured</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-[10px] text-amber-400 font-semibold bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                          <AlertCircle className="h-3 w-3" />
                          <span>Default Meta</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1 pt-2 border-t border-border/30">
                    <div className="text-xs font-medium text-foreground truncate">
                      <span className="text-muted-foreground font-normal">Title:</span>{" "}
                      {page.seoTitle || <span className="text-muted-foreground/60 italic font-normal">None (using public template)</span>}
                    </div>
                    <div className="text-xs text-muted-foreground line-clamp-2">
                      <span className="text-muted-foreground font-normal">Desc:</span>{" "}
                      {page.seoDesc || <span className="text-muted-foreground/60 italic font-normal">None (using public template)</span>}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border/40 flex justify-between items-center gap-2">
                  <a
                    href={page.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-muted-foreground hover:text-foreground flex items-center gap-1"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>Test Page</span>
                  </a>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEditSeo(page)}
                    className="text-xs font-semibold text-primary hover:text-primary-foreground hover:bg-primary"
                  >
                    <Edit3 className="h-3.5 w-3.5 mr-1" />
                    <span>Edit SEO Tags</span>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
