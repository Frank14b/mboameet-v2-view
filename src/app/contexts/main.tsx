"use client";

import { createContext, useContext, useEffect } from "react";
// import { QueryClient, QueryClientProvider } from "react-query";
import { AppHubWrapper } from "./appHub";
import SideBarMenuComponent from "../components/commons/sidebarMenu";
import AsideBarMenuComponent from "../components/commons/asidebarMenu";
import useUserStore from "../store/userStore";
import { deleteToken, isTokenExpired } from "../lib/server-utils";
import { usePathname, useRouter } from "next/navigation";
import { sessionTimeOut } from "../lib/workers";
import { ObjectKeyDto, ResultloginDto } from "../types";

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

  const logout = async () => {
    deleteToken();
    setUserConnected(false);
    useUserStore.persist.clearStorage();

    setTimeout(() => {
      router.push("/auth/signin");
    }, 300);
  };

  const getFileUrl = (link: string) => {
    return `${process.env.NEXT_PUBLIC_API_PUBLIC_FILES_LINK}${user?.id}/${link}`;
  };

  const MainData: MainDataType = {
    connectedUser: user,
    theme: theme,
    setTheme: setTheme,
    logout: logout,
    getFileUrl: getFileUrl,
  };

  const checkExpiredToken = async () => {
    const expired = await isTokenExpired();
    if (expired) {
      logout();
    }
  };

  useEffect(() => {
    if (userConnected === true) {
      checkExpiredToken();
    }

    setLoading(false);
  }, [pathname, userConnected]);

  useEffect(() => {
    // initialize the session worker if user is connected
    if (userConnected === true) {
      sessionTimeOut({ logout });
    }

    setLoading(false);
  }, [userConnected]);

  return (
    <MainContext.Provider value={MainData}>
      {/* <QueryClientProvider client={queryClient}> */}
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
                        <div className="flex flex-col h-screen p-6 relative overflow-y-auto">
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
          </main>
        </>
      )}
      {/* </QueryClientProvider> */}
    </MainContext.Provider>
  );
}

export const useMainContext = (): MainDataType => useContext(MainContext);

export type MainDataType = {
  connectedUser: ResultloginDto | ObjectKeyDto | null;
  theme: string;
  setTheme: (userTheme: string) => void;
  logout: () => Promise<void>;
  getFileUrl: (link: string) => string;
};
