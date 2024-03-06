<script lang="ts">
	import { T, useThrelte } from '@threlte/core';
	import { Grid, MeshLineGeometry, MeshLineMaterial, OrbitControls } from '@threlte/extras';
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { DoubleSide } from 'three';
	import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
	import { DEG2RAD } from 'three/src/math/MathUtils.js';

	const { scene } = useThrelte();
	const loader = new SVGLoader();
	let shapes = new Array();
	let list 
	onMount(() => {
		loader.load('/Name.svg', (data) => {
			const paths = data.paths;
			paths.forEach((path) => {
				shapes=[...shapes,...SVGLoader.createShapes(path)]
			});
			shapes.forEach(shape=>{
				console.log(shape.extractPoints(10))
				list.push(shape.extractPoints(10).shape.map(p => new THREE.Vector3(p.x,p.y,0)))
			})
			console.log(list)
		});
	});
	
</script>
<T.Color attach="background" args={[0x3ca5fe]} />
<T.PerspectiveCamera makeDefault position={[0, 0, 20]} fov={100}>
	<OrbitControls enableDamping target.y={10} />
</T.PerspectiveCamera>

<T.OrthographicCamera  args={[-100,100,100,-100,150,1000]}>

</T.OrthographicCamera>

<T.DirectionalLight intensity={2} position={[5, 10, 10]} />
<T.AmbientLight intensity={1} />

<Grid
	position.y={-0.001}
	cellColor="#ffffff"
	sectionColor="#ffffff"
	sectionThickness={0}
	fadeDistance={1000}
	cellSize={2} />

<!-- {#each shapes as shape, i (i)}
	
	<T.Mesh scale={[0.1,0.1,0.1]} rotation={[DEG2RAD*180,0,0]}>
		<T.ShapeGeometry
			args={[shapes]} />
		<T.MeshBasicMaterial color={Math.random() * 0xffffff} side={DoubleSide} />
	</T.Mesh>
{/each} -->

{#each list as points}
<T.Mesh
position.y={3}
scale={2}
>
	<MeshLineGeometry
	{points}
	/>
	<MeshLineMaterial color="#fe3d00" />
</T.Mesh>
{/each}

