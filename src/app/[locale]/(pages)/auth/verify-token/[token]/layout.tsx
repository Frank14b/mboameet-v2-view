import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "MboaMeet App | Veirfy Auth Token",
    description: "Find your perfect matches",
};

export default function VerifyTokenLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>{children}</>
    );
}
