import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MainWrapper } from "./contexts/main";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MboaMeet App",
  description: "Let's match and connect",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // interactiveWidget: 'resizes-visual',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <body className={inter.className}>
        <MainWrapper>{children}</MainWrapper>
      </body>
    </html>
  );
}
