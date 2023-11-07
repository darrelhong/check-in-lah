<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="min-h-screen grid place-items-center grid-rows-[1fr_auto]">
	<div class="w-full grid justify-items-center grid-rows-[auto_1fr_auto] max-w-md ">
		<h1 class="text-xl font-bold">Check-in to {$page.params.name}</h1>
		<div class="w-full border aspect-square max-h-[80vh] max-w-[80vh]" />
		<p class="text-lg font-medium">Scan QR code to confirm</p>
	</div>
	<footer>
		<p class="font-bold text-blue-600 me-auto pb-2">check-in-lah</p>
	</footer>
</div>
