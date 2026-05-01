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
                className={s.item}
                onClick={onClose}
                prefetch={item.prefetch}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Logout */}
        <button
          className={s.logoutButton}
          onClick={() => {
            onLogout();
            onClose();
          }}
        >
          Logout
        </button>
      </nav>
    </>
  );
}
