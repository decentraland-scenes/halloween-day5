import { scene } from "../modules/scene";
import { Shootable } from "../modules/shootables";

let mansionShape =  new GLTFShape("models/mansion.glb")
//let ghostShape =  new GLTFShape("models/ghost.glb")
let bigEyeShape =  new GLTFShape("models/big_eye.glb")
let pictureShape =  new GLTFShape("models/picture.glb")
let picture2Shape =  new GLTFShape("models/picture2.glb")
let gardenShape =  new GLTFShape("models/fence.glb")
let fireShape =  new GLTFShape("models/fire.glb")
let mainDoorShape =  new GLTFShape("models/main_door.glb")


let portalAlpha = new Texture('textures/portal_alpha.png', {samplingMode: 1, wrap:1})
//let portalNormalmap2 = new Texture('textures/portal_normal22222.png.png', {samplingMode: 1, wrap:1})

let mansion = new Entity()
mansion.addComponent(new Transform({position:new Vector3(scene.mansionCenter.x-24,0,scene.mansionCenter.z-24)}))
mansion.addComponent(mansionShape)
engine.addEntity(mansion)

let garden = new Entity()
garden.addComponent(new Transform())
garden.addComponent(gardenShape)
engine.addEntity(garden)


let mainDoor = new Entity()
mainDoor.addComponent(new Transform({position: scene.mainDoorPos}))
mainDoor.addComponent(mainDoorShape)
engine.addEntity(mainDoor)

export function openMainDoor(){
  mainDoor.getComponent(Transform).rotation = Quaternion.Euler(0,125,0)
}

let ground = new Entity()
ground.addComponent(new Transform({position:new Vector3(24,-0.1,24), scale: new Vector3(48,0.22,48), rotation: Quaternion.Euler(0,0,0)}))
ground.addComponent(new BoxShape())
ground.getComponent(BoxShape).visible = false
ground.getComponent(BoxShape).withCollisions = true
engine.addEntity(ground)

let pictureFrameDummy = new Entity()
pictureFrameDummy.addComponent(new Transform({position: new Vector3(scene.mansionCenter.x + 16, -10, scene.mansionCenter.z)}))
pictureFrameDummy.addComponent(picture2Shape)
engine.addEntity(pictureFrameDummy)

let pictureFrame = new Entity()
pictureFrame.addComponent(new Transform({position: new Vector3(scene.mansionCenter.x + 16, 10.25, scene.mansionCenter.z)}))
pictureFrame.addComponent(pictureShape)
pictureFrame.addComponent(new Shootable( () => {
  pictureFrame.getComponent(Transform).rotation = Quaternion.Euler(Math.random()*5,0,0)
 },() => {
  pictureFrame.addComponentOrReplace(picture2Shape)
 }))
engine.addEntity(pictureFrame)

let portalMat = new Material()
portalMat.roughness = 0.5
portalMat.metallic = 0.5
portalMat.alphaTexture = portalAlpha
portalMat.emissiveIntensity = 3
portalMat.emissiveColor = Color3.FromHexString("#0088aa")


let portalShape = new PlaneShape()

let portal = new Entity()
portal.addComponent(new Transform({position:new Vector3(scene.doorPos.x,4,scene.doorPos.z), scale: new Vector3(9,6.1,1), rotation: Quaternion.Euler(90,90,0)}))
portal.addComponent(portalShape)
portal.addComponent(portalMat)
engine.addEntity(portal)


let bigEye = new Entity()
bigEye.addComponent(new Transform({position: new Vector3(scene.mansionCenter.x-17.6,33.4,scene.mansionCenter.z)}))
bigEye.addComponent(bigEyeShape)
bigEye.addComponent(new Billboard())
engine.addEntity(bigEye)

let fire1 = new Entity()
fire1.addComponent(new Transform({position: new Vector3(scene.mansionCenter.x+2.8,1.74,scene.mansionCenter.z-6.7), scale: new Vector3(1,1,1)}))
fire1.addComponent(fireShape)
//fire1.addComponent(new Billboard())
engine.addEntity(fire1)

let fire2 = new Entity()
fire2.addComponent(new Transform({position: new Vector3(scene.mansionCenter.x+2.8,1.74,scene.mansionCenter.z+6.7), scale: new Vector3(1,1,1)}))
fire2.addComponent(fireShape)
//fire1.addComponent(new Billboard())
engine.addEntity(fire2)


class portalScrollSystem {
  
    UVMoveVector = new Vector2(0,1)
    elapsedTime = 0   
    
  
    update(dt: number) {    
  
     // log("wW: " + worldState.worldMoveVector)
      //log("speed: " + worldState.currentSpeed)
      this.elapsedTime += dt
      this.UVMoveVector.x += dt * 0.5
      //this.UVMoveVector.y = Math.sin(this.elapsedTime)*0.1
  
      if(this.UVMoveVector.x > 2){
        this.UVMoveVector.x -=2
      }
      if(this.UVMoveVector.y > 2){
        this.UVMoveVector.y -=2
      }     
      portalShape.uvs = [      
  
        this.UVMoveVector.x,
        this.UVMoveVector.y,
      
        this.UVMoveVector.x + 1,
        this.UVMoveVector.y,
      
        this.UVMoveVector.x + 1,
        this.UVMoveVector.y + 1,
      
        this.UVMoveVector.x,
        this.UVMoveVector.y + 1,
        //----
        this.UVMoveVector.x,
        this.UVMoveVector.y,
      
        this.UVMoveVector.x + 1,
        this.UVMoveVector.y,
      
        this.UVMoveVector.x + 1,
        this.UVMoveVector.y + 1,
      
        this.UVMoveVector.x,
        this.UVMoveVector.y + 1,
      ]
    }  
  }
  
  // Add a new instance of the system to the engine
  engine.addSystem(new portalScrollSystem())