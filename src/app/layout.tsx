import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MainWrapper } from "./contexts/main";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MboaMeet App",
  description: "Find your perfect matches",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <body className={inter.className}>
        <MainWrapper>
          {children}
        </MainWrapper>
      </body>
    </html>
  );
}
