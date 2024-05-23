import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MboaMeet App | Administration | Stores",
  description: "Find your perfect matches",
};

export default function ManageStoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
