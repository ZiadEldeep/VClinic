import { z } from 'zod';

export const addressSchema = z.object({
    hospitalName: z.string().min(1, { message: 'Hospital name is required' }),  // Use min(1) for nonempty validation
    hospitalId: z.string().min(1, { message: 'Hospital ID is required' }),
    city: z.string().min(1, { message: 'City is required' }),
    country: z.string().min(1, { message: 'Country is required' }),
    state: z.string().min(1, { message: 'State is required' }),
    zipCode: z.string().min(1, { message: 'Zip code is required' }),
});

export type AddressFormData = z.infer<typeof addressSchema>;
