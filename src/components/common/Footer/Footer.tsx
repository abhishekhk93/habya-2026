"use client";

import Link from "next/link";
import { footerStyles as s } from "./Footer.styles";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={s.footer}>
      <div className={s.content}>
        <span className={s.copyright}>
          © {currentYear} Habya. All rights reserved.
        </span>
        <span className={s.divider}>|</span>
        <div className={s.links}>
          <Link href="/privacy" className={s.link} prefetch={false}>
            Privacy policy
          </Link>
          <span className={s.linkDivider}>|</span>
          <Link href="/terms" className={s.link} prefetch={false}>
            Terms & conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}
