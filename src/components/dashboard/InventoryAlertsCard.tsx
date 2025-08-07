import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, TrendingDown, TrendingUp, Package } from "lucide-react";

const alerts = [
  {
    id: 1,
    type: "stockout",
    product: "Premium Widget A-100",
    sku: "PWA-100",
    current: 2,
    threshold: 10,
    severity: "high",
    trend: "down"
  },
  {
    id: 2,
    type: "low_stock",
    product: "Standard Component B-250",
    sku: "SCB-250",
    current: 8,
    threshold: 25,
    severity: "medium",
    trend: "down"
  },
  {
    id: 3,
    type: "overstock",
    product: "Basic Part C-300",
    sku: "BPC-300",
    current: 450,
    threshold: 200,
    severity: "low",
    trend: "up"
  },
  {
    id: 4,
    type: "demand_surge",
    product: "Popular Item D-400",
    sku: "PID-400",
    current: 45,
    threshold: 50,
    severity: "medium",
    trend: "up"
  }
];

export function InventoryAlertsCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            Inventory Alerts
          </CardTitle>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.map((alert) => (
          <div key={alert.id} className="flex items-center justify-between p-3 rounded-lg border bg-muted/30">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-lg bg-background flex items-center justify-center">
                <Package className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <p className="font-medium text-sm">{alert.product}</p>
                <p className="text-xs text-muted-foreground">SKU: {alert.sku}</p>
                <div className="flex items-center space-x-2">
                  <span className="text-xs">
                    Current: <strong>{alert.current}</strong>
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Threshold: {alert.threshold}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {alert.trend === "up" ? (
                <TrendingUp className="h-4 w-4 text-success" />
              ) : (
                <TrendingDown className="h-4 w-4 text-destructive" />
              )}
              <Badge 
                variant={
                  alert.severity === "high" ? "destructive" :
                  alert.severity === "medium" ? "warning" :
                  "secondary"
                }
                className="text-xs"
              >
                {alert.type.replace("_", " ")}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}