"use client";

import { Check, Plus, X } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { addFriend } from "./AddFriendForm";
import { useRouter } from "next/navigation";

const denyFriend = (id: string) => {
  return fetch("/api/user/deny-friend");
};

export const ConfirmFriendButtons = ({
  friend,
}: {
  friend: { id: string; name: string; email: string };
}) => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (action: "confirm" | "deny") => handleClick(action),
    onSuccess: () => {
      router.refresh();
    },
  });

  const handleClick = (action: "confirm" | "deny"): Promise<Response> => {
    if (action === "confirm") return addFriend(friend.email);
    else return denyFriend(friend.id);
  };

  return (
    <div className="flex">
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => mutation.mutate("deny")}
        disabled={mutation.isLoading}
      >
        <X />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => mutation.mutate("confirm")}
        disabled={mutation.isLoading}
      >
        <Check />
      </Button>
    </div>
  );
};
