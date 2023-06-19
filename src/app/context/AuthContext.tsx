"use client";

import { SessionProvider } from "next-auth/react";
import { RQProvider } from "./RQContext";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <RQProvider>{children}</RQProvider>
    </SessionProvider>
  );
};

export default Provider;
