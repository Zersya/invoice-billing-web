<script lang="ts">
	import moment from 'moment';
	import Calendar from '@toast-ui/calendar';
	import '@toast-ui/calendar/dist/toastui-calendar.min.css';
	import { onMount } from 'svelte';
	import type { PageData } from '../../routes/u/$types';
	import { utcToLocal } from '$lib/utils/functions';
	import type { JobSchedule } from '$lib/types/job_schedule';

	export let schedules: Array<JobSchedule | undefined>;
	export let isFullTitle: boolean = false;

	let calendar: Calendar | undefined;
	let date: Date | undefined;

	onMount(() => {
		// is on mobile device
		let isMobile = window.innerWidth < 768;

		calendar = new Calendar('#calendar', {
			defaultView: isMobile ? 'day' : 'month',
			isReadOnly: true,
			theme: {
				common: {
					border: '1px solid #e5e5e5',
					backgroundColor: 'transparent'
				},
			},
			template: {
				time(event) {
					const { start, title } = event;

					const startHour = utcToLocal(start).toLocaleString('id-ID', {
						hour: 'numeric',
						minute: 'numeric',
						hour12: false
					});

					return `<span class="calendar-event-time" style="color: #fff; font-size: 9px">${startHour} - <strong>${title}</strong></span>`;
				},

				task(event) {
					const { start, title } = event;

					// get time start HH:mm from start string
					const startHour = utcToLocal(start).toLocaleString('id-ID', {
						hour: 'numeric',
						minute: 'numeric',
						hour12: false
					});

					return `<span style="color: #fff; font-size: 9px">${startHour} - <strong>${title}</strong></span>`;
				}
			}
		});

		let events = [] as Object[];

		// re order schedules based on run_at and status
		schedules.sort((a, b) => {
			if (a?.status == 'completed' && b?.status != 'completed') return 1;
			if (a?.status != 'completed' && b?.status == 'completed') return -1;

			if (a?.run_at && b?.run_at) {
				if (moment(a?.run_at).isBefore(moment(b?.run_at))) return -1;
				if (moment(a?.run_at).isAfter(moment(b?.run_at))) return 1;
			}

			return 0;
		});

		schedules.forEach((schedule) => {
			if (!schedule) return;

			for (let i = 0; i < schedule.total_repeat_count; i++) {
				// if (schedule.job_type == "send_reminder") continue;
				
				// let runAt = utcToLocal
				let startTimeDate = moment(schedule.run_at)
					.add(i * schedule.repeat_interval, 'seconds')
					.toDate();

				let startTimeDateLocal = utcToLocal(startTimeDate);

				let isPast = moment(startTimeDateLocal).isBefore(moment().add(1, 'hours'));

				let endTimeDate = moment(startTimeDate)
					.add(3600 / 2, 'seconds')
					.toDate();

				events.push({
					id: `${schedule.id.toString()}`,
					title: isFullTitle
						? `${schedule.job_data.customer_name} | ${schedule.job_data.title}`
						: schedule.job_data.title,
					body: schedule.job_data.description,
					start: startTimeDate,
					end: endTimeDate,
					category: 'task',
					backgroundColor:
						schedule.status == 'completed' ? '#4075a6b0' : schedule.status == 'pending' ? '#E9A296b0' : isPast ? '#4caf50b0' : '#f44336b0'
				});
			}
		});

		calendar?.createEvents(events);
	});
</script>

{#if calendar}
	<div class="md:flex sm:flex-wrap md:justify-between">
		<div class="flex my-5">
			<button
				class="btn btn-outline btn-sm mr-2"
				on:click={() => {
					calendar?.today();
					date = calendar?.getDate().toDate();
				}}>Today</button
			>
			<button
				class="btn btn-outline btn-circle btn-sm mr-2"
				on:click={() => {
					calendar?.prev();
					date = calendar?.getDate().toDate();
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
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
				class="btn btn-outline btn-circle btn-sm"
				on:click={() => {
					calendar?.next();
					date = calendar?.getDate().toDate();
				}}
				><svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
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
