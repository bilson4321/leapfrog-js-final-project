class TitleScreen
{
    constructor()
    {
        this.background=new Image();
        this.background.src='./images/titleScreen.png';
    }
    update()
    {
        console.log('updating titlescreen');
    }
    draw(canvasContext)
    {
        canvasContext.drawImage(this.background,0,0);
    }
}

export {TitleScreen};