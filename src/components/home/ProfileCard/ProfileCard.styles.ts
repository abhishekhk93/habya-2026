export const profileCardStyles = {
  card: [
    "bg-[#fafafa]",
    "border",
    "border-[#d9d9d9]",
    "rounded-[14px]",
    "p-[0.9rem_1rem]",
    "md:p-6",
    "w-full",
    "max-w-[420px]",
    "md:max-w-[560px]",
    "lg:max-w-[640px]",
    "mx-auto",
    "flex",
    "flex-col",
  ].join(" "),
  
  topRow: "flex items-center justify-between",
  
  name: "text-[16px] md:text-[22px] font-medium text-[#1a1a1a]",
  
  badge: [
    "bg-[#f5f0fe]",
    "border-[0.5px]",
    "border-[#d4c6f7]",
    "rounded-[8px]",
    "px-[10px]",
    "py-[5px]",
    "md:px-4",
    "md:py-2",
    "text-[#5b3fb5]",
    "text-[14px]",
    "md:text-[18px]",
    "font-medium",
    "leading-none",
  ].join(" "),
  
  divider: "h-[0.5px] bg-[#ececec] my-[0.75rem] w-full",
  
  noteRow: "flex items-start justify-start",
  
  infoIcon: "text-[#ccc] w-[11px] h-[11px] flex-shrink-0",
  
  noteList: "list-none text-[12px] md:text-[15px] text-[#8f8f8f] leading-[1.3] text-left p-0 m-0",
  noteItem: "marker:text-[#9a9a9a]",
} as const;
