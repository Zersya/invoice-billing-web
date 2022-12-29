<script lang="ts">
	import type { Customer } from '$lib/types/customer';
	import Customers from '../Customers.svelte';
	import FormCustomer from '../FormCustomer.svelte';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	let selectedCustomer: Customer | null = null;

	let isCustomerModalOpen: boolean = false;
	let isCustomerDeleteModalOpen: boolean = false;
</script>

<div class="modal" class:modal-open={isCustomerModalOpen}>
	<div class="modal-box relative var(--color-bg-1)">
		<button
			class="btn btn-sm btn-circle absolute right-2 top-2"
			on:click={() => (isCustomerModalOpen = false)}>✕</button
		>
		<h3 class="text-lg font-bold mb-4">
			{#if !selectedCustomer}
				Form Create Customer
			{:else}
				Form Update Customer
			{/if}
		</h3>
		<FormCustomer
			contact_channels={data.props.contact_channels}
			merchant_id={data.slug}
			id={selectedCustomer?.id}
			name={selectedCustomer?.name}
			contact_channel_id={selectedCustomer?.contact_channel_id}
			contact_channel_value={selectedCustomer?.contact_channel_value}
			on:completed={() => (isCustomerModalOpen = false)}
		/>
	</div>
</div>

<Customers
	customers={data.props.customers}
	merchant_id={data.slug}
	on:add={() => {
		selectedCustomer = null;
		isCustomerModalOpen = true;
	}}
	on:edit={(customer) => {
		selectedCustomer = customer.detail;
		isCustomerModalOpen = true;
	}}
	on:delete={(customer) => {
		selectedCustomer = customer.detail;
		isCustomerDeleteModalOpen = true;
	}}
/>
