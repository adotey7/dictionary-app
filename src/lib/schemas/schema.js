import { z } from 'zod';

export const schema = z.object({
	search: z.string().trim().min(1)
});
