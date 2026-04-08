export const eventRegistrationStyles = {
  wrapper: "relative z-10 flex flex-col items-center justify-center min-h-[100dvh] py-10 px-4",

  card: "w-[calc(100%-1rem)] sm:w-full max-w-[500px] mx-auto flex flex-col bg-white rounded-[20px] px-8 pt-2 pb-10 sm:px-12 sm:pt-2 sm:pb-12 my-8",

  header: "text-2xl font-light tracking-tight mb-2 text-center",

  listContainer: "flex flex-col gap-2",

  eventItem: "flex items-start justify-between p-4 sm:p-5 rounded-[14px] transition-colors duration-300",

  eventInfo: "flex flex-col pr-4",

  eventName: "text-base sm:text-lg font-medium text-black",

  eventSubtitle: "text-[11px] sm:text-xs font-light text-black/60 transition-opacity duration-200 block h-4",

  // Custom Toggle Switch Styling
  toggleWrapper: "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-300 ease-in-out focus:outline-none",

  toggleEnabled: "bg-black",

  toggleDisabled: "bg-black/10",

  toggleThumb: "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-300 ease-in-out",

  toggleThumbActive: "translate-x-6",

  toggleThumbInactive: "translate-x-1",

  // State Info
  loadingState: "text-base text-black/40 text-center py-10 animate-pulse font-light",
  errorState: "text-base text-red-500 text-center py-10 font-light",
  subtitle: "px-4 py-1.5 border border-transparent rounded-[14px] text-sm font-medium mb-14 text-center transition-all duration-[100ms] ease-in-out w-fit mx-auto",
  maxSelectedEffect: "bg-black/[0.06] border-black/10 text-black shadow-sm",
} as const;
