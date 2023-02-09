<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let tags: String[];

	const dispatch = createEventDispatcher();
</script>

<div class="m-5">
	<div class="md:flex flex-row justify-between">
		<div>
			<h3 class="text-2xl">Tags</h3>
			<span class="text-sm">Your customers tags, use for group customers</span>
		</div>
	</div>
</div>

<div class="flex flex-wrap justify-start m-5">
	{#each tags as tag}
		<div class="badge badge-lg badge-outline mx-2 gap-3">
			<h2>{tag.toLowerCase()}</h2>
			<button
				type="button"
				class="btn btn-ghost btn-circle btn-xs"
				on:click={() => dispatch('send-reminder', tag)}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-3 w-3"
					fill="white"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M8,7.71V11.05L15.14,12L8,12.95V16.29L18,12L8,7.71Z"
					/></svg
				></button
			>
		</div>
	{/each}
</div>
