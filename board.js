SnakeGame.board = (function (){
	function Board(height, width) {
		this.snake = new Snake(height, width);
		this.height = height;
		this.width = width;
		this.setApple();
	}

	Board.prototype.setApple = function() {
		var applex = Math.floor(Math.random()*this.width);
		var appley = Math.floor(Math.random()*this.height);	

		this.applePos = {x: applex, y: appley};
	}

	Board.prototype.move = function() {
		if (this.appleAt(this.snake.head)) {
			this.setApple();

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

	return Board;
})();
