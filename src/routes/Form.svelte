<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import toast from 'svelte-french-toast';

	let email = '';
	let password = '';

	let isLoading: boolean = false;
</script>

<form
	method="POST"
	use:enhance={(_) => {
		isLoading = true;

		return async ({ result, update }) => {
			isLoading = false;

			if (result.type === 'success') {
				let msg = result.data?.message;
				let capitalize = msg.charAt(0).toUpperCase() + msg.slice(1);

				if (result.data?.fail) {
					toast.error(capitalize);
				} else if (result.data?.success) {
					toast.success(capitalize);
				}

				await update({ reset: false });
			}

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
