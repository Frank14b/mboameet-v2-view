"use client";

import { ProfileWrapper } from "@/app/contexts/pages/profile";

export default function Template({ children }: { children: React.ReactNode }) {
  //render the page
  return <ProfileWrapper>{children}</ProfileWrapper>;
}