<!--
Auto-generated by: https://github.com/threlte/threlte/tree/main/packages/gltf
Command: npx @threlte/gltf@2.0.3 C:\Users\yniak\Documents\PJ\PORTEFOLIO\protefolio-3d\static\models\insta.glb --root /models/ --types --printwidth 120 --precision 2
-->

<script lang="ts">
  import type * as THREE from 'three'
  import { Group } from 'three'
  import { T, type Props, type Events, type Slots, forwardEventHandlers } from '@threlte/core'
  import { useGltf } from '@threlte/extras'

  type $$Props = Props<THREE.Group>
  type $$Events = Events<THREE.Group>
  type $$Slots = Slots<THREE.Group> & { fallback: {}; error: { error: any } }

  export const ref = new Group()

  type GLTFResult = {
    nodes: {
      Cube003: THREE.Mesh
      Cube004: THREE.Mesh
      Cylinder001: THREE.Mesh
      Cylinder002: THREE.Mesh
    }
    materials: {
      ['Material.007']: THREE.MeshStandardMaterial
      ['Material.005']: THREE.MeshStandardMaterial
    }
  }

  const gltf = useGltf<GLTFResult>('/models/insta.glb')

  const component = forwardEventHandlers()
</script>

<T is={ref} dispose={false} {...$$restProps} bind:this={$component}>
  {#await gltf}
    <slot name="fallback" />
  {:then gltf}
    <T.Mesh
      geometry={gltf.nodes.Cube003.geometry}
      material={gltf.materials['Material.007']}
      position={[-7.94, 10.81, -12.83]}
      scale={[2.98, 0.75, 3.02]}
    />
    <T.Mesh
      geometry={gltf.nodes.Cube004.geometry}
      material={gltf.materials['Material.005']}
      position={[-7.94, 10.81, -12.83]}
      scale={[2.15, 0.85, 2.17]}
    />
    <T.Mesh
      geometry={gltf.nodes.Cylinder001.geometry}
      material={gltf.materials['Material.005']}
      position={[-7.94, 10.81, -12.83]}
      scale={[1.12, 0.84, 1.12]}
    />
    <T.Mesh
      geometry={gltf.nodes.Cylinder002.geometry}
      material={gltf.materials['Material.005']}
      position={[-6.77, 10.81, -13.99]}
      scale={[0.25, 0.85, 0.25]}
    />
  {:catch error}
    <slot name="error" {error} />
  {/await}

  <slot {ref} />
</T>
