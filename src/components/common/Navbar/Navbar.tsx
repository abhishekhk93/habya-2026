"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logoutUser } from "@/store/features/authSlice";
import { HamburgerMenu } from "@/components/common/HamburgerMenu";
import { navbarStyles as s } from "./Navbar.styles";
import { getCart } from "@/lib/atc/storage";

const BASE_MENU_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Register", href: "/register" },
  { label: "Buy Shirts", href: "/shop" },
  { label: "Sponsor", href: "#" },
  { label: "My Orders", href: "#" },
];

export default function Navbar() {
  const { isLoggedIn, isLoading, user } = useAppSelector((state) => state.auth);
  const playerId = user?.playerId;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const update = () => setCartCount(getCart(playerId).items.length);
    update(); // read on mount
    window.addEventListener("storage", update);         // cross-tab sync
    window.addEventListener("cart-updated", update);    // same-tab sync
    return () => {
      window.removeEventListener("storage", update);
      window.removeEventListener("cart-updated", update);
    };
  }, [playerId]);

  // Only show navbar when logged in
  if (isLoading || !isLoggedIn) return null;

  const handleLogout = async () => {
    await dispatch(logoutUser());
    setMenuOpen(false);
    router.push("/");
  };

  const menuItems = [
    ...BASE_MENU_ITEMS,
    { label: cartCount > 0 ? `Cart (${cartCount})` : "Cart", href: "#" },
  ];

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
        items={menuItems}
        onLogout={handleLogout}
      />
    </>
  );
}
