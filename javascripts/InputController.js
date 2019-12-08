class InputController
{
    constructor()
    {
        document.addEventListener('keyup',this.keyUp.bind(this));
        document.addEventListener('keydown',this.keyDown.bind(this));
        this.keyUpCode=null;
        this.keyDownCode=null;
    }
    keyPressed(keyCode)
    {
        if(this.keyUpCode==keyCode&&this.keyDownCode==keyCode)
        return true;
        else
        return false;
    }
    keyUp(event)
    {
        console.log("keyUp>>",event.keyCode);
        this.keyUpCode=event.keyCode;
    }
    keyDown(event)
    {
        console.log('keyDown>>',event.keyCode);
        this.keyDownCode=event.keyCode;
    }
}

export {InputController};