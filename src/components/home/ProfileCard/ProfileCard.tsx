"use client";

import { useAppSelector } from "@/store/hooks";
import { profileCardStyles as s } from "./ProfileCard.styles";

export default function ProfileCard() {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) return null;

  return (
    <div className={s.card}>
      <div className={s.topRow}>
        <div className={s.name}>{user.fullName}</div>
        <div className={s.badge}>{user.playerId}</div>
      </div>

      <div className={s.divider} />

      <div className={s.noteRow}>
        <svg
          className={s.infoIcon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
        <div className={s.noteText}>
          Your Player ID is part of your password.
          Make sure you save it securely.
        </div>
      </div>
    </div>
  );
}
