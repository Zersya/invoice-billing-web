<script lang="ts">
	import '../../app.css';
	import '../styles.css';
	import { onMount } from 'svelte';
	import inving from '$lib/images/inving-logo.png';
	import Breadcumbs from './Breadcumbs.svelte';
	import { themeChange } from 'theme-change';

	let isMobile = false;

	onMount(() => {
		isMobile = window.innerWidth < 768;

		themeChange(false);
	});
</script>

<main>
	<!-- <div class="navbar rounded-lg bg-base-100">
		<div class="navbar-start">
			<img src={inving} width="45" alt="inving" />
		</div>
		<div class="navbar-end">
			<div class="flex-none">
				<ul class="menu menu-horizontal px-1">
					<li><a href="/u">Dashboard</a></li>
					<li><a href="/u/merchants">Merchants</a></li>
				</ul>
			</div>
			<form method="POST" action="/u?/signout">
				<button class="btn btn-ghost btn-circle btn-primary">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						viewBox="0 0 24 24"
						stroke="currentColor"
						><path
							stroke-width=".25"
							d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z"
						/></svg
					>
				</button>
			</form>
		</div>
	</div> -->

	<div class="drawer drawer-mobile">
		<input id="my-drawer" type="checkbox" class="drawer-toggle" />
		<div class="drawer-content px-10 py-2">
			{#if isMobile}
				<label for="my-drawer" class="btn btn-ghost btn-circle drawer-button">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						viewBox="0 0 24 24"
						stroke="currentColor"
						><path stroke-width=".25" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" /></svg
					>
				</label>
			{/if}
			<Breadcumbs />
			<slot />
		</div>
		<div class="drawer-side drop-shadow">
			<label for="my-drawer" class="drawer-overlay" />
			<ul class="menu p-4 w-80 bg-base-100 text-base-content">
				<div class="flex justify-between mb-3">
					<img src={inving} width="45" alt="inving" />

					{#if isMobile}
						<label for="my-drawer" class="btn btn-ghost btn-circle drawer-button">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5"
								viewBox="0 0 24 24"
								stroke="currentColor"
								><path
									stroke-width=".25"
									d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
								/></svg
							>
						</label>
					{/if}
				</div>
				<li>
					<a href="/u"
						><svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							viewBox="0 0 24 24"
							stroke="currentColor"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width=".25"
								d="M13,3V9H21V3M13,21H21V11H13M3,21H11V15H3M3,13H11V3H3V13Z"
							/></svg
						>Dashboard</a
					>
				</li>
				<li>
					<a href="/u/merchants"
						><svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							viewBox="0 0 24 24"
							stroke="currentColor"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width=".25"
								d="M12,18H6V14H12M21,14V12L20,7H4L3,12V14H4V20H14V14H18V20H20V14M20,4H4V6H20V4Z"
							/></svg
						>Merchants</a
					>
				</li>
				<div
					class="flex flex-row justify-around"
					style="position:fixed; bottom: 3rem; right: 0; left: 0;"
				>
					<select class="select input-bordered w-9/12 max-w-xs mx-auto" data-choose-theme>
						<option value="mytheme">Default</option>
						<option value="dark">Dark</option>
						<option value="cupcake">Cupcake</option>
						<option value="forest">Forest</option>
					</select>
					<form method="POST" action="/u?/signout">
						<button class="btn btn-ghost btn-circle btn-primary mr-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5"
								viewBox="0 0 24 24"
								stroke="currentColor"
								><path
									stroke-width=".25"
									d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z"
								/></svg
							>
						</button>
					</form>
				</div>
			</ul>
		</div>
	</div>
</main>
