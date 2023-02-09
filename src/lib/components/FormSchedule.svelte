<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import CustomForm from '$lib/components/CustomForm.svelte';

	var now = new Date();

	var day = ('0' + now.getDate()).slice(-2);
	var month = ('0' + (now.getMonth() + 1)).slice(-2);

	var today = now.getFullYear() + '-' + month + '-' + day;

	export let job_type: string | undefined;
	export let external_id: string | undefined;
	export let merchant_id: string;
	export let tag: string | undefined;

	let is_recurring = false;

	const dispatch = createEventDispatcher();
</script>

<CustomForm action={'?/setSchedule'} on:completed={() => dispatch('completed')}>
	<div slot="input">
		<input type="hidden" name="job_type" value={job_type} />
		<input type="hidden" name="merchant_id" value={merchant_id} />
		<input type="hidden" name="is_recurring" value={is_recurring} />

		{#if external_id}
			<input type="hidden" name="external_id" value={external_id} />
		{/if}

		{#if tag}
			<input type="hidden" name="tag" value={tag} />
		{/if}

		{#if job_type === 'send_reminder'}
			<label for="title" class="required">Title</label>
			<input
				required
				name="title"
				type="text"
				placeholder="Type your title here"
				class="input input-bordered w-full mb-3"
			/>
			<label for="description" class="required">Description</label>
			<input
				name="description"
				type="text"
				placeholder="Type your description here"
				class="input input-bordered w-full mb-3"
			/>
		{/if}

		<div class="flex flex-column w-full mb-3 pa-4">
			<span class="mr-3">Does it recurring?</span>
			<input type="checkbox" class="input toggle" bind:checked={is_recurring} />
		</div>

		{#if is_recurring}
			<label for="start_schedule_date" class="required">Start Schedule Date</label>
			<input
				name="start_schedule_date"
				type="date"
				value={today}
				class="input input-bordered pa-4 rounded-lg w-full mb-3"
			/>

			<label for="end_schedule_date" class="required">End Schedule Date</label>
			<input
				name="end_schedule_date"
				type="date"
				value={today}
				class="input input-bordered pa-4 rounded-lg w-full mb-3"
			/>

			<label for="repeat_interval_type" class="required">Repeat Interval Type</label>
			<select name="repeat_interval_type" class="select input-bordered pa-4 rounded-lg w-full mb-3">
				<option disabled>Pick your repeat interval type</option>
				<!-- <option value="PERMINUTE">Per-minute</option> -->
				<option value="HOURLY">Hourly</option>
				<option value="DAILY">Daily</option>
				<option value="WEEKLY">Weekly</option>
				<option value="MONTHLY">Monthly</option>
			</select>
		{/if}
	</div>

	<button
		slot="submit"
		let:isLoading
		type="submit"
		class="btn btn-block btn-primary mt-5 {isLoading ? 'loading' : ''}">Send</button
	>
</CustomForm>
