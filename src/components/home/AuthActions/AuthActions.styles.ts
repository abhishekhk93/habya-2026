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
} as const;
