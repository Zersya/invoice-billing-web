<script lang="ts">
	export let id: string | undefined;
	export let name: string | undefined;
	export let description: string | undefined;
</script>

<form method="POST" action={id ? '?/updateMerchant' : '?/createMerchant'}>
	<input type="hidden" name="id" value={id} />

	<label for="name">Name</label>
	<input
		name="name"
		type="text"
		placeholder="Type your merchant name here"
		bind:value={name}
		class="input w-full mb-3"
	/>
	<label for="description">Description</label>
	<input
		name="description"
		type="multiline"
		placeholder="Type your merchant description here"
		bind:value={description}
		class="input w-full mb-3"
	/>

	<button type="submit" class="btn btn-block">Save</button>
</form>

<style>
	form {
		flex-direction: column;
		align-items: center;
	}
</style>
