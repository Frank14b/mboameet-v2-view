'use client';

import { createContext, useContext, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
// import { ChatHubWrapper } from './chathub';
import SideBarMenuComponent from '../components/commons/sidebarMenu';
import AsideBarMenuComponent from '../components/commons/asidebarMenu';
import useUserStore from '../store/userStore';
import { deleteToken } from '../lib/server-utils';
import { usePathname, useRouter } from 'next/navigation';

const MainContext = createContext<any>({});

export function MainWrapper({ children }: { children: any }) {

    const queryClient = new QueryClient();

    const { userConnected, setUserConnected, user, loading, setLoading, theme, setTheme } = useUserStore();

    const router = useRouter();
    const pathname = usePathname();

    const logout = async () => {
        deleteToken();
        setUserConnected(false);
        useUserStore.persist.clearStorage();
        
        setTimeout(() => {
            router.push("/auth/signin");
        }, 300);
    }

    const MainData = {
        connectedUser: user,
        theme: theme,
        setTheme: setTheme,
        logout: logout
    };

    useEffect(() => {
        setLoading(false);
    }, [])

    return (
        <MainContext.Provider value={MainData}>
            {/* <HeaderComponent /> */}
            <QueryClientProvider client={queryClient}>
                {
                    loading ? <></> : <>
                        <main className={`${theme}`}>
                            {
                                userConnected === true ? <>
                                    <div className="mh-600 bg-gray-200 dark:bg-gray-800">
                                        <div className="flex xxl:container">
                                            <div className="w-1/4 sm:fixed xs:fixed xs:left-0 xs:w-[300px] xs:z-50 lg:relative bg-gray-100 dark:bg-gray-900 h-screen">
                                                <SideBarMenuComponent><></></SideBarMenuComponent>
                                            </div>

                                            <div className="w-1/2 sm:w-full xs:w-full lg:w-1/2 bg-gray-100 z-10 dark:bg-gray-900">
                                                <div className="flex flex-col h-screen p-6 relative overflow-y-auto">

                                                    {children}

                                                </div>
                                            </div>

                                            <div className="w-1/4 sm:w-1/3 xs:fixed lg:w-1/4 xs:right-0 xs:z-50 xs:w-[300px] xs:px-6 px-3 bg-gray-100 dark:bg-gray-900">
                                                <div className="flex flex-col h-screen pt-6 overflow-y-auto dark:text-gray-300">
                                                    <AsideBarMenuComponent><></></AsideBarMenuComponent>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </> : <>
                                    {pathname.startsWith("/auth") ? children : <></>}
                                </>
                            }
                        </main>
                    </>
                }
            </QueryClientProvider>
            {/* <FooterComponent /> */}
        </MainContext.Provider>
    );
}

export const useMainContext = () => useContext(MainContext);
