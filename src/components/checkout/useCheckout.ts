import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCart, clearCart } from "@/lib/atc/storage";
import { fetchApi } from "@/lib/fetchApi";
import type { CheckoutResponse } from "@/app/_disabled_api/checkout/types";
import type { Step } from "./Checkout.types";
import { useAppSelector } from "@/store/hooks";

export function useCheckout() {
  const playerId = useAppSelector((state) => state.auth.user?.playerId);
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [error, setError] = useState<string | null>(null);
  const isInitiatingRef = useRef(false);

  const startCheckoutFlow = async () => {
    if (isInitiatingRef.current) return;
    isInitiatingRef.current = true;
    setError(null);
    setCurrentStep(1);

    try {
      const cart = getCart(playerId);
      if (cart.items.length === 0) {
        router.replace("/cart");
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 600));

      //Create Order
      setCurrentStep(2);
      const payload = { items: cart.items };

      const response = await fetchApi<CheckoutResponse>("/api/checkout", {
        method: "POST",
        body: payload,
      });

      // Clear cart locally before payment
      clearCart(playerId);
      window.dispatchEvent(new Event("cart-updated"));

      //Initiate Payment
      setCurrentStep(3);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        order_id: response.razorpayOrderId,
        name: "Habya 2026",
        description: "Event Registration & Orders",
        handler: function () {
          router.push("/payment-complete");
        },
        modal: {
          ondismiss: function () {
            setError("Payment was cancelled. You can try again.");
            isInitiatingRef.current = false;
          }
        }
      };

      // Ensure Razorpay script is loaded
      if (typeof window !== 'undefined' && (window as any).Razorpay) {
        const rzp = new (window as any).Razorpay(options);
        rzp.on('payment.failed', function (err: any) {
          console.error("Payment failed:", err);
          setError("Payment failed. Please try again.");
          isInitiatingRef.current = false;
        });
        rzp.open();
      } else {
        throw new Error("Payment gateway not loaded");
      }

    } catch (err: any) {
      console.error("Checkout failed:", err);
      setError(err.message || "Something went wrong while initiating checkout. Please try again.");
      isInitiatingRef.current = false;
    }
  };

  useEffect(() => {
    if (playerId) {
      startCheckoutFlow();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerId]);

  return {
    currentStep,
    error
  };
}
