export const profileCardStyles = {
  card: [
    "bg-[#fafafa]",
    "border",
    "border-[#d9d9d9]",
    "rounded-[14px]",
    "p-[0.9rem_1rem]",
    "w-full",
    "max-w-[420px]",
    "mx-auto",
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
  
  noteRow: "flex items-start justify-start gap-[6px]",
  
  infoIcon: "text-[#ccc] w-[11px] h-[11px] flex-shrink-0",
  
  noteList: "list-disc pl-4 text-[12px] text-[#bbb] leading-[1.25] text-left",
  noteItem: "marker:text-[#c7c7c7]",
} as const;
