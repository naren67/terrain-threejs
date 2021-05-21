import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'



//texture loader eg: images
const loader = new THREE.TextureLoader()
const texture = loader.load('/image/terrain.jpg')
const height = loader.load('/image/mountain.png')
const alpha = loader.load('/image/alpha.png')



// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()



//terrain materils

//objects
const geometry = new THREE.PlaneBufferGeometry(3, 3, 64, 64)

//material
const material = new THREE.MeshStandardMaterial({
    color: 'white',
    map:texture,
                    //image 
    displacementMap: height,
                    //to change the height of the mountain
    displacementScale: 0.6,
            //to hide the sharp edges of the mountain
    alphaMap: alpha,
    transparent: true,
            //to fix the handmade alpha png file
            depthTest: false
})

//mesh
const plane = new THREE.Mesh(geometry, material)

//scene
scene.add(plane)

//make a default plane view
plane.rotation.x = 181

//camera controller
gui.add(plane.rotation, 'x').min(0).max(600)





// // Objects...................................................dosent need
// const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );

// // Materials

// const material = new THREE.MeshBasicMaterial()
// material.color = new THREE.Color(0xff0000)

// // Mesh
// const sphere = new THREE.Mesh(geometry,material)
// scene.add(sphere)

// Lights
                           //actual default light //light strength
const pointLight = new THREE.PointLight('#00b3ff', 0.9)
                    //change the value to our desired one
pointLight.position.x = -1.7
pointLight.position.y = 3.1
pointLight.position.z = 0.1
scene.add(pointLight)

//light controller
gui.add(pointLight.position, 'x')
gui.add(pointLight.position, 'y')
gui.add(pointLight.position, 'z')

const colorController = { color: '#00ff00'}
gui.addColor(colorController, 'color').onChange(()=>{
    pointLight.color.set(colorController.color)
})

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth /1.2,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth /1.2
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 3
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha : true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))



/**
 * Animate
 */


document.addEventListener('mousemove', terrainHeightChange)
let mouseY = 0

function terrainHeightChange(event){
        mouseY = event.clientY
}







const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // sphere.rotation.y = .5 * elapsedTime


        //to spin the object
        plane.rotation.z = elapsedTime * 0.3

      //add the terraint heightchange mousemove event here
                                    //min height     //max height  //multiply to slow down the animation process
      plane.material.displacementScale = 0.2 + mouseY * 0.0008


    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()