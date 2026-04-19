export const eventItemStyles = {
  // Container: Removed overflow-hidden to prevent cutting off the popover
  eventItem: "flex flex-col rounded-[14px] border border-indigo-200 transition-all duration-300 relative",
  
  // Header Row: Add the padding back here
  eventHeaderRow: "flex items-center justify-between w-full p-4 sm:p-5",
  
  eventName: "text-lg sm:text-xl font-medium text-black",
  
  // Subtitle Section: Full width, top border, themed bg, inner padding
  eventSubtitle: [
    "text-sm",
    "sm:text-base",
    "font-light",
    "text-black/60",
    "transition-all",
    "duration-300",
    "px-4",
    "sm:px-5",
    "py-3",
    "bg-indigo-50/50",
    "border-t",
    "border-indigo-200",
    "flex",
    "items-center",
    "rounded-b-[13px]", // Match parent rounding but inner
    "relative",
  ].join(" "),
  
  eventSubtitleActive: "bg-indigo-100/50",
  
  toggleWrapper: "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-300 ease-in-out focus:outline-none",
  toggleEnabled: "bg-indigo-600",
  toggleDisabled: "bg-black/10",
  toggleThumb: "pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-sm ring-0 transition duration-300 ease-in-out", 
  toggleThumbActive: "translate-x-6",
  toggleThumbInactive: "translate-x-1",
} as const;
