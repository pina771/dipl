"use client";

import type { Trip } from "@prisma/client";
import { CircleDot, CircleOff } from "lucide-react";
import { useContext, useEffect } from "react";
import { SocketContext } from "../../app/context/SocketContext";
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

  return connected ? (
    <CircleDot className="w-4 h-4 hover" />
  ) : (
    <CircleOff className="h-4 w-4" />
  );
};
