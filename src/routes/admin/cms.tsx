import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { getCmsSettings, updateCmsSettings, getFaqs, addFaq, deleteFaq } from "../../lib/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImageDropzone } from "@/components/ImageDropzone";
import {
  Save,
  Trash2,
  Plus,
  Palette,
  Search,
  LayoutTemplate,
  MessageSquare,
  MessageCircle,
  Share2,
  Mail,
  BarChart2,
  MapPin,
  Wrench,
  ShieldCheck,
} from "lucide-react";

export const Route = createFileRoute("/admin/cms")({
  loader: async () => {
    const [cmsResp, faqsResp] = await Promise.all([getCmsSettings(), getFaqs()]);
    return { settings: cmsResp.settings, faqs: faqsResp.faqs };
  },
  component: CmsPage,
});

function CmsPage() {
  const { settings, faqs: initialFaqs } = Route.useLoaderData();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<
    | "landing"
    | "theme"
    | "seo"
    | "faq"
    | "whatsapp"
    | "socials"
    | "smtp"
    | "stats"
    | "services"
    | "amc"
  >("landing");

  // State for Settings
  const [formData, setFormData] = useState(settings);

  // State for FAQs
  const [faqs, setFaqs] = useState(initialFaqs);
  const [newFaq, setNewFaq] = useState({ q: "", a: "" });

  const updateMutation = useMutation({
    mutationFn: async (data: typeof settings) => {
      return await updateCmsSettings({ data });
    },
    onSuccess: () => {
      toast.success("CMS settings updated successfully!");
      router.invalidate();
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update settings");
    },
  });

  const addFaqMutation = useMutation({
    mutationFn: async (data: { q: string; a: string }) => {
      return await addFaq({ data });
    },
    onSuccess: (res) => {
      toast.success("FAQ added");
      setFaqs([...faqs, res.faq]);
      setNewFaq({ q: "", a: "" });

      // Keep CMS settings synchronized locally just in case
      const updatedSettings = { ...formData, faqs: [...faqs, res.faq] };
      setFormData(updatedSettings);
      router.invalidate();
    },
    onError: (err) => toast.error(err.message),
  });

  const deleteFaqMutation = useMutation({
    mutationFn: async (id: string) => {
      return await deleteFaq({ data: { id } });
    },
    onSuccess: (_, id) => {
      toast.success("FAQ deleted");
      const updatedFaqs = faqs.filter((f: any) => f.id !== id);
      setFaqs(updatedFaqs);

      const updatedSettings = { ...formData, faqs: updatedFaqs };
      setFormData(updatedSettings);
      router.invalidate();
    },
    onError: (err) => toast.error(err.message),
  });

  const handleSaveSettings = () => {
    // When saving from Landing/Theme/SEO tab, push the formData via RPC
    updateMutation.mutate(formData);
  };

  const tabs = [
    { id: "landing", label: "Landing Page", icon: LayoutTemplate },
    { id: "theme", label: "Theme Tuner", icon: Palette },
    { id: "seo", label: "Global SEO", icon: Search },
    { id: "faq", label: "FAQ Manager", icon: MessageSquare },
    { id: "services", label: "Services List", icon: Wrench },
    { id: "amc", label: "AMC Plans", icon: ShieldCheck },
    { id: "stats", label: "Stats & Regions", icon: BarChart2 },
    { id: "whatsapp", label: "WhatsApp Widget", icon: MessageCircle },
    { id: "socials", label: "Socials & Support", icon: Share2 },
    { id: "smtp", label: "SMTP Settings", icon: Mail },
  ] as const;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold">Site CMS</h1>
        <p className="text-muted-foreground mt-1">
          Zero-code front-end control for Prime Cool. Changes are applied instantly.
        </p>
      </div>

      <div className="flex border-b border-border overflow-x-auto hide-scrollbar">
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              }`}
            >
              <Icon className="h-4 w-4" />
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="surface-card rounded-2xl p-6">
        {activeTab === "landing" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <h2 className="text-xl font-semibold mb-4">Hero Section Content</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Headline 1</Label>
                <Input
                  value={formData.hero.title1}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, title1: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Headline 2 (Gradient)</Label>
                <Input
                  value={formData.hero.title2}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, title2: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Subheadline Text</Label>
                <Textarea
                  rows={3}
                  value={formData.hero.subtitle}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, subtitle: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2 border-t border-border pt-4">
                <Label>Primary CTA Text</Label>
                <Input
                  value={formData.hero.cta1Text}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, cta1Text: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2 border-t border-border pt-4">
                <Label>Primary CTA Link</Label>
                <Input
                  value={formData.hero.cta1Link}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, cta1Link: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Secondary CTA Text</Label>
                <Input
                  value={formData.hero.cta2Text}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, cta2Text: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Secondary CTA Link</Label>
                <Input
                  value={formData.hero.cta2Link}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, cta2Link: e.target.value },
                    })
                  }
                />
              </div>
            </div>
            <div className="space-y-2 pt-4">
              <Label>Hero Background Image</Label>
              <ImageDropzone
                onImageProcessed={(fileData, url) => {
                  setFormData({
                    ...formData,
                    hero: { ...formData.hero, backgroundImage: fileData?.base64 || undefined },
                  });
                }}
                initialPreview={formData.hero.backgroundImage}
              />
            </div>
            <div className="pt-4 flex justify-end">
              <Button onClick={handleSaveSettings} disabled={updateMutation.isPending}>
                <Save className="h-4 w-4 mr-2" />
                {updateMutation.isPending ? "Saving..." : "Save Landing Settings"}
              </Button>
            </div>
          </div>
        )}

        {activeTab === "theme" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <h2 className="text-xl font-semibold mb-4">Live Theme Tuner</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-3">
                <Label>Website Title / Brand Name</Label>
                <Input
                  value={formData.theme.siteName || ""}
                  placeholder="Prime Cool"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      theme: { ...formData.theme, siteName: e.target.value },
                    })
                  }
                />
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <Label>Primary Accent Color</Label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    className="h-10 w-14 rounded cursor-pointer border-0 p-0"
                    value={formData.theme.primary}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        theme: { ...formData.theme, primary: e.target.value },
                      })
                    }
                  />
                  <Input
                    className="flex-1"
                    value={formData.theme.primary}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        theme: { ...formData.theme, primary: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-3">
                <Label>Electric / Secondary Color</Label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    className="h-10 w-14 rounded cursor-pointer border-0 p-0"
                    value={formData.theme.electric}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        theme: { ...formData.theme, electric: e.target.value },
                      })
                    }
                  />
                  <Input
                    className="flex-1"
                    value={formData.theme.electric}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        theme: { ...formData.theme, electric: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-3">
                <Label>Background Base</Label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    className="h-10 w-14 rounded cursor-pointer border-0 p-0"
                    value={formData.theme.background}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        theme: { ...formData.theme, background: e.target.value },
                      })
                    }
                  />
                  <Input
                    className="flex-1"
                    value={formData.theme.background}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        theme: { ...formData.theme, background: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-border mt-6">
              <Label>Brand Logo (Light/Dark agnostic)</Label>
              <ImageDropzone
                onImageProcessed={(fileData, url) => {
                  setFormData({
                    ...formData,
                    theme: { ...formData.theme, logo: fileData?.base64 || undefined },
                  });
                }}
                initialPreview={formData.theme.logo}
                className="max-w-md"
              />
            </div>

            <div className="space-y-2 pt-4 border-t border-border mt-6">
              <Label>Website Favicon (Browser Tab Icon)</Label>
              <p className="text-xs text-muted-foreground mb-2">Recommended: 32x32 or 64x64 PNG or SVG</p>
              <ImageDropzone
                onImageProcessed={(fileData, url) => {
                  setFormData({
                    ...formData,
                    theme: { ...formData.theme, favicon: fileData?.base64 || undefined },
                  });
                }}
                initialPreview={formData.theme.favicon}
                className="max-w-xs"
              />
            </div>

            <div
              className="mt-8 p-6 rounded-2xl border border-border"
              style={{ background: formData.theme.background }}
            >
              <h3 className="text-sm font-semibold mb-3">Live Preview</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <Button style={{ backgroundColor: formData.theme.primary }}>Primary Button</Button>
                <div
                  className="text-xl font-bold font-display"
                  style={{
                    background: `linear-gradient(135deg, ${formData.theme.primary}, ${formData.theme.electric})`,
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Gradient Text Preview
                </div>
                <div
                  className="h-4 w-4 rounded-full animate-pulse"
                  style={{ backgroundColor: formData.theme.electric }}
                ></div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button onClick={handleSaveSettings} disabled={updateMutation.isPending}>
                <Save className="h-4 w-4 mr-2" />
                Save Theme Overrides
              </Button>
            </div>
          </div>
        )}

        {activeTab === "seo" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
            {(["home", "booking", "portfolio", "resources", "calculators", "blogs", "brands", "locations"] as const).map((page) => (
              <div key={page} className="space-y-4">
                <h2 className="text-lg font-semibold capitalize border-b border-border pb-2">
                  {page} Page SEO
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Title Tag</Label>
                    <Input
                      value={formData.seo[page].title}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          seo: {
                            ...formData.seo,
                            [page]: { ...formData.seo[page], title: e.target.value },
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Meta Description</Label>
                    <Input
                      value={formData.seo[page].description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          seo: {
                            ...formData.seo,
                            [page]: { ...formData.seo[page], description: e.target.value },
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>OG Title</Label>
                    <Input
                      value={formData.seo[page].ogTitle}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          seo: {
                            ...formData.seo,
                            [page]: { ...formData.seo[page], ogTitle: e.target.value },
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>OG Description</Label>
                    <Input
                      value={formData.seo[page].ogDescription}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          seo: {
                            ...formData.seo,
                            [page]: { ...formData.seo[page], ogDescription: e.target.value },
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-4 flex justify-end">
              <Button onClick={handleSaveSettings} disabled={updateMutation.isPending}>
                <Save className="h-4 w-4 mr-2" />
                Save Global SEO
              </Button>
            </div>
          </div>
        )}

        {activeTab === "faq" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <h2 className="text-xl font-semibold mb-4">FAQ Manager</h2>

            <div className="space-y-4">
              {faqs.map((faq: any) => (
                <div
                  key={faq.id}
                  className="flex gap-4 p-4 rounded-xl border border-border bg-background/50"
                >
                  <div className="flex-1 space-y-2">
                    <div className="font-semibold text-sm">Q: {faq.q}</div>
                    <div className="text-sm text-muted-foreground">A: {faq.a}</div>
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="shrink-0"
                    disabled={deleteFaqMutation.isPending}
                    onClick={() => {
                      if (confirm("Delete this FAQ?")) {
                        deleteFaqMutation.mutate(faq.id);
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="p-5 border border-border rounded-xl bg-card/30 mt-6">
              <h3 className="font-semibold text-sm mb-3">Add New Question</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Question</Label>
                  <Input
                    placeholder="e.g. Do you service Ranjangaon MIDC?"
                    value={newFaq.q}
                    onChange={(e) => setNewFaq({ ...newFaq, q: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Answer</Label>
                  <Textarea
                    placeholder="e.g. Yes, we provide same-day engineer dispatch for..."
                    value={newFaq.a}
                    onChange={(e) => setNewFaq({ ...newFaq, a: e.target.value })}
                  />
                </div>
                <Button
                  onClick={() => addFaqMutation.mutate(newFaq)}
                  disabled={!newFaq.q || !newFaq.a || addFaqMutation.isPending}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add to Website
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "whatsapp" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <h2 className="text-xl font-semibold mb-4">Floating WhatsApp Support</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3 col-span-2 flex items-center gap-3 border p-4 rounded-xl border-border bg-background/50">
                <input
                  type="checkbox"
                  id="whatsappEnabled"
                  className="h-5 w-5 rounded border-border"
                  checked={formData.whatsapp?.enabled ?? true}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      whatsapp: { ...formData.whatsapp, enabled: e.target.checked },
                    })
                  }
                />
                <Label htmlFor="whatsappEnabled" className="text-base cursor-pointer">
                  Enable Floating WhatsApp Widget
                </Label>
              </div>

              <div className="space-y-2">
                <Label>WhatsApp Number (include country code)</Label>
                <Input
                  value={formData.whatsapp?.number || ""}
                  placeholder="+917507408461"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      whatsapp: { ...formData.whatsapp, number: e.target.value },
                    })
                  }
                />
              </div>

              <div className="space-y-2 col-span-2">
                <Label>Default Pre-filled Message</Label>
                <Textarea
                  value={formData.whatsapp?.defaultMessage || ""}
                  placeholder="Hi Prime Cool, I need assistance with..."
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      whatsapp: { ...formData.whatsapp, defaultMessage: e.target.value },
                    })
                  }
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button onClick={handleSaveSettings} disabled={updateMutation.isPending}>
                <Save className="h-4 w-4 mr-2" />
                {updateMutation.isPending ? "Saving..." : "Save WhatsApp Settings"}
              </Button>
            </div>
          </div>
        )}

        {activeTab === "socials" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <h2 className="text-xl font-semibold mb-4">Social Media & Support Contact Settings</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Facebook URL</Label>
                <Input
                  value={formData.socials?.facebook || ""}
                  placeholder="https://facebook.com/yourpage"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socials: { ...formData.socials, facebook: e.target.value },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Instagram URL</Label>
                <Input
                  value={formData.socials?.instagram || ""}
                  placeholder="https://instagram.com/yourpage"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socials: { ...formData.socials, instagram: e.target.value },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>LinkedIn URL</Label>
                <Input
                  value={formData.socials?.linkedin || ""}
                  placeholder="https://linkedin.com/company/yourpage"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socials: { ...formData.socials, linkedin: e.target.value },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>YouTube Channel URL</Label>
                <Input
                  value={formData.socials?.youtube || ""}
                  placeholder="https://youtube.com/c/yourchannel"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socials: { ...formData.socials, youtube: e.target.value },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Twitter / X URL</Label>
                <Input
                  value={formData.socials?.twitter || ""}
                  placeholder="https://x.com/yourpage"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socials: { ...formData.socials, twitter: e.target.value },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Customer Support Email</Label>
                <Input
                  value={formData.socials?.email || ""}
                  placeholder="support@primecool.in"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socials: { ...formData.socials, email: e.target.value },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Customer Support Phone</Label>
                <Input
                  value={formData.socials?.phone || ""}
                  placeholder="+917507408461"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socials: { ...formData.socials, phone: e.target.value },
                    })
                  }
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button onClick={handleSaveSettings} disabled={updateMutation.isPending}>
                <Save className="h-4 w-4 mr-2" />
                {updateMutation.isPending ? "Saving..." : "Save Social Settings"}
              </Button>
            </div>
          </div>
        )}

        {activeTab === "smtp" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <h2 className="text-xl font-semibold mb-4">SMTP Email Configuration</h2>
            <p className="text-xs text-muted-foreground">
              Configure SMTP credentials to send transactional confirmation emails using domains
              like booking@primecool.in.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3 col-span-2 flex items-center gap-3 border p-4 rounded-xl border-border bg-background/50">
                <input
                  type="checkbox"
                  id="smtpEnabled"
                  className="h-5 w-5 rounded border-border"
                  checked={formData.smtp?.enabled ?? false}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      smtp: { ...formData.smtp, enabled: e.target.checked },
                    })
                  }
                />
                <Label htmlFor="smtpEnabled" className="text-base cursor-pointer">
                  Enable Live SMTP Notifications
                </Label>
              </div>

              <div className="space-y-2">
                <Label>SMTP Server Host</Label>
                <Input
                  value={formData.smtp?.host || ""}
                  placeholder="smtp.hostinger.com"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      smtp: { ...formData.smtp, host: e.target.value },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>SMTP Port</Label>
                <Input
                  type="number"
                  value={formData.smtp?.port ?? 465}
                  placeholder="465"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      smtp: { ...formData.smtp, port: parseInt(e.target.value) || 0 },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>SMTP Username / User Email</Label>
                <Input
                  value={formData.smtp?.user || ""}
                  placeholder="booking@primecool.in"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      smtp: { ...formData.smtp, user: e.target.value },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>SMTP Password</Label>
                <Input
                  type="password"
                  value={formData.smtp?.pass || ""}
                  placeholder="••••••••"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      smtp: { ...formData.smtp, pass: e.target.value },
                    })
                  }
                />
              </div>

              <div className="space-y-3 flex items-center gap-3 border p-4 rounded-xl border-border bg-background/50">
                <input
                  type="checkbox"
                  id="smtpSecure"
                  className="h-5 w-5 rounded border-border"
                  checked={formData.smtp?.secure ?? true}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      smtp: { ...formData.smtp, secure: e.target.checked },
                    })
                  }
                />
                <Label htmlFor="smtpSecure" className="text-sm cursor-pointer">
                  Use Secure SSL/TLS (Port 465)
                </Label>
              </div>

              <div className="space-y-2">
                <Label>Sender Name (e.g. Prime Cool Solutions)</Label>
                <Input
                  value={formData.smtp?.fromName || ""}
                  placeholder="Prime Cool Solutions"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      smtp: { ...formData.smtp, fromName: e.target.value },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Sender Email Address (must match user or domain)</Label>
                <Input
                  value={formData.smtp?.fromEmail || ""}
                  placeholder="booking@primecool.in"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      smtp: { ...formData.smtp, fromEmail: e.target.value },
                    })
                  }
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button onClick={handleSaveSettings} disabled={updateMutation.isPending}>
                <Save className="h-4 w-4 mr-2" />
                {updateMutation.isPending ? "Saving..." : "Save SMTP Settings"}
              </Button>
            </div>
          </div>
        )}
        {activeTab === "stats" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
            {/* Stats Editor */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <BarChart2 className="h-5 w-5 text-primary" /> Hero Stats
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    const current = (formData as any).stats || [];
                    setFormData({
                      ...formData,
                      stats: [...current, { value: "", label: "" }],
                    } as any);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/20 transition"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Stat
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                These four stats appear in the hero band below the main heading (24/7, 2 hubs, 100%,
                AMC).
              </p>
              <div className="space-y-3">
                {(
                  (formData as any).stats || [
                    { value: "24/7", label: "Rapid Response" },
                    { value: "2", label: "Industrial Hubs Served" },
                    { value: "100%", label: "Engineered Reliability" },
                    { value: "AMC", label: "Zero-Downtime Plans" },
                  ]
                ).map((stat: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-3">
                    <Input
                      value={stat.value}
                      placeholder="24/7"
                      className="w-24 rounded-xl"
                      onChange={(e) => {
                        const updated = [...((formData as any).stats || [])];
                        updated[idx] = { ...updated[idx], value: e.target.value };
                        setFormData({ ...formData, stats: updated } as any);
                      }}
                    />
                    <Input
                      value={stat.label}
                      placeholder="Rapid Response"
                      className="flex-1 rounded-xl"
                      onChange={(e) => {
                        const updated = [...((formData as any).stats || [])];
                        updated[idx] = { ...updated[idx], label: e.target.value };
                        setFormData({ ...formData, stats: updated } as any);
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = ((formData as any).stats || []).filter(
                          (_: any, i: number) => i !== idx,
                        );
                        setFormData({ ...formData, stats: updated } as any);
                      }}
                      className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Regions Editor */}
            <div className="space-y-4 border-t border-border pt-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" /> Service Regions
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    const current = (formData as any).regions || [];
                    setFormData({ ...formData, regions: [...current, ""] } as any);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/20 transition"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Region
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                These regions appear in the Coverage section dropdown on the home page.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {(
                  (formData as any).regions || [
                    "Wagholi",
                    "Lonikand",
                    "Kesnand",
                    "Koregaon Bhima",
                    "Shikrapur",
                    "Karegaon MIDC",
                    "Ranjangaon MIDC",
                    "Shirur",
                  ]
                ).map((region: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Input
                      value={region}
                      placeholder="Region name"
                      className="flex-1 rounded-xl"
                      onChange={(e) => {
                        const updated = [...((formData as any).regions || [])];
                        updated[idx] = e.target.value;
                        setFormData({ ...formData, regions: updated } as any);
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = ((formData as any).regions || []).filter(
                          (_: any, i: number) => i !== idx,
                        );
                        setFormData({ ...formData, regions: updated } as any);
                      }}
                      className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button onClick={handleSaveSettings} disabled={updateMutation.isPending}>
                <Save className="h-4 w-4 mr-2" />
                {updateMutation.isPending ? "Saving..." : "Save Stats & Regions"}
              </Button>
            </div>
          </div>
        )}
        {activeTab === "services" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Wrench className="h-5 w-5 text-primary" /> Services Manager
              </h2>
              <button
                type="button"
                onClick={() => {
                  const current = (formData as any).services || [];
                  const newService = {
                    id: `service-${Math.random().toString(36).substr(2, 9)}`,
                    category: "domestic",
                    title: "New Service Title",
                    desc: "Service description text...",
                    image: "/projects/p1/1.png",
                    icon: "Wrench",
                  };
                  setFormData({ ...formData, services: [...current, newService] } as any);
                }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/20 transition"
              >
                <Plus className="h-3.5 w-3.5" /> Add Service
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              Manage the services shown in the domestic and industrial sections of the home page.
            </p>

            <div className="space-y-4">
              {((formData as any).services || []).map((service: any, idx: number) => (
                <div
                  key={service.id || idx}
                  className="border border-border/60 rounded-2xl p-4 bg-background/20 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-mono text-primary uppercase">
                      Service #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = ((formData as any).services || []).filter(
                          (_: any, i: number) => i !== idx,
                        );
                        setFormData({ ...formData, services: updated } as any);
                      }}
                      className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 text-xs">
                    <div className="space-y-1">
                      <Label>Category</Label>
                      <select
                        value={service.category}
                        onChange={(e) => {
                          const updated = [...((formData as any).services || [])];
                          updated[idx] = { ...updated[idx], category: e.target.value };
                          setFormData({ ...formData, services: updated } as any);
                        }}
                        className="w-full rounded-lg border border-input bg-background/50 px-2 py-1.5"
                      >
                        <option value="domestic">Domestic & Commercial</option>
                        <option value="industrial">Heavy Industrial</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <Label>Icon Name (Lucide Icon)</Label>
                      <Input
                        value={service.icon}
                        placeholder="e.g. Snowflake, Refrigerator, Cog"
                        className="rounded-lg h-8"
                        onChange={(e) => {
                          const updated = [...((formData as any).services || [])];
                          updated[idx] = { ...updated[idx], icon: e.target.value };
                          setFormData({ ...formData, services: updated } as any);
                        }}
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <Label>Title</Label>
                      <Input
                        value={service.title}
                        className="rounded-lg h-8"
                        onChange={(e) => {
                          const updated = [...((formData as any).services || [])];
                          updated[idx] = { ...updated[idx], title: e.target.value };
                          setFormData({ ...formData, services: updated } as any);
                        }}
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <Label>Description</Label>
                      <Textarea
                        value={service.desc}
                        rows={2}
                        className="rounded-lg text-xs"
                        onChange={(e) => {
                          const updated = [...((formData as any).services || [])];
                          updated[idx] = { ...updated[idx], desc: e.target.value };
                          setFormData({ ...formData, services: updated } as any);
                        }}
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <Label>Image URL / Path</Label>
                      <Input
                        value={service.image}
                        placeholder="/projects/p1/1.png"
                        className="rounded-lg h-8"
                        onChange={(e) => {
                          const updated = [...((formData as any).services || [])];
                          updated[idx] = { ...updated[idx], image: e.target.value };
                          setFormData({ ...formData, services: updated } as any);
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <Button onClick={handleSaveSettings} disabled={updateMutation.isPending}>
                <Save className="h-4 w-4 mr-2" />
                {updateMutation.isPending ? "Saving..." : "Save Services"}
              </Button>
            </div>
          </div>
        )}

        {activeTab === "amc" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" /> AMC Plans Manager
              </h2>
              <button
                type="button"
                onClick={() => {
                  const current = (formData as any).amcTiers || [];
                  const newTier = {
                    name: "New Tier Name",
                    audience: "Target audience",
                    price: "Standard pricing text",
                    icon: "ShieldCheck",
                    points: ["Feature point one"],
                    featured: false,
                  };
                  setFormData({ ...formData, amcTiers: [...current, newTier] } as any);
                }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/20 transition"
              >
                <Plus className="h-3.5 w-3.5" /> Add AMC Plan
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              Manage the maintenance plans / pricing cards shown on the home page.
            </p>

            <div className="space-y-4">
              {((formData as any).amcTiers || []).map((tier: any, idx: number) => (
                <div
                  key={idx}
                  className="border border-border/60 rounded-2xl p-4 bg-background/20 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-mono text-primary uppercase">
                      Plan #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = ((formData as any).amcTiers || []).filter(
                          (_: any, i: number) => i !== idx,
                        );
                        setFormData({ ...formData, amcTiers: updated } as any);
                      }}
                      className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 text-xs">
                    <div className="space-y-1">
                      <Label>Plan Name</Label>
                      <Input
                        value={tier.name}
                        className="rounded-lg h-8"
                        onChange={(e) => {
                          const updated = [...((formData as any).amcTiers || [])];
                          updated[idx] = { ...updated[idx], name: e.target.value };
                          setFormData({ ...formData, amcTiers: updated } as any);
                        }}
                      />
                    </div>

                    <div className="space-y-1">
                      <Label>Target Audience</Label>
                      <Input
                        value={tier.audience}
                        className="rounded-lg h-8"
                        onChange={(e) => {
                          const updated = [...((formData as any).amcTiers || [])];
                          updated[idx] = { ...updated[idx], audience: e.target.value };
                          setFormData({ ...formData, amcTiers: updated } as any);
                        }}
                      />
                    </div>

                    <div className="space-y-1">
                      <Label>Price / Tag Text</Label>
                      <Input
                        value={tier.price}
                        placeholder="Starter, Enterprise, Popular..."
                        className="rounded-lg h-8"
                        onChange={(e) => {
                          const updated = [...((formData as any).amcTiers || [])];
                          updated[idx] = { ...updated[idx], price: e.target.value };
                          setFormData({ ...formData, amcTiers: updated } as any);
                        }}
                      />
                    </div>

                    <div className="space-y-1">
                      <Label>Icon Name (Lucide Icon)</Label>
                      <Input
                        value={tier.icon}
                        placeholder="Snowflake, ShieldCheck, Factory..."
                        className="rounded-lg h-8"
                        onChange={(e) => {
                          const updated = [...((formData as any).amcTiers || [])];
                          updated[idx] = { ...updated[idx], icon: e.target.value };
                          setFormData({ ...formData, amcTiers: updated } as any);
                        }}
                      />
                    </div>

                    <div className="flex items-center gap-2 sm:col-span-2 pt-2">
                      <input
                        type="checkbox"
                        id={`featured-${idx}`}
                        checked={tier.featured || false}
                        onChange={(e) => {
                          const updated = [...((formData as any).amcTiers || [])];
                          updated[idx] = { ...updated[idx], featured: e.target.checked };
                          setFormData({ ...formData, amcTiers: updated } as any);
                        }}
                        className="h-4 w-4 rounded border-border"
                      />
                      <Label htmlFor={`featured-${idx}`} className="cursor-pointer">
                        Highlight / Feature this plan
                      </Label>
                    </div>

                    <div className="space-y-1 sm:col-span-2 pt-2">
                      <Label>Inclusions / Points (one per line)</Label>
                      <Textarea
                        value={(tier.points || []).join("\n")}
                        rows={4}
                        placeholder="Point 1&#10;Point 2&#10;Point 3"
                        className="rounded-lg text-xs font-mono"
                        onChange={(e) => {
                          const updated = [...((formData as any).amcTiers || [])];
                          updated[idx] = { ...updated[idx], points: e.target.value.split("\n") };
                          setFormData({ ...formData, amcTiers: updated } as any);
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <Button onClick={handleSaveSettings} disabled={updateMutation.isPending}>
                <Save className="h-4 w-4 mr-2" />
                {updateMutation.isPending ? "Saving..." : "Save AMC Plans"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
