import {GameWorld} from '../GameWorld.js';

class PlayingState
{
    constructor()
    {
        this.gameWorld=new GameWorld();
    }
    handleInput(inputController)
    {
        this.gameWorld.handleInput(inputController);
    }
    update()
    {
        this.gameWorld.update();
    }
    draw(canvasContext)
    {
      //  canvasContext.drawImage(this.background,450,450);
        this.gameWorld.draw(canvasContext);
    }
}

export {PlayingState};