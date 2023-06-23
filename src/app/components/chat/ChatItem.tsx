"use client";

import type { Message } from "@prisma/client";

export const ChatItem = ({ msg }: { msg: Message }): React.ReactNode => {
  return (
    <div className="p-2 bg-zinc-100 text-sm rounded-md ">
      <div>
        <p className="text-primary">
          <span className="font-semibold">{msg.name}: </span>
          {msg.msg}
        </p>
      </div>
      <p className="text-muted-foreground text-xs mt-1 text-right">
        {msg.timestamp.toLocaleString("hr")}
      </p>
    </div>
  );
};
