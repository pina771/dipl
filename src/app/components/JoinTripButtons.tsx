"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
function JoinTripButtons({
  userId,
  tripId,
}: {
  userId: string;
  tripId: string;
}) {
  const router = useRouter();

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
      router.push("/home");
      router.refresh();
    },
  });

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
