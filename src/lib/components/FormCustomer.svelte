<script lang="ts">
	import type { PageData } from '../../routes/u/merchants/[merchant_id]/$types';
	import { createEventDispatcher } from 'svelte';
	import CustomForm from '$lib/components/CustomForm.svelte';
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

	function removeTag(tag: string) {
		if (!tags) return;

		tags = tags.filter((t) => t !== tag);
	}

	function emailChannelId() {
		return contact_channels.find((c) => c.name === 'email')?.id;
	}

	function whatsappChannelId() {
		return contact_channels.find((c) => c.name === 'whatsapp')?.id;
	}

	function telegramChannelId() {
		return contact_channels.find((c) => c.name === 'telegram')?.id;
	}

	function labelChannel(value: string | undefined): string {
		if (value == emailChannelId()) {
			return 'Email';
		} else if (value == whatsappChannelId()) {
			return 'Whatsapp Number';
		} else if (value == telegramChannelId()) {
			return 'Telegram Username';
		} else {
			return 'Channel';
		}
	}

	function placeholderChannel(value: string | undefined): string {
		if (value == emailChannelId()) {
			return 'Type your customer email here';
		} else if (value == whatsappChannelId()) {
			return 'Type your customer whatsapp number here';
		} else if (value == telegramChannelId()) {
			return 'Type your customer telegram username here';
		} else {
			return 'Type your customer channel here';
		}
	}

	const dispatch = createEventDispatcher();
</script>

<CustomForm
	action={id ? '?/updateCustomer' : '?/createCustomer'}
	is_reset={!id}
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
		<label for="contact_channel_id" class="required">Channel</label>
		<select
			required
			disabled={id ? true : false}
			name="contact_channel_id"
			class={`${selectClassReadOnly(id)} mb-3`}
			bind:value={contact_channel_id}
		>
			<option disabled>Pick your message channel</option>
			{#each contact_channels as channel}
				<option value={channel.id}>{channel.name}</option>
			{/each}
		</select>
		<label for="contact_channel_value" class="required">{labelChannel(contact_channel_id)}</label>
		<input
			required
			name="contact_channel_value"
			type="text"
			readonly={id ? true : false}
			placeholder={placeholderChannel(contact_channel_id)}
			bind:value={contact_channel_value}
			class={`${inputClassReadOnly(id)}  mb-3`}
		/>
		<label for="tags" class="label">
			<span class="label-text required">Tags</span>
			<span class="label-text-alt">Customers are grouped using tags</span>
		</label>
		<input
			type="text"
			placeholder="Type your customer tags here"
			bind:value={tag}
			class="input input-bordered w-full"
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
					<div class="badge badge-neutral mr-1 mb-1">
						<button
							type="button"
							class="btn btn-ghost btn-circle btn-xs"
							on:click={() => removeTag(tag)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-3 w-3"
								fill="white"
								viewBox="0 0 24 24"
								stroke="currentColor"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
								/></svg
							></button
						><span class="ml-2">{tag}</span>
					</div>
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
</CustomForm>
