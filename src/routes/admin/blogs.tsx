import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAdminBlogs, createBlog, updateBlog, deleteBlog } from "../../lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageDropzone } from "@/components/ImageDropzone";
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
  const [seoKeywords, setSeoKeywords] = useState("");
  const [showSeoFields, setShowSeoFields] = useState(false);

  const [imageFile, setImageFile] = useState<{ name: string; base64: string } | undefined>(
    undefined,
  );
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 25;

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
    setSeoKeywords("");
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
  const handleImageProcessed = (
    fileData: { name: string; base64: string } | undefined,
    previewUrl: string | null,
  ) => {
    setImageFile(fileData);
    setImagePreview(previewUrl);
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
      seoKeywords: seoKeywords || undefined,
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
        <div className="lg:col-span-5 bento-card p-6 space-y-6">
          <h2 className="font-display text-lg font-bold flex items-center gap-2 border-b border-white/10 pb-3">
            {editingBlog ? (
              <>
                <Pencil className="h-5 w-5 text-[#00c8ff]" />
                Edit Article:{" "}
                <span className="text-slate-400 font-normal truncate max-w-[200px]">
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
                <div className="p-4 space-y-4 bg-background/20">
                    <div className="space-y-1">
                      <Label htmlFor="seoTitle" className="text-xs text-slate-400">
                        SEO Meta Title
                      </Label>
                      <Input
                        id="seoTitle"
                        placeholder="e.g. 5 Signs Your AC Needs Repair | Prime Cool"
                        value={seoTitle}
                        onChange={(e) => setSeoTitle(e.target.value)}
                        className="rounded-lg bg-background/50 border-white/10"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="seoDesc" className="text-xs text-slate-400">
                        SEO Meta Description
                      </Label>
                      <Textarea
                        id="seoDesc"
                        rows={2}
                        placeholder="A short snippet that appears in Google search results..."
                        value={seoDesc}
                        onChange={(e) => setSeoDesc(e.target.value)}
                        className="rounded-lg bg-background/50 border-white/10"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="seoKeywords" className="text-xs text-slate-400">
                        SEO Keywords (Comma separated)
                      </Label>
                      <Input
                        id="seoKeywords"
                        placeholder="e.g. ac repair, hvac guide, prime cool blog"
                        value={seoKeywords}
                        onChange={(e) => setSeoKeywords(e.target.value)}
                        className="rounded-lg bg-background/50 border-white/10"
                      />
                    </div>
                </div>
              )}
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Featured Header Photo</Label>
              <ImageDropzone
                onImageProcessed={handleImageProcessed}
                initialPreview={imagePreview}
              />
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
          <div className="bento-card p-6">
            <h2 className="font-display text-lg font-bold mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
              <BookOpen className="h-5 w-5 text-[#00c8ff]" />
              Published Articles
              <span className="ml-auto text-xs text-slate-400 font-normal">
                {blogs.length} total
              </span>
            </h2>

            {(() => {
              const totalPages = Math.ceil(blogs.length / ITEMS_PER_PAGE);
              const paginatedBlogs = blogs.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

              if (blogsLoading) {
                return (
                  <div className="flex flex-col items-center justify-center py-16 text-slate-400 gap-2">
                    <span className="animate-spin h-5 w-5 border-2 border-[#00c8ff] border-t-transparent rounded-full" />
                    <span>Loading blogs database...</span>
                  </div>
                );
              }

              return blogs.length > 0 ? (
              <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5">
                <table className="w-full text-left text-sm">
                  <thead className="bg-black/20 text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 font-medium">Image</th>
                      <th className="px-4 py-3 font-medium">Article Details</th>
                      <th className="px-4 py-3 font-medium">Category / Author</th>
                      <th className="px-4 py-3 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {paginatedBlogs.map((b: any) => (
                      <tr key={b.id} className="hover:bg-white/5 transition">
                        <td className="px-4 py-3 align-top">
                          {b.image ? (
                            <div className="w-16 h-12 rounded overflow-hidden relative border border-border/40">
                              <img src={b.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
                            </div>
                          ) : (
                            <div className="w-16 h-12 rounded bg-muted flex items-center justify-center text-muted-foreground border border-border/40">
                              <FileImage className="h-4 w-4" />
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 align-top">
                          <h3 className="font-display font-semibold text-sm leading-snug max-w-[200px] line-clamp-2">{b.title}</h3>
                          <div className="text-[10px] font-mono text-muted-foreground/60 mt-1 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(b.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                          </div>
                          <div className="text-[10px] font-mono text-muted-foreground/50 mt-0.5">/{b.slug}</div>
                        </td>
                        <td className="px-4 py-3 align-top">
                           {b.category && (
                            <span className="text-[10px] uppercase font-bold text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-1.5 py-0.5 rounded-full block w-max mb-1">
                              {b.category}
                            </span>
                          )}
                          {b.author && (
                            <span className="text-[10px] text-muted-foreground/60 block">by {b.author}</span>
                          )}
                        </td>
                        <td className="px-4 py-3 align-top text-right space-x-2 whitespace-nowrap">
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
                              setSeoKeywords(b.seoKeywords || "");
                              setImagePreview(b.image || null);
                              setImageFile(undefined);
                              if (b.seoTitle || b.seoDesc) setShowSeoFields(true);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition inline-flex"
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
                            className="p-1.5 text-muted-foreground hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition inline-flex"
                            title="Delete Article"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {totalPages > 1 && (
                  <div className="flex items-center justify-between px-4 py-3 border-t border-white/10 bg-black/10">
                    <span className="text-xs text-muted-foreground">
                      Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, blogs.length)} of {blogs.length}
                    </span>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        className="h-7 text-xs"
                      >
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        className="h-7 text-xs"
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-16 border border-dashed border-border rounded-2xl bg-card/10 text-muted-foreground">
                <FileText className="h-8 w-8 mx-auto opacity-50 mb-2" />
                <div className="text-xs">
                  No blog articles registered. Use the form to write one.
                </div>
              </div>
            );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}
