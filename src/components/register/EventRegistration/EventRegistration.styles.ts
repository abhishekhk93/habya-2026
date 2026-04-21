export const eventRegistrationStyles = {
  wrapper: "relative z-10 flex flex-col items-center justify-start min-h-[calc(100svh-72px)] sm:min-h-[calc(100svh-88px)] pt-6 pb-10 px-4",

  card: "w-[calc(100%-1rem)] sm:w-full max-w-[500px] my-auto flex flex-col bg-white rounded-[20px] px-6 pt-6 pb-10 sm:px-10 sm:pt-6 sm:pb-12 shadow-sm border border-[#d9d9d9]",

  header: "text-2xl font-light tracking-tight mb-2 text-center",


  // State Info
  loadingState: "text-base text-black/40 text-center py-10 animate-pulse font-light",

  errorState: "text-base text-red-500 text-center py-10 font-light",
  subtitle: "text-sm font-medium mb-14 text-center transition-all duration-[100ms] ease-in-out w-fit mx-auto",
  dividerContainer: "flex flex-col items-center w-full mb-4 mt-0",
  dividerText: "text-sm font-light text-center text-black/60",

  limitInfo: "mb-6 text-center text-[11px] sm:text-xs font-medium text-black/40",

  backdrop: "fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm",

  modal: "fixed inset-0 z-[80] flex items-start sm:items-center justify-center p-4",

  modalContent: "mt-20 sm:mt-0 w-full max-w-sm bg-white rounded-[20px] px-8 py-8 flex flex-col gap-6 shadow-xl border border-indigo-100",

  digitInput: "w-14 h-14 text-center text-xl font-semibold rounded-xl border focus:outline-none focus:ring-2 transition-all duration-150",

  digitInputFilled: "border-indigo-300 focus:ring-indigo-200 text-black bg-indigo-50/30",

  digitInputEmpty: "border-indigo-100 focus:ring-indigo-100 text-black/60 bg-transparent",

  errorPlaceholder: "text-xs text-center -mt-2 min-h-4",
  error: "text-red-500",

  cancelButton: "flex-1 py-2.5 rounded-xl border border-indigo-100 text-sm font-medium text-black hover:bg-indigo-50/50 transition-colors",

  submitButton: "flex-1 py-2.5 rounded-xl bg-white border-2 border-indigo-600 text-black text-sm font-medium transition-all disabled:opacity-30 hover:bg-indigo-50",
} as const;
