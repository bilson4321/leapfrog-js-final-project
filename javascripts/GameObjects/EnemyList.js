import { Zombie } from "./Enemy/Zombie.js";
import { OrcLord } from "./Enemy/OrcLord.js";

class EnemyList
{
    constructor(tileMap,player,bullet,mainVillainState)
    {
        this.list=[];
        this.Map=tileMap;
        this.player=player;
        this.bullet=bullet;
        this.mainVillainState=mainVillainState;
        this.generateEnemy();
    }
    generateEnemy()
    {
        for(var i=0;i<this.Map.enemy.length;i++)
        {
            for(var j=0;j<this.Map.enemy[i].length;j++)
            {   
                var index=this.Map.enemy[i][j];
                switch(index)
                {
                    case 1:
                        {
                            var enemy=new Zombie(this.Map,this.player,this.bullet);
                            enemy.position.x=j*this.Map.tileWidth;
                            enemy.position.y=i*this.Map.tileHeight;
                            enemy.patrolDistance.initialX=enemy.position.x;
                            enemy.patrolDistance.destinationX=enemy.position.x+250;
                            this.list.push(enemy);
                            break;
                        }
                    case 3:
                            {
                                var mainVillain=new OrcLord(this.Map,this.player,this.bullet,this.mainVillainState);
                                mainVillain.position.x=j*this.Map.tileWidth;
                                mainVillain.position.y=i*this.Map.tileHeight;
                                mainVillain.patrolDistance.initialX=mainVillain.position.x;
                                mainVillain.patrolDistance.destinationX=mainVillain.position.x+250;
                                this.list.push(mainVillain);
                                break;
                            }
                }
            }
        }
    }
    update()
    {
        for(var i=0;i<this.list.length;i++)
        {
            this.list[i].update();
        }
    }
    draw(canvasContext)
    {
        for(var i=0;i<this.list.length;i++)
        {
            this.list[i].draw(canvasContext);
        }
    }
    reset()
    {
        this.list=[];
        this.generateEnemy();
    }
}
export {EnemyList}