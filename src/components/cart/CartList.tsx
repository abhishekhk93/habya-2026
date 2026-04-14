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

  return (
    <div className={s.section}>
        <div className={s.sectionHeader}>
            <h2 className={s.sectionTitle}>{title} ({items.length})</h2>
        </div>
        <ul className={s.listContainer}>
            {items.map((item, index) => (
                <CartItem key={`reg-${index}`} item={item} onRemove={onRemove} icon={icon}/>
            ))}
        </ul>
    </div>
  );
}
