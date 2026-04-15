import { EventRegistration } from "@/components/register/EventRegistration";
import { ConfigRefetcher } from "@/components/common/ConfigRefetcher";

export default function RegisterPage() {
  return (
    <main>
      <ConfigRefetcher />
      <EventRegistration />
    </main>
  );
}
