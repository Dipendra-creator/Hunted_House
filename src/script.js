import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

const script = document.createElement('script');
script.onload = function () {
    const stats = new Stats();
    document.body.appendChild(stats.dom);
    requestAnimationFrame(function loop() {
        stats.update();
        requestAnimationFrame(loop)
    });
};
script.src = '//mrdoob.github.io/stats.js/build/stats.min.js';
document.head.appendChild(script);

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
{
    scene.fog = new THREE.Fog('#262837', 1, 15)
}

// Fog
// const fog = new THREE.Fog('#ff0000', 1, 15)
// scene.fog = fog

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const doorColorTexture = textureLoader.load('https://dipendra-creator.github.io/WEB-DEV/Three.js/Hunted_House/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('https://dipendra-creator.github.io/WEB-DEV/Three.js/Hunted_House/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('https://dipendra-creator.github.io/WEB-DEV/Three.js/Hunted_House/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('https://dipendra-creator.github.io/WEB-DEV/Three.js/Hunted_House/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('https://dipendra-creator.github.io/WEB-DEV/Three.js/Hunted_House/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('https://dipendra-creator.github.io/WEB-DEV/Three.js/Hunted_House/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('https://dipendra-creator.github.io/WEB-DEV/Three.js/Hunted_House/textures/door/roughness.jpg')

const brickColorTexture = textureLoader.load('https://dipendra-creator.github.io/WEB-DEV/Three.js/Hunted_House/textures/bricks/color.jpg')
const brickAmbientOcclusionTexture = textureLoader.load('https://dipendra-creator.github.io/WEB-DEV/Three.js/Hunted_House/textures/bricks/ambientOcclusion.jpg')
const brickNormalTexture = textureLoader.load('https://dipendra-creator.github.io/WEB-DEV/Three.js/Hunted_House/textures/bricks/normal.jpg')
const brickRoughnessTexture = textureLoader.load('https://dipendra-creator.github.io/WEB-DEV/Three.js/Hunted_House/textures/bricks/roughness.jpg')

const grassColorTexture = textureLoader.load('https://dipendra-creator.github.io/WEB-DEV/Three.js/Hunted_House/textures/grass/color.jpg')
const grassAmbientOcclusionTexture = textureLoader.load('https://dipendra-creator.github.io/WEB-DEV/Three.js/Hunted_House/textures/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('https://dipendra-creator.github.io/WEB-DEV/Three.js/Hunted_House/textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('https://dipendra-creator.github.io/WEB-DEV/Three.js/Hunted_House/textures/grass/roughness.jpg')

grassColorTexture.repeat.set(8, 8)
grassAmbientOcclusionTexture.repeat.set(8, 8)
grassNormalTexture.repeat.set(8, 8)
grassRoughnessTexture.repeat.set(8, 8)

grassColorTexture.wrapS = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping
/**
 * House
 */
// Group
const house = new THREE.Group()
scene.add(house)

// Walls
const walls = new THREE.Mesh(
    new THREE.BoxBufferGeometry(4, 3, 4),
    new THREE.MeshStandardMaterial({ 
        map:brickColorTexture,
        aoMapIntensity:brickAmbientOcclusionTexture ,
        normalMap:brickNormalTexture,
        roughnessMap:brickRoughnessTexture
    })
)
walls.position.y = 1.5

house.add(walls)

// Roof 
const roof = new THREE.Mesh(
    new THREE.ConeBufferGeometry(3.5, 1.2, 4),
    new THREE.MeshStandardMaterial({ color: '#b35f45' })
)
roof.position.y = 3 + 0.6
// roof.rotation.y = 0.75
roof.rotation.y = Math.PI/4
gui.add(roof.rotation, 'y').min(0).max(1).step(0.01).name('Roof Rotate')
house.add(roof)

const door = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(2,2),
    new THREE.MeshStandardMaterial({ 
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture,
    })
)

door.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
)
walls.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
)
door.position.y = 1
door.position.z = 2 + 0.01
house.add(door)

// Bushes
const bushGeometry = new THREE.SphereBufferGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#B9c854' })

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 2.2)

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 2.1)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(-0.8, 0.1, 2.3)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)

var min= -2;
var max= -1; 
var random = Math.random() * (+max - +min) + +min;

bush4.position.set(random, 0.05, 2.6)

house.add(bush1, bush2, bush3, bush4)

// New Group
const graves = new THREE.Group()
scene.add(graves)

const graveGeometry = new THREE.BoxBufferGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b3b6b1' })

for (let i = 0; i < 50; i++) {
    const angle = Math.random() * Math.PI * 2
    const radius = 3 + Math.random() * 6
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius

    const grave = new THREE.Mesh(graveGeometry, graveMaterial)
    grave.position.set(x, 0.3, z)
    grave.rotation.y = (Math.random() - 0.5) * 0.6
    grave.rotation.z = (Math.random() - 0.5) * 0.6
    grave.castShadow = true
    graves.add(grave)
}

// Bed
const cube = new THREE.Mesh(
    new THREE.BoxBufferGeometry(1, 0.2, 2),
    new THREE.MeshStandardMaterial({ color: 'red'})
)

cube.position.set(0, 0.11, 0)
scene.add(cube)

// FAN
const fan = new THREE.Group()
scene.add(fan)

// Fan Stick
const fstick = new THREE.Mesh(
    new THREE.CylinderGeometry( 0.03, 0.03, 0.3, 64 ),
    new THREE.MeshStandardMaterial()
)
fstick.position.set(0, 3, 0)
fan.add(fstick)
// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(20, 20),
    new THREE.MeshStandardMaterial({ 
        map: grassColorTexture,
        aoMapIntensity: grassAmbientOcclusionTexture,
        normalMap: grassNormalTexture,
        roughnessMap: grassRoughnessTexture
    })
)

// Fan Motor top
const fmotorT = new THREE.Mesh(
    new THREE.CylinderGeometry( 0.03, 0.3, 0.3, 64 ),
    new THREE.MeshStandardMaterial()
)
fmotorT.position.set(0, 2.9, 0)
fmotorT.scale.y = 0.34
fan.add(fmotorT)

// Fan Motor
const fmotor = new THREE.Mesh(
    new THREE.CylinderGeometry( 0.3, 0.3, 0.3, 64 ),
    new THREE.MeshStandardMaterial()
)
fmotor.position.set(0, 2.8, 0)
fmotor.scale.y = 0.34
fan.add(fmotor)

const fhand = new THREE.Mesh(
    new THREE.BoxBufferGeometry(2.5, 0.04, 0.25),
    new THREE.MeshStandardMaterial()
)

fhand.position.set(0, 2.8, 0)
fan.add(fhand)

floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

floor.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
)
/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001).name('Ambient Light')
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001).name('Moon Light')
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001).name('MoonX')
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001).name('MoonY')
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001).name('MoonZ')
scene.add(moonLight)

// Door Light
const doorLight = new THREE.PointLight('#ff7d46', 1, 7)
doorLight.position.set(0, 2.2, 2.7)
house.add(doorLight)

/**
 * Ghosts
 */
const ghosts1 = new THREE.PointLight('#ff00ff', 8, 3)
scene.add(ghosts1)

const ghosts2 = new THREE.PointLight('#00ffff', 8, 3)
scene.add(ghosts2)

const ghosts3 = new THREE.PointLight('#ffff00', 8, 3)
scene.add(ghosts3)
// Fog
const fog = new THREE.Fog('#262B37', 1, 15)
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
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
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#262837')
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFShadowMap

moonLight.castShadow = true
doorLight.castShadow = true
ghosts1.castShadow = true
ghosts2.castShadow = true
ghosts3.castShadow = true
walls.castShadow = true
bush1.castShadow = true
bush2.castShadow = true
bush3.castShadow = true
bush4.castShadow = true

floor.receiveShadow = true

doorLight.shadow.mapSize.width = 256
doorLight.shadow.mapSize.height = 256
doorLight.shadow.camera.far = 7

ghosts1.shadow.mapSize.width = 256
ghosts1.shadow.mapSize.height = 256
ghosts1.shadow.camera.far = 7

ghosts2.shadow.mapSize.width = 256
ghosts2.shadow.mapSize.height = 256
ghosts2.shadow.camera.far = 7

ghosts3.shadow.mapSize.width = 256
ghosts3.shadow.mapSize.height = 256
ghosts3.shadow.camera.far = 7

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    const ghosts1Angle = elapsedTime * 0.5
    ghosts1.position.x = Math.cos(ghosts1Angle) * 4
    ghosts1.position.z = Math.sin(ghosts1Angle) * 4

    const ghosts2Angle = elapsedTime * 0.32
    ghosts2.position.x = Math.sin(ghosts2Angle) * 5
    ghosts2.position.z = Math.cos(ghosts2Angle) * 5

    const ghosts3Angle = elapsedTime * 0.12
    ghosts3.position.x = Math.tan(ghosts3Angle * 3) * 6
    ghosts3.position.z = Math.sin(ghosts3Angle * 3) * 6

    // Fan Rotation
    fan.rotation.y = (Math.sin(elapsedTime) + Math.cos(elapsedTime))*10
    // cube.position.y = Math.sin(elapsedTime * 0.5)
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

