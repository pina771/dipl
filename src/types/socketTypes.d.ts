export interface ClientToServerEvents {
  msg: (message: string, timestamp: string) => void;

  /* Must define a callback function for acknowledgement message.  */
  joinTrip: (
    data: { tripId: string },
    ack: (r: "confirm" | "decline") => void
  ) => void;
}
export interface ServerToClientEvents {
  joinTrip: (data: { tripId: string; confirm: "confirm" | "decline" }) => void;
}
