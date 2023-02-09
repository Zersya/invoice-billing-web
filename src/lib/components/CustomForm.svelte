<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { createEventDispatcher } from 'svelte';
	import toast from 'svelte-french-toast';

	export let action: string;
	export let is_reset: boolean = false;

	let isLoading = false;

	const dispatch = createEventDispatcher();
</script>

<form
	method="POST"
	{action}
	use:enhance={(_) => {
		isLoading = true;

		return async ({ result, update }) => {
			isLoading = false;

			if (result.type === 'success') {
				let msg = result.data?.message;
				let capitalize = msg.charAt(0).toUpperCase() + msg.slice(1);

				if (result.data?.fail) {
					await update({ reset: false });

					toast.error(capitalize);
				} else if (result.data?.success) {
					await update({ reset: is_reset });
					dispatch('completed');

					toast.success(capitalize);
				}
			}
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
