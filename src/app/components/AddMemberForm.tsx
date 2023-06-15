"use client";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Copy, Plus } from "lucide-react";
import { toast } from "react-hot-toast";
import { User } from "@prisma/client";

type AddMemberFormProps = {
  tripId: string;
  friends: { id: string; name: string }[] | null;
};

const AddMemberForm = ({ tripId, friends }: AddMemberFormProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(`http://localhost:3000/trips/${tripId}/join`);
    toast.success("Copied to clipboard!");
  };

  const handleAddFriendToTrip = async (
    user: { id: string; name: string },
    tripId: string
  ): Promise<void> => {
    await fetch(`/api/trips/${tripId}/add-member`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: user }),
    }).then((response) => {
      response
        .json()
        .then((data) =>
          response.ok ? toast.success(data.message) : toast.error(data.message)
        );
    });
  };

  return (
    <div>
      <h2 className=" text-lg font-semibold mb-2">Invite via link: </h2>
      <div className="flex items-center space-x-4 mb-6">
        <Input
          type="text"
          disabled
          value={`https://localhost:3000/trips/${tripId}/join`}
          className="w-[50ch]"
        />
        <Button onClick={handleCopy}>
          <Copy className="mr-2 h-4 w-4" /> Copy
        </Button>
      </div>
      <h2 className="text-lg font-semibold pb-2">Or add your friends:</h2>
      {friends ? (
        <ul className="px-2">
          {friends.map((user) => (
            <li key={user.id}>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleAddFriendToTrip(user, tripId)}
              >
                <Plus className="mr-2 w-4 h-4" />
                {user.name}
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nobody found. Try adding new friends.</p>
      )}
    </div>
  );
};
export default AddMemberForm;
