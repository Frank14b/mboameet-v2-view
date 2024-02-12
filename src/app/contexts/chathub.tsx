'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import { ObjectKeyDto } from '../types';

const ChatHubContext = createContext<any>({});

export function ChatHubWrapper({ children }: { children: any }) {

    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    const [messages, setMessages] = useState<string[] | ObjectKeyDto[]>([]);

    useEffect(() => {
        const protocol: signalR.JsonHubProtocol = new signalR.JsonHubProtocol();
        const transport: signalR.HttpTransportType = signalR.HttpTransportType.WebSockets;
        const options = {
            transport,
            logMessageContent: true,
            logger: signalR.LogLevel.Trace,
        };
        const connection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:5000/chatHub", options) // replace with your URL
            .withHubProtocol(protocol)
            .build();

        connection.start().then(() => {
            setConnection(connection);
            //
            connection.on("ReceiveMessage", (message) => {
                console.log("🚀 ~ connection.on ~ message:", message)
                setMessages((prevMessages) => [...prevMessages, message]);
            });
        });
    }, []);

    const sendMessage = (message: string) => {
        if (connection) {
            connection.invoke("SendMessage", message);
        }
    }

    const closeConnection = () => {
        if (!connection) return;

        return () => connection.stop();
    }

    const ChatHubData = {
        messages,
        sendMessage,
        closeConnection
    };

    return (
        <ChatHubContext.Provider value={ChatHubData}>
            {children}
        </ChatHubContext.Provider>
    );
}

export const useChatHubContext = () => useContext(ChatHubContext);
