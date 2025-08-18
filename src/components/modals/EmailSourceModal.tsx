import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, FileText } from "lucide-react";

interface EmailSourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: {
    id: string;
    customerName: string;
    source: string;
  };
}

export function EmailSourceModal({ isOpen, onClose, orderData }: EmailSourceModalProps) {
  const mockEmailBody = `
From: orders@${orderData.customerName.toLowerCase().replace(/\s+/g, '')}.com
Subject: New Purchase Order - ${orderData.id}
Date: ${new Date().toLocaleDateString()}

Dear Supplier,

We would like to place the following order:

Product: Industrial Widgets
Code: IW-2024
Quantity: 150 units
Unit Price: $29.99

Delivery Address:
123 Business Street
Commerce City, CA 90210

Please confirm receipt and provide delivery timeline.

Best regards,
Procurement Team
${orderData.customerName}
  `;

  const mockPdfContent = `
PURCHASE ORDER DOCUMENT
${orderData.id}

Customer: ${orderData.customerName}
Date: ${new Date().toLocaleDateString()}

LINE ITEMS:
1. Product Code: IW-2024
   Description: Industrial Widgets
   Quantity: 150
   Unit Price: $29.99
   Total: $4,498.50

DELIVERY INFORMATION:
Address: 123 Business Street, Commerce City, CA 90210
Requested Date: Next Business Week

PAYMENT TERMS:
Net 30 Days

Authorized by: John Doe, Procurement Manager
Signature: [Digital Signature]
  `;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>Original Source - {orderData.id}</span>
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="email" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="email" className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>Email Body</span>
            </TabsTrigger>
            <TabsTrigger value="attachment" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>PDF Attachment</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="email" className="mt-4">
            <div className="bg-muted p-4 rounded-md max-h-96 overflow-y-auto">
              <pre className="text-sm whitespace-pre-wrap font-mono">
                {mockEmailBody}
              </pre>
            </div>
          </TabsContent>
          
          <TabsContent value="attachment" className="mt-4">
            <div className="bg-muted p-4 rounded-md max-h-96 overflow-y-auto">
              <pre className="text-sm whitespace-pre-wrap font-mono">
                {mockPdfContent}
              </pre>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end mt-4">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}