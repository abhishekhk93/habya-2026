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
        <div className={s.badge}>Profile ID: <span className="font-bold">{user.playerId}</span></div>
      </div>

      <div className={s.divider} />

      <div className={s.noteRow}>
        <ul className={`${s.noteList} space-y-2`}>
          <li className={`${s.noteItem} flex items-center gap-2.5`}>
            <svg className="w-4 h-4 text-indigo-500/70" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
            </svg>
            <span>Your Profile ID is part of your password.</span>
          </li>
          <li className={`${s.noteItem} flex items-center gap-2.5`}>
            <svg className="w-4 h-4 text-green-500/70" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.744c0 5.548 4.076 10.21 9 11.109 4.924-.899 9-5.561 9-11.109 0-1.287-.203-2.526-.581-3.686A11.959 11.959 0 0112 2.714z" />
            </svg>
            <span>Make sure you save it securely.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
