import { cookies } from "next/headers";
import { Hero } from "@/components/home/Hero";
import { COOKIE_NAME } from "@/lib/auth";

export default async function HomePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  const initialIsLoggedIn = !!token;

  return (
    <main>
      <Hero
        headline="Habya 2026"
        description="Ten Editions, Infinite Possibilities."
        initialIsLoggedIn={initialIsLoggedIn}
      />
    </main>
  );
}
