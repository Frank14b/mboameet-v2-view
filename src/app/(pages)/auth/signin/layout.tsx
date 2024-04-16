import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "MboaMeet App | Sign In",
    description: "Find your perfect matches",
};

export default function SignInLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>{children}</>
    );
}
