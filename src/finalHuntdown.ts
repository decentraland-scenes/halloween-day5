import {
  ghostBlasterDialogAtDoor,
  ghostBlasterDialogAtDoorShort,
  ghostBlasterDialogOutro,
  ghostBossDialog,
  cultLeaderDialog,   
  ghostBlasterDialogOutroShort
} from './NPC/dialog'
import { NPC } from './NPC/npc'
import { halloweenTheme} from './halloweenQuests/quest'
import * as ui from '../node_modules/@dcl/ui-utils/index'
import { scene } from './modules/scene'
import { setGunUnUseable } from './modules/gun'
import { player } from './modules/player'

export let ghostBlaster: NPC
export let ghost: NPC
export let cultLeader: NPC
export let catLover: NPC
export let farmer: NPC
export let girlCult: NPC
export let cultist1: NPC
export let creep: NPC

const cultRadius = 4
export const cultistPositions = [
  scene.cultCircleCenter.add(Vector3.Right().multiplyByFloats(cultRadius,0,3).rotate(Quaternion.Euler(0,25,0))),
  scene.cultCircleCenter.add(Vector3.Right().multiplyByFloats(cultRadius,0,3).rotate(Quaternion.Euler(0,70,0))),
  scene.cultCircleCenter.add(Vector3.Right().multiplyByFloats(cultRadius,0,3).rotate(Quaternion.Euler(0,335,0))),
  scene.cultCircleCenter.add(Vector3.Right().multiplyByFloats(cultRadius,0,3).rotate(Quaternion.Euler(0,295,0))),
  scene.cultCircleCenter.add(Vector3.Right().multiplyByFloats(cultRadius,0,3).rotate(Quaternion.Euler(0,75,0))),
  scene.cultCircleCenter.add(Vector3.Right().multiplyByFloats(cultRadius,0,3).rotate(Quaternion.Euler(0,100,0))),
  scene.cultCircleCenter.add(Vector3.Right().multiplyByFloats(cultRadius,0,3).rotate(Quaternion.Euler(0,285,0))),
  scene.cultCircleCenter.add(Vector3.Right().multiplyByFloats(cultRadius,0,3).rotate(Quaternion.Euler(0,260,0))) 
]

let cultLookatPoint = new Vector3(scene.mansionCenter.x, 0, scene.mansionCenter.z)


@Component("Cultist")
export class Cultist {

}




export function addNPCs(){

  creep = new NPC(
    {
      position: Vector3.Zero(),
      rotation: Quaternion.Euler(0, 0, 0),
    },
    new GLTFShape('models/NPCs/creeper.glb'),
    () => {
      // check for cat wearables
      //catLover.talk(catGuyDialog, 0)
      //catLover.playAnimation(`Head_Yes`, true, 2.63)
    },
    { path: 'images/portraits/creep.png', height: 128, width: 128 },
    5,
    null,
    false,
    true
  )
  
  creep.dialog = new ui.DialogWindow(
    { path: 'images/portraits/creep.png', height: 256, width: 256 },
    true,
    halloweenTheme
  )
  creep.dialog.leftClickIcon.positionX = 340 - 60
  creep.dialog.text.color = Color4.FromHexString('#8DFF34FF')
  
  
  catLover = new NPC(
    {
      position: cultistPositions[0],
      rotation: Quaternion.Euler(0, 0, 0),
    },
    new GLTFShape('models/NPCs/catguy_cult.glb'),
    () => {
      // check for cat wearables
      //catLover.talk(catGuyDialog, 0)
      //catLover.playAnimation(`Head_Yes`, true, 2.63)
    },
    { path: 'images/radio3.png', height: 128, width: 128 },
    20,
    `Idle_06`,
    false,
    false
  )
  
  
  farmer = new NPC(
    {
      position: cultistPositions[1],
      rotation: Quaternion.Euler(0, 0, 0),
    },
    new GLTFShape('models/NPCs/farmer-cult-npc.glb'),
    () => {
      // check for cat wearables
      //catLover.talk(catGuyDialog, 0)
      //farmer.playAnimation(`Head_Yes`, true, 2.63)
    },
    { path: 'images/radio3.png', height: 128, width: 128 },
    10,
    `Idle_05`,
    false,
    false
  )
  
  
  
  girlCult = new NPC(
    {
      position: cultistPositions[2],
      rotation: Quaternion.Euler(0, 0, 0),
    },
    new GLTFShape('models/NPCs/girl_cult.glb'),
    () => {
      // check for cat wearables
      //catLover.talk(catGuyDialog, 0)
      //castleGuy.faceUser=true
    },
    { path: 'images/radio3.png', height: 128, width: 128 },
    10,
    `Idle_04`,
    false,
    false
  )
  //castleGuy.getComponent(Transform).lookAt(scene.trapPosition1)
  
  cultist1 = new NPC(
    {
      position: cultistPositions[3],
      rotation: Quaternion.Euler(0, 0, 0),
    },
    new GLTFShape('models/NPCs/ghost1.glb'),
    () => {
      
    },
    { path: 'images/radio3.png', height: 128, width: 128 },
    10,
    `idle1_Armature.001`,
    false,
    false
  )
  //cultist1.getComponent(Transform).lookAt(scene.trapPosition1)
  
  ghostBlaster = new NPC(
    {
      position: new Vector3(scene.mansionCenter.x- 25, 0, scene.mansionCenter.z -3.5),
      rotation: Quaternion.Euler(0, -45, 0),
    },
    new GLTFShape('models/NPCs/ghostblaster.glb'),
    () => {
      
      if(ghostBlaster.dialog.isDialogOpen){
        return
      }
      if(!scene.bossIsDead){
        if(scene.guyToldIntro){
          ghostBlaster.talk(ghostBlasterDialogAtDoorShort, 0)
        }else{
          ghostBlaster.talk(ghostBlasterDialogAtDoor, 0)
        }
        
      }else{
        setGunUnUseable()
        if(scene.guyToldEnding){
          ghostBlaster.talk(ghostBlasterDialogOutroShort, 0)
        }else{
          ghostBlaster.talk(ghostBlasterDialogOutro, 0)
        }
          
  
      }
      
    },
    { path: 'images/portraits/ghostblaster_suit.png', height: 256, width:256 },
    4,
    `Weight_Shift`,
    true,
    false
    
  )
  
  ghostBlaster.dialog = new ui.DialogWindow(
    { path: 'images/portraits/ghostblaster_suit.png', height: 256, width: 256 },
    true,
    halloweenTheme
  )
  ghostBlaster.dialog.leftClickIcon.positionX = 340 - 60
  ghostBlaster.dialog.text.color = Color4.FromHexString('#8DFF34FF')
  
  
  //Evil Ghost 
  ghost = new NPC(
    {
      position: new Vector3(scene.mansionCenter.x, -20, scene.mansionCenter.z ),
      rotation: Quaternion.Euler(0, 0, 0),
      scale: new Vector3(4,4,4)
    },
    new GLTFShape('models/ram_head.glb'),
    () => {
      
      ghost.talk(ghostBossDialog, 0)
      ghost.playAnimation(`Idle_003`, true, 3)
      
      
    },
    { path: 'images/portraits/ghost_boss.png', height: 128, width: 128 },
    4,
    `Idle_001`,
    false,
    true
  )
  
  ghost.dialog = new ui.DialogWindow(
    { path: 'images/portraits/ghost_boss.png', height: 256, width: 256 },
    true,
    halloweenTheme
  )
  ghost.dialog.leftClickIcon.positionX = 340 - 60
  ghost.dialog.text.color = Color4.FromHexString('#8DFF34FF')
  
  // cult leader in human form
  cultLeader = new NPC(
    {
      position: scene.mansionCenter,
      rotation: Quaternion.Euler(0, -90, 0),
    },
    new GLTFShape('models/NPCs/oldlady_cult.glb'),
    () => {
      // check for cat wearables
      cultLeader.talk(cultLeaderDialog, 0)
      ghost.playAnimation(`Acknowledging_Armature`, true, 2.63)
      engine.addSystem(myCultTurnSystem)
      
    },
    { path: 'images/portraits/oldlady_cult.png', height: 256, width: 256 },
    4,
    `Weight_Shift_Armature`,
    false,
    true  
  )
  cultLeader.dialog = new ui.DialogWindow(
    { path: 'images/portraits/oldlady_cult.png', height: 256, width: 256 },
    true,
    halloweenTheme
  )
  cultLeader.dialog.leftClickIcon.positionX = 340 - 60
  cultLeader.dialog.text.color = Color4.FromHexString('#8DFF34FF')
  
  
  catLover.getComponent(Transform).lookAt(cultLeader.getComponent(Transform).position)
  catLover.addComponent(new Cultist())
  
  farmer.getComponent(Transform).lookAt(cultLeader.getComponent(Transform).position)
  farmer.addComponent(new Cultist())
  
  girlCult.getComponent(Transform).lookAt(cultLeader.getComponent(Transform).position)
  girlCult.addComponent(new Cultist())
  
  cultist1.getComponent(Transform).lookAt(cultLeader.getComponent(Transform).position)
  cultist1.addComponent(new Cultist())

  //ghost.addComponent(new Cultist())
}



class CultTurnSystem {  
  
  fraction:number = 0    
  cultGroup = engine.getComponentGroup(Cultist,Transform)
  

  update(dt: number) {
    if(this.fraction < 1){
      this.fraction += dt/6
      cultLookatPoint = Vector3.Lerp(scene.mansionCenter, player.camera.feetPosition,this.fraction)
    }
    for (let npc of this.cultGroup.entities) {
      npc.getComponent(Transform).lookAt(cultLookatPoint)
      
    }
  }
}

let myCultTurnSystem = new CultTurnSystem()

