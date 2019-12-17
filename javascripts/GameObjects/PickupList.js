import { Coin } from "./Pickups/Coin.js";
import { Health } from "./Pickups/Health.js";
import { Ammunition } from "./Pickups/Ammunition.js";

class PickUpList
{
    constructor(tileMap,player)
    {
        this.list=[];
        this.Map=tileMap;
        this.player=player;
        this.generateCoin();
    }
    generateCoin()
    {
        for(var i=0;i<this.Map.pickups.length;i++)
        {
            for(var j=0;j<this.Map.pickups[i].length;j++)
            {   
                var index=this.Map.pickups[i][j];
                switch(index)
                {
                    case 1:
                        {
                            var coin=new Coin(this.player);
                            coin.position.x=j*this.Map.tileWidth+(this.Map.tileWidth/2);
                            coin.position.y=i*this.Map.tileHeight+(this.Map.tileHeight-coin.height);
                            this.list.push(coin);
                            break;
                        }
                    case 2:
                        {
                            var health=new Health(this.player);
                            health.position.x=j*this.Map.tileWidth+(this.Map.tileWidth/2);
                            health.position.y=i*this.Map.tileHeight+(this.Map.tileHeight-health.height);
                            this.list.push(health);
                            break;
                        }
                    case 3:
                            {
                                var ammunition=new Ammunition(this.player);
                                ammunition.position.x=j*this.Map.tileWidth+(this.Map.tileWidth/2);
                                ammunition.position.y=i*this.Map.tileHeight+(this.Map.tileHeight-ammunition.height);
                                this.list.push(ammunition);
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

export {PickUpList};