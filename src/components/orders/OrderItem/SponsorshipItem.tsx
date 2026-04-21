import React from 'react';
import { ordersItemStyles as s } from './OrdersItem.styles';
import type { RegistrationItem as RegistrationItemType } from '@/app/api/orders/types';
import { OrderListProps } from '../OrdersList/OrdersList.types';

export default function SponsorshipItem({ order }: OrderListProps) {
  let price = order.sponsorships?.reduce((acc, item) => acc + item.amount, 0);
  
  return (
    <div className={s.sponserSection}>
        <h4 className={s.sponsorshipTitle}>Thank you!</h4>
        <div className={s.sponsorshipIconWrapper}>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
        </div>
        
        <p className={s.sponsorshipText}>
            We deeply appreciate your generous sponsorship of <span className={s.sponsorshipAmount}>₹{price}</span>. Your support makes a huge difference!
        </p>
    </div>
  );
}
