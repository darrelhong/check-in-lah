<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ authStoreModel } = data);

	const checkInByLocation = () => {
		if (!navigator.geolocation) {
			console.error('Geolocation is not supported by your browser');
			return;
		}

		navigator.geolocation.getCurrentPosition(
			(position) => {
				const { latitude, longitude } = position.coords;
				console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
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
		<h2 class="text-lg font-bold">Check-in by location</h2>
		<button class="btn bg-blue-600 text-white" on:click={checkInByLocation}>Check in</button>
	</div>
</div>
