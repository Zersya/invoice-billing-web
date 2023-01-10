<script lang="ts">
	import LoggedInLayout from '../../../../LoggedInLayout.svelte';
	import Calendar from '../../../../Calendar.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<LoggedInLayout>
	<Calendar schedules={data.props.schedules} />
</LoggedInLayout>
