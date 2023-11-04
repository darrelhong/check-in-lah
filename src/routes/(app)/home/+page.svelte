<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ authStoreModel } = data);
</script>

<h1>Home</h1>
<p>{authStoreModel.email}</p>
