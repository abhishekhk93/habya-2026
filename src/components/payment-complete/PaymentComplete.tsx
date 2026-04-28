import React from 'react';
import Link from 'next/link';
import { paymentCompleteStyles as s } from './PaymentComplete.styles';
import type { PaymentCompleteProps } from './PaymentComplete.types';

export function PaymentComplete(_props: PaymentCompleteProps) {
  return (
    <div className={s.wrapper}>
      <div className={`${s.container} ${s.innerContainer}`}>

        <h1 className={s.pageTitle}>Redirect Complete</h1>

        <div className={`${s.pageSubtitle} ${s.subtitleText}`}>
          You have been redirected to <b>habya.in</b> from Razorpay.
          <br /><br />
          Your transaction is being processed.
          <br />
          Please check <b>"My Orders"</b> page after a few minutes for status updates.
          <br /><br />
          Contact support if needed.
        </div>

        <div className={s.actionContainer}>
          <Link href="/" className={s.backLink} style={{ margin: "0 auto", display: "inline-block" }}>
            ← Back to home
          </Link>
        </div>

      </div>
    </div>
  );
}
