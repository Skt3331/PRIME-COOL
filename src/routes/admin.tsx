import { createFileRoute, Link, Outlet, redirect, useRouter } from "@tanstack/react-router";
import { checkAuthSession, logoutAdmin } from "../lib/auth";
import logo from "@/assets/logo.webp";
import {
  LayoutDashboard,
  Briefcase,
  LogOut,
  Clock,
  ArrowLeft,
  User,
  Menu,
  X,
  Gauge,
  Sliders,
  BookOpen,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  beforeLoad: async ({ location }) => {
    const { authenticated } = await checkAuthSession();
    const isLoginPage = location.pathname === "/admin/login";

    if (!authenticated && !isLoginPage) {
      throw redirect({
        to: "/admin/login",
      });
    }

    if (authenticated && isLoginPage) {
      throw redirect({
        to: "/admin",
      });
    }

    return { authenticated };
  },
  component: AdminLayout,
});

function AdminLayout() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = Route.useSearch(); // Just checking if they are in route

  // We can determine current path from router state
  const pathname = router.state.location.pathname;

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      // Clear token cookie client-side
      document.cookie = "session_token=; path=/; max-age=0";
      toast.success("Logged out successfully");
      router.invalidate();
      window.location.href = "/admin/login";
    } catch (error) {
      console.error(error);
      toast.error("Failed to log out");
    }
  };

  // If on login page, don't show the dashboard layout framework
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <Outlet />;
  }

  const navItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Portfolio Mgr",
      path: "/admin/portfolio",
      icon: Briefcase,
    },
    {
      name: "Blogs Mgr",
      path: "/admin/blogs",
      icon: BookOpen,
    },
    {
      name: "Site CMS",
      path: "/admin/cms",
      icon: Sliders,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between px-6 h-16 border-b border-border bg-card/40 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Prime Cool" className="h-7 w-7" />
          <span className="font-display font-bold text-sm tracking-tight">
            Prime <span className="text-gradient">Cool Admin</span>
          </span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {/* Sidebar - Desktop & Mobile overlay */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-border bg-card/60 backdrop-blur-xl p-6 flex flex-col justify-between transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen ${
          mobileMenuOpen ? "translate-x-0" : "max-md:-translate-x-full"
        }`}
      >
        <div className="space-y-8">
          {/* Logo */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img src={logo} alt="Prime Cool" className="h-9 w-9" />
              <span className="font-display font-bold text-lg tracking-tight">
                Prime <span className="text-gradient">Cool</span>
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden p-1 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-3 px-3">
              Management Hub
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const cleanPathname = pathname.replace(/\/$/, "");
              const cleanItemPath = item.path.replace(/\/$/, "");
              const isActive = cleanPathname === cleanItemPath;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition ${
                    isActive
                      ? "border border-primary/30 bg-primary/10 text-primary"
                      : "border border-transparent text-muted-foreground hover:text-foreground hover:bg-card/40"
                  }`}
                >
                  <Icon className="h-4.5 w-4.5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-border space-y-4">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>View Public Website</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition border border-transparent hover:border-rose-500/20"
          >
            <LogOut className="h-4.5 w-4.5" />
            <span>Logout Account</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:h-screen md:overflow-y-auto p-6 md:p-10">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Mobile overlay background */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
        />
      )}
    </div>
  );
}
