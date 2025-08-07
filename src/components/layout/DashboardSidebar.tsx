import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  Package, 
  Inbox, 
  BarChart3, 
  Settings, 
  AlertTriangle,
  FileText,
  TrendingUp
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard, current: true },
  { name: "Order Ingestion", href: "/orders", icon: Inbox, badge: "3" },
  { name: "Inventory", href: "/inventory", icon: Package, badge: "2", variant: "warning" },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Trends", href: "/trends", icon: TrendingUp },
  { name: "Alerts", href: "/alerts", icon: AlertTriangle, badge: "5", variant: "destructive" },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function DashboardSidebar({ className }: SidebarProps) {
  return (
    <div className={cn("flex h-full w-64 flex-col bg-card border-r", className)}>
      {/* Logo Section */}
      <div className="flex h-16 items-center px-6 border-b">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Package className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">OmniTracker</h1>
            <p className="text-xs text-muted-foreground">Order Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.name}
              variant={item.current ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start px-3 py-2 text-sm font-medium",
                item.current 
                  ? "bg-secondary text-secondary-foreground" 
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <Icon className="mr-3 h-4 w-4" />
              {item.name}
              {item.badge && (
                <Badge 
                  variant={item.variant as any || "secondary"} 
                  className="ml-auto h-5 px-1.5 text-xs"
                >
                  {item.badge}
                </Badge>
              )}
            </Button>
          );
        })}
      </nav>

      {/* Status Section */}
      <div className="border-t p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">System Status</span>
            <span className="flex items-center text-success">
              <div className="h-2 w-2 rounded-full bg-success mr-2" />
              Online
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Orders Today</span>
            <span className="font-medium">47</span>
          </div>
        </div>
      </div>
    </div>
  );
}