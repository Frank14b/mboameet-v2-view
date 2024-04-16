"use client";

import { SignUpWrapper } from "@/app/contexts/pages/auth/signUp";

export default function Template({ children }: { children: React.ReactNode }) {
    return <SignUpWrapper>{children}</SignUpWrapper>
}