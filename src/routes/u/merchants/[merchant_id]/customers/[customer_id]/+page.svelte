<script lang="ts">
	import AuthenticatedPage from '$lib/components/AuthenticatedPage.svelte';
	import Calendar from '$lib/components/Calendar.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<AuthenticatedPage>
	<Calendar schedules={data.props.schedules} />
</AuthenticatedPage>
