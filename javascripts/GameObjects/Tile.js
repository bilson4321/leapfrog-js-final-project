class Tile
{
    constructor()
    {
        this.tile0=new Image();
        this.tile2=new Image();
        this.tile2.src='./images/tile2.png';
        this.tile5=new Image();
        this.tile5.src='./images/tile5.png';
    }
    returnImage(index)
    {
        switch(index)
        {
            case 0:
                {
                    return this.tile0;
                }
            case 2:
                {
                    return this.tile2;
                }
            case 5:
                {
                    return this.tile5;
                }
        }
    }
}
export {Tile};