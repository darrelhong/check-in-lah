import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import type { LayoutLoad } from './$types';
import PocketBase from 'pocketbase';

export const load = (async ({ data }) => {
	const pb = new PocketBase(PUBLIC_POCKETBASE_URL);

	return {
		pb,
		...data
	};
}) satisfies LayoutLoad;
