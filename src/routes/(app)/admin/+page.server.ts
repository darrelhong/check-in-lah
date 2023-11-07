import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const facilitiesResp = await locals.pb.collection('facility').getList();

	return {
		facilities: facilitiesResp.items
	};
}) satisfies PageServerLoad;
