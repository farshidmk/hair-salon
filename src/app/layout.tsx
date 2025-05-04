import { vazirmatn } from "@/shared/fonts";
import type { Metadata } from "next";
import "./globals.css";
import ApplicationProviders from "@/providers/ApplicationProviders";

export const metadata: Metadata = {
  title: "💅 | سالن آرایشگاه",
  description: "رزرواسیون سالن آرایشگاه",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${vazirmatn.variable} antialiased font-vazirmatn`}
        suppressHydrationWarning
      >
        <ApplicationProviders>{children}</ApplicationProviders>
      </body>
    </html>
  );
}
