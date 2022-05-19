// import orbit control from online lib
import {OrbitControls} from 'https://cdn.skypack.dev/@three-ts/orbit-controls';

// try in lib import

// loading manager
/*
const loadingManager = new THREE.LoadingManager()

loadingManager.onStart = () => {
    console.log('onStart')
}

loadingManager.onLoaded = () => {
    console.log('onLoaded')
}

loadingManager.onProgress = () => {
    console.log('onProgress')
}

loadingManager.onError = () => {
    console.log('onError')
}
*/

// scene
const scene = new THREE.Scene()

// cube
const geometry = new THREE.BoxGeometry( 1, 1, 1)

// textures loader
const textureLoader = new THREE.TextureLoader()

// load textures
// diffuse

const textureDiffA = textureLoader.load( '/texture/texture_diff.png' )
const textureDiffB = textureLoader.load( '/texture/texture_diff2.png' )
const textureDiffC = textureLoader.load( '/texture/texture_diff3.png' )

// metalness
const textureMetalA = textureLoader.load( '/texture/texture_metal.png' )

// roughness
const textureRoughA = textureLoader.load( '/texture/texture_rough.png' )

// normal
const textureNormalA = textureLoader.load( '/texture/texture_normal.png' )

// alpha ( Optional )

// height ( Optional )

// stop mip map generation


// material
const material = new THREE.MeshBasicMaterial( { map: textureDiffA } )

// mesh
const mesh = new THREE.Mesh( geometry, material )

// mesh position
mesh.position.set( 0, 0, 0 )

// axes helper
//const axesHelper = new THREE.AxesHelper()
//scene.add(axesHelper)                             // no need now

// adding the mesh to scene
scene.add(mesh)

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
camera.position.z = 3


// adding the camera to scene
scene.add( camera )

// adding camera orvit control
const controls = new OrbitControls( camera, canvas)

// changing camera target to mesh
controls.target = mesh.position

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

// renderer
const renderer = new THREE.WebGLRenderer( {
    canvas: canvas
} )

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