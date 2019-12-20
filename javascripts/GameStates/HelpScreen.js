import { Button } from "../Utilities/Button.js";

class HelpScreen {
    constructor(assetManager, gameState) {
        this.assetManager = assetManager;
        this.assetManager.loadImageAsset('helpScreen', './images/helpScreen.png');
        this.gameState = gameState;
        this.backButton = new Button(this.assetManager, 'backButton', './images/backButton.png', 20, 20, 60, 190);
    }
    handleInput(inputController) {
        this.backButton.handleInput(inputController);
    }
    update() {
        if (this.backButton.buttonClicked == true) {
            this.gameState.currentState = this.gameState.titleScreen;
            this.backButton.buttonClicked = false;
        }
    }
    draw(canvasContext) {
        canvasContext.drawImage(this.assetManager.getImageAsset('helpScreen'), 0, 0);
        this.backButton.draw(canvasContext);
    }
}

export { HelpScreen };