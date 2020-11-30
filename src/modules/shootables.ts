@Component("Shootable")
export class Shootable {
    health:number = 100
    alive:boolean = true
    public onShoot: () => void
    public onDeath: () => void

    constructor(        
        onShoot: () => void,        
        onDeath?: () => void,        
      ) {          
        this.onShoot = onShoot
        if(onDeath)
        this.onDeath = onDeath
    }
}  