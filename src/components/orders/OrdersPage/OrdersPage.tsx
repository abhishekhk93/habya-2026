"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ordersStyles as s } from './Orders.styles';
import OrderList from '../OrdersList/OrdersList';
import Button from '../../uiComponents/Button';
import type { ordersProps } from './OrdersPage.types';
import UnsuccessfulOrder from '../UnsuccessfulOrder/UnsuccessfulOrder';
import * as CONSTANTS from '@/components/constants';
import type { Order } from '@/app/api/orders/types';


export default function MyOrders({ orders }: ordersProps) {
  const [filter, setFilter] = useState<string>('ALL');
  
  const isEmpty = orders.length === 0;

  // const displayOrders = filter === 'ALL' ? orders : orders.filter(or => or.paymentStatus === filter);
  
  const successfulOrders = orders.filter(or => or.paymentStatus === CONSTANTS.success);
  const pendingOrders = orders.filter(or => or.paymentStatus === CONSTANTS.pending);

  const filterOptions = ['ALL', CONSTANTS.success, CONSTANTS.pending];
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <h1 className={s.pageTitle}>My Orders</h1>
        <div className={s.pageSubtitle}>A quick snapshot of everything you’ve booked.</div>
        
        {!isEmpty && ( pendingOrders?.length > 0 ) && (
          <div className={s.filterContainer}>
            {filterOptions.map(option => (
              <button
                key={option}
                onClick={() => setFilter(option)}
                className={`${s.filterButtonBase} ${ filter === option ? s.filterButtonActive : s.filterButtonInactive}`}
              >
                {option === CONSTANTS.success ? 'SUCCESSFUL' : option}
              </button>
            ))}
          </div>
        )}

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
            {filter !== CONSTANTS.success && 
              <>
                {pendingOrders.map(order => <UnsuccessfulOrder key={order.orderId} order={order} />)}
                {pendingOrders.length > 0 && (filter === CONSTANTS.success || filter === 'ALL') && <hr className={s.divider} />}
              </>
            }
            
            {filter !== CONSTANTS.pending && successfulOrders.length > 0 && (
              <OrderList key="combined-orders" order={{
                orderId: 'combined',
                transactionId: '',
                paymentStatus: CONSTANTS.success,
                totalOrderAmount: { orderAmount: 0, platformFee: 0 },
                registrations: successfulOrders.flatMap(o => o.registrations || []),
                shirts: successfulOrders.flatMap(o => o.shirts || []),
                sponsorships: successfulOrders.flatMap(o => o.sponsorships || []),
              }} />
            )}
          </>
        )}
        <Button style={{marginTop: "5px"}} btnType='small'>
          <Link href="/">
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
