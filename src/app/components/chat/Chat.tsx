"use client";

import type { Message } from "@prisma/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { SocketContext } from "../../context/SocketContext";
import { ChatItem } from "./ChatItem";

const fetchChatForTrip = async (tripId: string): Promise<Message[]> => {
  return fetch(`/api/trips/${tripId}/chat`, {
    method: "GET",
  }).then((res) => res.json());
};

export const Chat = ({ tripId }: { tripId: string }) => {
  const { socket, connected } = useContext(SocketContext);
  const queryClient = useQueryClient();

  // TODO: React-query to fetch previous messages from the database
  const { data, isLoading } = useQuery({
    queryKey: ["trip-messages", tripId],
    queryFn: () => fetchChatForTrip(tripId),
  });

  useEffect(() => {
    if (!connected) return;

    socket.on("msg", (data) => {
      queryClient.setQueryData(
        [`trip-${tripId}-messages`],
        (old: Message[] | undefined) => (old ? [...old, data] : [data])
      );
    });
  }, [socket, connected]);

  return (
    <div>
      <div className="flex flex-col gap-1 my-2">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          (data ?? []).map((msg) => <ChatItem key={msg.id} msg={msg} />)
        )}
      </div>
    </div>
  );
};
