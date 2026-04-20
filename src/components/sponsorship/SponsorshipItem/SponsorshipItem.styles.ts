export const sponsorshipItemStyles = {
  item: "flex flex-col rounded-[14px] border border-black/[0.15] transition-all duration-300 overflow-hidden",
  main: "p-4 sm:p-5",
  headerRow: "flex items-center gap-3 w-full mb-1",
  name: "text-base sm:text-lg font-medium text-black flex-1",
  amountBadge: "w-[92px] flex justify-center px-2.5 py-0.5 rounded-full text-[13px] sm:text-sm font-bold text-black/70 tabular-nums border whitespace-nowrap",
  subtitle:
    "w-full text-[13px] sm:text-sm font-light overflow-hidden transition-all duration-300",
  subtitleActive:
    "max-h-20 opacity-100 pointer-events-auto border-t border-black/10 bg-green-50/70 px-4 sm:px-5 py-3",
  subtitleInactive: "max-h-0 opacity-0 pointer-events-none",
  toggleWrapper: "relative inline-flex h-[22px] w-[40px] shrink-0 cursor-pointer items-center rounded-full transition-colors duration-300 ease-in-out focus:outline-none",
  toggleEnabled: "bg-emerald-600",
  toggleDisabled: "bg-emerald-100",
  toggleThumb: "pointer-events-none inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm ring-0 transition duration-300 ease-in-out",
  toggleThumbActive: "translate-x-[20px]",
  toggleThumbInactive: "translate-x-[4px]",
  customInputContainer: "mt-2 flex flex-col gap-1.5",
  customInputLabel: "text-[10px] font-bold uppercase tracking-wider text-black/30",
  customInput: "w-full bg-white border border-black/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black/30 transition-colors",
  warningMessage: "mt-2 text-[11px] font-medium text-red-500/80 animate-pulse",
} as const;
