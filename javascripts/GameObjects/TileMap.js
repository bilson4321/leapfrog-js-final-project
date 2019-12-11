import { Tile } from "./Tile.js";

class TileMap
{
    constructor()
    {
       // this.map=[1,0,0,1,1,1,1,0,1,1,0,0,1,1,1,0];
        this.map=[[1,0,0,0,0,1,1,0,1,1,0,0,1,1,1,0],
                  [1,1,0,0,1,1,1,0,1,1,0,0,1,1,1,0]];
        this.tileHeight=80;
        this.tileWidth=80;
        this.tile=new Tile();
    }
    update()
    {

    }
    draw(canvasContext)
    {
        for(var i=0;i<this.map.length;i++)
        {
            for(var j=0;j<this.map[i].length;j++)
            {   
                canvasContext.drawImage(this.tile.returnImage(this.map[i][j]),j*this.tileWidth,450+i*this.tileHeight,this.tileWidth,this.tileHeight);
            }
        }
        // for(var i=0;i<this.map.length;i++)
        // {  
        //     canvasContext.drawImage(this.tile.returnImage(this.map[i]),i*this.tileWidth,450,this.tileWidth,this.tileHeight);
        // }
    }
}
export {TileMap};