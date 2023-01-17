<script lang="ts">
	import type { PageData } from './$types';
	import { createEventDispatcher } from 'svelte';
	import Form from '../../Form.svelte';
	import type { ContactChannel } from '$lib/types/contact_channel';

	export let merchant_id: string;
	export let id: string | undefined;
	export let name: string | undefined;
	export let contact_channel_id: string | undefined;
	export let contact_channel_value: string | undefined;
	export let tags: string[] | undefined;

	let tag: string = '';

	export let contact_channels: ContactChannel[];

	function inputClassReadOnly(id: string | undefined) {
		if (id) {
			return 'input input-bordered w-full bg-gray-200';
		} else {
			return 'input input-bordered w-full';
		}
	}

	function selectClassReadOnly(id: string | undefined) {
		if (id) {
			return 'select input-bordered w-full max-w bg-gray-200';
		} else {
			return 'select input-bordered w-full max-w';
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

		<label for="name" class="required">Name</label>
		<input
			required
			name="name"
			type="text"
			placeholder="Type your merchant name here"
			bind:value={name}
			class="input input-bordered w-full mb-3"
		/>
		<label for="contact_channel_value" class="required">Phone/Email</label>
		<input
			required
			name="contact_channel_value"
			type="number"
			readonly={id ? true : false}
			placeholder="Type your merchant phone/email here"
			bind:value={contact_channel_value}
			class={`${inputClassReadOnly(id)}  mb-3`}
		/>
		<label for="contact_channel_id" class="required">Channel</label>
		<select
			required
			name="contact_channel_id"
			class={`${selectClassReadOnly(id)} mb-3`}
			bind:value={contact_channel_id}
		>
			<option disabled>Pick your message channel</option>
			{#each contact_channels as channel}
				<option value={channel.id}>{channel.name}</option>
			{/each}
		</select>
		<label for="tags" class="label">
			<span class="label-text required">Tags</span>
			<span class="label-text-alt">Customers are grouped using tags</span>
		</label>
		<input
			type="text"
			placeholder="Type your customer tags here"
			bind:value={tag}
			class={`${inputClassReadOnly(id)}`}
			on:keydown={(e) => {
				if (e.key === 'Enter') {
					e.preventDefault();
					if (!e.target) return;
					if (!tags) tags = [];

					tags = [...tags, tag.toLowerCase()];
					tag = '';
				}
			}}
		/>
		<label for="tags" class="label mb-3">
			<span class="label-text-alt">Press <kbd class="kbd kbd-xs">Enter</kbd> to add</span>
		</label>
		<div class="flex flex-wrap mb-3 h-5">
			{#if tags}
				{#each tags as tag}
					<div class="badge badge-neutral mr-1 mb-1">{tag}</div>
				{/each}

				<input type="hidden" name="tags" value={tags.join(',')} />
			{/if}
		</div>
	</div>
	<button
		slot="submit"
		let:isLoading
		type="submit"
		class="btn btn-block btn-primary {isLoading ? 'loading' : ''}">Save</button
	>
</Form>
