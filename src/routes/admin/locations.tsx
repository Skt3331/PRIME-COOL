import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getLocations, addLocation, updateLocation, deleteLocation } from "../../lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  MapPin,
  Plus,
  Trash2,
  FileText,
  Pencil,
  Tag,
  Map,
  Save,
} from "lucide-react";

export const Route = createFileRoute("/admin/locations")({
  head: () => ({
    meta: [{ title: "Locations Management — Prime Cool Admin" }],
  }),
  component: AdminLocationsPage,
});

function AdminLocationsPage() {
  const queryClient = useQueryClient();
  const [editingLocation, setEditingLocation] = useState<any | null>(null);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [type, setType] = useState("locality");
  const [pincodes, setPincodes] = useState("");
  const [landmarks, setLandmarks] = useState("");
  const [nearbyBusinesses, setNearbyBusinesses] = useState("");
  const [mapEmbedUrl, setMapEmbedUrl] = useState("");
  const [reviewsJson, setReviewsJson] = useState("[]");
  const [faqsJson, setFaqsJson] = useState("[]");
  
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDesc, setSeoDesc] = useState("");
  const [seoKeywords, setSeoKeywords] = useState("");

  const { data: locationsData, isLoading: locationsLoading } = useQuery({
    queryKey: ["adminLocations"],
    queryFn: () => getLocations(),
  });

  const handleNameChange = (val: string) => {
    setName(val);
    if (!editingLocation) {
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
    setEditingLocation(null);
    setName("");
    setSlug("");
    setType("locality");
    setPincodes("");
    setLandmarks("");
    setNearbyBusinesses("");
    setMapEmbedUrl("");
    setReviewsJson("[]");
    setFaqsJson("[]");
    setSeoTitle("");
    setSeoDesc("");
    setSeoKeywords("");
  };

  const createMutation = useMutation({
    mutationFn: (variables: any) => addLocation({ data: variables }),
    onSuccess: (data) => {
      if (data.success) {
        toast.success("New location published successfully!");
        resetForm();
        queryClient.invalidateQueries({ queryKey: ["adminLocations"] });
      } else {
        toast.error("Failed to publish location.");
      }
    },
    onError: (err) => {
      console.error(err);
      toast.error("An error occurred while creating location.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (variables: any) => updateLocation({ data: variables }),
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Location updated successfully!");
        resetForm();
        queryClient.invalidateQueries({ queryKey: ["adminLocations"] });
      } else {
        toast.error("Failed to update location.");
      }
    },
    onError: (err) => {
      console.error(err);
      toast.error("An error occurred while updating location.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (slugToDelete: string) => deleteLocation({ data: { slug: slugToDelete } }),
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Location deleted.");
        resetForm();
        queryClient.invalidateQueries({ queryKey: ["adminLocations"] });
      } else {
        toast.error("Failed to delete location.");
      }
    },
    onError: (err) => {
      console.error(err);
      toast.error("Error deleting location.");
    },
  });

  const handleSave = () => {
    if (!name || !slug) {
      toast.error("Name and Slug are required.");
      return;
    }

    let parsedReviews = [];
    let parsedFaqs = [];
    try {
      parsedReviews = JSON.parse(reviewsJson);
      parsedFaqs = JSON.parse(faqsJson);
    } catch (e) {
      toast.error("Invalid JSON in Reviews or FAQs field.");
      return;
    }

    const payload = {
      slug,
      name,
      type,
      pincodes: pincodes.split(",").map(s => s.trim()).filter(Boolean),
      landmarks: landmarks.split(",").map(s => s.trim()).filter(Boolean),
      nearbyBusinesses: nearbyBusinesses.split(",").map(s => s.trim()).filter(Boolean),
      mapEmbedUrl,
      reviews: parsedReviews,
      faqs: parsedFaqs,
      seoTitle,
      seoDesc,
      seoKeywords,
    };

    if (editingLocation) {
      updateMutation.mutate(payload);
    } else {
      createMutation.mutate(payload);
    }
  };

  const handleEdit = (loc: any) => {
    setEditingLocation(loc);
    setName(loc.name);
    setSlug(loc.slug);
    setType(loc.type);
    setPincodes((loc.pincodes || []).join(", "));
    setLandmarks((loc.landmarks || []).join(", "));
    setNearbyBusinesses((loc.nearbyBusinesses || []).join(", "));
    setMapEmbedUrl(loc.mapEmbedUrl || "");
    setReviewsJson(JSON.stringify(loc.reviews || [], null, 2));
    setFaqsJson(JSON.stringify(loc.faqs || [], null, 2));
    setSeoTitle(loc.seoTitle || "");
    setSeoDesc(loc.seoDesc || "");
    setSeoKeywords(loc.seoKeywords || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (slugToDelete: string) => {
    if (confirm("Are you sure you want to delete this location? This action cannot be undone.")) {
      deleteMutation.mutate(slugToDelete);
    }
  };
  const [searchQuery, setSearchQuery] = useState("");

  const locations = locationsData?.locations || [];
  const filteredLocations = locations.filter((loc: any) =>
    loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loc.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (loc.pincodes || []).join(" ").includes(searchQuery)
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
      <div>
        <h1 className="text-3xl font-display font-bold">Locations Manager</h1>
        <p className="text-muted-foreground mt-1">
          Manage dynamic service areas, cities, and localities.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="surface-card rounded-2xl p-6 space-y-6 border border-border">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              {editingLocation ? (
                <>
                  <Pencil className="h-5 w-5 text-primary" />
                  Edit Location: {editingLocation.name}
                </>
              ) : (
                <>
                  <Plus className="h-5 w-5 text-primary" />
                  Add New Location
                </>
              )}
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Name</Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="e.g. Wagholi"
                    className="pl-9"
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Slug (URL Friendly)</Label>
                <div className="relative">
                  <Tag className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="e.g. wagholi"
                    className="pl-9"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    disabled={!!editingLocation}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Type</Label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="locality">Locality</option>
                <option value="town">Town</option>
                <option value="midc">MIDC / Industrial</option>
                <option value="city">City</option>
                <option value="district">District</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>Pincodes (Comma separated)</Label>
              <Input
                placeholder="412207, 411047"
                value={pincodes}
                onChange={(e) => setPincodes(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Landmarks (Comma separated)</Label>
              <Textarea
                rows={2}
                placeholder="Wagheshwar Temple, Lexicon International School"
                value={landmarks}
                onChange={(e) => setLandmarks(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Nearby Businesses (Comma separated)</Label>
              <Textarea
                rows={2}
                placeholder="Decathlon Wagholi, Reliance Smart"
                value={nearbyBusinesses}
                onChange={(e) => setNearbyBusinesses(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Google Maps Embed URL</Label>
              <div className="relative">
                <Map className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="https://www.google.com/maps/embed?pb=..."
                  className="pl-9"
                  value={mapEmbedUrl}
                  onChange={(e) => setMapEmbedUrl(e.target.value)}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Reviews (JSON Format)</Label>
                <Textarea
                  rows={6}
                  className="font-mono text-xs"
                  value={reviewsJson}
                  onChange={(e) => setReviewsJson(e.target.value)}
                  placeholder={'[\n  {\n    "author": "Aniket",\n    "rating": 5,\n    "text": "Good",\n    "role": "Customer"\n  }\n]'}
                />
              </div>
              <div className="space-y-2">
                <Label>FAQs (JSON Format)</Label>
                <Textarea
                  rows={6}
                  className="font-mono text-xs"
                  value={faqsJson}
                  onChange={(e) => setFaqsJson(e.target.value)}
                  placeholder={'[\n  {\n    "q": "Question?",\n    "a": "Answer."\n  }\n]'}
                />
              </div>
            </div>
            
            <div className="border-t border-border pt-6 mt-6">
              <h3 className="text-lg font-semibold mb-4">SEO Overrides (Optional)</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Leave these blank to use the global SEO pattern for locations. Fill them in to override the meta tags for this specific location page.
              </p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>SEO Title</Label>
                  <Input
                    placeholder="e.g. Best AC Repair in Wagholi | Prime Cool"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>SEO Description</Label>
                  <Textarea
                    rows={2}
                    placeholder="e.g. Expert HVAC and refrigeration services in Wagholi..."
                    value={seoDesc}
                    onChange={(e) => setSeoDesc(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>SEO Keywords (Comma separated)</Label>
                  <Input
                    placeholder="e.g. AC repair Wagholi, HVAC Wagholi"
                    value={seoKeywords}
                    onChange={(e) => setSeoKeywords(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              {editingLocation && (
                <Button variant="outline" onClick={resetForm} className="flex-1">
                  Cancel Edit
                </Button>
              )}
              <Button
                className="flex-[2]"
                onClick={handleSave}
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                <Save className="h-4 w-4 mr-2" />
                {editingLocation ? "Update Location" : "Publish Location"}
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold border-b border-border pb-2">
              Published Locations ({locations.length})
            </h3>
            <Input
              placeholder="Search locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-xs"
            />
          </div>

          {locationsLoading ? (
            <div className="flex justify-center p-8">
              <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            </div>
          ) : filteredLocations.length === 0 ? (
            <div className="text-center p-8 bg-background/50 rounded-xl border border-border border-dashed">
              <MapPin className="h-8 w-8 mx-auto text-muted-foreground mb-3 opacity-50" />
              <p className="text-muted-foreground text-sm">No locations found.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[800px] overflow-y-auto pr-2 hide-scrollbar">
              {filteredLocations.map((loc: any) => (
                <div
                  key={loc.slug}
                  className="group relative p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-all shadow-sm overflow-hidden"
                >
                  <div className="flex justify-between items-start gap-4 relative z-10">
                    <div>
                      <div className="font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                        {loc.name}
                        <span className="text-[10px] uppercase tracking-wider bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          {loc.type}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 font-mono">
                        /{loc.slug}
                      </div>
                      <div className="text-xs text-muted-foreground mt-2 line-clamp-1">
                        Pincodes: {(loc.pincodes || []).join(", ") || "N/A"}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => handleEdit(loc)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => handleDelete(loc.slug)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
