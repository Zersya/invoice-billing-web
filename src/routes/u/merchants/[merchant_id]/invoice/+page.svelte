<script lang="ts">
	import type { Customer } from '$lib/types/customer';
	import { formatDate } from '$lib/utils/functions';
	import { error, redirect } from '@sveltejs/kit';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;
</script>

{#if data.props.invoices.length <= 0}
	<div class="flex flex-col justify-center items-center">
		<span class="text-xl">No Data</span>
		<button class="btn btn-square mt-4" on:click={() => redirect(301, `/u/merchants/${data.merchant_id}`)}>
			<svg
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
			>
		</button>
	</div>
{:else}
	<div class="flex flex-wrap justify-around">
		{#each data.props.invoices as invoice}
			<div class="card w-96 bg-base-100 shadow-xl my-4 mx-5">
				<div class="card-body">
					<div class="card-title justify-between">
						<h2>{invoice.invoice_number}</h2>
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
									<!-- svelte-ignore a11y-click-events-have-key-events -->
									<label for="form-customer">Edit</label>
								</li>
								<li>
									<!-- svelte-ignore a11y-click-events-have-key-events -->
									<label for="delete-customer">Delete</label>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
{/if}
