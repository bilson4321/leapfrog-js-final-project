import {Animation} from '../../Utilities/Animation.js'

class Zombie
{
    constructor(tileMap,player)
    {
        this.Map=tileMap;
        this.animationState={current:0,idle:0,walking:1,shooting:2};
        
        this.idle=new Animation('./images/zombie_idle.png',280,700,111,69,4);
        this.walking=new Animation('./images/zombie_walking.png',280,887,111,70,6);
        this.attacking=new Animation('./images/zombie_attacking.png',280,1033,111,70,6);

        this.position={x:290,y:550};
        this.height=111;
        this.width=69;
        this.velocity={x:0,y:0};
        this.friction=0.05;
        this.mirrored=0;
        this.onTheGround=true;
        this.shootingState=false;
        //zombie activity
        this.activityState={current:0,patrol:0,attacking:1};
        this.idleCounter=0;
        this.idleDuration=1000;
        this.patrolDistance={initialX:290,destinationX:600};

        this.player=player;
        this.attackRange={height:40,width:40};
    }
    handleInput(inputController)
    {
        
    }
    update()
    {
        if(this.velocity.x>0.25||this.velocity.x<-0.25)
        {
            this.animationState.current=this.animationState.walking;
        }
        else
        {
            this.animationState.current=this.animationState.idle;
        }

        if(this.activityState.current==this.activityState.patrol)
        {
            if(this.mirrored==0)
            {   
                this.velocity.x+=1;
                if(this.position.x>this.patrolDistance.destinationX)
                {
                    this.mirrored=1;
                    this.velocity.x-=1;
                }
                if (this.position.x+30 < this.player.position.x + this.player.width &&
                    this.position.x+30 + this.attackRange.width > this.player.position.x &&
                    this.position.y < this.player.position.y+this.player.height &&
                    this.position.y + this.attackRange.height > this.player.position.y) 
                    {
                        if(this.player.health>0)
                        {
                            this.activityState.current=this.activityState.attacking;
                            this.animationState.current=this.animationState.attacking;
                        }
                    }
            }
            else
            {
                this.velocity.x-=1;
                if(this.position.x<this.patrolDistance.initialX)
                {
                    this.mirrored=0;
                    this.velocity.x+=1;
                }
                if (this.position.x < this.player.position.x + this.player.width &&
                    this.position.x > this.player.position.x &&
                    this.position.y < this.player.position.y+this.player.height &&
                    this.position.y + this.attackRange.height > this.player.position.y) 
                    {
                        if(this.player.health>0)
                        {
                            this.activityState.current=this.activityState.attacking;
                            this.animationState.current=this.animationState.attacking;
                        }
                    }

            }
        }
        if(this.activityState.current==this.activityState.attacking)
        {
            this.velocity.x=0;
            this.idleCounter++;
            if(this.player.health>0&&this.attacking.getFrameIndex()==5)
                this.player.health-=5;
            if(this.idleCounter<500)
            {
                this.idleCounter=0;
                this.activityState.current=this.activityState.patrol;
            }
        }
         
    
        
        this.position.x+=this.velocity.x;
        this.velocity.x*=0.5;
       this.handleCollision();
        //this.handleCollision();
    }
    draw(canvasContext)
    {
       // this.handleCollision(canvasContext); // for experimental purpose only
        if(this.mirrored==1)
        {
            canvasContext.save();
            canvasContext.translate(this.position.x+this.width,this.position.y);
            canvasContext.scale(-1, 1);  
            // canvasContext.fillStyle='pink';
            // canvasContext.fillRect(0,0,this.width,this.height);
            if(this.animationState.current==this.animationState.idle)
            this.idle.draw(canvasContext,0,0);
            if(this.animationState.current==this.animationState.walking)
            this.walking.draw(canvasContext,0,0);
            if(this.animationState.current==this.animationState.attacking)
            this.attacking.draw(canvasContext,0,0);
            canvasContext.restore();
            canvasContext.strokeStyle='blue';
            canvasContext.strokeRect(this.position.x,this.position.y,this.attackRange.width,this.attackRange.height);
        }
        else
        {
            // canvasContext.fillStyle='pink';
            // canvasContext.fillRect(this.position.x,this.position.y,this.width,this.height);
            if(this.animationState.current==this.animationState.idle)
            this.idle.draw(canvasContext,this.position.x,this.position.y);
            if(this.animationState.current==this.animationState.walking)
            this.walking.draw(canvasContext,this.position.x,this.position.y);
            if(this.animationState.current==this.animationState.attacking)
            this.attacking.draw(canvasContext,this.position.x,this.position.y);
            canvasContext.strokeStyle='blue';
            canvasContext.strokeRect(this.position.x+30,this.position.y,this.attackRange.width,this.attackRange.height);
        }
    }
    handleCollision()
    {
        this.onTheGround=false;
        // for(var i=0;i<this.Map.map.length;i++)
        // {
        //     for(var j=0;j<this.Map.map[i].length;j++)
        //     {
        //         if (this.position.x < (j*this.Map.tileWidth) + this.Map.tileWidth &&
        //             this.position.x + this.width > (j*this.Map.tileWidth) &&
        //             this.position.y < (i*this.Map.tileHeight)+this.Map.tileHeight &&
        //             this.position.y + this.height > (i*this.Map.tileHeight)) 
        //             {
        //                 canvasContext.strokeStyle="red";
        //                 canvasContext.strokeRect(this.position.x,this.position.y,this.width,this.height);
        //                 canvasContext.strokeStyle="yellow";
        //                 canvasContext.strokeRect((j*this.Map.tileWidth),(i*this.Map.tileHeight),this.Map.tileWidth,this.Map.tileHeight);
        //                 //edge block type
        //                 if(this.Map.map[i][j]==2)
        //                 {
        //                     //collision for block Type (four Direction)
        //                     var width=0.5*(this.width+this.Map.tileWidth);
        //                     var height=0.5*(this.height+this.Map.tileHeight);
        //                     var dx=(this.position.x+(this.width/2))-(j*this.Map.tileWidth+(this.Map.tileWidth/2));
        //                     var dy=(this.position.y+(this.height/2))-(i*this.Map.tileHeight+22+(this.Map.tileHeight/2));
        //                     if(Math.abs(dx)<=width&&Math.abs(dy)<=height)
        //                     {
        //                         var wy=width*dy;
        //                         var hx=height*dx;
        //                         if(wy>hx)
        //                         {
        //                             if(wy>-hx)
        //                             {
        //                                 this.position.y=(i*this.Map.tileHeight+this.Map.tileHeight);
        //                             }
        //                             else
        //                             {
        //                                 this.velocity.x=0;
        //                                 this.position.x-=2;
        //                             }
        //                         }
        //                         else
        //                         {
        //                             if(wy>-hx)
        //                             {
        //                                 this.velocity.x=0;
        //                                 this.position.x+=2;
        //                             }
        //                             else
        //                             {
        //                                 this.position.y=(i*this.Map.tileHeight-this.height+22);
        //                                 this.onTheGround=true;
        //                             }
        //                         }
        //                     }
        //                 }
        //                 //block
        //                 if(this.Map.map[i][j]==5)
        //                 {
        //                     //collision for block Type (four Direction)
        //                     var width=0.5*(this.width+this.Map.tileWidth);
        //                     var height=0.5*(this.height+this.Map.tileHeight);
        //                     var dx=(this.position.x+(this.width/2))-(j*this.Map.tileWidth+(this.Map.tileWidth/2));
        //                     var dy=(this.position.y+(this.height/2))-(i*this.Map.tileHeight+(this.Map.tileHeight/2));
        //                     if(Math.abs(dx)<=width&&Math.abs(dy)<=height)
        //                     {
        //                         var wy=width*dy;
        //                         var hx=height*dx;
        //                         if(wy>hx)
        //                         {
        //                             if(wy>-hx)
        //                             {
        //                                 this.position.y=(i*this.Map.tileHeight+this.Map.tileHeight);
        //                             }
        //                             else
        //                             {
        //                                 this.velocity.x=0;
        //                                 this.position.x-=2;
        //                             }
        //                         }
        //                         else
        //                         {
        //                             if(wy>-hx)
        //                             {
        //                                 this.velocity.x=0;
        //                                 this.position.x+=2;
        //                             }
        //                             else
        //                             {
        //                                 this.position.y=(i*this.Map.tileHeight-this.height);
        //                                 this.onTheGround=true;
        //                             }
        //                         }
        //                     }
        //                 }
        //             }  
        //     }
        // }
    }
}
export {Zombie};