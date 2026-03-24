/*******************************************************/
// setup()
/*******************************************************/
let gameState = "menu";
let timeLimit = 10; // The timer has a time limit for 10 seconds
let countdown = 0; // This keeps track of the time limit
let score = 0; // This is the score varible that I made. It's use comes further down.

function preload() {

	imgTennisplayer = loadImage('assets/images/tennisplayer.png');
	imgTarget = loadImage('assets/images/tennistarget.png');
}
function setup() {
	console.log("setup: ");
	canvasWidth = 500;
	canvasHeight = 500;
	cnv = new Canvas(canvasWidth,canvasHeight)
	gameState = "menu"
	wallLH = new Sprite(0, 500 / 2, 8, 500, 'k');
	wallLH.color = 'black';
	wallRH = new Sprite(500, 500 / 2, 5, 500, 'k');
	wallRH.color = 'blue';
	wallBot = new Sprite(250, 500, 500, 50, 'k');
	wallBot.color = 'red';
	wallTop = new Sprite(250, 10, 500, 50, 'k');
	player_1 = new Sprite(500 / 2, 500 / 2, 50, 'd');
	player_1.color = 'blue';
	player_1.bounciness = 5;
	player_1.friction = 20;
	player_1.drag = 1;
	player_1.image = (imgTennisplayer);
	imgTennisplayer.resize(50, 50);
	tennisBalls = new Group();
	targetGroup = new Group();
	for (i = 0; i < 5; i++) {
		let minDistanceFromPlayer = 150;  //The minimum distance I want between the player and the target so they don't collide
		do {
			targetSpawnX = random(0, 500)//making sure that the target don't spawn at the same place and are clumped together.
			//Also it keeps on choosing a new value of x until if the disatnce between target
			//  and the player is lower than the previous defined one
			targetSpawnY = random(0, 500)//making sure that the target don't sapwn at the same place and are clumped together
			//Also it keeps on choosing a new value of y until if the disatnce between target
			//  and the player is lower than the previous defined one
		} while (dist(targetSpawnX, targetSpawnY, player_1.x, player_1.y) < minDistanceFromPlayer); //If the distance is lower it keeps on telling 
		//the computer to do the do loop
		target = new Sprite(targetSpawnX, targetSpawnY, 60, 60, 'd')
		target.friction = 0.5;
		target.speed = 1.3;
		target.image = (imgTarget);
		imgTarget.resize(50, 50)
		targetGroup.add(target);//Make sure that every target moves towards the player
	}
}
function draw() {
	background('white')
	if (gameState === "menu"){
		drawMenu();
	} else if(gameState === "play"){
		drawGame();
	} else if (gameState === "gameover"){
		drawGameOver();
	};
	if (mouse.presses()) {
		shootTennisBalls();
	};


}
function drawMenu() {
	console.log("Menu Screen")
	textSize(25)
	text("Press Space Bar", 200,200)
	if (kb.pressing('space')){
		gameState = 'play'
	}
}
function drawGame(){
	if (kb.pressing('left')) {

		// Set sprite's velocity to the left
		player_1.vel.x = -2;

	}

	else if (kb.pressing('right')) {
		//Set sprit's velocity to the right 
		player_1.vel.x = 2;

	};

	if (kb.released('left')) {
		//Sprit doesn't move when not moved. 
		player_1.vel.x = 0;
	}
	else if (kb.released('right')) {
		player_1.vel.x = 0;
	}
	if (kb.pressing('up')) {
		player_1.vel.y = -2
		//Sprite moves up
	}
	else if (kb.pressing('down')) {
		player_1.vel.y = 2
		//Sprite moves down
	}
	if (kb.released('up')) {
		player_1.vel.y = 0
	}
	else if (kb.released('down')) {
		player_1.vel.y = 0
	};
	targetGroup.moveTowards(player_1, 0.05)//The targets move towards the player
	targetGroup.collides(tennisBalls, func2Call);
	function func2Call(_target, _tennisBalls,) {
		_target.remove();
		_tennisBalls.remove();
		let minDistanceFromPlayer = 150;
		do {
			target2SpawnX = random(0, 500);
			target2SpawnY = random(0, 500);
		} while (dist(target2SpawnX, target2SpawnY, player_1.x, player_1.y) < minDistanceFromPlayer)
		target2 = new Sprite(target2SpawnX, target2SpawnY, 60, 60, 'd')
		targetGroup.add(target2);
		target2.image = (imgTarget)
		imgTarget.resize(50, 50);
		score = score + 1; // Increses my score by 1 everytime my tennis balls collide with the target
	}//Called the remove fucntion inside the draw loop becuase I want a new Target to spawn in and I need a loop for that
	//Also used the groups to call them as they conrtol everything about the sprite. Could not have used the sprite becuase it is
	//only called in a function. 
	if (player_1.collides(targetGroup)) {
		print("Game Over")
		noLoop();
	}
	let currentTime = int(millis() / 1000); // Millis is the amount of milliseconds passsed since the setup function has started.
	// The int(millis()/1000) is there to convert the time to seconds. We have to divide the millis to convert the milliseconds to seconds.
	//Int makes sure that there are no decimals for example - 2.5
	countdown = timeLimit - currentTime //Countdown is the time limit - the amount of time passed.
	//If the time limit has passed, keep the countdown at 0
	if (countdown < 0) {
		countdown = 0;
		textSize(24);
		text("Game Over", 50, 100)
		noLoop();
	}
	textSize(18); //The size of the text
	text("Time: " + currentTime, 0, 50)
	text("SCORE: " + score, 400, 50)
}
function shootTennisBalls() {
	balls = new Sprite(player_1.x, player_1.y, 10);
	balls.color = 'red'
	balls.vel.x = 5;
	//The tennis balls head toward the way the mouse is pointing. callculates the angle between the balls and the mouse.
	//By recognizing this the ball is able to head towards the mouse	 
	balls.direction = balls.angleTo(mouse)
	//Added this feature so that the tennis balls don't collide with the player and go in weird directions.
	//Doing this the tennis balls overlap the player which means they can't collide. 
	balls.overlap(player_1);
	//added in groups to handle future colloisions with targets. 
	tennisBalls.add(balls);
	balls.life = 60;

}
