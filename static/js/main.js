// Gets the row and the cols of each cell on click
const table = document.querySelector('.main-table');
const rows = document.querySelectorAll('tr');
const rowsArray = Array.from(rows);
var rowIndex = 0
var columns = 0
var columnIndex = 0

table.addEventListener('click', (event) => {
  rowIndex = rowsArray.findIndex(row => row.contains(event.target));
  columns = Array.from(rowsArray[rowIndex].querySelectorAll('td'));
  columnIndex = columns.findIndex(column => column == event.target);
})

// Creates the starting grid and populates it will all 0's
grid = []
gridOutput = []
for(var i = 0; i < 75; i++){
	grid.push(new Array(125).fill(0))
	gridOutput.push(new Array(125).fill(0))
}

// sets the cells, mainly just for the starting screen
window.toggleTable = function (event) {
	if(event.target.tagName == "TD"){
		event.target.style.backgroundColor = "black";
		grid[rowIndex][columnIndex] = 1
		gridOutput[rowIndex][columnIndex] = 1
  }
}

// Resets the grid, sets all background colors to starting and resets grid to off
function resetGrid(){
	for(var i = 0, row; row = table.rows[i]; i++){
		for(var j = 0, col; col = row.cells[j]; j++){
			col.style.backgroundColor = "#c7c7c7";
			grid[i][j] = 0
			gridOutput[i][j] = 0
		}
	}	
}


// Rules for GOL
// ----------------
// when cell is alive (1)
// 	less than 2 neighbors -> dies
// 	more than 3 neightbors -> dies
// 	else -> lives
// when cell is dead (0)
// 	3 neighbors -> becomes alive


// main function loop to update, redraw, handle pause logic
function execute(){
	// store and render output
	for(var i = 0; i < 75; i++){
		for(var j = 0; j < 125; j++){
			gridOutput[i][j] = grid[i][j]
		}
	}

	// call to a function to render the grid onto the screen
	renderGrid()
	// update to the next grid, call the update grid function or just preform operation here
	updateGrid()
}

// renders the current grid state to the screen by changing the background colors appropriately
function renderGrid(){
	for(var i = 0, row; row = table.rows[i]; i++){
		for(var j = 0, col; col = row.cells[j]; j++){
			if(gridOutput[i][j]){
				col.style.backgroundColor = "black";
			} else {
				col.style.backgroundColor = "#c7c7c7";
			}
		}
	}	
}

// updates the grid to the next generation
function updateGrid(){
	for(var i = 1; i < 75; i++){
		for(var j = 1; j < 125; j++){
			var neighbors = gridOutput[i-1][j-1] + gridOutput[i][j-1] + gridOutput[i+1][j-1] +
					gridOutput[i-1][j]   + 			    gridOutput[i+1][j] + 
					gridOutput[i-1][j+1] + gridOutput[i][j+1] + gridOutput[i+1][j+1]

			// if cell alive, stays alive only if 2 or 3 neighbors
			// if cell dead, becomes alive if it has 3 neighbors
			if(gridOutput[i][j]){
				grid[i][j] = neighbors == 2 || neighbors == 3
			} else {
				grid[i][j] = neighbors == 3
			}
		}
	}
}


function pauseExecution(){

}





