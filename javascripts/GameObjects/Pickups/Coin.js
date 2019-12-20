import { Animation } from '../../Utilities/Animation.js'
class Coin {
    constructor(player) {
        this.animation = new Animation('./images/coin.png', 40, 440, 40, 40, 10);
        this.position = { x: 0, y: 0 }
        this.player = player;
        this.width = 40;
        this.height = 40;
        this.status = 'collectable';
    }
    update() {
        if (this.status == 'collectable')
            this.handleCollision();
    }
    draw(canvasContext) {
        if (this.status == 'collectable')
            this.animation.draw(canvasContext, this.position.x, this.position.y);
    }
    handleCollision() {
        if (this.position.x < this.player.position.x + this.player.width &&
            this.position.x + this.width > this.player.position.x &&
            this.position.y < this.player.position.y + this.player.height &&
            this.position.y + this.height > this.player.position.y) {
            this.player.coinCollected += 5;
            this.status = 'collected';
        }
    }
}
export { Coin };