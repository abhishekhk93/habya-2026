export const signInFormStyles = {
  wrapper: "relative z-10 flex flex-col items-center justify-center min-h-[100dvh] py-10 px-4",

  card: "w-[calc(100%-1rem)] sm:w-full max-w-[420px] mx-auto flex flex-col bg-white rounded-[20px] px-8 py-10 sm:px-12 sm:py-12 my-8",

  header: "text-3xl sm:text-4xl font-light text-black text-center mb-10",

  form: "flex flex-col gap-6 sm:gap-8",

  inputGroup: "flex flex-col gap-1",

  label: "text-base font-medium text-black",

  input: "w-full text-lg font-light text-black bg-transparent border-b border-black/40 focus:border-black outline-none transition-colors duration-300",

  select: "w-full text-lg font-light text-black bg-transparent border-b border-black/40 focus:border-black outline-none transition-colors duration-300 appearance-none cursor-pointer rounded-none",

  submitButton: "mt-10 self-center w-[75%] sm:w-3/4 py-2 text-xl font-bold text-black bg-white border border-black hover:bg-black/[0.03] active:bg-black/[0.08] rounded-[14px] transition-colors duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed",

  error: "text-sm font-light text-red-500 text-center",

  toggleContainer: "mt-8 text-center text-sm font-medium text-black/80",

  toggleLink: "text-black font-bold hover:underline ml-1 cursor-pointer",

  infoBox: "flex flex-col justify-center bg-black/[0.03] border border-black/5 rounded-xl p-5 min-h-[136px] sm:min-h-[150px] text-sm leading-relaxed font-light text-black/70",

  backLink: "mt-6 text-sm font-medium text-black/40 hover:text-black/70 text-center transition-colors duration-200",
} as const;
