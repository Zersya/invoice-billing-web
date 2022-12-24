<script lang="ts">
	import '../../app.css';
	import '../styles.css';
    import inving_banner from '$lib/images/inving-banner.png';
    import inving from '$lib/images/inving.png';
</script>

<div class="app">
	<div class="navbar rounded-lg bg-base-100">
		<div class="navbar-start">
            <picture class="mr-3">
				<img src={inving} width="45" alt="inving" />
			</picture>
			<!-- <div class="dropdown">
				<label tabindex="0" class="btn btn-ghost btn-circle">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h7"
						/></svg
					>
				</label>
				<ul
					tabindex="0"
					class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
				>
					<li><a>Homepage</a></li>
					<li><a>Portfolio</a></li>
					<li><a>About</a></li>
				</ul>
			</div> -->
		</div>
		<div class="navbar-end">
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
	<main>
		<slot />
	</main>
</div>
