import type { Metadata } from "next";
import { cookies } from "next/headers";
import { StoreProvider } from "@/components/providers/StoreProvider";
import { Navbar } from "@/components/common/Navbar";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";
import "./globals.css";

export const metadata: Metadata = {
  title: "Habya 2026",
  description: "Habya 2026 — Built with Next.js, TypeScript & Tailwind CSS",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Read and verify the auth cookie on the server so we can pre-seed Redux
  // with the correct session state before the first client render.
  let initialUser = null;
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (token) {
      initialUser = verifyToken(token);
    }
  } catch {
    // Token missing or invalid — treat as logged out
  }

  return (
    <html lang="en">
      <body>
        <StoreProvider initialUser={initialUser}>
          <Navbar />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
