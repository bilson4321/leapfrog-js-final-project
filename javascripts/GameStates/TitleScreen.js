import { Game } from "../game.js";

class TitleScreen
{
    constructor()
    {
        this.background=new Image();
        this.background.src='./images/titleScreen.png';
    }
    handleInput(inputController)
    {
        if(inputController.keyPressed(32))
        {
            console.log("space pressed");
            Game.gameState.currentState=Game.gameState.playingState;
            inputController.reset();
        }
    }
    update()
    {
        
    }
    draw(canvasContext)
    {
        canvasContext.drawImage(this.background,0,0);
    }
}

export {TitleScreen};