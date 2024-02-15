import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "MboaMeet App | Account Settings",
    description: "Find your perfect matches",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>{children}</>
    );
}
