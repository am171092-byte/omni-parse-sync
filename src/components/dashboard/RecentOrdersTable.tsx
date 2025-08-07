import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, FileJson, Mail, MessageSquare, Phone } from "lucide-react";

const orders = [
  {
    id: "ORD-2024-001",
    customer: "Acme Corp",
    channel: "email",
    status: "processed",
    amount: "$2,450.00",
    items: 3,
    date: "2024-01-15",
    confidence: 98
  },
  {
    id: "ORD-2024-002",
    customer: "TechStart Inc",
    channel: "whatsapp",
    status: "validating",
    amount: "$1,230.00",
    items: 2,
    date: "2024-01-15",
    confidence: 95
  },
  {
    id: "ORD-2024-003",
    customer: "Global Solutions",
    channel: "phone",
    status: "processed",
    amount: "$3,780.00",
    items: 5,
    date: "2024-01-14",
    confidence: 92
  },
  {
    id: "ORD-2024-004",
    customer: "Innovation Hub",
    channel: "email",
    status: "pending",
    amount: "$890.00",
    items: 1,
    date: "2024-01-14",
    confidence: 87
  }
];

const channelIcons = {
  email: Mail,
  whatsapp: MessageSquare,
  phone: Phone,
};

export function RecentOrdersTable() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Recent Orders</CardTitle>
          <Button variant="outline" size="sm">
            View All Orders
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Channel</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Confidence</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => {
              const ChannelIcon = channelIcons[order.channel as keyof typeof channelIcons];
              
              return (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.items} items • {order.date}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <ChannelIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="capitalize text-sm">{order.channel}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        order.status === "processed" ? "success" :
                        order.status === "validating" ? "warning" :
                        "secondary"
                      }
                      className="text-xs"
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{order.amount}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-12 bg-secondary rounded-full h-2">
                        <div 
                          className="bg-success h-2 rounded-full" 
                          style={{ width: `${order.confidence}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{order.confidence}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <FileJson className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}