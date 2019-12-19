import { Button } from "../Utilities/Button.js";

class HelpScreen
{
    constructor(gameState)
    {
        this.background=new Image();
        this.background.src='./images/helpScreen.png';
        this.gameState=gameState;
        this.backButton=new Button('./images/playButton.png',390,400,60,190);
    }
    handleInput(inputController)
    {
        this.backButton.handleInput(inputController);        
    }
    update()
    {
        if(this.backButton.buttonClicked==true)
        {
            this.gameState.currentState=this.gameState.titleScreen;
            this.backButton.buttonClicked=false;
        }  
    }
    draw(canvasContext)
    {
        canvasContext.drawImage(this.background,0,0);
        this.backButton.draw(canvasContext);
    }
}

export {HelpScreen};