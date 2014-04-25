function AI(board, size) {

    this.board = board;
    this.possibleMoves = new Array();
    this.cellRanks = new Array(size^2)
    this.size = size;

    this.generatePossibleMoves = function(board,size){
        for (var y = 0; y < this.size; y++) {
            this.possibleMoves.push(new Array());
            for (var x = 0; x < this.size; x++) {
                this.possibleMoves[y].push(0);
            }
        }
    }

    this.generatePossibleMoves();

    this.getMove = function(turn) {
        var move = this.getRandMove(board);
        if(turn == 1) {
            return move;
        } else {
            return this.rankCells();;
        }
    }

    this.printBoardMoves = function() {
        for (var y = 0; y < this.size; y++) {
            var row = "";
            for (var x = 0; x < this.size; x++) {
                row += this.possibleMoves[y][x] + " ";
            }
            console.log(row);
        }
    }


    this.rankCells = function() {
        // TODO: Modify to pick top 3 or so moves
        this.clearPossibleMoves();
        var bestMove = {x:-1, y:-1, value:-100};
        for (var y = 0; y < this.size; y++) {
            for (var x = 0; x < this.size; x++) {
                if($(this.board.rows[y].cells[x]).text() == "") {
                    this.cellRanks[x * size + y ] = {X: x, Y: y, rank: this.getCellRank()};
                    this.possibleMoves[y][x] = this.getCellRank(x, y);
                    if(this.possibleMoves[y][x] > bestMove.value) {
                        bestMove = {x: x, y: y, value: this.possibleMoves[y][x]};
                    }
                }
            }
        }
        return bestMove;
    }

    this.clearPossibleMoves = function() {
        for (var y = 0; y < this.size; y++) {
            for (var x = 0; x < this.size; x++) {
                this.possibleMoves[y][x] = 0;
            }
        }
    }


    this.getCellRank = function(x, y) {
        var colCount = {X: 0, O: 0, B: 0},
        rowCount = {X: 0, O: 0, B: 0},
        diagCount = {X: 0, O: 0, B: 0},
        negDiagCount = {X: 0, O: 0, B: 0},
        rank = 0;
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

        // block if opponent about to win
        //if(colCount.X == (this.size -1) || rowCount.X == (this.size -1) || diagCount.X == (this.size -1) || negDiagCount.X == (this.size -1))
            //rank += this.size * 10;

        // Win
        //if(colCount.O == (this.size -1) || rowCount.O == (this.size -1) || diagCount.O == (this.size -1) || negDiagCount.O == (this.size -1))
            //rank += this.size * 20;


        var cell = {
            X: rowCount.X + colCount.X + diagCount.X + negDiagCount.X,
            O: rowCount.O + colCount.O + diagCount.O + negDiagCount.O,
            B: rowCount.B + colCount.B + diagCount.B + negDiagCount.B
        };

        rank += cell.O ^ 3;
        rank += cell.X ^ 2;
        rank -= cell.B ^ 2;

        // TODO:
        // if both x & o in the col / row / diag make value 0

        return rank;

        var totalRank = 0;
        totalRank += rank;
    }




    this.calcTotalRank = function(rank,move){
        if(this.isOccupied(move) == false){
           totalRank += rank;
        }
    }

    this.isOnNegDiag = function(x, y) {
        for(var i = 0; i < this.size; i++) {
            if((y == ((this.size - 1) - i)) && (x == i)) {
                return true;
            }
        }
        return false;
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
