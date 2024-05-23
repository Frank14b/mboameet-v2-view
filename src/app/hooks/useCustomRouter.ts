import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useMainContext } from "../contexts/main";
import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";

const useCustomRouter = () => {
  //
  const router = useRouter();
  const { setNavigationChange } = useMainContext();
  const pathname = usePathname();

  const push = useCallback(
    (link: string, options?: NavigateOptions | undefined) => {
      if (pathname != link) {
        setNavigationChange("start");
      }
      router.push(link, options);
    },
    [router, pathname, setNavigationChange]
  );

  const replace = useCallback(
    (link: string, options?: NavigateOptions | undefined) => {
      if (pathname != link) {
        setNavigationChange("start");
      }
      router.replace(link, options);
    },
    [router, pathname, setNavigationChange]
  );

  const customRouter = { push, replace };

  return customRouter;
};

export default useCustomRouter;
