import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AlertTriangle, Clock, MapPin, Phone, MessageSquare, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getCmsSettings } from "../lib/api";

export const Route = createFileRoute("/emergency")({
  loader: async () => {
    const { settings } = await getCmsSettings();
    return { cms: settings };
  },
  head: () => ({
    meta: [
      { title: "Code Red Emergency Breakdown Dispatch 24/7 | Prime Cool Pune" },
      {
        name: "description",
        content:
          "24/7 priority emergency dispatch for industrial and commercial HVAC/R breakdowns in Pune, Wagholi, Ranjangaon, and Chakan MIDC. Guaranteed 15-minute response.",
      },
      {
        property: "og:title",
        content: "Code Red Emergency Breakdown Dispatch 24/7 | Prime Cool Pune",
      },
      {
        property: "og:description",
        content:
          "24/7 priority emergency dispatch for industrial and commercial HVAC/R breakdowns in Pune, Wagholi, Ranjangaon, and Chakan MIDC.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://primecool.in/emergency" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EmergencyService",
          name: "Prime Cool Code Red Emergency HVAC Dispatch",
          url: "https://primecool.in/emergency",
          telephone: "+917507408461",
          areaServed: ["Pune", "PCMC", "Wagholi", "Chakan MIDC", "Ranjangaon MIDC"],
          openingHours: "Mo-Su 00:00-23:59",
        }),
      },
    ],
  }),
  component: EmergencyPortal,
});

function EmergencyPortal() {
  const { cms } = Route.useLoaderData();
  const phone = cms?.socials?.phone || "+917507408461";

  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    phone: "",
    location: "",
    systemType: "",
    issue: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would ping a high-priority API or SMS gateway
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (submitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6 text-center">
        <div className="max-w-md space-y-6">
          <div className="mx-auto w-20 h-20 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center animate-pulse">
            <ShieldAlert className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-display font-bold text-white">Emergency Logged</h2>
          <p className="text-muted-foreground">
            Code Red breakdown recorded for {formData.companyName}. Our lead engineer has been
            notified and will contact {formData.phone} within 15 minutes.
          </p>
          <div className="pt-4 flex gap-4 justify-center">
            <a
              href={`tel:${phone.replace(/\\D/g, "")}`}
              className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
            >
              Call Now Instead <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-8 md:pt-12 pb-20 px-6 max-w-5xl mx-auto">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full bg-red-500/10 border border-red-500/20 px-4 py-1.5 text-red-400 font-mono text-sm font-bold uppercase tracking-wider mb-6 animate-pulse">
          <AlertTriangle className="w-4 h-4" /> Code Red Dispatch Protocol
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
          Commercial Emergency <span className="text-red-500">Breakdown</span>
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          This portal bypasses standard ticketing queues for immediate attention. Use this ONLY for
          critical industrial chillers, server room VRFs, and pharmaceutical cold storage failures.
        </p>
      </div>

      <div className="grid md:grid-cols-12 gap-8 items-start">
        {/* Urgent Contact Options */}
        <div className="md:col-span-5 space-y-4 order-2 md:order-1">
          <div className="bg-red-500/5 border border-red-500/20 p-6 rounded-3xl space-y-6">
            <h3 className="font-bold text-lg text-white">Immediate Action Required?</h3>
            <p className="text-sm text-muted-foreground">
              Don't wait for the form. Call the Lead Engineer directly for immediate technical
              dispatch on the Wagholi–Shirur corridor.
            </p>

            <div className="space-y-3">
              <a
                href={`tel:${phone.replace(/\\s+/g, "")}`}
                className="w-full inline-flex items-center justify-center gap-3 rounded-xl bg-red-600 text-white px-6 py-4 text-sm font-bold hover:bg-red-700 transition shadow-[0_0_20px_rgba(220,38,38,0.4)]"
              >
                <Phone className="h-5 w-5" /> Call Lead Engineer Now
              </a>
              <a
                href={`https://api.whatsapp.com/send/?phone=${phone.replace(/\\D/g, "")}&text=EMERGENCY:+Code+Red+Breakdown+at+our+facility.+Need+immediate+assistance.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-3 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] px-6 py-4 text-sm font-bold hover:bg-[#25D366]/30 transition"
              >
                <MessageSquare className="h-5 w-5" /> Send Urgent WhatsApp
              </a>
            </div>

            <div className="pt-4 border-t border-border/40 space-y-3">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <Clock className="h-4 w-4 text-primary" />
                <span>4-Hour Industrial SLA for MIDC zones</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Active Routing: Chakan, Ranjangaon, Hadapsar</span>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Form */}
        <div className="md:col-span-7 bg-slate-900/40 border border-border/80 p-6 md:p-8 rounded-3xl order-1 md:order-2">
          <h2 className="font-display font-bold text-2xl text-white mb-6">Log Critical Incident</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company / Facility Name *</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  required
                  value={formData.companyName}
                  onChange={handleChange}
                  className="bg-slate-950/50 border-border/40"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPerson">Contact Person *</Label>
                <Input
                  id="contactPerson"
                  name="contactPerson"
                  required
                  value={formData.contactPerson}
                  onChange={handleChange}
                  className="bg-slate-950/50 border-border/40"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-slate-950/50 border-border/40"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Facility Location (MIDC / Area) *</Label>
                <Input
                  id="location"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  className="bg-slate-950/50 border-border/40"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="systemType">System Type Down *</Label>
              <select
                id="systemType"
                name="systemType"
                required
                value={formData.systemType}
                onChange={handleChange}
                className="w-full flex h-10 items-center justify-between rounded-md border border-border/40 bg-slate-950/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="" disabled>
                  Select system...
                </option>
                <option value="chiller">Process Chiller Plant</option>
                <option value="vrf">VRF / VRV Network</option>
                <option value="coldroom">Cold Storage / Walk-in Freezer</option>
                <option value="dryer">Industrial Air Dryer</option>
                <option value="ahu">Server Room AC / AHU</option>
                <option value="other">Other Critical System</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="issue">Fault Code / Description of Breakdown *</Label>
              <Textarea
                id="issue"
                name="issue"
                required
                placeholder="e.g. Chiller tripped on High Pressure, or VRF showing Code U4..."
                value={formData.issue}
                onChange={handleChange}
                className="bg-slate-950/50 border-border/40 min-h-[100px]"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-6 text-lg rounded-xl"
            >
              SUBMIT CODE RED DISPATCH
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
