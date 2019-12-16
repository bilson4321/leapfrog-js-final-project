class Map
{
    constructor()
    {
        this.background=[];
        this.background.length=9;
        this.background.fill(new Array(0,1));
        this.enemy=[];
        this.enemy.length=9;
        this.enemy.fill(new Array(0,1));
        this.treasure=[];
        this.treasure.length=9;
        this.treasure.fill(new Array(0,1));
    }
    addColumn()
    {
        var i=this.background[0].length;
        this.background[4].length+=1;
        this.background[4].fill(8,i,i+1);
        this.enemy[0].length+=1;
        this.enemy[0].fill(8,i,i+1);
        this.treasure[0].length+=1;
        this.treasure[0].fill(8,i,i+1);
    }
    getBackGround()
    {
        return this.background;
    }
    getEnemy()
    {
        return this.enemy;
    }
    getTreasure()
    {
        return this.treasure;
    }
}

var map=new Map();
var mapTable=document.getElementById('map_table');
console.log(map.getBackGround());

var image=document.createElement('img');
image.src='./images/tile2.png';
image.style.width='30px';
refreshMapTable();
function addNewColumn()
{
    // background.length+=1;
    // background.fill('a');
    map.addColumn();
    refreshMapTable();
    console.log(map.getBackGround());
}
function refreshMapTable()
{
    var background=map.getBackGround();
    mapTable.innerHTML='';
    for(var i=0;i<background.length;i++)
    {
        var row = mapTable.insertRow(0);
        for(var j=0;j<background[i].length;j++)
        {
            var cell = row.insertCell(j);
            cell.innerHTML='h';
            cell.appendChild(image);
            cell.onmouseover=function(){this.style.border='4px solid black'}.bind(cell)
            cell.onmouseout=function(){this.style.border='1px solid black'}.bind(cell)
        }
    }
}