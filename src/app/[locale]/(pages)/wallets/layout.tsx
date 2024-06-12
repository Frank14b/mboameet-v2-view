import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "MboaMeet App | My Wallets",
    description: "Let's match and connect",
};

export default function WalletsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>{children}</>
    );
}
