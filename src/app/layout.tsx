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
      {/* <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head> */}
      <body className={inter.className}>
        <MainWrapper>{children}</MainWrapper>
      </body>
    </html>
  );
}
