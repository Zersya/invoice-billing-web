<script lang="ts">
	import Form from './Form.svelte';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div class="border-solid my-auto mx-5">
	<div class="my-5">
		<div class="prose prose-xl">Login</div>
		<div class="prose prose-slate prose-sm mb-5">Please sign in before using <b>Inving</b></div>

		<Form />

		<p class="py-5">
			Don't have an account? <a href="/register">Register</a>
		</p>
	</div>
</div>
