import { z } from 'zod';

export const prescriptionItemSchema = z.object({
    prescriptionId: z.string().min(1, { message: 'Prescription ID is required' }),
    drugId: z.string().min(1, { message: 'Drug ID is required' }),
    medicinesName: z.string().min(1, { message: 'Medicines name is required' }),
    quantity: z.number().int().positive({ message: 'Quantity must be a positive integer' }),
    doe: z.string().optional(),  // Date of expiration
    itc: z.string().optional(),  // Internal tracking code
    hospitalId: z.string().min(1, { message: 'Hospital ID is required' }),
});

export type PrescriptionItemFormData = z.infer<typeof prescriptionItemSchema>;
