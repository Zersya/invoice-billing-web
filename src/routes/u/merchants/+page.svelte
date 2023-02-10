<script lang="ts">
	import type { Merchant } from '$lib/types/merchant';
	import { formatDate } from '$lib/utils/functions';
	import { redirect } from '@sveltejs/kit';
	import ModalConfirm from '$lib/components/ModalConfirm.svelte';
	import type { PageData } from './$types';
	import CustomForm from '$lib/components/CustomForm.svelte';
	import AuthenticatedPage from '$lib/components/AuthenticatedPage.svelte';

	export let data: PageData;

	let selectedMerchant: Merchant | null = null;

	let isDeleteModalOpen: boolean = false;
	let isFormModalOpen: boolean = false;

	function isSelectedCountryCode(country_code: string): boolean {
		if (!selectedMerchant) return false;
		return selectedMerchant?.phone_country_code === country_code;
	}
</script>

<svelte:head>
	<title>Merchants - Manage your services</title>
</svelte:head>
<AuthenticatedPage>
	<div slot="modals">
		<div class="modal" class:modal-open={isFormModalOpen}>
			<div class="modal-box relative var(--color-bg-1)">
				<button
					class="btn btn-sm btn-circle btn-primary absolute right-2 top-2"
					on:click={() => (isFormModalOpen = false)}>✕</button
				>
				<h3 class="text-lg font-bold mb-4">
					{#if !selectedMerchant}
						Form Create Merchant
					{:else}
						Form Update Merchant
					{/if}
				</h3>

				<CustomForm
					action={selectedMerchant?.id ? '?/updateMerchant' : '?/createMerchant'}
					is_reset={!selectedMerchant}
					on:completed={() => {
						isFormModalOpen = false;
					}}
				>
					<div slot="input">
						<input type="hidden" name="id" value={selectedMerchant?.id} />

						<label for="name" class="required">Name</label>
						<input
							required
							name="name"
							type="text"
							placeholder="Type your merchant name here"
							value={selectedMerchant?.name || ''}
							class="input input-bordered w-full mb-3"
						/>
						<label for="description" class="required">Description</label>
						<input
							required
							name="description"
							type="multiline"
							placeholder="Type your merchant description here"
							value={selectedMerchant?.description || ''}
							class="input input-bordered w-full mb-3"
						/>
						<label for="address">Address</label>
						<input
							name="address"
							type="multiline"
							placeholder="Type your merchant address here"
							value={selectedMerchant?.address || ''}
							class="input input-bordered w-full mb-3"
						/>
						<div class="flex">
							<span class="mr-3 flex-1">
								<label for="phone_country_code">Country Code</label>
								<select name="phone_country_code" class="input input-bordered w-full mb-3">
									<option value="" selected>Select Country Code</option>
									{#each data.props.phone_country_codes as phone_country_code}
										<option
											value={phone_country_code.dial_code}
											selected={selectedMerchant?.phone_country_code === phone_country_code.dial_code}
										>
											{phone_country_code.name}
											{phone_country_code.dial_code}
										</option>
									{/each}
								</select>
							</span>
							<span>
								<label for="phone_number">Phone Number</label>
								<input
									name="phone_number"
									type="text"
									placeholder="Type your merchant phone number here"
									value={selectedMerchant?.phone_number || ''}
									class="input input-bordered w-full mb-3"
								/>
							</span>
						</div>
						<div class="flex">
							<label for="tax">Default Tax ( % )</label>

							<div
								class="tooltip tooltip-right"
								data-tip="for your invoice customers, It's editable on invoice"
							>
								<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 24 24"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z"
									/></svg
								>
							</div>
						</div>
						<input
							name="tax"
							type="number"
							placeholder="Type your merchant default tax for customers"
							value={((selectedMerchant?.tax || 0) * 100).toFixed(0)}
							class="input input-bordered w-full mb-3"
						/>
					</div>

					<button
						slot="submit"
						let:isLoading
						type="submit"
						class="btn btn-block btn-primary {isLoading ? 'loading' : ''}">Save</button
					>
				</CustomForm>
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
	</div>
	<div class="m-5">
		<div class="md:flex flex-row justify-between">
			<div>
				<h3 class="text-2xl">Merchants</h3>
				<span class="text-sm">Could be your brands / services</span>
			</div>
			<div class="mt-2 md:mt-0">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<button
					class="btn btn-primary w-full md:w-auto"
					on:click={() => {
						selectedMerchant = null;
						isFormModalOpen = true;
					}}>Add</button
				>
			</div>
		</div>
	</div>
	{#if data.props.merchants.length <= 0}
		<div class="flex flex-col justify-center items-center">
			<span class="text-xl">No Data</span>
			<button class="btn btn-square mt-4" on:click={() => redirect(301, '/u/merchants')}
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
									<span class="prose prose-slate">Created Date</span>
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
</AuthenticatedPage>
