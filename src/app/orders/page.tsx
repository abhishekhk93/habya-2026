"use client";
import React, { useEffect, useState } from 'react';
import MyOrders from '@/components/orders/MyOrders';
import { mockOrdersDb } from '@/app/api/orders/mockData';
import { useAppSelector } from '@/store/hooks';
import type { Order } from '@/app/api/orders/types';

export default function OrdersPage() {
  const playerId = useAppSelector((state) => state.auth.user?.playerId);
  const [mounted, setMounted] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setMounted(true);
    // In a real scenario, we'll fetch from API. We will just use the mock data for now.
    // Assuming user's playerId might match one of the keys in mockOrdersDb, e.g. "3434", otherwise fallback to an empty array.
    if (playerId && mockOrdersDb[playerId]) {
      setOrders(mockOrdersDb[playerId]);
    } else {
      // Just to test and show the UI, we could fallback to the mock data for "3434" if not authenticated under that user 
      // or simply leave it empty. Let's fallback to "3434" mock data for visualization if nothing else maps.
      setOrders(mockOrdersDb["3434"] || []);
    }
  }, [playerId]);

  if (!mounted) return null;

  return <MyOrders orders={orders} />;
}
