"use client";

import Link from "next/link";
import { privacyPageStyles as s } from "./PrivacyPage.styles";

export function PrivacyPage() {
  return (
    <div className={s.wrapper}>
      <div className={s.card}>
        <h1 className={s.header}>Privacy Policy</h1>
        <p className={s.subtitle}>Last updated: April 2026</p>

        <div className={s.section}>
          <h2 className={s.sectionHeading}>1. What We Collect</h2>
          <ul className={s.list}>
            <li>Name and contact details</li>
            <li>Profile info like gender and age</li>
            <li>Payment info (via Razorpay)</li>
            <li>Event registration and usage data</li>
          </ul>
        </div>

        <div className={s.section}>
          <h2 className={s.sectionHeading}>2. How We Use It</h2>
          <p className={s.sectionDescription}>
            We use your info to register you for events, personalize experiences, process payments, and improve our platform.
          </p>
        </div>

        <div className={s.section}>
          <h2 className={s.sectionHeading}>3. Data Security</h2>
          <p className={s.sectionDescription}>
            Your data is protected through industry-standard practices. Sensitive data like payments are handled securely by Razorpay.
          </p>
        </div>

        <div className={s.section}>
          <h2 className={s.sectionHeading}>4. Your Rights</h2>
          <p className={s.sectionDescription}>
            You can request to access or delete your data at any time by contacting us at{" "}
            <a href="mailto:habyacoreteam@gmail.com" className={s.link}>
              habyacoreteam@gmail.com
            </a>.
          </p>
        </div>

        <div className={s.section}>
          <h2 className={s.sectionHeading}>5. Changes</h2>
          <p className={s.sectionDescription}>
            We may update this policy from time to time. Please review it periodically.
          </p>
        </div>

        <Link href="/" className={s.backLink}>
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
