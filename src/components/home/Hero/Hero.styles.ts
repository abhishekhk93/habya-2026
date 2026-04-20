export const heroStyles = {
  wrapper: [
    "relative",
    "h-dvh",
    "bg-white",
    "flex",
    "flex-col",
    "items-center",
    "justify-center", // Center components vertically
    "pt-12",
    "pb-8",
    "font-sans",
    "overflow-hidden",
  ].join(" "),

  container: [
    "w-full",
    "max-w-[340px]",
    "flex",
    "flex-col",
    "gap-8", // Cohesive gap between components
  ].join(" "),

  section: "w-full",

  contentCard: [
    "bg-white",
    "rounded-[20px]",
    "shadow-sm",
    "border",
    "border-black/5",
    "px-6",
    "py-8",
    "flex",
    "flex-col",
    "gap-8",
  ].join(" "),
} as const;
