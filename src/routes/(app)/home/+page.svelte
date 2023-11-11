<script lang="ts">
	import { ClientResponseError } from 'pocketbase';
	import type { PageData } from './$types';
	import { pb } from '$lib/poocketbase';
	import { onMount } from 'svelte';
	import { getBoundingBox } from '$lib/geo';
	import { Html5QrcodeScanner, type QrcodeSuccessCallback } from 'html5-qrcode';

	export let data: PageData;

	$: ({ authStoreModel } = data);
	let locationLoading = true;
	let lat = 0;
	let lng = 0;
	let scannerStopped = false;
	let html5QrcodeScanner: Html5QrcodeScanner;

	const onScanSuccess: QrcodeSuccessCallback = async (decodedText) => {
		// stop scanning
		html5QrcodeScanner.clear();
		scannerStopped = true;
		const [timePeriodStr, facilityId] = decodedText.split('|');

		if (!facilityId) {
			console.error('Invalid QR code');
			return;
		}

		try {
			await pb.collection('check_in').create({
				time_period_str: timePeriodStr,
				facility_id: facilityId,
				user_id: authStoreModel.id
			});
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

		html5QrcodeScanner = new Html5QrcodeScanner(
			'reader',
			{ fps: 10, qrbox: { width: 250, height: 250 } },
			/* verbose= */ false
		);
		html5QrcodeScanner.render(onScanSuccess, undefined);
	});

	const checkInByLocation = async () => {
		if (locationLoading || (lat === 0 && lng === 0)) {
			return;
		}
		try {
			await pb.collection('check_in').create({
				latitude: lat,
				longitude: lng,
				user_id: authStoreModel.id
			});
		} catch (e) {
			if (e instanceof ClientResponseError) {
				console.error(e);
			}
		}
	};

	const scanAgain = () => {
		html5QrcodeScanner.render(onScanSuccess, undefined);
		scannerStopped = false;
	};
</script>

<div class="mb-4 flex gap-2 items-center">
	<p>Logged in as {authStoreModel.email}</p>

	{#if authStoreModel.role === 'admin'}
		<a class="text-blue-600 font-medium" href="admin">Manage</a>
	{/if}
</div>

<div class="grid gap-4 sm:grid-flow-col sm:grid-cols-2">
	<div>
		<h2 class="text-lg font-bold mb-2">Scan QR code</h2>
		<div id="reader" />
		{#if scannerStopped}
			<button class="btn" on:click={scanAgain}>Scan again</button>
		{/if}
	</div>

	<div>
		<h2 class="text-lg font-bold mb-2">Check-in by location</h2>

		<div class="rounded-lg shadow max-w-lg w-full h-xs grid place-items-center">
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
	</div>
</div>
