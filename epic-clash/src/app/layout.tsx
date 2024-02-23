import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Epic Clash",
  description: "The best game ever made",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children} <Toaster position="top-center" richColors toastOptions={{
        className: "font-8bit",
      }} /></body>
    </html>
  );
}
