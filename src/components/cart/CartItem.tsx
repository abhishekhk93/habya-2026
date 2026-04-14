import type { CartItem as CartItemType } from "@/lib/atc/types";
import { cartStyles as s } from "./Cart.styles";

interface CartItemProps {
  item: CartItemType;
  onRemove: (item: CartItemType) => void;
  icon: React.ReactNode;
}

export default function CartItem({ item, onRemove, icon }: CartItemProps) {
  let title = "";
  let details: React.ReactNode[] = [];

  if (item.itemType === "REGISTRATION") {
    const attrs = item.itemAttributes as any;
    title = attrs.categoryName;
    if (attrs.partnerPlayerId) details.push(<p key="pid">Partner ID: <strong>{attrs.partnerPlayerId}</strong></p>);
    if (attrs.partnerName) details.push(<p key="pname">Partner Name: <strong>{attrs.partnerName}</strong></p>);
  } else if (item.itemType === "TSHIRT") {
    const attrs = item.itemAttributes as any;
    title = attrs.type || "Event T-Shirt";
    if (attrs.size) details.push(<p key="size">Size: <strong>{attrs.size}</strong></p>);
    if (attrs.displayName) details.push(<p key="dname">Name to Print: <strong>{attrs.displayName}</strong></p>);
  } else if (item.itemType === "SPONSORSHIP") {
    title = "Event Sponsorship";
    if (item.itemAmount) details.push(<p key="amt" className={s.itemSubtitle}>Amount: ₹{item.itemAmount}</p>);
  }

  return (
    <li className={`${s.itemBox} flex justify-between items-center`}>
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
