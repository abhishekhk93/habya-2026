"use client";

import { useRouter } from "next/navigation";
import { SignInForm } from "@/components/auth/Auth";

export default function SignInPage() {
  const router = useRouter();

  return (
    <main>
      <SignInForm onSuccess={() => router.push("/")} />
    </main>
  );
}
