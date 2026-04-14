export const eventRegistrationStyles = {
  wrapper: "relative z-10 flex flex-col items-center justify-center min-h-[100dvh] py-10 px-4",

  card: "w-[calc(100%-1rem)] sm:w-full max-w-[500px] mx-auto flex flex-col bg-white rounded-[20px] px-8 pt-2 pb-10 sm:px-12 sm:pt-2 sm:pb-12 my-8",

  header: "text-2xl font-light tracking-tight mb-2 text-center",


  // State Info
  loadingState: "text-base text-black/40 text-center py-10 animate-pulse font-light",

  errorState: "text-base text-red-500 text-center py-10 font-light",
  subtitle: "px-4 py-1.5 border border-transparent rounded-[14px] text-sm font-medium mb-14 text-center transition-all duration-[100ms] ease-in-out w-fit mx-auto",
  maxSelectedEffect: "bg-black/[0.06] border-black/10 text-black shadow-sm",

  limitInfo: "mb-6 text-center text-[11px] sm:text-xs font-medium text-black/40",

  backdrop: "fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm",

  modal: "fixed inset-0 z-[80] flex items-center justify-center p-4",

  modalContent: "w-full max-w-sm bg-white rounded-[20px] px-8 py-8 flex flex-col gap-6 shadow-xl",

  digitInput: "w-14 h-14 text-center text-xl font-semibold rounded-xl border focus:outline-none focus:ring-2 transition-all duration-150",

  digitInputFilled: "border-black/30 focus:ring-black/20 text-black",

  digitInputEmpty: "border-black/10 focus:ring-black/10 text-black/60",

  errorPlaceholder: "text-xs text-center -mt-2 min-h-4",
  error: "text-red-500",

  cancelButton: "flex-1 py-2.5 rounded-xl border border-black/10 text-sm font-medium text-black/60 hover:bg-black/5 transition-colors",

  submitButton: "flex-1 py-2.5 rounded-xl bg-black text-white text-sm font-medium transition-opacity disabled:opacity-30",
} as const;
