import { Button } from "../Utilities/Button.js";

class GameOverState
{
    constructor(assetManager,gameState)
    {
        this.assetManager=assetManager;
        this.assetManager.loadImageAsset('gameOverScreen','./images/gameOver.png');
        this.gameState=gameState;
        this.restartButton=new Button(this.assetManager,'restartButton','./images/restartButton.png',380,480,60,180);
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
    draw(canvasContext)
    {
        canvasContext.drawImage(this.assetManager.getImageAsset('gameOverScreen'),0,0);
        canvasContext.fillText("You Died",390,380);
        canvasContext.fillText("You Collected : "+this.coinCollected,390,430);
        this.restartButton.draw(canvasContext);
    }
}
export {GameOverState};