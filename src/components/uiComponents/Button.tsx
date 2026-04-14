import React, { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  btnType?: "primary" | "small";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  style?: React.CSSProperties;
};

function Button({ children, disabled = false, btnType = "primary", type = "button", onClick, style }: ButtonProps) {
  const base =
    "self-center w-[75%] sm:w-3/4 py-2 text-lg font-bold text-black bg-white border border-black hover:bg-black/[0.03] active:bg-black/[0.08] rounded-[14px] transition-colors duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed px-2";

  const styles: Record<NonNullable<ButtonProps["btnType"]>, string> = {
    primary: base + " mt-10",
    small: base + " px-4 py-2 md:px-5 md:py-2.5 text-xs"
  };

  return (
    <button disabled={disabled} className={styles[btnType]} type={type} onClick={onClick} style={style}>
      {children}
    </button>
  );
}

export default Button;