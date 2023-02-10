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
		const lastIndex = numbers.length - 1;
		const times = numbers[1].slice(numbers[1].length - 5, numbers[1].length);
		const user = numbers[lastIndex].slice(numbers[lastIndex].length - 5, numbers[lastIndex].length);

		return `${numbers[0]}-${times}-${user}`;
	}

	function classBadgeByScheduled(status: string | undefined) {
		var value = 'prose prose-sm badge badge-ghost gap-3 py-3 text-white';
		return `${value} ${
			status == undefined ? 'bg-error' : status == 'completed' ? 'bg-info' : 'bg-success'
		}`;
	}
</script>

<div class="m-5">
	<div class="flex flex-row justify-between">
		<div>
			<div class="flex flex-row items-center">
				<h3 class="text-xl font-bold">Latest Invoice</h3>
				<span class="text-sm ml-2">({invoices.length})</span>
			</div>
			<span class="text-sm">Your latest created invoices</span>
		</div>
	</div>
</div>

{#if invoices.length <= 0}
	<div class="flex flex-col justify-center items-center">
		<span class="text-xl">No Data</span>
		<button
			class="btn btn-square mt-4"
			on:click={() => redirect(301, `/u/merchants/${merchant_id}`)}
			><svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				fill="white"
				viewBox="0 0 24 24"
				stroke="currentColor"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"
				/></svg
			></button
		>
	</div>
{:else}
	<div class="flex flex-wrap justify-start">
		{#each invoices as invoice}
			<div class="w-full md:w-1/2 xl:w-1/3">
				<div class="card bg-base-100 shadow-md my-4 mx-5">
					<div class="card-body">
						<div class="card-title justify-between">
							<div class="flex flex-col">
								<span class="prose prose-lg">{`${formatInvoiceNumber(invoice)}`.toUpperCase()}</span
								>
								<span class="prose prose-sm">{`${invoice.customer_name}`}</span>
								<span class="prose prose-sm">{`${invoice.title}`}</span>
							</div>
							<!-- svelte-ignore a11y-label-has-associated-control -->
							<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
							<div class="dropdown dropdown-end">
								<label tabindex="0" class="btn btn-ghost btn-circle btn-primary">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-5 w-5"
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
									{#if invoice.job_schedule == null}
										<li>
											<!-- svelte-ignore a11y-click-events-have-key-events -->
											<label on:click={() => dispatch('set-schedule', invoice)}>Set Schedule</label>
										</li>
									{:else if invoice.job_schedule}
										<li>
											<!-- svelte-ignore a11y-click-events-have-key-events -->
											<label on:click={() => dispatch('detail-schedule', invoice)}
												>Detail Schedule</label
											>
										</li>
									{/if}
									{#if invoice.job_schedule && invoice.job_schedule.status != 'completed'}
										<li>
											<!-- svelte-ignore a11y-click-events-have-key-events -->
											<label on:click={() => dispatch('stop-schedule', invoice)}
												>Stop Schedule</label
											>
										</li>
									{/if}
								</ul>
							</div>
						</div>

						<span class={classBadgeByScheduled(invoice.job_schedule?.status)}>
							<div class="tooltip tooltip-bottom" data-tip={invoice.job_schedule?.status || 'not scheduled'}>
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
			</div>
		{/each}
	</div>
{/if}
