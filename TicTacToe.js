var turn	= 0,
	COL	= ROW = SIZE = 3,
	board	= document.getElementById('board');

// TODO:
// Check if board is full
// Round scores
// AI

$(document).ready(function() {
	Computer = new AI(board);
	$("td").click(cellClick);
	$("#reset").click(function() {
		$("td").text("").click(cellClick).removeClass("win").removeClass("new");
		$("tr").removeClass("win");
		$("#turn").text("O's Turn");
		turn = 0;
	});
});

var cellClick = function() {
	Computer.board = board = document.getElementById('board');
	if($(this).text() == "") {
		switch(turn % 2) {
			case 0:
				$(this).text("X").addClass("new");
				$("#turn").text("O");
				if(true) {
					var move = Computer.getMove(turn);
					$(board.rows[move.y].cells[move.x]).text("O").addClass("new");
					turn++;
				}
			break;
			case 1:
				$(this).text("O").addClass("new");
				$("#turn").text("X");
			break;
			default:
				$(this).text("?");
			break;
		}
		turn++;

		$("#turn").append("'s Turn");

		if((team = hasWon()) !== false) {
			$("#turn").text(team + " Won!");
			$("td").unbind("click");
		} else if(boardFull()) {
			$("#turn").text("Cat's Game");
			$("td").unbind("click");
		}
	}
}

var hasWon = function() {
	for(var y = 0; y < COL; y++) {
		if((team = checkRow(y)) !== false) {
			$($("tr")[y]).addClass("win");
			return team;
		}
	}
	for(var x = 0; x < ROW; x++) {
		if((team = checkCol(x)) !== false) {
			for(var i = 0; i < COL; i++) {
				$(board.rows[i].cells[x]).addClass("win");
			}
			return team;
		}
	}
	if((team = checkDiag()) !== false) {
		for(var i = 0; i < COL; i++) {
			$(board.rows[i].cells[i]).addClass("win");
		}
		return team;
	}
	if((team = checkNegDiag()) !== false) {
		for(var i = 0; i < COL; i++) {
			$(board.rows[ROW - i - 1].cells[i]).addClass("win");
		}
		return team;
	}

	return false;
}

function checkRow(row) {
	for(var x = 1; x < COL; x++) {
		if($(board.rows[row].cells[x]).text() != $(board.rows[row].cells[0]).text()
		|| $(board.rows[row].cells[0]).text() == "") {
			return false;
		}
	}
	return $(board.rows[row].cells[0]).text();
}

function checkCol(col) {
	for(var y = 1; y < ROW; y++) {
		if($(board.rows[y].cells[col]).text() != $(board.rows[0].cells[col]).text()
		|| $(board.rows[0].cells[col]).text() == "") {
			return false;
		}
	}
	return $(board.rows[0].cells[col]).text();
}

function checkDiag() {
	for(var i = 1; i < COL; i++) {
		if($(board.rows[i].cells[i]).text() != $(board.rows[0].cells[0]).text()
		|| $(board.rows[0].cells[0]).text() == "") {
			return false;
		}
	}
	return $(board.rows[0].cells[0]).text();
}

function checkNegDiag() {
	for(var i = 1; i < COL; i++) {
		if($(board.rows[ROW - i - 1].cells[i]).text() != $(board.rows[ROW - 1].cells[0]).text()
		|| $(board.rows[ROW - 1].cells[0]).text() == "") {
			return false;
		}
	}
	return $(board.rows[ROW - 1].cells[0]).text();
}

function boardFull() {

}
