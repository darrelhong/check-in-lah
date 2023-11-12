<script lang="ts">
	import { getBoundingBox } from '$lib/geo';
	import { pb } from '$lib/poocketbase';
	import { ClientResponseError } from 'pocketbase';
	import { onMount } from 'svelte';

	let locationLoading = true;
	let lat = 0;
	let lng = 0;
	let success = false;

	const checkInByLocation = async () => {
		success = false;
		if (locationLoading || (lat === 0 && lng === 0)) {
			return;
		}
		try {
			await pb.collection('check_in').create({
				latitude: lat,
				longitude: lng,
				user_id: pb.authStore.model?.id
			});
			success = true;
		} catch (e) {
			if (e instanceof ClientResponseError) {
				console.error(e);
			}
		}
	};

	onMount(() => {
		if (!navigator.geolocation) {
			console.error('Geolocation is not supported by your browser');
			return;
		}

		navigator.geolocation.getCurrentPosition(
			(position) => {
				const { latitude, longitude } = position.coords;
				// locationLoading = false;
				lat = latitude;
				lng = longitude;
				locationLoading = false;
			},
			(error) => {
				console.error(`Unable to retrieve your location. Error: ${error.message}`);
			},
			{ maximumAge: 60000 }
		);
	});
</script>

<div>
	<h2 class="text-lg font-bold mb-2">Check-in by location</h2>

	<div class="rounded-lg shadow max-w-lg w-full h-xs grid place-items-center overflow-hidden">
		{#if locationLoading || (lat === 0 && lng === 0)}
			<div class="flex items-center">
				<svg
					class="animate-spin me-2 h-4 w-4 text-blue-600"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						class="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						stroke-width="4"
					/>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					/>
				</svg>
				<p>Waiting for location</p>
			</div>
		{:else}
			<iframe
				class="w-full h-full"
				title="map"
				src={`https://www.openstreetmap.org/export/embed.html?bbox=${getBoundingBox(
					lat,
					lng
				)}&amp;layer=mapnik&marker=${lat}%2C${lng}`}
			/>
		{/if}
	</div>
	<button
		class="btn mt-2"
		on:click={checkInByLocation}
		disabled={locationLoading || (lat === 0 && lng === 0)}>Check in</button
	>
	{#if success}
		<p class="text-green-600 mt-1 font-semibold">Checked-in successfully</p>
	{/if}
</div>
