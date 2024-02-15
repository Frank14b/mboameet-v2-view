'use client';

import { createContext, useContext } from 'react';
import HeaderComponent from '../components/commons/header';
import FooterComponent from '../components/commons/footer';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChatHubWrapper } from './chathub';
import SideBarMenuComponent from '../components/commons/sidebarMenu';
import AsideBarMenuComponent from '../components/commons/asidebarMenu';

const MainContext = createContext<any>({});

export function MainWrapper({ children }: { children: any }) {

    const queryClient = new QueryClient();

    const MainData = {};

    return (
        <MainContext.Provider value={MainData}>
            {/* <HeaderComponent /> */}
            <QueryClientProvider client={queryClient}>
                <main className='dark'>
                    <div className="mh-600 bg-gray-200 dark:bg-gray-800">
                        <div className="flex xl:container">
                            <div className="w-1/4 sm:fixed xs:fixed xs:left-0 xs:w-[300px] xs:z-50 lg:relative bg-gray-100 dark:bg-gray-900 h-screen">
                                <SideBarMenuComponent><></></SideBarMenuComponent>
                            </div>

                            {children}

                            <div className="w-1/4 sm:w-1/3 xs:fixed lg:w-1/4 xs:right-0 xs:z-50 xs:w-[300px] xs:px-6 px-3 bg-gray-100 dark:bg-gray-900">
                                <div className="flex flex-col h-screen pt-6 overflow-y-auto dark:text-gray-300">
                                    <AsideBarMenuComponent><></></AsideBarMenuComponent>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </QueryClientProvider>
            {/* <FooterComponent /> */}
        </MainContext.Provider>
    );
}

export const useMainContext = () => useContext(MainContext);
