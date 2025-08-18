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
import { generateMockOrders, ParsedOrder } from "@/data/mockOrders";
import { 
  Inbox, 
  ChevronDown, 
  ChevronRight, 
  CheckCircle, 
  ArrowLeft,
  Mail,
  FileText,
  Loader2,
  MessageSquare,
  Phone,
  Eye,
  Edit3
} from "lucide-react";

// ParsedOrder interface is now imported from mockOrders.ts

export default function TriggerAgent() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToFulfillment } = useOrderContext();
  const [isScanning, setIsScanning] = useState(false);
  const [parsedOrders, setParsedOrders] = useState<ParsedOrder[]>([]);
  const [openOrders, setOpenOrders] = useState<{ [key: string]: boolean }>({});
  const [publishedOrderId, setPublishedOrderId] = useState<string | null>(null);
  const [sourceModalOpen, setSourceModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<ParsedOrder | null>(null);
  const [currentStep, setCurrentStep] = useState<string>("");

  const loadingSteps = [
    { message: "Connecting to email inbox...", duration: 1500 },
    { message: "Scanning for new messages...", duration: 2000 },
    { message: "Parsing email content...", duration: 1800 },
    { message: "Extracting attachments...", duration: 2200 },
    { message: "Analyzing order data...", duration: 1500 },
    { message: "Validating inventory...", duration: 1200 },
    { message: "Generating structured data...", duration: 1000 },
    { message: "Ready to review orders!", duration: 500 }
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
      title: "✅ Order published successfully",
      description: `Order ${orderId} has been sent to the ERP system`,
    });
  };

  const toggleOrderDetails = (orderId: string) => {
    setOpenOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  const handleViewSource = (order: ParsedOrder) => {
    setSelectedOrder(order);
    setSourceModalOpen(true);
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
            <h1 className="text-2xl font-bold text-foreground">Scan Inbox for Orders</h1>
          </div>
          <Button 
            variant="outline"
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </Button>
        </div>
      </header>

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

          {/* Parsed Orders */}
          {parsedOrders.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-foreground">
                  Parsed Orders ({parsedOrders.length})
                </h2>
                <div className="text-sm text-muted-foreground">
                  Total Value: ${parsedOrders.reduce((sum, order) => sum + (order.quantity * order.price), 0).toFixed(2)}
                </div>
              </div>
              
              <div className="grid gap-4">
                {parsedOrders.map((order) => {
                  const SourceIcon = getSourceIcon(order.source);
                  return (
                    <Card key={order.id} className="hover:shadow-md transition-all duration-200">
                      <Collapsible 
                        open={openOrders[order.id]} 
                        onOpenChange={() => toggleOrderDetails(order.id)}
                      >
                        <CardHeader className="cursor-pointer" onClick={() => toggleOrderDetails(order.id)}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <SourceIcon className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <div className="flex items-center space-x-2">
                                  <CardTitle className="text-lg">{order.customerName}</CardTitle>
                                  {openOrders[order.id] ? (
                                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                  ) : (
                                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {order.productName} • Qty: {order.quantity} • ${(order.quantity * order.price).toFixed(2)}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant="secondary">
                                {Math.round(order.confidence * 100)}% confidence
                              </Badge>
                              <Badge variant="outline">
                                {order.source}
                              </Badge>
                              {order.published ? (
                                <Badge variant="success">Published</Badge>
                              ) : (
                                <Badge variant="warning">Pending</Badge>
                              )}
                            </div>
                          </div>
                        </CardHeader>
                        
                        <CollapsibleContent>
                          <CardContent className="pt-0">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-muted rounded-lg">
                              <div>
                                <p className="text-sm text-muted-foreground">Product Code</p>
                                <p className="font-medium">{order.productCode}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Quantity</p>
                                <p className="font-medium">{order.quantity}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Unit Price</p>
                                <p className="font-medium">${order.price}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Total Value</p>
                                <p className="font-medium text-primary">${(order.quantity * order.price).toFixed(2)}</p>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div>
                                <p className="text-sm text-muted-foreground mb-1">Delivery Address</p>
                                <p className="text-sm bg-background p-2 rounded border">{order.deliveryAddress}</p>
                              </div>

                              {/* JSON Collapsible */}
                              <details className="group">
                                <summary className="cursor-pointer text-sm font-medium hover:text-primary">
                                  View JSON Data
                                </summary>
                                <div className="mt-2">
                                  <pre className="bg-background border p-3 rounded-md text-xs overflow-x-auto max-h-64">
                                    {JSON.stringify(order.json, null, 2)}
                                  </pre>
                                </div>
                              </details>

                              {/* Action Buttons */}
                              <div className="flex flex-wrap gap-2 justify-between items-center pt-4 border-t">
                                <div className="flex gap-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleViewSource(order);
                                    }}
                                  >
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Source
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEditOrder(order);
                                    }}
                                    disabled={order.published}
                                  >
                                    <Edit3 className="h-4 w-4 mr-2" />
                                    Edit Order
                                  </Button>
                                </div>
                                
                                <div className="flex gap-2">
                                  {order.published ? (
                                    <>
                                      <Button variant="outline" disabled size="sm">
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Published
                                      </Button>
                                      {publishedOrderId === order.id && (
                                        <Button 
                                          onClick={() => navigate('/fulfillment')}
                                          size="sm"
                                        >
                                          Go to Fulfillment List
                                        </Button>
                                      )}
                                    </>
                                  ) : (
                                    <Button 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handlePublishOrder(order.id);
                                      }}
                                      size="sm"
                                    >
                                      Verify & Publish
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </CollapsibleContent>
                      </Collapsible>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Modals */}
          {selectedOrder && (
            <>
              <EmailSourceModal
                isOpen={sourceModalOpen}
                onClose={() => setSourceModalOpen(false)}
                orderData={selectedOrder}
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