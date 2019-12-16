class InputController
{
    constructor()
    {
        window.addEventListener('keyup',this.keyUp.bind(this));
        window.addEventListener('keydown',this.keyDown.bind(this));
       // this.keyUpCode=null;
       // this.keyDownCode=null;
       this.code={};
    }
    keyUp(event)
    {
        //this.keyUpCode=event.keyCode;
        delete this.code[event.keyCode];
    }
    keyDown(event)
    {
        //this.keyDownCode=event.keyCode;
        this.code[event.keyCode]=true;
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
        if(this.code[keyCode]==true)
        return true;
        else
        return false;
        /*
        if(this.keyDownCode==keyCode)
        return true;
        else
        return false;
        */
    }
}

export {InputController};