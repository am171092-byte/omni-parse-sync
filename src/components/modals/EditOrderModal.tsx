import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Edit3, Save, RotateCcw } from "lucide-react";

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

interface EditOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: ParsedOrder;
  onSave: (updatedOrder: ParsedOrder) => void;
}

export function EditOrderModal({ isOpen, onClose, order, onSave }: EditOrderModalProps) {
  const [editedOrder, setEditedOrder] = useState<ParsedOrder>(order);
  const [hasChanges, setHasChanges] = useState(false);

  const handleInputChange = (field: keyof ParsedOrder, value: any) => {
    setEditedOrder(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // Update the JSON object to match the edited fields
    const updatedJson = {
      ...editedOrder.json,
      customer: {
        ...editedOrder.json.customer,
        name: editedOrder.customerName
      },
      items: [{
        ...editedOrder.json.items[0],
        productCode: editedOrder.productCode,
        productName: editedOrder.productName,
        quantity: editedOrder.quantity,
        unitPrice: editedOrder.price,
        totalPrice: editedOrder.quantity * editedOrder.price
      }],
      delivery: {
        ...editedOrder.json.delivery,
        address: editedOrder.deliveryAddress
      }
    };

    const finalOrder = {
      ...editedOrder,
      json: updatedJson
    };

    onSave(finalOrder);
    setHasChanges(false);
    onClose();
  };

  const handleReset = () => {
    setEditedOrder(order);
    setHasChanges(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Edit3 className="h-5 w-5" />
            <span>Edit Order - {order.id}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                value={editedOrder.customerName}
                onChange={(e) => handleInputChange('customerName', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="productCode">Product Code</Label>
              <Input
                id="productCode"
                value={editedOrder.productCode}
                onChange={(e) => handleInputChange('productCode', e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="productName">Product Name</Label>
            <Input
              id="productName"
              value={editedOrder.productName}
              onChange={(e) => handleInputChange('productName', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                value={editedOrder.quantity}
                onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 0)}
              />
            </div>
            <div>
              <Label htmlFor="price">Unit Price ($)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={editedOrder.price}
                onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="deliveryAddress">Delivery Address</Label>
            <Textarea
              id="deliveryAddress"
              value={editedOrder.deliveryAddress}
              onChange={(e) => handleInputChange('deliveryAddress', e.target.value)}
              rows={3}
            />
          </div>

          <div className="bg-muted p-3 rounded-md">
            <Label className="text-sm font-medium">Total Value: ${(editedOrder.quantity * editedOrder.price).toFixed(2)}</Label>
          </div>
        </div>
        
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={handleReset} disabled={!hasChanges}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <div className="space-x-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave} disabled={!hasChanges}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}