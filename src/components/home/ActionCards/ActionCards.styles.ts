export const actionCardsStyles = {
  container: "flex flex-col gap-3 w-full max-w-[420px] mx-auto",
  
  card: [
    "flex",
    "items-center",
    "bg-white",
    "border",
    "border-[#d9d9d9]",
    "rounded-[14px]",
    "p-[0.75rem_0.9rem]",
    "gap-[12px]",
    "transition-all",
    "duration-200",
    "hover:bg-[#fafafa]",
    "cursor-pointer",
  ].join(" "),
  
  iconContainer: [
    "w-[36px]",
    "h-[36px]",
    "rounded-[10px]",
    "flex",
    "items-center",
    "justify-center",
    "flex-shrink-0",
  ].join(" "),
  
  middle: "flex flex-col flex-1 min-w-0",
  
  title: "text-[15px] font-medium text-[#1a1a1a]",
  
  subtitle: "text-[13px] text-[#bbb]",
  
  chevron: [
    "w-[7px]",
    "h-[7px]",
    "border-r-[1.5px]",
    "border-t-[1.5px]",
    "border-[#ccc]",
    "rotate-45",
    "flex-shrink-0",
    "mr-1",
  ].join(" "),
} as const;
