"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { navbarStyles } from "./Navbar.styles";
import type { NavbarProps, NavItem } from "./Navbar.types";

const loggedOutItems: NavItem[] = [
    { label: "Sign Up", href: "/signup" },
    { label: "Log in", href: "/login" }
];

const loggedInItems: NavItem[] = [
    { label: "Register", href: "/register" },
    { label: "Buy shirts", href: "/shop" },
    { 
        label: "Sponsorship", 
        href: "/sponser",
        subItems: [
            { label: "Silver - ₹5000", href: "/sponser" },
            { label: "Gold - ₹10000", href: "/sponser" },
            { label: "Diamond - ₹15000", href: "/sponser" },
            { label: "Platinum - ₹20000", href: "/sponser" },
        ]
    },
    { label: "My orders", href: "/orders" },
    { label: "Cart", href: "/cart" },
];

export default function Navbar({ items }: NavbarProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Use passed items if available (for testing/override), otherwise use state-based items
    const displayItems = items || (isLoggedIn ? loggedInItems : loggedOutItems);

    // Prevent scrolling and manage body class when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
            document.body.classList.add("menu-open");
        } else {
            document.body.style.overflow = "unset";
            document.body.classList.remove("menu-open");
        }
        return () => {
            document.body.style.overflow = "unset";
            document.body.classList.remove("menu-open");
        };
    }, [isMobileMenuOpen]);

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, label: string) => {
        if (label === "Log in") {
            // e.preventDefault();
            setIsLoggedIn(true);
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <header className={navbarStyles.header}>
            <Link href="/" className={navbarStyles.logo} onClick={() => setIsMobileMenuOpen(false)}>
                Habya 2026
            </Link>

            {/* Desktop Navigation */}
            <nav className={navbarStyles.desktopNav}>
                {displayItems.map((item) => (
                    item?.subItems ? (
                        <div key={item.label} className={navbarStyles.dropdownContainer}>
                            <Link href={item.href} className={navbarStyles.link}>
                                {item.label}
                                <svg 
                                    className={navbarStyles.arrowIcon}
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </Link>

                            <div className={navbarStyles.dropdownMenu}>
                                {item?.subItems?.map((sub) => (
                                    <Link key={sub.label} href={sub.href} className={navbarStyles.dropdownItem}>
                                        {sub.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <Link 
                            key={item.label} 
                            href={item.href} 
                            className={navbarStyles.link}
                            onClick={(e) => handleLinkClick(e, item.label)}
                        >
                            {item.label}
                        </Link>
                    )
                ))}
                
                {isLoggedIn && (
                    <button 
                        onClick={() => setIsLoggedIn(false)}
                        className={navbarStyles.link}
                    >
                        Log out
                    </button>
                )}
            </nav>

            {/* Hamburger Button */}
            <button
                className={navbarStyles.hamburgerBtn}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
            >
                <div className={`${navbarStyles.hamburgerLine} ${isMobileMenuOpen ? navbarStyles.hamburgerLineOpen1 : ""}`} />
                <div className={`${navbarStyles.hamburgerLine} ${isMobileMenuOpen ? navbarStyles.hamburgerLineOpen2 : ""}`} />
                <div className={`${navbarStyles.hamburgerLine} ${isMobileMenuOpen ? navbarStyles.hamburgerLineOpen3 : ""}`} />
            </button>

            {/* Mobile Menu */}
            <div className={`${navbarStyles.mobileMenu} ${isMobileMenuOpen ? navbarStyles.mobileMenuOpen : navbarStyles.mobileMenuClosed}`}>
                {displayItems.map((item) => (
                    <div key={item.label} className="w-full flex flex-col items-center">
                        <Link
                            href={item.href}
                            className={navbarStyles.mobileLink}
                            onClick={(e) => handleLinkClick(e, item.label)}
                        >
                            {item.label}
                        </Link>
                        {item.subItems && !isMobileMenuOpen &&(
                            <div className="flex flex-col items-center gap-1 mb-2">
                                {item.subItems.map((sub) => (
                                    <Link
                                        key={sub.label}
                                        href={sub.href}
                                        className="text-base font-medium text-black/60 hover:text-black transition-colors py-2"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {sub.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
                {isLoggedIn && (
                    <button 
                        onClick={() => {
                            setIsLoggedIn(false);
                            setIsMobileMenuOpen(false);
                        }}
                        className={navbarStyles.mobileLink}
                    >
                        Log out
                    </button>
                )}
            </div>
        </header>
    );
}
