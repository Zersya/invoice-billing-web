<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { createEventDispatcher } from 'svelte';

	export let modal_id: string;
	export let title: string;
	export let content: string;
	export let action: string;
	export let label_positive: string;
	export let isModalOpen: boolean;

	let isLoading: boolean = false;

	const dispatch = createEventDispatcher();
</script>

<div class="modal" class:modal-open={isModalOpen}>
	<div class="modal-box relative var(--color-bg-1)">
		<button
			class="btn btn-sm btn-circle absolute right-2 top-2"
			on:click={() => (isModalOpen = false)}>✕</button
		>
		<h3 class="text-lg font-bold mb-4">{title}</h3>
		<div class="flex flex-col">
			<p>{content}</p>
			<div class="flex flex-row justify-end mt-4">
				<button for={modal_id} class="btn btn-ghost" on:click={() => (isLoading = false)}
					>Cancel</button
				>

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
					<slot />
					<button type="submit" class="btn btn-ghost {isLoading ? 'loading' : ''}"
						>{label_positive}</button
					>
				</form>
			</div>
		</div>
	</div>
</div>
