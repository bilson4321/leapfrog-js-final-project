import {Animation} from '../Utilities/Animation.js';

class Player
{
    constructor(tileMap)
    {
        this.Map=tileMap;
        this.animationState={current:0,idle:0,walking:1,shooting:2};
        
        this.idle=new Animation('./images/idle.png',280,1029,129,58,8);
        this.walking=new Animation('./images/walking.png',280,1196,129,64,8);
        this.shooting=new Animation('./images/shooting.png',280,1168,129,90,6);

        this.position={x:450,y:250};
        this.height=129;
        this.width=58;
        this.velocity={x:0,y:0};
        this.friction=0.05;
        this.mirrored=0;
        this.onTheGround=false;
        this.shootingState=false;
    }
    handleInput(inputController)
    {
        if(inputController.isKeyDown(39))
        {
            this.velocity.x+=2;
            inputController.reset();
        }
        if(inputController.isKeyDown(37))
        {
            this.velocity.x-=2;
            inputController.reset();
        }
        if(inputController.isKeyDown(38)&&this.onTheGround)
        {
            this.velocity.y-=120;
            inputController.reset();
        }
        if(inputController.isKeyDown(32)&&this.onTheGround)
        {
           // this.shootingState=true;
            inputController.reset();
        }
    }
    update()
    {
        if(this.velocity.x>2||this.velocity.x<-2)
        this.animationState.current=this.animationState.walking;
        else if(this.shootingState)
        this.animationState.current=this.animationState.shooting;
        else
        this.animationState.current=this.animationState.idle;

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
        
        //this.handleCollision();
    }
    draw(canvasContext)
    {
        this.handleCollision(canvasContext); // for experimental purpose only
        if(this.mirrored==1)
        {
            canvasContext.save();
            canvasContext.translate(this.position.x+this.width,this.position.y);
            canvasContext.scale(-1, 1);  
            canvasContext.fillStyle='pink';
            canvasContext.fillRect(0,0,this.width,this.height);
            if(this.animationState.current==this.animationState.idle)
            this.idle.draw(canvasContext,0,0);
            if(this.animationState.current==this.animationState.walking)
            this.walking.draw(canvasContext,0,0);
            if(this.animationState.current==this.animationState.shooting)
            this.shooting.draw(canvasContext,0,0);
            canvasContext.restore();
        }
        else
        {
            canvasContext.fillStyle='pink';
            canvasContext.fillRect(this.position.x,this.position.y,this.width,this.height);
            if(this.animationState.current==this.animationState.idle)
            this.idle.draw(canvasContext,this.position.x,this.position.y);
            if(this.animationState.current==this.animationState.walking)
            this.walking.draw(canvasContext,this.position.x,this.position.y);
            if(this.animationState.current==this.animationState.shooting)
            this.shooting.draw(canvasContext,this.position.x,this.position.y);
        }
    }
    handleCollision(canvasContext)
    {
        this.onTheGround=false;
        for(var i=0;i<this.Map.map.length;i++)
        {
            for(var j=0;j<this.Map.map[i].length;j++)
            {
                if (this.position.x < (j*this.Map.tileWidth) + this.Map.tileWidth &&
                    this.position.x + this.width > (j*this.Map.tileWidth) &&
                    this.position.y < 450 + (i*this.Map.tileHeight) &&
                    this.position.y + this.height > 450+(i*this.Map.tileHeight)) 
                    {
                        canvasContext.strokeStyle="yellow";
                        canvasContext.strokeRect(this.position.x,this.position.y,this.width,this.height);
                        canvasContext.strokeRect((j*this.Map.tileWidth),450+(i*this.Map.tileHeight),this.Map.tileWidth,this.Map.tileHeight);
                        if(this.Map.map[i][j]==1)
                        this.onTheGround=true;
                    }  
            }
        }
    }
}
export {Player};