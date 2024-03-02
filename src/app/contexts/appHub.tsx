"use client";

import { createContext, useContext, useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import UserHubs from "../services/hubs/users";
import { getToken } from "../lib/server-utils";
import useUserStore from "../store/userStore";
import { useMainContext } from "./main";
import { usePathname } from "next/navigation";

const AppHubContext = createContext<any>({});

export function AppHubWrapper({ children }: { children: any }) {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  );
  const [userHubs, setUserHubs] = useState<any>(null);
  const userStore = useUserStore();
  const mainContext = useMainContext();
  const pathname = usePathname();

  useEffect(() => {
    //
    if (connection) return;
    if (userStore.userConnected !== true){
        if(!pathname.startsWith("/auth")) {
            mainContext.logout();
        }
        return;
    }

    const protocol: signalR.JsonHubProtocol = new signalR.JsonHubProtocol();
    const transport: signalR.HttpTransportType =
      signalR.HttpTransportType.WebSockets;
    const options: signalR.IHttpConnectionOptions = {
      transport,
      logMessageContent: true,
      logger: signalR.LogLevel.Error,
      accessTokenFactory: async () => await getToken(),
    };

    const _connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5000/apphub", options) // hub api link
      .withHubProtocol(protocol)
      .build();

    if (!_connection) return;

    _connection
      .start()
      .then(() => {
        setConnection(_connection);
        //
        setUserHubs(new UserHubs(_connection, userStore));
      })
      .catch(() => {
        mainContext.logout();
      });
  }, []);

  const closeConnection = () => {
    if (!connection) return;

    return () => connection.stop();
  };

  const AppHubData: AppHubDataType = {
    closeConnection,
    userHubs,
  };

  return (
    <AppHubContext.Provider value={AppHubData}>
      {children}
    </AppHubContext.Provider>
  );
}

export const useAppHubContext = (): AppHubDataType => useContext(AppHubContext);

export type AppHubDataType = {
  closeConnection: () => (() => Promise<void>) | undefined;
  userHubs: UserHubs;
};
