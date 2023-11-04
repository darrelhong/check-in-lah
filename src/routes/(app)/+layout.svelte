<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	const { pb } = data;
</script>

<div class="flex flex-col min-h-screen">
	<header class="m-4">
		<div class="flex container mx-auto items-center">
			<p class="font-bold text-blue-600 me-auto text-2xl">check-in-lah</p>

			<!-- use form so that it works without javascript -->
			<!-- fallback to js in case of network error -->
			<form
				action="/logout"
				method="POST"
				use:enhance={() => {
					return async ({ result, update }) => {
						const { type } = result;
						if (type === 'error') {
							pb.authStore.clear();
							goto('/');
						}
					};
				}}
			>
				<button class="font-medium">Logout</button>
			</form>
		</div>
	</header>

	<main class="flex=1 mx-4">
		<div class="container mx-auto">
			<slot />
		</div>
	</main>
</div>
