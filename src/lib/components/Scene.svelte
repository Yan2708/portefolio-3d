<script lang="ts">
	import { T, useTask, useThrelte } from '@threlte/core';
	import { Float, Grid, OrbitControls } from '@threlte/extras';
	import Paperplane from './models/paperplane.svelte';
	import { CatmullRomCurve3, DoubleSide, Raycaster, Vector2, Vector3 } from 'three';
	import * as THREE from 'three';
	import { onMount } from 'svelte';
	import { interactivity } from '@threlte/extras';
	import { DEG2RAD, degToRad } from 'three/src/math/MathUtils.js';


</script>

<T.PerspectiveCamera makeDefault position={[0, 20, 0]} fov={20}>
	<OrbitControls enableDamping />
</T.PerspectiveCamera>

<T.DirectionalLight intensity={2} position={[5, 10, 10]} />
<T.AmbientLight intensity={0.5} />

<Grid
	position.y={-0.001}
	cellColor="#ffffff"
	sectionColor="#ffffff"
	sectionThickness={0}
	fadeDistance={100}
	cellSize={2} />

