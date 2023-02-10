<script lang="ts">
	import { navigating } from '$app/stores';
</script>

<main>
	<div class="h-2">
		{#if $navigating}
			<progress class="progress progress-primary w-full align-top" />
		{/if}
	</div>
	<slot />
</main>

<style>
	.progress {
		border-radius: 0 !important;
		z-index: 1000;
		height: 5px !important;
	}
</style>
