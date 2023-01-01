<script lang="ts">
	import '../../app.css';
	import '../styles.css';
	import inving from '$lib/images/inving-logo.png';
	import Breadcumbs from './Breadcumbs.svelte';
</script>

<main>
	<div class="navbar rounded-lg bg-base-100">
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
				<button class="btn btn-ghost btn-circle">
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
	</div>
	<Breadcumbs />
	<slot />
</main>
