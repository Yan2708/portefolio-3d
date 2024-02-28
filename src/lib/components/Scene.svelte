<script lang="ts">
	import { T, useTask, useThrelte } from '@threlte/core';
	import { Float, Grid, OrbitControls } from '@threlte/extras';
	import Paperplane from './models/paperplane.svelte';
	import { Raycaster, Vector2, Vector3 } from 'three';
	import { onMount } from 'svelte';
	import { interactivity } from '@threlte/extras'

  let intersectionPoint = new Vector3()
  let cRotation
  
  interactivity()

  const { camera, scene } = useThrelte()

	onMount(() => {

    const raycaster = new Raycaster()
    const pointer = new Vector2()

		function onPointerMove(event: { clientX: number; clientY: number }) {
			pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
			pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(pointer, $camera)
      const intersects = raycaster.intersectObjects(scene.children)
      intersectionPoint = intersects[0]?.point ?? new Vector3()
      

		}

		window.addEventListener('pointermove', onPointerMove);
		return () => {
			window.removeEventListener('pointermove', onPointerMove);
		};
    
	});
  
  useTask((delta) => {
    cRotation=camera.current.rotation.toArray()
  })
</script>

<T.PerspectiveCamera makeDefault position={[-10, 10, 10]} fov={50}>
	<OrbitControls enableDamping target.y={1.5} />
</T.PerspectiveCamera>

<T.DirectionalLight intensity={2} position.x={5} position.y={10} />
<T.AmbientLight intensity={0.2} />

<Grid
	position.y={-0.001}
	cellColor="#ffffff"
	sectionColor="#ffffff"
	sectionThickness={0}
	fadeDistance={100}
	cellSize={2}
/>

<Float floatingRange={[1, 2]}>
	<Paperplane  rotation={[intersectionPoint.y, 0, intersectionPoint.y, 'ZXY']}
  />
</Float>

<T.Mesh rotation={cRotation}>
	<T.PlaneGeometry args={[20, 20,20]} />
	<T.MeshStandardMaterial color="hotpink"/>
</T.Mesh>
