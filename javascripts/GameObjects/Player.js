class Player
{
    constructor(tileMap)
    {
        this.Map=tileMap;
        this.animationState={current:0,idle:0};
        this.idle=new Image();
        this.idle.src='./images/cowboy.png';
        this.position={x:450,y:350};
        this.height=40;
        this.width=30;
        this.velocity={x:0,y:0};
        this.friction=0.05;
        this.mirrored=0;
        this.onTheGround=false;
    }
    handleInput(inputController)
    {
        if(inputController.isKeyDown(39))
        {
            this.velocity.x+=5;
            inputController.reset();
        }
        if(inputController.isKeyDown(37))
        {
            this.velocity.x-=5;
            inputController.reset();
        }
        if(inputController.keyPressed(32)&&this.onTheGround)
        {
            this.velocity.y-=70;
            inputController.reset();
        }
    }
    update()
    {
        this.position.x+=this.velocity.x;
        this.velocity.x*=this.friction;
        this.position.y+=this.velocity.y;
        this.velocity.y*=this.friction;
        if(this.velocity.x<0)
        this.mirrored=1;
        else
        this.mirrored=0;

        if(!this.onTheGround)
        {
            this.position.y+=2;
        }
       
        this.handleCollision();
    }
    draw(canvasContext)
    {
        if(this.mirrored==1)
        {
            canvasContext.save();
            canvasContext.translate(this.position.x+30,this.position.y);
            canvasContext.scale(-1, 1);  
            canvasContext.drawImage(this.idle,0,0);
            canvasContext.restore();
        }
        else
        {
            canvasContext.drawImage(this.idle,this.position.x,this.position.y);
        }
    }
    handleCollision()
    {
        this.onTheGround=false;
        for(var i=0;i<this.Map.map.length;i++)
        {
            if (this.position.x < (i*this.Map.tileWidth) + this.Map.tileWidth &&
                this.position.x + this.width > (i*this.Map.tileWidth) &&
                this.position.y < 435 + this.Map.tileHeight &&
                this.position.y + this.height > 435) 
                {
                    if(this.Map.map[i]==1)
                    this.onTheGround=true;
                }  
        }
    }
}
export {Player};