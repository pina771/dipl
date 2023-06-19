"use client";
import { toast } from "react-hot-toast";
import { JoinTripRequestBody } from "../api/trips/join/[id]/route";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
function JoinTripButtons({
  userId,
  tripId,
}: {
  userId: string;
  tripId: string;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      e,
      joinDecline,
    }: {
      e: React.MouseEvent;
      joinDecline: "decline" | "join";
    }) => {
      e.preventDefault();
      const response = await fetch(`/api/trips/join/${tripId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application-json",
        },
        body: JSON.stringify({ joinDecline }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["tripInvites"] });
      router.push("/home");
    },
  });

  // const handleJoinOrDecline = async (
  //   event: React.MouseEvent,
  //   joinDecline: "decline" | "join"
  // ) => {
  //   event.preventDefault();

  //   const reqData: JoinTripRequestBody = {
  //     userId,
  //     joinDecline,
  //   };
  //   await fetch(`/api/trips/join/${tripId}`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(reqData),
  //   }).then((response) =>
  //     response.json().then((data) => {
  //       router.push(`/home`);
  //       toast.success(data.message);
  //     })
  //   );
  // };

  return (
    <>
      <Button
        variant="outline"
        onClick={(e) => mutation.mutate({ e: e, joinDecline: "decline" })}
        disabled={mutation.isLoading}
      >
        Decline
      </Button>
      <Button
        disabled={mutation.isLoading}
        onClick={(e) => mutation.mutate({ e: e, joinDecline: "join" })}
      >
        Join
      </Button>
    </>
  );
}
export default JoinTripButtons;
