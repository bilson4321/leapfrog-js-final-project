import { Button } from "../Utilities/Button.js";

class TitleScreen
{
    constructor(gameState)
    {
        this.background=new Image();
        this.background.src='./images/titleScreen.png';
        this.gameState=gameState;
        this.playButton=new Button('./images/playButton.png',390,400,60,190);
        this.helpButton=new Button('./images/playButton.png',390,500,60,190);
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
        canvasContext.drawImage(this.background,0,0);
        this.playButton.draw(canvasContext);
        this.helpButton.draw(canvasContext);
    }
}

export {TitleScreen};