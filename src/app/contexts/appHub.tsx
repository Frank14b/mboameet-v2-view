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
import { usePathname } from "next/navigation";
import FeedHubs from "../services/hubs/feeds";
import { useMainContext } from "./main";
import ConfirmationComponent from "../components/commons/alerts/Confirmation";
import { loginPathUrl } from "../lib/constants/app";
import ChatHubs from "../services/hubs/chats";
import useChatStore from "../store/chatStore";
import { configs } from "../../../app.config";
import useCustomRouter from "../hooks/useCustomRouter";

const AppHubContext = createContext<any>({});

export function AppHubWrapper({ children }: { children: any }) {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  );
  const [userHubs, setUserHubs] = useState<UserHubs | null>(null);
  const [feedHubs, setFeedHubs] = useState<FeedHubs | null>(null);
  const [chatHubs, setChatHubs] = useState<ChatHubs | null>(null);
  const [errorSocket, setErrorSocket] = useState<boolean>(false);
  const userStore = useUserStore();
  const feedStore = useFeedStore();
  const chatStore = useChatStore();
  const { userConnected, getFileUrl } = useMainContext();
  const pathname = usePathname();
  const { push } = useCustomRouter();

  const initHub = useCallback(async () => {
    //
    if (userConnected !== true || (await isTokenExpired()) == true) {
      return;
    }

    if (connection) return;

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
        .withUrl(`${configs.WEBSOCKET_HOST}`, options) // hub api link
        .withHubProtocol(protocol)
        .build();

      if (_connection) {
        _connection
          .start()
          .then(() => {
            setConnection(_connection);
            //
            setErrorSocket(false);
          })
          .catch(async (error: any) => {
            if (
              error.response?.status == 401 ||
              (await isTokenExpired()) == true
            ) {
              push(loginPathUrl);
            }
            setErrorSocket(true);
            setConnection(null);
          });

        _connection.onclose(() => {
          setErrorSocket(true);
          setConnection(null);
        });
      }
    } catch {
      setConnection(null);
    }
  }, [push, userConnected, connection, setErrorSocket]);

  useEffect(() => {
    // init the app websocket client hub
    initHub();
  }, [initHub, pathname]);

  useEffect(() => {
    if (connection && !userHubs) {
      // set all hubs class in react state
      setUserHubs(
        new UserHubs(connection as signalR.HubConnection, userStore, getFileUrl)
      );
      setFeedHubs(new FeedHubs(connection as signalR.HubConnection, feedStore));
      setChatHubs(new ChatHubs(connection as signalR.HubConnection, chatStore));
    }
  }, [connection, userHubs, chatStore, feedStore, userStore, getFileUrl]);

  const closeConnection = useCallback(() => {
    if (!connection) return;
    return connection?.stop();
  }, [connection]);

  useEffect(() => {
    if (!userConnected) {
      closeConnection();
    }
  }, [userConnected, closeConnection]);

  const AppHubData: AppHubDataType = {
    closeConnection,
    userHubs: userHubs as UserHubs,
    feedHubs: feedHubs as FeedHubs,
    chatHubs: chatHubs as ChatHubs,
    connection,
  };

  return (
    <AppHubContext.Provider value={AppHubData}>
      {children}

      {errorSocket && userConnected && (
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
  chatHubs: ChatHubs;
  connection: signalR.HubConnection | null;
};
