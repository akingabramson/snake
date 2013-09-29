SnakeGame.Board = (function (){
	function Board(height, width, appleCount) {
		this.snake = new SnakeGame.Snake(height, width);
		this.height = height;
		this.width = width;
		this.setApple();
		this.cellGrabRegex = /cellid(.+)-(.+)/;
		this.$appleCountEl = $("#apple-count").html("0");
		this.appleCount = 0;
	}

	Board.prototype.setApple = function() {
		var applex = Math.floor(Math.random()*this.width);
		var appley = Math.floor(Math.random()*this.height);	

		this.applePos = {x: applex, y: appley};
	}

	Board.prototype.move = function() {
		if (this.appleAt(this.snake.head)) {
			this.setApple();
			this.appleCount++;
			this.$appleCountEl.html(this.appleCount.toString());
		} else {
			this.snake.body.shift();
		}

		this.snake.head = this.snake.move()
		this.snake.body.push(this.snake.head);
	}
	
	Board.prototype.appleAt = function(pos){
		if (this.applePos.x === pos.x && this.applePos.y === pos.y) {
			return true;
		} else {
			return false;
		}
	}

	Board.prototype.gameOver = function() {
		if (this.snake.head.x < 0 || this.snake.head.x >= this.width || this.snake.head.y < 0 || this.snake.head.y >= this.height) {
			return true
		}	else {
			// cycle through body and check for hit
			for (var i = 0; i < this.snake.body.length -1; i++) {
				var pos = this.snake.body[i]
				if (pos.x === this.snake.head.x && pos.y === this.snake.head.y) {
					return true
				} 
			}
		return false
		}
	}

	Board.prototype.update = function() {
		var appleSpot = this.applePos;

		for (var i = 0; i < this.gameDivs.length; i ++) {
			var cell = this.gameDivs[i];
			var idInfo = cell.attr("id");
			var rowCol = this.cellGrabRegex.exec(idInfo);
			var targetY = parseInt(rowCol[1]);
			var targetX = parseInt(rowCol[2]);

			if (this.snake.includesSpot(targetX, targetY)) {
				cell.css('background-color', 'green');
			} else if (appleSpot.y == targetY && appleSpot.x == targetX) {
				cell.css('background-color', 'red');
			} else {
				cell.css('background-color', 'black');
			}
		}
	}

	Board.prototype.makeBoard = function() {
		var boardDiv = $("<div>");
		boardDiv.attr('id', 'board');
		boardDiv.css('overflow', 'hidden');
		this.gameDivs = [];

		for (var i = 0; i < this.height; i++) {
			var rowDiv = $("<div>");
			rowDiv.addClass('row');
			rowDiv.attr("id", 'rowid'+ i);
			rowDiv.css('overflow', 'hidden');

			for (var j = 0; j < this.width; j++) {
				var cellDiv = $("<div>");
				cellDiv.addClass('cell');
				cellDiv.attr('id', "cellid"+ i + "-" + j);
				cellDiv.css({'width': '25px',
											'height': '25px',
											'background-color': 'black',
											'float': 'left'});
				this.gameDivs.push(cellDiv);
				rowDiv.append(cellDiv);
			}

			boardDiv.append(rowDiv);
		}
		$('#game').html(boardDiv);
	}

	return Board;
})();
