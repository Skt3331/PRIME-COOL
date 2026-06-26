import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { loginAdmin } from "../../lib/auth";
import logo from "@/assets/logo.png";
import { Lock, User, KeyRound, ArrowRight, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [{ title: "Admin Portal Secure Login — Prime Cool" }],
  }),
  component: LoginPage,
});

function LoginPage() {
  const router = useRouter();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      toast.warning("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const result = await loginAdmin({ data: { username, password } });
      if (result.success && result.token) {
        // Set secure cookie client-side
        document.cookie = `session_token=${result.token}; path=/; max-age=604800; SameSite=Strict`;
        toast.success("Successfully authenticated!");
        
        // Invalidate router context so beforeLoad runs again
        await router.invalidate();
        // Redirect to admin panel
        await navigate({ to: "/admin" });
      } else {
        toast.error(result.error || "Authentication failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network or server error during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center px-6 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,color-mix(in_oklab,var(--primary)_25%,transparent),transparent_50%)] pointer-events-none" />
      
      <div className="w-full max-w-[420px] relative">
        {/* Glow rings */}
        <div className="absolute -top-12 -left-12 h-36 w-36 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 h-36 w-36 rounded-full bg-accent/10 blur-2xl pointer-events-none" />

        {/* Card wrapper */}
        <div className="surface-card rounded-3xl p-8 border border-border/80 shadow-elegant backdrop-blur-xl relative">
          <div className="text-center mb-8">
            <img src={logo} alt="Prime Cool logo" className="h-12 w-12 mx-auto mb-4" />
            <h1 className="font-display text-2xl font-bold tracking-tight">
              Control <span className="text-gradient">Center</span>
            </h1>
            <p className="text-xs text-muted-foreground mt-2">
              Sign in to manage bookings, portfolio, and settings.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-xs text-muted-foreground">Admin Username</Label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted-foreground" />
                <Input
                  id="username"
                  type="text"
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-11 rounded-xl bg-background/50 border-border/60 focus:border-primary/80"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs text-muted-foreground">Security Key / Password</Label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-11 rounded-xl bg-background/50 border-border/60 focus:border-primary/80"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Seeding credential callout */}
            <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-3.5 text-xs text-yellow-600/90 leading-relaxed flex gap-2.5 items-start">
              <ShieldAlert className="h-4 w-4 shrink-0 text-yellow-500 mt-0.5" />
              <div>
                <strong>Default Credentials Seeded:</strong>
                <div className="mt-0.5">
                  Use username <code className="bg-yellow-500/10 px-1 py-0.5 rounded font-mono font-bold">admin</code> and password <code className="bg-yellow-500/10 px-1 py-0.5 rounded font-mono font-bold">admin123</code>.
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl py-3 mt-2 font-semibold hover:opacity-90 transition glow-ring flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="animate-spin h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full" />
                  Authenticating...
                </>
              ) : (
                <>
                  Establish Connection <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </div>

        <div className="text-center mt-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition underline"
          >
            <KeyRound className="h-3 w-3" />
            <span>Return to Public Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
