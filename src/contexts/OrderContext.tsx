import { createContext, useContext, useState, ReactNode } from 'react';

export interface FulfillmentOrder {
  id: string;
  customerName: string;
  productName: string;
  productCode: string;
  quantity: number;
  price: number;
  publishedDate: string;
  status: 'pending' | 'fulfilled';
  json: any;
}

interface OrderContextType {
  fulfillmentOrders: FulfillmentOrder[];
  addToFulfillment: (order: any) => void;
  markAsFulfilled: (orderId: string) => void;
  markAsUnfulfilled: (orderId: string) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [fulfillmentOrders, setFulfillmentOrders] = useState<FulfillmentOrder[]>([]);

  const addToFulfillment = (order: any) => {
    const fulfillmentOrder: FulfillmentOrder = {
      id: order.id,
      customerName: order.customerName,
      productName: order.productName,
      productCode: order.productCode,
      quantity: order.quantity,
      price: order.price,
      publishedDate: new Date().toISOString(),
      status: 'pending',
      json: order.json
    };

    setFulfillmentOrders(prev => [...prev, fulfillmentOrder]);
  };

  const markAsFulfilled = (orderId: string) => {
    setFulfillmentOrders(prev =>
      prev.map(order =>
        order.id === orderId
          ? { ...order, status: 'fulfilled' as const }
          : order
      )
    );
  };

  const markAsUnfulfilled = (orderId: string) => {
    setFulfillmentOrders(prev =>
      prev.map(order =>
        order.id === orderId
          ? { ...order, status: 'pending' as const }
          : order
      )
    );
  };

  return (
    <OrderContext.Provider value={{
      fulfillmentOrders,
      addToFulfillment,
      markAsFulfilled,
      markAsUnfulfilled
    }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrderContext() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrderContext must be used within an OrderProvider');
  }
  return context;
}