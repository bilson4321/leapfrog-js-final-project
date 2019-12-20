import { Animation } from '../Utilities/Animation.js';

class Player {
    constructor(tileMap, bullet, gameWorldState) {
        this.gameWorldState = gameWorldState;
        this.Map = tileMap;
        this.animationState = { current: 0, idle: 0, walking: 1, shooting: 2, knife: 3, dead: 4, fallingDown: 5 };

        this.idle = new Animation('./images/idle.png', 280, 1029, 129, 58, 8);
        this.walking = new Animation('./images/walking.png', 280, 1196, 129, 64, 8);
        this.shooting = new Animation('./images/shooting.png', 280, 1168, 129, 90, 6);
        this.knife = new Animation('./images/knifeStrike.png', 280, 779, 129, 60, 6);
        this.dead = new Animation('./images/dead.png', 280, 1504, 129, 116, 6, false);
        this.fallingDown = new Animation('./images/falling.png', 280, 669, 126, 71, 4);
        this.whenDamaged = new Image();
        this.whenDamaged.src = './images/whenDamage.png';

        this.position = { x: 250, y: 360 };
        this.height = 122;
        this.width = 58;
        this.velocity = { x: 0, y: 0 };
        this.friction = 0.05;
        this.mirrored = 0;
        this.onTheGround = false;
        this.shootingState = false;
        this.strikeState = false;
        this.knifeExtended = false;

        //Player status
        this.health = 100;
        this.bulletCount = 10;
        this.coinCollected = 0;

        this.previousHealth = 100;//for damage taken indication

        //bullet
        this.bullet = bullet;
    }
    handleInput(inputController) {
        if (inputController.isKeyDown(39)) {
            this.velocity.x += 3;
            inputController.reset();
        }
        else if (inputController.isKeyDown(37)) {
            this.velocity.x -= 3;
            inputController.reset();
        }
        else if (this.onTheGround) {
            this.velocity.x = 0;
        }
        if (inputController.isKeyDown(38) && this.onTheGround) {
            this.velocity.y -= 138;
            inputController.reset();
        }
        else if (inputController.isKeyDown(32) && this.onTheGround && !this.shootingState && this.bulletCount > 0) {
            this.shootingState = true;
            this.animationState.current = this.animationState.shooting;
            this.bulletCount--;
            this.shooting.start();
            if (this.bullet.state == 'idle')
                this.bullet.shoot(this.position.x + this.width, this.position.y + 40, this.mirrored);
            inputController.reset();
        }
        else if (inputController.isKeyDown(32) && this.onTheGround && !this.shootingState && this.bulletCount == 0) {
            this.strikeState = true;
            this.animationState.current = this.animationState.knife;
            inputController.reset();
        }

    }
    update() {
        this.knifeExtended = false;
        if (this.health > 0) {
            if (Math.abs(this.velocity.x) > 0) {
                if (this.shootingState) {
                    this.animationState.current = this.animationState.shooting;
                    if (this.shooting.getFrameIndex() == 5) {
                        this.shootingState = false;
                        this.shooting.start();
                    }
                }
                else if (this.strikeState) {
                    this.animationState.current = this.animationState.knife;
                    if (this.knife.getFrameIndex() == 5) {
                        this.knifeExtended = true;
                        this.strikeState = false;
                        this.knife.start();
                    }
                }
                else {
                    this.animationState.current = this.animationState.walking;
                }
            }
            else {
                if (this.shootingState) {
                    this.animationState.current = this.animationState.shooting;
                    if (this.shooting.getFrameIndex() == 5) {
                        this.shootingState = false;
                        this.shooting.start();
                    }
                }
                else if (this.strikeState) {
                    this.animationState.current = this.animationState.knife;
                    if (this.knife.getFrameIndex() == 5) {
                        this.knifeExtended = true;
                        this.strikeState = false;
                        this.knife.start();
                    }
                }
                else {
                    this.animationState.current = this.animationState.idle;
                }

            }


            if (this.velocity.x >= 0)
                this.mirrored = 0;
            else
                this.mirrored = 1;

            if (!this.shootingState && !this.strikeState)
                this.position.x += this.velocity.x;
            this.velocity.x *= this.friction;
            this.position.y += this.velocity.y;
            this.velocity.y *= this.friction;

            if (!this.onTheGround) {
                this.velocity.y += 4;
                this.animationState.current = this.animationState.fallingDown;
            }
        }
        else {
            this.animationState.current = this.animationState.dead;
            if (this.dead.getFrameIndex() == 5) {
                this.gameWorldState.current = this.gameWorldState.gameOver;
            }
        }
        if (this.position.y > 680) {
            this.gameWorldState.current = this.gameWorldState.gameOver;
        }
        this.handleCollision();
    }
    draw(canvasContext) {
        if (this.mirrored == 1) {
            canvasContext.save();
            canvasContext.translate(this.position.x + this.width, this.position.y);
            canvasContext.scale(-1, 1);
            if (this.previousHealth != this.health) {
                canvasContext.drawImage(this.whenDamaged, -25, 0, 116, 129);
            }
            else {
                if (this.animationState.current == this.animationState.idle)
                    this.idle.draw(canvasContext, 0, 0);
                if (this.animationState.current == this.animationState.walking)
                    this.walking.draw(canvasContext, 0, 0);
                if (this.animationState.current == this.animationState.shooting)
                    this.shooting.draw(canvasContext, 0, 0);
                if (this.animationState.current == this.animationState.knife)
                    this.knife.draw(canvasContext, 0, 0);
                if (this.animationState.current == this.animationState.dead)
                    this.dead.draw(canvasContext, -25, 0);
                if (this.animationState.current == this.animationState.fallingDown)
                    this.fallingDown.draw(canvasContext, 0, 0);
            }

            canvasContext.restore();
        }
        else {
            if (this.previousHealth != this.health) {
                canvasContext.drawImage(this.whenDamaged, this.position.x - 25, this.position.y, 116, 129);
            }
            else {
                if (this.animationState.current == this.animationState.idle)
                    this.idle.draw(canvasContext, this.position.x, this.position.y);
                if (this.animationState.current == this.animationState.walking)
                    this.walking.draw(canvasContext, this.position.x, this.position.y);
                if (this.animationState.current == this.animationState.shooting)
                    this.shooting.draw(canvasContext, this.position.x, this.position.y);
                if (this.animationState.current == this.animationState.knife)
                    this.knife.draw(canvasContext, this.position.x, this.position.y);
                if (this.animationState.current == this.animationState.dead)
                    this.dead.draw(canvasContext, this.position.x - 25, this.position.y);
                if (this.animationState.current == this.animationState.fallingDown)
                    this.fallingDown.draw(canvasContext, this.position.x, this.position.y);
            }
        }
        this.previousHealth = this.health;
    }
    handleCollision() {
        this.onTheGround = false;
        for (var i = 0; i < this.Map.background.length; i++) {
            for (var j = 0; j < this.Map.background[i].length; j++) {
                if (this.position.x < (j * this.Map.tileWidth) + this.Map.tileWidth &&
                    this.position.x + this.width > (j * this.Map.tileWidth) &&
                    this.position.y < (i * this.Map.tileHeight) + this.Map.tileHeight &&
                    this.position.y + this.height > (i * this.Map.tileHeight)) {
                    //edge block type
                    if (this.Map.background[i][j] == 2) {
                        //collision for block Type (four Direction)
                        var width = 0.5 * (this.width + this.Map.tileWidth);
                        var height = 0.5 * (this.height + this.Map.tileHeight);
                        var dx = (this.position.x + (this.width / 2)) - (j * this.Map.tileWidth + (this.Map.tileWidth / 2));
                        var dy = (this.position.y + (this.height / 2)) - (i * this.Map.tileHeight + 22 + (this.Map.tileHeight / 2));
                        if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
                            var wy = width * dy;
                            var hx = height * dx;
                            if (wy > hx) {
                                if (wy > -hx) {
                                    this.position.y = (i * this.Map.tileHeight + this.Map.tileHeight);
                                }
                                else {
                                    this.velocity.x = 0;
                                    this.position.x -= 3;
                                }
                            }
                            else {
                                if (wy > -hx) {
                                    this.velocity.x = 0;
                                    this.position.x += 3;
                                }
                                else {
                                    this.position.y = (i * this.Map.tileHeight - this.height + 22);
                                    this.onTheGround = true;
                                }
                            }
                        }
                    }
                    //block
                    if (this.Map.background[i][j] == 5) {
                        //collision for block Type (four Direction)
                        var width = 0.5 * (this.width + this.Map.tileWidth);
                        var height = 0.5 * (this.height + this.Map.tileHeight);
                        var dx = (this.position.x + (this.width / 2)) - (j * this.Map.tileWidth + (this.Map.tileWidth / 2));
                        var dy = (this.position.y + (this.height / 2)) - (i * this.Map.tileHeight + (this.Map.tileHeight / 2));
                        if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
                            var wy = width * dy;
                            var hx = height * dx;
                            if (wy > hx) {
                                if (wy > -hx) {
                                    this.position.y = (i * this.Map.tileHeight + this.Map.tileHeight);
                                }
                                else {
                                    this.velocity.x = 0;
                                    this.position.x -= 3;
                                }
                            }
                            else {
                                if (wy > -hx) {
                                    this.velocity.x = 0;
                                    this.position.x += 3;
                                }
                                else {
                                    this.position.y = (i * this.Map.tileHeight - this.height);
                                    this.onTheGround = true;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    reset() {
        this.animationState.current = this.animationState.idle;
        this.position = { x: 250, y: 360 };
        this.velocity = { x: 0, y: 0 };
        this.health = 100;
        this.bulletCount = 10;
        this.coinCollected = 0;
        this.previousHealth = 100;
        this.shootingState = false;
        this.strikeState = false;
    }
}
export { Player };