<script lang="ts">
	import type { Customer } from '$lib/types/customer';
	import { formatDate } from '$lib/utils/functions';
	import { redirect } from '@sveltejs/kit';
	import { createEventDispatcher } from 'svelte';

	export let customers: Customer[];
	export let merchant_id: string;

	const dispatch = createEventDispatcher();
</script>

<div class="m-5">
	<div class="flex flex-row justify-between">
		<div>
			<h3 class="text-2xl">Customers</h3>
			<span class="text-sm">Your customers related by your brand / services</span>
		</div>

		<div class="flex flex-row">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<button for="form-customer" class="btn btn-active" on:click={() => dispatch('add')}
				>Add</button
			>
		</div>
	</div>
</div>

{#if customers.length <= 0}
	<div class="flex flex-col justify-center items-center">
		<span class="text-xl">No Data</span>
		<button class="btn btn-square mt-4" on:click={() => redirect(303, `/u/merchant/${merchant_id}`)}
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
				<div class="card bg-base-100 shadow-xl my-4 mx-5">
					<div class="card-body">
						<div class="card-title justify-between">
							<h2>{customer.name}</h2>
							<!-- svelte-ignore a11y-label-has-associated-control -->
							<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
							<div class="dropdown dropdown-end">
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
										<label for="form-invoice" on:click={() => dispatch('add-invoice', customer)}
											>Add Invoice</label
										>
									</li>
									<li>
										<!-- svelte-ignore a11y-click-events-have-key-events -->
										<label for="form-customer" on:click={() => dispatch('edit', customer)}
											>Edit</label
										>
									</li>
									<li>
										<!-- svelte-ignore a11y-click-events-have-key-events -->
										<label for="delete-customer" on:click={() => dispatch('delete', customer)}
											>Delete</label
										>
									</li>
								</ul>
							</div>
						</div>
						<p class="mb-3 prose prose-sm badge">{customer.contact_channel_name}</p>
						<div class="flex flex-row justify-between">
							<div class="flex flex-col">
								<span class="text-gray-500">Updated Date</span>
								<span>{formatDate(customer.updated_at)}</span>
							</div>
							<!-- <a href="/u/merchant/{data.slug}/customer/{customer.id}/invoice" class="btn btn-ghost">View</a> -->
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
{/if}
