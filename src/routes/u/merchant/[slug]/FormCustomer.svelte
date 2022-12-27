<script lang="ts">
	import type { PageData } from './$types';
	import { createEventDispatcher } from 'svelte';
	import Form from '../../Form.svelte';

	export let merchant_id: string;
	export let id: string | undefined;
	export let name: string | undefined;
	export let contact_channel_id: string | undefined;
	export let contact_channel_value: string | undefined;

	export let data: PageData;

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

	const dispatch = createEventDispatcher();
</script>

<Form
	action={id ? '?/updateCustomer' : '?/createCustomer'}
	on:completed={() => dispatch('completed')}
>
	<div slot="input">
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
			class={inputClassReadOnly(id)}
		/>
		<label for="contact_channel_value">Channel</label>
		<select
			name="contact_channel_id"
			readonly={id ? true : false}
			class={selectClassReadOnly(id)}
			bind:value={contact_channel_id}
		>
			<option disabled>Pick your message channel</option>
			{#each data.props?.contact_channels as channel}
				<option value={channel.id}>{channel.name}</option>
			{/each}
		</select>
	</div>
	<button
		slot="submit"
		let:isLoading
		type="submit"
		class="btn btn-block {isLoading ? 'loading' : ''}">Save</button
	>
</Form>
