import { vazirmatn } from "@/shared/fonts";
import type { Metadata } from "next";
import * as React from "react";
import "./globals.css";
import AppProviders from "@/providers/AppProviders";

export const metadata: Metadata = {
  title: "رزرواسیون سالن زیبایی",
  description: "رزرو وقت به صورت آنلاین، مشاهده آرایشگران ",
};

export default function ApplicationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className={`${vazirmatn.variable} antialiased font-vazirmatn `} suppressHydrationWarning>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
