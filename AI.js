function AI(board) {

this.board = board;

this.AI = function() {

}

this.getMove = function(turn) {
	var move = this.getRandMove(board);
	if(turn == 0) {
		return move;
	} else {

	}
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
