"use client";

import Link from "next/link";
import Script from "next/script";
import { useCheckout } from "./useCheckout";
import { StepItem } from "./StepItem";
import { checkoutStyles as s } from "./Checkout.styles";
import { signInFormStyles as authStyles } from "@/components/auth/Auth/AuthForm.styles";

export default function Checkout() {
  const { currentStep, error } = useCheckout();

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <div className={s.wrapper}>
        <div className={`${s.container} ${s.innerContainer}`}>
          
          <h1 className={s.pageTitle}>Secure Checkout</h1>
          <div className={s.pageSubtitle}>
            Please wait while we process your request.
          </div>

          <div className={s.stepContainer}>
            <StepItem stepNumber={1} currentStep={currentStep} hasError={!!error} title="Reading cart contents..." />
            <StepItem stepNumber={2} currentStep={currentStep} hasError={!!error} title="Creating your order..." />
            <StepItem stepNumber={3} currentStep={currentStep} hasError={!!error} title="Initiating secure payment..." />
          </div>

          {error && (
            <div className={s.errorText}>
              {error}
            </div>
          )}

          {error && (
            <div className={s.actionContainer}>
              <Link href="/" className={authStyles.backLink} style={{ margin: "0 auto", display: "inline-block" }}>
                ← Back to home
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
