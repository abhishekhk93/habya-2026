"use client";

import React from "react";
import Link from "next/link";
import { actionCardsStyles as s } from "./ActionCards.styles";

const CARDS = [
  {
    title: "Register for events",
    subtitle: "Singles, doubles & mixed",
    route: "/register",
    bgColor: "bg-[#f0ecff]",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5b3fb5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <line x1="19" y1="8" x2="19" y2="14" />
        <line x1="16" y1="11" x2="22" y2="11" />
      </svg>
    ),
  },
  {
    title: "Shop Merchandise",
    subtitle: "Select a category",
    bgColor: "bg-[#fff3ee]",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e67e56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
    sublinks: [
      { label: "Official Shirts", route: "/shop/shirts" },
      { label: "Premium Bags", route: "/shop/bags" },
    ]
  },
  {
    title: "Sponsor the event",
    subtitle: "Support Habya 2026",
    route: "/sponsorship",
    bgColor: "bg-[#eef2f8]",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4a6fa5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5Z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
];

export default function ActionCards() {
  return (
    <div className={s.container}>
      {CARDS.map((card, idx) => {
        const hasSublinks = !!card.sublinks;
        
        const cardContent = (
          <>
            <div className="flex items-center w-full gap-3 md:gap-4">
              <div className={`${s.iconContainer} ${card.bgColor}`}>
                {card.icon}
              </div>
              <div className={s.middle}>
                <div className={s.title}>{card.title}</div>
                <div className={s.subtitle}>{card.subtitle}</div>
              </div>
              {!hasSublinks && <div className={s.chevron} />}
            </div>

            {card.sublinks && (
              <div className={s.sublinksContainer}>
                {card.sublinks.map((sub) => (
                  <Link key={sub.route} href={sub.route} className={s.sublink}>
                    {sub.label}
                  </Link>
                ))}
              </div>
            )}
          </>
        );

        return (
          <React.Fragment key={card.title + idx}>
            {!hasSublinks ? (
              <Link
                href={card.route || "#"}
                className={`${s.card} cursor-pointer`}
                prefetch={["/register", "/sponsorship", "/cart", "/orders"].includes(card.route || "") ? false : undefined}
              >
                {cardContent}
              </Link>
            ) : (
              <div className={s.card}>
                {cardContent}
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
