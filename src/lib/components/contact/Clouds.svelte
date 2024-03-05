<script>
    import { T, useThrelte } from '@threlte/core'
    import { Instance, InstancedMesh } from '@threlte/extras';
    import {
		SphereGeometry,
		BufferGeometry,
		MeshStandardMaterial,
		Mesh,

		MeshLambertMaterial,

		Vector3,

		DoubleSide



	} from 'three';
    import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
	import { rangeMap, rangeMap2 } from '../Utils';


    const CLOUD_COUNT = 10
    const { scene } = useThrelte()

    let clouds = [1]
    const generateCloud = ()=>{
        const mergedGeoms = [];

        const tuft1 = new SphereGeometry(1.5,7,8)
        tuft1.translate(0,0,2)
        mergedGeoms.push(tuft1)
        const tuft2 = new SphereGeometry(1.5,7,8)
        tuft2.translate(0,0,-2)
        mergedGeoms.push(tuft2)
        const tuft3 = new SphereGeometry(2,7,8)
        tuft3.translate(0,0,0)
        mergedGeoms.push(tuft3)

        const cloud = BufferGeometryUtils.mergeGeometries(mergedGeoms)
        
        let merged = BufferGeometryUtils.mergeVertices(cloud,0.2)
        //jitter
        // console.log(cloud.index)
        // const vertex = new Vector3();
        // const positionAttribute = cloud.getAttribute( 'position' );
        // const index = cloud.index?.count ?? 0
        // for ( let i = 0; i < positionAttribute.count; i+=3 ) {
            
            //     vertex.fromBufferAttribute( positionAttribute, i )
            //     positionAttribute.setXYZ( i, vertex.x+rangeMap2(Math.random(),0,1,-0.2,0.2), vertex.y+rangeMap2(Math.random(),0,1,-0.2,0.2), vertex.z+rangeMap2(Math.random(),0,1,-0.2,0.2))
            // }
        merged.attributes.position.array.forEach((_, i, arr) => {
            arr[i]+=rangeMap(Math.random(),0.2,-0.2)
        })
        
        merged = BufferGeometryUtils.mergeVertices(merged,0.2)
        //delete bottom

        const mesh = new Mesh(merged, new MeshLambertMaterial({color:'white', flatShading:true, side: DoubleSide}))
        // @ts-ignore
        console.log(cloud.attributes.position.count/3, merged.attributes.position.count/3)
        scene.add(mesh)
        return cloud
    }
    let cloudGeo = generateCloud()

    for(let i=0; i < CLOUD_COUNT; i++){

    }
</script>

<InstancedMesh     
    limit={CLOUD_COUNT}
    range={CLOUD_COUNT}>

    <T.BufferGeometry {cloudGeo}/>
    <T.MeshStandardMaterial />

    {#each clouds as cloud}
        <Instance position={[0,0,0]}/>
    {/each}

</InstancedMesh>