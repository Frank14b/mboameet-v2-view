"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getToken, isTokenExpired } from "../lib/server-utils";
import * as signalR from "@microsoft/signalr";
import UserHubs from "../services/hubs/users";
import useUserStore from "../store/userStore";
import useFeedStore from "../store/feedStore";
import { usePathname, useRouter } from "next/navigation";
import FeedHubs from "../services/hubs/feeds";
import { useMainContext } from "./main";
import ConfirmationComponent from "../components/commons/alerts/confirmation";
import { loginPathUrl } from "../lib/constants/app";

const AppHubContext = createContext<any>({});

export function AppHubWrapper({ children }: { children: any }) {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  );
  const [userHubs, setUserHubs] = useState<UserHubs | null>(null);
  const [feedHubs, setFeedHubs] = useState<FeedHubs | null>(null);
  const [errorSocket, setErrorSocket] = useState<boolean>(false);
  const userStore = useUserStore();
  const feedStore = useFeedStore();
  const { userConnected } = useMainContext();
  const pathname = usePathname();
  const router = useRouter();

  const initHub = useCallback(async () => {
    //
    if (connection) return;
    if (userStore.userConnected !== true || (await isTokenExpired()) == true) {
      if (!pathname.startsWith("/auth")) {
        router.push(loginPathUrl)
      }
      return;
    }

    let _connection: signalR.HubConnection | null = null;

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

      _connection = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:5000/apphub", options) // hub api link
        .withHubProtocol(protocol)
        .build();

      if (_connection) {
        _connection
          .start()
          .then(() => {
            setConnection(_connection);
            //
            setErrorSocket(false);
            setUserHubs(
              new UserHubs(_connection as signalR.HubConnection, userStore)
            );
            setFeedHubs(
              new FeedHubs(_connection as signalR.HubConnection, feedStore)
            );
          })
          .catch(async (error: any) => {
            if (
              error.response?.status == 401 ||
              (await isTokenExpired()) == true
            ) {
              router.push(loginPathUrl)
            }
            setErrorSocket(true);
            setConnection(null);
          });

        _connection.onclose(() => {
          setErrorSocket(true);
          setConnection(null);
        });
      }
    } catch (error) {
      setConnection(null);
    }
  }, [userStore, router, connection, feedStore, pathname, setErrorSocket]);

  useEffect(() => {
    // init the app websocket client hub
    initHub();
  }, [initHub]);

  const closeConnection = () => {
    if (!connection) return;
    return connection.stop()
  };

  useEffect(() => {
    if(!userConnected) {
      closeConnection();
    }
  }, [userConnected]);

  const AppHubData: AppHubDataType = {
    closeConnection,
    userHubs: userHubs as UserHubs,
    feedHubs: feedHubs as FeedHubs,
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
  closeConnection: () => Promise<void> | undefined;
  userHubs: UserHubs;
  feedHubs: FeedHubs;
  connection: signalR.HubConnection | null;
};
