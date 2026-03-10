import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yipei Personal Website",
  description: "Premium personal website stack with Next.js + Sanity + Supabase.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
