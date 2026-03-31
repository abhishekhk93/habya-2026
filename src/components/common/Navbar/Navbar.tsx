"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logoutUser } from "@/store/features/authSlice";
import { HamburgerMenu } from "@/components/common/HamburgerMenu";
import { navbarStyles as s } from "./Navbar.styles";

const MENU_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Register", href: "/register" },
  { label: "Buy Shirts", href: "#" },
  { label: "Sponsor", href: "#" },
];

export default function Navbar() {
  const { isLoggedIn, isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  // Only show navbar when logged in
  if (isLoading || !isLoggedIn) return null;

  const handleLogout = async () => {
    await dispatch(logoutUser());
    setMenuOpen(false);
    router.push("/");
  };

  return (
    <>
      <nav className={s.nav}>
        {/* Hamburger button */}
        <button
          className={s.hamburgerButton}
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <span className="flex flex-col gap-[5px]">
            <span className={s.hamburgerLine} />
            <span className={s.hamburgerLine} />
            <span className={s.hamburgerLine} />
          </span>
        </button>
      </nav>

      <HamburgerMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        items={MENU_ITEMS}
        onLogout={handleLogout}
      />
    </>
  );
}
