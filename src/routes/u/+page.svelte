<script lang="ts">
	import type { PageData } from './$types';
	import Calendar from '$lib/components/Calendar.svelte';
	import AuthenticatedPage from '$lib/components/AuthenticatedPage.svelte';

	export let data: PageData;
</script>

<AuthenticatedPage>
	{#if !data.schedules}
		<div class="flex flex-col items-center justify-center h-full">
			<div class="prose prose-xl">No schedules found</div>
			<div class="prose prose-slate prose-sm mb-5">Please create a schedule to get started</div>
		</div>
	{:else}
		<Calendar isFullTitle={true} schedules={data.schedules} />
	{/if}
</AuthenticatedPage>
