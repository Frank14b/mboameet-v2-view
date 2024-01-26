'use client';

import { createContext, useContext } from 'react';
import HeaderComponent from '../components/commons/header';
import FooterComponent from '../components/commons/footer';

const MainContext = createContext<any>({});

export function MainWrapper({ children }: { children: any }) {

    const MainData = {};

    return (
        <MainContext.Provider value={MainData}>
            <HeaderComponent />
            <main>
                <div
                    className={``}
                >
                    {children}
                </div>
            </main>
            <FooterComponent />
        </MainContext.Provider>
    );
}

export const useMainContext = () => useContext(MainContext);
