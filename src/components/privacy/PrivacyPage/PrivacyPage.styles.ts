export const privacyPageStyles = {
  wrapper: "relative z-10 flex flex-col items-center justify-start min-h-[calc(100svh-72px)] sm:min-h-[calc(100svh-88px)] pt-6 pb-20 px-4",
  card: "w-[calc(100%-1rem)] sm:w-full max-w-[600px] my-auto flex flex-col bg-white rounded-[20px] px-6 pt-6 pb-10 sm:px-10 sm:pt-10 sm:pb-16 shadow-sm border border-[#d9d9d9]",
  header: "text-2xl font-light tracking-tight mb-2 text-center",
  subtitle: "text-sm font-medium mb-10 text-center text-black/60",
  section: "mb-8 last:mb-0",
  sectionHeading: "text-base font-semibold mb-2 text-black/80",
  sectionDescription: "text-sm font-light text-black/60 leading-relaxed",
  list: "list-disc list-inside text-sm font-light text-black/60 space-y-1 ml-2",
  link: "text-indigo-600 hover:underline font-medium",
  backLink: "mt-10 text-sm font-medium text-black/40 hover:text-black/70 text-center transition-colors duration-200 block",
} as const;
