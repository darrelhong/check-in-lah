<script lang="ts">
	import { Html5QrcodeScanner, type QrcodeSuccessCallback } from 'html5-qrcode';

	import { pb } from '$lib/poocketbase';
	import { ClientResponseError } from 'pocketbase';
	import { onMount } from 'svelte';

	let html5QrcodeScanner: Html5QrcodeScanner;
	let scannerStopped = false;

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
				user_id: pb.authStore.model?.id
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

	onMount(() => {
		html5QrcodeScanner = new Html5QrcodeScanner(
			'reader',
			{ fps: 10, qrbox: { width: 250, height: 250 } },
			/* verbose= */ false
		);
		html5QrcodeScanner.render(onScanSuccess, undefined);
	});
</script>

<div>
	<h2 class="text-lg font-bold mb-2">Scan QR code</h2>
	<div id="reader"  class="rounded-lg overflow-hidden"/>
	{#if scannerStopped}
		<button class="btn" on:click={scanAgain}>Scan again</button>
	{/if}
</div>
