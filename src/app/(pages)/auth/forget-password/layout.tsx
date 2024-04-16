import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "MboaMeet App | Forget Password",
    description: "Find your perfect matches",
};

export default function ForgetPasswordLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>{children}</>
    );
}
