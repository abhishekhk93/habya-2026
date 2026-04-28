"use client";

import { useState, useEffect } from "react";
import { sponsorshipPageStyles as s } from "./SponsorshipPage.styles";
import { SponsorshipList } from "../SponsorshipList/SponsorshipList";
import type { SponsorshipLevel } from "./SponsorshipPage.types";
import { getCart, saveCart } from "@/lib/atc/storage";
import { addSponsorshipToCart } from "@/lib/atc/addSponsorshipToCart";
import { useAppSelector } from "@/store/hooks";
import { ClosedState } from "../../common/ClosedState";

const SPONSORSHIP_LEVELS: SponsorshipLevel[] = [
  { id: "level-15000", name: "Platinum", amount: 15000 },
  { id: "level-10000", name: "Gold", amount: 10000 },
  { id: "level-7500", name: "Silver", amount: 7500 },
  { id: "level-5000", name: "Bronze", amount: 5000 },
  { id: "level-2500", name: "Associate", amount: 2500 },
  { id: "level-custom", name: "Custom Contribution", amount: "custom" },
];

export default function SponsorshipPage() {
  const userPlayerId = useAppSelector((state) => state.auth.user?.playerId);
  const isSponsorshipsOpen = useAppSelector((state) => state.config.data?.is_sponsorships_open);
  const [selectedLevelId, setSelectedLevelId] = useState<string | null>(null);
  const [customAmount, setCustomAmount] = useState<number>(0);
  const [isInitialized, setIsInitialized] = useState(false);

  // Sync with cart on mount
  useEffect(() => {
    if (!isInitialized && userPlayerId) {
      const cart = getCart(userPlayerId);
      const sponsorshipItem = cart.items.find(item => item.itemType === "SPONSORSHIP");

      if (sponsorshipItem) {
        const amount = sponsorshipItem.itemAmount;
        const level = SPONSORSHIP_LEVELS.find(l => l.amount === amount);

        if (level) {
          setSelectedLevelId(level.id);
        } else {
          setSelectedLevelId("level-custom");
          setCustomAmount(amount);
        }
      }
      setIsInitialized(true);
    }
  }, [userPlayerId, isInitialized]);

  const removeSponsorshipFromCart = () => {
    if (!userPlayerId) return;
    const currentCart = getCart(userPlayerId);
    const updatedCart = {
      ...currentCart,
      items: currentCart.items.filter(item => item.itemType !== "SPONSORSHIP"),
    };
    saveCart(updatedCart, userPlayerId);
    window.dispatchEvent(new Event("cart-updated"));
  };

  const handleToggle = (levelId: string) => {
    if (selectedLevelId === levelId) {
      // Untoggle
      setSelectedLevelId(null);
      removeSponsorshipFromCart();
    } else {
      // Toggle on a new one
      const level = SPONSORSHIP_LEVELS.find(l => l.id === levelId);
      if (!level) return;

      setSelectedLevelId(levelId);

      if (level.amount !== "custom") {
        setCustomAmount(0); // Clear custom amount when fixed level is selected
        addSponsorshipToCart({ amount: level.amount, playerId: userPlayerId });
      } else {
        // For custom, if we already have a valid amount, add it.
        if (customAmount > 0) {
          addSponsorshipToCart({ amount: customAmount, playerId: userPlayerId });
        } else {
          // If custom is selected but amount is invalid yet, remove any existing sponsorship
          removeSponsorshipFromCart();
        }
      }
    }
  };

  const handleCustomAmountChange = (amount: number) => {
    setCustomAmount(amount);
    if (selectedLevelId === "level-custom" && amount > 0) {
      addSponsorshipToCart({ amount: amount, playerId: userPlayerId });
    } else if (selectedLevelId === "level-custom") {
      removeSponsorshipFromCart();
    }
  };

  if (!isSponsorshipsOpen) {
    return (
      <div className={s.wrapper}>
        <ClosedState
          title="Sponsorship is Closed"
          description="We are not currently accepting new sponsorships for Habya 2026. Thank you for your interest!"
          theme="emerald"
        />
      </div>
    );
  }

  return (
    <div className={s.wrapper}>
      <div className={s.card}>
        <h1 className={s.header}>Sponsorship</h1>

        <div className={s.dividerContainer}>
          <div className={s.dividerText}>We’re building Habya 2026. You in?</div>
        </div>

        <div className={s.levelsContainer}>
          <SponsorshipList
            levels={SPONSORSHIP_LEVELS}
            selectedLevelId={selectedLevelId}
            onToggle={handleToggle}
            customAmount={customAmount}
            onCustomAmountChange={handleCustomAmountChange}
          />
        </div>
      </div>
    </div>
  );
}
