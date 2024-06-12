import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "MboaMeet App | Market Place | Shopping Cart",
    description: "Find your perfect matches",
};

export default function ShoppingCartLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>{children}</>
    );
}
