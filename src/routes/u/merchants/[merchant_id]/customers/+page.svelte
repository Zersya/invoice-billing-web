<script lang="ts">
	import type { Customer } from '$lib/types/customer';
	import AuthenticatedPage from '$lib/components/AuthenticatedPage.svelte';
	import ModalConfirm from '$lib/components/ModalConfirm.svelte';
	import Customers from '$lib/components/Customers.svelte';
	import FormCustomer from '$lib/components/FormCustomer.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let selectedCustomer: Customer | null = null;

	let isCustomerModalOpen: boolean = false;
	let isCustomerDeleteModalOpen: boolean = false;
</script>

<AuthenticatedPage>
	<div slot="modals">
		<div class="modal" class:modal-open={isCustomerModalOpen}>
			<div class="modal-box relative var(--color-bg-1)">
				<button
					class="btn btn-sm btn-circle btn-primary absolute right-2 top-2"
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
					tags={selectedCustomer?.tags}
					on:completed={() => (isCustomerModalOpen = false)}
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
	</div>
	<Customers
		customers={data.props.customers}
		merchant_id={data.merchant_id}
		ableToDetail={true}
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
</AuthenticatedPage>
