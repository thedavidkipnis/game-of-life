var grid = [];

function main() {
    genGrid(3,3);
    setInterval(switchGrid, 500);
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

            cell.className = "grid-cell-filled";

            row.appendChild(cell);

            gridRow[j] = cell;
        }

        document.getElementById("grid-container").appendChild(row);
        grid[i] = gridRow;
    }
}

function switchGrid() {
    console.log("heyyy");
    grid.forEach(row => {
        row.forEach(cell => {
            if(Math.floor(Math.random() * 2) == 1) {
                cell.className = "grid-cell-unfilled";
            } else {
                cell.className = "grid-cell-filled";
            }
        })
    });
}