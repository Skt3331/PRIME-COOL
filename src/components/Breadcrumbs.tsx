import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumbs() {
  const { location } = useRouterState();
  const pathnames = location.pathname.split("/").filter((x) => x);

  if (pathnames.length === 0) return null;

  // Simple formatting for breadcrumb names
  const formatName = (name: string) => {
    return name
      .replace(/-/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <nav className="flex items-center text-xs text-muted-foreground mb-6 overflow-x-auto whitespace-nowrap pb-2 scrollbar-none">
      <Link to="/" className="hover:text-primary transition flex items-center">
        <Home className="h-3 w-3 mr-1" />
        Home
      </Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return (
          <div key={to} className="flex items-center">
            <ChevronRight className="h-3 w-3 mx-2 text-border" />
            {isLast ? (
              <span className="text-foreground font-semibold">{formatName(value)}</span>
            ) : (
              <Link to={to} className="hover:text-primary transition">
                {formatName(value)}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
