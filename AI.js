function AI(board, size) {

    this.board = board;
    this.possibleMoves = new Array();
    this.cellRanks = new Array(size^2)
    this.size = size;

    this.setSize = function(size) {
    	this.size = size;
    }

    this.generatePossibleMoves = function(){
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
            return this.rankCells();
        }
    }

    this.printBoardMoves = function() {
        var highestMove = [];
        for (var y = 0; y < this.size; y++) {
            var row = "";
            for (var x = 0; x < this.size; x++) {
                row += this.possibleMoves[y][x] + " ";
                highestMove.push(this.possibleMoves[y][x]);
                console.log(this.possibleMoves[y][x]);
            }
            console.log(row);
        }
        var topMoves = [];
        for(var i = 0; i < 5; i++) {
            var greatestMove = Math.max.apply(Math, highestMove);
            topMoves.push(greatestMove);
            console.log(highestMove.length);
            console.log(greatestMove);
            var index = highestMove.indexOf(greatestMove);
            console.log(index);
            highestMove.splice(index, 1);
            console.log(highestMove.length);
            //console.log(highestMove.length);
        }
        console.log(topMoves);
    }


    this.rankCells = function() {
        // TODO: Modify to pick top 3 or so moves
        this.clearPossibleMoves();
        var bestMove = {x:-1, y:-1, value:-100};
        var moveData = [];
        var rankValue = [];
        for (var y = 0; y < this.size; y++) {
            for (var x = 0; x < this.size; x++) {
                if($(this.board.rows[y].cells[x]).text() == "") {
                    this.cellRanks[x * size + y ] = {X: x, Y: y, rank: this.getCellRank(x,y)};
                    this.possibleMoves[y][x] = this.getCellRank(x, y);
                    bestMove = {x: x, y: y, value: this.possibleMoves[y][x]};
                    moveData.push(bestMove);
                    rankValue.push(bestMove.value);
                }
            }
        }
        rankValue.sort(function(a, b){return b-a}); //sort descending
        var topValues = [];
        var maxRange = moveData.length < 5 ? moveData.length : 5;
        for(var i = 0; i < maxRange; i++){
            topValues.push(rankValue[i]);
        }
        var weightedValues = [];
        var totalRankValues = 0;
        for(var k = 0; k < topValues.length; k++){
            totalRankValues += topValues[k];
        }
        console.log(topValues);
        for(var n = 0; n < topValues.length; n++){
            var weightedValue = topValues[n] / totalRankValues * 100;
            if(n > 0){
                weightedValue += weightedValues[n - 1];
            }
            weightedValues.push(weightedValue);
        }
        console.log(weightedValues);
        var range = Math.floor(Math.random() * 100);
        console.log(range);
        var bestMoveValue = 0;
        for(var z = weightedValues.length - 1; z >= 0; z--){
            if(weightedValues[z] <= range){
                bestMoveValue = topValues[z + 1];
                break;
            } else if(z == 0){
                bestMoveValue = topValues[z];
            }
        }


        console.log(bestMoveValue);
        for(var j = 0; j < moveData.length; j++) {
            if (moveData[j].value == bestMoveValue) {
                console.log(moveData[j]);
                return moveData[j];
            }
        }
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
        //TODO: Expand for 7 instances
        // block if opponent about to win
        if(colCount.X == (this.size -1) || rowCount.X == (this.size -1) || diagCount.X == (this.size -1) || negDiagCount.X == (this.size -1))
            rank += this.size * 15;

        //block if opponent has 2 moves left to win
        if(colCount.X == (this.size -2) || rowCount.X == (this.size -2) || diagCount.X == (this.size -2) || negDiagCount.X == (this.size -2))
            rank += this.size * 10;

        //block if 3 moves left
        if(colCount.X == (this.size -3) || rowCount.X == (this.size -3) || diagCount.X == (this.size -3) || negDiagCount.X == (this.size -3))
            rank += this.size * 7;
        //block if 4 moves left
        if(colCount.X == (this.size -4) || rowCount.X == (this.size -4) || diagCount.X == (this.size -4) || negDiagCount.X == (this.size -4))
            rank += this.size * 5;
        // Win
        if(colCount.O == (this.size -1) || rowCount.O == (this.size -1) || diagCount.O == (this.size -1) || negDiagCount.O == (this.size -1))
            rank += this.size * 20;



        //TODO:



        /*var cell = {
            X: colCount.X + rowCount.X + diagCount.X + negDiagCount.X,
            O: colCount.O + rowCount.O + diagCount.O + negDiagCount.O,
            B: colCount.B + rowCount.B + diagCount.B + negDiagCount.B
        };

        rank += (cell.O ^ 3);
        rank += (cell.X ^ 2);
        rank -= (cell.B ^ 2);*/


        // TODO:
        // if both x & o in the col / row / diag make value 0

        return rank;


    };




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
