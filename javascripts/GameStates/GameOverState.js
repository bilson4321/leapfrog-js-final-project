class GameOverState
{
    constructor(gameState)
    {
        this.background=new Image();
        this.background.src='./images/gameOver.png';
        this.gameState=gameState;
    }
    handleInput(inputController)
    {
        if(inputController.isKeyDown(13))
        {
            this.gameState.currentState=this.gameState.titleScreen;
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

export {GameOverState};