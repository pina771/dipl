"use client";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export const SignOutButton = () => {
  return (
    <Button variant="secondary" onClick={() => signOut({ callbackUrl: "/" })}>
      Sign out
    </Button>
  );
};
