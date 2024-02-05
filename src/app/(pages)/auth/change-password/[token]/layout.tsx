import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "MboaMeet App | Change Password",
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
