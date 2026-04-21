export const footerStyles = {
  footer: "w-full py-8 mt-auto flex flex-col items-center justify-center gap-2 border-t border-black/5 bg-transparent",
  content: "flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm font-light text-black/40",
  copyright: "whitespace-nowrap",
  divider: "hidden sm:inline text-black/20",
  links: "flex items-center gap-3 sm:gap-4",
  link: "hover:text-black hover:underline transition-all duration-200",
  linkDivider: "text-black/20 text-[10px] sm:text-xs",
} as const;
