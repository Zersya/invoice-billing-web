<script lang="ts">
	import type { Customer } from '$lib/types/customer';
	import { formatDate } from '$lib/utils/functions';
	import { error, redirect } from '@sveltejs/kit';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

</script>

{#if form?.fail}
	<div class="alert alert-error shadow-lg mb-5 rounded-md">
		<div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="stroke-current flex-shrink-0 h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				><path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
				/></svg
			>
			<span>Error! {form?.message}</span>
		</div>
	</div>
{/if}
{#if data.props.invoices.length <= 0}
	<div class="flex flex-col justify-center items-center">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="stroke-current flex-shrink-0 h-20 w-20"
			fill="none"
			viewBox="0 0 24 24"
			><path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M12 6v6m0 0v6m0-6h6m-6 0H6"
			/></svg
		>
		<span class="text-xl">No Data</span>
		<button class="btn btn-active mt-4" on:click={() => redirect(303, `/u/merchant/${data.slug}`)}
			>Refresh</button
		>
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
									<label for="form-customer"
										>Edit</label
									>
								</li>
								<li>
									<!-- svelte-ignore a11y-click-events-have-key-events -->
									<label for="delete-customer"
										>Delete</label
									>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
{/if}
