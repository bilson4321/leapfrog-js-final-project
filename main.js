import {Game} from './javascripts/game.js';

var gameDiv=document.getElementById('game');

gameDiv.style.height='720px';
gameDiv.style.width='960px';
gameDiv.style.border="2px solid black";
gameDiv.style.margin='0 auto';


var game=new Game(gameDiv);
game.start();