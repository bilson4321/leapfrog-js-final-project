import {Animation} from '../Utilities/Animation.js';

class Player
{
    constructor(tileMap)
    {
        this.Map=tileMap;
        this.animationState={current:0,idle:0,walking:1,shooting:2,dead:3};
        
        this.idle=new Animation('./images/idle.png',280,1029,129,58,8);
        this.walking=new Animation('./images/walking.png',280,1196,129,64,8);
        this.shooting=new Animation('./images/shooting.png',280,1168,129,90,6);
        this.dead=new Animation('./images/dead.png',280,1504,129,116,6,false);
        // this.jumpUp=new Animation('');
        // this.fallingDown=new Animation('');
        this.whenDamaged=new Image();
        this.whenDamaged.src='./images/whenDamage.png';

        this.position={x:450,y:250};
        this.height=122;
        this.width=58;
        this.velocity={x:0,y:0};
        this.friction=0.05;
        this.mirrored=0;
        this.onTheGround=false;
        this.shootingState=false;

        //Player status
        this.health=100;

        this.previousHealth=100;//for damage taken
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
            this.velocity.y-=118;
            inputController.reset();
        }
        if(inputController.isKeyDown(32)&&this.onTheGround&&!this.shootingState)
        {
            this.shootingState=true;
            this.animationState.current=this.animationState.shooting;
            this.shooting.start();
            inputController.reset();
        }
    }
    update()
    {
        if(this.health>0)
        {  
            if(this.velocity.x>2||this.velocity.x<-2)
            this.animationState.current=this.animationState.walking;
            else if(this.shootingState)
            {
                console.log(this.shooting.getFrameIndex());
                if(this.shooting.getFrameIndex()==5)
                {
                    this.shootingState=false;
                }     
            }
            else
            this.animationState.current=this.animationState.idle;

            if(this.velocity.x>=0)
            this.mirrored=0;
            else
            this.mirrored=1;

            this.position.x+=this.velocity.x;
            this.velocity.x*=this.friction;
            this.position.y+=this.velocity.y;
            this.velocity.y*=this.friction; 

            if(!this.onTheGround) 
            {
                this.position.y+=2;
            }
        }
        else
        {
            this.animationState.current=this.animationState.dead;
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
            // canvasContext.fillStyle='pink';
            // canvasContext.fillRect(0,0,this.width,this.height);
            if(this.previousHealth!=this.health)
            {
                canvasContext.drawImage(this.whenDamaged,-25,0,116,129);
            }
            else
            {
                if(this.animationState.current==this.animationState.idle)
                this.idle.draw(canvasContext,0,0);
                if(this.animationState.current==this.animationState.walking)
                this.walking.draw(canvasContext,0,0);
                if(this.animationState.current==this.animationState.shooting)
                this.shooting.draw(canvasContext,0,0);
                if(this.animationState.current==this.animationState.dead)
                this.dead.draw(canvasContext,-25,0);
            }
            
            canvasContext.restore();
        }
        else
        {
            // canvasContext.fillStyle='pink';
            // canvasContext.fillRect(this.position.x,this.position.y,this.width,this.height);
            if(this.previousHealth!=this.health)
            {
                canvasContext.drawImage(this.whenDamaged,this.position.x-25,this.position.y,116,129);
            }
            else
            {
            if(this.animationState.current==this.animationState.idle)
            this.idle.draw(canvasContext,this.position.x,this.position.y);
            if(this.animationState.current==this.animationState.walking)
            this.walking.draw(canvasContext,this.position.x,this.position.y);
            if(this.animationState.current==this.animationState.shooting)
            this.shooting.draw(canvasContext,this.position.x,this.position.y);
            if(this.animationState.current==this.animationState.dead)
            this.dead.draw(canvasContext,this.position.x-25,this.position.y);
            }
        }
        this.previousHealth=this.health;
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
                    this.position.y < (i*this.Map.tileHeight)+this.Map.tileHeight &&
                    this.position.y + this.height > (i*this.Map.tileHeight)) 
                    {
                        canvasContext.strokeStyle="red";
                        canvasContext.strokeRect(this.position.x,this.position.y,this.width,this.height);
                        canvasContext.strokeStyle="yellow";
                        canvasContext.strokeRect((j*this.Map.tileWidth),(i*this.Map.tileHeight),this.Map.tileWidth,this.Map.tileHeight);
                        //edge block type
                        if(this.Map.map[i][j]==2)
                        {
                            //collision for block Type (four Direction)
                            var width=0.5*(this.width+this.Map.tileWidth);
                            var height=0.5*(this.height+this.Map.tileHeight);
                            var dx=(this.position.x+(this.width/2))-(j*this.Map.tileWidth+(this.Map.tileWidth/2));
                            var dy=(this.position.y+(this.height/2))-(i*this.Map.tileHeight+22+(this.Map.tileHeight/2));
                            if(Math.abs(dx)<=width&&Math.abs(dy)<=height)
                            {
                                var wy=width*dy;
                                var hx=height*dx;
                                if(wy>hx)
                                {
                                    if(wy>-hx)
                                    {
                                        this.position.y=(i*this.Map.tileHeight+this.Map.tileHeight);
                                    }
                                    else
                                    {
                                        this.velocity.x=0;
                                        this.position.x-=2;
                                    }
                                }
                                else
                                {
                                    if(wy>-hx)
                                    {
                                        this.velocity.x=0;
                                        this.position.x+=2;
                                    }
                                    else
                                    {
                                        this.position.y=(i*this.Map.tileHeight-this.height+22);
                                        this.onTheGround=true;
                                    }
                                }
                            }
                        }
                        //block
                        if(this.Map.map[i][j]==5)
                        {
                            //collision for block Type (four Direction)
                            var width=0.5*(this.width+this.Map.tileWidth);
                            var height=0.5*(this.height+this.Map.tileHeight);
                            var dx=(this.position.x+(this.width/2))-(j*this.Map.tileWidth+(this.Map.tileWidth/2));
                            var dy=(this.position.y+(this.height/2))-(i*this.Map.tileHeight+(this.Map.tileHeight/2));
                            if(Math.abs(dx)<=width&&Math.abs(dy)<=height)
                            {
                                var wy=width*dy;
                                var hx=height*dx;
                                if(wy>hx)
                                {
                                    if(wy>-hx)
                                    {
                                        this.position.y=(i*this.Map.tileHeight+this.Map.tileHeight);
                                    }
                                    else
                                    {
                                        this.velocity.x=0;
                                        this.position.x-=2;
                                    }
                                }
                                else
                                {
                                    if(wy>-hx)
                                    {
                                        this.velocity.x=0;
                                        this.position.x+=2;
                                    }
                                    else
                                    {
                                        this.position.y=(i*this.Map.tileHeight-this.height);
                                        this.onTheGround=true;
                                    }
                                }
                            }
                        }
                    }  
            }
        }
    }
}
export {Player};