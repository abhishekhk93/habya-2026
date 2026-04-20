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
        <ul className={s.noteList}>
          <li className={s.noteItem}>Your Player ID is part of your password.</li>
          <li className={s.noteItem}>Make sure you save it securely.</li>
        </ul>
      </div>
    </div>
  );
}
