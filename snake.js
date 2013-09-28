var SnakeGame = (function (){

	// function Board(height, width) {
	// 	this.snake = new Snake(height, width);
	// 	this.height = height;
	// 	this.width = width;
	// 	this.setApple();
	// }

	// Board.prototype.setApple = function() {
	// 	var applex = Math.floor(Math.random()*this.width);
	// 	var appley = Math.floor(Math.random()*this.height);	

	// 	this.applePos = {x: applex, y: appley};
	// }

	// Board.prototype.move = function() {
	// 	if (this.appleAt(this.snake.head)) {
	// 		this.setApple();
	// 	} else {
	// 		this.snake.body.shift();
	// 	}

	// 	this.snake.head = this.snake.move()
	// 	this.snake.body.push(this.snake.head);
	// }
	
	// Board.prototype.appleAt = function(pos){
	// 	if (this.applePos.x === pos.x && this.applePos.y === pos.y) {
	// 		return true;
	// 	} else {
	// 		return false;
	// 	}
	// }

	// Board.prototype.gameOver = function() {
	// 	if (this.snake.head.x < 0 || this.snake.head.x >= this.width || this.snake.head.y < 0 || this.snake.head.y >= this.height) {
	// 		return true
	// 	}	else {
	// 		// cycle through body and check for hit
	// 		for (var i = 0; i < this.snake.body.length -1; i++) {
	// 			var pos = this.snake.body[i]
	// 			if (pos.x === this.snake.head.x && pos.y === this.snake.head.y) {
	// 				return true
	// 			} 
	// 		}
	// 	return false
	// 	}
	// }
	

	

	function Snake(bheight, bwidth) {
		this.body = [{x:Math.floor(bwidth/2) -1 , y: Math.floor(bheight/2)}, {x: Math.floor(bwidth/2), y: Math.floor(bheight/2)}];
		this.speed = 1;
		this.direction = "east";
		this.head = this.body[this.body.length - 1];
	}

	Snake.prototype.checkTurn = function(key) {
		if (!this.directionChangedThisTurn) {
			this.turn(key)
		}
	}

	Snake.prototype.turn = function(key) {
		switch(key) {
		case 37:
			if (this.direction !== "east") {
				this.direction = "west";
				this.directionChangedThisTurn = true;
			}
			break;
		case 38:
			if (this.direction !== "north") {
				this.direction = "south";
				this.directionChangedThisTurn = true;
			}
			break;
		case 39:
			if (this.direction !== "west") {
				this.direction = "east";
				this.directionChangedThisTurn = true;
			}
			break;
		case 40:
			if (this.direction !== "south") {
				this.direction = "north";
				this.directionChangedThisTurn = true;
			}
			break;
		default:
			console.log("Didn't recognize key value");
		}
	}


	Snake.prototype.move = function() {
		var newPos;
		var head = this.head;

		if (this.direction === "east") {
			newPos = {x: head.x+1, y: head.y};
		} else if (this.direction === "west") {
			newPos = {x: head.x-1, y: head.y};
		} else if (this.direction === "north") {
			newPos = {x: head.x, y: head.y+1};
		} else {
			newPos = {x: head.x, y: head.y-1};
		}

		return newPos;
	};

	Snake.prototype.includesSpot = function(array, targetX, targetY) {
		for (var i = 0; i < this.body.length; i++) {
			if (this.body[i].x === targetX && this.body[i].y === targetY) {
				return true;
			}
		}
		return false;
	}

	return {
		Snake: Snake,
		// Board: Board
	};

})();


// var game = new SnakeGame.Board(100, 200);

// game.snake.turn(38)
// game.move()
// console.log(game.snake)
// console.log(game.applePos)
// console.log(game.snake.ate(game))
// console.log(game.gameOver());
