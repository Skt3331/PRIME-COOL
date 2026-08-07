import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAdminBookings,
  getAdminNotifications,
  getVisits,
  updateBookingStatus,
  deleteBooking,
  changeAdminSettings,
  getDbStatus,
} from "../../lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Users,
  CalendarDays,
  CheckCircle,
  Clock,
  Trash2,
  XCircle,
  Mail,
  MessageSquare,
  Lock,
  KeyRound,
  ShieldCheck,
  Send,
  Eye,
  Settings,
} from "lucide-react";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [{ title: "Admin Dashboard Control Panel — Prime Cool" }],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const queryClient = useQueryClient();
  const router = useRouter();

  // Settings states
  const [newUsername, setNewUsername] = useState("admin");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUpdatingSettings, setIsUpdatingSettings] = useState(false);

  // Queries
  const { data: bookingsData, isLoading: bookingsLoading } = useQuery({
    queryKey: ["adminBookings"],
    queryFn: getAdminBookings,
  });

  const { data: notificationsData, isLoading: notificationsLoading } = useQuery({
    queryKey: ["adminNotifications"],
    queryFn: getAdminNotifications,
  });

  const { data: visitsData } = useQuery({
    queryKey: ["adminVisits"],
    queryFn: getVisits,
  });

  const { data: dbStatusData } = useQuery({
    queryKey: ["dbStatus"],
    queryFn: getDbStatus,
  });

  // Booking mutations
  const updateStatusMutation = useMutation({
    mutationFn: updateBookingStatus,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(`Booking status updated to ${data.booking?.status}`);
        queryClient.invalidateQueries({ queryKey: ["adminBookings"] });
        queryClient.invalidateQueries({ queryKey: ["adminNotifications"] });
      } else {
        toast.error(data.error || "Failed to update status.");
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBooking,
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Appointment deleted successfully.");
        queryClient.invalidateQueries({ queryKey: ["adminBookings"] });
      } else {
        toast.error("Failed to delete booking.");
      }
    },
  });

  const changeSettingsMutation = useMutation({
    mutationFn: changeAdminSettings,
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Admin security credentials updated!");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error("Failed to update credentials.");
      }
    },
    onMutate: () => setIsUpdatingSettings(true),
    onSettled: () => setIsUpdatingSettings(false),
  });

  const handleUpdateCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername.trim()) {
      toast.warning("Username cannot be empty.");
      return;
    }
    if (newPassword) {
      if (newPassword.length < 6) {
        toast.warning("Password must be at least 6 characters.");
        return;
      }
      if (newPassword !== confirmPassword) {
        toast.warning("Passwords do not match.");
        return;
      }
    }

    changeSettingsMutation.mutate({
      data: {
        username: newUsername,
        password: newPassword || undefined,
      },
    });
  };

  const getFriendlyDateString = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Compute metrics
  const bookings = (bookingsData as any)?.bookings || [];
  const totalBookings = bookings.length;
  const pendingCount = bookings.filter((b: any) => b.status === "pending").length;
  const confirmedCount = bookings.filter((b: any) => b.status === "confirmed").length;
  const totalVisits = (visitsData as any)?.visits || 0;

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold leading-tight">
            System <span className="text-gradient">Overview</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Monitor incoming service requests, check notification delivery logs, and maintain system
            state.
          </p>
        </div>
        {dbStatusData?.status && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl border border-border bg-card/40 text-xs w-fit">
            <span
              className={`h-2.5 w-2.5 rounded-full ${dbStatusData.status.connected ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" : "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"}`}
            />
            <span className="font-medium text-muted-foreground">Database:</span>
            <span
              className={`font-semibold ${dbStatusData.status.connected ? "text-emerald-400" : "text-amber-400"}`}
            >
              {dbStatusData.status.type === "MySQL" ? "MySQL Server" : "JSON Fallback"}
            </span>
            {dbStatusData.status.host && (
              <span className="text-muted-foreground/60 border-l border-border/80 pl-2">
                {dbStatusData.status.host}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric: Total visits */}
        <div className="bento-card p-5 flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-400">Total Site Visits</div>
            <div className="font-display text-2xl font-bold mt-1.5 text-white">{totalVisits}</div>
          </div>
          <div className="h-10 w-10 rounded-xl bg-[#00c8ff]/10 border border-[#00c8ff]/20 text-[#00c8ff] flex items-center justify-center">
            <Users className="h-5 w-5" />
          </div>
        </div>

        {/* Metric: Total Bookings */}
        <div className="bento-card p-5 flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-400">Total Bookings</div>
            <div className="font-display text-2xl font-bold mt-1.5 text-white">{totalBookings}</div>
          </div>
          <div className="h-10 w-10 rounded-xl bg-[#00ffcc]/10 border border-[#00ffcc]/20 text-[#00ffcc] flex items-center justify-center">
            <CalendarDays className="h-5 w-5" />
          </div>
        </div>

        {/* Metric: Confirmed */}
        <div className="bento-card p-5 flex items-center justify-between border-[#00c8ff]/30 shadow-[0_0_15px_rgba(0,200,255,0.15)]">
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-400">Confirmed Jobs</div>
            <div className="font-display text-2xl font-bold mt-1.5 text-[#00c8ff]">
              {confirmedCount}
            </div>
          </div>
          <div className="h-10 w-10 rounded-xl bg-[#00c8ff]/10 border border-[#00c8ff]/20 text-[#00c8ff] flex items-center justify-center">
            <CheckCircle className="h-5 w-5" />
          </div>
        </div>

        {/* Metric: Pending */}
        <div className="bento-card p-5 flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-400">Pending Action</div>
            <div className="font-display text-2xl font-bold mt-1.5 text-yellow-400">
              {pendingCount}
            </div>
          </div>
          <div className="h-10 w-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 flex items-center justify-center">
            <Clock className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Main Grid: Bookings & Notifications */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left Column: Booking Queue */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bento-card p-6">
            <h2 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-primary" />
              Appointment Queue
            </h2>

            {bookingsLoading ? (
              <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-2">
                <span className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full" />
                <span>Fetching appointment records...</span>
              </div>
            ) : bookings.length > 0 ? (
              <div className="space-y-4">
                {bookings.map((booking: any) => (
                  <div
                    key={booking.id}
                    className={`border rounded-2xl p-4 transition relative ${
                      booking.status === "confirmed"
                        ? "border-[#00c8ff]/30 bg-[#00c8ff]/5"
                        : booking.status === "cancelled"
                          ? "border-rose-500/10 bg-rose-500/[0.02] opacity-75"
                          : "border-white/10 bg-white/5"
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2.5">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-display font-semibold text-base">
                            {booking.customerName}
                          </h3>
                          <span
                            className={`text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border ${
                              booking.status === "confirmed"
                                ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
                                : booking.status === "cancelled"
                                  ? "bg-rose-500/15 border-rose-500/30 text-rose-400"
                                  : "bg-yellow-500/15 border-yellow-500/30 text-yellow-400"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {booking.phone} · {booking.email || "No email"}
                        </div>
                      </div>

                      <div className="text-right text-xs">
                        <div className="font-semibold text-primary">
                          {getFriendlyDateString(booking.date)}
                        </div>
                        <div className="text-muted-foreground flex items-center gap-1 justify-end mt-0.5">
                          <Clock className="h-3 w-3" />
                          <span>{booking.timeSlot}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3.5 border-t border-border/40 pt-2.5 space-y-2 text-xs">
                      <div>
                        <span className="text-muted-foreground">Requested Service:</span>{" "}
                        <strong className="text-foreground">{booking.serviceType}</strong>
                      </div>
                      {booking.notes && (
                        <div>
                          <span className="text-muted-foreground">Client Instructions:</span>{" "}
                          <span className="italic text-muted-foreground/80">{booking.notes}</span>
                        </div>
                      )}
                    </div>

                    {/* Operational Action Buttons */}
                    <div className="mt-4 flex flex-wrap gap-2 justify-end">
                      {booking.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              updateStatusMutation.mutate({
                                data: { id: booking.id, status: "cancelled" },
                              })
                            }
                            disabled={updateStatusMutation.isPending}
                            className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Cancel / Refuse
                          </Button>
                          <Button
                            size="sm"
                            onClick={() =>
                              updateStatusMutation.mutate({
                                data: { id: booking.id, status: "confirmed" },
                              })
                            }
                            disabled={updateStatusMutation.isPending}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Confirm Booking
                          </Button>
                        </>
                      )}

                      {booking.status !== "pending" && (
                        <div className="text-muted-foreground text-[11px] self-center mr-auto flex items-center gap-1 border border-border/40 bg-background/40 px-2 py-0.5 rounded-md">
                          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                          <span>Actions completed</span>
                        </div>
                      )}

                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          if (
                            confirm("Are you sure you want to delete this record from history?")
                          ) {
                            deleteMutation.mutate({ data: { id: booking.id } });
                          }
                        }}
                        disabled={deleteMutation.isPending}
                        className="text-muted-foreground hover:text-rose-400 hover:bg-rose-500/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 border border-dashed border-border rounded-2xl bg-card/10 text-muted-foreground">
                <Clock className="h-10 w-10 mx-auto opacity-50 mb-3" />
                <h3 className="font-semibold text-sm">Appointment ledger empty</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Bookings submitted on the front-end will render here.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Notification Logs */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bento-card p-6 flex flex-col h-[520px]">
            <h2 className="font-display text-lg font-bold mb-4 flex items-center gap-2 shrink-0">
              <Send className="h-5 w-5 text-primary" />
              Confirmation Logs
            </h2>

            <div className="flex-1 overflow-y-auto space-y-3.5 pr-1">
              {notificationsLoading ? (
                <div className="flex justify-center py-12 text-xs text-muted-foreground gap-2">
                  <span className="animate-spin h-3.5 w-3.5 border-2 border-primary border-t-transparent rounded-full" />
                  <span>Loading message logs...</span>
                </div>
              ) : (notificationsData as any)?.notifications &&
                (notificationsData as any).notifications.length > 0 ? (
                (notificationsData as any).notifications.map((log: any) => (
                  <div
                    key={log.id}
                    className="p-3.5 rounded-xl bg-background/40 border border-border/50 text-xs space-y-2 relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-muted-foreground/80">{log.id}</span>
                      <span className="text-[9px] text-muted-foreground">
                        {new Date(log.sentAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    <div className="flex items-start gap-2">
                      {log.type === "whatsapp" ? (
                        <MessageSquare className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <Mail className="h-4.5 w-4.5 text-cyan-400 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <div className="font-bold text-foreground">
                          {log.type === "whatsapp"
                            ? "WhatsApp SMS"
                            : `Email: ${log.subject || "Alert"}`}
                        </div>
                        <div className="text-muted-foreground font-semibold mt-0.5">
                          {log.recipient}
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground/90 whitespace-pre-wrap leading-relaxed mt-1 text-[11px] bg-background/50 p-2 rounded-lg border border-border/30">
                      {log.message}
                    </p>
                    <div className="text-right">
                      <span className="inline-flex items-center text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                        Delivered
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-16 text-muted-foreground">
                  <Mail className="h-8 w-8 mx-auto opacity-45 mb-2" />
                  <div className="text-xs">No notifications logged.</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Security Credentials settings panel */}
      <div className="bento-card p-6 max-w-xl">
        <h2 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
          <Settings className="h-5 w-5 text-primary" />
          Security Credentials
        </h2>
        <form onSubmit={handleUpdateCredentials} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="admin-username" className="text-xs text-muted-foreground">
                Admin Username
              </Label>
              <Input
                id="admin-username"
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="rounded-xl bg-background/50"
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="admin-password" className="text-xs text-muted-foreground">
                New Security Key (Leave empty to keep current)
              </Label>
              <Input
                id="admin-password"
                type="password"
                placeholder="New security key"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="rounded-xl bg-background/50"
              />
            </div>

            {newPassword && (
              <div className="sm:col-span-2 space-y-1">
                <Label htmlFor="admin-confirm" className="text-xs text-muted-foreground">
                  Confirm Security Key
                </Label>
                <Input
                  id="admin-confirm"
                  type="password"
                  placeholder="Confirm new key"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="rounded-xl bg-background/50"
                  required
                />
              </div>
            )}
          </div>

          <Button
            type="submit"
            disabled={isUpdatingSettings}
            className="rounded-xl px-5 font-semibold mt-2"
          >
            {isUpdatingSettings ? "Updating Credentials..." : "Save Settings"}
          </Button>
        </form>
      </div>
    </div>
  );
}
