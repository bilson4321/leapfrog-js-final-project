class Bullet
{
    constructor()
    {
        this.image=new Image();
        this.image.src='./images/bullet.png';
        this.state='idle';
        this.position={x:0,y:0};
        this.shootFrom={x:0,y:0};
        this.range=400;
        this.height=6;
        this.width=18;
    }
    update()
    {
        if(this.state=='shooting')
        {
            this.position.x+=10;
            
            console.log("position>>",this.position);
            
            console.log("shoot>>",this.shootFrom);
            if(this.position.x>(this.shootFrom.x+this.range))
                this.state='idle';
        }
    }
    shoot(x,y)
    {
        this.shootFrom.x=x;
        this.shootFrom.y=y;
        this.state='shooting';
        this.position.x=this.shootFrom.x;
        this.position.y=this.shootFrom.y;
    }
    draw(canvasContext)
    {
        if(this.state=='shooting')
        canvasContext.drawImage(this.image,this.position.x,this.position.y,this.width,this.height);
    }
}
export {Bullet}