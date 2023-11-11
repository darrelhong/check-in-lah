<script lang="ts">
	import { page } from '$app/stores';

	import QRCode from 'qrcode';
	import { onMount } from 'svelte';

	let xml: string;
	let timeoutId;

	const refreshQRCode = async () => {
		try {
			const timePeriod = new Date();
			// set time period to nearest past 15 minutes
			timePeriod.setMinutes(Math.floor(timePeriod.getMinutes() / 15) * 15, 0, 0);
			const timePeriodStr = timePeriod.toLocaleString('en-SG');
			// encode time period and facility id into QR code
			// when scanned, it proves that the user was at the facility at the time period
			// TODO: encrypt the QR code
			xml = await QRCode.toString(`${timePeriodStr}|${$page.params.id}`, { type: 'svg' });

			// refresh QR code every 15 minutes
			const now = new Date();
			const minutes = now.getMinutes();
			const nextQuarterHour = Math.ceil(minutes / 15) * 15;
			const msUntilNextQuarterHour = (nextQuarterHour - minutes) * 60 * 1000;
			timeoutId = setTimeout(refreshQRCode, msUntilNextQuarterHour);
		} catch (err) {
			console.error(err);
		}
	};

	onMount(refreshQRCode);
</script>

<div class="min-h-screen grid place-items-center grid-rows-[1fr_auto]">
	<div class="w-full grid justify-items-center grid-rows-[auto_1fr_auto] max-w-md text-center px-2">
		<h1 class="text-xl font-bold">Check-in to {$page.params.name}</h1>
		<div
			class="w-full my-1 ring-2 ring-slate-300 aspect-square max-h-[80vh] max-w-[80vh] rounded-lg overflow-hidden"
		>
			{@html xml}
		</div>
		<p class="text-lg font-medium">Scan QR code to confirm</p>
	</div>
	<footer>
		<p class="font-bold text-blue-600 me-auto pb-2">check-in-lah</p>
	</footer>
</div>
