<script lang="ts">
	import { T, useThrelte } from '@threlte/core';
	import { Float, Grid, OrbitControls, interactivity } from '@threlte/extras';
	import {
		Color,
		DoubleSide,
		Mesh,
		Raycaster,
		Vector2,
		Vector3
	} from 'three';
	import Paperplane from '../models/paperplane.svelte';
	import Git from '../models/git.svelte';
	import Insta from '../models/insta.svelte';
	import Linkedin from '../models/linkedin.svelte';
	import Mail from '../models/mail.svelte';
	import Clouds from './Clouds.svelte';
	import { onMount } from 'svelte';
	import { DEG2RAD } from 'three/src/math/MathUtils.js';
	import { rangeMap } from '../Utils';
	
	const { renderer, camera, scene } = useThrelte();
	const yRange = new Vector2(-10,3)

	let pointer3d = new Vector3();
	let lastPointer3d = new Vector3();
	let backMesh,horizontalMesh,verticalMesh

	scene.background = new Color(0x3ca5fe);
	interactivity();


	onMount(() => {
		let pointer = new Vector2();
		const raycaster = new Raycaster();
		
		const onPointerMove = (event: { clientX: number; clientY: number }) => {
			pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
			pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
			raycaster.setFromCamera(pointer, $camera);
			let intersection = raycaster.intersectObject(horizontalMesh);
			lastPointer3d = intersection[0]?.point??lastPointer3d
			let y = rangeMap(event.clientY / window.innerHeight,yRange.x,yRange.y) 
			if(intersection.length===0){
				intersection=raycaster.intersectObjects([backMesh,verticalMesh]);
				lastPointer3d = intersection[0]?.point??lastPointer3d
			}
			pointer3d=new Vector3(lastPointer3d.x,y,lastPointer3d.z)
		}

		window.addEventListener('pointermove', onPointerMove);
		return () => {
			window.removeEventListener('pointermove', onPointerMove);
		};
	});
</script>

<T.PerspectiveCamera makeDefault position={[-25, 10, -10]} fov={25}>
	<OrbitControls enableDamping target.y={1.5} />
</T.PerspectiveCamera>
<T.DirectionalLight intensity={2} position={[5, 10, 10]} />
<T.AmbientLight intensity={0.5} color="white" />

<Grid
	position.y={-0.001}
	cellColor="#ffffff"
	sectionColor="#ffffff"
	sectionThickness={0}
	fadeDistance={100}
	cellSize={2} />

<Float floatingRange={[0, 1]}>
	<Paperplane  position={[pointer3d.x, pointer3d.y, pointer3d.z]}/>
	<T.Mesh position={[pointer3d.x, pointer3d.y, pointer3d.z]}>

	</T.Mesh>
</Float>

<!-- plane limit meshes -->
<T.Mesh 
	bind:ref={backMesh} 
	position={[0,0,20]} 
	visible={false}
	scale={[60, 30, 10]} >
	<T.PlaneGeometry args={[1, 1, 1]} />
	<T.MeshStandardMaterial color="pink" side={DoubleSide} />
</T.Mesh>

<T.Mesh
	bind:ref={horizontalMesh}
	position={[0,-10,0]}
	rotation.x={DEG2RAD * -90}
	visible={false}
	scale={[60, 40, 10]}>
	<T.PlaneGeometry args={[1, 1, 1]} />
</T.Mesh>

<T.Mesh
	bind:ref={verticalMesh}
	position={[30,0,0]}
	rotation.y={DEG2RAD*90}
	visible={false}
	scale={[60, 40, 10]}>
	<T.PlaneGeometry args={[1, 1, 1]} />
	<T.MeshStandardMaterial color="blue" side={DoubleSide} />
</T.Mesh>

<!-- ground -->

<!-- clouds -->
<Clouds />
<Git />
<Insta />
<Linkedin />
<Mail />