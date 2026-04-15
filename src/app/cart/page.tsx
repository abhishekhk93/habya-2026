import Cart from "@/components/cart/Cart";
import { ConfigRefetcher } from "@/components/common/ConfigRefetcher";

export default function CartPage() {
  return (
    <main>
      <ConfigRefetcher />
      <Cart />
    </main>
  );
}