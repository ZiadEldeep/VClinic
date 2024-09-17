import { z } from 'zod';

export const addressSchema = z.object({
    hospitalName: z.string().nonempty({ message: 'Hospital name is required' }),
    hospitalId: z.string().nonempty({ message: 'Hospital ID is required' }),
    city: z.string().nonempty({ message: 'City is required' }),
    country: z.string().nonempty({ message: 'Country is required' }),
    state: z.string().nonempty({ message: 'State is required' }),
    zipCode: z.string().nonempty({ message: 'Zip code is required' }),
});

export type AddressFormData = z.infer<typeof addressSchema>;
