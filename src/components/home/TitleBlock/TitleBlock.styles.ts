export const titleBlockStyles = {
  wrapper: "flex flex-col items-center justify-center text-center",
  
  title: [
    "text-[42px]",
    "sm:text-[68px]",
    "md:text-[76px]",
    "lg:text-[84px]",
    "font-bold",
    "text-[#1a1a1a]",
    "leading-tight",
    "drop-shadow-[0_1px_2px_rgba(0,0,0,0.05)]",
  ].join(" "),
  
  subtitle: [
    "text-[18px]",
    "sm:text-[22px]",
    "md:text-[24px]",
    "lg:text-[28px]",
    "text-[#666]",
    "mt-2",
    "font-light",
    "drop-shadow-[0_1px_1px_rgba(0,0,0,0.05)]",
  ].join(" "),
} as const;
