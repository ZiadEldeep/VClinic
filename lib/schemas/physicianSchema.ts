import { z } from 'zod';

export const physicianSchema = z.object({
    physicianId: z.string().min(1, {  message: 'Physician ID is required' }),
    name: z.string().min(1, {  message: 'Physician name is required' }),
    details: z.string().optional(),
    hospitalName: z.string().min(1, {  message: 'Hospital name is required' }),
});

export type PhysicianFormData = z.infer<typeof physicianSchema>;
