import React, { ReactNode } from "react";

type PageSubtitleProps = {
  children: ReactNode;
  type?: "light" | "dark";
};

function PageSubtitle({ children, type = "light"  }: PageSubtitleProps) {

  const base = "text-sm font-light mb-4 text-center";

  const styles: Record<NonNullable<PageSubtitleProps["type"]>, string> = {
    light: base + " text-black/60",
    dark: base + " text-white/60",
  };

  return (
    <p className={styles[type]}>
      {children}
    </p>
  );
}

export default PageSubtitle;