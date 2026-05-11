"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { paymentCompleteStyles as s } from './PaymentComplete.styles';
import type { PaymentCompleteProps } from './PaymentComplete.types';
import Button from '../uiComponents/Button';

export function PaymentComplete(_props: PaymentCompleteProps) {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleOrdersClick = () => {
    setIsNavigating(true);
    router.push("/orders");
  };

  return (
    <div className={s.wrapper}>
      <div className={`${s.container} ${s.innerContainer}`}>
        
        {/* Payment/Order Icon */}
        <div className={s.iconContainer}>
          <svg className={s.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
          </svg>
        </div>

        <h1 className={s.pageTitle}>Welcome back</h1>
        <p className={s.subtitleText}>You are now in <b>habya.in</b>.</p>
        
        {/* Info Checklist */}
        <div className={s.listContainer}>
          <div className={s.listItem}>
            <div className={s.listIconWrapper}>
              <svg className={s.listIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <p className={s.listText}>If you have recently completed a payment, visit <b>"My Orders"</b> to view your status.</p>
          </div>

          <div className={s.listItem}>
            <div className={s.listIconWrapper}>
              <svg className={s.listIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <p className={s.listText}>Need help? Our support team is here to assist you with any questions.</p>
          </div>
        </div>

        <div className={s.actionContainer}>
          <Button 
            onClick={handleOrdersClick} 
            btnType="small"
            style={{ width: '100%', maxWidth: '240px' }}
            isLoading={isNavigating}
          >
            View My Orders
          </Button>
        </div>
      </div>
    </div>
  );
}
