import { cn } from "@/lib/utils";
import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Users, 
  PieChart, 
  TrendingUp, 
  Sparkles,
  RefreshCw,
  Settings, 
  LogOut 
} from "lucide-react";

const sidebarLinks = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Users, label: "Clients", href: "/clients" },
  { icon: PieChart, label: "Portfolios", href: "/portfolios" },
  { icon: TrendingUp, label: "Market Insights", href: "/market" },
  { icon: RefreshCw, label: "Trading Tools", href: "/trading" },
  { icon: Sparkles, label: "AI Advisor", href: "/advisor" },
];

export function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="flex h-screen w-64 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <div className="flex h-16 items-center px-6">
        <h1 className="font-serif text-xl font-bold tracking-tight text-white uppercase">
          Nous <span className="text-sidebar-primary">Wealth</span>
        </h1>
      </div>
      
      <div className="flex-1 px-4 py-6 space-y-2">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          const isActive = location === link.href;
          return (
            <Link key={link.href} href={link.href}>
              <div 
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200 group cursor-pointer",
                  isActive 
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm" 
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-white"
                )}
              >
                <Icon className={cn("h-4 w-4", isActive ? "text-sidebar-primary" : "text-sidebar-foreground/70 group-hover:text-white")} />
                {link.label}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-sidebar-border">
        <Link href="/settings">
          <div className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-white transition-all cursor-pointer">
            <Settings className="h-4 w-4" />
            Settings
          </div>
        </Link>
        <button className="w-full mt-1 flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-white transition-all cursor-pointer">
          <LogOut className="h-4 w-4" />
          Log Out
        </button>
      </div>
    </div>
  );
}