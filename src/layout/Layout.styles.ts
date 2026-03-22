export const layoutStyles = {
    wrapper: [
        "h-dvh",
        "w-full",
        "overflow-hidden",
        "flex",
        "flex-col",
    ].join(" "),
    
    main: [
        "flex-grow",
        "w-full",
        "h-full",
        "pt-[72px]", // Adjust based on navbar height to prevent overlap
        "overflow-hidden",
        "relative",
        "transition-opacity",
        "duration-300",
        "ease-in-out",
    ].join(" "),
} as const;
