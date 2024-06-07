"use client";

import { useMainContext } from "@/app/contexts/main";
import { useEffect, useState } from "react";

export default function NavigationLoadingComponent() {
  //
  const { navigationChange } = useMainContext();
  const [showLoader, setShowLoader] = useState<boolean>(false);

  useEffect(() => {
    if (navigationChange == "start") {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  }, [navigationChange, setShowLoader]);

  return (
    <>
      {showLoader && (
        <div className="fixed top-0 bottom-0 left-0 right-0 z-40 backdrop-blur-sm">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
          </span>
        </div>
      )}
    </>
  );
}
