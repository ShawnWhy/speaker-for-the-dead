import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { LoopOnce, SphereGeometry, TextureLoader } from 'three'
import CANNON, { Sphere } from 'cannon'
import $ from "./Jquery"


let selectedObject
let selectedModel
let selectedDot
let selectChildIndex

const textureLoader = new THREE.TextureLoader()

// Canvas
const canvas = document.querySelector('canvas.webgl')
// Scene
const scene = new THREE.Scene()
//raycaster
const raycaster = new THREE.Raycaster()

//cannon
const world = new CANNON.World()
world.broadphase = new CANNON.SAPBroadphase(world)
world.allowSleep = true
world.gravity.set(0, - 9.82, 0)

const defaultMaterial = new CANNON.Material('default')
const defaultContactMaterial = new CANNON.ContactMaterial(
    defaultMaterial,
    defaultMaterial,
    {
        friction: 30,
        restitution: 0.1
    }
)

const objectsToUpdate = []
 const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}



window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

 

})

// const randomColors = [new THREE.Color("orange"), new THREE.Color("AFFF33"), new THREE.Color( "33BEFF"), new THREE.Color("3C21A9")]

const selectMaterial = new THREE.MeshStandardMaterial({color:'black'})
const selectMaterial2 = new THREE.MeshStandardMaterial({color:'yellow'})





let her
let herMixer
let hertalk
let hertalk2
let hertalk3
let hertalk4
let hertalk5
let hertalk6
let hertalk7

let herModel
let herDots
let herDots2

const geom = new THREE.BoxGeometry()
const blockmaterial = new THREE.MeshBasicMaterial()


// const geom = new THREE.BoxGeometry()
// const material = new THREE.MeshBasicMaterial()
// const mergedGeometry = new THREE.BufferGeometry()
// for ( let i = 0 ; i < 25 ; i ++ ) {
//    const nodeGeometry = geom.clone()
//    nodeGeometry.translate(random(),random(),random())
//    mergedGeometry.merge(nodeGeometry)
// }
// const myCluster = new THREE.Mesh( mergedGeometry, material)



const mouse = new THREE.Vector2()
mouse.x = null
mouse.y=null
mouse.y2 = null

window.addEventListener('mousemove', (event) =>

{
   
   
    mouse.x = event.clientX / sizes.width * 2 - 1
    mouse.y = - (event.clientY / sizes.height) * 2 + 1
    mouse.y2 =-(event.clientY / sizes.height)
   


})

const speak = function(string){
var array = string.split('');
for(let i=0; i<array.length; i++){
    var letter = array[i].toLowerCase()
    switch (letter) {
        case 'a':case "e": case "i":
            
          console.log('Oranges are $0.59 a pound.');
          break;
        case 'b':case 'm':case'p':
         console.log('Oranges are $0.59 a pound.');
          break;
        case 'f':case'v':
          console.log('Mangoes and papayas are $2.79 a pound.');
          break;
        case "i":
          console.log('Mangoes and papayas are $2.79 a pound.');
          break;

        case "0":
        console.log('Mangoes and papayas are $2.79 a pound.');
        break;
        case "c":case "h":case "c":case "d":case "q":case "k":case "t":case "x":case "y":case "n":
        console.log('Mangoes and papayas are $2.79 a pound.');
        break;
        default:
          console.log(`Sorry, we are out of ${expr}.`);
      }
      
}


}

const gltfLoader = new GLTFLoader()

gltfLoader.load(
    '/her.glb',
    (gltf) =>
    {
     
        her=gltf.scene
        console.log(her);

        // her.quaternion.set(0,0,0)
        // her.rotation.set(0,0,0)
        // her.children[0].up.set(0,0,0)

        herMixer = new THREE.AnimationMixer(her)
        console.log(herMixer)
        hertalk = herMixer.clipAction(gltf.animations[0]) 
        hertalk2 = herMixer.clipAction(gltf.animations[1]) 

        hertalk3 = herMixer.clipAction(gltf.animations[2]) 

        hertalk4 = herMixer.clipAction(gltf.animations[3]) 

        hertalk5 = herMixer.clipAction(gltf.animations[4]) 
        hertalk6 = herMixer.clipAction(gltf.animations[5]) 
        hertalk7 = herMixer.clipAction(gltf.animations[6])


        hertalk.timeScale=2
        hertalk2.timeScale=2
        hertalk3.timeScale=2
        hertalk4.timeScale=2
        hertalk5.timeScale=2
        hertalk6.timeScale=2
        hertalk7.timeScale=2

        hertalk.setLoop( THREE.LoopRepeat ,1 );
        hertalk2.setLoop( THREE.LoopRepeat ,1 );
        hertalk3.setLoop( THREE.LoopRepeat ,1 );
        hertalk4.setLoop( THREE.LoopRepeat ,1 );
        hertalk5.setLoop( THREE.LoopRepeat ,1 );
        hertalk6.setLoop( THREE.LoopRepeat ,1 );
        hertalk7.setLoop( THREE.LoopRepeat ,1 );

        
        hertalk.play()
        setTimeout(() => {
            hertalk2.play()
            setTimeout(() => {
                hertalk6.play()
                setTimeout(() => {
                    hertalk4.play()
                    setTimeout(() => {
                        hertalk6.play()
                        setTimeout(() => {
                            hertalk5.play()
                            setTimeout(() => {
                                hertalk7.play()
                                setTimeout(() => {
                                    hertalk3.play()
                                    
                                }, 200);
                                
                            }, 200);
                            
                        }, 200);
                        
                    }, 200);

                    
                }, 200);
                
            }, 200);
            
        }, 200);
        // hertalk2.play()
        // hertalk4.play()
        // hertalk5.play()
        // hertalk6.play()
        // hertalk.play()

        // her.scale.set(5, 5, 5);
        // her.rotation.y= Math.PI;
        // her.rotation.x= Math.PI*.43;


        // scene.add(her);




        her.traverse((child)=>{
            child.material = selectMaterial
            
        })
        // her.children[0].children[4].children[1].material = selectMaterial2


        selectedObject = her.children[0].children[4];
        selectedObject.rotation.y= Math.PI;
        selectedObject.rotation.x= Math.PI*.4;

        // her.rotation.x= Math.PI*.43;
        scene.add(her);
        

    }
)



gltfLoader.load(
    '/her.glb',
    (gltf) =>
    {
        herModel = gltf.scene;
        selectedModel = herModel.children[0].children[4].children;

        
    }
)

gltfLoader.load(
    '/her.glb',
    (gltf) =>
    {
        let her = gltf.scene;

        console.log(her)
        // her.quaternion.set(0,0,0)
        // her.rotation.set(0,0,0)
        
        let herDotCoordinates = her.children[0].children[4].geometry.attributes.position.array;

        // let herDotCoordinates2 = her.children[0].children[4].children[0].geometry.attributes.position.array;

        //createherdots 
        const herDotColors = new Float32Array(herDotCoordinates.length * 3)
        const colorInside = new THREE.Color('blue')
        const colorOutside = new THREE.Color('blue')
        const colorInside2 = new THREE.Color('green')
        const colorOutside2 = new THREE.Color('yellow')

        for(let i = 0; i < herDotCoordinates.length; i++)
    {
    const i3 = i * 3
    const mixedColor = colorInside.clone()  
    mixedColor.lerp(colorOutside, her.children[0].children[4].geometry.attributes.position.array[i3+1]/2+.5)
    herDotColors[i3    ] = mixedColor.r
    herDotColors[i3 + 1] = mixedColor.g
    herDotColors[i3 + 2] = mixedColor.b
    }   

    let pixleMaterial = new THREE.PointsMaterial({
        // color:"red",
        fog:true,
        size:.1,
        depthWrite: true,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
        sizeAttenuation :true,
    })
    let pixleMaterial2 = new THREE.PointsMaterial({
        color:"blue",
        size:.3,
        depthWrite: true,
        blending: THREE.AdditiveBlending,
        vertexColors: true
    })



    let herDotsGeometry = new THREE.BufferGeometry;
        
    herDotsGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(herDotCoordinates,3)
    )
    herDotsGeometry.setAttribute(
        'color',
        new THREE.BufferAttribute(herDotColors,3)
    )

    herDots = new THREE.Points(herDotsGeometry, pixleMaterial)
        
    herDots.scale.set(3,3,3)
    herDots.rotation.set(Math.PI*.43, Math.PI, 0)
    herDots.position.set(0,13,-3.9)
    
    selectedDot = herDots
    selectChildIndex = 1

    scene.add(herDots)

    


        
    }
)



const ambientLight = new THREE.AmbientLight('orange', .5)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight('#F5F5DC', 2)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(- 5, 5, 3)
scene.add(directionalLight)

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 1000)
if(sizes.width>860){
camera.position.set(0, 0, 60)
}
else{
    camera.position.set(0, 0,20)
}

scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0, 0)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setClearColor( 'black',.5);

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

raycaster.setFromCamera(mouse, camera)


//function for mousemove



var transformedSkinVertex = function (skin, index) {
    // console.log(skin)
    var skinIndices = (new THREE.Vector4 ()).fromBufferAttribute (skin.geometry.getAttribute ('skinIndex'), index);
    var skinWeights = (new THREE.Vector4 ()).fromBufferAttribute (skin.geometry.getAttribute ('skinWeight'), index);
    var skinVertex = (new THREE.Vector3 ()).fromBufferAttribute (skin.geometry.getAttribute ('position'), index).applyMatrix4 (skin.bindMatrix);
    var result = new THREE.Vector3 ()
    var temp = new THREE.Vector3 ()
     var tempMatrix = new THREE.Matrix4 ()
     var properties = ['x', 'y', 'z', 'w'];
    for (var i = 0; i < 4; i++) {
        var boneIndex = skinIndices[properties[i]];
        // console.log(boneIndex)
        tempMatrix.multiplyMatrices (skin.skeleton.bones[boneIndex].matrixWorld, skin.skeleton.boneInverses[boneIndex]);
        result.add (temp.copy (skinVertex).applyMatrix4 (tempMatrix).multiplyScalar (skinWeights[properties[i]]));
    }
    return result.applyMatrix4 (skin.bindMatrixInverse);
};

function controlVerts(dots, object){

    // console.log("controlverts")
    // console.log(dots)
    // console.log("object")
    // console.log(object)

if(dots.geometry.attributes.position.array){
    
for(let i=0; i<dots.geometry.attributes.position.array.length/3; i++){

    let vert = transformedSkinVertex(object, i)
    // console.log(vert)

  
    dots.geometry.attributes.position.setY(i,vert.y)
    dots.geometry.attributes.position.setX(i,vert.x)
    dots.geometry.attributes.position.setZ(i,vert.z)


    
   const mergedGeometry = new THREE.BufferGeometry()
// for ( let i = 0 ; i < 25 ; i ++ ) {
//    const nodeGeometry = geom.clone()
//    nodeGeometry.translate(random(),random(),random())
//    mergedGeometry.merge(nodeGeometry)
// }
// const myCluster = new THREE.Mesh( mergedGeometry, material)

   

}
}
}

let oldElapsedTime=null;

const clock = new THREE.Clock()
let previousTime = 0
let seconds = 0


const tick = () =>   
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - oldElapsedTime
    oldElapsedTime = elapsedTime

    world.step(1 / 60, deltaTime, 3)

// console.log(mouse.x)
    

        
        

    if(her && herDots){

      controlVerts(selectedDot, selectedObject)

      her.children[0].children[4].geometry.attributes.position.needsUpdate = true;



      herDots.geometry.attributes.position.needsUpdate = true;

        }

      
        // herDots2.geometry.attributes.position.needsUpdate = true;

   
    if(herMixer)
    {
        herMixer.update(deltaTime)
    }

    controls.update()

    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()