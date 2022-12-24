<script lang="ts">
	let name = 'Test';
	let email = 'test@email.com';
	let password = 'password';
</script>

<form method="POST">
	<label for="name">Name</label>
	<input name="name" type="text" placeholder="Type your name here" bind:value={name} class="input w-full mb-3" />
	<label for="email">Email</label>
	<input name="email" type="email" placeholder="Type your email here" bind:value={email} class="input w-full mb-3" />
	<label for="password">Password</label>
	<input name="password" type="password" placeholder="Type your password here" bind:value={password} class="input w-full mb-4" />
	<button type="submit" class="btn btn-block">Register</button>
</form>

<style>
	form {
		flex-direction: column;
		align-items: center;
	}
</style>
