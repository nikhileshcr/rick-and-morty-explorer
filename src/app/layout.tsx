import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import NavBar from "@/components/navbar";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Wiki - Rick and Morty",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <NavBar></NavBar>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
