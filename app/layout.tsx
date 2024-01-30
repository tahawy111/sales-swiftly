import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sales Swiftly",
  description:
    "Elevate your business with Sales Swiftly – the ultimate sales application designed to revolutionize your sales process. Increase productivity, close deals faster, and boost revenue effortlessly. Try Sales Swiftly today for a seamless sales experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
