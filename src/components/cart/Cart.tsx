"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getCart, saveCart } from "@/lib/atc/storage";
import type { Cart as CartType } from "@/lib/atc/types";
import { cartStyles as s } from "./Cart.styles";
import Button from "../uiComponents/Button";
import { useAppSelector } from "@/store/hooks";

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
  const isEmpty = cart.items.length === 0;

  return (
    <div className={s.wrapper}>
      <div className={s.card}>
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
              Go Home!
            </Link>
          </div>
        ) : (
          <>
          <div className="flex flex-col">
           <h1 className={s.pageTitle}>Your Cart</h1>
            {registrations.length > 0 && (
              <div className={s.section}>
                <div className={s.sectionHeader}>
                  <h2 className={s.sectionTitle}>Event Registrations ({registrations.length})</h2>
                </div>
                <ul className={s.listContainer}>
                  {registrations.map((item, index) => {
                    const attrs = item.itemAttributes as any; // Cast considering type differences
                    return (
                      <li key={`reg-${index}`} className={`${s.itemBox} flex justify-between items-center`}>
                        <div className={s.itemContent}>
                          <div className={s.iconWrapper}>
                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
                            </svg>
                          </div>
                          <div className={s.itemTitleContainer}>
                            <p className={s.itemTitle}>{attrs.categoryName}</p>
                            <div className={s.itemDetailsList}>
                              {/* <p>Category: <strong>{attrs.categoryCode || "Unknown"}</strong></p> */}
                              {attrs.partnerPlayerId && (
                                <p>Partner ID: <strong>{attrs.partnerPlayerId}</strong></p>
                              )}
                              {attrs.partnerName && (
                                <p>Partner Name: <strong>{attrs.partnerName}</strong></p>
                              )}
                            </div>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleRemove(item)} 
                          className="ml-8 p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
                          aria-label="Remove item"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {shirts.length > 0 && (
              <div className={s.section}>
                <div className={s.sectionHeader}>
                  <h2 className={s.sectionTitle}>T-Shirts ({shirts.length})</h2>
                </div>
                <ul className={s.listContainer}>
                  {shirts.map((item, index) => {
                    const attrs = item.itemAttributes as any;
                    return (
                      <li key={`shirt-${index}`} className={`${s.itemBox} flex justify-between items-center`}>
                        <div className={s.itemContent}>
                          <div className={s.iconWrapper}>
                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                          </div>
                          <div className={s.itemTitleContainer}>
                            <p className={s.itemTitle}>{attrs.type || "Event T-Shirt"}</p>
                            <div className={s.itemDetailsList}>
                              {attrs.size && <p>Size: <strong>{attrs.size}</strong></p>}
                              {attrs.displayName && <p>Name to Print: <strong>{attrs.displayName}</strong></p>}
                            </div>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleRemove(item)} 
                          className="ml-4 p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
                          aria-label="Remove item"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {sponsorships.length > 0 && (
              <div className={s.section}>
                <div className={s.sectionHeader}>
                  <h2 className={s.sectionTitle}>Sponsorships ({sponsorships.length})</h2>
                </div>
                <ul className={s.listContainer}>
                  {sponsorships.map((item, index) => (
                      <li key={`sponsor-${index}`} className={`${s.itemBox} flex justify-between items-center`}>
                        <div className={s.itemContent}>
                          <div className={s.iconWrapper}>
                            <span className="h-5 w-5 rounded-full bg-gray-200 flex items-center justify-center text-xs">★</span>
                          </div>
                          <div className={s.itemTitleContainer}>
                            <p className={s.itemTitle}>Event Sponsorship</p>
                            {item.itemAmount && (
                              <p className={s.itemSubtitle}>Amount: ₹{item.itemAmount}</p>
                            )}
                          </div>
                        </div>
                        <button 
                          onClick={() => handleRemove(item)} 
                          className="ml-4 p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
                          aria-label="Remove item"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </li>
                  ))}
                </ul>
              </div>
            )}

          </div>
          {
            !isEmpty && (
              <div className={s.checkoutBox}>
                <div className={s.checkoutSummary}>
                    <p>Total Items: <strong>{cart.items.length}</strong></p>
                    {/* <p>Cart Total: <strong>₹{cart.items.reduce((acc, item) => acc + item.itemAmount, 0)}</strong></p> */}
                </div>
                <Button style={{marginTop: "0px"}}>
                    Proceed to Checkout
                </Button>
              </div>
            )
          }
          </>
        )}

      </div>
      
      {sponsorshipToRemove && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl space-y-4">
            <h3 className="text-xl font-bold text-slate-900">Hold up, MVP! 🏆</h3>
            <p className="text-slate-600 font-medium">
              Are you sure you want to remove your sponsorship?
            </p>
            <p className="text-slate-600 font-medium">
              Your support is a game-changer and helps us keep the event running!
            </p>
            <div className="flex flex-col space-y-3 mt-6">
              <button 
                type="button" 
                onClick={() => setSponsorshipToRemove(null)} 
                className="w-full px-4 py-3 bg-black text-white rounded-xl font-medium hover:bg-black/80 transition-colors shadow-sm"
              >
                Keep my support in the game! 😇
              </button>
              <button 
                type="button" 
                onClick={() => { executeRemove(sponsorshipToRemove); setSponsorshipToRemove(null); }} 
                className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-red-500 hover:text-white transition-colors"
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
