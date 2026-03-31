"use client";

import Link from "next/link";
import { useAppSelector } from "@/store/hooks";
import { authActionsStyles as s } from "./AuthActions.styles";
import type { AuthActionsProps } from "./AuthActions.types";

export default function AuthActions({ isVisible }: AuthActionsProps) {
  const { isLoggedIn, isLoading } = useAppSelector((state) => state.auth);

  // Don't show anything if loading or already logged in
  // (when logged in, the hamburger is in the Navbar instead)
  if (isLoading || isLoggedIn) return null;

  return (
    <div className={`${s.wrapper} ${isVisible ? s.visible : s.hidden}`}>
      <Link href="/sign-in" className={s.signInLink}>
        <span className={s.signInIcon}>
          <svg
            className={s.signInArrow}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </span>
        <span>Sign In / Sign Up</span>
      </Link>
    </div>
  );
}
