<script lang="ts">
	import type { Customer } from '$lib/types/customer';
	import type { InvoiceWithCustomer } from '$lib/types/invoice';
	import { formatDate } from '$lib/utils/functions';
	import { error, redirect } from '@sveltejs/kit';
	import ModalConfirm from '../../ModalConfirm.svelte';
	import type { ActionData, PageData } from './$types';
	import Customers from './Customers.svelte';
	import FormCustomer from './FormCustomer.svelte';
	import FormInvoice from './FormInvoice.svelte';
	import FormScheduleInvoice from './FormScheduleInvoice.svelte';
	import Invoices from './Invoices.svelte';

	export let data: PageData;
	export let form: ActionData;

	let selectedCustomer: Customer | null = null;
	let selectedInvoice: InvoiceWithCustomer | null = null;

	let isCustomerModalOpen: boolean = false;
	let isCustomerDeleteModalOpen: boolean = false;
	let isInvoiceModalOpen: boolean = false;
	let isSetScheduleModalOpen: boolean = false;
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
			merchant_id={data.merchant_id}
			id={selectedCustomer?.id}
			name={selectedCustomer?.name}
			contact_channel_id={selectedCustomer?.contact_channel_id}
			contact_channel_value={selectedCustomer?.contact_channel_value}
			on:completed={() => (isCustomerModalOpen = false)}
		/>
	</div>
</div>

<div class="modal" class:modal-open={isInvoiceModalOpen}>
	<div class="modal-box relative var(--color-bg-1)">
		<button
			class="btn btn-sm btn-circle absolute right-2 top-2"
			on:click={() => (isInvoiceModalOpen = false)}>✕</button
		>
		<h3 class="text-lg font-bold mb-4">Form Create Invoice</h3>
		<FormInvoice
			merchant_id={data.merchant_id}
			customer_id={selectedCustomer?.id}
			on:completed={() => (isInvoiceModalOpen = false)}
		/>
	</div>
</div>

<div class="modal" class:modal-open={isSetScheduleModalOpen}>
	<div class="modal-box relative var(--color-bg-1)">
		<button
			class="btn btn-sm btn-circle absolute right-2 top-2"
			on:click={() => (isSetScheduleModalOpen = false)}>✕</button
		>
		<h3 class="text-lg font-bold mb-4">Send Invoice</h3>
		<FormScheduleInvoice
			merchant_id={data.merchant_id}
			invoice_id={selectedInvoice?.id}
			on:completed={() => (isSetScheduleModalOpen = false)}
		/>
	</div>
</div>

<ModalConfirm
	title="Confirm Delete"
	content="Are you sure want to delete this customer?"
	action="?/deleteCustomer"
	label_positive="Delete"
	isModalOpen={isCustomerDeleteModalOpen}
	on:completed={() => {
		isCustomerDeleteModalOpen = false;
	}}
	on:cancel={() => {
		isCustomerDeleteModalOpen = false;
	}}
>
	<input type="hidden" name="id" value={selectedCustomer?.id} />
	<input type="hidden" name="merchant_id" value={data.merchant_id} />
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
	merchant_id={data.merchant_id}
	ableToAddInvoice={true}
	on:add-invoice={(customer) => {
		selectedCustomer = customer.detail;
		isInvoiceModalOpen = true;
	}}
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

<Invoices
	invoices={data.props.invoices}
	merchant_id={data.merchant_id}
	on:set-schedule={(invoice) => {
		selectedInvoice = invoice.detail;
		isSetScheduleModalOpen = true;
	}}
/>
