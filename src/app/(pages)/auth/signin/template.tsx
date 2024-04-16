"use client";

import { SignInWrapper } from "@/app/contexts/pages/auth/signIn";

export default function Template({ children }: { children: React.ReactNode }) {
  //render the page
  return <SignInWrapper>{children}</SignInWrapper>;
}