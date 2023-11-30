var grid = [];
var liveCells = new Set();

function main() {
    genGrid(3,3);
    //setInterval(switchGrid, 500);
}

// generates grid divs and populates grid array
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

// switches a cell's state to the alternative state
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

// randomizes each cell's state on the grid
function randomizeGrid() {
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

// updates grid to the next state
function updateFrame() {
    grid.forEach(cell => {
        let liveNeighbors = getNeighbors(cell);

        if(cell.className == "dead-cell" && liveNeighbors == 3) {
            toggleCellState(cell);
            liveCells.add(cell.id);
        } else if(cell.className == "live-cell") {
            // TODO: implement the following for live cells
            // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
            // Any live cell with two or three live neighbours lives on to the next generation.
            // Any live cell with more than three live neighbours dies, as if by overpopulation.
        }
    });
}

// helper function for getting the neighbors surrounding a cell
function getNeighbors(cell) {
    let split = cell.id.split(".");
    let x = parseInt(split[0]);
    let y = parseInt(split[1]);

    let neighbors = 0;

    // TODO: check all neighbors and add to counts

    return neighbors;
}