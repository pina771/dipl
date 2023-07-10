"use client";

import { Check, Loader2, UserPlus2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export const addFriend = (email: string) => {
  return fetch("/api/user/add-friend", {
    method: "POST",
    body: JSON.stringify({ userEmail: email }),
    headers: { "Content-Type": "application/json" },
  });
};
const AddFriendForm = () => {
  const [email, setEmail] = useState<string>("");

  const toast = useToast();
  const mutation = useMutation({
    mutationFn: (email: string) => addFriend(email),

    onSuccess: async (res: Response) => {
      if (!res.ok) {
        debugger;
        const { message } = await res.json();
        toast.toast({
          title: "Request not successful.",
          description: message,
          duration: 1800,
          variant: "negative",
        });
      } else {
        setEmail("");
        toast.toast({
          title: "Request sent",
          action: <Check className="h-5 w-5" />,
          variant: "secondary",
        });
      }
    },
  });

  return (
    <div>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="email"
          placeholder="Email"
          disabled={mutation.isLoading}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          onClick={() => {
            mutation.isLoading ? "" : mutation.mutate(email);
          }}
          type="submit"
          size="icon"
          className="px-2"
          variant="ghost"
        >
          {mutation.isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <UserPlus2 className="h-5 w-5" />
          )}
        </Button>
      </div>
    </div>
  );
};
export default AddFriendForm;
