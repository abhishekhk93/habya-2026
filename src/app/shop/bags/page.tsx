import { Bags } from "@/components/bags";
import { ConfigRefetcher } from "@/components/common/ConfigRefetcher";

export default function BagsPage() {
  return (
    <main>
      <ConfigRefetcher />
      <Bags />
    </main>
  );
}
