"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDays } from "date-fns";
import { BaseSyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/Form";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";
import type { DateRange } from "react-day-picker";

const FormSchema = z.object({
  name: z.string().min(5, {
    message: "Trip name must be at least 5 characters.",
  }),
  desc: z.string(),
  dateRange: z.union([
    z.undefined(),
    z.object({
      from: z.union([z.undefined(), z.date()]),
      to: z.date().optional(),
    }),
  ]),
});

const addTrip = (data: z.infer<typeof FormSchema>) => {
  return fetch("/api/trips", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

function AddTripForm() {
  const queryClient = useQueryClient();
  const toast = useToast();

  // NOTE: mutationkey is used in DynamicTrips.tsx
  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof FormSchema>) => addTrip(data),
    onSuccess: () => {
      toast.toast({ title: "Success!", description: "Trip added." });
      queryClient.invalidateQueries({ queryKey: ["user-trips"] });
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      desc: "",
      dateRange: {
        from: new Date(),
        to: addDays(new Date(), 5),
      },
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>, e?: BaseSyntheticEvent) {
    if (e) e.preventDefault();
    mutation.mutate(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-xl flex-1"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Trip Name</FormLabel>
              <FormControl>
                <Input
                  defaultValue=""
                  placeholder="Teambuilding in Berlin"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="desc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Trip description</FormLabel>
              <FormControl>
                <Input
                  defaultValue=""
                  placeholder="Short trip description."
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dateRange"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Calendar
                  mode="range"
                  selected={field.value as DateRange}
                  onSelect={(e) => field.onChange(e)}
                  className=" justify-center"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={mutation.isLoading}>
          Add
        </Button>
      </form>
    </Form>
  );
}
export default AddTripForm;
