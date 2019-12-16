import {Player} from './GameObjects/Player.js';
import { TileMap } from './GameObjects/TileMap.js';
import { Zombie } from './GameObjects/Enemy/Zombie.js';
import { Camera } from './Utilities/Camera.js';
import { Bullet } from './GameObjects/Bullet.js';

class GameWorld
{
    constructor()
    {
        this.background=new Image();
        this.background.src='./images/background.png';
        this.tileMap=new TileMap();
        this.worldSize={height:720,width:this.tileMap.getMapWidth()};
        this.camera=new Camera(this.worldSize);
        this.bullet=new Bullet();
        this.player=new Player(this.tileMap,this.bullet);
        this.zombie=new Zombie(this.tileMap,this.player,this.bullet);
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
        this.bullet.update();
        this.camera.updatePosition(this.player.position);
    }
    draw(canvasContext)
    {
        this.camera.followPlayer(canvasContext);
      
        canvasContext.drawImage(this.background,this.camera.getCameraPositionX(),0,1920,1080);
        this.tileMap.draw(canvasContext);
        this.bullet.draw(canvasContext);
        this.player.draw(canvasContext);
        this.zombie.draw(canvasContext);
    }
}
export {GameWorld};