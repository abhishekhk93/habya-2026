"use client";

import Link from "next/link";
import { hamburgerMenuStyles as s } from "./HamburgerMenu.styles";
import type { HamburgerMenuProps } from "./HamburgerMenu.types";

export default function HamburgerMenu({
  isOpen,
  onClose,
  items,
  onLogout,
}: HamburgerMenuProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`${s.backdrop} ${isOpen ? s.backdropVisible : s.backdropHidden}`}
        onClick={onClose}
      />

      {/* Panel */}
      <nav
        className={`${s.panel} ${isOpen ? s.panelVisible : s.panelHidden}`}
        aria-hidden={!isOpen}
      >
        {/* Close button */}
        <button
          className={s.closeButton}
          onClick={onClose}
          aria-label="Close menu"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        {/* Menu items */}
        <ul className={s.itemsList}>
          {items.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className={`${s.item} flex items-center gap-4 relative`}
                onClick={onClose}
                prefetch={item.prefetch}
              >
                <span className="flex-1">{item.label}</span>
                {item.icon && (
                  <div className="relative flex items-center justify-center w-10 h-10 rounded-full border border-black/10 bg-black/5">
                    <span className="opacity-70 scale-90">{item.icon}</span>
                    {item.showBadge && (
                      <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#B45309] text-white rounded-full flex items-center justify-center text-[9px] shadow-sm border border-white">
                        ★
                      </span>
                    )}
                  </div>
                )}
              </Link>
            </li>
          ))}
          <li>
            <button
              className={s.logoutButton}
              onClick={() => {
                onLogout();
                onClose();
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
