import React, { ReactNode } from "react";

type PageTitleProps = {
  children: ReactNode;
  type?: "light" | "dark";
};

function PageTitle({ children, type = "light" }: PageTitleProps) {
  const base = "text-3xl font-bold tracking-tight mb-2 text-center";

  const styles: Record<NonNullable<PageTitleProps["type"]>, string> = {
    light: base + " text-black",
    dark: base + " text-white",
  };

  return (
    <h1 className={styles[type]}>
      {children}
    </h1>
  );
}

export default PageTitle;