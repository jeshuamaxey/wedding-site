import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sinéad & Jeshua",
  description: "28.08.2027 — Connemara, Ireland",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
