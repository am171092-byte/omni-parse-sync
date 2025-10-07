import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ParsedOrder } from "@/data/mockOrders";

interface ViewJSONModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: ParsedOrder;
}

export function ViewJSONModal({ isOpen, onClose, order }: ViewJSONModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Order JSON - {order.id}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
          <pre className="bg-muted p-4 rounded-md text-xs overflow-x-auto">
            {JSON.stringify(order.json, null, 2)}
          </pre>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
