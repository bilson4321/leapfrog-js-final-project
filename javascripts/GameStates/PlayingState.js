import {GameWorld} from '../GameWorld.js';

class PlayingState
{
    constructor(gameState)
    {
        this.gameWorld=new GameWorld();
        this.gameState=gameState;
    }
    handleInput(inputController)
    {
        this.gameWorld.handleInput(inputController);
    }
    update()
    {
        if(this.gameWorld.state.current==this.gameWorld.state.gameOver)
        {
            this.gameWorld.player.reset();
            this.gameWorld.camera.reset();
            this.gameWorld.enemyList.reset();
            this.gameWorld.pickUpList.reset();
            this.gameWorld.gameHud.reset();
            this.gameWorld.state.current=this.gameWorld.state.running;
            console.log("GameOver");
            this.gameState.currentState=this.gameState.gameOverState;
        }
        else
        this.gameWorld.update();
    }
    draw(canvasContext)
    {
      //  canvasContext.drawImage(this.background,450,450);
        this.gameWorld.draw(canvasContext);
    }
}

export {PlayingState};