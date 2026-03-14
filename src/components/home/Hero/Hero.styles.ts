export const heroStyles = {
    wrapper: [
        "relative",
        "overflow-hidden",
        "flex",
        "items-center",
        "justify-center",
        "min-h-dvh",
        "px-6",
        "sm:px-10",
        "lg:px-16",
    ].join(" "),

    content: [
        "flex",
        "flex-col",
        "items-center",
        "justify-center",
        "gap-4",
        "sm:gap-6",
    ].join(" "),

    headline: [
        "text-6xl",
        "sm:text-7xl",
        "md:text-8xl",
        "lg:text-9xl",
        "font-light",
        "text-black",
        "text-center",
        "leading-tight",
        "tracking-tight",
    ].join(" "),

    description: [
        "text-xl",
        "sm:text-2xl",
        "md:text-3xl",
        "font-light",
        "text-black/70",
        "text-center",
        "max-w-2xl",
    ].join(" "),

    descriptionHidden: "opacity-0",
    descriptionVisible: "animate-fade-up opacity-100",
    cursor: [
        "inline-block",
        "w-[4px]",
        "sm:w-[6px]",
        "md:w-[8px]",
        "h-[0.9em]",
        "bg-[linear-gradient(to_bottom,#3b82f6,#22c55e,#eab308,#ef4444)]",
        "animate-blink",
        "align-baseline",
        "ml-2",
        "shrink-0",
    ].join(" "),

    illustrationTop: [
        "w-44",
        "sm:w-52",
        "md:w-64",
        "h-auto",
        "transition-all",
        "duration-1000",
        "ease-out",
    ].join(" "),

    illustrationHidden: "opacity-0 translate-y-4",
    illustrationVisible: "opacity-100 translate-y-0",
} as const;
