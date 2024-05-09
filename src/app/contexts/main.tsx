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
import SideBarMenuComponent from "../components/commons/sideBarMenu";
import AsideBarMenuComponent from "../components/commons/asideBarMenu";
import useUserStore from "../store/userStore";
import { deleteToken, isTokenExpired } from "../lib/server-utils";
import { usePathname, useRouter } from "next/navigation";
import { sessionTimeOut } from "../lib/workers";
import { ObjectKeyDto, ResultLoginDto } from "../types";
import { defaultProfileImg, mainDivComponentId } from "../lib/constants/app";
import { ToastContainer } from "react-toastify";
import { MobileSideBarMenuComponent } from "../components/commons/mobileSideBarMenu";
import useChatStore from "../store/chatStore";

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
  const { isDiscussionOpen, setOpenDiscussion } = useChatStore();

  const queryClient = new QueryClient();

  const logout = useCallback(async () => {
    deleteToken();
    setUserConnected(false);
    useUserStore.persist.clearStorage();

    setTimeout(() => {
      setLoading(false);
      window.location.reload();
    }, 300);
  }, [setUserConnected, setLoading]);

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
  }, [checkExpiredToken, userConnected]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, [setLoading]);

  useEffect(() => {
    if (isDiscussionOpen) {
      if (pathname === "/chats" || !pathname.startsWith("/chats")) {
        setOpenDiscussion(false);
      }
    }
  }, [isDiscussionOpen, pathname, setOpenDiscussion]);

  return (
    <MainContext.Provider value={MainData}>
      <QueryClientProvider client={queryClient}>
        {loading ? (
          <></>
        ) : (
          <>
            <main className={`${theme}`}>
              <AppHubWrapper>
                {userConnected === true && !pathname.startsWith("/auth") ? (
                  <>
                    <div className="mh-600 bg-gray-200 dark:bg-gray-800">
                      <div className="flex xxl:container">
                        <MobileSideBarMenuComponent></MobileSideBarMenuComponent>

                        <div className="w-1/4 csm:hidden xs:hidden xs:left-0 xs:w-[300px] xs:z-50 lg:relative bg-gray-100 dark:bg-gray-900 h-screen">
                          <SideBarMenuComponent>
                            <></>
                          </SideBarMenuComponent>
                        </div>

                        <div
                          className={`${
                            isDiscussionOpen ? "min-sm:w-full" : ""
                          } w-1/2 csm:w-full xs:w-full lg:w-1/2 bg-gray-100 dark:bg-gray-900`}
                        >
                          <div
                            className="flex flex-col h-screen p-6 relative overflow-y-auto"
                            id={mainDivComponentId}
                          >
                            {children}
                          </div>
                        </div>

                        <div
                          className={`${
                            isDiscussionOpen ? "min-sm:hidden" : ""
                          } w-1/4 sm:w-1/3 csm:hidden lg:w-1/4 xs:right-0 xs:z-50 xs:w-[300px] xs:px-6 px-3 bg-gray-100 dark:bg-gray-900`}
                        >
                          <div className="flex flex-col h-screen pt-6 overflow-y-auto">
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
