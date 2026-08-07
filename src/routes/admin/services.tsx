import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAdminServices, createService, updateService, deleteService } from "../../lib/api";
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
  FileText,
  Pencil,
  Tag,
  Hash,
  Star,
  Image as ImageIcon,
} from "lucide-react";

export const Route = createFileRoute("/admin/services")({
  head: () => ({
    meta: [{ title: "Services Management — Prime Cool Admin" }],
  }),
  component: AdminServicesPage,
});

const SERVICE_CATEGORIES = ["domestic", "commercial", "industrial"];

function AdminServicesPage() {
  const queryClient = useQueryClient();
  const [editingService, setEditingService] = useState<any | null>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("domestic");
  const [iconName, setIconName] = useState("Wind");
  const [isPopular, setIsPopular] = useState(false);
  const [orderIndex, setOrderIndex] = useState(0);

  const [seoTitle, setSeoTitle] = useState("");
  const [seoDesc, setSeoDesc] = useState("");
  const [seoKeywords, setSeoKeywords] = useState("");

  const [imageFile, setImageFile] = useState<{ name: string; base64: string } | undefined>(
    undefined,
  );
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Query services
  const { data: servicesData, isLoading: servicesLoading } = useQuery({
    queryKey: ["adminServices"],
    queryFn: () => getAdminServices(),
  });

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingService) {
      const autoSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      setSlug(autoSlug);
    }
  };

  const resetForm = () => {
    setEditingService(null);
    setTitle("");
    setSlug("");
    setDescription("");
    setCategory("domestic");
    setIconName("Wind");
    setIsPopular(false);
    setOrderIndex(0);
    setImageFile(undefined);
    setImagePreview(null);
    setSeoTitle("");
    setSeoDesc("");
    setSeoKeywords("");
  };

  const createMutation = useMutation({
    mutationFn: (variables: any) => createService({ data: variables }),
    onSuccess: (data) => {
      if (data.success) {
        toast.success("New service published successfully!");
        resetForm();
        queryClient.invalidateQueries({ queryKey: ["adminServices"] });
      } else {
        toast.error("Failed to publish service.");
      }
    },
    onError: (err) => {
      console.error(err);
      toast.error("An error occurred while creating service.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (variables: any) => updateService({ data: variables }),
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Service updated successfully!");
        resetForm();
        queryClient.invalidateQueries({ queryKey: ["adminServices"] });
      } else {
        toast.error("Failed to update service.");
      }
    },
    onError: (err) => {
      console.error(err);
      toast.error("An error occurred while updating service.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (variables: { id: string }) => deleteService({ data: variables }),
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Service deleted successfully.");
        queryClient.invalidateQueries({ queryKey: ["adminServices"] });
      } else {
        toast.error("Failed to delete service.");
      }
    },
  });

  const handleImageProcessed = (
    fileData: { name: string; base64: string } | undefined,
    previewUrl: string | null,
  ) => {
    setImageFile(fileData);
    setImagePreview(previewUrl);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !slug.trim() || !description.trim()) {
      toast.warning("Please fill in the title, slug, and description.");
      return;
    }

    const payload = {
      title,
      slug,
      description,
      category,
      icon: iconName,
      isPopular,
      orderIndex: Number(orderIndex),
      imageFile,
      seoTitle,
      seoDesc,
      seoKeywords,
    };

    if (editingService) {
      updateMutation.mutate({ id: editingService.id, ...payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const services = (servicesData as any)?.services || [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold leading-tight">
          Services <span className="text-gradient">Manager</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Add, edit, or remove services offered on the website.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 bento-card p-6 space-y-6">
          <h2 className="font-display text-lg font-bold flex items-center gap-2 border-b border-white/10 pb-3">
            {editingService ? (
              <>
                <Pencil className="h-5 w-5 text-[#00c8ff]" />
                Edit Service:{" "}
                <span className="text-slate-400 font-normal truncate max-w-[200px]">
                  {editingService.title}
                </span>
              </>
            ) : (
              <>
                <Plus className="h-5 w-5 text-primary" />
                Add New Service
              </>
            )}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            <div className="space-y-1">
              <Label htmlFor="srv-title" className="text-xs text-muted-foreground">
                Service Title
              </Label>
              <Input
                id="srv-title"
                type="text"
                placeholder="e.g. Split AC Installation"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="rounded-xl bg-background/50"
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="srv-slug" className="text-xs text-muted-foreground">
                URL Slug
              </Label>
              <Input
                id="srv-slug"
                type="text"
                placeholder="e.g. split-ac-installation"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="rounded-xl bg-background/50 font-mono text-xs"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label
                  htmlFor="srv-cat"
                  className="text-xs text-muted-foreground flex items-center gap-1"
                >
                  <Tag className="h-3 w-3" /> Category
                </Label>
                <select
                  id="srv-cat"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-input bg-background/50 px-3 py-2.5 text-xs text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  {SERVICE_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <Label
                  htmlFor="srv-icon"
                  className="text-xs text-muted-foreground flex items-center gap-1"
                >
                  <ImageIcon className="h-3 w-3" /> Icon (Lucide)
                </Label>
                <Input
                  id="srv-icon"
                  type="text"
                  placeholder="e.g. Wind"
                  value={iconName}
                  onChange={(e) => setIconName(e.target.value)}
                  className="rounded-xl bg-background/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label
                  htmlFor="srv-order"
                  className="text-xs text-muted-foreground flex items-center gap-1"
                >
                  <Hash className="h-3 w-3" /> Display Order
                </Label>
                <Input
                  id="srv-order"
                  type="number"
                  value={orderIndex}
                  onChange={(e) => setOrderIndex(parseInt(e.target.value))}
                  className="rounded-xl bg-background/50"
                />
              </div>

              <div className="flex items-center space-x-2 mt-6">
                <input
                  type="checkbox"
                  id="srv-popular"
                  checked={isPopular}
                  onChange={(e) => setIsPopular(e.target.checked)}
                  className="rounded text-primary focus:ring-primary h-4 w-4 bg-background/50 border-input"
                />
                <Label
                  htmlFor="srv-popular"
                  className="text-xs flex items-center gap-1 cursor-pointer"
                >
                  <Star className="h-3 w-3 text-amber-400" /> Mark as Popular
                </Label>
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="srv-desc" className="text-xs text-muted-foreground">
                Description
              </Label>
              <Textarea
                id="srv-desc"
                placeholder="Detailed description of the service..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="rounded-xl min-h-[100px] bg-background/50 text-xs"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Featured Image</Label>
              <ImageDropzone
                onImageProcessed={handleImageProcessed}
                initialPreview={imagePreview}
              />
            </div>

            <div className="border-t border-border pt-6 mt-6">
              <h3 className="text-lg font-semibold mb-4">SEO Overrides (Optional)</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Leave blank to use the global SEO pattern for services. Fill them in to override meta tags.
              </p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>SEO Title</Label>
                  <Input
                    placeholder="e.g. Best AC Repair Services | Prime Cool"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>SEO Description</Label>
                  <Textarea
                    rows={2}
                    placeholder="e.g. Professional repair and maintenance services..."
                    value={seoDesc}
                    onChange={(e) => setSeoDesc(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>SEO Keywords (Comma separated)</Label>
                  <Input
                    placeholder="e.g. AC repair, split AC, window AC"
                    value={seoKeywords}
                    onChange={(e) => setSeoKeywords(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              {editingService && (
                <Button
                  type="button"
                  onClick={resetForm}
                  variant="outline"
                  className="flex-1 rounded-xl py-3 font-semibold mt-2"
                >
                  Cancel
                </Button>
              )}
              <Button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
                className="flex-1 rounded-xl py-3 font-semibold mt-2"
              >
                {editingService
                  ? updateMutation.isPending
                    ? "Saving..."
                    : "Save Changes"
                  : createMutation.isPending
                    ? "Publishing..."
                    : "Publish Service"}
              </Button>
            </div>
          </form>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="bento-card p-6">
            <h2 className="font-display text-lg font-bold mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
              <Briefcase className="h-5 w-5 text-[#00c8ff]" />
              Published Services
              <span className="ml-auto text-xs text-slate-400 font-normal">
                {services.length} total
              </span>
            </h2>

            {servicesLoading ? (
              <div className="flex flex-col items-center justify-center py-16 text-slate-400 gap-2">
                <span className="animate-spin h-5 w-5 border-2 border-[#00c8ff] border-t-transparent rounded-full" />
                <span>Loading services database...</span>
              </div>
            ) : services.length > 0 ? (
              <div className="space-y-3">
                {services.map((s: any) => (
                  <div
                    key={s.id}
                    className="border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row gap-3 items-start bg-white/5 relative group hover:border-[#00c8ff]/50 transition-colors"
                  >
                    {s.image && (
                      <div className="w-full sm:w-24 shrink-0 aspect-video rounded-lg overflow-hidden border border-border/40 relative">
                        <img
                          src={s.image}
                          alt=""
                          className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}

                    <div className="flex-1 space-y-1.5 pr-16">
                      <div className="flex flex-wrap items-center gap-2">
                        {s.category && (
                          <span className="text-[9px] uppercase font-bold text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-2 py-0.5 rounded-full">
                            {s.category}
                          </span>
                        )}
                        {s.isPopular && (
                          <span className="text-[9px] uppercase font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Star className="h-2.5 w-2.5" /> POPULAR
                          </span>
                        )}
                        <span className="text-[9px] text-muted-foreground bg-border/50 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Hash className="h-2.5 w-2.5" /> Order: {s.orderIndex}
                        </span>
                      </div>

                      <h3 className="font-display font-semibold text-sm leading-snug">{s.title}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {s.description}
                      </p>
                    </div>

                    <div className="absolute top-4 right-4 flex gap-2">
                      <button
                        onClick={() => {
                          setEditingService(s);
                          setTitle(s.title);
                          setSlug(s.slug);
                          setDescription(s.description);
                          setCategory(s.category || "domestic");
                          setIconName(s.icon || "Wind");
                          setIsPopular(!!s.isPopular);
                          setOrderIndex(s.orderIndex || 0);
                          setImagePreview(s.image || null);
                          setImageFile(undefined);
                          setSeoTitle(s.seoTitle || "");
                          setSeoDesc(s.seoDesc || "");
                          setSeoKeywords(s.seoKeywords || "");
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition"
                        title="Edit Service"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Remove "${s.title}"?`)) {
                            deleteMutation.mutate({ id: s.id });
                          }
                        }}
                        disabled={deleteMutation.isPending}
                        className="p-1.5 text-muted-foreground hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
                        title="Delete Service"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 border border-dashed border-border rounded-2xl bg-card/10 text-muted-foreground">
                <FileText className="h-8 w-8 mx-auto opacity-50 mb-2" />
                <div className="text-xs">No services registered. Use the form to add one.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
