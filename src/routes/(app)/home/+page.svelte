<script lang="ts">
	import { PUBLIC_SAMPLE_QR_URL } from '$env/static/public';
	import type { PageData } from './$types';
	import CheckInByQr from './CheckInByQr.svelte';
	import CheckInByLocation from './CheckInByLocation.svelte';

	export let data: PageData;

	$: ({ authStoreModel } = data);
</script>

<div class="mb-4 flex flex-col sm:flex-row gap-2 items-start">
	<p>Logged in as {authStoreModel.email}</p>

	{#if authStoreModel.role === 'admin'}
		<a class="text-blue-600 font-medium" href="admin">Manage</a>
	{:else}
		<a class="text-blue-600 font-medium" href={PUBLIC_SAMPLE_QR_URL} target="_blank"
			>Sample QR page</a
		>
	{/if}
</div>

<div class="grid gap-4 sm:grid-flow-col sm:grid-cols-2 mb-4">
	<CheckInByQr />

	<CheckInByLocation />
</div>
