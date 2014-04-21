<!DOCTYPE html>
<html>
<head>
	<title>Tic Tac Toe 5x5</title>
	<style type="text/css">
		body {
			width: 600px;
			margin: 0 auto;
			background-color: #333;
			color: #ebe2ca;
			font-family: sans-serif;
		}
		table {
			border-collapse: collapse;
			margin: 0 auto;
		}
		td {
			width: 110px;
			height: 110px;
			border: 3px solid #ebe2ca;
			text-align: center;
			font-size: 0pt;
			transition: font-size 0.3s ease-in-out, background 1s ease-in-out;
		}
		tr {transition: background 1s ease-in-out;}
		td.new { font-size: 60pt; }
		.win { background-color: #2A2; }
		.occupied { background-color: #A22;}
		h1 { text-align: center; }
		button {
			margin: 10px;
			padding: 5px 10px;
			font-size: 24pt;
		}
	</style>
	<script src="jquery-2.1.0.min.js"></script>
	<script src="AI.js"></script>
	<script src="TicTacToe.js"></script>
</head>
<body>
	<h1 id="turn">X's Turn</h2>
	<table id="board">
	</table>
	<button id="reset">Reset</button>
</body>
</html>
