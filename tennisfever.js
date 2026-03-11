/*******************************************************/
// setup()
/*******************************************************/
function preload() {

	imgTennisplayer = loadImage('assets/images/tennisplayer.png');
	imgTarget = loadImage('assets/images/tennistarget.png');
}
function setup() {
	console.log("setup: ");
	canvasWidth = 500;
	canvasHeight = 500;
	cnv = new Canvas(canvasWidth, canvasHeight);
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
		targetSpawnX = random(0, 500)//making sure that the target don't spawn at the same place and are clumped together
		targetSpawnY = random(0, 500)//making sure that the target don't sapwn at the same place and are clumped together
		target = new Sprite(targetSpawnX, targetSpawnY, 60, 60, 'd')
		target.friction = 0.5;
		target.speed = 1.3;
		targetGroup.add(target);//Make sure that every target moves towards the player
	}
	target.image = (imgTarget)
	imgTarget.resize(50, 50)
}

function draw() {
	background('white')
	player_1.rotation = 0;
	if (mouse.presses()) {
		shootTennisBalls();
	};


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
	function func2Call(_target, _tennisBalls) {
		_target.remove();
		_tennisBalls.remove();
		target2SpawnX = random(0, 500);
		target2SpawnY = random(0, 500);
		target2 = new Sprite(target2SpawnX, targetSpawnY, 60, 60, 'd')
		targetGroup.add(target2);
		target2.image = (imgTarget)
		imgTarget.resize(50, 50);
	}
	if(player_1.collides(targetGroup)){
		print("Game Over")
		noLoop();
	}
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
