$(function() {
	var levelSlider = $( "#slider" )
	levelSlider.slider({ min: 1, max: 10, value: 5});

	function startgame() {
		var game = new SnakeGame.Board(20, 20);
		SnakeGame.makeBoard(game);
		SnakeGame.updateBoard(game);

		$('html').keydown(function handleEvent(event) {
		  game.snake.turn(event.keyCode);
		});

		function runLoop() {
			game.move();
			SnakeGame.updateBoard(game);
			if (game.gameOver()) {
				console.log("GAME OVER");
				$('body').css('background-color', 'red');
				clearInterval(run);
			}
		}
		// kick off run loop in 250millis
		var time = 200;
		var level = levelSlider.slider("value")
		console.log(level)
		var run = window.setInterval(runLoop, time/level);	
	}
	
	startgame();

});

SnakeGame.updateBoard = (function() {
	function updateBoard(game) {
		var appleSpot = game.applePos;
		var snakeSpots = game.snake.body;

		for (var i = 0; i < game.height; i++) {
			for (var j = 0; j < game.width; j++) {
			var cell = $("#cellid"+ i + "-" + j);

				if (SnakeGame.includePos(snakeSpots, j, i)) {
					cell.css('background-color', 'green');
				} else if (appleSpot.y == i && appleSpot.x == j) {
					cell.css('background-color', 'red');
				} else {
					cell.css('background-color', 'black');
				}
			}
		}
	}
	
	return updateBoard;
})();


SnakeGame.includePos = (function() {
	function includePos(array, targetX, targetY) {
		for (var i = 0; i < array.length; i++) {
			if (array[i].x === targetX && array[i].y === targetY) {
				return true;
			}
		}

		return false;
	}
	return includePos;
})();

SnakeGame.makeBoard = (function() {
	function makeBoard(game) {
		var boardDiv = $("<div>");
		boardDiv.attr('id', 'board');
		boardDiv.css('overflow', 'hidden');

		this.gameDivs = [];

		for (var i = 0; i < game.height; i++) {
			var rowDiv = $("<div>");
			rowDiv.addClass('row');
			rowDiv.attr("id", 'rowid'+ i);
			rowDiv.css('overflow', 'hidden');
			this.boardDivs

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

		$('#game').append(boardDiv);
	}
	return makeBoard;
}
)();


