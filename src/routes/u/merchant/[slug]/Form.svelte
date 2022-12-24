<script lang="ts">
	export let merchant_id: string;
	export let id: string | undefined;
	export let name: string | undefined;
	export let contact_channel_id: string | undefined;
	export let contact_channel_value: string | undefined;

	
	function inputClassReadOnly(id: string | undefined) {
		if (id) {
			return 'input w-full mb-3 bg-gray-200';
		} else {
			return 'input w-full mb-3';
		}
	}

	function selectClassReadOnly(id: string | undefined) {
		if (id) {
			return 'select w-full max-w mb-3 bg-gray-200';
		} else {
			return 'select w-full max-w mb-3';
		}
	}
</script>

<form method="POST" action={id ? '?/updateCustomer' : '?/createCustomer'}>
	<input type="hidden" name="id" value={id} />
	<input type="hidden" name="merchant_id" value={merchant_id} />

	<label for="name">Name</label>
	<input
		name="name"
		type="text"
		placeholder="Type your merchant name here"
		bind:value={name}
		class="input w-full mb-3"
	/>
	<label for="contact_channel_value">Phone/Email</label>
	<input
		name="contact_channel_value"
		type="number"
		readonly={id ? true : false}
		placeholder="Type your merchant phone/email here"
		bind:value={contact_channel_value}
		class="{inputClassReadOnly(id)}"
	/>
	<label for="contact_channel_value">Channel</label>
	<select
		name="contact_channel_id"
		readonly={id ? true : false}
		class="{selectClassReadOnly(id)}"
		bind:value={contact_channel_id}
	>
		<option disabled selected>Pick your message channel</option>
		<option value="064d7bce-1fc2-4ff3-b33a-b538aefbe7ad">Whatsapp</option>
	</select>

	<button type="submit" class="btn btn-block">Save</button>
</form>

<style>
	form {
		flex-direction: column;
		align-items: center;
	}
</style>
