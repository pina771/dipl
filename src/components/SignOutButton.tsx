"use client";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export const SignOutButton = () => {
  return (
    <Button variant="secondary" onClick={() => signOut({ callbackUrl: "/" })}>
      <LogOut className="mr-1 h-4 w-4" />
      Sign out
    </Button>
  );
};
