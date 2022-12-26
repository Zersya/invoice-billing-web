<script lang="ts">
	import type { PageData } from './$types';

	var now = new Date();

	var day = ('0' + now.getDate()).slice(-2);
	var month = ('0' + (now.getMonth() + 1)).slice(-2);

	var today = now.getFullYear() + '-' + month + '-' + day;

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
	<input name="date" type="date" value={today} class="input pa-4 rounded-lg w-full mb-3" />

	<button type="submit" class="btn btn-block mt-5">Save</button>
</form>

<style>
	form {
		flex-direction: column;
		align-items: center;
	}
</style>
