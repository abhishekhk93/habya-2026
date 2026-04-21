export const heroStyles = {
  wrapper: [
    "relative",
    "h-dvh",
    "bg-transparent",
    "flex",
    "flex-col",
    "items-center",
    "justify-center", // Center components vertically
    "pt-12",
    "pb-8",
    "font-sans",
    "overflow-hidden",
  ].join(" "),

  wrapperLoggedIn: [
    "relative",
    "min-h-[calc(100dvh-72px)]",
    "sm:min-h-[calc(100dvh-88px)]",
    "bg-white",
    "flex",
    "flex-col",
    "items-center",
    "justify-start",
    "pt-6",
    "pb-10",
    "px-4",
    "font-sans",
    "overflow-hidden",
  ].join(" "),

  container: [
    "w-full",
    "max-w-[340px]",
    "sm:max-w-none",
    "flex",
    "flex-col",
    "gap-8", // Cohesive gap between components
  ].join(" "),

  containerLoggedIn: [
    "w-[calc(100%-1rem)]",
    "sm:w-full",
    "max-w-[500px]",
    "my-auto",
    "flex",
    "flex-col",
    "gap-4",
  ].join(" "),

  contentInner: "w-full max-w-[420px] mx-auto",
  section: "w-full max-w-[420px] mx-auto",

  pageTitle: "text-2xl font-light tracking-tight mb-2 text-center",
  pageSubtitle: "text-sm font-light mb-4 text-center text-black/60",

  contentCard: [
    "bg-white",
    "rounded-[20px]",
    "shadow-sm",
    "border",
    "border-[#d9d9d9]",
    "w-full",
    "px-6",
    "pt-6",
    "pb-10",
    "sm:px-10",
    "flex",
    "flex-col",
    "gap-6",
  ].join(" "),
} as const;
