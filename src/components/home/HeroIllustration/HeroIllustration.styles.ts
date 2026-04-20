export const heroIllustrationStyles = {
  wrapper: "relative flex flex-col items-center justify-center py-8",
  wrapperSmall: "relative flex flex-col items-center justify-center py-2",
  
  ring: [
    "relative",
    "w-[200px]",
    "h-[200px]",
    "rounded-full",
    "border",
    "border-[rgba(100,180,255,0.25)]",
    "flex",
    "items-center",
    "justify-center",
    "mb-2",
  ].join(" "),

  ringSmall: [
    "relative",
    "w-[90px]",
    "h-[90px]",
    "rounded-full",
    "border",
    "border-[rgba(100,180,255,0.15)]",
    "flex",
    "items-center",
    "justify-center",
  ].join(" "),
  
  illustration: "w-[120px] h-auto relative z-10",
  illustrationSmall: "w-[55px] h-auto relative z-10",
} as const;
