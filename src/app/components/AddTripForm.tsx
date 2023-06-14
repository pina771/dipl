"use client";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Input } from "./ui/input";

const FormSchema = z.object({
  name: z.string().min(5, {
    message: "Trip name must be at least 5 characters.",
  }),
  desc: z.string(),
});

function AddTripForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const onSubmit = (data: z.infer<typeof FormSchema>) =>
    console.log("data", data);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" w-64 space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Trip Name</FormLabel>
              <FormControl>
                <Input placeholder="Teambuilding in Berlin" {...field} />
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
                <Input placeholder="Short trip description." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
export default AddTripForm;
