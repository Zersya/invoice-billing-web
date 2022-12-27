<script lang="ts">
	import { applyAction, enhance } from '$app/forms';

	let name = 'Test';
	let email = 'test@email.com';
	let password = 'password';

	let isLoading: boolean = false;
</script>

<form
	method="POST"
	use:enhance={({ form, data, action, cancel }) => {
		// `form` is the `<form>` element
		// `data` is its `FormData` object
		// `action` is the URL to which the form is posted
		// `cancel()` will prevent the submission

		isLoading = true;

		return async ({ result, update }) => {
			// `result` is an `ActionResult` object
			// `update` is a function which triggers the logic that would be triggered if this callback wasn't set
			isLoading = false;
			await applyAction(result);
		};
	}}
>
	<label for="name">Name</label>
	<input
		name="name"
		type="text"
		placeholder="Type your name here"
		bind:value={name}
		class="input w-full mb-3"
	/>
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

	<button type="submit" class="btn btn-block {isLoading ? 'loading' : ''}">Register</button>
</form>

<style>
	form {
		flex-direction: column;
		align-items: center;
	}
</style>
