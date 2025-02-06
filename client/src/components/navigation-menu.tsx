import { Link, useLocation } from "wouter";
import { Home, BarChart, Plus } from "lucide-react";

export function NavigationMenu() {
  const [location] = useLocation();

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="border-b bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex h-16 items-center gap-4 md:gap-8">
          <Link href="/">
            <a className="font-bold text-xl text-primary">GoalTracker</a>
          </Link>
          
          <div className="flex gap-4 md:gap-6">
            <Link href="/">
              <a className={`flex items-center gap-2 text-sm font-medium ${
                isActive("/") ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}>
                <Home className="h-4 w-4" />
                <span>Home</span>
              </a>
            </Link>
            
            <Link href="/analytics">
              <a className={`flex items-center gap-2 text-sm font-medium ${
                isActive("/analytics") ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}>
                <BarChart className="h-4 w-4" />
                <span>Analytics</span>
              </a>
            </Link>
          </div>

          <div className="ml-auto">
            <Link href="/goals/new">
              <a className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                <Plus className="h-4 w-4" />
                <span>New Goal</span>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
