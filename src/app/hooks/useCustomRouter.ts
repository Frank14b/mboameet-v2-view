import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useMainContext } from "../contexts/main";
import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";

const useCustomRouter = () => {
  //
  const router = useRouter();
  const { setNavigationChange } = useMainContext();

  const push = useCallback(
    (link: string, options?: NavigateOptions | undefined) => {
      setNavigationChange("start");
      router.push(link, options);
    },
    [router, setNavigationChange]
  );

  const replace = useCallback(
    (link: string, options?: NavigateOptions | undefined) => {
      setNavigationChange("start");
      router.replace(link, options);
    },
    [router, setNavigationChange]
  );

  const customRouter = { push, replace };

  return customRouter;
};

export default useCustomRouter;
