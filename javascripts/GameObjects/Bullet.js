class Bullet {
    constructor(assetManager) {
        this.assetManager = assetManager;
        this.assetManager.loadImageAsset('bullet', './images/bullet.png');
        this.state = 'idle';
        this.position = { x: 0, y: 0 };
        this.shootFrom = { x: 0, y: 0 };
        this.range = 400;
        this.height = 6;
        this.width = 18;
        this.mirrored = 0;
    }
    update() {
        if (this.state == 'shooting') {
            if (this.mirrored == 0) {
                this.position.x += 25;
                if (this.position.x > (this.shootFrom.x + this.range))
                    this.state = 'idle';
            }
            else {
                this.position.x -= 25;
                if (this.position.x < (this.shootFrom.x - this.range))
                    this.state = 'idle';
            }


        }
    }
    shoot(x, y, mirrored) {
        this.shootFrom.x = x;
        this.shootFrom.y = y;
        this.mirrored = mirrored;
        this.state = 'shooting';
        this.position.x = this.shootFrom.x;
        this.position.y = this.shootFrom.y;
    }
    draw(canvasContext) {
        if (this.state == 'shooting')
            canvasContext.drawImage(this.assetManager.getImageAsset('bullet'), this.position.x, this.position.y, this.width, this.height);
    }
}
export { Bullet }