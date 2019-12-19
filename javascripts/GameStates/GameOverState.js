import { Button } from "../Utilities/Button.js";

class GameOverState
{
    constructor(gameState)
    {
        this.background=new Image();
        this.background.src='./images/gameOver.png';
        this.gameState=gameState;
        this.restartButton=new Button('./images/restartButton.png',380,480,60,140);
        this.coinCollected=0;
    }
    handleInput(inputController)
    {
        this.restartButton.handleInput(inputController);
    }
    update()
    {
        if(this.restartButton.buttonClicked==true)
        {
            this.gameState.currentState=this.gameState.playingState;
            this.restartButton.buttonClicked=false;
        }
    }
    updateScore(coin)
    {
        this.coinCollected=coin;
    }
    draw(canvasContext)
    {
        canvasContext.drawImage(this.background,0,0);
        canvasContext.fillText("You Died",390,400);
        this.restartButton.draw(canvasContext);
    }
}
export {GameOverState};