import {TitleScreen} from './GameStates/TitleScreen.js';
import {PlayingState} from './GameStates/PlayingState.js';
import {InputController} from './InputController.js';

class Game
{
    static gameState={currentState:0,
        titleScreen:0,
        playingState:1};
    constructor(mainDiv)
    {
        this.htmlContainerDiv=mainDiv;
        this.canvas=document.createElement('CANVAS');
        this.canvas.height=720;
        this.canvas.width=960;
        this.htmlContainerDiv.appendChild(this.canvas);
        this.canvasContext=this.canvas.getContext('2d');
        
        this.inputController=new InputController();
        
        this.titleScreen=new TitleScreen();
        this.playingState=new PlayingState();      
    }
    init()
    {

    }
    render()
    {
        this.canvasContext.clearRect(0,0,960,720);
        
        if(Game.gameState.currentState==Game.gameState.titleScreen)
        {
            this.titleScreen.handleInput(this.inputController);
            this.titleScreen.update();
            this.titleScreen.draw(this.canvasContext);
        }
        if(Game.gameState.currentState==Game.gameState.playingState)
        {
            this.playingState.handleInput(this.inputController);
            this.playingState.update();
            this.playingState.draw(this.canvasContext);
        }
        
        window.requestAnimationFrame(this.render.bind(this));
    }
    start()
    {
        window.requestAnimationFrame(this.render.bind(this));
    }
}

export {Game};