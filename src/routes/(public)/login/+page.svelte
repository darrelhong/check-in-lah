<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<div class="grid min-h-screen place-items-center p-4">
	<div class="w-full max-w-sm">
		<p class="font-bold text-blue-600 me-auto text-2xl mb-1">check-in-lah</p>

		<h1 class="text-lg font-medium mb-4">Login</h1>

		<form method="POST" class="grid gap-3" use:enhance>
			<div class="grid">
				<label for="email" class="font-medium">Email</label>
				<input
					type="email"
					name="email"
					id="email"
					placeholder="john@example.com"
					required
					class="input"
				/>
			</div>

			<div class="grid">
				<label for="password" class="font-medium">Password</label>
				<input type="password" name="password" id="password" required class="input" />
			</div>

			<button type="submit" class="btn bg-blue-600 mt-1 text-white">Login</button>
			{#if form?.errorMessage}<p class="text-red-400">{form.errorMessage}</p>{/if}

			<a href="/register" class="text-center mt-4 text-blue-600">Register ➜</a>
		</form>
	</div>
</div>
