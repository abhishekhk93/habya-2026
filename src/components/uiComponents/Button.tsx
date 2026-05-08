import React, { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
  btnType?: "primary" | "small";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
};

function Button({ children, disabled = false, isLoading = false, btnType = "primary", type = "button", onClick, style, className = "" }: ButtonProps) {
  const base =
    "self-center w-[75%] sm:w-3/4 py-2 text-lg font-bold text-black bg-white border border-black hover:bg-black/[0.03] active:bg-black/[0.08] rounded-[14px] transition-colors duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed px-2 flex items-center justify-center gap-2";

  const styles: Record<NonNullable<ButtonProps["btnType"]>, string> = {
    primary: base + " mt-10 " + className,
    small: base + " px-4 py-2 md:px-5 md:py-2.5 text-xs " + className
  };

  return (
    <button disabled={disabled || isLoading} className={styles[btnType]} type={type} onClick={onClick} style={style}>
      {isLoading && (
        <svg className="animate-spin h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
}

export default Button;