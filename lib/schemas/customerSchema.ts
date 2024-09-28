import { z } from 'zod';

// Define the customer schema
export const customerSchema = z.object({
  customerId: z.string().min(1, { message: "Customer ID is required" }),
  name: z.string().min(1, { message: "Customer Name is required" }),
  dob: z.date().refine(date => date <= new Date(), { message: "Date of Birth must be in the past" }),
  gender: z.enum(["Male", "Female", "Other"], { message: "Gender is required" }),
  medicalHistory: z.string().optional(),
  allergies: z.string().optional(),
  chronicDiseases: z.string().optional(), // Chronic diseases field
  emergencyContact: z.string().optional(),
});

// Type definition for customer form data
export type CustomerFormData = z.infer<typeof customerSchema>;
