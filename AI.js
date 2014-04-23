function AI(board) {

this.board = board;

this.getMove = function(turn) {
	var move = this.getRandMove(board);
	if(turn == 1) {
		return move;
	} else {
		return move;
	}
}

this.rankCells = function() {
	var possibleMoves = [
		[0,0,0],
		[0,0,0],
		[0,0,0]
	];
}

this.searchRow = function(row) {

}

this.getRandMove = function() {
	do {
		move = {x: Math.floor(Math.random() * 200) % SIZE, y: Math.floor(Math.random() * 200) % SIZE}
	} while(this.isOccupied(move));
	return move;
}

this.isOccupied = function(move) {
	if($(this.board.rows[move.y].cells[move.x]).text() == "") {
		return false;
	}
	return true;
}

}
