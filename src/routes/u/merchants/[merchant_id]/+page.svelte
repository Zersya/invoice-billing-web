<script lang="ts">
	import type { Customer } from '$lib/types/customer';
	import type { InvoiceWithCustomer } from '$lib/types/invoice';
	import Calendar from '../../Calendar.svelte';
	import ModalConfirm from '../../ModalConfirm.svelte';
	import type { PageData } from './$types';
	import Customers from './Customers.svelte';
	import FormCustomer from './FormCustomer.svelte';
	import FormInvoice from './FormInvoice.svelte';
	import FormScheduleInvoice from './FormScheduleInvoice.svelte';
	import Invoices from './Invoices.svelte';

	export let data: PageData;

	let selectedCustomer: Customer | null = null;
	let selectedInvoice: InvoiceWithCustomer | null = null;

	let isCustomerModalOpen: boolean = false;
	let isCustomerDeleteModalOpen: boolean = false;
	let isInvoiceStopScheduleModalOpen: boolean = false;
	let isInvoiceModalOpen: boolean = false;
	let isSetScheduleModalOpen: boolean = false;
	let isDetailInvoiceModalOpen: boolean = false;
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

<div class="modal" class:modal-open={isDetailInvoiceModalOpen}>
	<div class="modal-box w-11/12 max-w-5xl var(--color-bg-1)">
		<button
			class="btn btn-sm btn-circle absolute right-2 top-2"
			on:click={() => (isDetailInvoiceModalOpen = false)}>✕</button
		>
		<h3 class="text-lg font-bold mb-4">Detail Invoice</h3>
		<div class="flex justify-between">
			<div>
				<div class="text-md font-bold">{selectedInvoice?.title}</div>
				<div class="text-md">{selectedInvoice?.description}</div>
			</div>
			<div class="text-md font-bold">{selectedInvoice?.job_schedule?.status}</div>
		</div>
		{#if isDetailInvoiceModalOpen}
			<Calendar schedules={[selectedInvoice?.job_schedule]} />
		{/if}
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

<ModalConfirm
	title="Confirm Stop Schedule"
	content="Are you sure want to stop this invoice schedule?"
	action="?/stopScheduleInvoice"
	label_positive="Stop"
	isModalOpen={isInvoiceStopScheduleModalOpen}
	on:completed={() => {
		isInvoiceStopScheduleModalOpen = false;
	}}
	on:cancel={() => {
		isInvoiceStopScheduleModalOpen = false;
	}}
>
	<input type="hidden" name="invoice_id" value={selectedInvoice?.id} />
	<input type="hidden" name="merchant_id" value={data.merchant_id} />
</ModalConfirm>

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
	on:detail-schedule={(invoice) => {
		selectedInvoice = invoice.detail;
		isDetailInvoiceModalOpen = true;
	}}
	on:set-schedule={(invoice) => {
		selectedInvoice = invoice.detail;
		isSetScheduleModalOpen = true;
	}}
	on:stop-schedule={(invoice) => {
		selectedInvoice = invoice.detail;
		isInvoiceStopScheduleModalOpen = true;
	}}
/>
