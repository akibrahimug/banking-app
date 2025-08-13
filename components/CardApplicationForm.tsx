"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createCardApplication } from "@/lib/actions/card.actions";

const schema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  income: z.coerce.number().positive(),
  consent: z.boolean().refine((v) => v === true, "You must accept"),
});

const CardApplicationForm = ({
  userId,
  defaults,
}: {
  userId: string;
  defaults?: Partial<CreateCardApplicationProps>;
}) => {
  const [submitting, setSubmitting] = useState(false);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: defaults?.firstName || "",
      lastName: defaults?.lastName || "",
      email: defaults?.email || "",
      income: (defaults?.income as any) || 0,
      consent: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    setSubmitting(true);
    try {
      await createCardApplication({ userId, ...values });
      form.reset({ ...values, consent: false });
      alert("Application submitted");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            name="firstName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Jane" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="lastName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Doe" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" placeholder="jane@example.com" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="income"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Annual income (USD)</FormLabel>
              <FormControl>
                <Input {...field} type="number" min={0} step={1000} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="consent"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <input
                  id="consent"
                  type="checkbox"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  className="size-4"
                />
                <FormLabel htmlFor="consent" className="!mt-0">
                  I consent to the credit check and terms
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={submitting}
          className="w-full md:w-auto"
        >
          {submitting ? "Submitting..." : "Submit application"}
        </Button>
      </form>
    </Form>
  );
};

export default CardApplicationForm;
