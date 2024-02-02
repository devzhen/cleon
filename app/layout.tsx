import type { Metadata } from "next";

import "./globals.css";

import StyledComponentsRegistry from "../lib/registry";

export const metadata: Metadata = {
  title: "Cleon",
  description: "Cleon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
