<script lang="ts">
	import '../../app.css';
	import '../styles.css';
	import { onMount } from 'svelte';
	import inving from '$lib/images/inving-logo.png';
	import Breadcumbs from './Breadcumbs.svelte';
	import { themeChange } from 'theme-change';

	onMount(() => {
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
		<input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
		<div class="drawer-content px-10 py-2">
			<Breadcumbs />
			<slot />
		</div>
		<div class="drawer-side">
			<label for="my-drawer-2" class="drawer-overlay" />
			<ul class="menu p-4 w-80 bg-base-100 text-base-content">
				<div class="flex justify-between mb-3">
					<img src={inving} width="45" alt="inving" />
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
				<select
					class="input input-bordered w-9/12 max-w-xs mx-auto"
					style="position:fixed; bottom: 3rem; right: 0; left: 0;"
					data-choose-theme
				>
					<option value="mytheme">Default</option>
					<option value="dark">Dark</option>
					<option value="cupcake">Cupcake</option>
					<option value="forest">Forest</option>
				</select>
			</ul>
		</div>
	</div>
</main>
