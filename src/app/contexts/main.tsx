"use client";

import {
  Dispatch,
  RefObject,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AppHubWrapper } from "./appHub";
import useUserStore from "../store/userStore";
import { deleteToken } from "../lib/server-utils";
import { usePathname } from "next/navigation";
import { ObjectKeyDto, ResultLoginDto, ThemeDto } from "../types";
import {
  administrationPathUrl,
  authStartPath,
  defaultProfileImg,
  loginPathUrl,
  mainDivComponentId,
  marketplacePathUrl,
} from "../lib/constants/app";
import { ToastContainer } from "react-toastify";
import { MobileSideBarMenuComponent } from "@/app/components/commons/MobileSideBarMenu";
import { configs } from "../../../app.config";
import { validateToken } from "../services/server-actions";
import NavigationLoadingComponent from "@/app/components/commons/NavigationLoading";
import useLocalStorage from "../hooks/useLocalStorage";
import { nonProtectedPages } from "../middlewares/AuthMiddleware";
import AsideBarMenuComponent from "@/app/components/commons/AsideBarMenu";
import SideBarMenuComponent from "@/app/components/commons/SideBarMenu";
import { generateInitialsImage } from "../lib/utils";
import useCustomRouter from "../hooks/useCustomRouter";
import { notification } from "../lib/notifications";

const MainContext = createContext<any>({});

export function MainWrapper({ children }: { children: any }) {
  const {
    userConnected,
    user,
    loading,
    theme,
    setLoading,
    setUserConnected,
    setUser,
    setTheme,
  } = useUserStore();
  const pathname = usePathname();
  const [mainScroll, setMainScroll] = useState<any>(null);
  const [navigationChange, setNavigationChange] =
    useState<NavigationChangeType>("stop");
  const [currentLink, setCurrentLink] = useState<string>("/");
  const { clear } = useLocalStorage();
  const [canRemoveAsideBar, setCanRemoveAsideBar] = useState<boolean>(false);
  const [canRemoveNavBar, setCanRemoveNavBar] = useState<boolean>(false);
  const mainDivComponentRef = useRef<HTMLDivElement>(null);
  const { push } = useCustomRouter();

  const isAccessingNonProtectedPage = useCallback(() => {
    for (let i = 0; i < nonProtectedPages.length; i++) {
      if (pathname.startsWith(nonProtectedPages[i])) {
        return true;
      }
    }
    return false;
  }, [pathname]);

  useEffect(() => {
    setCurrentLink(pathname);
  }, [pathname, setCurrentLink]);

  useEffect(() => {
    if (currentLink == pathname) return;

    if (
      pathname.startsWith(`${marketplacePathUrl}`) ||
      pathname.startsWith(administrationPathUrl.baseUrl)
    ) {
      setCanRemoveAsideBar(true);
      setCanRemoveNavBar(true);
    } else {
      setCanRemoveAsideBar(false);
      setCanRemoveNavBar(false);
    }

    return () => {
      setNavigationChange("stop");
    };
  }, [pathname, currentLink, setNavigationChange]);

  // const queryClient = new QueryClient();

  const logout = useCallback(async () => {
    await deleteToken();
    setUserConnected(false);
    useUserStore.persist.clearStorage();
    clear();

    if (isAccessingNonProtectedPage()) return;

    setTimeout(() => {
      push(`${loginPathUrl}`);
    }, 300);
  }, [setUserConnected, push, clear, isAccessingNonProtectedPage]);

  const deleteAccount = useCallback(async () => {}, []);

  const getFileUrl = useCallback(
    (link?: string, userId?: number, name?: string) => {
      //
      if (!link || link.length == 0) {
        const imageFromInitial = generateInitialsImage(
          `${name}`,
          theme == "dark" ? "#777" : "#f0f0f0"
        );
        if (imageFromInitial.length > 1) return imageFromInitial;

        return defaultProfileImg;
      }
      if (link.startsWith("http")) return link;

      return `${configs.PUBLIC_FILES_LINK}${userId}/${link}`;
    },
    [theme]
  );

  const validateUserSession = useCallback(async () => {
    setTimeout(async () => {
      const result = await validateToken();

      setLoading(false);

      if (result.status) {
        setUser({
          ...result.data,
          photo: getFileUrl(
            result.data?.photo,
            result.data?.id,
            result.data?.userName
          ),
        });
        setUserConnected(true);
      } else {
        if (result.statusCode == 401) {
          await logout();
        } else if (result.statusCode == 4040) {
          notification.apiNotify(result);
        }
      }
    }, 1000);
  }, [logout, setUser, getFileUrl, setUserConnected, setLoading]);

  const MainData: MainContextDto = {
    userConnected,
    connectedUser: user,
    theme: theme,
    mainScroll,
    navigationChange,
    mainDivComponentRef,
    isDark: theme === 'dark',
    setNavigationChange,
    setTheme,
    logout,
    getFileUrl,
    setMainScroll,
    deleteAccount,
  };

  useEffect(() => {
    validateUserSession();
  }, [validateUserSession]);

  return (
    <MainContext.Provider value={MainData}>
      {loading ? (
        <></>
      ) : (
        <>
          <main className={`${theme}`}>
            <AppHubWrapper>
              {userConnected === true && !pathname.startsWith(authStartPath) ? (
                <>
                  <div className="mh-600 bg-gray-200 dark:bg-gray-800">
                    <div className="flex max-w-[1600px] m-auto">
                      <MobileSideBarMenuComponent
                        enable={canRemoveNavBar}
                        isMarketPlace={canRemoveNavBar}
                      ></MobileSideBarMenuComponent>

                      <div
                        className={`${
                          canRemoveNavBar
                            ? "hidden"
                            : "w-1/4 csm:hidden xs:hidden xs:left-0 xs:w-[300px] xs:z-50 lg:relative bg-gray-100 dark:bg-gray-900 h-screen"
                        }`}
                      >
                        <SideBarMenuComponent>
                          <></>
                        </SideBarMenuComponent>
                      </div>

                      <div
                        className={`${
                          canRemoveAsideBar ? "min-sm:w-full" : ""
                        } w-1/2 csm:w-full xs:w-full lg:w-1/2 bg-gray-100 dark:bg-gray-900`}
                      >
                        <div
                          className="flex flex-col h-screen pt-6 pb-6 relative overflow-y-auto large:px-5"
                          id={mainDivComponentId}
                          ref={mainDivComponentRef}
                        >
                          {children}
                        </div>
                      </div>

                      <div
                        className={`${
                          canRemoveAsideBar ? "min-sm:hidden" : ""
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
                <>
                  {isAccessingNonProtectedPage() && (
                    <>
                      {!pathname.startsWith(authStartPath) ? (
                        <>
                          <div className="mh-600 bg-gray-200 dark:bg-gray-800">
                            <div className="flex max-w-[1600px] m-auto">
                              <MobileSideBarMenuComponent
                                enable={canRemoveNavBar}
                                isMarketPlace={canRemoveNavBar}
                              ></MobileSideBarMenuComponent>

                              <div
                                className={`${
                                  canRemoveAsideBar ? "min-sm:w-full" : ""
                                } w-1/2 csm:w-full xs:w-full lg:w-1/2 bg-gray-100 dark:bg-gray-900`}
                              >
                                <div
                                  className="flex flex-col h-screen p-6 relative overflow-y-auto"
                                  id={mainDivComponentId}
                                  ref={mainDivComponentRef}
                                >
                                  {children}
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex xs:grid max-w-[1600px] m-auto">
                            {" "}
                            {children}
                            <MobileSideBarMenuComponent
                              enable={true}
                              isMarketPlace={canRemoveNavBar}
                            ></MobileSideBarMenuComponent>{" "}
                          </div>
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </AppHubWrapper>

            <ToastContainer />
            <NavigationLoadingComponent />
            {/*  */}
          </main>
        </>
      )}
    </MainContext.Provider>
  );
}

export const useMainContext = (): MainContextDto => useContext(MainContext);

export type NavigationChangeType = "start" | "stop";

export type MainContextDto = {
  userConnected: boolean;
  connectedUser: ResultLoginDto | ObjectKeyDto | null;
  theme: string;
  mainScroll: any;
  navigationChange: NavigationChangeType;
  mainDivComponentRef: RefObject<HTMLDivElement>;
  isDark: boolean;
  setNavigationChange: Dispatch<SetStateAction<NavigationChangeType>>;
  setTheme: (userTheme: ThemeDto) => void;
  logout: () => Promise<void>;
  getFileUrl: (link?: string, userId?: number, name?: string) => string;
  setMainScroll: Dispatch<SetStateAction<any>>;
  deleteAccount: () => Promise<void>;
};
