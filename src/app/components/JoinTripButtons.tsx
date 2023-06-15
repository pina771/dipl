"use client";
import { toast } from "react-hot-toast";
import { JoinTripRequestBody } from "../api/trips/join/[id]/route";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
function JoinTripButtons({
  userId,
  tripId,
}: {
  userId: string;
  tripId: string;
}) {
  const router = useRouter();

  const handleJoinOrDecline = async (joinDecline: "decline" | "join") => {
    const reqData: JoinTripRequestBody = {
      userId,
      joinDecline,
    };
    await fetch(`/api/trips/join/${tripId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqData),
    }).then((response) =>
      response.json().then((data) => {
        router.push(`/trips/${tripId}`);
        toast.success(data.message);
      })
    );
  };

  return (
    <>
      <Button variant="outline" onClick={(e) => handleJoinOrDecline("decline")}>
        Decline
      </Button>
      <Button onClick={(e) => handleJoinOrDecline("join")}>Join</Button>
    </>
  );
}
export default JoinTripButtons;
