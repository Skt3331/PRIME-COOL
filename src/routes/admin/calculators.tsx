import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCalculatorsList, updateCalculatorMeta } from "../../lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Gauge, Pencil, CheckCircle2, XCircle } from "lucide-react";

export const Route = createFileRoute("/admin/calculators")({
  head: () => ({
    meta: [{ title: "Calculators Management — Prime Cool Admin" }],
  }),
  component: AdminCalculatorsPage,
});

function AdminCalculatorsPage() {
  const queryClient = useQueryClient();
  const [editingCalc, setEditingCalc] = useState<any | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [seoTitle, setSeoTitle] = useState("");
  const [seoDesc, setSeoDesc] = useState("");
  const [seoKeywords, setSeoKeywords] = useState("");

  // Query calculators
  const { data: calcsData, isLoading: calcsLoading } = useQuery({
    queryKey: ["adminCalculators"],
    queryFn: () => getCalculatorsList(),
  });

  const resetForm = () => {
    setEditingCalc(null);
    setTitle("");
    setDescription("");
    setIsActive(true);
    setSeoTitle("");
    setSeoDesc("");
    setSeoKeywords("");
  };

  const updateMutation = useMutation({
    mutationFn: (variables: any) => updateCalculatorMeta({ data: variables }),
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Calculator updated successfully!");
        resetForm();
        queryClient.invalidateQueries({ queryKey: ["adminCalculators"] });
      } else {
        toast.error("Failed to update calculator.");
      }
    },
    onError: (err) => {
      console.error(err);
      toast.error("An error occurred while updating calculator.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      toast.warning("Please fill in the title and description.");
      return;
    }

    if (editingCalc) {
      updateMutation.mutate({
        id: editingCalc.id,
        title,
        description,
        isActive,
        seoTitle,
        seoDesc,
        seoKeywords,
      });
    }
  };

  const calculators = (calcsData as any)?.calculators || [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold leading-tight">
          Calculators <span className="text-gradient">Manager</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage the visibility and SEO metadata of your HVAC calculators.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 bento-card p-6 space-y-6">
          <h2 className="font-display text-lg font-bold flex items-center gap-2 border-b border-white/10 pb-3">
            {editingCalc ? (
              <>
                <Pencil className="h-5 w-5 text-[#00c8ff]" />
                Edit Calculator:{" "}
                <span className="text-slate-400 font-normal truncate max-w-[200px]">
                  {editingCalc.title}
                </span>
              </>
            ) : (
              <>Select a Calculator to Edit</>
            )}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            <div className="space-y-1">
              <Label htmlFor="calc-title" className="text-xs text-muted-foreground">
                Calculator Title
              </Label>
              <Input
                id="calc-title"
                type="text"
                placeholder="e.g. AC Tonnage Calculator"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="rounded-xl bg-background/50"
                disabled={!editingCalc}
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="calc-desc" className="text-xs text-muted-foreground">
                Description (SEO & UI Meta)
              </Label>
              <Textarea
                id="calc-desc"
                placeholder="Detailed description of the calculator..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="rounded-xl min-h-[100px] bg-background/50 text-xs"
                disabled={!editingCalc}
                required
              />
            </div>

            <div className="flex items-center space-x-2 mt-6">
              <input
                type="checkbox"
                id="calc-active"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                disabled={!editingCalc}
                className="rounded text-primary focus:ring-primary h-4 w-4 bg-background/50 border-input"
              />
              <Label
                htmlFor="calc-active"
                className="text-xs flex items-center gap-1 cursor-pointer"
              >
                Is Active (Visible to public)
              </Label>
            </div>

            <div className="border-t border-white/10 pt-6 mt-6">
              <h3 className="text-sm font-semibold mb-3">SEO Overrides</h3>
              <div className="space-y-4">
                <div className="space-y-1">
                  <Label>SEO Title</Label>
                  <Input
                    placeholder="e.g. AC Tonnage Calculator | Prime Cool"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    className="rounded-lg bg-background/50 border-white/10"
                    disabled={!editingCalc}
                  />
                </div>
                <div className="space-y-1">
                  <Label>SEO Description</Label>
                  <Textarea
                    rows={2}
                    placeholder="e.g. Calculate your required AC capacity based on room size..."
                    value={seoDesc}
                    onChange={(e) => setSeoDesc(e.target.value)}
                    className="rounded-lg bg-background/50 border-white/10"
                    disabled={!editingCalc}
                  />
                </div>
                <div className="space-y-1">
                  <Label>SEO Keywords (Comma separated)</Label>
                  <Input
                    placeholder="e.g. ac tonnage calculator, hvac calculator"
                    value={seoKeywords}
                    onChange={(e) => setSeoKeywords(e.target.value)}
                    className="rounded-lg bg-background/50 border-white/10"
                    disabled={!editingCalc}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-6">
              {editingCalc && (
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
                disabled={!editingCalc || updateMutation.isPending}
                className="flex-1 rounded-xl py-3 font-semibold mt-2"
              >
                {updateMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="bento-card p-6">
            <h2 className="font-display text-lg font-bold mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
              <Gauge className="h-5 w-5 text-[#00c8ff]" />
              Available Calculators
              <span className="ml-auto text-xs text-slate-400 font-normal">
                {calculators.length} total
              </span>
            </h2>

            {calcsLoading ? (
              <div className="flex flex-col items-center justify-center py-16 text-slate-400 gap-2">
                <span className="animate-spin h-5 w-5 border-2 border-[#00c8ff] border-t-transparent rounded-full" />
                <span>Loading calculators database...</span>
              </div>
            ) : calculators.length > 0 ? (
              <div className="space-y-3">
                {calculators.map((c: any) => (
                  <div
                    key={c.id}
                    className="border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row gap-3 items-start bg-white/5 relative group hover:border-[#00c8ff]/50 transition-colors"
                  >
                    <div className="flex-1 space-y-1.5 pr-16">
                      <div className="flex flex-wrap items-center gap-2">
                        {c.isActive ? (
                          <span className="text-[9px] uppercase font-bold text-green-400 bg-green-400/10 border border-green-400/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle2 className="h-2.5 w-2.5" /> ACTIVE
                          </span>
                        ) : (
                          <span className="text-[9px] uppercase font-bold text-rose-400 bg-rose-400/10 border border-rose-400/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <XCircle className="h-2.5 w-2.5" /> DISABLED
                          </span>
                        )}
                        <span className="text-[9px] text-muted-foreground bg-border/50 px-2 py-0.5 rounded-full">
                          Slug: /{c.slug}
                        </span>
                      </div>

                      <h3 className="font-display font-semibold text-sm leading-snug">{c.title}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {c.description}
                      </p>
                    </div>

                    <div className="absolute top-4 right-4 flex gap-2">
                      <button
                        onClick={() => {
                          setEditingCalc(c);
                          setTitle(c.title);
                          setDescription(c.description);
                          setIsActive(!!c.isActive);
                          setSeoTitle(c.seoTitle || "");
                          setSeoDesc(c.seoDesc || "");
                          setSeoKeywords(c.seoKeywords || "");
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition"
                        title="Edit Calculator"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 border border-dashed border-border rounded-2xl bg-card/10 text-muted-foreground">
                <div className="text-xs">No calculators found in the database.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
