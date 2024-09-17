import { z } from 'zod';

export const customerSchema = z.object({
  customerId: z.string().nonempty("Customer ID is required"),
  name: z.string().nonempty("Customer Name is required"),
  dob: z.date().refine(date => date <= new Date(), "Date of Birth must be in the past"),
  gender: z.enum(["Male", "Female", "Other"]),
});
export type CustomerFormData = z.infer<typeof customerSchema>;