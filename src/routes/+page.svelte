<script lang="ts">
	import Form from './Form.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;

</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div class="border-solid">
	<div class="my-5">
		{#if form?.fail}
			<div class="alert alert-error shadow-lg mb-5 rounded-md">
				<div>
					<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
					<span>Error! {form?.message}</span>
				</div>
			</div>
		{/if}

		<div class="prose prose-xl">Login</div>
		<div class="prose prose-slate prose-sm mb-5">Please sign in before using <b>Inving</b></div>

		<Form />

		<p class="py-5">
			Don't have an account? <a href="/register">Register</a>
		</p>
	</div>
</div>
