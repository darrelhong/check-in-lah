<script lang="ts">
	import type { PageData } from './$types';
	import CheckInByQr from './CheckInByQr.svelte';
	import CheckInByLocation from './CheckInByLocation.svelte';

	export let data: PageData;

	$: ({ authStoreModel } = data);
</script>

<div class="mb-4 flex gap-2 items-center">
	<p>Logged in as {authStoreModel.email}</p>

	{#if authStoreModel.role === 'admin'}
		<a class="text-blue-600 font-medium" href="admin">Manage</a>
	{/if}
</div>

<div class="grid gap-4 sm:grid-flow-col sm:grid-cols-2 mb-4">
	<CheckInByQr />

	<CheckInByLocation />
</div>
