import {TitleScreen} from './GameStates/TitleScreen.js';
import {PlayingState} from './GameStates/PlayingState.js';
import {InputController} from './InputController.js';
import { GameOverState } from './GameStates/GameOverState.js';
import { HelpScreen } from './GameStates/helpScreen.js';

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
        
        this.inputController=new InputController(this.canvas);
        
        this.gameState={currentState:0,titleScreen:0,playingState:1,gameOverState:2,helpScreen:3};
        this.titleScreen=new TitleScreen(this.gameState);
        this.playingState=new PlayingState(this.gameState); 
        this.gameOverState=new GameOverState(this.gameState); 
        this.helpScreen=new HelpScreen(this.gameState);    
    }
    init()
    {

    }
    render()
    {
        this.canvasContext.clearRect(0,0,960,720);
        
        if(this.gameState.currentState==this.gameState.titleScreen)
        {
            this.titleScreen.handleInput(this.inputController);
            this.titleScreen.update();
            this.titleScreen.draw(this.canvasContext);
        }
        if(this.gameState.currentState==this.gameState.playingState)
        {
            this.playingState.handleInput(this.inputController);
            this.playingState.update();
            this.playingState.draw(this.canvasContext);
        }
        if(this.gameState.currentState==this.gameState.gameOverState)
        {
            this.gameOverState.handleInput(this.inputController);
            this.gameOverState.update();
            this.gameOverState.draw(this.canvasContext);
        }
        if(this.gameState.currentState==this.gameState.helpScreen)
        {
            this.helpScreen.handleInput(this.inputController);
            this.helpScreen.update();
            this.helpScreen.draw(this.canvasContext);
        }
        
        window.requestAnimationFrame(this.render.bind(this));
    }
    start()
    {
        window.requestAnimationFrame(this.render.bind(this));
    }
}

export {Game};