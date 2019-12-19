class Button
{
    constructor(image,posx,posy,height,width)
    {
        this.image=new Image();
        this.image.src=image;
        this.position={x:posx,y:posy};
        this.height=height;
        this.width=width;
        this.buttonClicked=false;
    }
    handleInput(inputController)
    {
        if(inputController.mousePosition.x>this.position.x&&
            inputController.mousePosition.x<this.position.x+this.width&&
            inputController.mousePosition.y>this.position.y&&
            inputController.mousePosition.y<this.position.y+this.height&&inputController.mouseClicked==true)
           {
               this.buttonClicked=true;
               inputController.reset();
           }
    }
    draw(canvasContext)
    {
        canvasContext.drawImage(this.image,this.position.x,this.position.y,this.width,this.height);
    }
}
export {Button};