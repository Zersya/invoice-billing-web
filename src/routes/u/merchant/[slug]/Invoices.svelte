<script lang="ts">
	import type { InvoiceWithCustomer } from '$lib/types/invoice';
	import { formatCurrency, formatDate } from '$lib/utils/functions';
	import { redirect } from '@sveltejs/kit';
	import { createEventDispatcher } from 'svelte';

	export let invoices: InvoiceWithCustomer[];
	export let merchant_id: string;

	const dispatch = createEventDispatcher();

	function formatInvoiceNumber(invoice: InvoiceWithCustomer) {
		const numbers = invoice.invoice_number.split('-');
		const times = numbers[1].slice(numbers[1].length - 5, numbers[1].length);
		const user = numbers[2].slice(numbers[2].length - 5, numbers[2].length);

		return `${numbers[0]}-${user}-${times}`;
	}

	function classBadgeByScheduled(is_scheduled: boolean) {
		var value = 'prose prose-sm badge badge-ghost gap-3 py-3 text-white';
		return `${value} ${is_scheduled ? 'bg-success' : 'bg-error'}`;
	}
</script>

<div class="m-5">
	<div class="flex flex-row justify-between">
		<h3 class="text-2xl">Latest Invoices</h3>
	</div>
</div>

{#if invoices.length <= 0}
	<div class="flex flex-col justify-center items-center">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="stroke-current flex-shrink-0 h-20 w-20"
			fill="none"
			viewBox="0 0 24 24"><path d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg
		>
		<span class="text-xl">No Data</span>
		<button class="btn btn-active mt-4" on:click={() => redirect(303, `/u/merchant/${merchant_id}`)}
			>Refresh</button
		>
	</div>
{:else}
	<div class="flex flex-wrap justify-start">
		{#each invoices as invoice}
			<div class="card w-96 bg-base-100 shadow-xl my-4 mx-5">
				<div class="card-body">
					<div class="card-title justify-between">
						<div class="flex flex-col">
							<span class="prose prose-lg">{`${formatInvoiceNumber(invoice)}`.toUpperCase()}</span>
							<span class="prose prose-sm">{`${invoice.customer_name}`}</span>
						</div>
						<!-- svelte-ignore a11y-label-has-associated-control -->
						<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
						<div class="dropdown">
							<label tabindex="0" class="btn btn-ghost btn-circle">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M4 6h16M4 12h16M4 18h7"
									/></svg
								>
							</label>
							<ul
								tabindex="0"
								class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
							>
								<li>
									<!-- svelte-ignore a11y-click-events-have-key-events -->
									<label on:click={() => dispatch('set-schedule', invoice)}
										>Set Schedule</label
									>
								</li>
							</ul>
						</div>
					</div>

					<span class={classBadgeByScheduled(invoice.is_schedule)}>
						<div
							class="tooltip tooltip-bottom"
							data-tip={invoice.is_schedule ? 'Scheduled' : 'Not Scheduled'}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								stroke="currentColor"
								fill="white"
								class="inline-block w-4 h-4"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="1"
									d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z"
								/>
							</svg>
						</div>
						{formatCurrency(invoice.total_amount)}
					</span>
				</div>
			</div>
		{/each}
	</div>
{/if}
