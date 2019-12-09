class InputController
{
    constructor()
    {
        window.addEventListener('keyup',this.keyUp.bind(this));
        window.addEventListener('keydown',this.keyDown.bind(this));
        this.keyUpCode=null;
        this.keyDownCode=null;
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
    //must be called after desired input has been taken
    reset()
    {
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
    isKeyDown(keyCode)
    {
        if(this.keyDownCode==keyCode)
        return true;
        else
        return false;
    }
}

export {InputController};