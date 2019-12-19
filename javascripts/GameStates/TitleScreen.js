import { Button } from "../Utilities/Button.js";

class TitleScreen
{
    constructor(assetManager,gameState)
    {
        this.assetManager=assetManager;
        this.assetManager.loadImageAsset('titleScreen','./images/titleScreen.png');
        this.gameState=gameState;
        this.playButton=new Button(this.assetManager,'playButton','./images/playButton.png',390,400,60,190);
        this.helpButton=new Button(this.assetManager,'helpButton','./images/helpButton.png',390,500,60,190);
    }
    handleInput(inputController)
    {
        this.playButton.handleInput(inputController);  
        this.helpButton.handleInput(inputController);      
    }
    update()
    {
        if(this.playButton.buttonClicked==true)
        {
            this.gameState.currentState=this.gameState.playingState;
            this.playButton.buttonClicked=false;
        }  
        if(this.helpButton.buttonClicked==true)
        {
            this.gameState.currentState=this.gameState.helpScreen;
            this.helpButton.buttonClicked=false;
        } 
    }
    draw(canvasContext)
    {
        canvasContext.drawImage(this.assetManager.getImageAsset('titleScreen'),0,0);
        this.playButton.draw(canvasContext);
        this.helpButton.draw(canvasContext);
    }
}

export {TitleScreen};