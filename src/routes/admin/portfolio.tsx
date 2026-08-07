import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAdminProjects, createProject, updateProject, deleteProject } from "../../lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageDropzone } from "@/components/ImageDropzone";
import { toast } from "sonner";
import {
  Briefcase,
  Plus,
  Trash2,
  MapPin,
  Layers,
  FileImage,
  Percent,
  TrendingUp,
  Pencil,
  X,
} from "lucide-react";

export const Route = createFileRoute("/admin/portfolio")({
  head: () => ({
    meta: [{ title: "Portfolio Management — Prime Cool Admin" }],
  }),
  component: AdminPortfolioPage,
});

function AdminPortfolioPage() {
  const queryClient = useQueryClient();
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState<"domestic" | "commercial" | "industrial">("domestic");

  // Storing metrics as a simple array of 3 objects
  const [metric1Val, setMetric1Val] = useState("");
  const [metric1Label, setMetric1Label] = useState("");
  const [metric2Val, setMetric2Val] = useState("");
  const [metric2Label, setMetric2Label] = useState("");
  const [metric3Val, setMetric3Val] = useState("");
  const [metric3Label, setMetric3Label] = useState("");

  const [seoTitle, setSeoTitle] = useState("");
  const [seoDesc, setSeoDesc] = useState("");
  const [seoKeywords, setSeoKeywords] = useState("");

  const [imageFile, setImageFile] = useState<{ name: string; base64: string } | undefined>(
    undefined,
  );
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Query projects
  const { data: projectsData, isLoading: projectsLoading } = useQuery({
    queryKey: ["adminProjects"],
    queryFn: () => getAdminProjects(),
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: (variables: any) => createProject({ data: variables }),
    onSuccess: (data) => {
      if (data.success) {
        toast.success("New portfolio project added!");
        // Reset form
        setTitle("");
        setSummary("");
        setLocation("");
        setCategory("domestic");
        setMetric1Val("");
        setMetric1Label("");
        setMetric2Val("");
        setMetric2Label("");
        setMetric3Val("");
        setMetric3Label("");
        setSeoTitle("");
        setSeoDesc("");
        setSeoKeywords("");
        setImageFile(undefined);
        setImagePreview(null);

        queryClient.invalidateQueries({ queryKey: ["adminProjects"] });
      } else {
        toast.error("Failed to add project.");
      }
    },
    onError: (err) => {
      console.error(err);
      toast.error("An error occurred while creating project.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (variables: any) => updateProject({ data: variables }),
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Portfolio project updated!");
        // Reset form
        setEditingProject(null);
        setTitle("");
        setSummary("");
        setLocation("");
        setCategory("domestic");
        setMetric1Val("");
        setMetric1Label("");
        setMetric2Val("");
        setMetric2Label("");
        setMetric3Val("");
        setMetric3Label("");
        setSeoTitle("");
        setSeoDesc("");
        setSeoKeywords("");
        setImageFile(undefined);
        setImagePreview(null);

        queryClient.invalidateQueries({ queryKey: ["adminProjects"] });
      } else {
        toast.error("Failed to update project.");
      }
    },
    onError: (err) => {
      console.error(err);
      toast.error("An error occurred while updating project.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (variables: { id: string }) => deleteProject({ data: variables }),
    onSuccess: (data, variables) => {
      if (data.success) {
        toast.success("Project removed from portfolio.");
        // If we are currently editing the deleted project, exit edit mode
        if (editingProject && editingProject.id === variables.id) {
          setEditingProject(null);
          setTitle("");
          setSummary("");
          setLocation("");
          setCategory("domestic");
          setMetric1Val("");
          setMetric1Label("");
          setMetric2Val("");
          setMetric2Label("");
          setMetric3Val("");
          setMetric3Label("");
          setSeoTitle("");
          setSeoDesc("");
          setSeoKeywords("");
          setImageFile(undefined);
          setImagePreview(null);
        }
        queryClient.invalidateQueries({ queryKey: ["adminProjects"] });
      } else {
        toast.error("Failed to delete project.");
      }
    },
  });

  // Handle client file processing to Base64
  const handleImageProcessed = (
    fileData: { name: string; base64: string } | undefined,
    previewUrl: string | null,
  ) => {
    setImageFile(fileData);
    setImagePreview(previewUrl);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !summary.trim() || !location.trim()) {
      toast.warning("Please fill in the project title, location, and description.");
      return;
    }

    // Collect active metrics
    const metrics: { value: string; label: string }[] = [];
    if (metric1Val.trim() && metric1Label.trim()) {
      metrics.push({ value: metric1Val.trim(), label: metric1Label.trim() });
    }
    if (metric2Val.trim() && metric2Label.trim()) {
      metrics.push({ value: metric2Val.trim(), label: metric2Label.trim() });
    }
    if (metric3Val.trim() && metric3Label.trim()) {
      metrics.push({ value: metric3Val.trim(), label: metric3Label.trim() });
    }

    if (editingProject) {
      updateMutation.mutate({
        id: editingProject.id,
        title,
        summary,
        location,
        category,
        metrics,
        imageFile,
      });
    } else {
      createMutation.mutate({
        title,
        summary,
        location,
        category,
        metrics,
        imageFile,
      });
    }
  };

  const projects = (projectsData as any)?.projects || [];

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="font-display text-3xl font-bold leading-tight">
          Portfolio <span className="text-gradient">Manager</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Upload new case studies, edit past works, and modify customer-facing metrics.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form to add/edit project */}
        <div className="lg:col-span-5 bento-card p-6 space-y-6">
          <h2 className="font-display text-lg font-bold flex items-center gap-2 border-b border-white/10 pb-3">
            {editingProject ? (
              <>
                <Pencil className="h-5 w-5 text-[#00c8ff]" />
                Edit Project:{" "}
                <span className="text-slate-400 font-normal truncate max-w-[200px]">
                  {editingProject.title}
                </span>
              </>
            ) : (
              <>
                <Plus className="h-5 w-5 text-primary" />
                Add New Project
              </>
            )}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            <div className="space-y-1">
              <Label htmlFor="proj-title" className="text-xs text-muted-foreground">
                Project Title
              </Label>
              <Input
                id="proj-title"
                type="text"
                placeholder="e.g. 350 TR cooling tower overhaul"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="rounded-xl bg-background/50"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="proj-loc" className="text-xs text-muted-foreground">
                  Location & Scale
                </Label>
                <Input
                  id="proj-loc"
                  type="text"
                  placeholder="e.g. Karegaon MIDC · Industrial"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="rounded-xl bg-background/50"
                  required
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="proj-cat" className="text-xs text-muted-foreground">
                  Category
                </Label>
                <select
                  id="proj-cat"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full rounded-xl border border-input bg-background/50 px-3 py-2.5 text-xs text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="domestic">Domestic</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="proj-summary" className="text-xs text-muted-foreground">
                Detailed Summary
              </Label>
              <Textarea
                id="proj-summary"
                placeholder="Describe the problem, the diagnosis, the repair actions, and metrics restored..."
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="rounded-xl min-h-[90px] bg-background/50"
                required
              />
            </div>

            {/* Metrics sub-form */}
            <div className="border border-border/60 bg-background/25 rounded-2xl p-4 space-y-3">
              <Label className="text-xs font-semibold text-primary block border-b border-border/30 pb-1">
                Project Key Performance Metrics
              </Label>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-[10px] text-muted-foreground">
                    Metric 1 Value (e.g. 38 min)
                  </Label>
                  <Input
                    type="text"
                    placeholder="38 min"
                    value={metric1Val}
                    onChange={(e) => setMetric1Val(e.target.value)}
                    className="rounded-lg h-8 px-2 text-xs bg-background/50"
                  />
                </div>
                <div>
                  <Label className="text-[10px] text-muted-foreground">
                    Metric 1 Label (e.g. On-site response)
                  </Label>
                  <Input
                    type="text"
                    placeholder="On-site response"
                    value={metric1Label}
                    onChange={(e) => setMetric1Label(e.target.value)}
                    className="rounded-lg h-8 px-2 text-xs bg-background/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-[10px] text-muted-foreground">
                    Metric 2 Value (e.g. +22%)
                  </Label>
                  <Input
                    type="text"
                    placeholder="+22%"
                    value={metric2Val}
                    onChange={(e) => setMetric2Val(e.target.value)}
                    className="rounded-lg h-8 px-2 text-xs bg-background/50"
                  />
                </div>
                <div>
                  <Label className="text-[10px] text-muted-foreground">
                    Metric 2 Label (e.g. Efficiency)
                  </Label>
                  <Input
                    type="text"
                    placeholder="Thermal efficiency"
                    value={metric2Label}
                    onChange={(e) => setMetric2Label(e.target.value)}
                    className="rounded-lg h-8 px-2 text-xs bg-background/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-[10px] text-muted-foreground">
                    Metric 3 Value (e.g. 3 days)
                  </Label>
                  <Input
                    type="text"
                    placeholder="3 days"
                    value={metric3Val}
                    onChange={(e) => setMetric3Val(e.target.value)}
                    className="rounded-lg h-8 px-2 text-xs bg-background/50"
                  />
                </div>
                <div>
                  <Label className="text-[10px] text-muted-foreground">
                    Metric 3 Label (e.g. Turnaround)
                  </Label>
                  <Input
                    type="text"
                    placeholder="Total turnaround"
                    value={metric3Label}
                    onChange={(e) => setMetric3Label(e.target.value)}
                    className="rounded-lg h-8 px-2 text-xs bg-background/50"
                  />
                </div>
              </div>
            </div>

            {/* File Upload field */}
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Project Illustration / Photo</Label>
              <ImageDropzone
                onImageProcessed={handleImageProcessed}
                initialPreview={imagePreview}
              />
            </div>

            <div className="border-t border-white/10 pt-6 mt-6">
              <h3 className="text-sm font-semibold mb-3">SEO Overrides (Optional)</h3>
              <div className="space-y-4">
                <div className="space-y-1">
                  <Label>SEO Title</Label>
                  <Input
                    placeholder="e.g. 500TR Chiller Installation | Prime Cool Portfolio"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    className="rounded-lg bg-background/50 border-white/10"
                  />
                </div>
                <div className="space-y-1">
                  <Label>SEO Description</Label>
                  <Textarea
                    rows={2}
                    placeholder="e.g. Case study on installing a 500TR water-cooled chiller..."
                    value={seoDesc}
                    onChange={(e) => setSeoDesc(e.target.value)}
                    className="rounded-lg bg-background/50 border-white/10"
                  />
                </div>
                <div className="space-y-1">
                  <Label>SEO Keywords (Comma separated)</Label>
                  <Input
                    placeholder="e.g. chiller installation, 500tr chiller, hvac project"
                    value={seoKeywords}
                    onChange={(e) => setSeoKeywords(e.target.value)}
                    className="rounded-lg bg-background/50 border-white/10"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-6 border-t border-white/10">
              {editingProject && (
                <Button
                  type="button"
                  onClick={() => {
                    setEditingProject(null);
                    setTitle("");
                    setSummary("");
                    setLocation("");
                    setCategory("domestic");
                    setMetric1Val("");
                    setMetric1Label("");
                    setMetric2Val("");
                    setMetric2Label("");
                    setMetric3Val("");
                    setMetric3Label("");
                    setSeoTitle("");
                    setSeoDesc("");
                    setSeoKeywords("");
                    setImageFile(undefined);
                    setImagePreview(null);
                  }}
                  variant="outline"
                  className="flex-1 rounded-xl py-3 font-semibold"
                >
                  Cancel
                </Button>
              )}
              <Button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
                className="flex-1 rounded-xl py-3 font-semibold"
              >
                {editingProject
                  ? updateMutation.isPending
                    ? "Saving..."
                    : "Save Changes"
                  : createMutation.isPending
                    ? "Publishing..."
                    : "Publish Case Study"}
              </Button>
            </div>
          </form>
        </div>

        {/* Right Column: List of existing projects */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bento-card p-6">
            <h2 className="font-display text-lg font-bold mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
              <Briefcase className="h-5 w-5 text-[#00c8ff]" />
              Published Case Studies
            </h2>

            {projectsLoading ? (
              <div className="flex flex-col items-center justify-center py-16 text-slate-400 gap-2">
                <span className="animate-spin h-5 w-5 border-2 border-[#00c8ff] border-t-transparent rounded-full" />
                <span>Loading portfolio database...</span>
              </div>
            ) : projects.length > 0 ? (
              <div className="space-y-4">
                {projects.map((project: any) => (
                  <div
                    key={project.id}
                    className="border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-start bg-white/5 relative"
                  >
                    {/* Small image preview inside list */}
                    {project.image && (
                      <div className="w-full sm:w-28 shrink-0 aspect-video sm:aspect-square rounded-xl overflow-hidden border border-border/40 relative">
                        <img
                          src={project.image}
                          alt=""
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      </div>
                    )}

                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-primary">
                          {project.location}
                        </span>
                        <span className="text-[9px] uppercase font-bold text-muted-foreground bg-muted/20 border border-border px-2 py-0.5 rounded-full">
                          {project.category}
                        </span>
                      </div>

                      <h3 className="font-display font-semibold text-base leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {project.summary}
                      </p>

                      <div className="flex flex-wrap gap-2.5 pt-2 text-[10px]">
                        {project.metrics?.map((m: any) => (
                          <span
                            key={m.label}
                            className="bg-card px-2.5 py-1 rounded border border-border text-muted-foreground"
                          >
                            <strong className="text-foreground">{m.value}</strong> {m.label}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="absolute top-4 right-4 flex gap-2">
                      <button
                        onClick={() => {
                          setEditingProject(project);
                          setTitle(project.title);
                          setSummary(project.summary);
                          setLocation(project.location);
                          setCategory(project.category);
                          setMetric1Val(project.metrics?.[0]?.value || "");
                          setMetric1Label(project.metrics?.[0]?.label || "");
                          setMetric2Val(project.metrics?.[1]?.value || "");
                          setMetric2Label(project.metrics?.[1]?.label || "");
                          setMetric3Val(project.metrics?.[2]?.value || "");
                          setMetric3Label(project.metrics?.[2]?.label || "");

                          setSeoTitle(project.seoTitle || "");
                          setSeoDesc(project.seoDesc || "");
                          setSeoKeywords(project.seoKeywords || "");

                          setImagePreview(project.image || null);
                          setImageFile(undefined); // Reset file input
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition"
                        title="Edit Project"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Remove "${project.title}" from public portfolio?`)) {
                            deleteMutation.mutate({ id: project.id });
                          }
                        }}
                        disabled={deleteMutation.isPending}
                        className="p-1.5 text-muted-foreground hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
                        title="Delete Project"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 border border-dashed border-border rounded-2xl bg-card/10 text-muted-foreground">
                <Layers className="h-8 w-8 mx-auto opacity-50 mb-2" />
                <div className="text-xs">No projects registered. Use form to create one.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
