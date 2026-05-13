export const titleBlockStyles = {
  wrapper: "flex flex-col items-center justify-center text-center",
  
  title: [
    "text-[40px]",
    "sm:text-[60px]",
    "md:text-[68px]",
    "lg:text-[76px]",
    "font-bold",
    "text-[#1a1a1a]",
    "leading-tight",
    "drop-shadow-[0_1px_2px_rgba(0,0,0,0.05)]",
  ].join(" "),
  
  subtitle: [
    "text-[16px]",
    "sm:text-[20px]",
    "md:text-[22px]",
    "lg:text-[24px]",
    "text-[#666]",
    "mt-2",
    "font-light",
    "drop-shadow-[0_1px_1px_rgba(0,0,0,0.05)]",
  ].join(" "),
} as const;
