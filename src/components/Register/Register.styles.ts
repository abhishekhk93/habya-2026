export const registerStyles = {
    // Container uses a 50/50 split on desktop and relative positioning for mobile
    container: [
        "h-full",
        "w-full",
        "flex",
        "flex-col",
        "md:flex-row",
        "bg-white",
        "relative",
    ].join(" "),

    // The image section: 50% width on desktop, background on mobile
    imageSection: [
        "absolute",
        "inset-0",
        "w-full",
        "h-full",
        "z-0",
        "md:relative", // Reset absolute on desktop
        "md:w-1/2",
        "md:flex",
        "md:flex-col",
        "md:justify-center",
        "md:items-center",
        "md:bg-black/5",
    ].join(" "),

    imageWrapper: [
        "w-full",
        "h-full",
        "relative",
    ].join(" "),

    image: [
        "object-cover",
        "object-center",
        "w-full",
        "h-full",
        "md:rounded-none",
    ].join(" "),

    // The mobile overlay to ensure readability
    mobileOverlay: [
        "absolute",
        "inset-0",
        "bg-black/40", // Dark overlay for text contrast on mobile
        "md:hidden", // Hide on desktop
        "backdrop-blur-[2px]", // Slight blur for elegant feel
    ].join(" "),

    // The form section: 50% width on desktop, front layer on mobile
    formSection: [
        "relative",
        "z-10", // Above the image on mobile
        "flex-1",
        "md:w-1/2",
        "flex",
        "flex-col",
        // "px-6",
        // "py-6", // Padding top and bottom inside scrollable area
        "md:p-12",
        "lg:p-24",
        "h-full", // Take strictly full height available
        "overflow-y-auto", // Make scrollable for long lists
        "items-center",
    ].join(" "),
    
    card: [
        "w-full",
        "max-w-xl", // Wider card since it handles a list
        "bg-white/95", // Slightly transparent to let background peek through subtly
        "md:bg-white", // Solid on desktop
        "backdrop-blur-md", // Nice glass effect on mobile
        // "rounded-3xl",
        "shadow-2xl",
        "shadow-black/10",
        "border",
        "border-white/20",
        "md:border-black/5",
        "px-4",
        "py-6",
        "sm:p-10",
        // "mt-4",
        // "my-auto", // Center vertically if space allows
    ].join(" "),

    listContainer: [
        "flex",
        "flex-col",
        "gap-4",
        "py-2"
    ].join(" "),

    listItem: [
        "flex",
        "items-center",
        "justify-between",
        "py-4",
        "px-2",
        "bg-white",
        "border-b",
        "border-black/10",
        // "border",
        // "border-black/10",
        // "rounded-2xl",
        // "shadow-md",
        "transition-all",
        "duration-200",
        // "hover:border-black/20",
    ].join(" "),
    
    listItemSelected: [
        "flex",
        "items-center",
        "justify-between",
        "py-4",
        "px-2",
        // "bg-black/5",
        "bg-gradient-to-r from-black/5 to-white",
        // "border",
        // "border-black/10",
        // "rounded-2xl",
        // "border-b",
        // "border-black/10",
        "transition-all",
        "duration-200",
    ].join(" "),

    eventInfo: [
        "flex",
        "flex-col",
        "gap-1",
    ].join(" "),

    eventNameContainer: [
        "flex",
        "items-center",
        "gap-2",
    ].join(" "),

    tooltipContainer: [
        "relative",
        "group",
        "flex",
        "items-center",
        "justify-center",
    ].join(" "),

    infoIcon: [
        "w-4.5",
        "h-4.5",
        "text-black/40",
        "hover:text-black",
        "transition-colors",
        "cursor-help",
    ].join(" "),

    tooltipContent: [
        "absolute",
        "bottom-full",
        "left-1/2",
        "-translate-x-1/2",
        "mb-2",
        "w-48",
        "p-3",
        "bg-gray-900",
        "text-white",
        "text-xs",
        "rounded-xl",
        "opacity-0",
        "invisible",
        "group-hover:opacity-100",
        "group-hover:visible",
        "transition-all",
        "duration-200",
        "shadow-lg",
        "z-50",
        "pointer-events-none",
    ].join(" "),

    eventName: [
        "text-lg",
        "font-medium",
        "text-black",
        "tracking-tight",
    ].join(" "),

    eventDetails: [
        "text-xs",
        "text-black/60",
        "italic"
    ].join(" "),

    // Toggle switch styles
    toggleContainer: [
        "relative",
        "inline-flex",
        "h-5",
        "w-9",
        "items-center",
        "rounded-full",
        "transition-colors",
        // "focus:outline-none",
        // "focus:ring-2",
        // "focus:ring-black",
        // "focus:ring-offset-2",
        "cursor-pointer",
    ].join(" "),

    toggleActive: "bg-black",
    toggleInactive: "bg-gray-200",

    toggleHandleContainer: [
        "inline-block",
        "h-3.5",
        "w-3.5",
        "transform",
        "rounded-full",
        "bg-white",
        "transition",
    ].join(" "),

    toggleHandleActive: "translate-x-5",
    toggleHandleInactive: "translate-x-0.5",

} as const;
