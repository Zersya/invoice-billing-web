<script lang="ts">
	import { page } from '$app/stores';
	import type { Merchant } from '$lib/types/merchant';
	import { formatDate } from '$lib/utils/functions';
	import { fail, redirect } from '@sveltejs/kit';
	import ModalConfirm from '../ModalConfirm.svelte';
	import type { ActionData, PageData } from './$types';
	import Form from '../Form.svelte';

	export let form: ActionData;
	export let data: PageData;

	let selectedMerchant: Merchant | null = null;

	let isDeleteModalOpen: boolean = false;
	let isFormModalOpen: boolean = false;
</script>

<div class="modal" class:modal-open={isFormModalOpen}>
	<div class="modal-box relative var(--color-bg-1)">
		<button
			class="btn btn-sm btn-circle absolute right-2 top-2"
			on:click={() => (isFormModalOpen = false)}>✕</button
		>
		<h3 class="text-lg font-bold mb-4">
			{#if !selectedMerchant}
				Form Create Merchant
			{:else}
				Form Update Merchant
			{/if}
		</h3>

		<Form
			action={selectedMerchant?.id ? '?/updateMerchant' : '?/createMerchant'}
			on:completed={() => {
				isFormModalOpen = false;
			}}
		>
			<div slot="input">
				<input type="hidden" name="id" value={selectedMerchant?.id} />

				<label for="name">Name</label>
				<input
					name="name"
					type="text"
					placeholder="Type your merchant name here"
					value={selectedMerchant?.name || ''}
					class="input w-full mb-3"
				/>
				<label for="description">Description</label>
				<input
					name="description"
					type="multiline"
					placeholder="Type your merchant description here"
					value={selectedMerchant?.description || ''}
					class="input w-full mb-3"
				/>
			</div>

			<button
				slot="submit"
				let:isLoading
				type="submit"
				class="btn btn-block {isLoading ? 'loading' : ''}">Save</button
			>
		</Form>
	</div>
</div>

<ModalConfirm
	title="Confirm Delete"
	content="Are you sure want to delete this merchant?"
	action="?/deleteMerchant"
	label_positive="Delete"
	isModalOpen={isDeleteModalOpen}
	on:completed={() => {
		isDeleteModalOpen = false;
	}}
	on:cancel={() => {
		isDeleteModalOpen = false;
	}}
>
	<input type="hidden" name="id" value={selectedMerchant?.id} />
</ModalConfirm>

<div class="m-5">
	<div class="flex flex-row justify-between">
		<div>
			<h3 class="text-2xl">Merchants</h3>
			<span class="text-sm">Could be your brands / services</span>
		</div>
		<div class="flex flex-row">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<label
				for="form-merchant"
				class="btn btn-active"
				on:click={() => {
					selectedMerchant = null;
					isFormModalOpen = true;
				}}>Add</label
			>
		</div>
	</div>
</div>
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

{#if data.props.merchants.length <= 0}
	<div class="flex flex-col justify-center items-center">
		<span class="text-xl">No Data</span>
		<button class="btn btn-square mt-4" on:click={() => redirect(303, '/u/merchants')}
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
		{#each data.props.merchants as merchant}
			<div class="w-full md:w-1/2 xl:w-1/3">
				<div class="card bg-base-100 shadow-xl my-4 mx-2">
					<div class="card-body">
						<div class="card-title justify-between">
							<h2>{merchant.name}</h2>

							<div class="dropdown dropdown-end">
								<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
								<!-- svelte-ignore a11y-label-has-associated-control -->
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
								<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
								<ul
									tabindex="0"
									class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
								>
									<li>
										<!-- svelte-ignore a11y-click-events-have-key-events -->
										<label
											for="form-merchant"
											on:click={() => {
												selectedMerchant = merchant;
												isFormModalOpen = true;
											}}>Edit</label
										>
									</li>
									<li>
										<!-- svelte-ignore a11y-click-events-have-key-events -->
										<label
											for="delete-merchant"
											on:click={() => {
												selectedMerchant = merchant;
												isDeleteModalOpen = true;
											}}>Delete</label
										>
									</li>
								</ul>
							</div>
						</div>
						<p class="mb-3">{merchant.description}</p>
						<div class="flex flex-row justify-between">
							<div class="flex flex-col">
								<span class="text-gray-500">Created Date</span>
								<span>{formatDate(merchant.created_at)}</span>
							</div>
							<a href="/u/merchants/{merchant.id}" class="btn btn-ghost">View</a>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
{/if}
