import {Player} from './GameObjects/Player.js';
import { TileMap } from './GameObjects/TileMap.js';
import { Zombie } from './GameObjects/Enemy/Zombie.js';
import { Camera } from './Utilities/Camera.js';
import { Bullet } from './GameObjects/Bullet.js';
import { EnemyList } from './GameObjects/EnemyList.js';
import { PickUpList } from './GameObjects/PickupList.js';
import { GameHUD } from './GameObjects/GameHUD.js';

class GameWorld
{
    constructor()
    {
        this.background=new Image();
        this.state={current:0,running:0,gameWon:1,gameOver:2};
        this.background.src='./images/background.png';
        this.tileMap=new TileMap();
        this.worldSize={height:720,width:this.tileMap.getMapWidth()};
        this.camera=new Camera(this.worldSize);
        this.bullet=new Bullet();
        this.player=new Player(this.tileMap,this.bullet,this.state);
        this.enemyList=new EnemyList(this.tileMap,this.player,this.bullet);
        this.pickUpList=new PickUpList(this.tileMap,this.player);
        this.gameHud=new GameHUD(this);
    }
    handleInput(inputController)
    {
        this.player.handleInput(inputController);
    }
    update()
    {
        if(this.state.current==this.state.running)
        {
            this.tileMap.update();
            this.player.update();
            this.enemyList.update();
            this.pickUpList.update();
            this.bullet.update();
            this.camera.updatePosition(this.player.position);
            this.gameHud.update();
        }
        else if(this.state.current==this.state.gameOver)
        {
            this.player.reset();
        }
    }
    draw(canvasContext)
    {
        this.camera.followPlayer(canvasContext);
      
        canvasContext.drawImage(this.background,this.camera.getCameraPositionX(),0,1920,1080);
        this.tileMap.draw(canvasContext);
        this.pickUpList.draw(canvasContext);
        this.bullet.draw(canvasContext);  
        this.player.draw(canvasContext);
        this.enemyList.draw(canvasContext);
        this.gameHud.draw(canvasContext);
    }
}
export {GameWorld};