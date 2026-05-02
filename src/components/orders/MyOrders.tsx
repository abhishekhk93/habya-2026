import React from 'react';
import Link from 'next/link';
import { ordersStyles as s } from './Orders.styles';
import OrderCard from './OrderCard';
import type { Order } from '@/app/_disabled_api/orders/types';
import Button from '../uiComponents/Button';

interface MyOrdersProps {
  orders: Order[];
}

export default function MyOrders({ orders }: MyOrdersProps) {
  const isEmpty = orders.length === 0;

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <h1 className={s.pageTitle}>My Orders</h1>
        <div className={s.pageSubtitle}>A quick snapshot of everything you’ve booked.</div>
        {isEmpty ? (
          <div className={s.emptyState}>
            <div className={s.emptyStateIcon}>
              <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
            <h2 className={s.emptyStateTitle}>You have no orders yet</h2>
            <p className={s.emptyStateText}>Looks like you haven't made any purchases for the event.</p>
            <Link href="/" className={s.emptyStateLink}>
              Go to Home
            </Link>
          </div>
        ) : (
          <>
            <OrderCard key="combined-orders" order={{
              orderId: 'combined',
              transactionId: '',
              orderStatus: '',
              totalOrderAmount: { orderAmount: 0, platformFee: 0 },
              registrations: orders.flatMap(o => o.registrations || []),
              shirts: orders.flatMap(o => o.shirts || []),
              sponsorships: orders.flatMap(o => o.sponsorships || []),
            }} />
          </>
        )}
        <Button style={{ marginTop: "5px" }} btnType='small'>
          <Link href="/">
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
