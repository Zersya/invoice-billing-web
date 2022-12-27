<script lang="ts">
	import { applyAction, enhance } from "$app/forms";
	import { createEventDispatcher } from 'svelte';


	export let id: string | undefined;
	export let name: string | undefined;
	export let description: string | undefined;

	let isLoading: boolean = false;

	const dispatch = createEventDispatcher();
</script>

<form
	method="POST"
	action={id ? '?/updateMerchant' : '?/createMerchant'}
	use:enhance={(_) => {
		isLoading = true;

		return async ({ result }) => {
			isLoading = false;
			
			dispatch('completed');
			
			await applyAction(result);
		};
	}}
>
	<input type="hidden" name="id" value={id} />

	<label for="name">Name</label>
	<input
		name="name"
		type="text"
		placeholder="Type your merchant name here"
		bind:value={name}
		class="input w-full mb-3"
	/>
	<label for="description">Description</label>
	<input
		name="description"
		type="multiline"
		placeholder="Type your merchant description here"
		bind:value={description}
		class="input w-full mb-3"
	/>

	{#key isLoading}
		<button type="submit" class="btn btn-block {isLoading ? 'loading' : ''}">Save</button>
	{/key}
</form>

<style>
	form {
		flex-direction: column;
		align-items: center;
	}
</style>
