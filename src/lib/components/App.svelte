<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Scene from './Scene.svelte';
	import PlaneScene from './contact/PlaneScene.svelte';
	import { page } from '$app/stores';
</script>

<Canvas>
	{#if $page.url.pathname == '/'}
		<Scene />
	{:else if $page.url.pathname == '/contact'}
		<PlaneScene />
	{:else if $page.url.pathname == '/projects'}
		<Scene />
	{/if}
</Canvas>
