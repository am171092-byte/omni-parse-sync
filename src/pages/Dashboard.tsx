import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Package, 
  TrendingUp, 
  AlertTriangle, 
  DollarSign,
  Inbox,
  CheckCircle,
  ArrowLeft,
  Bot
} from "lucide-react";

interface Order {
  id: string;
  customerName: string;
  date: string;
  status: 'Published' | 'Failed' | 'Draft';
  items: number;
  total: number;
}

interface InventoryItem {
  name: string;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Overstock';
  alertLevel: 'success' | 'warning' | 'destructive';
}

export default function Dashboard() {
  const navigate = useNavigate();
  
  const historicalOrders: Order[] = [
    {
      id: "ORD-001",
      customerName: "Acme Corp",
      date: "2024-01-10",
      status: "Published",
      items: 150,
      total: 4498.50
    },
    {
      id: "ORD-002", 
      customerName: "TechFlow Solutions",
      date: "2024-01-10",
      status: "Published",
      items: 75,
      total: 3375.00
    },
    {
      id: "ORD-003",
      customerName: "Global Manufacturing Inc",
      date: "2024-01-10",
      status: "Draft",
      items: 200,
      total: 25100.00
    },
    {
      id: "ORD-004",
      customerName: "Innovative Systems Ltd",
      date: "2024-01-09", 
      status: "Published",
      items: 50,
      total: 1250.00
    },
    {
      id: "ORD-005",
      customerName: "Metro Distributors",
      date: "2024-01-09",
      status: "Failed",
      items: 100,
      total: 2890.00
    }
  ];

  const inventoryItems: InventoryItem[] = [
    { name: "Industrial Widgets", stock: 850, status: "In Stock", alertLevel: "success" },
    { name: "Premium Connectors", stock: 25, status: "Low Stock", alertLevel: "warning" },
    { name: "Steel Components", stock: 1200, status: "Overstock", alertLevel: "destructive" },
    { name: "Circuit Boards", stock: 150, status: "In Stock", alertLevel: "success" },
    { name: "Power Cables", stock: 15, status: "Low Stock", alertLevel: "warning" }
  ];

  const kpis = {
    totalOrders: historicalOrders.length,
    totalUnits: historicalOrders.reduce((sum, order) => sum + order.items, 0),
    inStock: inventoryItems.filter(item => item.status === "In Stock").length,
    lowStock: inventoryItems.filter(item => item.status === "Low Stock").length,
    overstock: inventoryItems.filter(item => item.status === "Overstock").length
  };

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'Published':
        return <Badge variant="success">Published</Badge>;
      case 'Failed':
        return <Badge variant="destructive">Failed</Badge>;
      case 'Draft':
        return <Badge variant="warning">Draft</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-2xl font-bold text-foreground">Order Dashboard</h1>
          </div>
          <Button 
            onClick={() => navigate('/trigger-agent')}
          >
            <Bot className="h-4 w-4 mr-2" />
            Go to Agent
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Orders Processed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{kpis.totalOrders}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Units Ordered
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{kpis.totalUnits.toLocaleString()}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Items In Stock
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">{kpis.inStock}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Low Stock Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-warning">{kpis.lowStock}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Overstock Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">{kpis.overstock}</div>
              </CardContent>
            </Card>
          </div>

          {/* Historical Orders Table */}
          <Card>
            <CardHeader>
              <CardTitle>Historical Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Order ID</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Customer Name</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date Processed</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                      <th className="text-right py-3 px-4 font-medium text-muted-foreground">Items</th>
                      <th className="text-right py-3 px-4 font-medium text-muted-foreground">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historicalOrders.map((order) => (
                      <tr key={order.id} className="border-b">
                        <td className="py-3 px-4 font-medium">{order.id}</td>
                        <td className="py-3 px-4">{order.customerName}</td>
                        <td className="py-3 px-4 text-muted-foreground">{order.date}</td>
                        <td className="py-3 px-4">{getStatusBadge(order.status)}</td>
                        <td className="py-3 px-4 text-right">{order.items}</td>
                        <td className="py-3 px-4 text-right font-medium">${order.total.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Inventory Status */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Inventory Status</CardTitle>
                <Badge variant="warning">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  {kpis.lowStock} Low Stock Alerts
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {inventoryItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Package className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.stock} units</p>
                      </div>
                    </div>
                    <Badge variant={item.alertLevel}>
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Trend Chart Placeholder */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Volume Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Chart visualization coming soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Inventory Depletion Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                  <div className="text-center">
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Chart visualization coming soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}