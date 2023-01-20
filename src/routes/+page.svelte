<script lang="ts">
	import Form from './Form.svelte';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div class="items-center p-4 m-auto rounded-lg drop-shadow-xl bg-white">
	<div class="m-auto" style="max-width: 30em;">
		<div class="prose prose-xl">Login</div>
		<div class="prose prose-slate prose-sm mb-5">Please sign in before using <b>Inving</b></div>

		<Form />

		<p class="py-5">
			Don't have an account? <a href="/register">Register</a>
		</p>
	</div>
</div>
