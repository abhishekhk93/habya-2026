export const signUpStyles = {
    // Container handles the 50/50 split on desktop and relative positioning for mobile
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
        "px-6",
        "pt-24",
        "md:p-12",
        "lg:p-24",
        "h-full", // Take strictly full height available
        "items-center",
        // remove justify-center to avoid cutting off tall content, use my-auto on card instead
    ].join(" "),
    
    card: [
        "w-full",
        "max-w-md",
        "bg-white/95", // Slightly transparent to let background peek through subtly
        "md:bg-white", // Solid on desktop
        "backdrop-blur-md", // Nice glass effect on mobile
        "rounded-3xl",
        "shadow-2xl",
        "shadow-black/10",
        "border",
        "border-white/20",
        "md:border-black/5",
        "p-8",
        "sm:p-10",
        "my-auto", // Center vertically if space allows, without cutting off if scrollable
    ].join(" "),
    
    form: [
        "flex",
        "flex-col",
        "gap-5",
        "pt-4",
        "pb-2"
    ].join(" "),
    
    inputGroup: [
        "relative",
        "flex",
        "flex-col",
        "gap-2",
        "w-full",
    ].join(" "),
    
    inputIcon: [
        "absolute",
        "left-4",
        "top-1/2",
        "-translate-y-1/2",
        "w-5",
        "h-5",
        "text-black/40",
        "pointer-events-none",
    ].join(" "),
    
    label: [
        "text-base",
        "font-medium",
        "text-black/80",
    ].join(" "),
    
    input: [
        "w-full",
        "pl-11",
        "pr-4",
        "py-3",
        "rounded-xl",
        "bg-black/5", // Softer background
        "md:bg-gray-50",
        "border",
        "border-black/10",
        "text-black",
        "placeholder:text-black/30",
        "focus:outline-none",
        "focus:ring-2",
        "focus:ring-black/10", // Subtler focus ring
        "focus:border-black/20",
        "transition-all",
        "duration-200",
    ].join(" "),
    
    radioGroup: [
        "flex",
        "items-center",
        "gap-6",
        "mt-1",
    ].join(" "),
    
    radioLabel: [
        "flex",
        "items-center",
        "gap-2",
        "text-sm",
        "font-medium",
        "text-black/80",
        "cursor-pointer",
        "w-1/2",
    ].join(" "),
    
    radioInput: [
        "w-4",
        "h-4",
        "text-black",
        "border-black/20",
        "focus:ring-black",
        "accent-black",
    ].join(" "),
    
    loginText: [
        "mt-8",
        "text-center",
        "text-sm",
        "text-black/60",
    ].join(" "),
    
    loginLink: [
        "font-medium",
        "text-black",
        "hover:underline",
        "ml-1",
        "mt-2"
    ].join(" ")
} as const;
