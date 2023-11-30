var grid = [];
var liveCells = new Set();

function main() {
    genGrid(3,3);
    //setInterval(switchGrid, 500);
}

function genGrid(rows, cols) {

    let screenHeight = screen.height;
    let screenWidth = screen.width;

    for (var i = 0; i < Math.floor(screenHeight/35); i++) {
        var row = document.createElement("div");
        row.className = "grid-row";

        var gridRow = [];
        for (var j = 0; j < Math.floor(screenWidth/35); j++) {

            var cell = document.createElement("div");
            cell.className = "dead-cell";
            cell.id = i + "." + j;
            cell.onclick = function(cellElement) {
                toggleCellState(cellElement.currentTarget);
            }

            row.appendChild(cell);

            gridRow[j] = cell;
        }

        document.getElementById("grid-container").appendChild(row);
        grid[i] = gridRow;
    }
}

function switchGrid() {
    grid.forEach(row => {
        row.forEach(cell => {
            if(Math.floor(Math.random() * 2) == 1) {
                cell.className = "dead-cell";
            } else {
                cell.className = "live-cell";
            }
        })
    });
}

function toggleCellState(cell) {
    switch (cell.className) {
        case "dead-cell":
            cell.className = "live-cell";
            liveCells.add(cell.id);
            break;
        default:
            cell.className = "dead-cell";
            liveCells.delete(cell.id);
            break;
    }
    console.log(liveCells);
}