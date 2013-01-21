// ADJACENCIES lists the board positions adjacent to each board position.
var ADJACENCIES = [];

// util functions

var board_row = function (cellIndex,boardSize) {
    return Math.floor(cellIndex / boardSize);
}

var board_column = function (cellIndex,boardSize) {
    return cellIndex % boardSize;
}

var adj = function (row,column) {
    return [    [row-1,column-1],[row-1,column],[row-1,column+1],
        [row,column-1],                 [row,column+1],
        [row+1,column-1],[row+1,column],[row+1,column+1]
    ]
}

var remove_outsides = function (arrayOfPositions,size) {
    var adjs = [];
    var i;
    for (i = 0; i < arrayOfPositions.length; i += 1) {
        var pos = arrayOfPositions[i];
        if ( pos[0] < 0 || pos[0] > size - 1 || pos[1] < 0 || pos[1] > size -1) {
            // outside
        } else {
            adjs.push(pos)
        }
    }
    return adjs;
}

var to_cell_indexes = function (arrayOfPositions,size) {
    var cellIndexes = [];
    var i = 0;
    for (i = 0; i < arrayOfPositions.length; i += 1) {
        var pos = arrayOfPositions[i];
        cellIndexes.push(pos[0] * size + pos[1])
    }
    return cellIndexes;
}

// calculate adjacencies

var i;
for (i = 0; i < SIZE * SIZE; i += 1) {
    var row = board_row(i,SIZE);
    var column = board_column(i,SIZE);
    ADJACENCIES[i] = to_cell_indexes(remove_outsides(adj(row,column),SIZE),SIZE)
}
