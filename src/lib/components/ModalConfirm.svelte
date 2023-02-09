<script lang="ts">
	import Form from './CustomForm.svelte';
	import { createEventDispatcher } from 'svelte';

	export let title: string;
	export let content: string;
	export let action: string;
	export let label_positive: string;
	export let isModalOpen: boolean;
	let isLoading = false;

	const dispatch = createEventDispatcher();
</script>

<div class="modal" class:modal-open={isModalOpen}>
	<div class="modal-box relative var(--color-bg-1)">
		<button
			class="btn btn-sm btn-circle btn-primary absolute right-2 top-2"
			on:click={() => {isModalOpen = false; dispatch('cancel');}}>✕</button
		>
		<h3 class="text-lg font-bold mb-4">{title}</h3>
		<div class="flex flex-col">
			<p>{content}</p>
			<div class="flex flex-row justify-end mt-4">
				<button
					class="btn btn-ghost"
					on:click={() => {
						isLoading = false;
						dispatch('cancel');
					}}>Cancel</button
				>

				<Form {action} on:completed={() => dispatch('completed')} >
					<slot slot="input" />
					<button slot="submit" let:isLoading={isLoading} type="submit" class="btn btn-ghost {isLoading ? 'loading' : ''}">
						{label_positive}
					</button>
				</Form>
			</div>
		</div>
	</div>
</div>
