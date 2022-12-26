<script lang="ts">
	var now = new Date();

	var day = ('0' + now.getDate()).slice(-2);
	var month = ('0' + (now.getMonth() + 1)).slice(-2);

	var today = now.getFullYear() + '-' + month + '-' + day;

	export let invoice_id: string | undefined;
	export let merchant_id: string;
</script>

<form method="POST" action={'?/setScheduleInvoice'}>
	<input type="hidden" name="invoice_id" value={invoice_id} />
	<input type="hidden" name="merchant_id" value={merchant_id} />

	<label for="start_schedule_date">Start Schedule Date</label>
	<input
		name="start_schedule_date"
		type="date"
		value={today}
		class="input pa-4 rounded-lg w-full mb-3"
	/>

	<label for="end_schedule_date">End Schedule Date</label>
	<input
		name="end_schedule_date"
		type="date"
		value={today}
		class="input pa-4 rounded-lg w-full mb-3"
	/>

	<label for="repeat_interval_type">Repeat Interval Type</label>
	<select name="repeat_interval_type" class="input pa-4 rounded-lg w-full mb-3">
		<option disabled>Pick your repeat interval type</option>
		<option value="PERMINUTE">Per-minute</option>
		<option value="HOURLY">Hourly</option>
		<option value="DAILY">Daily</option>
		<option value="WEEKLY">Weekly</option>
		<option value="MONTHLY">Monthly</option>
	</select>

	<button type="submit" class="btn btn-block mt-5">Save</button>
</form>

<style>
	form {
		flex-direction: column;
		align-items: center;
	}
</style>
