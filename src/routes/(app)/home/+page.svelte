<script lang="ts">
	import { ClientResponseError } from 'pocketbase';
	import type { PageData } from './$types';
	import { pb } from '$lib/poocketbase';

	export let data: PageData;

	$: ({ authStoreModel } = data);

	const checkInByLocation = () => {
		if (!navigator.geolocation) {
			console.error('Geolocation is not supported by your browser');
			return;
		}

		navigator.geolocation.getCurrentPosition(
			async (position) => {
				const { latitude, longitude } = position.coords;
				console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
				try {
					await pb.collection('check_in').create({
						latitude,
						longitude,
						user_id: authStoreModel.id
					});
				} catch (e) {
					if (e instanceof ClientResponseError) {
						console.error(e);
					}
				}
			},
			(error) => {
				console.error(`Unable to retrieve your location. Error: ${error.message}`);
			}
		);
	};
</script>

<p class="mb-2">Logged in as {authStoreModel.email}</p>

<div class="grid">
	<div>
		<h2 class="text-lg font-bold mb-1">Check-in by location</h2>
		<button class="btn bg-blue-600 text-white" on:click={checkInByLocation}>Check in</button>
	</div>
</div>
