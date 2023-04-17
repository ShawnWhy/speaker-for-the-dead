import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { LoopOnce, SphereGeometry, TextureLoader } from 'three'
import CANNON, { Sphere } from 'cannon'
// const gTTS = require('gtts');
// import gTTs from 'gtts'
// console.log(gTTS)
import $ from "./Jquery"



    // say.speak('Hello my dear', 'Microsoft Zira Desktop')
    // say.export("I'm sorry, Dave.", 'Microsoft Zira Desktop', 0.75, 'hal.wav', (err) => {
    //   if (err) {
    //     return console.error(err)
    //   }
    
    //   console.log('Text has been saved to hal.wav.')
    // })

let transformHeight = 2
let transformDepth = 2
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
let speakTruth;
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

const speakSound = function(){
    fetch('/spoken.wav') .then(response => {
    console.log(response);
    response.blob()
}) 
 .then(blob => { const url = URL.createObjectURL(blob);
    console.log(url) 
    const audio = new Audio(url); 
    console.log(audio)
    audio.play(); }) 
    .catch(error => { console.error('Error fetching audio file:', error); })

}

window.addEventListener('mousemove', (event) =>

{
   
   
    mouse.x = event.clientX / sizes.width * 2 - 1
    mouse.y = - (event.clientY / sizes.height) * 2 + 1
    mouse.y2 =-(event.clientY / sizes.height)
   


})



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

        


speakTruth = function(string){
    console.log("speaktruth")
console.log(string)
var array = string.split('');


console.log(array)
for(let i=0; i<array.length; i++){
    var letter = array[i].toLowerCase()
    switch (letter) {
        case 'a':case "e":
            
              setTimeout(() => {
                console.log(hertalk)
                  
                                    hertalk.play()
                                    setTimeout(() => {
                                      hertalk.reset()  
                                    }, 200);
                                    
                                }, 200*i);
          break;
        case 'b':case 'm':case'p':
           setTimeout(() => {
            console.log(hertalk2)
            
                                    hertalk2.play()
                                    setTimeout(() => {
                                      hertalk2.reset()  
                                    }, 200);
                                    
                                }, 200*i);
          break;
        case 'f':case'v':
            setTimeout(() => {
                            console.log(hertalk2)
                     

                                    hertalk2.play()
                                    setTimeout(() => {
                                      hertalk2.reset()  
                                    }, 200);
                                    
                                }, 200*i);
          break;
        case "i":
            setTimeout(() => {
                            console.log(hertalk)
           
                                    hertalk.play()
                                    setTimeout(() => {
                                      hertalk.reset()  
                                    }, 200);
                                    
                                }, 200*i);
          break;

        case "o":
          setTimeout(() => {
                        console.log(hertalk7)
                

                                    hertalk7.play()
                                    setTimeout(() => {
                                      hertalk7.reset()  
                                    }, 200);
                                    
                                }, 200*i);
        break;
        case "c":case "h":case "c":case "d":case "q":case "k":case "t":case "x":case "y":case "n":
          setTimeout(() => {
                        console.log(hertalk5)
              

                                    hertalk5.play()
                                    setTimeout(() => {
                                      hertalk5.reset()  
                                    }, 200);
                                    
                                }, 200*i);
        break;
        default:
            setTimeout(() => {
                            console.log(hertalk4)
                 

                                    hertalk4.play()
                                    setTimeout(() => {
                                      hertalk4.reset()  
                                    }, 200);
                                    
                                    
                                }, 200*i);
      }
      
}


}


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
let colorOutside
let colorInside
let colorHeight = 0
let herDotCoordinates;
let herDotColors
let herDotsGeometry
gltfLoader.load(
    '/her.glb',
    (gltf) =>
    {
        let her = gltf.scene;

        console.log(her)
       
        
         herDotCoordinates = her.children[0].children[4].geometry.attributes.position.array;
        herDotColors = new Float32Array(herDotCoordinates.length * 3)
        colorInside = new THREE.Color('blue')
        colorOutside = new THREE.Color('purple')
        const colorInside2 = new THREE.Color('green')
        const colorOutside2 = new THREE.Color('yellow')

        for(let i = 0; i < herDotCoordinates.length; i++)
    {
    const i3 = i * 3
    const mixedColor = colorInside.clone()  
    mixedColor.lerp(colorOutside, her.children[0].children[4].geometry.attributes.position.array[i3+1]/2+.8)    
    herDotColors[i3    ] = mixedColor.r
    herDotColors[i3 + 1] = mixedColor.g
    herDotColors[i3 + 2] = mixedColor.b
    }   

    let pixleMaterial = new THREE.PointsMaterial({
        // color:"red",
        fog:true,
        size:.2,
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



    herDotsGeometry = new THREE.BufferGeometry;
        
    herDotsGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(herDotCoordinates,3)
    )
    herDotsGeometry.setAttribute(
        'color',
        new THREE.BufferAttribute(herDotColors,3)
    )

    herDots = new THREE.Points(herDotsGeometry, pixleMaterial)
        
    herDots.scale.set(5,5,5)
    herDots.rotation.set(Math.PI*.60, Math.PI, 0)
    herDots.position.set(0,13,5)
    
    selectedDot = herDots
    selectChildIndex = 1

    scene.add(herDots)

    


        
    }
)



// const ambientLight = new THREE.AmbientLight('orange', .5)
// scene.add(ambientLight)

// const directionalLight = new THREE.DirectionalLight('#F5F5DC', 2)
// directionalLight.castShadow = true
// directionalLight.shadow.mapSize.set(1024, 1024)
// directionalLight.shadow.camera.far = 15
// directionalLight.shadow.camera.left = - 7
// directionalLight.shadow.camera.top = 7
// directionalLight.shadow.camera.right = 7
// directionalLight.shadow.camera.bottom = - 7
// directionalLight.position.set(- 5, 5, 3)
// scene.add(directionalLight)

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 1000)
if(sizes.width>860){
camera.position.set(0, 10, 50)
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

function controlVerts(dots, object, transformHeight, transformDepth){

    // console.log("controlverts")
    // console.log(dots)
    // console.log("object")
    // console.log(object)

if(dots.geometry.attributes.position.array){
    
for(let i=0; i<dots.geometry.attributes.position.array.length/3; i++){


    

if(  dots.geometry.attributes.position.getZ(i)<transformHeight && dots.geometry.attributes.position.getZ(i)>-2.5 && dots.geometry.attributes.position.getY(i)>=transformDepth){

 herDots.geometry.attributes.position.setY(i,herDots.geometry.attributes.position.getY(i)-.05)
  
        
//  )
    //    herDots.geometry.attributes.position.needsUpdate = true;

    // }
}
else{

    let vert = transformedSkinVertex(object, i)
    // console.log(vert)

  
    dots.geometry.attributes.position.setY(i,vert.y)
    dots.geometry.attributes.position.setX(i,vert.x)
    dots.geometry.attributes.position.setZ(i,vert.z)

}
    
//    const mergedGeometry = new THREE.BufferGeometry()
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
    
    colorHeight +=.05;
    if(colorHeight >= 4){
        colorHeight= -2;
    }    
    
      transformDepth -=.011;
    if(transformDepth <=-2.55){
        transformDepth= 2;
    }  

    transformHeight -=.011;
    if(transformHeight <=-2.55){
        transformHeight= 2;
    }    
        

    if(her && herDots){


    if(herDotCoordinates){

    for(let i = 0; i < herDotCoordinates.length; i++)
    {
    const i3 = i * 3
    const mixedColor = colorInside.clone()  
    mixedColor.lerp(colorOutside, her.children[0].children[4].geometry.attributes.position.array[i3+1] + colorHeight)    
    herDotColors[i3    ] = mixedColor.r
    herDotColors[i3 + 1] = mixedColor.g
    herDotColors[i3 + 2] = mixedColor.b
    }   


        herDotsGeometry.setAttribute(
        'color',
        new THREE.BufferAttribute(herDotColors,3)
    )

    }

          




      controlVerts(selectedDot, selectedObject,transformHeight, transformDepth)


      her.children[0].children[4].geometry.attributes.position.needsUpdate = true;



      herDots.geometry.attributes.position.needsUpdate = true;

        }

      
   
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


const chatLog = document.getElementById("chat-log")
        console.log(chatLog)
        const message = document.getElementById("message")
        console.log(message)
        const form = document.querySelector("form")
        form.addEventListener('submit', (e)=>{
            console.log("submit")
            e.preventDefault();
            const messageText = message.value;
            const newMessage = {
                "role": "user", content : messageText
            }
            message.value = '';
            const messageElement = document.createElement("div");
            messageElement.classList.add("message");
            messageElement.classList.add("message--sent");
            messageElement.innerHTML = '<div class="message__text">' + messageText + '</div>';

             fetch("http://localhost:3030/", {
                method: "POST",
                headers:{
                    "content-type":"application/json"
                },

                body: JSON.stringify({
                    messageText
                })
            })
            // .then(res =>console.log(res))
            .then(data=>{
                // console.log(data)
                // console.log(data.body)
                // speakSound()

    return(data.blob())
}) 
 .then(blob => { const url = URL.createObjectURL(blob);
    console.log(url) 
    const audio = new Audio(url); 
    
       speakTruth(messageText)
       console.log("messageText")
    console.log(audio)
    audio.play(); }) 
    .catch(error => { console.error('Error fetching audio file:', error); })

})
                // speakSound()
             


