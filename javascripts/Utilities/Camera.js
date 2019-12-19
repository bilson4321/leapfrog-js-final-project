class Camera
{
    constructor(gameWorldSize)
    {
        this.gameWorldSize=gameWorldSize;
        this.entityPosition={x:0,y:0};
        this.previousPosition={x:0,y:0};
        this.i=-1;
        this.x=0;
        this.canvasContext=null;
    }
    updatePosition(position)
    {
        this.entityPosition.x=position.x;
        if(this.entityPosition.x>this.previousPosition.x&&this.entityPosition.x>420&&this.entityPosition.x<this.gameWorldSize.width-540)
        this.i=this.previousPosition.x-this.entityPosition.x;
        else if(this.entityPosition.x<this.previousPosition.x&&this.entityPosition.x>420&&this.entityPosition.x<this.gameWorldSize.width-540)
        this.i=-(this.entityPosition.x-this.previousPosition.x);
        else
        this.i=0;
        
        this.previousPosition.x=this.entityPosition.x;
        this.x-=this.i;
    }
    followPlayer(canvasContext)
    {
        this.canvasContext=canvasContext;
        canvasContext.translate(this.i,0);
    }
    getCameraPositionX()
    {
        return this.x;
    }
    reset()
    {
        this.canvasContext.translate(this.x,0);
        this.entityPosition={x:0,y:0};
        this.previousPosition={x:0,y:0};
        this.i=-1;
        this.x=0;  
    }
}
export {Camera}