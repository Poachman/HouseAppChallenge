var turn	= 0,
	SIZE	= 5,
	AIEnabled = true,
	Computer = {},
	board	= document.getElementById('board'),
	wins = {X:0 , O:0}

$(document).ready(function() {
	generateBoard();
	Computer = new AI(board, SIZE);
	$("td").click(cellClick);
	$("#reset").click(newGame);
	$("label").click(AIButtonHandler);
	$("#sizeSelect").change(sizeChange);
});

var newGame = function(needsConfirm) {
	$("td").text("").click(cellClick)
		.removeClass("win")
		.removeClass("new")
		.removeClass("occupied");
	$("tr").removeClass("win");
	$("#turn").text("X's Turn");
	turn = 0;
}

var sizeChange = function() {
	SIZE = this.value.substr(0,1);
	$("#board").text("");
	generateBoard();
	Computer.setSize(SIZE)
	Computer.generatePossibleMoves();
	newGame(true);
}

var AIButtonHandler = function() {
	console.log("asdf");
	$("label").removeClass("btn");
	$(this).addClass("btn");
	if($(this).prev().attr("id") == "Disabled") {
		AIEnabled = false;
	} else if ($(this).prev().attr("id") == "Enabled") {
		AIEnabled = true;
	}
}

var generateBoard = function() {
	for(var i = 0; i < SIZE; i++) {
		var row = "<tr>";
		for(var j = 0; j < SIZE; j++) {
			row += "<td></td>";
		}
		row += "</tr>";
		$("#board").append(row);
	}
}

var doAIMove = function() {
	if(!boardFull()) {
		var move = Computer.getMove(turn);
		$(board.rows[move.y].cells[move.x]).text("O").addClass("new");
		turn++;
		$("#turn").text("X's turn");
	}
	checkWinLoss();
}

var cellClick = function() {
	Computer.board = board = document.getElementById('board');
	if($(this).text() == "") {
		switch(turn % 2) {
			case 0:
				$(this).text("X").addClass("new");
				$("#turn").text("O");
				if(AIEnabled && !hasWon()) {
					window.setTimeout(doAIMove, 300);
				}
				turn++;
			break;
			case 1:
				if(!AIEnabled) {
					$(this).text("O").addClass("new");
					$("#turn").text("X");
					turn++;
				}
				$("#turn").text("X");
			break;
			default:
				$(this).text("?");
			break;
		}

		$("#turn").append("'s Turn");

		checkWinLoss();
	} else {
		var td = $(this);
		td.addClass("occupied");
		window.setTimeout(function() {
			td.removeClass("occupied");
		}, 250);
	}
}

var checkWinLoss = function() {
	if((team = hasWon()) !== false) {
		$("#turn").text(team + " Won!");
		$("td").unbind("click");
		if(team == "X") {
			wins.X++;
		} else {
			wins.O++;
		}
		$("#wins").text("X: " + wins.X + " / O: " + wins.O);
	} else if(boardFull()) {
		$("#turn").text("Cat's Game");
		$("td").unbind("click").addClass("occupied");
	}
}

var hasWon = function() {
	var winningTeam = false;
	for(var y = 0; y < SIZE; y++) {
		if((team = checkRow(y)) !== false) {
			$($("tr")[y]).addClass("win");
			winningTeam = team;
		}
	}
	for(var x = 0; x < SIZE; x++) {
		if((team = checkCol(x)) !== false) {
			for(var i = 0; i < SIZE; i++) {
				$(board.rows[i].cells[x]).addClass("win");
			winningTeam = team;
			}
		}
	}
	if((team = checkDiag()) !== false) {
		for(var i = 0; i < SIZE; i++) {
			$(board.rows[i].cells[i]).addClass("win");
			winningTeam = team;
		}
	}
	if((team = checkNegDiag()) !== false) {
		for(var i = 0; i < SIZE; i++) {
			$(board.rows[SIZE - i - 1].cells[i]).addClass("win");
			winningTeam = team;
		}
	}

	return winningTeam;
}

function checkRow(row) {
	for(var x = 1; x < SIZE; x++) {
		if($(board.rows[row].cells[x]).text() != $(board.rows[row].cells[0]).text()
		|| $(board.rows[row].cells[0]).text() == "") {
			return false;
		}
	}
	return $(board.rows[row].cells[0]).text();
}

function checkCol(col) {
	for(var y = 1; y < SIZE; y++) {
		if($(board.rows[y].cells[col]).text() != $(board.rows[0].cells[col]).text()
		|| $(board.rows[0].cells[col]).text() == "") {
			return false;
		}
	}
	return $(board.rows[0].cells[col]).text();
}

function checkDiag() {
	for(var i = 1; i < SIZE; i++) {
		if($(board.rows[i].cells[i]).text() != $(board.rows[0].cells[0]).text()
		|| $(board.rows[0].cells[0]).text() == "") {
			return false;
		}
	}
	return $(board.rows[0].cells[0]).text();
}

function checkNegDiag() {
	for(var i = 1; i < SIZE; i++) {
		if($(board.rows[SIZE - i - 1].cells[i]).text() != $(board.rows[SIZE - 1].cells[0]).text()
		|| $(board.rows[SIZE - 1].cells[0]).text() == "") {
			return false;
		}
	}
	return $(board.rows[SIZE - 1].cells[0]).text();
}

function boardFull() {
	if($("td:empty").length == 0) {
		return true;
	}
	return false;
}

function boardEmpty() {
	if($("td:empty").length == SIZE * SIZE) {
		return true;
	}
	return false;
}

function catsGame() {
	for(var x = 0; x < SIZE; x++) {
		for(var y = 0; y < SIZE; y++) {

		}
	}
}

function getCount(x, y) {
	var colCount = {X: 0, O: 0, B: 0},
	rowCount = {X: 0, O: 0, B: 0},
	diagCount = {X: 0, O: 0, B: 0},
	negDiagCount = {X: 0, O: 0, B: 0};
	for(var i = 0; i < this.size; i++) {
		if(i != x) {
			if($(this.board.rows[y].cells[i]).text() == "O") { // if own move
				rowCount.O++;
			} else if($(this.board.rows[y].cells[i]).text() == "") {
				rowCount.B++;
			} else {
				rowCount.X++;
			}
		}
		if(i != y) {
			if($(this.board.rows[i].cells[x]).text() == "O") { // if own move
				colCount.O++;
			} else if($(this.board.rows[i].cells[x]).text() == "") { // if empty
				colCount.B++;
			} else {
				colCount.X++;
			}
		}
		if(y == x && i != x) { // Diag
			if($(this.board.rows[i].cells[i]).text() == "O") { // if own move
				diagCount.O++;
			} else if($(this.board.rows[i].cells[i]).text() == "") { // if empty
				diagCount.B++;
			} else {
				diagCount.X++;
			}
		}
		if(this.isOnNegDiag(x, y)) {  // Neg Diag
			if($(this.board.rows[i].cells[(this.size - 1) - i]).text() == "O") { // if own move
				negDiagCount.O++;
			} else if($(this.board.rows[i].cells[(this.size - 1) - i]).text() == "") { // if empty
				negDiagCount.B++;
			} else {
				negDiagCount.X++;
			}
		}
	}
	return {col: colCount, row: rowCount, diag: diagCount, negDiag: negDiagCount};
}
