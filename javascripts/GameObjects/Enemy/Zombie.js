import {Animation} from '../../Utilities/Animation.js'

class Zombie
{
    constructor(tileMap,player,bullet)
    {
        this.Map=tileMap;
        this.animationState={current:0,idle:0,walking:1,attacking:2,dead:3};
        
        this.idle=new Animation('./images/zombie_idle.png',280,700,111,69,4);
        this.walking=new Animation('./images/zombie_walking.png',280,999,111,66,6);
        this.attacking=new Animation('./images/zombie_attacking.png',280,1137,111,75,6);
        this.dead=new Animation('./images/zombie_dead.png',280,2634,111,118,8,false);
        this.healthBar=new Image();
        this.healthBar.src='./images/health_bar.png';

        this.position={x:500,y:480};
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
        this.patrolDistance={initialX:this.position.x+2,destinationX:this.position.x+400};
        //zombie status
        this.health=100;
        this.player=player;
        this.attackRange={height:40,width:40};
        this.healthBarMaxWidth=70;
        this.healthBarWidth=70;

        this.bullet=bullet;
    }
    handleInput(inputController)
    {
        
    }
    update()
    { 
        this.healthBarWidth=Math.floor((this.health/100)*this.healthBarMaxWidth);
        this.health=Math.max(0,this.health);
        if(this.health>0)
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
                            if(this.player.knifeExtended==true)
                                this.health-=30;
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
                            if(this.player.knifeExtended==true)
                                this.health-=30;
                        }
                    }

            }
        }
        if(this.activityState.current==this.activityState.attacking)
        {
            this.velocity.x=0;
            this.idleCounter++;
            if(this.player.health>0&&this.attacking.getFrameIndex()==4)
                this.player.health-=2;
            if(this.idleCounter<500)
            {
                this.idleCounter=0;
                this.activityState.current=this.activityState.patrol;
            }
        }
         
    
        
        this.position.x+=this.velocity.x;
        this.velocity.x*=0.5;
        this.handleCollision();
        }
        else
        {
            this.animationState.current=this.animationState.dead;
        }
    }
    draw(canvasContext)
    {
        canvasContext.drawImage(this.healthBar,0,0,223,23,this.position.x,this.position.y-20,this.healthBarWidth,10);
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
            if(this.animationState.current==this.animationState.dead)
            this.dead.draw(canvasContext,0,0);
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
            if(this.animationState.current==this.animationState.dead)
            this.dead.draw(canvasContext,this.position.x,this.position.y);
            canvasContext.strokeStyle='blue';
            canvasContext.strokeRect(this.position.x+30,this.position.y,this.attackRange.width,this.attackRange.height);
        }
    }
    handleCollision()
    {
        this.onTheGround=false;
        if (this.position.x < this.bullet.position.x + this.bullet.width &&
            this.position.x + this.width > this.bullet.position.x &&
            this.position.y < this.bullet.position.y+this.bullet.height &&
            this.position.y + this.height > this.bullet.position.y)
            {
                this.health-=30;
                this.bullet.state='idle';
                this.bullet.position.x=0;
            } 
    }
}
export {Zombie};