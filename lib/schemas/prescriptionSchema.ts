import { z } from 'zod';

export const prescriptionSchema = z.object({
    prescriptionId: z.string().nonempty({ message: 'Prescription ID is required' }),
    customerId: z.string().nonempty({ message: 'Customer ID is required' }),
    physicianId: z.string().nonempty({ message: 'Physician ID is required' }),
    pid: z.string().optional(),
    pfd: z.string().optional(),
});

export type PrescriptionFormData = z.infer<typeof prescriptionSchema>;
