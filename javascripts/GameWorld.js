import {Player} from './GameObjects/Player.js';
import { TileMap } from './GameObjects/TileMap.js';

class GameWorld
{
    constructor()
    {
        this.worldSize={height:720,width:1960};
        this.tileMap=new TileMap();
        this.player=new Player(this.tileMap);
    }
    handleInput(inputController)
    {
        this.player.handleInput(inputController);
    }
    update()
    {
        this.tileMap.update();
        this.player.update();
    }
    draw(canvasContext)
    {
        this.tileMap.draw(canvasContext);
        this.player.draw(canvasContext);
    }
}
export {GameWorld};