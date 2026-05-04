import Shop from "@/components/shop/Shop";
import { ConfigRefetcher } from "@/components/common/ConfigRefetcher";

export default function ShirtsPage() {
  return (
    <main>
      <ConfigRefetcher />
      <Shop />
    </main>
  );
}
