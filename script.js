var grid = [];
var liveCells = new Set();

var runningIntervalID = null;

function main() {
    genGrid();
}

// generates grid divs and populates grid array
function genGrid() {

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
            // cell.style.animation = 'fade 0.1s 1';
            // cell.style.animationDelay = (0.02 * (j + i)).toString() + 's';
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
}

// randomizes each cell's state on the grid
function randomizeGrid() {
    grid.forEach(row => {
        row.forEach(cell => {
            if(Math.floor(Math.random() * 2) == 1) {
                toggleCellState(cell);
            }
        })
    });
}

function clearGrid() {
    liveCells.clear();
    clearInterval(runningIntervalID);
    runningIntervalID = null;
    document.getElementById("run-button").innerHTML = "RUN";
    grid.forEach(row=> {
        row.forEach(cell => {
            cell.className = "dead-cell";
        })
    })
}

// function that starts and stops the grid's refreshing
function runGrid() {
    if(runningIntervalID == null) {
        runningIntervalID = setInterval(updateFrame, 100);

        return;
    }
    clearInterval(runningIntervalID);
    runningIntervalID = null;
}

// updates grid to the next state
function updateFrame() {

    if(liveCells.size < 1) {
        clearInterval(runningIntervalID);
        runningIntervalID = null;

        // resetting run button text
        document.getElementById("run-button").innerHTML = "RUN";

        return;
    }

    // setting run button text
    document.getElementById("run-button").innerHTML = "STOP";

    let toChange = new Set();
    grid.forEach(row => {
        row.forEach(cell => {
            
            let liveNeighbors = getNeighbors(cell);

            if(cell.className == "dead-cell" && liveNeighbors == 3) {
                toChange.add(cell.id);
            } else if(cell.className == "live-cell" && (liveNeighbors < 2 || liveNeighbors > 3)) {
                toChange.add(cell.id);
            }

        });
    });

    toChange.forEach(id => {
        let split = id.split(".");
        let x = parseInt(split[0]);
        let y = parseInt(split[1]);
        toggleCellState(grid[x][y]);
    });
}

// helper function for getting the neighbors surrounding a cell
function getNeighbors(cell) {
    let spl = cell.id.split(".");
    let x = parseInt(spl[0]);
    let y = parseInt(spl[1]);

    let neighbors = 0;

    if(liveCells.has((x-1) + "." + (y-1))) {
        neighbors ++;
    }
    if(liveCells.has((x) + "." + (y-1))) {
        neighbors ++;
    }
    if(liveCells.has((x+1) + "." + (y-1))) {
        neighbors ++;
    }
    if(liveCells.has((x-1) + "." + (y))) {
        neighbors ++;
    }
    if(liveCells.has((x+1) + "." + (y))) {
        neighbors ++;
    }
    if(liveCells.has((x-1) + "." + (y+1))) {
        neighbors ++;
    }
    if(liveCells.has((x) + "." + (y+1))) {
        neighbors ++;
    }
    if(liveCells.has((x+1) + "." + (y+1))) {
        neighbors ++;
    }
    return neighbors;
}