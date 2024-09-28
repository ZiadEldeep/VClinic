import { z } from 'zod';

export const prescriptionSchema = z.object({
    prescriptionId: z.string().min(1, { message: 'Prescription ID is required' }),
    customerId: z.string().min(1, { message: 'Customer ID is required' }),
    physicianId: z.string().min(1, { message: 'Physician ID is required' }),
    pid: z.string().optional(),
    pfd: z.string().optional(),
});

export type PrescriptionFormData = z.infer<typeof prescriptionSchema>;
