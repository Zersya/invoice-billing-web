<script lang="ts">
	import Form from './Form.svelte';

</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div class="border-solid my-auto mx-5">
	<div class="my-5">
		<div class="prose prose-xl">Register</div>
		<div class="prose prose-slate prose-sm mb-5">Please register in before using <b>Inving</b></div>

		<Form />

		<p class="py-5">
			Have an account? <a href="/">Login</a>
		</p>
	</div>
</div>
