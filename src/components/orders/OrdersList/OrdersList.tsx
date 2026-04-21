"use client";
import React from 'react';
import { ordersListStyles as s } from './OrdersList.styles';
import type { Order, RegistrationItem, ShirtItem, SponsorshipItem } from '@/app/api/orders/types';
import { getConfigValue } from '@/lib/getConfigValue';
import { useAppSelector } from '@/store/hooks';
import RegistrationOrderItem from '../OrderItem/RegistrationItem';
import ShirtOrderItem from '../OrderItem/ShirtItem';

interface OrderListProps {
  order: Order;
}

export default function OrderList({ order }: OrderListProps) {

  return (
    <div className={s.orderCard}>
      <div className={s.sectionContainer}>
        {order.sponsorships && order.sponsorships.length > 0 && (
          <div className={s.sponserSection}>
            <h4 className={s.sponsorshipTitle}>Thank you!</h4>
            <div className={s.sponsorshipIconWrapper}>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
            
            <p className={s.sponsorshipText}>
              We deeply appreciate your generous sponsorship of <span className={s.sponsorshipAmount}>₹{order.sponsorships.reduce((acc, item) => acc + item.amount, 0)}</span>. Your support makes a huge difference!
            </p>
          </div>
        )}
      </div>
      <div className={s.sectionContainer}>
        {order.registrations && order.registrations.length > 0 && (
          <div className={s.section}>
            <h4 className={s.sectionTitle}>Event Registrations</h4>
            <ul className={s.itemListReg}>
              {order.registrations.map((item) => (
                <RegistrationOrderItem key={item.id} item={item} />
              ))}
            </ul>
          </div>
        )}

        {order.shirts && order.shirts.length > 0 && (
          <div className={s.section}>
            <h4 className={s.sectionTitle}>Merchandise</h4>
            <ul className={s.itemListShirt}>
              {order.shirts.map((item) => (
                <ShirtOrderItem key={item.id} item={item} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
