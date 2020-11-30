import { scene } from "../modules/scene";
class Grid {
 sizeX:number = 3*8
 sizeZ:number = 3*8

 offsetX:number = (scene.mansionCenter.x - this.sizeX/2)
 offsetZ:number = (scene.mansionCenter.z - this.sizeZ/2)

 blocksX:number = 3
 blocksZ:number = 3

 blockSizeX:number = this.sizeX / this.blocksX
 blockSizeZ:number = this.sizeZ / this.blocksZ

 blockCount:number = this.blocksX * this.blocksZ
 groundLevel:number = 20
 aboveLevel:number = 5

 minX:number = this.offsetX
 maxX:number = this.offsetX + this.sizeX

 minZ:number = this.offsetZ
 maxZ:number = this.offsetZ + this.sizeZ

 center:Vector3 = new Vector3(this.offsetX + this.sizeX/2, this.groundLevel + this.aboveLevel, this.offsetZ + this.sizeZ/2)

 constructor(){
    this.sizeX = 3*8
    this.sizeZ = 3*8
   
    this.offsetX = (scene.mansionCenter.x - this.sizeX/2)
    this.offsetZ = (scene.mansionCenter.z - this.sizeZ/2)
   
    this.blocksX = 3
    this.blocksZ = 3
   
    this.blockSizeX = this.sizeX / this.blocksX
    this.blockSizeZ = this.sizeZ / this.blocksZ
   
    this.blockCount = this.blocksX * this.blocksZ
    this.groundLevel = 20
    this.aboveLevel = 5
   
    this.minX = this.offsetX
    this.maxX = this.offsetX + this.sizeX
   
    this.minZ = this.offsetZ
    this.maxZ =this.offsetZ + this.sizeZ
   
    this.center= new Vector3(this.offsetX + this.sizeX/2, this.groundLevel + this.aboveLevel, this.offsetZ + this.sizeZ/2)
 }
}

export const grid = new Grid()