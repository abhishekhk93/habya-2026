import { useState, useEffect } from "react";
import { fetchApi } from "@/lib/fetchApi";
import type { Order } from "@/app/_disabled_api/orders/types";

export interface OrderDataHookResult {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

export function useOrderData(): OrderDataHookResult {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await fetchApi<Order[]>("/api/orders");
        setOrders(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Network error");
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  return { orders, loading, error };
}
