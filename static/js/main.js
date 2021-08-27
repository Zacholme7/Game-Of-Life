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
for(var i = 0; i < 75; i++){
	grid.push(new Array(125).fill(0))
}

// sets the cells, mainly just for the starting screen
window.toggleTable = function (event) {
	if(event.target.tagName == "TD"){
		event.target.style.backgroundColor = "black";
		grid[rowIndex][columnIndex] = 1
  }
}



function execute(){
	/*
	 *while it is running, ex while not paused/stop
	 update the grid
	 render that grid
	 continue the process
	 */
	
}

function updateGrid(grid){

}




