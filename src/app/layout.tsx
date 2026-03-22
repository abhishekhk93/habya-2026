import type { Metadata } from "next";
import "./globals.css";
import { Layout } from "@/layout";

export const metadata: Metadata = {
  title: "🏸Habya 2026",
  description: "Habya 2026 — Built with Next.js, TypeScript & Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
