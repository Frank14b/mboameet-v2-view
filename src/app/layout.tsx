import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MainWrapper } from "./contexts/main";
import { I18nProviderClient } from "./locales/client";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MboaMeet App",
  description: "Let's match and connect",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const locale = cookies().get("Next-Locale")?.value || "en";

  return (
    <html lang="en" className="bg-gray-200 dark:bg-gray-800">
      <body className={`${inter.className} bg-gray-200 dark:bg-gray-800`}>
        <I18nProviderClient locale={locale}>
          <MainWrapper>{children}</MainWrapper>
        </I18nProviderClient>
      </body>
    </html>
  );
}
