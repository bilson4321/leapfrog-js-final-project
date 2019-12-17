import { Zombie } from "./Enemy/Zombie.js";

class EnemyList
{
    constructor(tileMap,player,bullet)
    {
        this.list=[];
        this.Map=tileMap;
        this.player=player;
        this.bullet=bullet;
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
}
export {EnemyList}