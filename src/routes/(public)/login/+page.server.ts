import { fail, type Actions, redirect } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';

export const actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		try {
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
