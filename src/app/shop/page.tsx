import Shop from "@/components/shop/Shop";
import { ConfigRefetcher } from "@/components/common/ConfigRefetcher";

export default function ShopPage() {
  return (
    <main>
      <ConfigRefetcher />
      <Shop />
    </main>
  );
}
