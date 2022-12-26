<script lang="ts">
	import type { PageData } from './$types';

	let date = new Date();

	export let merchant_id: string;
	export let customer_id: string | undefined;
	export let amount: string | undefined;

	export let data: PageData;
</script>

<form method="POST" action={'?/createInvoice'}>
	<input type="hidden" name="customer_id" value={customer_id} />
	<input type="hidden" name="merchant_id" value={merchant_id} />

	<label for="name">Amount</label>
	<input
		name="amount"
		type="number"
		placeholder="Type your merchant amount here"
		bind:value={amount}
		class="input w-full mb-3"
	/>
	<label for="date">Date</label>
	<input name="date" type="date" class="input pa-4 rounded-lg w-full" />

	<button type="submit" class="btn btn-block mt-5">Save</button>
</form>

<style>
	form {
		flex-direction: column;
		align-items: center;
	}
</style>
