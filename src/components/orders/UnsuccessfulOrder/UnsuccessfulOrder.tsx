import React from 'react';
import type { Order } from '@/app/api/orders/types';
import { unsuccessfulOrderStyles as s } from './UnsuccessfulOrder.styles';

interface UnsuccessfulOrderProps {
  order: Order;
}

export default function UnsuccessfulOrder({ order }: UnsuccessfulOrderProps) {
  // Combine all items to render a unified list
  const items: { id: string; title: string; price: number }[] = [];

  if (order.registrations) {
    order.registrations.forEach(reg => {
      items.push({ id: reg.id, title: reg.additionalAttributes.categoryName, price: reg.amount });
    });
  }

  if (order.shirts) {
    order.shirts.forEach(shirt => {
      items.push({ id: shirt.id, title: `Shirt - ${shirt.additionalAttributes.type}`, price: shirt.amount });
    });
  }

  if (order.sponsorships) {
    order.sponsorships.forEach(spon => {
      items.push({ id: spon.id, title: 'Sponsorship', price: spon.amount });
    });
  }

  const totalCart = order.totalOrderAmount?.orderAmount || items.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className={s.container}>
      {/* Left Top Side: Status */}
      <div className={s.leftColumn}>
        {/* <span className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">Status</span> */}
        <div>
          {/* <span className={s.orderIdLabel}>Order ID</span> */}
          <span className={s.orderIdValue}>#{order.orderId.substring(0, 8).toUpperCase()}</span>
        </div>
        
        <div>
          {/* <span className={s.statusLabel}>Status</span> */}
          <span className={`${s.statusBadge} ${
            order.paymentStatus === 'PENDING' ? s.statusPending :
            order.paymentStatus === 'CANCELLED' ? s.statusCancelled :
            order.paymentStatus === 'FAILED' ? s.statusFailed :
            s.statusDefault
          }`}>
            {order.paymentStatus}
          </span>
        </div>
      </div>

      {/* Right Side: Order ID, Items, Total */}
      <div className={s.rightColumn}>
        <div className={s.itemsSection}>
          {/* <span className={s.itemsLabel}>Order Items</span> */}
          <ul className={s.itemsList}>
            {items.map((item, i) => (
              <li key={`${item.id}-${i}`} className={s.itemRow}>
                <span className={s.itemTitle}>{item.title}</span>
                <span className={s.itemPrice}>₹{item.price}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={s.totalSection}>
          <span className={s.totalLabel}>Total</span>
          <span className={s.totalValue}>₹{totalCart}</span>
        </div>
      </div>
    </div>
  );
}
