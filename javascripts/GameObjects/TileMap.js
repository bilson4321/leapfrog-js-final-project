import { Tile } from "./Tile.js";

class TileMap
{
    constructor()
    {
        this.map=[0,0,0,1,1,1,1,0,1,0,1,1,1,1,1];
        this.tileHeight=40;
        this.tileWidth=40;
        this.tile=new Tile();
    }
    update()
    {

    }
    draw(canvasContext)
    {
        for(var i=0;i<this.map.length;i++)
        {
            canvasContext.drawImage(this.tile.returnImage(this.map[i]),i*this.tileWidth,450,this.tileHeight,this.tileWidth);
        }
    }
}
export {TileMap};