// import from online lib
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from 'https://cdn.skypack.dev/@three-ts/orbit-controls'


// scene
const scene = new THREE.Scene()

// update all materials to add env map
const updateAllMaterials = () => {
    scene.traverse( ( child ) => {

        if( child.isMesh && child.material instanceof THREE.MeshStandardMaterial ){
        //console.log(child)
        child.computeBoundingBox()
        console.log(child.boundingBox)
        //child.material.envMap = environmentMap
        //controls.target = child.position
        }
        /*
        if( child instanceof THREE.Group ){
            child.material.envmap = environmentMap
            child.material.envmapIntensity = 20
            //child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial
        }
        */
    })
}

// cube
//const geometry = new THREE.BoxGeometry( 1, 1, 1)


// lighting
const ambientLight = new THREE.AmbientLight( 0xffffff, 1 )
scene.add( ambientLight )

const directionalLight = new THREE.DirectionalLight( '#ffffff', 3 )
directionalLight.position.set( 0.25, 3, -2.25)
scene.add( directionalLight )

const cubeTextureLoader = new THREE.CubeTextureLoader()
const environmentMap = cubeTextureLoader.load([
    '../environment map/px.jpg',
    '../environment map/nx.jpg',
    '../environment map/py.jpg',
    '../environment map/ny.jpg',
    '../environment map/pz.jpg',
    '../environment map/nz.jpg',
])
scene.background = environmentMap


/*
const pointLight = new THREE.PointLight( 0xffffff, 1 )
pointLight.position.x = 2
pointLight.position.y = 1.5
pointLight.position.z = 2
scene.add( pointLight )
*/

// material
/*
const material = new THREE.MeshStandardMaterial( { 
    
    map: textureDiffA,
    metalnessMap: textureMetalA,
    roughnessMap: textureRoughA,
    normalMap: textureNormalA
    
} )
*/

// mesh
//const mesh = new THREE.Mesh( geometry, material )

// load models
const gltfLoader = new GLTFLoader()

gltfLoader.load(
    '../static/B0725SLB6Q.glb',
    (gltf) => {

        /*
        const mixer = new THREE.AnimationMixer(glb)
        const open = mixer.clipAction(gltf.animation[0])

        open.play()

        // update mixer
        if (mixer !== null){
        mixer.update(deltaTime)         do it in tick update
        }
        */

        /*
        scene.add( gltf.scene.children[0] )


        const children = [ ...gltf.scene.children ]

        for( const child of children ){
            scene.add(child)
        }
        

        while( gltf..length ){
            scene.add( gltf..[0] )
        }
        */

        console.log(gltf.scene.children[0])
        
        scene.add(gltf.scene)
        //gltf.scene.material.envMap = environmentMap
        //gltf.scene.children.material.envmap = environmentMap
    }
)

/*
// mesh position
mesh.position.set( 0, 0, 0 )
*/

// axes helper
//const axesHelper = new THREE.AxesHelper()
//scene.add(axesHelper)                             // no need now

// bounding box
//mesh.computeBoundingBox()                                                   bounding box

// adding the mesh to scene
//scene.add(mesh)

//get element from canvas HTML
const canvas = document.querySelector( '.view' )

// camera size
/*const sizes = {
    width: canvas.width,
    height: canvas.height
}*/

// camera
const camera = new THREE.PerspectiveCamera( 75, canvas.width/canvas.height, 0.01, 1000)
//const camera = new THREE.PerspectiveCamera( 75, sizes.width/sizes.height, 0.01, 1000)

// camera position
camera.position.z = 1


// adding the camera to scene
scene.add( camera )

// adding camera orvit control
const controls = new OrbitControls( camera, canvas)

// changing camera target to mesh
//controls.target =                                             mesh.position
controls.enablePan = false

scene.traverse( ( child ) => {

    if( child.isMesh && child.material instanceof THREE.MeshStandardMaterial ){
        console.log(child)
        
    }
})

// adding damping to movement
controls.enableDamping = true

// reduce manual rotation speed
controls.rotateSpeed = 0.2

// auto rotate                                               (make it stop for a certain time , make a button to stop and start auto rotation)
var autoRotation = Boolean(true)


window.addEventListener( 'click', () => {
    if (autoRotation = true) {
        autoRotation = false
    }
    else if (autoRotation = false) {
        autoRotation = true
    }
} )
controls.autoRotate = autoRotation

controls.autoRotateSpeed = 1

updateAllMaterials()

// renderer
const renderer = new THREE.WebGLRenderer( {
    canvas: canvas
} )
renderer.physicallyCorrectLights = true

// dealing with pixel ratio
renderer.setPixelRatio( Math.min( window.devicePixelRatio, 2 ) )

// set render size
renderer.setSize( canvas.width, canvas.height )
//renderer.setSize( sizes.width, sizes.height )

// render if static
//renderer.render( scene, camera)

// time
let time = Date.now()

//Animations
const tick = () => {

    // time current
    const currentTime = Date.now()

    // delta change time
    const deltaTime = currentTime - time

    // update time
    time = currentTime


    // animate the object
    /*
    mesh.rotation.x += 0.002 * deltaTime
    mesh.rotation.y += 0.002 * deltaTime
    mesh.rotation.z += 0.002 * deltaTime
    */

    //camera.lookAt(mesh.position)

    // update controls
    controls.update()

    // render if animated
    renderer.render( scene, camera)


    window.requestAnimationFrame( tick )
}

tick()