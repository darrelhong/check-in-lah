<script lang="ts">
	import { page } from '$app/stores';

	import QRCode from 'qrcode';
	import { onMount } from 'svelte';

	let xml: string;

	onMount(async () => {
		try {
			xml = await QRCode.toString(`the quick brown fox jumps over the lazy dog`, { type: 'svg' });
			console.log(xml);
		} catch (err) {
			console.error(err);
		}
	});
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
