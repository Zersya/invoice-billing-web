<script lang="ts">
	import type { PageData } from './$types';
	import Calendar from './Calendar.svelte';

	export let data: PageData;

	
</script>

<Calendar isFullTitle={true} schedule={null} schedules={data.props.schedules} />