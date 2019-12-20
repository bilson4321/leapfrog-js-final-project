class GameHUD {
    constructor(game) {
        this.game = game;
        this.position = { x: 30, y: 10 };
        //Health HUD
        this.healthHUD = new Image();
        this.healthHUD.src = './images/health_hud.png';
        this.healthBar = new Image();
        this.healthBar.src = './images/health_bar.png';
        this.healthBarMaxWidth = 132;
        this.healthBarWidth = 132;

        this.coinBar = new Image();
        this.coinBar.src = './images/coin_bar.png';

        this.bulletBar = new Image();
        this.bulletBar.src = './images/bullet_bar.png';
    }
    update() {
        this.position.x -= this.game.camera.i;
        this.healthBarWidth = Math.floor((this.game.player.health / 100) * this.healthBarMaxWidth);
    }
    draw(canvasContext) {
        canvasContext.drawImage(this.healthHUD, this.position.x, this.position.y, 250, 80);
        canvasContext.drawImage(this.healthBar, 0, 0, 223, 23, this.position.x + 90, this.position.y + 8, this.healthBarWidth, 14);
        canvasContext.drawImage(this.coinBar, this.position.x, this.position.y + 86, 140, 34);
        canvasContext.drawImage(this.bulletBar, this.position.x, this.position.y + 130, 140, 34);
        canvasContext.font = '20px Arial';
        canvasContext.fillText("" + this.game.player.coinCollected, this.position.x + 44, this.position.y + 112);
        canvasContext.fillText("" + this.game.player.bulletCount, this.position.x + 40, this.position.y + 156);
    }
    reset() {
        this.position = { x: 30, y: 10 };
    }
}
export { GameHUD };