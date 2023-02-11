<script>
	import '../app.css';
	import '$lib/styles.css';
	import { Toaster } from 'svelte-french-toast';
</script>

<div class="app">
	<main>
		<slot />
		<Toaster
			toastOptions={{
				duration: 8000,
				position: 'top-center'
			}}
		/>
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
