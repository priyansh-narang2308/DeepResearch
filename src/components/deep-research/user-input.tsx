"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  input: z.string().min(2, "Please enter at least 2 characters").max(200),
});

const UserInput = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { input: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-2xl mt-8 px-4"
      >
        <FormField
          control={form.control}
          name="input"
          render={({ field }) => (
            <FormItem className="flex-1 w-full">
              <FormControl>
                <Input
                  placeholder="Enter your research topic..."
                  {...field}
                  className="rounded-full w-full py-5 px-6 text-base sm:text-lg placeholder:text-gray-400 bg-white/70 border border-gray-400 shadow-sm focus:ring-2 focus:ring-black/50 focus:border-black transition-all"
                />
              </FormControl>
              <FormMessage className="text-red-500 text-sm mt-1" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="rounded-full px-8 py-5 text-base sm:text-lg font-medium shadow-md hover:shadow-lg transition-all w-full sm:w-auto cursor-pointer"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default UserInput;
