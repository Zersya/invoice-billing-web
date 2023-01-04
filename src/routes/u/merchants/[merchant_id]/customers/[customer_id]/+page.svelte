<script lang="ts">
	import Calendar from '../../../../Calendar.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Calendar schedule={null} schedules={data.props.schedules} />
