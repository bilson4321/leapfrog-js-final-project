class InputController
{
    constructor(canvas)
    {
        window.addEventListener('keyup',this.keyUp.bind(this));
        window.addEventListener('keydown',this.keyDown.bind(this));
        canvas.addEventListener('click',this.updateMouse.bind(this));
       // this.keyUpCode=null;
       // this.keyDownCode=null;
       this.code={};
       this.mousePosition={x:0,y:0};
       this.mouseClicked=false;
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
    updateMouse(event)
    {
        this.mousePosition.x=event.offsetX;
        this.mousePosition.y=event.offsetY;
        this.mouseClicked=true;
    }
    //must be called after desired input has been taken
    reset()
    {
        this.keyUpCode=null;
        this.keyDownCode=null;
        this.mouseClicked=false;
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