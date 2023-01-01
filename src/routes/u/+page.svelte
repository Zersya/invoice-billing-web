<script lang="ts">
	import moment from 'moment';
	import Calendar from '@toast-ui/calendar';
	import '@toast-ui/calendar/dist/toastui-calendar.min.css';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { utcToLocal } from '$lib/utils/functions';

	export let data: PageData;

	let calendar: Calendar | undefined;
	let date: Date | undefined;

	onMount(() => {
		calendar = new Calendar('#calendar', {
			defaultView: 'month',
			template: {
				time(event) {
					const { start, end, title } = event;

					// get time start HH:mm from start string
					const startHour = utcToLocal(start).toLocaleString('id-ID', {
						hour: 'numeric',
						minute: 'numeric',
						hour12: false
					});
					
					return `<span class="calendar-event-time" style="color: #222; font-size: 9px">${startHour} - <strong>${title}</strong></span>`;
					
				}
			}
		});

		let events = [] as Object[];

		data.props.schedules.forEach((schedule) => {
			for (let i = 0; i < schedule.total_repeat_count; i++) {
				let startTimeDate = moment(schedule.job_data.invoice_date)
					.add(i * schedule.repeat_interval, 'seconds')
					.toDate();

				let isPast = moment(startTimeDate).isBefore(moment());

				let endTimeDate = moment(startTimeDate).add(3600/2, 'seconds').toDate();

				events.push({
					calendarId: `${schedule.id.toString()} ${i.toString()}`,
					title: `${schedule.job_data.customer_name} | ${schedule.job_data.title}`,
					body: schedule.job_data.description,
					start: startTimeDate,
					end: endTimeDate,
					category: 'time',
					backgroundColor: isPast ? '#4caf50' : '#f44336',
				});
			}
		});

		calendar?.createEvents(events);
	});
</script>

{#if calendar}
	<div class="flex justify-between">
		<div class="flex my-5">
			<button
				class="btn rounded-r-none btn-square"
				on:click={() => {
					calendar?.prev();
					date = calendar?.getDate().toDate();
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="white"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width=".25"
						d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"
					/></svg
				>
			</button>
			<button
				class="btn rounded-none"
				on:click={() => {
					calendar?.today();
					date = calendar?.getDate().toDate();
				}}>Today</button
			>
			<button
				class="btn rounded-l-none btn-square"
				on:click={() => {
					calendar?.next();
					date = calendar?.getDate().toDate();
				}}
				><svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="white"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width=".25"
						d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
					/></svg
				></button
			>
		</div>

		<h2 class="my-auto prose-2xl justify-end">
			{moment(date).format('MMMM')}
		</h2>
	</div>
{/if}
<div id="calendar" class="h-screen" />
