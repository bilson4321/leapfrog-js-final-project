class Treasure {
    constructor(player, mainVillainState) {
        this.image = new Image();
        this.image.src = './images/treasureChest.png';
        this.position = { x: 0, y: 0 }
        this.player = player;
        this.width = 40;
        this.height = 40;
        this.status = 'locked';
        this.mainVillainState = mainVillainState;
    }
    update() {
        if (this.status == 'collectable')
            this.handleCollision();
        else if (this.status == 'locked') {
            if (this.mainVillainState.currentState == this.mainVillainState.dead)
                this.status = 'collectable';
        }

    }
    draw(canvasContext) {
        if (this.status == 'collectable')
            canvasContext.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
    handleCollision() {
        if (this.position.x < this.player.position.x + this.player.width &&
            this.position.x + this.width > this.player.position.x &&
            this.position.y < this.player.position.y + this.player.height &&
            this.position.y + this.height > this.player.position.y) {
            this.status = 'collected';
            this.mainVillainState.currentState = this.mainVillainState.treasureLooted;
        }
    }
}
export { Treasure };