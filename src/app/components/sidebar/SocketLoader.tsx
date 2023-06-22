"use client";

import type { Trip } from "@prisma/client";
import { CircleDot, CircleOff } from "lucide-react";
import { useContext, useEffect, useRef } from "react";
import { SocketContext } from "../../context/SocketContext";
import { Button } from "../ui/button";

interface RoomJoinMsg {
  userId: string;
  tripId: string;
}

export const SocketLoader = ({
  trips,
  userId,
}: {
  trips: Trip[] | undefined;
  userId: string;
}) => {
  const { socket, connected, joinedTrips } = useContext(SocketContext);

  useEffect(() => {
    socket.connect();
  }, [socket]);

  useEffect(() => {
    if (!connected) return;
    if (!trips) return;

    for (let trip of trips) {
      if (!joinedTrips.includes(trip.id)) {
        socket.emit("joinTrip", { tripId: trip.id }, (response) => {
          if (response === "confirm") {
            joinedTrips.push(trip.id);
          }
        });
      }
    }
  }, [trips, socket, userId, connected, joinedTrips]);

  return (
    <Button
      size="icon"
      className=" bg-zinc-500 hover:bg-zinc-600 hover:cursor-default"
    >
      {connected ? (
        <CircleDot className="w-4 h-4 hover" />
      ) : (
        <CircleOff className="h-4 w-4" />
      )}
    </Button>
  );
};
