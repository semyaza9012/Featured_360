//console.log(THREE)

// scene
const scene = new THREE.Scene()

// cube
const geometry = new THREE.BoxGeometry( 1, 1, 1)

// material
const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } )

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

// camera look at
camera.lookAt( mesh.position )

// adding the camera to scene
scene.add( camera )

// renderer
const renderer = new THREE.WebGLRenderer( {
    canvas: canvas
} )

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
    mesh.rotation.x += 0.002 * deltaTime
    mesh.rotation.y += 0.002 * deltaTime
    mesh.rotation.z += 0.002 * deltaTime

    // render if animated
    renderer.render( scene, camera)


    window.requestAnimationFrame( tick )
}

tick()