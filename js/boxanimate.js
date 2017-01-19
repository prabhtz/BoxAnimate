(function(){
	
	var count = 0;
	var timeElasped = 0;
	var noOfBox = getRandom(1, 15);

	function getRandom(min, max) {
    	return Math.floor(Math.random()*(max-min+1)+min);
  	}

  	function getRandomColor() {
  		var r = getRandom(0, 255);
  		var g = getRandom(0, 255);
  		var b = getRandom(0, 255);
  		var color = "rgb(" + r + "," + g + "," + b + ")";
  		return color;
  	}


	function Box() {
		this.x = getRandom(0, 640);
		this.y = getRandom(0, 480);
		this.dx = getRandom(0,1) > 0.5 ? 1: -1;
		this.dy = getRandom(0,1) > 0.5 ? 1: -1;
		this.bgColor;
		this.width;
		this.element;

		this.init = function() {
			this.element = document.createElement("div");
			this.element.setAttribute("class","box");
			this.element.style.top = this.y + "px";
			this.element.style.left = this.x + "px";
			
			document.getElementById("container").appendChild(this.element);
			this.element.style.background = getRandomColor();
			this.width = getComputedStyle(this.element).getPropertyValue("width").split("px")[0];
			console.log(getComputedStyle(this.element).getPropertyValue("width").split("px")[0]);
		}

		this.draw = function() {
			this.element.style.top = this.y + "px";
			this.element.style.left = this.x + "px";
		}
	}

	function Animate() {
		count = 0;
		timeElasped = 0;
		var that = this;
		var boxes = [];
		
		var container = document.getElementById("container");
		var countDisplay = document.getElementsByClassName("count")[0];
		var timeDisplay = document.getElementsByClassName("time")[0];

		var containerWidth = getComputedStyle(container).getPropertyValue("width").split("px")[0];
		var containerHeight = getComputedStyle(container).getPropertyValue("height").split("px")[0];

		countDisplay.innerHTML = "No of objects is " + noOfBox;

		container.onmouseover = function() {
			container.style.cursor = "crosshair";
		}

		container.onmouseout = function() {
			container.style.cursor = "default";
		}



		this.init = function(num) {
			for (var i=0; i<num; i++) {
				var box = new Box();
				box.init();
				box.element.onclick = (function(i) {
					return function() {
						boxes[i].element.style.display = "none";
						count++;
						if (count == noOfBox) {
							console.log(timeElasped);
							timeDisplay.innerHTML = "Time is " + (timeElasped/1000);
							clearInterval(intervalId);
							noOfBox = getRandom(1, 15);
							new Animate().init(noOfBox);
						}
					}
				})(i);
				boxes.push(box);
			}
			
			var intervalId = setInterval(function () {
				timeElasped += 28;
				moveBox(num);
			}, 28);
		}

		var moveBox = function(num) {
			for (var i=0; i<num; i++) {
				var box = boxes[i];
				box.x += box.dx;
				box.y += box.dy;
				box.draw();
				check(box);
				collideDetect(box,i);
			}
		}

		var check = function(box) {
			if (box.x >= containerWidth - box.width) {
				box.dx = -1;
			}
			if (box.x <= 0) {
				box.dx = 1;
			}
			if (box.y >= containerHeight - box.width) {
				box.dy = -1;
			}
			if (box.y <= 0) {
				box.dy = 1;
			}
			
			box.draw();
		}

		var collideDetect = function(box,pos) {
		
			for (var i=0; i<boxes.length; i++) {

				var temp = parseInt(box.width);
				
				if (i == pos) {
					i++;
				}
				
				if (((box.x < (boxes[i].x + temp)) && ((temp + box.x) > boxes[i].x) && 
					(box.y < (boxes[i].y + temp)) && ((temp + box.y) > boxes[i].y))) {
						
					box.element.style.background = getRandomColor();
					boxes[i].element.style.background = getRandomColor();
					
					if (Math.abs(box.x - boxes[i].x) <= box.width) {
						if(box.x > boxes[i].x) {
							box.dx = 1;
							boxes[i].dx = -1;
						} else {
							box.dx = -1;
							boxes[i].dx = 1;
						}
					}
					if (Math.abs(box.y - boxes[i].y) <= box.width) {
						if (box.y > boxes[i].y) {
							box.dy = 1;
							boxes[i].dy = -1;
						} else {
							box.dy = -1;
							boxes[i].dy = 1;
						}
					}
				}
			}
		}
	}
	

	new Animate().init(noOfBox);
})();

