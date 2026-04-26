import type { CartItem as CartItemType } from "@/lib/atc/types";
import { cartStyles as s } from "./Cart.styles";
import CartItem from "./CartItem";

interface CartListProps {
  items: CartItemType[];
  onRemove: (item: CartItemType) => void;   
  title: string;
  icon: React.ReactNode;
}

export default function CartList({ items, onRemove, title, icon }: CartListProps) {
  const itemType = items.length > 0 ? items[0].itemType : null;

  let customWrapperClass = "bg-white border-black/5 hover:border-black/10";
  let customHeaderClass = "border-gray-200";
  let customDivideClass = "divide-gray-100";

  if (itemType === "REGISTRATION") {
    customWrapperClass = "bg-indigo-50/50 border-indigo-200 hover:border-indigo-300";
    customHeaderClass = "border-indigo-200";
    customDivideClass = "divide-indigo-100/50";
  } else if (itemType === "TSHIRT") {
    customWrapperClass = "bg-[#ffd4b3]/30 border-[#ffd4b3] hover:border-[#ffd4b3]/30";
    customHeaderClass = "border-[#ffd4b3]";
    customDivideClass = "divide-[#ffd4b3]/50";
  } else if (itemType === "SPONSORSHIP") {
    customWrapperClass = "bg-green-50 border-green-200 hover:border-green-300";
    customHeaderClass = "border-green-200/60";
    customDivideClass = "divide-green-200/60";
  }

  return (
    <div className={`${s.sectionHeader} ${customWrapperClass}`}>
        <div className={`px-6 py-5 border-b ${customHeaderClass}`}>
            <h2 className={s.sectionTitle}>{title} ({items.length})</h2>
        </div>
        <ul className={`${s.listContainer.replace("divide-gray-100", customDivideClass)}`}>
            {items.map((item, index) => (
                <CartItem key={`reg-${index}`} item={item} onRemove={onRemove} icon={icon}/>
            ))}
        </ul>
    </div>
  );
}
