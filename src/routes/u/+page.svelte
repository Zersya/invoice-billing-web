<script lang="ts">
	import type { PageData } from './$types';
	import Calendar from '$lib/components/Calendar.svelte';
	import AuthenticatedPage from '$lib/components/AuthenticatedPage.svelte';

	export let data: PageData;
</script>

<AuthenticatedPage>
	<Calendar isFullTitle={true} schedules={data.props.schedules} />
</AuthenticatedPage>
