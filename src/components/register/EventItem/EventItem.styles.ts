export const eventItemStyles = {
  eventItem: "flex items-start justify-between p-4 sm:p-5 rounded-[14px] transition-colors duration-300",
  eventInfo: "flex flex-col pr-4",
  eventName: "text-base sm:text-lg font-medium text-black",
  eventSubtitle: "text-[11px] sm:text-xs font-light text-black/60 transition-opacity duration-200 block mt-1 px-2 py-1 rounded-md bg-black/[0.04] w-fit min-h-6",
  toggleWrapper: "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-300 ease-in-out focus:outline-none",
  toggleEnabled: "bg-black",
  toggleDisabled: "bg-black/10",
  toggleThumb: "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-300 ease-in-out",
  toggleThumbActive: "translate-x-6",
  toggleThumbInactive: "translate-x-1",
} as const;
