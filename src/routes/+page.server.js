import { superValidate } from 'sveltekit-superforms';
// import { message } from 'sveltekit-superforms';
// import { fail } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { schema } from '$lib/schemas/schema.js';

export const load = async () => {
	const form = await superValidate(zod(schema));

	return { form };
};

// export const actions = {
// 	default: async ({ request }) => {
// 		const form = await superValidate(request, zod(schema));

// 		if (!form.valid) {
// 			return fail(400, { form });
// 		}

// 		console.log(form.data.search);

// 		return message(form, 'Form submitted successfully');
// 	}
// };
