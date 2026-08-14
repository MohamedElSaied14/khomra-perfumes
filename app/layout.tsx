import type { Metadata } from "next";
import "./globals.css";
import "./fixes.css";
import AuthFab from "@/components/auth-fab";

export const metadata: Metadata = {
  title: "Khomra | عطور تترك أثرًا",
  description: "عطور نيش مختارة بعناية — اكتشف عطرك المميز من خمرة.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ar" dir="rtl" suppressHydrationWarning><body>{children}<AuthFab/></body></html>;
}
