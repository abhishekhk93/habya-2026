"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/features/authSlice";
import { clearAuthCookie } from "@/app/actions/authActions";
import { HamburgerMenu } from "@/components/common/HamburgerMenu";
import { navbarStyles as s } from "./Navbar.styles";
import { getCart } from "@/lib/atc/storage";

const BASE_MENU_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Register", href: "/register", prefetch: false },
  { label: "Shirts", href: "/shop/shirts" },
  { label: "Bags", href: "/shop/bags" },
  { label: "Sponsor", href: "/sponsorship", prefetch: false },
  { label: "Orders", href: "/orders", prefetch: false },
];

export default function Navbar() {
  const { isLoggedIn, isLoading, user } = useAppSelector((state) => state.auth);
  const playerId = user?.playerId;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

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

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Only show navbar when logged in
  if (isLoading || !isLoggedIn) return null;

  const handleLogout = async () => {
    try {
      await clearAuthCookie();
    } catch (e) {
      console.error("Failed to clear auth cookie", e);
    }
    dispatch(logout());
    setMenuOpen(false);
    router.push("/");
  };

  const menuItems = [
    ...BASE_MENU_ITEMS,
    { label: cartCount > 0 ? `Cart (${cartCount})` : "Cart", href: "/cart", prefetch: false },
  ];

  return (
    <>
      <nav className={s.nav}>
        <Link href="/" className={s.logo} aria-label="Go to home">
          HABYA 2026
        </Link>

        <div className={s.right}>
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
        </div>

        <div className={`${s.divider} ${isScrolled ? s.dividerScrolled : s.dividerTop}`} />
      </nav>

      <div className={s.spacer} aria-hidden="true" />

      <HamburgerMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        items={menuItems}
        onLogout={handleLogout}
      />
    </>
  );
}
