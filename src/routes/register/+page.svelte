<script lang="ts">
	import FormRegister from '$lib/components/FormRegister.svelte';
	import inving from '$lib/images/inving-logo.png';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div class="items-center p-4 m-auto rounded-lg drop-shadow-xl bg-white">
	<div class="m-auto" style="max-width: 30em;">
		<div class="flex md:flex-row flex-col items-center justify-between">
			<div class="flex flex-col text-center md:text-left">
				<div class="prose prose-xl">Register</div>
				<div class="prose prose-slate prose-sm mb-5">
					Please register in before using <b>Inving</b>
				</div>
			</div>
			<img src={inving} width="80" alt="inving" />
		</div>

		<FormRegister />

		<p class="py-5">
			Have an account? <a href="/">Login</a>
		</p>
	</div>
</div>
