"use client";

import { UserPlus2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const AddFriendForm = () => {
  return (
    <div>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input type="email" placeholder="Email" />
        <Button type="submit" size="icon" className="w-16">
          <UserPlus2 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
export default AddFriendForm;
