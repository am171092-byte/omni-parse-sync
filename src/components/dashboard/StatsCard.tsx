import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  description?: string;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "success" | "warning";
}

export function StatsCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  description,
  badge,
  badgeVariant = "secondary"
}: StatsCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="flex items-center space-x-2">
          {badge && (
            <Badge variant={badgeVariant} className="text-xs">
              {badge}
            </Badge>
          )}
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="h-4 w-4 text-primary" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-2xl font-bold text-foreground">{value}</div>
          <div className="flex items-center space-x-2 text-xs">
            <span
              className={cn(
                "inline-flex items-center font-medium",
                changeType === "positive" && "text-success",
                changeType === "negative" && "text-destructive",
                changeType === "neutral" && "text-muted-foreground"
              )}
            >
              {changeType === "positive" && "+"}
              {change}
            </span>
            {description && (
              <span className="text-muted-foreground">
                {description}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}