import React, { ReactNode } from "react";

type PageTitleProps = {
  children: ReactNode;
};

function PageTitle({ children }: PageTitleProps) {
  const styles = "text-3xl font-bold text-black tracking-tight mb-2 text-center";

  return (
    <h1 className={styles}>
      {children}
    </h1>
  );
}

export default PageTitle;