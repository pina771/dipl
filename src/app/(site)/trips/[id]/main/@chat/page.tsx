"use client";

import { useParams } from "next/navigation";
import { Chat } from "@/components/chat/Chat";
import { ChatForm } from "@/components/chat/ChatForm";

function ChatPage() {
  const params = useParams() as { id: string };

  return (
    <div>
      <Chat tripId={params.id} />
      <ChatForm tripId={params.id} />
    </div>
  );
}
export default ChatPage;
