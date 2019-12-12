import {Player} from './GameObjects/Player.js';
import { TileMap } from './GameObjects/TileMap.js';
import { Zombie } from './GameObjects/Enemy/Zombie.js';

class GameWorld
{
    constructor()
    {
        this.worldSize={height:720,width:1960};
        this.background=new Image();
        this.background.src='./images/background.png';
        this.tileMap=new TileMap();
        this.player=new Player(this.tileMap);
        this.zombie=new Zombie(this.tileMap,this.player);
    }
    handleInput(inputController)
    {
        this.player.handleInput(inputController);
    }
    update()
    {
        this.tileMap.update();
        this.player.update();
        this.zombie.update();
    }
    draw(canvasContext)
    {
        canvasContext.drawImage(this.background,0,0,1280,1280);
        this.tileMap.draw(canvasContext);
        this.player.draw(canvasContext);
        this.zombie.draw(canvasContext);
    }
}
export {GameWorld};