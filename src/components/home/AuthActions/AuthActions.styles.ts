export const authActionsStyles = {
  wrapper: [
    "mt-6",
    "sm:mt-8",
    "transition-all",
    "duration-1000",
    "ease-out",
  ].join(" "),

  hidden: "opacity-0 translate-y-8",
  visible: "opacity-100 translate-y-0",

  // Sign-in link
  signInLink: [
    "group",
    "flex",
    "items-center",
    "gap-3",
    "text-lg",
    "sm:text-xl",
    "font-light",
    "text-black/80",
    "hover:text-black",
    "transition-colors",
    "duration-300",
    "cursor-pointer",
  ].join(" "),

  signInIcon: [
    "flex",
    "items-center",
    "justify-center",
    "w-10",
    "h-10",
    "sm:w-12",
    "sm:h-12",
    "rounded-full",
    "border",
    "border-black/30",
    "group-hover:border-black/60",
    "group-hover:bg-black/5",
    "transition-all",
    "duration-300",
  ].join(" "),

  signInArrow: [
    "w-4",
    "h-4",
    "sm:w-5",
    "sm:h-5",
    "transition-transform",
    "duration-300",
    "group-hover:translate-x-0.5",
  ].join(" "),

  // Logged in text
  loggedInContainer: [
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "text-center",
    "gap-3",
    "w-[65vw]",
    "bg-gray-50/80",
    "backdrop-blur-md",
    "border",
    "border-black/10",
    "rounded-xl",
    "p-6",
    "sm:p-8",
    "shadow-sm",
  ].join(" "),

  loggedInText: [
    "text-lg",
    "sm:text-xl",
    "font-light",
    "text-black/80",
  ].join(" "),

  loggedInSubText: [
    "text-sm",
    "font-light",
    "text-black/60",
    "max-w-md",
  ].join(" "),
} as const;
