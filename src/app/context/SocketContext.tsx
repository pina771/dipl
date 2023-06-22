"use client";

import { Context, createContext, useEffect, useRef, useState } from "react";
import type { MutableRefObject } from "react";
import { io } from "socket.io-client";
import type { Socket } from "socket.io-client";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../types/socketTypes";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "http://localhost:4000",
  {
    autoConnect: false,
    auth: async (cb) => cb(await getAuthOptionsForSocket()),
  }
);

const getAuthOptionsForSocket = async () => {
  console.log("Fetching token for socket auth.");
  return await fetch("/api/auth/token", {
    method: "GET",
  }).then((response) => {
    if (!response.ok) throw new Error("getAuthOptionsForSocket went wrong.");
    else return response.json();
  });
};

export const SocketContext: Context<{
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  connected: boolean;
  joinedTrips: string[];
}> = createContext({
  socket: {} as Socket<ServerToClientEvents, ClientToServerEvents>,
  connected: false as boolean,
  joinedTrips: [] as string[],
});

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [connected, setConnected] = useState<boolean>(false);
  const joinedTrips = useRef<string[]>([]);

  useEffect(() => {
    socket.on("connect", () => setConnected(true));
    socket.onAny((event, ...args) => console.log(event, args)); // TODO: Remove this, is only for debugging
    socket.on("disconnect", () => {
      setConnected(false);
      joinedTrips.current = [];
    });
  }, []);

  return (
    <SocketContext.Provider
      value={{
        joinedTrips: joinedTrips.current,
        socket: socket,
        connected: connected,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}
