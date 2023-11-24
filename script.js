//let grid = [];

function genGrid(rows, cols) {

    let screenHeight = screen.height;
    let screenWidth = screen.width;

    for (var i = 0; i < Math.floor(screenHeight/100); i++) {
        var row = document.createElement("div");
        row.className = "grid-row";

        //let gridRow = [];
        for (var j = 0; j < Math.floor(screenWidth/100); j++) {
            var cell = document.createElement("div");
            cell.className = "grid-cell";
            row.appendChild(cell);

            //gridRow[j] = cell;
        }

        document.getElementById("grid-container").appendChild(row);
        //grid[i] = gridRow;
    }

    // var row = document.createElement("div");
    // row.className = "grid-container";
    // row.innerHTML = "ADDED";
    // document.getElementById("grid-container").appendChild(row);
}