import { notification } from "@/app/lib/notifications";
import {
  ResultNavBarStatsDto,
} from "@/app/types";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { getAccountStats } from "../services/server-actions";
import useUserStore from "../store/userStore";

const useNavbarStats = () => {
  //
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [stats, setStats] = useState<ResultNavBarStatsDto | null>(null);
  const router = useRouter();
  const { userConnected } = useUserStore();

  const proceedGetStats = useCallback(async () => {
    const result = await getAccountStats();

    if (!result.status) {
      return notification.apiNotify(result);
    }
    if (!result.data) return router.push("/");

    setIsLoading(false);

    setStats(result.data);
  }, [router, setIsLoading, setStats]);

  useEffect(() => {
    if(!userConnected) return;
    proceedGetStats();
  }, [userConnected, proceedGetStats]);

  const data: NavBarHookDto = {
    isLoading,
    stats,
    setIsLoading,
  };

  return { ...data };
};

export default useNavbarStats;

export type NavBarHookDto = {
  isLoading: boolean;
  stats: ResultNavBarStatsDto | null;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};
