"use client";

import { useAppSelector } from "@/store/hooks";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader } from "../common/Loader";

/**
 * Routes that require the user to be logged in.
 * If a guest tries to access these, they are redirected to home.
 */
const PROTECTED_ROUTES = ["/cart", "/orders", "/register", "/sponsorship", "/payment-complete", "/checkout", "/shop"];

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, isLoading } = useAppSelector((state) => state.auth);

  const isProtected = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));

  useEffect(() => {
    // If session is still being fetched, wait.
    if (isLoading) return;

    // If route is protected and user is not logged in, bounce to home.
    if (isProtected && !isLoggedIn) {
      router.replace("/");
    }
  }, [isProtected, isLoggedIn, isLoading, router]);

  // Prevent "Flash of Protected Content" (FOPC)
  // If we are on a protected route and either loading or not logged in, 
  // show a loader instead of the children.
  if (isProtected && (isLoading || !isLoggedIn)) {
    return (
      <div className="flex flex-col items-center justify-center py-32 px-4 min-h-[50vh]">
        <div className="bg-white/80 backdrop-blur-sm rounded-[20px] p-10 shadow-sm border border-gray-100 flex flex-col items-center max-w-[400px] w-full">
            <Loader message={isLoading ? "Verifying access..." : "Redirecting to home..."} />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
