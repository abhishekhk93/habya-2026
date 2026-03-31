import type { Metadata } from "next";
import { StoreProvider } from "@/components/providers/StoreProvider";
import { Navbar } from "@/components/common/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Habya 2026",
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
        <StoreProvider>
          <Navbar />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
