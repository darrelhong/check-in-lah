<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { pb } from '$lib/poocketbase';
</script>

<div class="flex flex-col min-h-screen">
	<header class="m-4">
		<div class="flex container mx-auto items-center gap-2">
			<p class="font-bold text-blue-600 me-auto text-2xl shrink-0">check-in-lah</p>

			<!-- use form so that it works without javascript -->
			<!-- fallback to js in case of network error -->
			<form
				action="/logout"
				method="POST"
				use:enhance={() => {
					return async ({ result }) => {
						const { type } = result;
						if (type === 'redirect') {
							goto(result.location);
						}
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
