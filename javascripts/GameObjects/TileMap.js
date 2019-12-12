import { Tile } from "./Tile.js";

class TileMap
{
    constructor()
    {
       // this.map=[1,0,0,1,1,1,1,0,1,1,0,0,1,1,1,0];
        this.map=[[2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                  [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                  [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                  [5,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                  [5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                  [5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                  [5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                  [5,5,2,0,0,0,0,0,0,0,0,0,0,0,0,0],
                  [5,5,5,2,2,2,2,2,2,2,2,2,2,2,2,2]];
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
                canvasContext.drawImage(this.tile.returnImage(this.map[i][j]),j*this.tileWidth,i*this.tileHeight,this.tileWidth,this.tileHeight);
            }
        }
        // for(var i=0;i<this.map.length;i++)
        // {  
        //     canvasContext.drawImage(this.tile.returnImage(this.map[i]),i*this.tileWidth,450,this.tileWidth,this.tileHeight);
        // }
    }
}
export {TileMap};