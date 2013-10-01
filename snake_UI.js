$(function() {
	window.levelSlider = $("#slider");

	window.levelSlider.slider({ 
		min: 1, 
		max: 9, 
		value: 5,
		slide: function(event, ui) {
			var $value = makeValueDiv();
			$value.html(ui.value);
			$(this).find(".ui-slider-handle").html($value);
		}
	});

	$value = makeValueDiv();
	$value.html("5");
	window.levelSlider.find(".ui-slider-handle").html($value);

	var currentBoard = new SnakeGame.Board(20, 20);
	currentBoard.makeBoard();
	currentBoard.update();

	$("html").keyup(function(e){
		if (e.keyCode == '13') {
			$('#info-container').css('background-color', 'green');
			clearInterval(window.run);
			currentBoard = new SnakeGame.Board(20, 20);
			currentBoard.makeBoard();
			SnakeGame.startgame(currentBoard)	
		};
	});
});


SnakeGame.startgame = (function(){
	function startgame(board) {
		function runLoop() {
			board.snake.initialDirection = board.snake.direction;
			board.move();
			board.update();
			if (board.gameOver()) {
				console.log("GAME OVER");
				$('#info-container').css('background-color', 'red');
				var scoreSpan = $("#high-score");
				var score = parseInt(scoreSpan.html())

				if (board.appleCount > score) {
					scoreSpan.html(board.appleCount.toString());
				};
				$('html').off("keydown");
				clearInterval(window.run);
			}
		}

		$('html').keydown(function handleEvent(event) {
		  board.snake.checkTurn(event.keyCode);
		});

		// kick off run loop in 250millis
		var time = 200;
		var level = window.levelSlider.slider("value");
		window.run = window.setInterval(runLoop, 30 + time/level);	
	}

	return startgame
})();

function makeValueDiv(){
	var $value = $("<span>");
	$value.addClass("levelVal")
	return $value
}