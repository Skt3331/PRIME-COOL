import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAdminBlogs, createBlog, updateBlog, deleteBlog } from "../../lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  BookOpen,
  Plus,
  Trash2,
  Calendar,
  FileText,
  FileImage,
  Pencil,
  X,
  Tag,
  User,
  Search,
} from "lucide-react";

export const Route = createFileRoute("/admin/blogs")({
  head: () => ({
    meta: [{ title: "Blogs Management — Prime Cool Admin" }],
  }),
  component: AdminBlogsPage,
});

const BLOG_CATEGORIES = [
  "Comparisons",
  "Maintenance",
  "Troubleshooting",
  "Industrial",
  "Calculators",
  "Guides",
  "News",
];

function AdminBlogsPage() {
  const queryClient = useQueryClient();
  const [editingBlog, setEditingBlog] = useState<any | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Guides");
  const [author, setAuthor] = useState("Saurav Temgire");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDesc, setSeoDesc] = useState("");
  const [showSeoFields, setShowSeoFields] = useState(false);

  const [imageFile, setImageFile] = useState<{ name: string; base64: string } | undefined>(
    undefined,
  );
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Query blogs
  const { data: blogsData, isLoading: blogsLoading } = useQuery({
    queryKey: ["adminBlogs"],
    queryFn: () => getAdminBlogs(),
  });

  // Slug generator from title
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingBlog) {
      const autoSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      setSlug(autoSlug);
      // Auto-fill SEO title if not manually set
      if (!seoTitle) setSeoTitle(val + " — Prime Cool");
    }
  };

  const resetForm = () => {
    setEditingBlog(null);
    setTitle("");
    setSlug("");
    setSummary("");
    setContent("");
    setCategory("Guides");
    setAuthor("Saurav Temgire");
    setSeoTitle("");
    setSeoDesc("");
    setImageFile(undefined);
    setImagePreview(null);
    setShowSeoFields(false);
  };

  // Mutations
  const createMutation = useMutation({
    mutationFn: (variables: any) => createBlog({ data: variables }),
    onSuccess: (data) => {
      if (data.success) {
        toast.success("New blog article published successfully!");
        resetForm();
        queryClient.invalidateQueries({ queryKey: ["adminBlogs"] });
      } else {
        toast.error("Failed to publish blog.");
      }
    },
    onError: (err) => {
      console.error(err);
      toast.error("An error occurred while creating blog.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (variables: any) => updateBlog({ data: variables }),
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Blog article updated successfully!");
        resetForm();
        queryClient.invalidateQueries({ queryKey: ["adminBlogs"] });
      } else {
        toast.error("Failed to update blog.");
      }
    },
    onError: (err) => {
      console.error(err);
      toast.error("An error occurred while updating blog.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (variables: { id: string }) => deleteBlog({ data: variables }),
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Blog article deleted successfully.");
        queryClient.invalidateQueries({ queryKey: ["adminBlogs"] });
      } else {
        toast.error("Failed to delete blog.");
      }
    },
  });

  // Handle client file processing to Base64
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.warning("Image file size must be less than 2MB.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Str = (reader.result as string).split(",")[1];
        setImageFile({
          name: file.name,
          base64: base64Str,
        });
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !slug.trim() || !summary.trim() || !content.trim()) {
      toast.warning("Please fill in the title, slug, summary, and article content.");
      return;
    }

    const payload = {
      title,
      slug,
      summary,
      content,
      category,
      author,
      seoTitle: seoTitle || undefined,
      seoDesc: seoDesc || undefined,
      imageFile,
    };

    if (editingBlog) {
      updateMutation.mutate({ id: editingBlog.id, ...payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const blogs = (blogsData as any)?.blogs || [];

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="font-display text-3xl font-bold leading-tight">
          Blogs <span className="text-gradient">Manager</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Publish new industry articles, troubleshooting guides, and SEO-optimized content.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form to add blog */}
        <div className="lg:col-span-5 surface-card rounded-3xl border border-border p-6 space-y-6">
          <h2 className="font-display text-lg font-bold flex items-center gap-2 border-b border-border/50 pb-3">
            {editingBlog ? (
              <>
                <Pencil className="h-5 w-5 text-primary" />
                Edit Article:{" "}
                <span className="text-muted-foreground font-normal truncate max-w-[200px]">
                  {editingBlog.title}
                </span>
              </>
            ) : (
              <>
                <Plus className="h-5 w-5 text-primary" />
                Add New Article
              </>
            )}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            {/* Title */}
            <div className="space-y-1">
              <Label htmlFor="blog-title" className="text-xs text-muted-foreground">
                Article Title
              </Label>
              <Input
                id="blog-title"
                type="text"
                placeholder="e.g. Carrier AC vs Hitachi AC: Which is Better?"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="rounded-xl bg-background/50"
                required
              />
            </div>

            {/* Slug */}
            <div className="space-y-1">
              <Label htmlFor="blog-slug" className="text-xs text-muted-foreground">
                URL Slug
              </Label>
              <Input
                id="blog-slug"
                type="text"
                placeholder="e.g. carrier-ac-vs-hitachi-ac"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="rounded-xl bg-background/50 font-mono text-xs"
                required
              />
            </div>

            {/* Category + Author */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label
                  htmlFor="blog-cat"
                  className="text-xs text-muted-foreground flex items-center gap-1"
                >
                  <Tag className="h-3 w-3" /> Category
                </Label>
                <select
                  id="blog-cat"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-input bg-background/50 px-3 py-2.5 text-xs text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  {BLOG_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <Label
                  htmlFor="blog-author"
                  className="text-xs text-muted-foreground flex items-center gap-1"
                >
                  <User className="h-3 w-3" /> Author
                </Label>
                <Input
                  id="blog-author"
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="rounded-xl bg-background/50"
                />
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-1">
              <Label htmlFor="blog-summary" className="text-xs text-muted-foreground">
                Brief Summary
              </Label>
              <Textarea
                id="blog-summary"
                placeholder="Brief summary shown in article cards and feeds..."
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="rounded-xl min-h-[70px] bg-background/50"
                required
              />
            </div>

            {/* Content */}
            <div className="space-y-1">
              <Label htmlFor="blog-content" className="text-xs text-muted-foreground">
                Content (Markdown supported)
              </Label>
              <Textarea
                id="blog-content"
                placeholder="Write your article using Markdown (## Headers, **bold**, tables, lists)..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="rounded-xl min-h-[200px] bg-background/50 font-mono text-xs"
                required
              />
            </div>

            {/* SEO Fields toggle */}
            <div className="border border-border/60 rounded-2xl overflow-hidden">
              <button
                type="button"
                onClick={() => setShowSeoFields(!showSeoFields)}
                className="w-full flex items-center gap-2 px-4 py-3 text-xs font-semibold text-primary hover:bg-primary/5 transition"
              >
                <Search className="h-3.5 w-3.5" />
                SEO Override Fields {showSeoFields ? "▲" : "▼"}
              </button>
              {showSeoFields && (
                <div className="p-4 space-y-3 bg-background/20">
                  <div className="space-y-1">
                    <Label className="text-[10px] text-muted-foreground">
                      SEO Title (overrides &lt;title&gt; tag)
                    </Label>
                    <Input
                      type="text"
                      placeholder="Carrier AC vs Hitachi AC 2025 — Expert Review"
                      value={seoTitle}
                      onChange={(e) => setSeoTitle(e.target.value)}
                      className="rounded-lg h-8 px-2 text-xs bg-background/50"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] text-muted-foreground">
                      SEO Description (meta description)
                    </Label>
                    <Textarea
                      placeholder="Expert comparison of Carrier and Hitachi ACs for Indian conditions..."
                      value={seoDesc}
                      onChange={(e) => setSeoDesc(e.target.value)}
                      className="rounded-lg min-h-[60px] text-xs bg-background/50"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label htmlFor="blog-img" className="text-xs text-muted-foreground">
                Featured Header Photo
              </Label>
              <div className="flex items-center gap-3">
                <Input
                  id="blog-img"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="rounded-xl file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-[10px] file:font-semibold file:bg-primary file:text-primary-foreground hover:file:opacity-90 bg-background/50 cursor-pointer text-xs"
                />
              </div>
              {imagePreview && (
                <div className="relative border border-border rounded-xl overflow-hidden aspect-video bg-neutral-900 mt-2">
                  <img
                    src={imagePreview}
                    alt="Upload preview"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImageFile(undefined);
                      setImagePreview(null);
                    }}
                    className="absolute top-2 right-2 bg-neutral-950/80 hover:bg-neutral-900 text-white rounded-full p-1 text-[10px]"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              {editingBlog && (
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
                {editingBlog
                  ? updateMutation.isPending
                    ? "Saving..."
                    : "Save Changes"
                  : createMutation.isPending
                    ? "Publishing..."
                    : "Publish Article"}
              </Button>
            </div>
          </form>
        </div>

        {/* Right Column: List of existing blogs */}
        <div className="lg:col-span-7 space-y-6">
          <div className="surface-card rounded-3xl border border-border p-6">
            <h2 className="font-display text-lg font-bold mb-4 flex items-center gap-2 border-b border-border/50 pb-3">
              <BookOpen className="h-5 w-5 text-primary" />
              Published Articles
              <span className="ml-auto text-xs text-muted-foreground font-normal">
                {blogs.length} total
              </span>
            </h2>

            {blogsLoading ? (
              <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-2">
                <span className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full" />
                <span>Loading blogs database...</span>
              </div>
            ) : blogs.length > 0 ? (
              <div className="space-y-3">
                {blogs.map((b: any) => (
                  <div
                    key={b.id}
                    className="border border-border/60 rounded-2xl p-4 flex flex-col sm:flex-row gap-3 items-start bg-background/20 relative"
                  >
                    {/* Small image preview inside list */}
                    {b.image && (
                      <div className="w-full sm:w-20 shrink-0 aspect-video sm:aspect-square rounded-lg overflow-hidden border border-border/40 relative">
                        <img
                          src={b.image}
                          alt=""
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      </div>
                    )}

                    <div className="flex-1 space-y-1 pr-16">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[9px] uppercase tracking-wider font-bold text-primary font-mono flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(b.createdAt).toLocaleDateString("en-IN", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        {b.category && (
                          <span className="text-[9px] uppercase font-bold text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-1.5 py-0.5 rounded-full">
                            {b.category}
                          </span>
                        )}
                        {b.author && (
                          <span className="text-[9px] text-muted-foreground/60">by {b.author}</span>
                        )}
                      </div>

                      <h3 className="font-display font-semibold text-sm leading-snug">{b.title}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {b.summary}
                      </p>
                      <div className="text-[9px] font-mono text-muted-foreground/50">/{b.slug}</div>
                    </div>

                    <div className="absolute top-4 right-4 flex gap-2">
                      <button
                        onClick={() => {
                          setEditingBlog(b);
                          setTitle(b.title);
                          setSlug(b.slug);
                          setSummary(b.summary);
                          setContent(b.content);
                          setCategory(b.category || "Guides");
                          setAuthor(b.author || "Saurav Temgire");
                          setSeoTitle(b.seoTitle || "");
                          setSeoDesc(b.seoDesc || "");
                          setImagePreview(b.image || null);
                          setImageFile(undefined);
                          if (b.seoTitle || b.seoDesc) setShowSeoFields(true);
                        }}
                        className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition"
                        title="Edit Article"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Remove "${b.title}" from website?`)) {
                            deleteMutation.mutate({ id: b.id });
                          }
                        }}
                        disabled={deleteMutation.isPending}
                        className="p-1.5 text-muted-foreground hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
                        title="Delete Article"
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
                <div className="text-xs">
                  No blog articles registered. Use the form to write one.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
