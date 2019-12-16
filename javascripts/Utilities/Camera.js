class Camera
{
    constructor(gameWorldSize)
    {
        this.gameWorldSize=gameWorldSize;
        this.entityPosition={x:0,y:0};
        this.previousPosition={x:0,y:0};
        this.i=-1;
        this.x=0;
    }
    updatePosition(position)
    {
        this.entityPosition.x=position.x;
        if(this.entityPosition.x>this.previousPosition.x&&this.entityPosition.x>520&&this.entityPosition.x<this.gameWorldSize.width-200)
        this.i=-2;
        else if(this.entityPosition.x<this.previousPosition.x&&this.entityPosition.x>520&&this.entityPosition.x<this.gameWorldSize.width-200)
        this.i=+2;
        else
        this.i=0;
        
        this.previousPosition.x=this.entityPosition.x;
    }
    followPlayer(canvasContext)
    {
        canvasContext.translate(this.i,0);
    }
    getCameraPositionX()
    {
        this.x-=this.i;
        return this.x;
    }
}
export {Camera}