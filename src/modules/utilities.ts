
export function distance(pos1: Vector3, pos2: Vector3): number {
    const a = pos1.x - pos2.x
    const b = pos1.z - pos2.z
    return a * a + b * b
}
  
export function realDistance(pos1: Vector3, pos2: Vector3): number 
{
    const a = pos1.x - pos2.x
    const b = pos1.z - pos2.z
    return Math.sqrt(a * a + b * b)
}
  
export function ToDegrees(radians)
{
    var pi = Math.PI;
    return radians * (180/pi);
}

export function ToRadian(degrees)
{
    var pi = Math.PI;
    return degrees * (pi/180);
}


export function drawLineBetween(A:Vector3, B:Vector3, _offsetZ?:number){
    let offset =  0.05
    if(_offsetZ){
        offset = _offsetZ
    }
    let line = new Entity()
    let dist = realDistance(A,B)
    let rotAngle = ToDegrees( Vector3.GetAngleBetweenVectors(Vector3.Forward(),A.subtract(B),Vector3.Up()) )  
    line.addComponent(new Transform({
        position: Vector3.Lerp(A,B,0.5),
        scale: new Vector3(dist,0.1,1),
        rotation: Quaternion.Euler(0,90+rotAngle,0)
    }))
    line.getComponent(Transform).rotate(Vector3.Right(),90)
    line.getComponent(Transform).position.y += offset
    line.addComponent(new PlaneShape()).withCollisions = false
    engine.addEntity(line)
    
    
}

export function moveLineBetween(line:Entity, A:Vector3, B:Vector3){

    let dist = realDistance(A,B)
    let rotAngle = ToDegrees( Vector3.GetAngleBetweenVectors(Vector3.Forward(),A.subtract(B),Vector3.Up()) )  
    let rotation = Quaternion.FromToRotation(Vector3.Right(),A.subtract(B))

    line.getComponent(Transform).position = Vector3.Lerp(A,B,0.5)
    line.getComponent(Transform).position.y += 0.05
    line.getComponent(Transform).scale = new Vector3(dist,0.1,1)
    line.getComponent(Transform).rotation = rotation
    //line.getComponent(Transform).rotate(Vector3.Right(),90)        
}

export function getProjectedPointOnLineFast(pos:Vector3, v1:Vector3, v2:Vector3):Vector3
{
  // get dot product of e1, e2
  let  e1 = new Vector2(v2.x - v1.x, v2.z - v1.z)
  let  e2 = new Vector2(pos.x - v1.x, pos.z - v1.z)
  let valDp = Vector2.Dot(e1, e2)

  // get squared length of e1
  let len2 = e1.x * e1.x + e1.y * e1.y
  let result = new Vector3((v1.x + (valDp * e1.x) / len2), 0, (v1.z + (valDp * e1.y) / len2))
  
  return result;
}

export function isPointOnSegment(point:Vector3, segA:Vector3, segB:Vector3):boolean{

    let minX = Math.min(segA.x, segB.x)
    let minZ = Math.min(segA.z, segB.z)
    let maxX = Math.max(segA.x, segB.x)
    let maxZ = Math.max(segA.z, segB.z)
    
    
    if(segA.x == segB.x && segA.z == segB.z){
        return false
    }

    if(point.x >= minX && point.x <= maxX && point.z >= minZ && point.z <= maxZ){
        return true
    }else{
        return false
    }
    
}