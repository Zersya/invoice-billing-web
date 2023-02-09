<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import CustomForm from '$lib/components/CustomForm.svelte';

	var now = new Date();

	var day = ('0' + now.getDate()).slice(-2);
	var month = ('0' + (now.getMonth() + 1)).slice(-2);

	var today = now.getFullYear() + '-' + month + '-' + day;

	export let merchant_id: string;
	export let customer_id: string | undefined;
	// export let amount: string | undefined;

	const dispatch = createEventDispatcher();
</script>

<CustomForm action={'?/createInvoice'} on:completed={() => dispatch('completed')}>
	<div class="form-control w-full" slot="input">
		<input type="hidden" name="customer_id" value={customer_id} />
		<input type="hidden" name="merchant_id" value={merchant_id} />

		<label for="title" class="required">Title</label>
		<input
			required
			name="title"
			type="text"
			placeholder="Type your title here"
			class="input input-bordered w-full mb-3"
		/>
		<label for="description">Description</label>
		<input
			name="description"
			type="text"
			placeholder="Type your description here"
			class="input input-bordered w-full mb-3"
		/>
		<label for="amount" class="required">Amount</label>
		<input
			required
			name="amount"
			type="number"
			placeholder="Type your amount here"
			class="input input-bordered w-full mb-3"
		/>
		<label for="date" class="required">Date</label>
		<input
			required
			name="date"
			type="date"
			value={today}
			class="input input-bordered pa-4 rounded-lg w-full mb-2"
		/>
		<span class="label-text-alt">Your actual print date of the invoice</span>
	</div>
	<button
		slot="submit"
		let:isLoading
		type="submit"
		class="btn btn-block btn-primary mt-5 {isLoading ? 'loading' : ''}">Save</button
	>
</CustomForm>
