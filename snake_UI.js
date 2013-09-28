$(function() {
	window.levelSlider = $("#slider").slider({ min: 1, max: 10, value: 5});
	SnakeGame.startgame();

});


SnakeGame.startgame = (function(){
	function startgame() {

		function runLoop() {
			board.snake.directionChangedThisTurn = false;
			board.move();
			board.update();
			if (board.gameOver()) {
				console.log("GAME OVER");
				$('body').css('background-color', 'red');
				clearInterval(run);
			}
		}

		var board = new SnakeGame.Board(20, 20);
		console.log(board)
		board.makeBoard();
		board.update();

		$('html').keydown(function handleEvent(event) {
		  board.snake.checkTurn(event.keyCode);
		});

		// kick off run loop in 250millis
		var time = 200;
		var level = window.levelSlider.slider("value");
		console.log(level)
		var run = window.setInterval(runLoop, time);	
	}

	return startgame
})();


