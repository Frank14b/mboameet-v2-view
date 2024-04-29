"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { QueryClient, QueryClientProvider, useQueryClient } from "react-query";
import { AppHubWrapper } from "./appHub";
import SideBarMenuComponent from "../components/commons/sidebarMenu";
import AsideBarMenuComponent from "../components/commons/asidebarMenu";
import useUserStore from "../store/userStore";
import { deleteToken, isTokenExpired } from "../lib/server-utils";
import { usePathname, useRouter } from "next/navigation";
import { sessionTimeOut } from "../lib/workers";
import { ObjectKeyDto, ResultLoginDto } from "../types";
import { defaultProfileImg, loginPathUrl, mainDivComponentId } from "../lib/constants/app";
import { ToastContainer } from "react-toastify";
import { bool, boolean } from "yup";

const MainContext = createContext<any>({});

export function MainWrapper({ children }: { children: any }) {
  const {
    userConnected,
    setUserConnected,
    user,
    loading,
    setLoading,
    theme,
    setTheme,
  } = useUserStore();
  const router = useRouter();
  const pathname = usePathname();
  const [mainScroll, setMainScroll] = useState<any>(null);

  const queryClient = new QueryClient();

  const logout = useCallback(async () => {
    deleteToken();
    setUserConnected(false);
    useUserStore.persist.clearStorage();

    setTimeout(() => {
      router.push(loginPathUrl);
    }, 300);
  }, [router, setUserConnected]);

  const getFileUrl = useCallback(
    (link?: string, userId?: number) => {
      //
      if (!link || link.length == 0) {
        return defaultProfileImg;
      }
      return `${process.env.NEXT_PUBLIC_API_PUBLIC_FILES_LINK}${
        userId ?? user?.id
      }/${link}`;
    },
    [user]
  );

  const MainData: MainContextDto = {
    userConnected,
    connectedUser: user,
    theme: theme,
    mainScroll,
    setTheme,
    logout,
    getFileUrl,
    setMainScroll,
  };

  const checkExpiredToken = useCallback(async () => {
    const expired = await isTokenExpired();
    if (expired) {
      logout();
    }
  }, [logout]);

  useEffect(() => {
    if (userConnected === true) {
      checkExpiredToken();
    }
    setLoading(false);
  }, [checkExpiredToken, setLoading, userConnected]);

  useEffect(() => {
    // initialize the session worker if user is connected
    if (userConnected === true) {
      sessionTimeOut({ logout });
    }
  }, [userConnected, logout, setLoading]);

  return (
    <MainContext.Provider value={MainData}>
      <QueryClientProvider client={queryClient}>
        {loading ? (
          <></>
        ) : (
          <>
            <main className={`${theme}`}>
              <AppHubWrapper>
                {userConnected === true ? (
                  <>
                    <div className="mh-600 bg-gray-200 dark:bg-gray-800">
                      <div className="flex xxl:container">
                        <div className="w-1/4 sm:fixed xs:fixed xs:left-0 xs:w-[300px] xs:z-50 lg:relative bg-gray-100 dark:bg-gray-900 h-screen">
                          <SideBarMenuComponent>
                            <></>
                          </SideBarMenuComponent>
                        </div>

                        <div className="w-1/2 sm:w-full xs:w-full lg:w-1/2 bg-gray-100 z-10 dark:bg-gray-900">
                          <div
                            className="flex flex-col h-screen p-6 relative overflow-y-auto"
                            id={mainDivComponentId}
                          >
                            {children}
                          </div>
                        </div>

                        <div className="w-1/4 sm:w-1/3 xs:fixed lg:w-1/4 xs:right-0 xs:z-50 xs:w-[300px] xs:px-6 px-3 bg-gray-100 dark:bg-gray-900">
                          <div className="flex flex-col h-screen pt-6 overflow-y-auto dark:text-gray-300">
                            <AsideBarMenuComponent>
                              <></>
                            </AsideBarMenuComponent>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>{pathname.startsWith("/auth") ? children : <></>}</>
                )}
              </AppHubWrapper>

              <ToastContainer />
            </main>
          </>
        )}
      </QueryClientProvider>
    </MainContext.Provider>
  );
}

export const useMainContext = (): MainContextDto => useContext(MainContext);

export type MainContextDto = {
  userConnected: boolean;
  connectedUser: ResultLoginDto | ObjectKeyDto | null;
  theme: string;
  mainScroll: any;
  setTheme: (userTheme: string) => void;
  logout: () => Promise<void>;
  getFileUrl: (link?: string, userId?: number) => string;
  setMainScroll: Dispatch<SetStateAction<any>>;
};
