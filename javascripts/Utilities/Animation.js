class Animation
{
    constructor(spriteSheet,sourceHeight,sourceWidth,height,width,noOfFrame)
    {
        this.image=new Image();
        this.image.src=spriteSheet;
        this.imageSourceHeight=sourceHeight;
        this.imageSourceWidth=sourceWidth;
        this.height=height;
        this.width=width;
        this.frameIndex=0;
        this.maxNoOfFrame=noOfFrame;
        this.tickCount=0;
    }
    draw(canvasContext,positionX,positionY)
    {
        canvasContext.drawImage(this.image, this.frameIndex*this.imageSourceWidth/this.maxNoOfFrame, 0, this.imageSourceWidth/this.maxNoOfFrame, this.imageSourceHeight, positionX, positionY, this.width, this.height);
        
        this.tickCount++;
        if(this.tickCount>8)
        {
            this.frameIndex++;
            if(this.frameIndex>=this.maxNoOfFrame)
                this.frameIndex=0;

            this.tickCount=0;
        }
    }
}
export {Animation}