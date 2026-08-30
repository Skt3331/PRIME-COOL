import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { getAvailableSlots, createBooking, getCmsSettings } from "../lib/api";
import logo from "@/assets/logo.webp";
import {
  CalendarRange,
  Clock,
  User,
  Phone as PhoneIcon,
  Mail,
  FileText,
  CheckCircle2,
  ArrowLeft,
  MessageSquare,
  Home,
  AlertTriangle,
  Snowflake,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

export const Route = createFileRoute("/booking")({
  validateSearch: (search: Record<string, unknown>): { service?: string } => {
    return {
      service: typeof search.service === "string" ? search.service : undefined,
    };
  },
  loader: async () => {
    const { settings } = await getCmsSettings();
    return { cms: settings };
  },
  head: ({ loaderData }) => {
    const seo = loaderData?.cms?.seo?.booking;
    const title = seo?.title || "Book AC & HVAC Repair Service Online in Pune | Same Day Dispatch | Prime Cool";
    const description =
      seo?.description ||
      "Book a certified HVAC technician in Pune online — split AC servicing, gas charging, inverter PCB repair, cassette AC, cold room inspection, and industrial chiller AMC. Same-day slots available across Wagholi, Kharadi, Hadapsar, Hinjewadi, Ranjangaon MIDC, Chakan MIDC.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "keywords", content: "book AC service Pune, AC repair online booking, HVAC technician Pune, same day AC repair Pune, book refrigerator repair, washing machine service booking" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:image", content: "https://primecool.in/logo.png" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "geo.region", content: "IN-MH" },
        { name: "geo.placename", content: "Pune, Maharashtra, India" },
      ],
      links: [{ rel: "canonical", href: "https://primecool.in/booking" }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Prime Cool Online HVAC Service Booking",
            url: "https://primecool.in/booking",
            description,
            provider: {
              "@type": "HVACBusiness",
              name: "Prime Cool",
              telephone: "+917507408461",
              url: "https://primecool.in",
            },
            areaServed: [
              "Pune", "Wagholi", "Kharadi", "Hadapsar", "Hinjewadi",
              "Ranjangaon MIDC", "Chakan MIDC", "Bhosari MIDC", "Baner", "Kothrud"
            ],
            availableChannel: {
              "@type": "ServiceChannel",
              serviceUrl: "https://primecool.in/booking",
              servicePhone: "+917507408461",
            },
          }),
        },
      ],
    };
  },
  component: BookingPage,
});

const services = [
  { id: "ac", name: "Air Conditioning Systems", category: "Domestic/Commercial" },
  { id: "fridge", name: "Refrigeration Units", category: "Domestic/Commercial" },
  { id: "wash", name: "Washing Machine Service", category: "Domestic" },
  { id: "heavy", name: "Heavy Mechanical Maintenance", category: "Industrial" },
  { id: "electrical", name: "Component & Electrical Precision", category: "Industrial" },
  { id: "overhaul", name: "Equipment Overhauls", category: "Industrial" },
  { id: "amc", name: "Annual Maintenance Contract (AMC) Setup", category: "Domestic/Industrial" },
];

function BookingPage() {
  const { cms } = Route.useLoaderData() as { cms: any };
  const socials = cms?.socials || {};
  const cmsPhone = socials.phone || "+917507408461";
  const queryClient = useQueryClient();
  const search = Route.useSearch();
  const [selectedService, setSelectedService] = useState(search.service || "");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [bookedData, setBookedData] = useState<any>(null);

  const formattedDate = selectedDate ? selectedDate.toISOString().split("T")[0] : "";

  // Query live timeslot availability
  const { data: slotData, isLoading: slotsLoading } = useQuery({
    queryKey: ["availableSlots", formattedDate],
    queryFn: () => getAvailableSlots({ data: { date: formattedDate } }),
    enabled: !!formattedDate,
  });

  // Booking mutation
  const bookingMutation = useMutation({
    mutationFn: (variables: any) => createBooking({ data: variables }),
    onSuccess: (data: any) => {
      if (data.success) {
        toast.success("Booking request submitted successfully!");
        setBookedData(data.booking);
        queryClient.invalidateQueries({ queryKey: ["availableSlots", formattedDate] });
      } else {
        toast.error(data.error || "Failed to book slot.");
      }
    },
    onError: (err) => {
      console.error(err);
      toast.error("An error occurred during booking. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedService) {
      toast.warning("Please select a service type.");
      return;
    }
    if (!selectedDate) {
      toast.warning("Please select a date.");
      return;
    }
    if (!selectedSlot) {
      toast.warning("Please select a time slot.");
      return;
    }
    if (!name.trim()) {
      toast.warning("Please enter your name.");
      return;
    }
    if (!phone.trim()) {
      toast.warning("Please enter your contact number.");
      return;
    }

    // Call server function
    bookingMutation.mutate({
      customerName: name,
      email,
      phone,
      serviceType: selectedService,
      date: formattedDate,
      timeSlot: selectedSlot,
      notes,
    });
  };

  const getFriendlyDateString = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Success view
  if (bookedData) {
    return (
      <div className="min-h-screen text-foreground flex flex-col justify-between">
        {/* Navigation Header */}
        <header className="backdrop-blur-xl bg-background/60 border-b border-border py-4">
          <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5">
              <img src={logo} alt="Prime Cool logo" className="h-9 w-9" />
              <span className="font-display font-bold text-lg tracking-tight">
                Prime <span className="text-gradient">Cool</span>
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition">
                Home
              </Link>
              <Link to="/portfolio" className="hover:text-foreground transition">
                Projects
              </Link>
              <Link to="/blogs" className="hover:text-foreground transition">
                Blogs
              </Link>
              <Link
                to="/booking"
                search={{}}
                className="hover:text-foreground transition text-primary font-semibold"
              >
                Book Service
              </Link>
            </nav>
            <div className="flex items-center gap-3 sm:gap-4">
              <a
                href={`tel:${cmsPhone.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-2 rounded-full border border-border p-2 sm:px-3 sm:py-1.5 text-xs font-medium hover:bg-card transition"
                title="Call Support"
              >
                <PhoneIcon className="h-4 w-4 text-primary" />
                <span className="hidden sm:inline">{cmsPhone}</span>
              </a>
              <Link
                to="/"
                className="text-sm hover:text-primary transition flex items-center gap-1.5"
              >
                <Home className="h-4 w-4" />
                <span>Back Home</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 py-12 px-6 flex items-center justify-center">
          <div className="max-w-4xl w-full grid md:grid-cols-2 gap-10 items-center">
            {/* Confirmation details */}
            <div className="space-y-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 text-primary">
                <CheckCircle2 className="h-7 w-7 animate-pulse-ring" />
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-bold leading-tight">
                Your request is <span className="text-gradient">registered!</span>
              </h1>
              <p className="text-muted-foreground leading-relaxed">
                Thank you for choosing Prime Cool. Lead engineer <strong>Saurav Temgire</strong> is
                reviewing your booking against active technician schedules on the Wagholi–Shirur
                route.
              </p>

              <div className="surface-card rounded-2xl p-5 border border-border space-y-3.5 text-sm">
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Booking ID</span>
                  <span className="font-mono font-semibold text-primary">{bookedData.id}</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Customer</span>
                  <span className="font-medium">{bookedData.customerName}</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Service Type</span>
                  <span className="font-medium text-right max-w-[200px] truncate">
                    {bookedData.serviceType}
                  </span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium">{getFriendlyDateString(bookedData.date)}</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-muted-foreground">Time Slot</span>
                  <span className="font-medium text-primary">{bookedData.timeSlot}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card/60 px-5 py-3 text-sm font-semibold hover:bg-card transition"
                >
                  <Home className="h-4 w-4" /> Go Back Home
                </Link>
                <Button
                  onClick={() => setBookedData(null)}
                  className="rounded-xl px-5 py-3 text-sm font-semibold"
                >
                  Book Another Appointment
                </Button>
              </div>
            </div>

            {/* Visual Phone Mockup simulating WhatsApp Notification */}
            <div className="relative mx-auto w-full max-w-[340px]">
              {/* Glow background */}
              <div className="absolute inset-0 bg-primary/20 rounded-[40px] filter blur-xl animate-pulse-ring" />

              {/* Smartphone Frame */}
              <div className="relative border-4 border-muted bg-neutral-900 rounded-[38px] p-3 shadow-2xl overflow-hidden aspect-[9/18] flex flex-col">
                {/* Speaker/Camera notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-neutral-900 rounded-full flex items-center justify-center z-20">
                  <div className="w-12 h-1 bg-neutral-800 rounded-full mb-1" />
                </div>

                {/* WhatsApp header */}
                <div className="bg-[#075e54] text-white pt-4 pb-3 px-3 rounded-t-[26px] flex items-center justify-between text-xs z-10">
                  <div className="flex items-center gap-2 mt-1">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 font-bold text-[10px]">
                      PC
                    </span>
                    <div>
                      <div className="font-bold">Prime Cool Service</div>
                      <div className="text-[9px] opacity-80">Online</div>
                    </div>
                  </div>
                  <MessageSquare className="h-4 w-4 opacity-75 mt-1" />
                </div>

                {/* Chat content screen */}
                <div className="flex-1 bg-[#efeae2] p-3 overflow-y-auto space-y-3 flex flex-col justify-end text-neutral-800 font-sans">
                  {/* Date Stamp */}
                  <div className="mx-auto bg-white/70 text-[9px] text-neutral-500 rounded px-2 py-0.5 shadow-sm uppercase">
                    Today
                  </div>

                  {/* Incoming WhatsApp message box */}
                  <div className="relative bg-[#d9fdd3] p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[85%] self-start text-xs border border-emerald-100">
                    {/* Speech bubble tail */}
                    <div className="absolute top-0 -left-1.5 w-0 h-0 border-t-[8px] border-t-[#d9fdd3] border-l-[8px] border-l-transparent" />

                    <p className="font-semibold text-emerald-800 text-[10px] mb-1">
                      ✓ Verified Business
                    </p>
                    <p className="leading-relaxed">
                      Hi <strong>{bookedData.customerName}</strong>, your booking request for{" "}
                      <strong>{bookedData.serviceType}</strong> on{" "}
                      {getFriendlyDateString(bookedData.date)} at{" "}
                      <strong>{bookedData.timeSlot}</strong> has been RECEIVED by Prime Cool.
                    </p>
                    <p className="mt-2 leading-relaxed">
                      Proprietor Saurav Temgire will coordinate and confirm details shortly. We
                      stock genuine spares on route.
                    </p>
                    <div className="text-right text-[9px] text-neutral-400 mt-1 flex items-center justify-end gap-0.5">
                      <span>
                        {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                      <span className="text-blue-500">✓✓</span>
                    </div>
                  </div>

                  {/* Small Info Banner */}
                  <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-2.5 text-[10px] text-yellow-800 flex gap-2 items-start mt-4">
                    <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Simulated Notification</strong>
                      <div className="text-neutral-600 mt-0.5">
                        This replicates the message logged to the database system.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phone bottom bar */}
                <div className="h-2 bg-neutral-900 flex items-center justify-center pt-1 pb-1">
                  <div className="w-24 h-1 bg-neutral-700 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground bg-card/20">
          <div>© {new Date().getFullYear()} Prime Cool — Mechanical climate Solutions</div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,102,255,0.05),transparent_50%)] pointer-events-none" />

      {/* Main Content */}
      <main className="flex-1 pt-24 pb-16 px-6 relative z-10">
        <div className="mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-up">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
              <span className="h-px w-6 bg-primary" />
              Scheduling Desk
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight">
              Schedule your mechanical <span className="text-shimmer">service today.</span>
            </h1>
            <p className="mt-3 text-sm text-muted-foreground delay-100 animate-fade-up">
              Select your service, choose an available date, and pick a time slot. We will allocate
              the correct engineer and dispatch them along the Wagholi–Shirur route.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid lg:grid-cols-12 gap-8 items-start animate-fade-up delay-200"
          >
            {/* Step 1: Select Service & Contact Info */}
            <div className="lg:col-span-7 space-y-6">
              <div className="glass-panel rounded-2xl p-6 border border-border relative overflow-hidden">
                <div className="absolute inset-0 noise-overlay opacity-30 pointer-events-none" />
                <h2 className="font-display text-lg font-bold mb-4 flex items-center gap-2 relative z-10 text-white">
                  <span className="h-7 w-7 rounded-full bg-primary/20 border border-primary/40 text-primary flex items-center justify-center text-xs font-bold shadow-[0_0_15px_rgba(0,200,255,0.4)]">
                    1
                  </span>
                  Select Required Service
                </h2>
                <div className="grid sm:grid-cols-2 gap-3 relative z-10">
                  {services.map((srv) => (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => setSelectedService(srv.name)}
                      className={`text-left p-4 rounded-xl border transition-all duration-300 flex flex-col justify-between ${
                        selectedService === srv.name
                          ? "border-primary/50 bg-primary/20 text-white shadow-glow"
                          : "border-border/40 bg-black/20 text-muted-foreground hover:border-primary/40 hover:text-white"
                      }`}
                    >
                      <span className="font-semibold text-sm leading-snug">{srv.name}</span>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground mt-2 inline-block">
                        {srv.category}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass-panel rounded-2xl p-6 border border-border relative overflow-hidden">
                <div className="absolute inset-0 noise-overlay opacity-30 pointer-events-none" />
                <h2 className="font-display text-lg font-bold mb-4 flex items-center gap-2 relative z-10 text-white">
                  <span className="h-7 w-7 rounded-full bg-primary/20 border border-primary/40 text-primary flex items-center justify-center text-xs font-bold shadow-[0_0_15px_rgba(0,200,255,0.4)]">
                    2
                  </span>
                  Provide Contact Information
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs text-muted-foreground">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10 rounded-xl bg-background/50"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-xs text-muted-foreground">
                      Phone Number (WhatsApp Active)
                    </Label>
                    <div className="relative">
                      <PhoneIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="pl-10 rounded-xl bg-background/50"
                        required
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 space-y-2">
                    <Label htmlFor="email" className="text-xs text-muted-foreground">
                      Email Address (For Invoices & AMC Logs)
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="john.doe@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 rounded-xl bg-background/50"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 space-y-2">
                    <Label htmlFor="notes" className="text-xs text-muted-foreground">
                      Issue Description / Special Instructions
                    </Label>
                    <div className="relative">
                      <FileText className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
                      <Textarea
                        id="notes"
                        placeholder="Please describe the machine issue, model name, or code details here..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="pl-10 rounded-xl min-h-[90px] bg-background/50"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Date & Slot Picker */}
            <div className="lg:col-span-5 space-y-6">
              <div className="glass-panel rounded-2xl p-5 border border-border relative overflow-hidden">
                <div className="absolute inset-0 noise-overlay opacity-30 pointer-events-none" />
                <h2 className="font-display text-lg font-bold mb-4 flex items-center gap-2 relative z-10 text-white">
                  <span className="h-7 w-7 rounded-full bg-primary/20 border border-primary/40 text-primary flex items-center justify-center text-xs font-bold shadow-[0_0_15px_rgba(0,200,255,0.4)]">
                    3
                  </span>
                  Choose Date & Time Slot
                </h2>

                <div className="flex flex-col items-center relative z-10">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(d) => {
                      setSelectedDate(d);
                      setSelectedSlot(""); // Reset slot when date changes
                    }}
                    className="border border-border/60 rounded-xl p-3 bg-background/30 w-full"
                    disabled={{ before: new Date() }}
                  />
                </div>

                <div className="mt-6">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    Select an Available Slot
                  </h3>

                  {slotsLoading ? (
                    <div className="flex items-center justify-center py-8 text-sm text-muted-foreground gap-2">
                      <span className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                      <span>Checking slot availability...</span>
                    </div>
                  ) : (slotData as any)?.slots && (slotData as any).slots.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2">
                      {(slotData as any).slots.map((slot: any) => (
                        <button
                          key={slot.time}
                          type="button"
                          disabled={!slot.available}
                          onClick={() => setSelectedSlot(slot.time)}
                          className={`p-2.5 rounded-lg border text-center text-xs font-semibold transition ${
                            !slot.available
                              ? "bg-muted/10 border-border/20 text-muted-foreground/30 line-through cursor-not-allowed"
                              : selectedSlot === slot.time
                                ? "border-primary bg-primary text-primary-foreground font-bold shadow-glow"
                                : "border-border bg-card/30 text-foreground hover:border-primary/50"
                          }`}
                        >
                          {slot.time}
                          {!slot.available && " (Full)"}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-xs text-yellow-600 flex items-center justify-center gap-2 border border-yellow-500/20 bg-yellow-500/5 rounded-lg">
                      <AlertTriangle className="h-4 w-4 shrink-0" />
                      <span>Select a valid date to check slots.</span>
                    </div>
                  )}
                </div>

                {/* Quick Summary / CTA */}
                <div className="mt-8 pt-5 border-t border-border space-y-4">
                  {selectedService && selectedDate && selectedSlot && (
                    <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 text-xs leading-relaxed space-y-1 relative z-10 shadow-glow-blue">
                      <div className="font-semibold text-primary uppercase tracking-wider text-[10px] mb-2">
                        Selected Itinerary:
                      </div>
                      <div className="font-bold text-white text-sm">{selectedService}</div>
                      <div className="text-muted-foreground flex items-center gap-1">
                        <CalendarRange className="h-3.5 w-3.5" />{" "}
                        {getFriendlyDateString(formattedDate)}
                      </div>
                      <div className="text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {selectedSlot}
                      </div>
                    </div>
                  )}

                  <div className="pt-2 relative z-10">
                    <button
                      type="submit"
                      disabled={
                        bookingMutation.isPending ||
                        !selectedService ||
                        !selectedDate ||
                        !selectedSlot
                      }
                      className="w-full btn-primary justify-center py-4 text-base shadow-glow-blue disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {bookingMutation.isPending ? (
                        <>
                          <span className="animate-spin h-5 w-5 border-2 border-background border-t-transparent rounded-full" />
                          Processing...
                        </>
                      ) : (
                        "Confirm Service Booking"
                      )}
                    </button>
                    <p className="text-center text-[10px] text-muted-foreground mt-3 uppercase tracking-wider font-semibold">
                      No upfront payment required
                    </p>
                  </div>

                  <div className="relative flex items-center py-2">
                    <div className="flex-grow border-t border-border/50"></div>
                    <span className="flex-shrink-0 mx-4 text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                      or reach out directly
                    </span>
                    <div className="flex-grow border-t border-border/50"></div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href={`https://api.whatsapp.com/send/?phone=${cmsPhone.replace(/\\D/g, "")}&text=Hi+Prime+Cool%2C+I+need+a+service.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-500 hover:bg-emerald-500/20 transition"
                    >
                      <MessageSquare className="h-4 w-4" /> WhatsApp
                    </a>
                    <a
                      href={`tel:${cmsPhone.replace(/\\s+/g, "")}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-slate-900/60 px-4 py-3 text-sm font-semibold hover:bg-card transition"
                    >
                      <PhoneIcon className="h-4 w-4 text-primary" /> Call Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
