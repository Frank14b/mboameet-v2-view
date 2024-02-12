'use client';

import { createContext, useContext } from 'react';
import HeaderComponent from '../components/commons/header';
import FooterComponent from '../components/commons/footer';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChatHubWrapper } from './chathub';

const MainContext = createContext<any>({});

export function MainWrapper({ children }: { children: any }) {

    const queryClient = new QueryClient();

    const MainData = {};

    return (
        <MainContext.Provider value={MainData}>
            <ChatHubWrapper>
                <HeaderComponent />
                <main>
                    <div
                        className={``}
                    >
                        <QueryClientProvider client={queryClient}>
                            {children}
                        </QueryClientProvider>
                    </div>
                </main>
                <FooterComponent />
            </ChatHubWrapper>
        </MainContext.Provider>
    );
}

export const useMainContext = () => useContext(MainContext);
