<script lang="ts">
	import { Canvas } from '@threlte/core';
	import PlaneScene from './contact/PlaneScene.svelte';
	import { page } from '$app/stores';
	import AboutMeScene from './about/AboutMeScene.svelte';
</script>

<Canvas>
	{#if $page.url.pathname == '/'}
		<AboutMeScene />
	{:else if $page.url.pathname == '/contact'}
		<PlaneScene />
	{:else if $page.url.pathname == '/projects'}
		<!-- <Scene /> -->
	{/if}
</Canvas>
