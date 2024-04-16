"use client";

import { FeedWrapper } from "./contexts/pages/feeds";

export default function Template({ children }: { children: React.ReactNode }) {
  //render the page
  return <FeedWrapper>{children}</FeedWrapper>;
}
