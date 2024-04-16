import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "MboaMeet App | Sign Up",
    description: "Find your perfect matches",
};

export default function SignUpLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>{children}</>
    );
}
