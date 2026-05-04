"use client";

import type { CartItem as CartItemType } from "@/lib/atc/types";
import { useAppSelector } from "@/store/hooks";
import { getConfigValue } from "@/lib/getConfigValue";
import { cartStyles as s } from "./Cart.styles";

interface CartSummaryProps {
  items: CartItemType[];
}

export default function CartSummary({ items }: CartSummaryProps) {
  const config = useAppSelector((state) => state.config.data);
  const platformFeePercentage = getConfigValue(config, "platform_fee", "2.8");

  const registrations = items.filter((item) => item.itemType === "REGISTRATION");
  const shirts = items.filter((item) => item.itemType === "TSHIRT");
  const bags = items.filter((item) => item.itemType === "BAG");
  const sponsorships = items.filter((item) => item.itemType === "SPONSORSHIP");

  const registrationsSubtotal = registrations.reduce((acc, item) => {
    const attrs: any = item.itemAttributes as any;
    const isDoubles = Boolean(attrs?.partnerName);
    const key = (isDoubles ? "price_event_doubles" : "price_event_singles") as any;
    const fallback = isDoubles
      ? process.env.NEXT_PUBLIC_PRICE_EVENT_DOUBLES
      : process.env.NEXT_PUBLIC_PRICE_EVENT_SINGLES;
    const price = Number(getConfigValue(config, key, fallback)) || 0;
    return acc + price;
  }, 0);

  const shirtsSubtotal = shirts.reduce((acc, item) => {
    const attrs: any = item.itemAttributes as any;
    const type = attrs?.type;
    let key: any = null;
    let fallback: string | undefined = undefined;

    if (type === "ROUND_NECK_HALF") {
      key = "price_shirt_round_neck_half";
      fallback = process.env.NEXT_PUBLIC_PRICE_SHIRT_ROUND_NECK_HALF_SLEEVES;
    } else if (type === "ROUND_NECK_SLEEVELESS") {
      key = "price_shirt_round_neck_sleeveless";
      fallback = process.env.NEXT_PUBLIC_PRICE_SHIRT_ROUND_NECK_SLEEVELESS;
    } else if (type === "COLLARED_HALF") {
      key = "price_shirt_collared_half";
      fallback = process.env.NEXT_PUBLIC_PRICE_SHIRT_COLLARED_HALF_SLEEVES;
    }

    const price = key ? (Number(getConfigValue(config, key, fallback)) || 0) : 0;
    return acc + price;
  }, 0);

  const bagsSubtotal = bags.reduce((acc, item) => {
    const price = Number(getConfigValue(config, "price_bag", "500")) || 0;
    return acc + (price * (item.itemQuantity || 1));
  }, 0);

  const sponsorshipsSubtotal = sponsorships.reduce((acc, item) => acc + (item.itemAmount || 0), 0);
  const finalAmount = registrationsSubtotal + shirtsSubtotal + bagsSubtotal + sponsorshipsSubtotal;

  const splitRows = [
    { label: "Registrations", amount: registrationsSubtotal },
    { label: "Shirts", amount: shirtsSubtotal },
    { label: "Bags", amount: bagsSubtotal },
    { label: "Sponsorship", amount: sponsorshipsSubtotal },
  ].filter((row) => row.amount > 0);

  return (
    <div className={s.checkoutSummary}>
      <div className={s.totalsCard}>
        {splitRows.map((row) => (
          <div key={row.label} className={s.totalsRow}>
            <div className={s.totalsLabel}>{row.label}</div>
            <div className={s.totalsValue}>₹{row.amount}</div>
          </div>
        ))}

        {splitRows.length > 0 && <div className={s.totalsDivider} />}

        <div className={s.totalsRow}>
          <div className={s.totalsFinalLabel}>Shopping amount</div>
          <div className={s.totalsFinalValue}>₹{finalAmount}</div>
        </div>

        <div className={s.totalsRow}>
          <div className={s.totalsLabel}>Razorpay platform fee</div>
          <div className={s.totalsValue}>+ {platformFeePercentage}%</div>
        </div>
      </div>
    </div>
  );
}
