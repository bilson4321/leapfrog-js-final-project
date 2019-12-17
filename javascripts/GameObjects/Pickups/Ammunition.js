class Ammunition
{
    constructor(player)
    {
        this.image=new Image();
        this.image.src='./images/ammunition.png';
        this.position={x:0,y:0};
        this.player=player;
        this.width=70;
        this.height=40;
        this.status='collectable';
    }
    update()
    {
        if(this.status=='collectable')
        this.handleCollision();
    }
    draw(canvasContext)
    {
        if(this.status=='collectable')
        canvasContext.drawImage(this.image,this.position.x,this.position.y,this.width,this.height);
    }
    handleCollision()
    {
        if (this.position.x < this.player.position.x + this.player.width &&
            this.position.x + this.width > this.player.position.x &&
            this.position.y < this.player.position.y+this.player.height &&
            this.position.y + this.height > this.player.position.y)
            {
                this.status='collected';
            } 
    }
}
export {Ammunition};