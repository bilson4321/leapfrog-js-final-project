import {TitleScreen} from './GameStates/TitleScreen.js';
import {InputController} from './InputController.js';

class Game
{
    constructor(mainDiv)
    {
        this.htmlContainerDiv=mainDiv;
        this.canvas=document.createElement('CANVAS');
        this.canvas.height=720;
        this.canvas.width=960;
        this.htmlContainerDiv.appendChild(this.canvas);
        this.canvasContext=this.canvas.getContext('2d');
        this.gameState={currentState:0,
                        titleScreen:0,
                        playingState:1};
        this.inputController=new InputController();
        
        this.titleScreen=new TitleScreen();      
    }
    init()
    {

    }
    render()
    {
        this.canvasContext.clearRect(0,0,720,960);
        
        if(this.gameState.currentState==this.gameState.titleScreen)
        {
            this.titleScreen.handleInput(this.inputController);
            this.titleScreen.update();
            this.titleScreen.draw(this.canvasContext);
        }
        
        window.requestAnimationFrame(this.render.bind(this));
    }
    start()
    {
        window.requestAnimationFrame(this.render.bind(this));
    }
}

export {Game};