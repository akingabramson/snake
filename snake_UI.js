$(function() {

	var game = new SnakeGame.Board(20, 20);
	console.log(game.snake);
	makeBoard(game);
	updateBoard(game);

	$('html').keydown(function (event) {
	  game.snake.turn(event.keyCode);
	});

	function runLoop() {
		game.move();
		updateBoard(game);
		if (game.gameOver()) {
			console.log("GAME OVER");
			clearInterval(run);
		}
	}

	// kick off run loop in 250millis
	var time = 100;
	var run = window.setInterval(runLoop, time);


//event handler

});

function updateBoard(game) {
	var appleSpot = game.applePos;
	var snakeSpots = game.snake.body;

	for (var i = 0; i < game.height; i++) {
		for (var j = 0; j < game.width; j++) {
		var cell = $("#cellid"+ i + "-" + j);

			if (includePos(snakeSpots, j, i)) {
				cell.css('background-color', 'green');
			} else if (appleSpot.y == i && appleSpot.x == j) {
				cell.css('background-color', 'red');
			} else {
				cell.css('background-color', 'black');
			}
		}
	}
}

function includePos(array, targetX, targetY) {
	for (var i = 0; i < array.length; i++) {
		if (array[i].x === targetX && array[i].y === targetY) {
			return true;
		}
	}

	return false;
}

function makeBoard(game) {
	var boardDiv = $("<div>");
	boardDiv.attr('id', 'board');
	boardDiv.css('overflow', 'hidden');

	for (var i = 0; i < game.height; i++) {
		var rowDiv = $("<div>");
		rowDiv.addClass('row');
		rowDiv.attr("id", 'rowid'+ i);
		rowDiv.css('overflow', 'hidden');

		for (var j = 0; j < game.width; j++) {
			var cellDiv = $("<div>");
			cellDiv.addClass('cell');
			cellDiv.attr('id', "cellid"+ i + "-" + j);
			cellDiv.css({'width': '25px',
										'height': '25px',
										'background-color': 'black',
										'float': 'left'})
			rowDiv.append(cellDiv);
		}

		boardDiv.append(rowDiv);
	}

	$('body').append(boardDiv);
}
