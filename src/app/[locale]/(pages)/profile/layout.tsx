import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "MboaMeet App | User Profile",
    description: "Find your perfect matches",
};

export default function ProfileLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>{children}</>
    );
}
