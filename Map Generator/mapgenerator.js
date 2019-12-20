class Map {
    constructor() {
        this.background = [];
        this.background.length = 9;
        this.background.fill(new Array(5, 0));
        this.enemy = [];
        this.enemy.length = 9;
        this.enemy.fill(new Array(0, 1));
        this.treasure = [];
        this.treasure.length = 9;
        this.treasure.fill(new Array(0, 1));
    }
    addColumn() {
        var i = this.background[0].length;
        this.background[4].length += 1;
        this.background[4].fill(8, i, i + 1);
        this.enemy[0].length += 1;
        this.enemy[0].fill(8, i, i + 1);
        this.treasure[0].length += 1;
        this.treasure[0].fill(8, i, i + 1);
    }
    getBackGround() {
        return this.background;
    }
    getEnemy() {
        return this.enemy;
    }
    getTreasure() {
        return this.treasure;
    }
}
var selectedTile = 0;
function refreshMapTable() {
    var that = this;
    var background = map.getBackGround();
    background[2][1] = 5;
    mapTable.innerHTML = '';
    for (var i = 0; i < background.length; i++) {
        var row = mapTable.insertRow(0);
        for (var j = 0; j < background[i].length; j++) {
            var cell = row.insertCell(j);
            var tile = background[i][j];
            var image = document.createElement('img');
            switch (tile) {
                case 0:
                    {

                        break;
                    }
                case 5:
                    {
                        image.src = './images/tile5.png';
                        break;
                    }
            }
            image.style.width = '30px';
            console.log('function>>', this);
            cell.appendChild(image);
            cell.onmouseover = function () { this.style.border = '1px solid brown' }.bind(cell)
            cell.onmouseout = function () { this.style.border = '0px solid black' }.bind(cell)
            cell.onclick = function () {
                var rowIndex = this.parentNode.rowIndex;
                var cellIndex = this.cellIndex;
                console.log(background[rowIndex][cellIndex]);
                // background[rowIndex][cellIndex]=5;
                background[2][1] = 5;
                console.log(background);
                refreshMapTable();
                //console.log(map);
            };
        }
    }
}

var map = new Map();
var mapTable = document.getElementById('map_table');


refreshMapTable();
function addNewColumn() {
    // background.length+=1;
    // background.fill('a');
    map.addColumn();
    refreshMapTable();
    console.log(map.getBackGround());
}
function tileSelect(tileno) {
    selectedTile = tileno;
}