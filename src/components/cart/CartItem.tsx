import type { CartItem as CartItemType } from "@/lib/atc/types";
import { cartStyles as s } from "./Cart.styles";
import { useAppSelector } from "@/store/hooks";
import { getConfigValue } from "@/lib/getConfigValue";
import { sizeChart } from "@/components/shop/Shop.data";

interface CartItemProps {
  item: CartItemType;
  onRemove: (item: CartItemType) => void;
  icon: React.ReactNode;
}

export default function CartItem({ item, onRemove, icon }: CartItemProps) {
  const config = useAppSelector((state) => state.config.data);

  let title = "";
  let details: React.ReactNode[] = [];
  let price: number | null = null;

  if (item.itemType === "REGISTRATION") {
    const attrs = item.itemAttributes as any;
    title = attrs.categoryName;
    if (attrs.partnerName) {
      details.push(<p key="pname">Partner Name: <strong>{attrs.partnerName}</strong></p>);
      price = Number(getConfigValue(config, "price_event_doubles", process.env.NEXT_PUBLIC_PRICE_EVENT_DOUBLES)) || 0;
    } else {
      price = Number(getConfigValue(config, "price_event_singles", process.env.NEXT_PUBLIC_PRICE_EVENT_SINGLES)) || 0;
    }
    details.push(<p key="amt">Amount: <strong>₹{price}</strong></p>);
  } else if (item.itemType === "TSHIRT") {
    const attrs = item.itemAttributes as any;
    title = attrs.name || "Event T-Shirt";
    if (attrs.size) {
      const sizeInfo = sizeChart.find(row => row.size === attrs.size);
      details.push(
        <p key="size">
          Size: <strong>{attrs.size}</strong>
          {sizeInfo && <span className="text-black/40"> | {sizeInfo.width}in x {sizeInfo.length}in</span>}
        </p>
      );
    }
    if (attrs.displayName) details.push(<p key="dname">Name to Print: <strong>{attrs.displayName}</strong></p>);
    if (attrs.type === "ROUND_NECK_HALF") {
      price = Number(getConfigValue(config, "price_shirt_round_neck_half", process.env.NEXT_PUBLIC_PRICE_SHIRT_ROUND_NECK_HALF)) || 0;
    } else if (attrs.type === "ROUND_NECK_SLEEVELESS") {
      price = Number(getConfigValue(config, "price_shirt_round_neck_sleeveless", process.env.NEXT_PUBLIC_PRICE_SHIRT_ROUND_NECK_SLEEVELESS)) || 0;
    } else if (attrs.type === "COLLARED_HALF") {
      price = Number(getConfigValue(config, "price_shirt_collared_half", process.env.NEXT_PUBLIC_PRICE_SHIRT_COLLARED_HALF)) || 0;
    }
    details.push(<p key="amt">Amount: <strong>₹{price}</strong></p>);
  } else if (item.itemType === "SPONSORSHIP") {
    title = "Event Sponsorship";
    if (item.itemAmount) details.push(<p key="amt">Amount: <strong>₹{item.itemAmount}</strong></p>);
  }

  let hoverBgClass = "hover:bg-gray-50";
  if (item.itemType === "REGISTRATION") {
    hoverBgClass = "hover:bg-indigo-100/30";
  } else if (item.itemType === "TSHIRT") {
    hoverBgClass = "hover:bg-[#ffd4b3]/30";
  } else if (item.itemType === "SPONSORSHIP") {
    hoverBgClass = "hover:bg-green-100/30";
  }

  const itemBoxClass = s.itemBox.replace("hover:bg-gray-50", hoverBgClass);

  return (
    <li className={`${itemBoxClass} flex justify-between items-center`}>
      <div className={s.itemContent}>
        <div className={s.iconWrapper}>
          {icon}
        </div>
        <div className={s.itemTitleContainer}>
          <p className={s.itemTitle}>{title}</p>
          {details.length > 0 && (
            <div className={s.itemDetailsList}>
              {details}
            </div>
          )}
        </div>
      </div>
      <button
        onClick={() => onRemove(item)}
        className="ml-4 sm:ml-8 p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
        aria-label="Remove item"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </li>
  );
}
