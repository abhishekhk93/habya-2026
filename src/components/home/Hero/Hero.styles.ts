export const heroStyles = {
  wrapper: [
    "relative",
    "min-h-[calc(100svh-220px)]", // Reduced further to avoid desktop scroll
    "sm:min-h-0", // Let it be natural on larger screens
    "bg-transparent",
    "flex",
    "flex-col",
    "items-center",
    "justify-start", // Changed to start so pt-20 works as intended
    "pt-20", // Pushed down on mobile
    "sm:pt-12",
    "pb-4",
    "px-4",
    "font-sans",
  ].join(" "),

  wrapperLoggedIn: [
    "relative",
    "min-h-[calc(100svh-72px)]",
    "sm:min-h-[calc(100svh-88px)]",
    "md:min-h-[calc(100svh-120px)]",
    "bg-transparent",
    "flex",
    "flex-col",
    "items-center",
    "justify-start",
    "pt-6",
    "pb-10",
    "px-4",
    "font-sans",
  ].join(" "),

  container: [
    "w-full",
    "max-w-[320px]",
    "sm:max-w-none",
    "flex",
    "flex-col",
    "gap-12", // Spread components more on mobile
    "sm:gap-8",
  ].join(" "),

  containerLoggedIn: [
    "w-[calc(100%-1rem)]",
    "sm:w-full",
    "max-w-[500px]",
    "md:max-w-[700px]",
    "lg:max-w-[800px]",
    "my-auto",
    "flex",
    "flex-col",
    "gap-4",
  ].join(" "),

  contentInner: "w-full max-w-[420px] md:max-w-[560px] lg:max-w-[640px] mx-auto",
  section: "w-full max-w-[420px] md:max-w-[560px] lg:max-w-[640px] mx-auto",

  pageTitle: "text-2xl md:text-4xl font-light tracking-tight mb-2 text-center",
  pageSubtitle: "text-sm md:text-base lg:text-lg font-light mb-4 text-center text-black/60",

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
    "md:p-12",
    "md:gap-8",
    "flex",
    "flex-col",
    "gap-6",
  ].join(" "),
} as const;
