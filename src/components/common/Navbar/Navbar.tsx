"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logoutUser } from "@/store/features/authSlice";
import { HamburgerMenu } from "@/components/common/HamburgerMenu";
import { navbarStyles as s } from "./Navbar.styles";
import { getCart } from "@/lib/atc/storage";
import { SponsorLogo } from "@/components/common/SponsorLogo";

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
    const update = () => {
      const items = getCart(playerId).items;
      const total = items.reduce((acc, item) => acc + (item.itemQuantity || 1), 0);
      setCartCount(total);
    };
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
    dispatch(logoutUser());
    setMenuOpen(false);
    router.push("/");
  };

  const menuItems = [
    ...BASE_MENU_ITEMS,
    { 
      label: "Cart", 
      href: "/cart", 
      prefetch: false,
      showBadge: cartCount > 0,
      icon: (
        <svg 
          className="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      )
    },
  ];

  return (
    <>
      <nav className={s.nav}>
        <Link href="/" className={s.logo} aria-label="Go to home">
          <SponsorLogo variant="navbar" />
          <span>HABYA 2026</span>
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
