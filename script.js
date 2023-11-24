let grid = [];

function genGrid(rows, cols) {
    var body = document.body;

    for (var i = 0; i < rows; i++) {
        var row = document.createElement("div");
        row.className = "grid-container";

        let gridRow = [];
        for (var j = 0; j < cols; j++) {
            var cell = document.createElement("div");
            cell.className = "grid-container";
            row.appendChild(cell);

            gridRow[j] = cell;
        }
        body.appendChild(row);
        grid[i] = gridRow;
    }

    document.getElementById("code").innerText = body.innerHTML;
}