<script lang="ts">
	import { enhance, applyAction } from '$app/forms';

	let email = '';
	let password = '';

	let isLoading: boolean = false;
</script>

<form
	method="POST"
	use:enhance={(_) => {
		isLoading = true;

		return async ({ result }) => {
			isLoading = false;
			await applyAction(result);
		};
	}}
>
	<label for="email">Email</label>
	<input
		name="email"
		type="email"
		placeholder="Type your email here"
		bind:value={email}
		class="input w-full mb-3"
	/>
	<label for="password">Password</label>
	<input
		name="password"
		type="password"
		placeholder="Type your password here"
		bind:value={password}
		class="input w-full mb-4"
	/>

	<button type="submit" class="btn btn-block {isLoading ? 'loading' : ''}">Login</button>
</form>

<style>
	form {
		flex-direction: column;
		align-items: center;
	}
</style>
