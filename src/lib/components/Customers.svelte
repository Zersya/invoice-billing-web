<script lang="ts">
	import type { Customer } from '$lib/types/customer';
	import { formatDate } from '$lib/utils/functions';
	import { redirect } from '@sveltejs/kit';
	import { createEventDispatcher } from 'svelte';

	export let customers: Customer[];
	export let merchant_id: string;
	export let ableToAddInvoice: boolean = false;
	export let ableToSendReminder: boolean = false;
	export let ableToDetail: boolean = false;

	const dispatch = createEventDispatcher();

	function getStatusVerified(verified_at: string | null) {
		if (verified_at) {
			return 'Verified';
		} else {
			return 'Not Verified';
		}
	}

	function getColorStatusVerified(verified_at: string | null) {
		if (verified_at) {
			return 'green';
		} else {
			return 'red';
		}
	}
</script>

<div class="m-5">
	<div class="md:flex flex-row justify-between">
		<div>
			<div class="flex flex-row items-center">
				<h3 class="text-xl font-bold">Customers</h3>
				<span class="text-sm ml-2">({customers.length})</span>
			</div>
			<span class="text-sm">Your customers related by your brand / services</span>
		</div>

		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<button class="btn btn-primary w-full md:w-auto" on:click={() => dispatch('add')}>Add</button>
	</div>
</div>

{#if customers.length <= 0}
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
		{#each customers as customer}
			<div class="w-full md:w-1/2 xl:w-1/3">
				<div class="card bg-base-100 shadow-md my-4 mx-5">
					<div class="card-body">
						<div class="card-title justify-between">
							<div class="flex items-center">
								<h2>{customer.name}</h2>
								<div class="tooltip" data-tip="{getStatusVerified(customer.verified_at)}">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-5 w-5 ml-2"
										viewBox="0 0 24 24"
										fill="{getColorStatusVerified(customer.verified_at)}"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z"
										/></svg
									>
								</div>
							</div>
							<!-- svelte-ignore a11y-label-has-associated-control -->
							<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
							<div class="dropdown dropdown-end">
								<label tabindex="0" class="btn btn-ghost btn-circle btn-primary">
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
									{#if ableToSendReminder}
										<li>
											<!-- svelte-ignore a11y-click-events-have-key-events -->
											<span on:click={() => dispatch('send-reminder', customer)}>Send Reminder</span
											>
										</li>
									{/if}
									{#if ableToAddInvoice}
										<li>
											<!-- svelte-ignore a11y-click-events-have-key-events -->
											<span on:click={() => dispatch('add-invoice', customer)}>Add Invoice</span>
										</li>
									{/if}
									<li>
										<!-- svelte-ignore a11y-click-events-have-key-events -->
										<span on:click={() => dispatch('edit', customer)}>Edit</span>
									</li>
									<li>
										<!-- svelte-ignore a11y-click-events-have-key-events -->
										<span on:click={() => dispatch('delete', customer)}>Delete</span>
									</li>
								</ul>
							</div>
						</div>
						<p class="mb-3 prose prose-sm badge badge-primary">{customer.contact_channel_name}</p>

						{#if customer.tags}
							<div class="flex flex-wrap mb-10 h-5 gap-1">
								{#each customer.tags as tag}
									<div class="badge badge-outline mr-1 mb-1">{tag}</div>
								{/each}
							</div>
						{/if}

						<div class="flex md:flex-row flex-col mt-8 md:mt-0 justify-between">
							<div class="flex flex-col">
								<span class="prose prose-slate">Updated Date</span>
								<span>{formatDate(customer.updated_at)}</span>
							</div>
							{#if ableToDetail}
								<a href="/u/merchants/{merchant_id}/customers/{customer.id}" class="btn btn-ghost mt-6 md:mt-0"
									>View</a
								>
							{/if}
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
{/if}
