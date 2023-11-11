import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { ClientResponseError } from 'pocketbase';

export const actions = {
	default: async ({ request, locals }) => {
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

		try {
			await locals.pb.collection('users').create({ email, password, passwordConfirm });
			await locals.pb.collection('users').authWithPassword(email as string, password as string);
		} catch (e) {
			if (e instanceof ClientResponseError) {
				if (e.originalError.data.data.email) {
					return fail(400, { errorMessage: e.originalError.data.data.email.message });
				}
				if (e.originalError.data.data.password) {
					return fail(400, { errorMessage: e.originalError.data.data.password.message });
				}
			}

			return fail(500, { errorMessage: 'Something went wrong' });
		}

		throw redirect(303, '/home');
	}
} satisfies Actions;
