export const navbarStyles = {
    header: [
        "fixed",
        "top-0",
        "left-0",
        "right-0",
        "z-50",
        "flex",
        "items-center",
        "justify-between",
        "px-6",
        // "sm:px-10",
        // "lg:px-16",
        "py-4",
        "bg-white/80",
        "backdrop-blur-md",
        "border-b",
        "border-black/5",
        "sm:py-[10px]",
        "sm:px-[20px]",
    ].join(" "),

    logo: [
        "text-2xl",
        "font-bold",
        "text-black",
        "tracking-tight",
    ].join(" "),

    desktopNav: [
        "hidden",
        "md:flex",
        "items-center",
        "gap-8",
    ].join(" "),

    link: [
        "text-lg",
        "font-light", // Changed from font-medium
        "tracking-tight", // Added to match Hero
        "text-black/70",
        "hover:text-black",
        "transition-colors",
        "duration-200",
        "flex",
        "items-center",
        "gap-1",
    ].join(" "),

    dropdownContainer: [
        "relative",
        "group", // Using group for hover interactions
    ].join(" "),

    dropdownMenu: [
        "absolute",
        "top-full",
        "left-0",
        "mt-2",
        "w-48",
        "bg-white/95", // Slightly less transparent for readability
        "backdrop-blur-md",
        "border",
        "border-black/5",
        "rounded-xl",
        "shadow-lg", // Soft shadow
        "opacity-0",
        "pointer-events-none",
        "group-hover:opacity-100", // Show on group hover
        "group-hover:pointer-events-auto",
        "transition-all",
        "duration-300",
        "ease-in-out",
        "transform",
        "translate-y-2",
        "group-hover:translate-y-0",
        "flex",
        "flex-col",
        "p-2",
        "overflow-hidden"
    ].join(" "),

    dropdownItem: [
        "px-4",
        "py-2",
        "text-base",
        "font-light",
        "tracking-tight",
        "text-black/70",
        "hover:text-black",
        "hover:bg-black/5",
        "rounded-lg",
        "transition-colors",
        "duration-200",
    ].join(" "),

    arrowIcon: [
        "w-4",
        "h-4",
        "transform",
        "transition-transform",
        "duration-300",
        "group-hover:rotate-180",
    ].join(" "),


    hamburgerBtn: [
        "md:hidden",
        "flex",
        "flex-col",
        "justify-center",
        "items-center",
        "gap-1.5",
        "w-8",
        "h-8",
        "z-[60]",
    ].join(" "),

    hamburgerLine: [
        "w-6",
        "h-[2px]",
        "bg-black",
        "transition-all",
        "duration-300",
    ].join(" "),

    hamburgerLineOpen1: "transform rotate-[45deg] translate-y-[8px]",
    hamburgerLineOpen2: "opacity-0",
    hamburgerLineOpen3: "transform -rotate-[45deg] -translate-y-[8px]",

    mobileMenu: [
        "fixed",
        "inset-0",
        "bg-white/90", // Slight transparency to lower opacity of background
        "backdrop-blur-md", // Frosted glass effect
        "z-[55]",
        "flex",
        "flex-col",
        "items-center",
        "pt-24", // Add top padding to clear the header
        "pb-8", // Add bottom padding
        // "overflow-y-auto", // Make scrollable
        "transition-transform",
        "duration-300",
        "ease-in-out",
        "md:hidden",
    ].join(" "),

    mobileMenuOpen: "translate-x-0",
    mobileMenuClosed: "opacity-0 pointer-events-none translate-x-[10%]", // Alternatively use full translate, but let's do a smooth fade+slide for premium feel
    
    mobileLink: [
        "text-xl", // Reduced from 3xl
        "font-medium",
        "text-black",
        "py-3", // Reduced from py-4
        "tracking-tight",
        "hover:text-black/70",
        "transition-colors",
    ].join(" "),
} as const;
