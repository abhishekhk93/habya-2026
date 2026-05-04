"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { bagStyles as s } from "./Bags.styles";
import type { Bag } from "./Bags.types";
import { BAGS_DATA } from "./Bags.data";
import { useAppSelector } from "@/store/hooks";
import { getCart } from "@/lib/atc/storage";
import { addBagToCart } from "@/lib/atc/addBagToCart";
import { Loader } from "../common/Loader";
import { ClosedState } from "../common/ClosedState";
import Button from "../uiComponents/Button";

export default function Bags() {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [carouselIndex, setCarouselIndex] = useState<Record<string, number>>({});
  const [cartCounts, setCartCounts] = useState<Record<string, number>>({});

  const playerId = useAppSelector((state) => state.auth.user?.playerId);
  const configData = useAppSelector((state) => state.config.data);
  const isBagOrdersOpen = configData?.is_shirt_orders_open;
  const bagPrice = configData?.price_bag ? Number(configData.price_bag) : 500;

  useEffect(() => {
    const updateCartCounts = () => {
      if (!playerId) {
        setCartCounts({});
        return;
      }
      const cart = getCart(playerId);
      const counts: Record<string, number> = {};
      for (const item of cart.items) {
        if (item.itemType === "BAG") {
          counts["BAG"] = (counts["BAG"] || 0) + item.itemQuantity;
        }
      }
      setCartCounts(counts);
    };

    updateCartCounts();
    window.addEventListener("cart-updated", updateCartCounts);
    return () => window.removeEventListener("cart-updated", updateCartCounts);
  }, [playerId]);

  const handleIncrement = (id: string) => {
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
  };

  const handleDecrement = (id: string) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max((prev[id] || 1) - 1, 1) }));
  };

  const handleAddToCart = (id: string) => {
    const qty = quantities[id] || 1;
    addBagToCart(qty, playerId);
    setQuantities((prev) => ({ ...prev, [id]: 1 }));
    window.dispatchEvent(new Event("cart-updated"));
  };

  const getIndex = (id: string) => carouselIndex[id] ?? 0;
  const setIndex = (id: string, idx: number) =>
    setCarouselIndex(prev => ({ ...prev, [id]: idx }));

  const handleTouchStart = (e: React.TouchList) => {
    // Simplified for this version
  };

  if (isBagOrdersOpen === undefined) {
    return (
      <div className={s.wrapper} style={{ justifyContent: "center" }}>
        <div className={s.card} style={{ maxWidth: "500px" }}>
          <Loader message="Loading our premium bags..." />
        </div>
      </div>
    );
  }

  if (isBagOrdersOpen === false) {
    return (
      <div className={s.wrapper}>
        <ClosedState
          title="Bag Orders are Closed"
          description="We are not currently taking new bag orders for Habya 2026."
          theme="brown"
        />
      </div>
    );
  }

  return (
    <div className={s.wrapper}>
      <div className={s.card}>
        <h1 className={s.header}>Shop Bags</h1>
        <p className={s.subtitle}>
          Habya 2026 edition Bag.
        </p>

        <div className={s.gridContainer}>
          {BAGS_DATA.map(bag => (
            <div key={bag.id} className={s.shirtCard}>
              {/* Carousel image track */}
              <div className={s.imageFlipper} style={{ overflow: "hidden", backgroundColor: "white" }}>
                <div style={{
                  display: "flex",
                  width: "200%",
                  height: "100%",
                  transform: `translateX(-${getIndex(bag.id) * 50}%)`,
                  transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)",
                }}>
                  {bag.images.map((src, i) => (
                    <div key={i} style={{ position: "relative", width: "50%", flexShrink: 0, height: "100%" }}>
                      <Image
                        src={src}
                        alt={i === 0 ? `${bag.name} Front` : `${bag.name} Back`}
                        fill
                        unoptimized
                        className={s.shirtImage}
                      />
                    </div>
                  ))}
                </div>

                {/* Arrows */}
                {getIndex(bag.id) > 0 && (
                  <button
                    type="button"
                    onClick={() => setIndex(bag.id, getIndex(bag.id) - 1)}
                    className={`${s.arrowButton} left-2`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                )}
                {getIndex(bag.id) < 1 && (
                  <button
                    type="button"
                    onClick={() => setIndex(bag.id, getIndex(bag.id) + 1)}
                    className={`${s.arrowButton} right-2`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Dot indicators */}
              <div className="flex justify-center gap-1.5 mt-3 -mb-1 z-10 w-full">
                {[0, 1].map(i => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIndex(bag.id, i)}
                    className="transition-all duration-300"
                    style={{
                      width: getIndex(bag.id) === i ? "16px" : "6px",
                      height: "6px",
                      borderRadius: "9999px",
                      background: getIndex(bag.id) === i ? "#000" : "rgba(0,0,0,0.3)",
                    }}
                  />
                ))}
              </div>

              <div className={s.cardContent}>
                <h3 className={s.shirtName}>
                  {bag.name}
                  <span className={s.shirtPrice}>&nbsp;&nbsp;-&nbsp;&nbsp;₹{bagPrice}</span>
                </h3>

                {cartCounts["BAG"] ? (
                  <p className="text-[13px] text-center text-green-600 my-1.5 font-medium tracking-tight flex items-center justify-center">
                    You added {cartCounts["BAG"]} item{cartCounts["BAG"] > 1 ? 's' : ''} to the cart
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] ml-1">
                      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </p>
                ) : (
                  <p className="text-[13px] text-center text-black/40 my-1.5 font-light tracking-tight">
                    Durable and stylish sports bag!
                  </p>
                )}

                {/* Interactive section with light brown background */}
                <div style={{ backgroundColor: 'rgba(255, 212, 179, 0.2)', borderRadius: '16px', padding: '16px', marginTop: '8px' }}>
                  <div className={s.controlsContainer}>
                    <button
                      onClick={() => handleDecrement(bag.id)}
                      className={s.counterButton}
                      disabled={(quantities[bag.id] || 1) <= 1}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /></svg>
                    </button>
                    <span className={s.countDisplay}>{quantities[bag.id] || 1}</span>
                    <button
                      onClick={() => handleIncrement(bag.id)}
                      className={s.counterButton}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
                    </button>
                  </div>

                  <button
                    type="button"
                    className="w-full py-2.5 mt-4 bg-white border border-[#B45309] text-[#B45309] font-bold text-xs sm:text-sm rounded-xl hover:bg-[#ffd4b3] active:bg-[#ffd4b3] transition-colors"
                    onClick={() => handleAddToCart(bag.id)}
                  >
                    Add to Cart — ₹{bagPrice * (quantities[bag.id] || 1)}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '32px', width: '100%', alignItems: 'center' }}>
          <Button style={{ width: '100%', maxWidth: '240px' }} btnType='small'>
            <Link href="/cart">Go to Cart</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
