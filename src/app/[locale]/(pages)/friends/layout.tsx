import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "MboaMeet App | Meet Friends",
    description: "Find your perfect matches",
};

export default function FriendsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>{children}</>
    );
}
