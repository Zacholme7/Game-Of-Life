// GAME OF LIFE
// ------------------------------------------------------

// creates default starting grids
grid = []
gridOutput = []
conditioner = true
for(var i = 0; i < 75; i++){
	grid.push(new Array(125).fill(0))
	gridOutput.push(new Array(125).fill(0))
}

// sleep function to slow down execution
function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
}

// Gets the row and the cols of each cell on click
const table = document.querySelector('.main-table');
const rows = document.querySelectorAll('tr');
const rowsArray = Array.from(rows);
table.addEventListener('click', (event) => {
	var rowIndex = 0;
	var columns = 0;
	var columnIndex = 0;
	rowIndex = rowsArray.findIndex(row => row.contains(event.target));
	columns = Array.from(rowsArray[rowIndex].querySelectorAll('td'));
	columnIndex = columns.findIndex(column => column == event.target);

	if(grid[rowIndex][columnIndex] == 0){
		grid[rowIndex][columnIndex] = 1
		gridOutput[rowIndex][columnIndex] = 1
		event.target.style.backgroundColor = "black"
	} else {
		grid[rowIndex][columnIndex] = 0
		gridOutput[rowIndex][columnIndex] = 0
		event.target.style.backgroundColor = "#c7c7c7"
	}

})

// Resets the grid, sets all background colors to starting and resets grid to off
function resetGrid(){
	conditioner = false
	for(var i = 0, row; row = table.rows[i]; i++){
		for(var j = 0, col; col = row.cells[j]; j++){
			col.style.backgroundColor = "#c7c7c7";
			grid[i][j] = 0
			gridOutput[i][j] = 0
		}
	}	
}

// main function loop to update, redraw, handle pause logic
async function execute(){
	conditioner = true
	while (conditioner){
		// update to the next grid, call the update grid function or just preform operation here
		updateGrid()

		// store and render output
		for(var i = 0; i < 75; i++){
			for(var j = 0; j < 125; j++){
				gridOutput[i][j] = grid[i][j]
			}
		}

		// call to a function to render the grid onto the screen
		renderGrid()
		await sleep(100)

	}
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
	for(var i = 0; i < 75; i++){
		for(var j = 0; j < 125; j++){
			var neighbors = gridOutput[mod(i-1, 75)][mod(j-1, 125)] + gridOutput[i][mod(j-1, 125)] + gridOutput[mod(i+1, 75)][mod(j-1, 125)] +
					gridOutput[mod(i-1, 75)][j]   + 			    	         gridOutput[mod(i+1, 75)][j] + 
					gridOutput[mod(i-1, 75)][mod(j+1, 125)] + gridOutput[i][mod(j+1, 125)] + gridOutput[mod(i+1, 75)][mod(j+1, 125)]

			if(gridOutput[i][j]){
				grid[i][j] = neighbors == 2 || neighbors == 3
			} else {
				grid[i][j] = neighbors == 3
			}
		}
	}
}

// sets the pause conditioner to stop execution
function pauseExecution(){
	conditioner = false
}

// fills the grid with randomly generated values
function generateRandom(){
	resetGrid()
	for(var i = 0; i < 75; i++){
		for(var j = 0; j < 125; j++){
			var rand = Math.round(Math.random())
			grid[i][j] = rand;
			gridOutput[i][j] = rand;
		}
	}
	renderGrid()
}

// mod function so it acts like the python modulo rather than a remainder
function mod(a, b){
	return ((a % b) + b) % b
}
