"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/Form";
import { Button } from "../ui/button";
import { Command, CommandGroup, CommandItem } from "../ui/command";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Textarea } from "../ui/textarea";
import { DynamicCategoryIcon } from "./DynamicCategoryIcon";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const PointOfInterest = z.object({
  name: z.string().min(8, {
    message: "Name must be at least 8 characters.",
  }),
  desc: z.string(),
  categoryIds: z.number().array(),
});

interface PointOfInterestFormProps {
  tripId: string;
  categories: Category[];
}

export const PointOfInterestForm = ({
  categories,
  tripId,
}: PointOfInterestFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof PointOfInterest>>({
    resolver: zodResolver(PointOfInterest),
    defaultValues: {
      name: "",
      desc: "",
      categoryIds: [],
    },
  });

  const onSubmit = async (data: z.infer<typeof PointOfInterest>) => {
    await fetch(`/api/trips/${tripId}/point-of-interest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(async (res) => {
      const data = await res.json();
      if (!res.ok) {
        toast.error("err");
        return;
      }
      toast.success("success");
      router.refresh();
    });
  };

  return (
    <div className="mb-4 p-2 border max-w-prose shadow-sm rounded-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item name</FormLabel>
                <FormControl>
                  <Input
                    defaultValue=""
                    placeholder="e.g. cafe bar Bar45"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="desc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <Textarea
                  {...field}
                  placeholder="e.g. Bar45 is a great place to relax with a glass of wine or enjoy a nice cup of coffee."
                  className="resize-y"
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryIds"
            render={({ field }) => (
              <FormItem>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className="text-muted-foreground "
                        role="combobox"
                      >
                        {field.value.length > 0 ? field.value.length + " " : ""}
                        categories
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        {field.value.length > 0 ? (
                          <div className="ml-2">
                            {field.value.map((catId) => (
                              <DynamicCategoryIcon
                                category={categories.find(
                                  (cat) => cat.id === catId
                                )}
                                key={catId}
                              />
                            ))}
                          </div>
                        ) : null}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Command>
                      <CommandGroup>
                        {categories.map((category) => (
                          <CommandItem
                            value={`${category.id}`}
                            key={category.id}
                            onSelect={(value) => {
                              let valAsInt = Number.parseInt(value);
                              if (field.value.includes(valAsInt)) {
                                form.setValue(
                                  "categoryIds",
                                  field.value.filter(
                                    (elem) => elem !== valAsInt
                                  )
                                );
                              } else {
                                form.setValue("categoryIds", [
                                  Number.parseInt(value),
                                  ...form.getValues().categoryIds,
                                ]);
                              }
                            }}
                            className="justify-between"
                          >
                            <span
                              className="font-semibold"
                              style={{ color: category.color }}
                            >
                              {category.name}
                            </span>
                            {field.value.includes(category.id) ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <div className="w-4 h-4" />
                            )}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit">Add Item</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
