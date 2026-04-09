"use client";

import Link from "next/link";
import { useAppSelector } from "@/store/hooks";
import { authActionsStyles as s } from "./AuthActions.styles";
import type { AuthActionsProps } from "./AuthActions.types";

export default function AuthActions({ isVisible }: AuthActionsProps) {
  const { isLoggedIn, isLoading, user } = useAppSelector((state) => state.auth);

  if (isLoading) return null;

  if (isLoggedIn && user) {
    return (
      <div className={`${s.wrapper} ${isVisible ? s.visible : s.hidden}`}>
        <div className={s.loggedInContainer}>
          <div className={s.loggedInText}>
            <div>Hi <span className="capitalize">{user.fullName}</span>! Welcome.</div>
            <div className="mt-1">Your Profile ID is <span className="font-medium text-black">{user.playerId}</span>.</div>
          </div>
          <div className={s.loggedInSubText}>
            Please note this as the Profile ID is required to login when you revisit the site.
          </div>
        </div>
      </div>
    );
  }

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
