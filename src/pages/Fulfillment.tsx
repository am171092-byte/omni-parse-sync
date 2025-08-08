import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { useOrderContext } from "@/contexts/OrderContext";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  ArrowLeft,
  Truck,
  Package
} from "lucide-react";

export default function Fulfillment() {
  const navigate = useNavigate();
  const { fulfillmentOrders, markAsFulfilled, markAsUnfulfilled } = useOrderContext();
  const [filter, setFilter] = useState<'all' | 'pending' | 'fulfilled'>('pending');

  const filteredOrders = fulfillmentOrders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  const handleFulfillmentToggle = (orderId: string, currentStatus: 'pending' | 'fulfilled') => {
    if (currentStatus === 'pending') {
      markAsFulfilled(orderId);
    } else {
      markAsUnfulfilled(orderId);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
            <h1 className="text-2xl font-bold text-foreground">Pending Fulfillment Orders</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline"
              onClick={() => navigate('/trigger-agent')}
            >
              Go to Agent
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/dashboard')}
            >
              Dashboard
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{fulfillmentOrders.length}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Fulfillment</CardTitle>
                <Truck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {fulfillmentOrders.filter(order => order.status === 'pending').length}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fulfilled</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {fulfillmentOrders.filter(order => order.status === 'fulfilled').length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filter Buttons */}
          <div className="flex space-x-2">
            <Button
              variant={filter === 'pending' ? 'default' : 'outline'}
              onClick={() => setFilter('pending')}
            >
              Pending ({fulfillmentOrders.filter(order => order.status === 'pending').length})
            </Button>
            <Button
              variant={filter === 'fulfilled' ? 'default' : 'outline'}
              onClick={() => setFilter('fulfilled')}
            >
              Fulfilled ({fulfillmentOrders.filter(order => order.status === 'fulfilled').length})
            </Button>
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
            >
              All ({fulfillmentOrders.length})
            </Button>
          </div>

          {/* Orders Table */}
          <Card>
            <CardHeader>
              <CardTitle>Fulfillment Orders</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredOrders.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  {filter === 'pending' ? 'No pending orders to fulfill.' : 
                   filter === 'fulfilled' ? 'No fulfilled orders yet.' : 
                   'No orders found.'}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer Name</TableHead>
                      <TableHead>Product Summary</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Published Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Mark as Fulfilled</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customerName}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{order.productName}</div>
                            <div className="text-sm text-muted-foreground">
                              Code: {order.productCode}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{order.quantity}</TableCell>
                        <TableCell>{formatDate(order.publishedDate)}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={order.status === 'fulfilled' ? 'success' : 'warning'}
                          >
                            {order.status === 'fulfilled' ? 'Fulfilled' : 'Pending'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Checkbox
                            checked={order.status === 'fulfilled'}
                            onCheckedChange={() => handleFulfillmentToggle(order.id, order.status)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}