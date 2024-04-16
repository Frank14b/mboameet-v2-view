import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "MboaMeet App | Discussions",
    description: "Find your perfect matches",
};

export default function ChatLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>{children}</>
    );
}
