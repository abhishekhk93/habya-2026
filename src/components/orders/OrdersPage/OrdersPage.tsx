"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ordersStyles as s } from './Orders.styles';
import OrderDetailsCard from '../OrderDetailsCard/OrderDetailsCard';
import SponsorshipItem from '../OrderDetailsCard/SponsorshipItem';
import Button from '../../uiComponents/Button';
import * as CONSTANTS from '@/components/constants';
import { useOrderData } from './useOrderData';
import { Loader } from '../../common/Loader';


export default function MyOrders() {
  const { orders, loading, error } = useOrderData();
  const [filter, setFilter] = useState<string>('ALL');
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();

  const handleGoHome = () => {
    setIsNavigating(true);
    router.push('/');
  };

  if (loading) {
    return (
      <div className={s.wrapper}>
        <div className={s.container}>
          <Loader message="Gathering your orders..." />
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className={s.wrapper}>
        <div className={s.container}>
          <p className={s.errorState}>{error}</p>
          <Button 
            style={{ marginTop: "10px", width: "fit-content", alignSelf: "center" }} 
            btnType='small'
            onClick={handleGoHome}
            isLoading={isNavigating}
          >
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const isEmpty = orders.length === 0;

  if (isEmpty) {
    return (
      <div className={s.wrapper} style={{ justifyContent: "center", minHeight: "calc(100svh - 180px)" }}>
        <div className={s.emptyState}>
          <div className={s.emptyStateIcon}>
            <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
          <h2 className={s.emptyStateTitle}>You have no orders yet</h2>
          <p className={s.emptyStateText}>Looks like you haven't made any purchases for the event.</p>
          <Button 
            onClick={handleGoHome} 
            isLoading={isNavigating} 
            className={s.emptyStateLink}
          >
            Go to Home
          </Button>
        </div>
      </div>
    );
  }

  const successfulOrders = orders.filter(or => or.orderStatus === CONSTANTS.success);
  const pendingOrders = orders.filter(or => or.orderStatus === CONSTANTS.pending);
  const combinedSponsorships = successfulOrders.flatMap(o => o.sponsorships || (o as any).sponshorships || []);

  const filteredOrders = (() => {
    switch (filter) {
      case CONSTANTS.success:
        return orders.filter(o => o.orderStatus === CONSTANTS.success);

      case CONSTANTS.pending:
        return orders.filter(o => o.orderStatus === CONSTANTS.pending);

      default:
        return orders;
    }
  })();

  const filterOptions = ['ALL', CONSTANTS.success, CONSTANTS.pending];

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <h1 className={s.pageTitle}>Orders</h1>

        {combinedSponsorships.length > 0 && <SponsorshipItem />}

        <div className={s.pageSubtitle}>Here's a snapshot of your bookings.</div>

        {(pendingOrders?.length > 0) && (
          <div className={s.filterContainer}>
            {filterOptions.map(option => (
              <button
                key={option}
                onClick={() => setFilter(option)}
                className={`${s.filterButtonBase} ${filter === option ? s.filterButtonActive : s.filterButtonInactive}`}
              >
                {option === CONSTANTS.success ? 'SUCCESSFUL' : option}
              </button>
            ))}
          </div>
        )}

        {filteredOrders.length > 0 ? (
          filteredOrders.map(order => (
            <OrderDetailsCard key={order.orderId} order={order} />
          ))
        ) : (
          <div className="py-12 text-center bg-gray-50/50 rounded-xl border border-dashed border-gray-200 mb-6">
            <p className="text-gray-400 italic text-sm">
              You do not have any orders with status '{filter === 'ALL' ? '' : filter.toLowerCase()}' yet.
            </p>
          </div>
        )}

        <Button 
          style={{ marginTop: "5px" }} 
          btnType='small'
          onClick={handleGoHome}
          isLoading={isNavigating}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}
