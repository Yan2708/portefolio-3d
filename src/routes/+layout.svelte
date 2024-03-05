<script lang="ts">
	import '../app.css';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<nav class="fixed top-0 left-0 w-full z-50 bg-transparent m-4">
	<div class="flex justify-between items-center mr-7">
		<a href="/" class="font-bold text-xl text-white">Yannick Li</a>
		<ul class="flex space-x-4">
			<li><a href="/projects" class="text-white hover:text-gray-200">Projects</a></li>
			<li><a href="/contact" class="text-white hover:text-gray-200">Contact</a></li>
		</ul>
	</div>
</nav>
<slot />

<style>
	:global(body) {
		background-color: black;
		margin: 0;
	}
	:global(.full-container) {
		width: 100vw;
		height: 100vh;
		background: #000;
	}
</style>
