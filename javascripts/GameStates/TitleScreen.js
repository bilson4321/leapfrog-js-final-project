class TitleScreen
{
    constructor(gameState)
    {
        this.background=new Image();
        this.background.src='./images/titleScreen.png';
        this.gameState=gameState;
    }
    handleInput(inputController)
    {
        if(inputController.isKeyDown(32))
        {
            this.gameState.currentState=this.gameState.playingState;
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