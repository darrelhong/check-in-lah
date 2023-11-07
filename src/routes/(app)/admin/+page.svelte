<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ facilities } = data);
</script>

<h1 class="text-xl font-semibold mb-4">Facilities</h1>

<!-- facilities table -->
<table class="w-full">
	<thead>
		<tr class="text-left border-b-2 border-slate-400 font-semibold text-slate-8800">
			<th class="pb-3">Name</th>
			<th>Address</th>
			<th></th>
		</tr>
	</thead>
	<tbody>
		{#each facilities as facility (facility.id)}
			<tr class="border-t border-slate-300">
				<td class="py-3 text-slate-700 font-medium">{facility.name}</td>
				<td class="text-slate-600">{facility.address}</td>
				<td class="text-right font-medium text-blue-600 text-sm">QR code page</td>
			</tr>
		{/each}
	</tbody>
</table>
