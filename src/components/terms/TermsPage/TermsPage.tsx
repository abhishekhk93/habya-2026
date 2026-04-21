"use client";

import Link from "next/link";
import { termsPageStyles as s } from "./TermsPage.styles";

export function TermsPage() {
  return (
    <div className={s.wrapper}>
      <div className={s.card}>
        <h1 className={s.header}>Terms & Conditions</h1>
        <p className={s.subtitle}>Last updated: April 2026</p>

        <div className={s.section}>
          <h2 className={s.sectionHeading}>1. Eligibility</h2>
          <p className={s.sectionDescription}>
            Users must provide accurate information during registration. False or misleading info can result in disqualification.
          </p>
        </div>

        <div className={s.section}>
          <h2 className={s.sectionHeading}>2. Refund & Cancellation</h2>
          <div className={s.sectionDescription}>
            <ol className={s.orderedList}>
              <li>Cancellation and refunds are not processed on the portal. Contact the admins if you seek cancellation of events.</li>
              <li>No refunds for events within 24 hours of tournament start date.</li>
              <li>Email requests to{" "}
                <a href="mailto:habyacoreteam@gmail.com" className={s.emailLink}>
                  habyacoreteam@gmail.com
                </a>
              </li>
            </ol>
          </div>
        </div>

        <div className={s.section}>
          <h2 className={s.sectionHeading}>3. Shipping</h2>
          <p className={s.sectionDescription}>
            We do not offer physical shipping. All services are digital or in-person event-based.
          </p>
        </div>

        <div className={s.section}>
          <h2 className={s.sectionHeading}>4. Response Time</h2>
          <p className={s.sectionDescription}>
            Support queries sent to Havyaka Habya Badminton Association are answered within 1–2 business days.
          </p>
        </div>

        <div className={s.section}>
          <h2 className={s.sectionHeading}>5. Updates</h2>
          <p className={s.sectionDescription}>
            We may revise these terms. Continued use means you agree to the latest version.
          </p>
        </div>

        <div className={s.section}>
          <h2 className={s.sectionHeading}>6. Contact Us</h2>
          <p className={s.sectionDescription}>
            We are located at 1015, The Magic Faraway Tree, 33/2, Kanakapura Main Road, Talaghattapura Post, Bengaluru 560062.
          </p>
          <p className={s.sectionDescription}>
            Email:{" "}
            <a href="mailto:habyacoreteam@gmail.com" className={s.emailLink}>
              habyacoreteam@gmail.com
            </a>
          </p>
          <p className={s.sectionDescription}>
            Phone:{" "}
            <a href="tel:+919741094297" className={s.emailLink}>
              +91 97410-94297
            </a>
          </p>
          <p className={s.sectionDescription}>
            Response time: 1-2 business days
          </p>
        </div>

        <Link href="/" className={s.backLink}>
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
