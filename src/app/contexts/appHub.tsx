"use client";

import { createContext, useContext, useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import UserHubs from "../services/hubs/users";
import { getToken } from "../lib/server-utils";
import useUserStore from "../store/userStore";

const AppHubContext = createContext<any>({});

export function AppHubWrapper({ children }: { children: any }) {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  );
  const [userHubs, setUserHubs] = useState<any>(null);
  const userStore = useUserStore();

  useEffect(() => {
    try {
      const protocol: signalR.JsonHubProtocol = new signalR.JsonHubProtocol();
      const transport: signalR.HttpTransportType =
        signalR.HttpTransportType.WebSockets;
      const options: signalR.IHttpConnectionOptions = {
        transport,
        logMessageContent: true,
        logger: signalR.LogLevel.Error,
        accessTokenFactory: async () => await getToken(),
      };
      const connection = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:5000/apphub", options) // replace with your URL
        .withHubProtocol(protocol)
        .build();

      connection.start().then(() => {
        setConnection(connection);
        //
        setUserHubs(new UserHubs(connection, userStore));
      });
    } catch (error) {
        console.log("🚀 ~ useEffect ~ error:", error)
    }
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
