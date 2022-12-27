<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { createEventDispatcher } from 'svelte';

	export let action: string;

	let isLoading = false;

	const dispatch = createEventDispatcher();
</script>

<form
	method="POST"
	{action}
	use:enhance={(_) => {
		isLoading = true;

		return async ({ result }) => {
			isLoading = false;

			dispatch('completed');

			await applyAction(result);
		};
	}}
>
	<slot name="input" />
	<slot name="submit" {isLoading} />
</form>

<style>
	form {
		flex-direction: column;
		align-items: center;
	}
</style>
