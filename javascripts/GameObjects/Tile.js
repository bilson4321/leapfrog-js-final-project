class Tile
{
    constructor()
    {
        this.tile1=new Image();
        this.tile1.src='./images/air.png';
        this.tile2=new Image();
        this.tile2.src='./images/box.png';
    }
    returnImage(index)
    {
        switch(index)
        {
            case 0:
                {
                    return this.tile1;
                }
            case 1:
                {
                    return this.tile2;
                }
        }
    }
}
export {Tile};