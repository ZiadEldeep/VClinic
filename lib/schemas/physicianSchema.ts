import { z } from 'zod';

export const physicianSchema = z.object({
    physicianId: z.string().nonempty({ message: 'Physician ID is required' }),
    name: z.string().nonempty({ message: 'Physician name is required' }),
    details: z.string().optional(),
    hospitalName: z.string().nonempty({ message: 'Hospital name is required' }),
});

export type PhysicianFormData = z.infer<typeof physicianSchema>;
