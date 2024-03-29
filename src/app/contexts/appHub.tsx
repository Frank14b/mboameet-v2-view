"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getToken, isTokenExpired } from "../lib/server-utils";
import * as signalR from "@microsoft/signalr";
import UserHubs from "../services/hubs/users";
import useUserStore from "../store/userStore";
import useFeedStore from "../store/feedStore";
import { usePathname } from "next/navigation";
import FeedHubs from "../services/hubs/feeds";
import { useMainContext } from "./main";
import ConfirmationComponent from "../components/commons/alerts/confirmation";

const AppHubContext = createContext<any>({});

export function AppHubWrapper({ children }: { children: any }) {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  );
  const [userHubs, setUserHubs] = useState<any>(null);
  const [feedHubs, setFeedHubs] = useState<any>(null);
  const [errorSocket, setErrorSocket] = useState<boolean>(false);
  const userStore = useUserStore();
  const feedStore = useFeedStore();
  const mainContext = useMainContext();
  const pathname = usePathname();

  useEffect(() => {
    // init the app websocket client hub
    initHub();
  }, []);

  const initHub = async () => {
    setErrorSocket(false);

    if (connection) return;
    if (userStore.userConnected !== true || (await isTokenExpired()) == true) {
      if (!pathname.startsWith("/auth")) {
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
        setErrorSocket(false);
        setUserHubs(new UserHubs(_connection, userStore));
        setFeedHubs(new FeedHubs(_connection, feedStore));
      })
      .catch(async (error: any) => {
        if (error.response.status == 401 || (await isTokenExpired()) == true) {
          mainContext.logout();
        }
        setErrorSocket(true);
        setConnection(null);
        // mainContext.logout();
      });

    _connection.onclose(() => {
      setErrorSocket(true);
      setConnection(null);
    });
  };

  const closeConnection = () => {
    if (!connection) return;

    return () => connection.stop();
  };

  const AppHubData: AppHubDataType = {
    closeConnection,
    userHubs,
    feedHubs,
    connection,
  };

  return (
    <AppHubContext.Provider value={AppHubData}>
      {children}

      {errorSocket && (
        <ConfirmationComponent
          defaultStatus={errorSocket}
          message="Unable to start the app hub. Click Ok to refresh!"
          onConfirm={initHub}
        />
      )}
    </AppHubContext.Provider>
  );
}

export const useAppHubContext = (): AppHubDataType => useContext(AppHubContext);

export type AppHubDataType = {
  closeConnection: () => (() => Promise<void>) | undefined;
  userHubs: UserHubs;
  feedHubs: FeedHubs;
  connection: signalR.HubConnection | null;
};
