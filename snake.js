var SnakeGame = (function (){

	function Snake(boardheight, boardwidth) {
		this.body = [{x:Math.floor(boardwidth/2) -1, y: Math.floor(boardheight/2)}, 
								 {x: Math.floor(boardwidth/2), y: Math.floor(boardheight/2)}];
		this.direction = "east";
		this.head = this.body[this.body.length - 1];
	}

	Snake.prototype.checkTurn = function(key) {
		// if (!this.directionChangedThisTurn) {
			this.turn(key)
		// }
	}

	Snake.prototype.turn = function(key) {
		switch(key) {
		case 37:
			if (this.initialDirection !== "east") {
				this.direction = "west";
			}
			break;
		case 38:
			if (this.initialDirection !== "north") {
				this.direction = "south";
			}
			break;
		case 39:
			if (this.initialDirection !== "west") {
				this.direction = "east";
			}
			break;
		case 40:
			if (this.initialDirection !== "south") {
				this.direction = "north";
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

	Snake.prototype.includesSpot = function(targetX, targetY) {
		for (var i = 0; i < this.body.length; i++) {
			if (this.body[i].x === targetX && this.body[i].y === targetY) {
				return true;
			}
		}
		return false;
	}

	return {
		Snake: Snake,
	};

})();

