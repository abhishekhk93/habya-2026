import React, { ReactNode } from "react";

type PageSubtitleProps = {
  children: ReactNode;
};

function PageSubtitle({ children }: PageSubtitleProps) {
  const styles = "text-sm font-light text-black/60 mb-8 text-center";

  return (
    <p className={styles}>
      {children}
    </p>
  );
}

export default PageSubtitle;