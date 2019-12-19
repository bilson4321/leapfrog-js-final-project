import {GameWorld} from '../GameWorld.js';

class PlayingState
{
    constructor(assetManager,gameState)
    {
        this.assetManager=assetManager;
        this.gameWorld=new GameWorld(this.assetManager);
        this.gameState=gameState;
        this.coinCollected=0;
    }
    handleInput(inputController)
    {
        this.gameWorld.handleInput(inputController);
    }
    update()
    {
        if(this.gameWorld.state.current==this.gameWorld.state.gameOver)
        {
            this.coinCollected=this.gameWorld.player.coinCollected;
            this.gameWorld.player.reset();
            this.gameWorld.camera.reset();
            this.gameWorld.enemyList.reset();
            this.gameWorld.pickUpList.reset();
            this.gameWorld.gameHud.reset();
            this.gameWorld.mainVillainState.currentState=this.gameWorld.mainVillainState.alive;
            this.gameWorld.state.current=this.gameWorld.state.running;
            this.gameState.currentState=this.gameState.gameOverState;
        }
        else if(this.gameWorld.mainVillainState.currentState==this.gameWorld.mainVillainState.treasureLooted)
        {
            this.coinCollected=this.gameWorld.player.coinCollected;
            this.gameWorld.player.reset();
            this.gameWorld.camera.reset();
            this.gameWorld.enemyList.reset();
            this.gameWorld.pickUpList.reset();
            this.gameWorld.gameHud.reset();
            this.gameWorld.mainVillainState.currentState=this.gameWorld.mainVillainState.alive;
            this.gameWorld.state.current=this.gameWorld.state.running;
            this.gameState.currentState=this.gameState.gameWonState;
        }
        else
        this.gameWorld.update();
    }
    draw(canvasContext)
    {
        this.gameWorld.draw(canvasContext);
    }
}

export {PlayingState};