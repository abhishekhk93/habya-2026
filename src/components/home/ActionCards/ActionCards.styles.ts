export const actionCardsStyles = {
  container: "flex flex-col gap-3 w-full max-w-[420px] md:max-w-[560px] lg:max-w-[640px] mx-auto",
  
  card: [
    "flex",
    "bg-white",
    "border",
    "border-[#d9d9d9]",
    "rounded-[14px]",
    "p-[0.75rem_0.9rem]",
    "md:p-[1.2rem_1.5rem]",
    "gap-[12px]",
    "md:gap-4",
    "transition-all",
    "duration-200",
    "hover:bg-[#fafafa]",
    "flex-col",
  ].join(" "),
  
  iconContainer: [
    "w-[36px]",
    "h-[36px]",
    "md:w-[50px]",
    "md:h-[50px]",
    "rounded-[10px]",
    "flex",
    "items-center",
    "justify-center",
    "flex-shrink-0",
  ].join(" "),

  iconContainerFull: [
    "w-[36px]",
    "min-h-[70px]",
    "md:w-[50px]",
    "md:min-h-[90px]",
    "rounded-[10px]",
    "flex",
    "items-center",
    "justify-center",
    "flex-shrink-0",
    "self-stretch",
  ].join(" "),
  
  middle: "flex flex-col flex-1 min-w-0",
  
  title: "text-[15px] md:text-[20px] font-medium text-[#1a1a1a]",
  
  subtitle: "text-[13px] md:text-[16px] text-[#8f8f8f]",
  
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

  sublinksContainer: "flex gap-2 mt-2 w-fit",
  
  sublink: [
    "flex",
    "items-center",
    "bg-[#fff3ee]",
    "rounded-[6px]",
    "px-3",
    "py-1",
    "md:px-4",
    "md:py-1.5",
    "transition-all",
    "hover:bg-[#ffeadf]",
    "text-[#e67e56]",
    "text-[12px]",
    "md:text-[14px]",
    "font-medium",
  ].join(" "),
} as const;
