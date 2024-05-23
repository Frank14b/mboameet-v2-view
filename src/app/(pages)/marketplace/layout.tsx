import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "MboaMeet App | Market Place",
    description: "Find your perfect matches",
};

export default function MarketPlaceLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>{children}</>
    );
}
