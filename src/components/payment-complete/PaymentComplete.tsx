import React from 'react';
import Link from 'next/link';
import { paymentCompleteStyles as s } from './PaymentComplete.styles';
import type { PaymentCompleteProps } from './PaymentComplete.types';

export function PaymentComplete(_props: PaymentCompleteProps) {
  return (
    <div className={s.wrapper}>
      <div className={`${s.container} ${s.innerContainer}`}>
        
        {/* Success / Redirect Icon */}
        <div className={s.iconContainer}>
          <svg className={s.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h1 className={s.pageTitle}>Redirect Complete</h1>
        <p className={s.subtitleText}>Your secure payment flow has finished.</p>

        {/* Info Checklist */}
        <div className={s.listContainer}>
          <div className={s.listItem}>
            <div className={s.listIconWrapper}>
              <svg className={s.listIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <p className={s.listText}>You have been redirected back to <b>habya.in</b> from Razorpay.</p>
          </div>

          <div className={s.listItem}>
            <div className={s.listIconWrapper}>
              <svg className={s.listIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className={s.listText}>Your transaction is currently being processed by our systems.</p>
          </div>

          <div className={s.listItem}>
            <div className={s.listIconWrapper}>
              <svg className={s.listIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <p className={s.listText}>Check the <b>"Orders"</b> page in a few minutes for status updates.</p>
          </div>

          <div className={s.listItem}>
            <div className={s.listIconWrapper}>
              <svg className={s.listIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <p className={s.listText}>Need help? Our support team is available if you have any questions.</p>
          </div>
        </div>

        <div className={s.actionContainer}>
          <Link href="/" className={s.backLink}>
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
