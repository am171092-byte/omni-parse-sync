import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useOrderContext } from "@/contexts/OrderContext";
import { LoadingSteps } from "@/components/ui/loading-steps";
import { EmailSourceModal } from "@/components/modals/EmailSourceModal";
import { EditOrderModal } from "@/components/modals/EditOrderModal";
import { ViewJSONModal } from "@/components/modals/ViewJSONModal";
import { generateMockOrders, ParsedOrder } from "@/data/mockOrders";
import { Navbar } from "@/components/layout/Navbar";
import { 
  Inbox, 
  CheckCircle, 
  Mail,
  FileText,
  MessageSquare,
  Phone,
  Eye,
  FileJson,
  Edit3
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

// ParsedOrder interface is now imported from mockOrders.ts

export default function TriggerAgent() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToFulfillment } = useOrderContext();
  const [isScanning, setIsScanning] = useState(false);
  const [parsedOrders, setParsedOrders] = useState<ParsedOrder[]>([]);
  const [publishedOrderId, setPublishedOrderId] = useState<string | null>(null);
  const [sourceModalOpen, setSourceModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [jsonModalOpen, setJsonModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<ParsedOrder | null>(null);
  const [currentStep, setCurrentStep] = useState<string>("");

  const loadingSteps = [
    { message: "Connecting to inbox...", duration: 1500 },
    { message: "Scanning unread emails...", duration: 2000 },
    { message: "Parsing attachments...", duration: 1800 },
    { message: "Extracting data into structured format...", duration: 2200 },
    { message: "Validating inventory availability...", duration: 1500 },
    { message: "Generating structured JSON...", duration: 1200 },
    { message: "Ready for review...", duration: 1000 }
  ];

  const handleScanInbox = () => {
    setIsScanning(true);
    setCurrentStep("scanning");
  };

  const handleLoadingComplete = () => {
    const orders = generateMockOrders(50);
    setParsedOrders(orders);
    setIsScanning(false);
    setCurrentStep("");
    
    toast({
      title: "Inbox Scan Complete",
      description: `Found ${orders.length} orders to process`,
    });
  };

  const handlePublishOrder = async (orderId: string) => {
    // Simulate publishing to ERP
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const orderToPublish = parsedOrders.find(order => order.id === orderId);
    if (orderToPublish) {
      // Add to fulfillment list
      addToFulfillment(orderToPublish);
    }
    
    setParsedOrders(prev => 
      prev.map(order => 
        order.id === orderId 
          ? { ...order, published: true }
          : order
      )
    );

    setPublishedOrderId(orderId);

    toast({
      title: "✅ Order Published Successfully",
      description: `Order ${orderId} has been sent to Adobe Commerce for fulfillment`,
    });
  };

  const handleViewSource = (order: ParsedOrder) => {
    setSelectedOrder(order);
    setSourceModalOpen(true);
  };

  const handleViewJSON = (order: ParsedOrder) => {
    setSelectedOrder(order);
    setJsonModalOpen(true);
  };

  const handleEditOrder = (order: ParsedOrder) => {
    setSelectedOrder(order);
    setEditModalOpen(true);
  };

  const handleSaveEditedOrder = (updatedOrder: ParsedOrder) => {
    setParsedOrders(prev => 
      prev.map(order => 
        order.id === updatedOrder.id ? updatedOrder : order
      )
    );
    toast({
      title: "Order Updated",
      description: `Changes saved for order ${updatedOrder.id}`,
    });
  };

  const getSourceIcon = (source: string) => {
    switch (source.toLowerCase()) {
      case 'email': return Mail;
      case 'whatsapp': return MessageSquare;
      case 'phone call': return Phone;
      default: return FileText;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Loading Steps */}
          {isScanning && currentStep === "scanning" && (
            <div className="flex justify-center py-12">
              <LoadingSteps 
                steps={loadingSteps} 
                onComplete={handleLoadingComplete}
              />
            </div>
          )}

          {/* Scan Section */}
          {!isScanning && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Inbox className="h-5 w-5" />
                  <span>Email Inbox Scanner</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-muted-foreground mb-4">
                      Scan your connected email inbox for new orders. The AI will parse email bodies and attachments to extract structured order data.
                    </p>
                    <Button 
                      onClick={handleScanInbox}
                      disabled={isScanning}
                      size="lg"
                      className="w-full md:w-auto"
                    >
                      <Inbox className="h-4 w-4 mr-2" />
                      Scan Inbox
                    </Button>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-medium mb-2">What we'll scan:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Email body content</li>
                      <li>• PDF attachments</li>
                      <li>• Word documents</li>
                      <li>• Excel spreadsheets</li>
                      <li>• Image files with text</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Parsed Orders Table */}
          {parsedOrders.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">
                    Parsed Orders ({parsedOrders.length})
                  </CardTitle>
                  <div className="text-sm text-muted-foreground">
                    Total Value: ${parsedOrders.reduce((sum, order) => sum + (order.quantity * order.price), 0).toFixed(2)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[150px]">Order # / Company</TableHead>
                        <TableHead className="min-w-[200px]">Product Details</TableHead>
                        <TableHead className="w-[100px]">Confidence</TableHead>
                        <TableHead className="w-[120px]">Order Type</TableHead>
                        <TableHead className="w-[100px]">Status</TableHead>
                        <TableHead className="w-[400px] text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {parsedOrders.map((order) => {
                        const SourceIcon = getSourceIcon(order.source);
                        return (
                          <TableRow key={order.id}>
                            <TableCell className="w-[150px]">
                              <div className="space-y-0.5">
                                <div className="font-medium text-sm">{order.id}</div>
                                <div className="text-xs text-muted-foreground truncate">{order.customerName}</div>
                              </div>
                            </TableCell>
                            <TableCell className="min-w-[200px]">
                              <div className="space-y-0.5">
                                <div className="text-sm font-medium">{order.productCode}</div>
                                <div className="text-xs text-muted-foreground truncate max-w-[200px]">{order.productName}</div>
                                <div className="text-xs text-muted-foreground">
                                  Qty: {order.quantity} × ${order.price} = ${(order.quantity * order.price).toFixed(2)}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="w-[100px]">
                              <Badge variant="secondary" className="text-xs">
                                {Math.round(order.confidence * 100)}%
                              </Badge>
                            </TableCell>
                            <TableCell className="w-[120px]">
                              <div className="flex items-center gap-2">
                                <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                  <SourceIcon className="h-3.5 w-3.5 text-primary" />
                                </div>
                                <span className="text-xs truncate">{order.source}</span>
                              </div>
                            </TableCell>
                            <TableCell className="w-[100px]">
                              {order.published ? (
                                <Badge variant="success" className="text-xs">Published</Badge>
                              ) : (
                                <Badge variant="warning" className="text-xs">Pending</Badge>
                              )}
                            </TableCell>
                            <TableCell className="w-[400px]">
                              <div className="flex justify-end gap-1.5 flex-nowrap">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="h-8 px-2"
                                  onClick={() => handleViewSource(order)}
                                >
                                  <Eye className="h-3.5 w-3.5 mr-1" />
                                  <span className="text-xs">Source</span>
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="h-8 px-2"
                                  onClick={() => handleViewJSON(order)}
                                >
                                  <FileJson className="h-3.5 w-3.5 mr-1" />
                                  <span className="text-xs">JSON</span>
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="h-8 px-2"
                                  onClick={() => handleEditOrder(order)}
                                  disabled={order.published}
                                >
                                  <Edit3 className="h-3.5 w-3.5 mr-1" />
                                  <span className="text-xs">Edit</span>
                                </Button>
                                {!order.published && (
                                  <Button 
                                    onClick={() => handlePublishOrder(order.id)}
                                    size="sm"
                                    className="h-8 px-2"
                                  >
                                    <CheckCircle className="h-3.5 w-3.5 mr-1" />
                                    <span className="text-xs">Publish</span>
                                  </Button>
                                )}
                                {order.published && publishedOrderId === order.id && (
                                  <Button 
                                    onClick={() => navigate('/fulfillment')}
                                    size="sm"
                                    className="h-8 px-2 whitespace-nowrap"
                                  >
                                    <span className="text-xs">Fulfillment</span>
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Modals */}
          {selectedOrder && (
            <>
              <EmailSourceModal
                isOpen={sourceModalOpen}
                onClose={() => setSourceModalOpen(false)}
                orderData={selectedOrder}
              />
              <ViewJSONModal
                isOpen={jsonModalOpen}
                onClose={() => setJsonModalOpen(false)}
                order={selectedOrder}
              />
              <EditOrderModal
                isOpen={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                order={selectedOrder}
                onSave={handleSaveEditedOrder}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
}