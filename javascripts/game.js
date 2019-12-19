import {TitleScreen} from './GameStates/TitleScreen.js';
import {PlayingState} from './GameStates/PlayingState.js';
import {InputController} from './InputController.js';
import { GameOverState } from './GameStates/GameOverState.js';
import { HelpScreen } from './GameStates/HelpScreen.js';
import { GameWonState } from './GameStates/GameWonState.js';
import { AssetManager } from './Utilities/AssetManager.js';

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
        this.assetManager=new AssetManager();
        
        this.gameState={currentState:0,titleScreen:0,playingState:1,gameOverState:2,gameWonState:3,helpScreen:4};
        this.titleScreen=new TitleScreen(this.assetManager,this.gameState);
        this.playingState=new PlayingState(this.assetManager,this.gameState); 
        this.gameWonState=new GameWonState(this.assetManager,this.gameState); 
        this.gameOverState=new GameOverState(this.assetManager,this.gameState); 
        this.helpScreen=new HelpScreen(this.assetManager,this.gameState);    
    }
    init()
    {

    }
    render()
    {
        this.canvasContext.clearRect(0,0,960,720);
        if(this.assetManager.loadedImage!=this.assetManager.totalImages)
        {
            this.assetManager.displayStatus(this.canvasContext);
        }
        else
        {
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
                this.gameOverState.coinCollected=this.playingState.coinCollected;
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
            if(this.gameState.currentState==this.gameState.gameWonState)
            {
                this.gameWonState.coinCollected=this.playingState.coinCollected;
                this.gameWonState.handleInput(this.inputController);
                this.gameWonState.update();
                this.gameWonState.draw(this.canvasContext);
            }
        }
        
        window.requestAnimationFrame(this.render.bind(this));
    }
    start()
    {
        window.requestAnimationFrame(this.render.bind(this));
    }
}

export {Game};