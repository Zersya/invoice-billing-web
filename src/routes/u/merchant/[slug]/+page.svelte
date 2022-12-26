<script lang="ts">
	import type { Customer } from '$lib/types/customer';
	import { formatDate } from '$lib/utils/functions';
	import { error, redirect } from '@sveltejs/kit';
	import ModalConfirm from '../../ModalConfirm.svelte';
	import type { ActionData, PageData } from './$types';
	import Customers from './Customers.svelte';
	import FormCustomer from './FormCustomer.svelte';
	import FormInvoice from './FormInvoice.svelte';
	import Invoices from './Invoices.svelte';

	export let data: PageData;
	export let form: ActionData;

	let selectedCustomer: Customer | null = null;
</script>

<input type="checkbox" id="form-customer" class="modal-toggle" />
<div class="modal">
	<div class="modal-box relative var(--color-bg-1)">
		<label for="form-customer" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
		<h3 class="text-lg font-bold mb-4">
			{#if !selectedCustomer}
				Form Create Customer
			{:else}
				Form Update Customer
			{/if}
		</h3>
		<FormCustomer
			{data}
			merchant_id={data.slug}
			id={selectedCustomer?.id}
			name={selectedCustomer?.name}
			contact_channel_id={selectedCustomer?.contact_channel_id}
			contact_channel_value={selectedCustomer?.contact_channel_value}
		/>
	</div>
</div>

<input type="checkbox" id="form-invoice" class="modal-toggle" />
<div class="modal">
	<div class="modal-box relative var(--color-bg-1)">
		<label for="form-invoice" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
		<h3 class="text-lg font-bold mb-4">Form Create Invoice</h3>
		<FormInvoice {data} merchant_id={data.slug} customer_id={selectedCustomer?.id} amount="0" />
	</div>
</div>

<ModalConfirm
	modal_id="delete-customer"
	title="Confirm Delete"
	content="Are you sure want to delete this customer?"
	action="?/deleteCustomer"
	label_positive="Delete"
>
	<input type="hidden" name="id" value={selectedCustomer?.id} />
	<input type="hidden" name="merchant_id" value={data.slug} />
</ModalConfirm>

{#if form?.fail}
	<div class="alert alert-error shadow-lg mb-5 rounded-md">
		<div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="stroke-current flex-shrink-0 h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg
			>
			<span>Error! {form?.message}</span>
		</div>
	</div>
{/if}

<Customers
	customers={data.props.customers}
	merchant_id={data.slug}
	on:add-invoice={(customer) => (selectedCustomer = customer.detail)}
	on:add={() => (selectedCustomer = null)}
	on:edit={(customer) => (selectedCustomer = customer.detail)}
	on:delete={(customer) => (selectedCustomer = customer.detail)}
/>

<Invoices invoices={data.props.invoices} merchant_id={data.slug} />
