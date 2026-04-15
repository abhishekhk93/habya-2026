export const eventItemStyles = {
  eventItem: "flex flex-col p-4 sm:p-5 rounded-[14px] border border-black/[0.15] transition-all duration-300",
  eventHeaderRow: "flex items-center justify-between w-full mb-1",
  eventName: "text-lg sm:text-xl font-medium text-black",
  eventSubtitle: "text-sm sm:text-base font-light text-black/60 transition-all duration-300 mt-1 px-2.5 py-1.5 rounded-md bg-black/[0.04] border border-transparent",
  eventSubtitleActive: "border-black/20 bg-black/5",
  toggleWrapper: "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-300 ease-in-out focus:outline-none",
  toggleEnabled: "bg-black",
  toggleDisabled: "bg-black/10",
  toggleThumb: "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-300 ease-in-out",
  toggleThumbActive: "translate-x-6",
  toggleThumbInactive: "translate-x-1",
} as const;
