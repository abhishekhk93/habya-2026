"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getCart, saveCart } from "@/lib/atc/storage";
import type { Cart as CartType } from "@/lib/atc/types";
import { cartStyles as s } from "./Cart.styles";
import Button from "../uiComponents/Button";
import { useAppSelector } from "@/store/hooks";
import CartList from "./CartList";
import CartSummary from "./CartSummary";

export default function Cart() {
  const playerId = useAppSelector((state) => state.auth.user?.playerId);
  const [mounted, setMounted] = useState(false);
  const [cart, setCart] = useState<CartType>({ items: [] });
  const [sponsorshipToRemove, setSponsorshipToRemove] = useState<any>(null);

  const handleRemove = (itemToRemove: any) => {
    if (itemToRemove.itemType === "SPONSORSHIP") {
      setSponsorshipToRemove(itemToRemove);
    } else {
      executeRemove(itemToRemove);
    }
  };

  const executeRemove = (itemToRemove: any) => {
    const newItems = cart.items.filter((item) => item !== itemToRemove);
    const newCart = { ...cart, items: newItems };
    setCart(newCart);
    saveCart(newCart, playerId);
    window.dispatchEvent(new Event("cart-updated"));
  };

  useEffect(() => {
    setCart(getCart(playerId));
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Avoid hydration mismatch on initial render
  }

  const registrations = cart.items.filter((item) => item.itemType === "REGISTRATION");
  const shirts = cart.items.filter((item) => item.itemType === "TSHIRT");
  const sponsorships = cart.items.filter((item) => item.itemType === "SPONSORSHIP");

  const registrationIcon = (
    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
    </svg>
  );
  const shirtIcon = (
    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
  );
  const sponsorshipIcon = (
    <span className="h-5 w-5 rounded-full bg-gray-200 flex items-center justify-center text-xs">★</span>
  );

  const isEmpty = cart.items.length === 0;

  return (
    <div
      className={`${s.wrapper} ${isEmpty ? s.wrapperEmpty : ""}`}
      style={{ justifyContent: isEmpty ? "center" : "justify-start" }}
    >
      <div className={`${s.card} ${isEmpty ? s.cardEmpty : ""}`}>
        {isEmpty ? (
          <div className={s.emptyState}>
            <div className={s.emptyStateIcon}>
              <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </div>
            <h2 className={s.emptyStateTitle}>Your cart is empty</h2>
            <p className={s.emptyStateText}>You haven't added any items to your cart yet.</p>
            <Link href="/" className={s.emptyStateLink}>
              Home
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col">
              <h1 className={s.pageTitle}>Your Cart</h1>
              <div className={s.pageSubtitle}>All your picks, ready when you are.</div>
              {registrations.length > 0 && <CartList items={registrations} onRemove={handleRemove} title="Event Registrations" icon={registrationIcon} />}
              {shirts.length > 0 && <CartList items={shirts} onRemove={handleRemove} title="Shirts" icon={shirtIcon} />}
              {sponsorships.length > 0 && <CartList items={sponsorships} onRemove={handleRemove} title="Sponsorships" icon={sponsorshipIcon} />}
            </div>
            {
              !isEmpty && (
                <div className={s.checkoutBox}>
                  <CartSummary items={cart.items} />
                  <div className={s.checkoutButtonWrap}>
                    <Button
                      btnType="small"
                      style={{ marginTop: "0px", width: "auto", whiteSpace: "nowrap" }}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </div>
              )
            }
          </>
        )}

      </div>

      {sponsorshipToRemove && (
        <div className={s.modalOverlay}>
          <div className={s.modalContent}>
            <h3 className={s.modalTitle}>Hold up, MVP! 🏆</h3>
            <p className={s.modalText}>
              Are you sure you want to remove your sponsorship?
            </p>
            <p className={s.modalText}>
              Your support is a game-changer and helps us keep the event running!
            </p>
            <div className={s.modalButtonGroup}>
              <button
                type="button"
                onClick={() => setSponsorshipToRemove(null)}
                className={s.modalKeepButton}
              >
                Keep my support in the game! 😇
              </button>
              <button
                type="button"
                onClick={() => { executeRemove(sponsorshipToRemove); setSponsorshipToRemove(null); }}
                className={s.modalRemoveButton}
              >
                Remove 🙁
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
