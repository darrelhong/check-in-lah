import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email');

		if (!email) {
			return fail(400, { errorMessage: 'Email is required' });
		}

		const password = data.get('password');
		const passwordConfirm = data.get('password-confirm');

		if (password !== passwordConfirm) {
			fail(400, { errorMessage: 'Passwords do not match' });
		}
        
	}
} satisfies Actions;
