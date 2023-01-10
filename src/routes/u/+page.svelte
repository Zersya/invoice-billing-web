<script lang="ts">
	import type { PageData } from './$types';
	import Calendar from './Calendar.svelte';
	import LoggedInLayout from './LoggedInLayout.svelte';

	export let data: PageData;
</script>

<LoggedInLayout>
	<Calendar isFullTitle={true} schedules={data.props.schedules} />
</LoggedInLayout>
