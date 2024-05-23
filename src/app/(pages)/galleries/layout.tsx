import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "MboaMeet App | Galleries",
    description: "Find your perfect matches",
};

export default function GalleryLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>{children}</>
    );
}
