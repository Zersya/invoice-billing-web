<script lang="ts">
	import Calendar from '../../../../Calendar.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Calendar schedules={data.props.schedules} />
