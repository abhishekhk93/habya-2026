export const waveParticlesStyles = {
    canvas: [
        "absolute",
        "inset-0",
        "z-0",
        "pointer-events-none",
        "transition-opacity",
        "duration-[3000ms]",
        "ease-in-out",
    ].join(" "),

    visible: "opacity-[0.30]",
    hidden: "opacity-0",
} as const;
