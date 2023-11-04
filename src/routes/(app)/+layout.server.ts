import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const authStoreModel = locals.pb.authStore.model;

	// for all routes under (app) check if the auth store is populated
	if (!authStoreModel) {
		throw redirect(303, '/');
	}

	return {
		authStoreModel
	};
}) satisfies LayoutServerLoad;
