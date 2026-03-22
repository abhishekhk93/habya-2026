import React, { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  btnType?: "primary" | "small" | "secondary";
  type?: "button" | "submit" | "reset";
};

function Button({ children, disabled = false, btnType = "primary", type = "button" }: ButtonProps) {
  const base =
    "w-full mt-4 py-2 px-2 bg-black text-white font-medium rounded-xl hover:bg-black/90 active:scale-[0.98] transition-all duration-200 shadow-xl shadow-black/20";

  const styles: Record<NonNullable<ButtonProps["btnType"]>, string> = {
    primary: base,
    small: base + " px-4 py-2 md:px-5 md:py-2.5 text-xs",
    secondary:
      "inline-block text-sm rounded-full border-2 border-stone-300 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-300 focus:text-stone-800 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5",
  };

  return (
    <button disabled={disabled} className={styles[btnType]} type={type}>
      {children}
    </button>
  );
}

export default Button;