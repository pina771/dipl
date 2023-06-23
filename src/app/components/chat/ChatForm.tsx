"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useParams } from "next/navigation";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem } from "../ui/Form";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { SocketContext } from "../../context/SocketContext";
import { useQueryClient } from "@tanstack/react-query";
import type { Message } from "@prisma/client";

const formSchema = z.object({
  msg: z.string().min(1, {
    message: "Message must not be empty.",
  }),
});

function ChatForm({ tripId }: { tripId: string }) {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      msg: "",
    },
  });

  const { socket, connected, joinedTrips } = useContext(SocketContext);

  const onSubmit = (data: z.infer<typeof formSchema>): void => {
    if (connected) {
      socket.emit(
        "msg",
        {
          msg: data.msg,
          timestamp: new Date(),
          tripId: tripId,
        },
        (res) => updateQuery(res)
      );
      form.reset();
    }
  };

  const updateQuery = (data: Message): void => {
    queryClient.setQueryData(
      [`trip-${data.tripId}-messages`],
      (old: Message[] | undefined) => (old ? [...old, data] : [data])
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="msg"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  disabled={!connected}
                  placeholder=""
                  className="resize-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          disabled={!connected}
          type="submit"
          className="h-fit w-fit p-1"
          variant="outline"
        >
          <Send />
        </Button>
      </form>
    </Form>
  );
}
export default ChatForm;
