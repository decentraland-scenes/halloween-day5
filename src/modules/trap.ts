import { scene } from "../modules/scene";

let playerTrapShape =  new GLTFShape("models/player_trap.glb")

export class PlayerTrap extends Entity {
    
    constructor(
      position: TranformConstructorArgs,
      
      
    ) {
      super()
      this.addComponent(new Transform(position))
      this.addComponent(playerTrapShape)

    }
    hide(){
        this.getComponent(Transform).position.y = -20
    }
}

