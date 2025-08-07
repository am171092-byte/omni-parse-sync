import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
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
  Phone
} from "lucide-react";

interface ParsedOrder {
  id: string;
  customerName: string;
  productName: string;
  productCode: string;
  quantity: number;
  price: number;
  deliveryAddress: string;
  source: string;
  confidence: number;
  json: any;
  published: boolean;
}

export default function TriggerAgent() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);
  const [parsedOrders, setParsedOrders] = useState<ParsedOrder[]>([]);
  const [openOrders, setOpenOrders] = useState<{ [key: string]: boolean }>({});

  const mockOrders: ParsedOrder[] = [
    {
      id: "ORD-001",
      customerName: "Acme Corp",
      productName: "Industrial Widgets",
      productCode: "IW-2024",
      quantity: 150,
      price: 29.99,
      deliveryAddress: "123 Business St, Commerce City, CA 90210",
      source: "Email",
      confidence: 0.96,
      published: false,
      json: {
        orderId: "ORD-001",
        customer: {
          name: "Acme Corp",
          contact: "john.doe@acmecorp.com"
        },
        items: [{
          productCode: "IW-2024",
          productName: "Industrial Widgets",
          quantity: 150,
          unitPrice: 29.99,
          totalPrice: 4498.50
        }],
        delivery: {
          address: "123 Business St, Commerce City, CA 90210",
          requestedDate: "2024-01-15"
        },
        metadata: {
          source: "email",
          confidence: 0.96,
          extractedAt: "2024-01-10T10:30:00Z"
        }
      }
    },
    {
      id: "ORD-002",
      customerName: "TechFlow Solutions",
      productName: "Premium Connectors",
      productCode: "PC-5500",
      quantity: 75,
      price: 45.00,
      deliveryAddress: "456 Innovation Blvd, Tech Valley, NY 12180",
      source: "WhatsApp",
      confidence: 0.89,
      published: false,
      json: {
        orderId: "ORD-002",
        customer: {
          name: "TechFlow Solutions",
          contact: "+1-555-0123"
        },
        items: [{
          productCode: "PC-5500",
          productName: "Premium Connectors",
          quantity: 75,
          unitPrice: 45.00,
          totalPrice: 3375.00
        }],
        delivery: {
          address: "456 Innovation Blvd, Tech Valley, NY 12180",
          requestedDate: "2024-01-20"
        },
        metadata: {
          source: "whatsapp",
          confidence: 0.89,
          extractedAt: "2024-01-10T11:15:00Z"
        }
      }
    },
    {
      id: "ORD-003",
      customerName: "Global Manufacturing Inc",
      productName: "Steel Components",
      productCode: "SC-8800",
      quantity: 200,
      price: 125.50,
      deliveryAddress: "789 Industrial Park, Manufacturing City, TX 77001",
      source: "Phone Call",
      confidence: 0.92,
      published: false,
      json: {
        orderId: "ORD-003",
        customer: {
          name: "Global Manufacturing Inc",
          contact: "procurement@globalmanuf.com"
        },
        items: [{
          productCode: "SC-8800",
          productName: "Steel Components",
          quantity: 200,
          unitPrice: 125.50,
          totalPrice: 25100.00
        }],
        delivery: {
          address: "789 Industrial Park, Manufacturing City, TX 77001",
          requestedDate: "2024-01-25"
        },
        metadata: {
          source: "phone_transcript",
          confidence: 0.92,
          extractedAt: "2024-01-10T14:45:00Z"
        }
      }
    }
  ];

  const handleScanInbox = async () => {
    setIsScanning(true);
    
    // Simulate scanning process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setParsedOrders(mockOrders);
    setIsScanning(false);
    
    toast({
      title: "Inbox Scan Complete",
      description: `Found ${mockOrders.length} orders to process`,
    });
  };

  const handlePublishOrder = async (orderId: string) => {
    // Simulate publishing to ERP
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setParsedOrders(prev => 
      prev.map(order => 
        order.id === orderId 
          ? { ...order, published: true }
          : order
      )
    );

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
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Scan Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Inbox className="h-5 w-5" />
                <span>Email Inbox Scanner</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Scan your connected email inbox for new orders. The AI will parse email bodies and attachments to extract structured order data.
              </p>
              <Button 
                onClick={handleScanInbox}
                disabled={isScanning}
                size="lg"
              >
                {isScanning ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Scanning Inbox...
                  </>
                ) : (
                  <>
                    <Inbox className="h-4 w-4 mr-2" />
                    Scan Inbox
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Parsed Orders */}
          {parsedOrders.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">
                Parsed Orders ({parsedOrders.length})
              </h2>
              
              {parsedOrders.map((order) => {
                const SourceIcon = getSourceIcon(order.source);
                return (
                  <Card key={order.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <SourceIcon className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{order.customerName}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                              {order.productName} (Code: {order.productCode})
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
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Quantity</p>
                          <p className="font-medium">{order.quantity}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Unit Price</p>
                          <p className="font-medium">${order.price}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Total</p>
                          <p className="font-medium">${(order.quantity * order.price).toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Status</p>
                          {order.published ? (
                            <Badge variant="success">Published</Badge>
                          ) : (
                            <Badge variant="warning">Pending</Badge>
                          )}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Delivery Address</p>
                          <p className="text-sm">{order.deliveryAddress}</p>
                        </div>

                        {/* JSON Collapsible */}
                        <Collapsible 
                          open={openOrders[order.id]} 
                          onOpenChange={() => toggleOrderDetails(order.id)}
                        >
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm" className="p-0 h-auto">
                              {openOrders[order.id] ? (
                                <ChevronDown className="h-4 w-4 mr-1" />
                              ) : (
                                <ChevronRight className="h-4 w-4 mr-1" />
                              )}
                              View JSON
                            </Button>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="mt-2">
                            <pre className="bg-muted p-3 rounded-md text-xs overflow-x-auto">
                              {JSON.stringify(order.json, null, 2)}
                            </pre>
                          </CollapsibleContent>
                        </Collapsible>

                        {/* Publish Button */}
                        <div className="flex justify-end">
                          {order.published ? (
                            <Button variant="outline" disabled>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Published
                            </Button>
                          ) : (
                            <Button 
                              onClick={() => handlePublishOrder(order.id)}
                              variant="default"
                            >
                              Verify & Publish
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}