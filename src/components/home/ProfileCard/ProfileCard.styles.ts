export const profileCardStyles = {
  card: [
    "bg-[#fafafa]",
    "border-[0.5px]",
    "border-[#ececec]",
    "rounded-[14px]",
    "p-[0.9rem_1rem]",
    "mx-[1.1rem]",
    "flex",
    "flex-col",
  ].join(" "),
  
  topRow: "flex items-center justify-between",
  
  name: "text-[16px] font-medium text-[#1a1a1a]",
  
  badge: [
    "bg-[#f5f0fe]",
    "border-[0.5px]",
    "border-[#d4c6f7]",
    "rounded-[8px]",
    "px-[10px]",
    "py-[5px]",
    "text-[#5b3fb5]",
    "text-[14px]",
    "font-medium",
    "leading-none",
  ].join(" "),
  
  divider: "h-[0.5px] bg-[#ececec] my-[0.75rem] w-full",
  
  noteRow: "flex items-center justify-start gap-[6px]",
  
  infoIcon: "text-[#ccc] w-[11px] h-[11px] flex-shrink-0",
  
  noteText: "text-[12px] text-[#bbb] leading-none text-left",
} as const;
