<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { onMount } from 'svelte';

	let urlSplit: { name: string; url: string }[] = [];

	onMount(() => getBreadcumbs());

	afterNavigate(() => getBreadcumbs());

	function getBreadcumbs() {
		const url = window.location.pathname;
		const splitted = url.split('/').filter((item) => item !== '');

		urlSplit = splitted.map((item, index) => {
            var name = item;
            name = item[0].toUpperCase() + item.slice(1);
            if (item === 'u') {
                name = 'Dashboard';
            } else if (name.length > 15) {
                name = 'Detail'
            }
            
			return {
				name: name,
				url: splitted.slice(0, index + 1).join('/')
			};
		});
	}
</script>

<div class="text-sm breadcrumbs ml-5 mt-3">
	<ul>
		{#each urlSplit as item}
			{#if item.name !== ''}
				<li><a href="/{item.url}">{item.name}</a></li>
			{/if}
		{/each}
	</ul>
</div>
