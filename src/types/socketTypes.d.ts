import type { Message } from "@prisma/client";

export interface ClientToServerEvents {
  msg: (
    data: { msg: string; timestamp: Date; tripId: string },
    ack: (response: Message) => void
  ) => void;

  /* Must define a callback function for acknowledgement message.  */
  joinTrip: (
    data: { tripId: string },
    ack: (response: "confirm" | "decline") => void
  ) => void;
}
export interface ServerToClientEvents {
  joinTrip: (data: { tripId: string; confirm: "confirm" | "decline" }) => void;
  msg: (data: Message) => void;
}
