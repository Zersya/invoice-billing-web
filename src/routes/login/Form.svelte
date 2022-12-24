<script lang="ts">
	let email = 'zein@email.com';
	let password = 'password';
</script>

<form method="POST">
	<label for="email">Email</label>
	<input name="email" type="email" placeholder="Type your email here" bind:value={email} class="input w-full mb-3" />
	<label for="password">Password</label>
	<input name="password" type="password" placeholder="Type your password here" bind:value={password} class="input w-full mb-4" />
	<button type="submit" class="btn btn-block">Login</button>
</form>

<style>
	form {
		flex-direction: column;
		align-items: center;
	}
</style>
